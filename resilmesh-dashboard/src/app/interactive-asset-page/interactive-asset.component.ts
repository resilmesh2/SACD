import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { DataService } from '../shared/services/data.service';
import { ActivatedRoute } from '@angular/router';
import cytoscape from 'cytoscape';

@Component({
  selector: 'app-interactive-asset',
  templateUrl: './interactive-asset.component.html',
  styleUrls: ['./interactive-asset.component.css']
})

export class InteractiveAssetComponent implements OnInit {
  // subnetSearch: string = '147.251.96.0/24';
  subnetSearch: string = '';
  graphData: any[] = [];
  errorMessage = '';
  dataLoading = false;
  cy: any;

  constructor(private dataService: DataService, private route: ActivatedRoute){
    if (route.snapshot.params && route.snapshot.params.range) {
      this.subnetSearch = route.snapshot.params.range;
      this.loadCytoscapeData();
    }
  }

  ngOnInit(): void {

    if (this.subnetSearch){
      this.loadCytoscapeData();
    }
  }

  loadCytoscapeData(): void {

    this.dataLoading = true;
    let supernet = null;

    // Placeholder for loading graph data
    console.log('Search triggered for:', this.subnetSearch);

    // Example logic

    this.dataService.getIPNodesBySubnetRange(this.subnetSearch).subscribe(
      (data) => {
	console.log('Loading Cytoscape Data: ', data);
	supernet = this.subnetSearch;
	this.graphData = data;
	this.initializeCytoscape(this.subnetSearch);
	this.dataLoading = false;
      },
      (error) => {
	this.errorMessage = error;
	this.dataLoading = false;
      }
    );

  }

    initializeCytoscape(supernet: string): void {
    // Destroy any existing Cytoscape instance to avoid duplicates
    if (this.cy) {
      this.cy.destroy();
    }

    this.cy = cytoscape({
      container: document.getElementById('cy'), // Bind to the 'cy' container
      elements: [
        {
          data: { id: 'supernet', label: supernet }, // Central supernet node
        },
      ],
      style: [
        {
          selector: 'node',
          style: {
            label: 'data(label)',
            'background-color': 'black',
            shape: 'ellipse',
            width: 120,
            height: 120,
            'text-valign': 'center',
            color: '#fff',
            'font-size': '15px',
          },
        },
      ],
      layout: {
        name: 'preset', // No automatic layout as we only display the central node for now
      },
    });

    console.log('Cytoscape initialized with supernet:', supernet);
  }
}
