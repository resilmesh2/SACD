const express = require('express');
const neo4j = require('neo4j-driver');
const path = require('path');

// define a new virtualNetwork
const graphlib = require('graphlib');
let virtualNetwork = new graphlib.Graph();

const fs = require('fs');

// for CIDR operations
const CIDR = require('cidr-js');

// Neo4j credentials from environment variables
const uri = process.env.NEO4J_SERVER_URL || 'bolt://192.168.3.47:7687';
const user = process.env.NEO4J_USERNAME || 'neo4j';
const password = process.env.NEO4J_PASSWORD || 'myNeo4jPassword';
const driver = neo4j.driver(uri, neo4j.auth.basic(user, password));

// Initialize Express.js
const app = express();
const port = 3000; // Port to run the web server

// Serve the static files (HTML, CSS, JS) from the public directory
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

const virtualNetworkFilePath = path.join(__dirname, 'data', 'virtualNetwork.json');

//////   Neo4j Queries   //////
// initial data from Neo4j database

async function getInitialData() {
    const session = driver.session();

    ipPrefix = "147.251";

    try {

	const query = `MATCH (o:OrganizationUnit)-[r]-(s:Subnet), (s)-[r2]-(i:IP) ` +
			`WHERE o.name in ["FF"] AND s.range STARTS WITH "${ipPrefix}" ` +
			`RETURN o, r, s, i;`;

        // Run a query to fetch nodes (adjust the query as needed)
        const result = await session.run(query);

	const elements = [];
	const ranges = [];

        let orgNodeId = null;
	let nodeType = null;
	let orgNodeDetails = null;
	let orgNodeLabel = null;

	let nodeRanges = [];
	let nodeHosts = [];
	let vulnNodeHosts = [];
	let nodeRels = [];

	let cidr_rangeId = null;

	const uniqueOrgUnitIds = new Set();

	let noRels = 0;
	let noSubnets = 0;

	result.records.forEach(record => {
    	    record.keys.forEach(key => {

        	const value = record.get(key); // Use 'value' instead of 'node' for clarity

        	if (value.labels) { // Check if it's a Node
            	    if (value.labels.includes('Subnet')) {

                	nodeRanges.push(value);

            	    } else if (value.labels.includes('OrganizationUnit')) {
                	orgNodeId = value.identity.low;
                	cidr_rangeId = `CIDR_range-${orgNodeId}`;

                	// Ensure uniqueness for OrganizationUnit nodes
                	if (!uniqueOrgUnitIds.has(orgNodeId)) {
                    	    uniqueOrgUnitIds.add(orgNodeId);
                    	    nodeType = value.labels[0];
                    	    orgNodeLabel = value.properties.name;
                    	    orgNodeDetails = "N/A";
                	}
            	    } else if (value.labels.includes('IP')){

			const ipNodeAddress = value.properties.address;

			// add the node to the array but prevent duplicates
			if (!nodeHosts.includes(ipNodeAddress)){

			    nodeHosts.push(ipNodeAddress);
			}
		    }
        	} else if (value.type) { // Check if it's a Relationship

            	    nodeRels.push(value);
        	}
    	    });
	});

	// make a second query to check whether any resulting IPs have vulnerabilities
	const query2 = `MATCH (i:IP)-[r]-(n:Node), (n)-[r2]-(h:Host), ` +
			`(h)-[r3]-(sv:SoftwareVersion), (sv)-[r4]-(v:Vulnerability) ` +
			`WHERE i.address STARTS WITH "${ipPrefix}.96" ` +
			`OR i.address STARTS WITH "${ipPrefix}.97" ` +
			`OR i.address STARTS WITH "${ipPrefix}.98" ` +
			`OR i.address STARTS WITH "${ipPrefix}.99" ` +
			`OR i.address STARTS WITH "${ipPrefix}.100" ` +
			`OR i.address STARTS WITH "${ipPrefix}.101" ` +
			`OR i.address STARTS WITH "${ipPrefix}.102" ` +
			`OR i.address STARTS WITH "${ipPrefix}.103" ` +
			`RETURN i, count(v);`;


        const vulnResult = await session.run(query2);

	vulnResult.records.forEach(vulnRecord => {
    	    // Initialize variables to track IP and count values
    	    let ipNodeAddress = null;

    	    vulnRecord.keys.forEach(vulnKey => {
        	const vulnValue = vulnRecord.get(vulnKey);

        	// Check if vulnValue is a Node
        	if (vulnValue.labels) {
            	    if (vulnValue.labels.includes('IP')) {

                	ipNodeAddress = vulnValue.properties.address;
            	    }
            	} else if (vulnValue.low !== undefined) {

            	    if (ipNodeAddress) {

			vulnNodeHosts.push(ipNodeAddress);
            	    } else {
                    	console.error("ipNodeAddress is null when processing count(v).");
            	    }
            	}
    	    });

    	    // Handle case where ipNodeAddress is null after processing
    	    if (!ipNodeAddress) {
            	console.error("No IP node was found in the record.");
    	    }
    	});

	//process Neo4j results
	const ipHosts = nodeHosts.map(element => `${element}/32`);
	const vulnHosts = vulnNodeHosts.map(element => `${element}/32`);

	// helper function to process results
	function processDuplicates(myArray){

	    const results = [];
	    const recordedEleIds = new Set();

	    myArray.forEach(ele => {

		const idValue = ele.identity.low;
		if (!recordedEleIds.has(idValue)){
		    recordedEleIds.add(idValue);
		    results.push(ele);
		}

	    });

	    return results;
	}

	netRanges = processDuplicates(nodeRanges);

	netRanges.forEach(ele => {
            const value = ele.properties['range'];
	    ranges.push(value);
	});

	const netNodeValues = Array.from(new Set([...ranges, ...ipHosts]));

	elements.push({
	    data : {
		id: orgNodeId,
		type: 'CIDR_Values',
		label: orgNodeLabel,
	        details: netNodeValues,
		vulns: vulnHosts
	    }
	});

	return elements;

    } catch (error) {
	console.error('Error fetching initial CIDR notation from Neo4j:', error);
	return [];
    } finally {
	await session.close();
    }
}

