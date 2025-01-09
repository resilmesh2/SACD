import { Component, OnInit, ViewChild, AfterViewInit, ElementRef, ChangeDetectorRef } from '@angular/core';
import { DataService } from '../shared/services/data.service';

@Component({
  selector: 'app-interactive-asset',
  templateUrl: './interactive-asset.component.html',
  styleUrls: ['./interactive-asset.component.css']
})

export class InteractiveAssetComponent {
  subnetSearch: string = '147.251.96.0/24';
  graphData: any[] = []

  loadCytoscapeData(): void {

    // Placeholder for loading graph data
    console.log('Search triggered for:', this.subnetSearch);
    // Example logic
    if (this.subnetSearch) {
      this.graphData = []; // Replace with actual Neo4j/Cytoscape data
    }
  }
}
