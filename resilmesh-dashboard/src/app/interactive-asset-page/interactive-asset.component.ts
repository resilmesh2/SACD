import { Component, OnInit, AfterViewInit } from '@angular/core';
import { VirtualNetworkService } from '../shared/services/virtual.network.data';
import { ActivatedRoute } from '@angular/router';
import cytoscape, { EventObject, ElementsDefinition, LayoutOptions, Collection } from 'cytoscape';
// import cola from 'cytoscape-cola';

// cytoscape.use(cola);

interface CytoscapeElement {
  data: {
    id: string;
    label?: string;
    type?: string;
    [key: string]: any;
  };
  position?: { x: number; y: number; };
  group?: 'nodes' | 'edges';
  removed?: boolean;
  selected?: boolean;
  selectable?: boolean;
  locked?: boolean;
  grabbable?: boolean;
  pannable?: boolean;
  classes?: string;
}

@Component({
  selector: 'app-interactive-asset',
  templateUrl: './interactive-asset.component.html',
  styleUrls: ['./interactive-asset.component.css'],
})
export class InteractiveAssetComponent implements OnInit, AfterViewInit {
  subnetSearch: string = '';
  cidrSearch: string = '147.251.96.0/24';
  errorMessage = '';
  dataLoading = false;
  elements: CytoscapeElement[] = [];
  cy: any;
  displayedNodeIDs: { [key: string]: boolean } = {};
  expandedNodes: number[] = [];
  //neighborSets: { [key: string]: CytoscapeElement[] } = {};
  neighborSets: { [key: number]: CytoscapeElement[] } = {};

  constructor(
    private virtualNetwork: VirtualNetworkService,
    private route: ActivatedRoute
  ) {
    if (route.snapshot.params?.range) {
      this.subnetSearch = route.snapshot.params.range;
    }
  }

  ngOnInit(): void {
    if (this.subnetSearch) {
      this.initializeVirtualNetwork(this.subnetSearch);
    }
  }

  ngAfterViewInit(): void {
    if (this.elements.length > 0) {
      this.initializeCytoscape(this.elements);
    }
  }

  initializeVirtualNetwork(netRange: string): void {

    if (netRange === this.cidrSearch) {
    this.virtualNetwork
      .fetchInitialCIDRData()
      .then(() => this.virtualNetwork.getVirtualNetworkData())
      .then((elements) => {

        // Transform the data to ensure compatibility with Cytoscape
        const validElements = elements.map((element) => ({
          ...element,
	  group: element.data.type ? 'nodes' : (element.data.source && element.data.target ? 'edges' : undefined),
        }));

        this.elements = validElements; // Store transformed elements
        this.initializeCytoscape(validElements);
      })
      .catch((error) => {
        console.error('Error during initialization:', error);
      });
    } else {
    
    this.virtualNetwork
      .fetchInitialSubnetData(netRange)
      .then(() => this.virtualNetwork.getVirtualNetworkData())
      .then((elements) => {

        // Transform the data to ensure compatibility with Cytoscape
        const validElements = elements.map((element) => ({
          ...element,
	  group: element.data.type ? 'nodes' : (element.data.source && element.data.target ? 'edges' : undefined),
        }));

        this.elements = validElements; // Store transformed elements
        this.initializeCytoscape(validElements);
      })
      .catch((error) => {
        console.error('Error during initialization:', error);
      });
    }
  }