async function buildCIDRTreemap(supernet, cidrDict) {
    const IPCIDR = await import('ip-cidr'); // Dynamic import for ES Module

    // Initialize the treemap with the supernet as the root
    const treemap = {
        [supernet]: {
            cidr: supernet,
            label: 'my_pool',
            children: [],
        },
    };

    // helper function to return all nested subnets under supernet

    const startSuffix = parseInt(supernet.split('/')[1], 10);
    const endSuffix = 31;

    // Helper function to calculate the next nested subnets
    function createSubnets(cidr, suffix) {
        const cidrObj = new IPCIDR.default(cidr);

        if (!cidrObj.address.isCorrect()) {
            throw new Error(`Invalid CIDR: ${cidr}`);
        }

        const subnetMask = parseInt(cidr.split('/')[1], 10);

        if (suffix < subnetMask) {
            throw new Error(`Invalid suffix: ${suffix} cannot be smaller than ${subnetMask}`);
        }

        const subnetList = [];
        const startIP = cidrObj.start();
        const totalSubnets = 2 ** (suffix - subnetMask);

        for (let i = 0; i < totalSubnets; i++) {
            const offsetIP = incrementIP(startIP, i * (2 ** (32 - suffix)));
            subnetList.push(`${offsetIP}/${suffix}`);
        }

        return subnetList;
    }

    // Helper function to increment an IP address
    function incrementIP(ip, increment) {
        const parts = ip.split('.').map(Number);
        let value = (parts[0] << 24) | (parts[1] << 16) | (parts[2] << 8) | parts[3];
        value += increment;

        return [
            (value >>> 24) & 255,
            (value >>> 16) & 255,
            (value >>> 8) & 255,
            value & 255,
        ].join('.');
    }

    function generateNestedSubnets(supernet, startSuffix, endSuffix) {
    	const result = [];
	const cidrSuffixes = [];
    	let currentSubnets = [supernet];

    	// Iterate through suffix levels from startSuffix to endSuffix
    	for (let suffix = startSuffix; suffix <= endSuffix; suffix++) {
            const nextLevelSubnets = [];
            currentSubnets.forEach((cidr) => {
            	const subnets = createSubnets(cidr, suffix); // Generate subnets for the current CIDR
            	nextLevelSubnets.push(...subnets);
            });

            result.push(...nextLevelSubnets);

	    let suffixStr = String(suffix);
	    cidrSuffixes.push(suffixStr);
            currentSubnets = nextLevelSubnets; // Prepare for the next iteration
    	}

    	return { allSubnets: result, cidrSuffixes };
    }

    const { allSubnets, cidrSuffixes } = generateNestedSubnets(supernet, startSuffix, endSuffix);

    const newLabel = 'my_pool';

    allSubnets.forEach(sub => {
	if (!cidrDict.hasOwnProperty(sub)) {

	    cidrDict[sub] = {
	    	value: sub,
	    	label: newLabel,
	    };
	}
    });

    // Helper function to check if one range is within another
    function isInSubnet(child, parent) {
        const parentCidr = new IPCIDR.default(parent);
        const childCidr = new IPCIDR.default(child);

        // Get the range of IPs for parent and child
        const parentRange = parentCidr.toRange();
        const childRange = childCidr.toRange();

        const [parentStart, parentEnd] = parentRange.map(ip => ip2long(ip));
        const [childStart, childEnd] = childRange.map(ip => ip2long(ip));

        // Check if child range is within parent range
        return childStart >= parentStart && childEnd <= parentEnd;
    }

    // Helper function to convert IP to long
    function ip2long(ip) {
        return ip.split('.').reduce((acc, octet) => (acc << 8) + parseInt(octet, 10), 0);
    }

    // Recursive function to find and insert a node into the treemap
    function insertIntoTree(node, cidr, label, vuln) {
        let mostSpecificParent = null;

        // Check for the most specific parent among current children
        for (const child of node.children) {
            if (isInSubnet(cidr, child.cidr)) {
                if (
                    !mostSpecificParent ||
                    new IPCIDR.default(child.cidr).prefixLength >
                    new IPCIDR.default(mostSpecificParent.cidr).prefixLength
                ) {
                    mostSpecificParent = child;
                }
            }
        }

        // Insert into the most specific parent's subtree or as a direct child
        if (mostSpecificParent) {
            insertIntoTree(mostSpecificParent, cidr, label, vuln);
        } else {
            node.children.push({ cidr, label, vuln, children: [] });
        }
    }

    // remove additional cidr root parent
    delete cidrDict[supernet];

    // Sort the CIDR dictionary
    const sortedCIDRDictEntries = Object.entries(cidrDict).sort(([keyA], [keyB]) => {
        const getSuffix = (cidr) => parseInt(cidr.split('/')[1], 10); // Extract the suffix
	const getFourthOctet = (cidr) => parseInt(cidr.split('.')[3].split('/')[0], 10); // Extract the fourth octet
        const getThirdOctet = (cidr) => parseInt(cidr.split('.')[2], 10); // Extract the third octet

        const suffixA = getSuffix(keyA);
        const suffixB = getSuffix(keyB);

        if (suffixA !== suffixB) {
            return suffixA - suffixB; // Sort by suffix length
        }

        const thirdOctetA = getThirdOctet(keyA);
        const thirdOctetB = getThirdOctet(keyB);

	// If third octets are the same, sort by fourth octet
	if (thirdOctetA === thirdOctetB) {

	    const fourthOctetA = getFourthOctet(keyA);
	    const fourthOctetB = getFourthOctet(keyB);
	    return fourthOctetA - fourthOctetB;
	}

        return thirdOctetA - thirdOctetB; // Sort by third octet
    });

    // Build the treemap using the sorted dictionary
    for (const [cidr, { value, label, vuln }] of sortedCIDRDictEntries) {
        if (isInSubnet(value, supernet)) {

            insertIntoTree(treemap[supernet], value, label, vuln);
        }
    }

    // Promote children of the root element to top-level nodes
    const result = {};
    for (const child of treemap[supernet].children) {
        result[child.cidr] = { ...child };
        delete child.cidr; // Remove redundant `cidr` property for flat structure
    }

    return { treemap: result, cidrSuffixes };
}

