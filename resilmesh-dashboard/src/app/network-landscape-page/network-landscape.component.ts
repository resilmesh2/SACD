import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NetworkLandscapeService } from '../shared/services/static.network.data'; 
import * as d3 from 'd3';
import { switchMap } from 'rxjs';

interface ExtendedHierarchyNode extends d3.HierarchyNode<any> {
  x0: number;
  y0: number;
  x1: number;
  y1: number;
  width: number; // Add this if `width` is used in calculations
}

@Component({
  selector: 'app-asset-network-landscape',
  templateUrl: './network-landscape.component.html',
  styleUrls: ['./network-landscape.component.css'],
})
export class NetworkLandscapeComponent implements OnInit {
  networkSearch: string = '';
  selectedSupernet: string = '147.251.96.0/24';
  elements: string [] = [];
  svgHeight: number = 420;
  additionalLeftSpace: number = 10;
  // isLoading: boolean = false;
  availableSupernets: string[] = [
    "147.251.96.0/21",
    "147.251.96.0/22",
    "147.251.96.0/23",
    "147.251.96.0/24",
    "147.251.96.0/25",
    "147.251.96.0/26",
    "147.251.96.0/27",
    "147.251.96.0/28"
 ];

  constructor(
    private networkLandScapeService: NetworkLandscapeService,
    private route: ActivatedRoute
  ) {
    if (route.snapshot.params?.range) {
      this.networkSearch = route.snapshot.params.range;
    }
  }

  ngOnInit(): void {
    if (this.networkSearch) {
      this.fetchVirtualNetwork(this.networkSearch);
    } 

  }

  fetchVirtualNetwork(netRangePrefix: string): void {
    if (!netRangePrefix) {
      console.warn('No network range provided.');
      return;
    }

    // Fetch initial CIDR data
    this.networkLandScapeService.fetchInitialCIDRData(netRangePrefix).pipe(
      switchMap(cidrData => {
        console.log('Initialize Virtual Network - Fetched CIDR data:', cidrData);

        // Return the network observable
        return this.networkLandScapeService.getVirtualNetwork();
      })
    ).subscribe(
      (networkData) => {

        console.log('Retrieve Virtual Network - Fetched virtual network data:', networkData);
	this.elements = networkData;

        // Initialize D3 visualization with the fetched data

	console.log('Initializing D3 Visualization: ', this.selectedSupernet, networkData);

        this.initializeD3Visualization(this.selectedSupernet, networkData);
      },
      (error) => {
        console.error('Error fetching virtual network:', error);
      }
    );
  }

  private updateCIDRTreemap(supernet: string, cidrDict: any): Promise<{ treemap: any; cidrSuffixes: string[] }> {

    return new Promise((resolve, reject) => {
      this.networkLandScapeService.updateCIDRTreemap(supernet, cidrDict).subscribe(
        (response) => {
          const { treemap, cidrSuffixes } = response;
          if (treemap && cidrSuffixes) {

            console.log('CIDR Treemap:', treemap);
            console.log('CIDR Suffixes:', cidrSuffixes);
            resolve({ treemap, cidrSuffixes });
          } else {

            console.warn('No treemap or CIDR suffixes returned.');
            resolve({ treemap: null, cidrSuffixes: [] });
          }
        },
        (error) => {
          console.error('Error updating CIDR treemap:', error);
          reject(error);
        }
      );
    });

  }

  async initializeD3Visualization(supernet: string, data: any): Promise<void> {
    console.log('Initializing D3 visualization for:', supernet, data);

    const cidrDict: { [key: string]: any } = {};
    const initialLabel = 'neo4j';
    const newLabel = 'my_pool';

    const values = data[0].data['details'];
    const vulns = data[0].data['vulns'];

    // this.isLoading = true;

    values.forEach((val: string) => {
      if (vulns.includes(val)) {
        cidrDict[val] = {
          value: val,
          label: initialLabel,
          vuln: 1,
        };
      } else {
        cidrDict[val] = {
          value: val,
          label: initialLabel,
          vuln: 0,
        };
      }
    });

    let superLabel = newLabel;

    Object.entries(cidrDict).forEach(([key, value]: [string, any]) => {
      if (value.value === supernet) {
        superLabel = value.label;
      }
    });

    try {
      const { treemap, cidrSuffixes } = await this.updateCIDRTreemap(supernet, cidrDict);

      if (!treemap) {
        console.warn('Treemap data is missing. Aborting D3 initialization.');
        return;
      }

      // Wrap treemap data in hierarchy
      const cidrHierarchy = this.wrapAsHierarchy(treemap, supernet, superLabel);

      // Generate the treemap SVG
      const treemapSVG = this.createTreemapSVG(cidrHierarchy, cidrSuffixes, this.svgHeight);

      // Render the SVG in a container
      const container = document.getElementById('treemapContainer');

      if (container) {
        container.innerHTML = '';
        container.innerHTML = treemapSVG;
      }

      // this.isLoading = false;
    } catch (error) {
      console.error('Error in D3 visualization initialization:', error);
      // this.isLoading = false;
    }
  }