  initializeCytoscape(elements: CytoscapeElement[]): void {
    if (!elements || elements.length === 0) {
      console.warn('No elements to initialize Cytoscape.');
      return;
    }

    this.cy = cytoscape({
      container: document.getElementById('cy'),
      elements: elements,
      style: [
	{
          selector: 'node[type="IP"]',
          style: {
            'label': 'data(label)',
            'background-color': 'yellow',
            'shape': 'ellipse',
            'width': 100,
            'height': 100,
            'text-valign': 'center',
            'color': 'black',
            'font-size': '12px'
          },
        },
            {
                selector: 'node[type="CIDR_Node"]',
                style: {
                    'label': 'data(label)',
                    'background-color': 'black',
                    'shape': 'ellipse',
                    'width': 120,
                    'height': 120,
                    'text-valign': 'center',
                    'color': '#fff',
                    'font-size': '15px'
                }
            },
        {
          selector: 'node[type="Subnet"]',
          style: {
            label: 'data(label)',
            'background-color': 'blue',
            shape: 'ellipse',
            width: 120,
            height: 120,
            'text-valign': 'center',
            color: '#fff',
            'font-size': '15px',
          },
        },
            {
                selector: 'node[type="Node"]',
                style: {
                    'label': 'data(label)',
                    'background-color': 'black',
                    'shape': 'ellipse',
                    'width': 80,
                    'height': 80,
                    'text-valign': 'center',
                    'color': '#fff',
                    'font-size': '15px'
                }
            },
            {
                selector: 'node[type="DomainName"]',
                style: {
                    'label': 'data(label)',
                    'background-color': 'blue',
                    'shape': 'rectangle',
                    'width': 100,
                    'height': 60,
                    'text-valign': 'center',
                    'color': '#fff',
                    'font-size': '12px'
                }
            },
	    {
                selector: 'node[type="Host"]',
                style: {
                    'label': 'data(label)',
                    'background-color': 'lightgrey',
                    'shape': 'ellipse',
                    'width': 100,
                    'height': 60,
                    'text-valign': 'center',
                    'color': 'black',
                    'font-size': '12px'
                }
            },
            {
                selector: 'node[type="SoftwareVersion"]',
                style: {
                    'label': 'data(label)',
                    'background-color': 'aqua',
                    'shape': 'ellipse',
                    'width': 100,
                    'height': 80,
                    'text-valign': 'center',
                    'color': 'black',
                    'font-size': '12px'
                }
            },
            {
                selector: 'node[type="Vulnerability"]',
                style: {
                    'label': 'data(label)',
                    'background-color': 'red',
                    'shape': 'rectangle',
                    'width': 80,
                    'height': 80,
                    'text-valign': 'center',
                    'color': 'black',
                    'font-size': '12px'
                }
            },
            {
                selector: 'node[type="CVE"]',
                style: {
                    'label': 'data(label)',
                    'background-color': 'orange',
                    'shape': 'rectangle',
                    'width': 160,
                    'height': 50,
                    'text-valign': 'center',
                    'color': 'black',
                    'font-size': '12px'
                }
            },
	    {
		selector: 'node[id^="compound-"]',
		style: {
		    'background-color': 'skyblue',
		    'background-opacity': 0.333
		}
	    },
	    {
		selector: 'node[id^="vulnerability-compound-"]',
		style: {
		    'background-color': '#ad1a66',
		    'background-opacity': 0.1667
		}
	    },
        {
          selector: 'edge',
          style: {
            width: 1,
            'line-color': 'black',
            'target-arrow-color': 'black',
            'target-arrow-shape': 'triangle',
            label: 'data(label)',
            opacity: 0.55,
            'curve-style': 'bezier',
            'arrow-scale': 1.5,
            'font-size': '14px',
            'text-rotation': 'autorotate',
            color: 'blue',
          },
        },
        // Add more styles for nodes and edges here...
      ],
      layout: {
        name: 'breadthfirst',
        directed: true,
        padding: 50,
      },
      minZoom: 0.5,
      maxZoom: 2.0,
      zoomingEnabled: true,
    });

    console.log('Cytoscape initialized with elements:', elements);

    this.cy.elements().jsons().forEach((element: CytoscapeElement) => {
      console.log('Cytoscape JSON Element:', element.data);

      if (element.data.id) {
        this.displayedNodeIDs[element.data.id] = true;
      }
    });

    // Handle double-tap to load neighbors
    this.cy.on('dbltap', 'node', async (event: EventObject) => {
      const node = event.target;
      const nodeId = node.id();
      const nodeType = node.data('type');

      if (!this.displayedNodeIDs[nodeId]) {
        console.log(`Node ${nodeId} was not part of the initial data`);
        return;
      }

      console.log('Node dbl-tapped:', node.data());

      // if selected nodeId is absent expand the graph else collapse the graph
      if (this.expandedNodes.includes(nodeId)) {

	console.log(`Collapsing neighbors of ${nodeId}`);
	// this.collapseVisualization(nodeId);
	this.collapseRecursiveVisualization(nodeId);
      } else {

	console.log(`Expanding neighbors of ${nodeId}`);
	this.expandVisualization(nodeId, nodeType);
      }
    });
  }