// Consolidate the initial CDIR range fetch the node and save to virtual network
async function fetchAndPopulateData() {
    const initialCIDR = await getInitialData();
    await populateVirtualNetwork(initialCIDR);
    saveVirtualNetwork();
    console.log('Initial data fetched and virtual network populated.');
}

async function populateVirtualNetwork(data) {

    // Check if data is an array
    if (Array.isArray(data)) {
        // Populate the virtualNetwork with the data
        data.forEach(element => {
            const { id, source, target, label, type, parent, details, hosts, vulns } = element.data;

            // Check if the element is an edge
            if (source !== undefined && target !== undefined) {
                virtualNetwork.setEdge(
                    String(source),
                    String(target),
                    {
                        id: String(id),
                        type: label // This is the relationship type
                    }
                );
            } else if (id !== undefined && type) {
                // Check if element is a node
		const nodeData = { label, type, details, hosts, vulns };

		// Assign compound parent if available
		if (parent) nodeData.parent = parent;

		virtualNetwork.setNode(String(id), nodeData);
            } else {
		console.error('Element is neither a node nor a valid edge:', element);
		return;
            }
        });

    } else {
        console.error('Data is not an array. Cannot populate virtual network.');
    }
}

// function to get virtual network data
async function getVirtualNetworkData() {
    try {
	const elements = [];

        // Add nodes with conditional parent assignment
        virtualNetwork.nodes().forEach(nodeId => {
            const nodeData = {
                id: nodeId,
                label: virtualNetwork.node(nodeId).label,
                type: virtualNetwork.node(nodeId).type,
		details: virtualNetwork.node(nodeId).details,
		hosts: virtualNetwork.node(nodeId).hosts,
		vulns: virtualNetwork.node(nodeId).vulns
            };

            // Only add 'parent' if it exists for this node
            if (virtualNetwork.node(nodeId).parent) {
                nodeData.parent = virtualNetwork.node(nodeId).parent;
            }

            elements.push({ data: nodeData });
        });

        // Add edges to the elements array
        virtualNetwork.edges().forEach(edge => {
            elements.push({
                data: {
                    id: virtualNetwork.edge(edge).id,
                    source: edge.v,
                    target: edge.w,
                    label: virtualNetwork.edge(edge).type,
                }
            });
        });

        return elements;

    } catch (error) {
        console.error('Error sending virtual network data:', error);
        res.status(500).json({ error: 'Failed to fetch virtual network data' });
    }
}