  private wrapAsHierarchy(flatData: { [key: string]: { children?: { cidr: string }[] } }, rootCidr: string, rootLabel: string): any {
    // Define rootNode with an explicitly typed children array
    const rootNode: { cidr: string; label: string; children: any[] } = { 
      cidr: rootCidr, 
      label: rootLabel, 
      children: [] 
    };

    const cidrMap: { [key: string]: any } = {};
  
    // Populate cidrMap with nodes
    Object.entries(flatData).forEach(([key, value]) => {
      const node = { ...value, cidr: key }; // Ensure value is typed correctly
      cidrMap[key] = node;
    });

    // Build the hierarchy
    Object.entries(flatData).forEach(([key, value]) => {
      if (value.children && value.children.length > 0) {
        value.children.forEach((child) => {
          if (cidrMap[child.cidr]) {
            cidrMap[key].children = cidrMap[key].children || [];
            cidrMap[key].children.push(cidrMap[child.cidr]);
          }
        });
      }
    });

    // Add nodes without parents to the root
    Object.values(cidrMap).forEach((node: any) => {
      if (!node.parent) {
        rootNode.children.push(node); // This will now work
      }
    });

    return rootNode;
  }

  private createTreemapSVG(treeHierarchy: any, cidrSuffixes: string[], height: number): string {
    const margin = 10;
    const cidrHeadings = [...cidrSuffixes.map(suffix => `/${suffix}`), 'Host IP'];
    const rowHeight = height / cidrHeadings.length;
    const fixedNodeWidth = 30;

    const root = d3.hierarchy(treeHierarchy) as ExtendedHierarchyNode;  

    // Compute widths for all nodes
    const computeWidths = (node: ExtendedHierarchyNode) => {
      if (!node.children || node.children.length === 0) {
        node.width = fixedNodeWidth;
      } else {
        node.width = node.children.reduce((total, child) => {
          computeWidths(child as ExtendedHierarchyNode);
          return total + (child as ExtendedHierarchyNode).width;
        }, 0);
      }
    };

    const customTiling = (
      node: ExtendedHierarchyNode,
      x0: number,
      y0: number,
      rowHeight: number,
      fixedNodeWidth: number,
      dataHeight: number
    ) => {

      // modify cell text based on conditions
      if (node.data && node.data.cidr) {
	const cidr = node.data.cidr;

	if (cidr.endsWith("/30") || cidr.endsWith("/31")) {

	  const parts = cidr.split('.');

	  if (parts.length >= 4) {

	    node.data.cidr = parts[3];
	  }
	} else if (cidr.endsWith("/32")) {

	  node.data.cidr = "IP";

	  const vuln = node.data.vuln;

	  if (vuln !== undefined) {

	    if (vuln === 1) {

	      node.data.color = "crimson";
	    } else {

	      node.data.color = "aqua";
	    }

	  }
	}

      }

      // define cell height, widths and (x0, y0, x1, y1) co-ordinates 
      if (!node.children || node.children.length === 0) {
        const leafDepth = node.depth;

        if (leafDepth < dataHeight) {
          const childDepth = leafDepth + 1;

          const newNode = Object.assign(
            d3.hierarchy({ cidr: 'Free' }),
            {
              depth: childDepth,
              parent: node,
              width: fixedNodeWidth,
              x0: 0,
              y0: 0,
              x1: 0,
              y1: 0,
              value: 1,
              children: [],
              height: 0,
            }
          ) as ExtendedHierarchyNode;

          node.children = [newNode];
          const childX0 = x0;
          const childY0 = y0 + rowHeight;

          customTiling(newNode, childX0, childY0, rowHeight, fixedNodeWidth, dataHeight);
        }
      }

      node.x0 = x0;
      node.y0 = y0;
      node.x1 = x0 + node.width;
      node.y1 = y0 + rowHeight;

      if (node.children) {
        let currentX = x0;
        node.children.forEach((child) => {
          customTiling(child as ExtendedHierarchyNode, currentX, y0 + rowHeight, rowHeight, fixedNodeWidth, dataHeight);
          currentX += (child as ExtendedHierarchyNode).width;
        });
      }
    };

    computeWidths(root);

    customTiling(root, 0, 0, rowHeight, fixedNodeWidth, root.height);

    const svgNode = d3.create('svg')
      .attr('viewBox', `-${this.additionalLeftSpace} -10 ${root.width + this.additionalLeftSpace + 10} ${height + 10}`)
      .attr('width', root.width + this.additionalLeftSpace)
      .attr('height', height)
      .style('font', '12px sans-serif');

    svgNode.selectAll('rect')
      .data(root.descendants() as ExtendedHierarchyNode[])
      .join('rect')
      .attr('x', d => d.x0)
      .attr('y', d => d.y0)
      .attr('width', d => d.x1 - d.x0)
      .attr('height', rowHeight)
      .attr('fill', d => {
          if (d.data.color) return d.data.color;
          if (d.children && d.data.label === "neo4j") return 'steelblue';
          if (d.children && d.data.label === "my_pool") return 'lightgray';
          return 'lightgray'; // Default for "Free"
      })
      .attr('stroke', 'white');

    svgNode.selectAll('text')
      .data(root.descendants() as ExtendedHierarchyNode[])
      .join('text')
      .attr('x', d => (d.x0 + d.x1) / 2)
      .attr('y', d => d.y0 + rowHeight / 2)
      .attr('dy', '0.35em')
      .attr('text-anchor', 'middle')
      .text(d => d.data.cidr || "Free")
      .attr('fill', d => d.data.color === 'crimson' ? 'white' : 'black')
      .style('font-size', d => d.data.cidr?.endsWith("/30") || d.data.cidr?.endsWith("/31") ? '8px' : '10px');


    return svgNode.node()?.outerHTML || '';
  }

}