  expandVisualization(nodeId: number, nodeType: string): void {
    this.virtualNetwork.expandVirtualNetwork(nodeId, nodeType)
    .then(() => this.virtualNetwork.getVirtualNetworkData())
    .then((elements) => {

      // Transform the data to ensure compatibility with Cytoscape
      const validElements = elements.map((element) => ({
        ...element,
	group: element.data.type ? 'nodes' : (element.data.source && element.data.target ? 'edges' : undefined),
      }));

      const cy = this.cy; // Access the initialized Cytoscape instance

      // Filter out already displayed elements
      const filteredData = validElements.filter(el => el.data && !this.displayedNodeIDs[el.data.id]);

      const neighbors = filteredData.filter(el => el.group === 'nodes' && el.data.id !== nodeId);

      console.log('FilteredData: ', filteredData);

      console.log('Neighbors: ', neighbors);

      const filteredEdges = filteredData.filter(el => {
        if (el.group === 'edges') {
          const { source, target } = el.data;

	  return (
	    source === nodeId || target === nodeId ||
	    (neighbors.some(n => n.data.id === source) && neighbors.some(n => n.data.id === target))
	  );

          //return (source === nodeId && neighbors.some(n => n.data.id === target)) ||
            //     (target === nodeId && neighbors.some(n => n.data.id === source));
        }

        return false;
      });

      console.log('FilteredEdges: ', filteredEdges);

      // cy.add(filteredData);

      let compoundNodeId: string | null = null;
      let vulnerabilityCompoundNodeId: string | null = null;

      if (nodeType === 'IP') {
        // Create a compound node for neighbors
        compoundNodeId = `compound-${nodeId}`;
        cy.add({
          group: 'nodes',
          data: {
            id: compoundNodeId,
            label: `Neighbors of ${nodeId}`,
          },
        });

        // Create a vulnerability compound node if needed
        const hasVulnerability = neighbors.some(n => n.data.type === 'Vulnerability');
        const hasCVE = neighbors.some(n => n.data.type === 'CVE');
        if (hasVulnerability && hasCVE) {
          vulnerabilityCompoundNodeId = `vulnerability-compound-${nodeId}`;
          cy.add({
            group: 'nodes',
            data: {
              id: vulnerabilityCompoundNodeId,
              label: `Vulnerability Compound for ${nodeId}`,
              parent: compoundNodeId,
            },
          });
        }

        // Assign parent nodes to neighbors
        neighbors.forEach((neighbor) => {
          const { type } = neighbor.data;
          neighbor.data.parent = (type === 'Vulnerability' || type === 'CVE') && vulnerabilityCompoundNodeId
            ? vulnerabilityCompoundNodeId
            : compoundNodeId;
        });
      }

      // Add new elements to Cytoscape
      cy.add([...neighbors, ...filteredEdges]);

      console.log("Debugger Log: - ", typeof nodeId, nodeId);

      if (!this.expandedNodes.includes(nodeId)) {
	this.expandedNodes.push(nodeId);
      }

      this.neighborSets[nodeId] = filteredData;

      // Update displayed nodes to avoid duplicates
      cy.elements().jsons().forEach((element: CytoscapeElement) => {

        if (element.data.id) {
          this.displayedNodeIDs[element.data.id] = true;
        }

      });

      // Apply layouts
      // const applyLayout = (elements: ElementsDefinition, layoutOptions: LayoutOptions) => {
      const applyLayout = (elements: Collection, layoutOptions: LayoutOptions) => {

	// this.cy.layout(layoutOptions).run();
	const layout = elements.layout(layoutOptions);
        layout.run();
      };

      if (compoundNodeId) {
        const compoundNode = cy.getElementById(compoundNodeId);
        if (compoundNode && compoundNode.children().length) {
	  applyLayout(compoundNode.children(), {
	    name: 'cola', // Use the cola layout
	    // animate: true, // Enable animation for smooth transitions
	    // padding: 30, // Add padding around the layout
            // fit: true,
	    // nodeSpacing: 20
	  });
	}
      }

      cy.layout({
        name: 'breadthfirst',
        directed: true,
        padding: 50,
        roots: `[id="${nodeId}"]`,
      }).run();
    })
    .catch((error) => {
      console.error('Error expanding virtual network:', error);
    });

    console.log("Debugging Log - Expansion Expanded Data: ", this.expandedNodes);
  }

collapseRecursiveVisualization(nodeId: number): void {
  const cy = this.cy;

  console.log('Expanded Nodes: ', this.expandedNodes);
  console.log('NeighborSets: ', this.neighborSets);

  const recursiveCollapse = (currentNodeId: number): void => {
    const neighbors = this.neighborSets[currentNodeId];

    console.log('Current node to collapse: ', currentNodeId);
    console.log('Neighbors to remove: ', neighbors);

    if (!neighbors || !this.expandedNodes.includes(currentNodeId)) {
      console.log('No neighbors to remove.');
      return;
    }

    neighbors.forEach((neighbor) => {
      const neighborId = Number(neighbor.data.id); // Ensure neighborId is a number

      console.log('Debugger Log: - Expanded Nodes: ', this.expandedNodes)
      console.log('Debugger Log: - Neighbor ID: ', neighborId, neighborId.toString(), typeof neighborId);

      if (this.expandedNodes.includes(neighborId)) {
        console.log(`Collapsing expanded Node ${neighborId} recursively`);
        recursiveCollapse(neighborId);
      }

      const neighborNode = cy.getElementById(neighborId);
      if (neighborNode) {
        neighborNode.remove();
      }

      cy.edges(`[source = "${neighborId}"], [target = "${neighborId}"]`).remove();

      // Remove compound nodes if they exist
      const compoundNodeId = `compound-${neighborId}`;
      const compoundNode = cy.getElementById(compoundNodeId);
      if (compoundNode) compoundNode.remove();

      const vulnerabilityCompoundNodeId = `vulnerability-compound-${neighborId}`;
      const vulnerabilityCompoundNode = cy.getElementById(vulnerabilityCompoundNodeId);
      if (vulnerabilityCompoundNode) vulnerabilityCompoundNode.remove();
    });

    this.expandedNodes = this.expandedNodes.filter((id) => id !== currentNodeId);
    delete this.neighborSets[currentNodeId];
    console.log(`Neighbors of node ${currentNodeId} collapsed.`);
  };

  recursiveCollapse(nodeId);
}


}