// Save the virtual network to a file
function saveVirtualNetwork() {
    try {
        const serializedGraph = graphlib.json.write(virtualNetwork);

        // Ensure the directory exists, create if it doesn't
        if (!fs.existsSync(path.dirname(virtualNetworkFilePath))) {
            fs.mkdirSync(path.dirname(virtualNetworkFilePath), { recursive: true });
        }

        fs.writeFileSync(virtualNetworkFilePath, JSON.stringify(serializedGraph, null, 2));
	console.log('Virtual network saved to:', virtualNetworkFilePath);
    } catch (error) {
        console.error('Error saving virtual network:', error);
    }
}

// Load the virtual network data on server startup
async function loadVirtualNetwork() {
    try {
        if (fs.existsSync(virtualNetworkFilePath,)) {
            const data = fs.readFileSync(virtualNetworkFilePath, 'utf-8');
            if (data) {
                virtualNetwork = graphlib.json.read(JSON.parse(data));
            } else {
                await fetchAndPopulateData();
            }
        } else {
            await fetchAndPopulateData();
        }
    } catch (error) {
        console.error('Error loading virtual network:', error);
    }
}

//////   API calls   //////
// Export the function for use in the API route
module.exports = {
    getInitialData,
    getVirtualNetworkData
};

app.get('/api/fetch-data', async (req, res) => {
    try {
        await fetchAndPopulateData();
        res.json({ message: 'Initial CDIR range fetched and virtual network saved.' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch initial data.' });
    }
});

// extract data from virtual network
app.get('/api/virtualNetwork', async (req, res) => {
    const data = await getVirtualNetworkData();
    res.json(data);
});

app.post('/api/build-cidr-treemap', async (req, res) => {
    const { supernet, cidrDict } = req.body;
    try {
        // Call the asynchronous function to return treemap, cidrSuffixes
        const { treemap, cidrSuffixes } = await buildCIDRTreemap(supernet, cidrDict);
        res.json({ treemap, cidrSuffixes });
    } catch (error) {
        console.error('Error building CIDR treemap:', error);
        res.status(500).json({ error: 'Failed to build CIDR treemap.' });
    }
});

// Start the server and listen on the specified port
app.listen(port, () => {
    console.log(`App listening at http://192.168.3.47:${port}`);

    (async () => {
        await loadVirtualNetwork();
    })().catch((error) => {
        console.error('Error loading the virtual network:', error);
    });
});

// Close the Neo4j driver when the process exits
process.on('exit', () => {
    console.log('Exited');
    driver.close();
});

// Delete the virtual network file and reset virtualNetwork on shutdown
process.on('SIGINT', () => {
    console.log('\nShutting down server...');

    // Remove the JSON file if it exists
    if (fs.existsSync(virtualNetworkFilePath)) {
        try {
            fs.unlinkSync(virtualNetworkFilePath);
            console.log('virtualNetwork.json deleted successfully from directory.');
        } catch (error) {
            console.error('Error deleting virtualNetwork.json:', error);
        }
    }

    // Clear the virtual network data
    virtualNetwork = new graphlib.Graph(); // Re-initialize to empty

    // Exit process
    process.exit();
});
