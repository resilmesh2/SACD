const express = require('express');
const path = require('path');
const neo4j = require('neo4j-driver');
const cors = require('cors');
require('dotenv').config();
const graphlib = require('graphlib');
const fs = require('fs');

// Initialize virtual network
let virtualNetwork = new graphlib.Graph();
const virtualNetworkFilePath = path.join(__dirname, 'data', 'virtualNetwork.json');

// Neo4j credentials from environment variables
const uri = process.env.NEO4J_SERVER_URL || 'bolt://localhost:7687';
const user = process.env.NEO4J_USERNAME || 'neo4j';
const password = process.env.NEO4J_PASSWORD || 'myNeo4jPassword';
const driver = neo4j.driver(uri, neo4j.auth.basic(user, password));

// Initialize Express.js
const app = express();
const port = 3000; // Port to run the web server

app.use(express.static(path.join(__dirname, '../resilmesh-dashboard/src/assets')));
app.use(express.json());

app.use(cors({
    origin: 'http://localhost:4200', // Allow only your Angular app
    methods: 'GET,POST',
    allowedHeaders: 'Content-Type,Authorization'
}));

//   Neo4j Queries   //
async function getInitialSupernetNode(netRange){
    const session = driver.session();

    try {

	// define initial Neo4j query
	let query = `MATCH (s:Subnet) WHERE s.range IN ["${netRange}"] RETURN s;`;

	// Run a query to fetch node
	const result = await session.run(query);

	const elements = [];

	let nodeId = null;
	let nodeType = 'Subnet';
	let nodeDetails = null;
	let nodeLabel = null;

	// Process the Subnet result and convert the responding nodes to Cytoscape elements
	result.records.forEach(record => {

	    record.keys.forEach(key => {

		const node = record.get(key);

		if (node && node.labels) {

		    nodeId = node.identity.low;
		    nodeDetails = node.properties.note;
		    nodeLabel = node.properties.range;
		}
	    });

	});

        elements.push({
	    data: {
		id: nodeId,
		type: nodeType,
		label: nodeLabel,
		details: nodeDetails
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

async function getNeighborNodes(nodeId, nodeType) {

    console.log('getNeighborNodes: ', nodeType);

    const session = driver.session();

    try {
        let query = ''; // Change to let to allow reassignment

        if (nodeType === 'Subnet') {
            query = `MATCH (s:Subnet)-[r]-(ip:IP) WHERE id(s) = $nodeId ` +
                `RETURN s, r, ip;`;
        } else if (nodeType === 'IP') {
	    query = `MATCH (i:IP)-[r]-(d:DomainName), (i)-[r1]-(n:Node), (n)-[r2]-(h:Host), ` +
		`(h)-[r3]-(sv:SoftwareVersion) WHERE id(i) = $nodeId WITH r, d, r1, n, r2, h, r3, sv ` +
		`LIMIT 1 ` +
		`OPTIONAL MATCH (sv)-[sR1]-(ns:NetworkService) ` +
		`OPTIONAL MATCH (sv)-[sR2]-(v:Vulnerability) ` +
		`OPTIONAL MATCH (v)-[vulnR]-(c:CVE) ` +
		`RETURN r, d, r1, n, r2, h, r3, sv, sR1, ns, sR2, v, vulnR, c ` +
		`LIMIT 1;`;
	}

        // Ensure the query is not empty
        if (!query) {
            throw new Error('Cypher query is empty');
        }

        // Pass the cidrPrefix and cidrPostfix along with nodeId and nodeType
        const result = await session.run(query, {
            nodeId: parseInt(nodeId),
            nodeType: nodeType,
        });

        const elements = [];
        result.records.forEach(record => {
            record.keys.forEach(key => {
                const node = record.get(key);

                // Check if the node is not null
                if (node) {
                    if (!node.type) {
                        const nodeID = node.identity['low'];
                        const nodeType = node.labels[0];
                        const nodeProperty = node.properties;
                        const { nodeLabel, nodeDetails } = getNodeData(nodeType, nodeProperty);

                        elements.push({
                            data: {
                                id: nodeID,
                                type: nodeType,
                                label: nodeLabel,
                                details: nodeDetails
                            }
                        });

                        // Add the node to the virtual network
                        virtualNetwork.setNode(nodeID, { label: nodeLabel, type: nodeType, details: nodeDetails });
                    } else {
                        const edgeSource = node.start['low'];
                        const edgeTarget = node.end['low'];
                        const edgeType = node.type;
                        const edgeID = `${edgeSource}-${edgeTarget}`;

                        elements.push({
                            data: {
                                id: edgeID,
                                source: edgeSource,
                                target: edgeTarget,
                                label: edgeType
                            }
                        });

                        // Add the edge between the source and target to the virtual network
                        virtualNetwork.setEdge(edgeSource, edgeTarget, { id: edgeID, type: edgeType });
                    }
                } else {
                    // console.log(`The node or relationship for key "${key}" is null.`);
		    return;
                }
            });
        });

	console.log(`VirtualNetwork - getNodeNeighbors for ${nodeType} ${nodeId}: `, elements);
        return elements;
    } catch (error) {
        console.error('Error fetching neighbors from Neo4j:', error);
    } finally {
        await session.close();
    }
}

//   helper functions   //

// define a function to get the label of a node
function getNodeData(nodeType, nodeProperty){
    //let nodeDetails = '';

    switch (nodeType) {
       case 'Subnet':
           nodeLabel = nodeProperty.range;
	   nodeDetails = nodeProperty.note || 'N/A';
	   break;
       case 'IP':
           nodeLabel = nodeProperty.address || 'N/A';
	   nodeDetails = null
	   break;
       case 'DomainName':
	   nodeLabel = nodeProperty.domain_name || 'N/A';
	   nodeDetails = nodeProperty.tag || 'N/A';
	   break;
       case 'Node':
	   nodeLabel = (nodeProperty.topology_degree || 0).toFixed(1);
	   nodeDetails = (nodeProperty.topology_betweenness || 0).toFixed(1);
	   break;
       case 'Host':
	   nodeLabel = 'Host';
	   nodeDetails = null;
	   break;
       case 'SoftwareVersion':
	   nodeLabel = nodeProperty.version || 'N/A';
	   nodeDetails = nodeProperty.tag || 'N/A';
	   break;
       case 'NetworkService':
           nodeLabel = nodeProperty.protocol || 'N/A';
	   nodeDetails = nodeProperty.service || 'N/A';
	   break;
       case 'Vulnerability':
           nodeLabel = 'Vulnerability';
	   nodeDetails = nodeProperty.description || 'N/A';
	   break;
       case 'CVE':
           nodeLabel = nodeProperty.impact[0] || 'N/A';
	   nodeDetails = (nodeProperty.base_score_v3 || 0).toFixed(1);
	   break;
    }

    return { nodeLabel, nodeDetails };
}

// Fetch and populate CDIR data
async function fetchAndPopulateCDIR(netRange) {
    console.log(`Fetching and populating CIDR: ${netRange}`);
    const initialSubnet = await getInitialSupernetNode(netRange); // Define this as per Neo4j query
    await populateVirtualNetwork(initialSubnet); // Define populate logic
    saveVirtualNetwork();
    console.log('Initial data fetched and virtual network populated.');
}

async function populateVirtualNetwork(data) {

    // Check if data is an array
    if (Array.isArray(data)) {
        // Populate the virtualNetwork with the data
        data.forEach(element => {
            const { id, source, target, label, type, parent, details } = element.data;

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
		const nodeData = { label, type, details };

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

async function populateExpandedData(nodeId, nodeType) {
    const expandedData = await getNeighborNodes(nodeId, nodeType);
    console.log('Populate Expanded Data: ', expandedData);

    // if the expanded node is an IP, define compound node for software and existing vulnerabilities
    if (nodeType === 'IP'){
        const compoundId = `compound-${nodeId}`;
        const vulnerabilityCompoundId = `vulnerability-compound-${nodeId}`;

        // Track presence of specific types
        let hasVulnerabilityData = false;

        // First pass to detect if there is any vulnerability-related data
        expandedData.forEach(element => {
	    const { type } = element.data;
	    if (type === 'Vulnerability' || type === 'NetworkService' || type === 'CVE') {
	        hasVulnerabilityData = true;
	    }
        });

        // Second pass to assign parent attributes based on the presence of vulnerability data
        expandedData.forEach(element => {
	    const { type, id, source } = element.data;

	    // Skip setting a parent for the main node or edges
	    if (id === nodeId || type === 'IP' || source !== undefined) return;

	    // Assign parent based on type and presence of vulnerability data
	    if (hasVulnerabilityData && (type === 'Vulnerability' || type === 'NetworkService'
	    	|| type === 'CVE' || type === 'SoftwareVersion')) {
	        element.data.parent = vulnerabilityCompoundId;
	    } else {
	        // If there's no vulnerability data or node is not vulnerability-related
	        element.data.parent = compoundId;
	    }
        });

        // Add nested vulnerability compound node if vulnerability data exists
        if (hasVulnerabilityData) {
	    expandedData.push({
	        data: {
		    id: vulnerabilityCompoundId,
		    type: 'Compound',
		    label: `Vulnerability Compound for ${nodeId}`,
		    details: null,
		    parent: compoundId
	        }
	    });
        }

        // Add main compound node to expanded data
        expandedData.push({
            data: {
                id: compoundId,
                type: "Compound",
	        details: null,
                label: `Compound Node for ${nodeId}`
            }
        });

    }

    console.log('\n\nPopulate Network with Expanded Data: ', expandedData);

    await populateVirtualNetwork(expandedData);
}

async function collapseVirtualNetwork(expandedData) {

    console.log('Expanded data to remove: ', expandedData);
    expandedData.forEach(element => {
        const { id, source, target, label, type, parent, details } = element.data;

        if (source !== undefined && target !== undefined) {

            // Remove edge if it exists
            if (virtualNetwork.hasEdge(String(source), String(target))) {
                virtualNetwork.removeEdge(String(source), String(target));
                // console.log(`Removed edge: ${id}`);
            }
        } else if (id !== undefined) {
            // Remove node if it exists
            if (virtualNetwork.hasNode(String(id))) {
                virtualNetwork.removeNode(String(id));
                // console.log(`Removed node: ${id}`);
            }
        }
    });
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
		details: virtualNetwork.node(nodeId).details
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

	console.log('\n\ngetVirtualNetworkData: ', elements);
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
        if (!fs.existsSync(path.dirname(virtualNetworkFilePath))) {
            fs.mkdirSync(path.dirname(virtualNetworkFilePath), { recursive: true });
        }
        fs.writeFileSync(virtualNetworkFilePath, JSON.stringify(serializedGraph, null, 2));
        console.log('Virtual network saved to:', virtualNetworkFilePath);
    } catch (error) {
        console.error('Error saving virtual network:', error);
    }
}

// Load the virtual network from a file or initialize it as empty
async function loadVirtualNetwork() {
    try {
        if (fs.existsSync(virtualNetworkFilePath)) {
            const data = fs.readFileSync(virtualNetworkFilePath, 'utf-8');
            if (data) {
                virtualNetwork = graphlib.json.read(JSON.parse(data));
                console.log('Virtual network loaded from file.');
            } else {
                console.log('Virtual network file is empty, initializing a new network.');
                virtualNetwork = new graphlib.Graph();
            }
        } else {
            console.log('No virtual network file found, initializing a new network.');
            virtualNetwork = new graphlib.Graph();
        }
    } catch (error) {
        console.error('Error loading virtual network:', error);
    }
}

//  API calls  //
// Export the function for use in the API route
module.exports = {
    getInitialSupernetNode,
    getNeighborNodes,
    getVirtualNetworkData
};

// API to fetch CIDR data and populate the network
app.get('/api/fetch-cdir-data', async (req, res) => {
    const { netRange } = req.query;
    if (!netRange) {
        return res.status(400).json({ error: 'netRange is required' });
    }
    try {
        const data = await fetchAndPopulateCDIR(netRange);
	// res.status(200).json(data);
        res.status(200).json({ message: 'CIDR data fetched', data });
    } catch (error) {
        console.error('Error fetching CIDR data:', error);
        res.status(500).json({ error: 'Failed to fetch CIDR data' });
    }
});

// API to get virtual network data
app.get('/api/get-virtual-network-data', async (req, res) => {
    try {
        const elements = await getVirtualNetworkData();
	res.json(elements);
        // res.status(200).json(elements);
    } catch (error) {
        console.error('Error fetching virtual network data:', error);
        res.status(500).json({ error: 'Failed to fetch virtual network data' });
    }
});

// API route to expand a node and get its neighbors dynamically
app.get('/api/expand-virtual-network/:nodeId/:nodeType', async (req, res) => {
    try {
	const nodeId = req.params.nodeId;
	const nodeType = req.params.nodeType;
        await populateExpandedData(nodeId, nodeType);
	await saveVirtualNetwork();
	res.json({ message: `Neighbor data for ${nodeId} fetched and virtual network saved.` });
    } catch (error) {
	res.status(500).json({ error: 'Failed to fetch neighbor data.' });
    }
});

// API route to collapse a node and remove neighbors
app.post('/api/collapse-virtual-network', async (req, res) => {
    try {
	const data = req.body;
	await collapseVirtualNetwork(data);
	await saveVirtualNetwork();
    } catch (error) {
	console.error('Error collapsing virtual network:', error);
	res.status(500).json({ error: 'Failed to fetch neighbor data.' });
    }
});

// Start the server and load virtual network
app.listen(port, async () => {
    console.log(`App listening at http://localhost:${port}`);
    await loadVirtualNetwork();
});

// Close the Neo4j driver when the process exits
process.on('exit', () => {
    console.log('Exited');
    driver.close();
});

// Graceful shutdown logic
process.on('SIGINT', () => {
    console.log('\nShutting down server...');
    if (fs.existsSync(virtualNetworkFilePath)) {
        try {
            fs.unlinkSync(virtualNetworkFilePath);
            console.log('Deleted virtualNetwork.json.');
        } catch (error) {
            console.error('Error deleting virtualNetwork.json:', error);
        }
    }
    virtualNetwork = new graphlib.Graph();
    process.exit();
});
