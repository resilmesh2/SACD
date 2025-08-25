import { ChangeDetectionStrategy, Component, OnInit, signal, SimpleChanges, WritableSignal } from '@angular/core';

import { tap } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { Edge, Layout, NgxGraphModule, Node } from '@swimlane/ngx-graph';
import { Mission, MissionStructure } from '../../models/mission-structure.model';
import { DataService } from '../../services/data.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SentinelButtonWithIconComponent } from '@sentinel/components/button-with-icon';
import { SentinelCardComponent } from '@sentinel/components/card';
import { SentinelControlItem } from '@sentinel/components/controls';
import { SubnetExtendedData } from '../../models/subnet.model';
import { CustomLayout } from '../../utils/custom-graph-layout';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'subnet-graph-page',
  templateUrl: './subnet-graph-page.component.html',
  styleUrls: ['./subnet-graph-page.component.scss'],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    NgxGraphModule,
    SentinelCardComponent,
    MatTooltipModule
  ]
})

export class SubnetGraphPageComponent implements OnInit {
    errorMessage = '';
    selectedNode: WritableSignal<Node | null> = signal(null);
    subnets: WritableSignal<SubnetExtendedData[]> = signal([]);

    customLayout: Layout = new CustomLayout();
    center$ = new Subject<any>();

    graphLoading: boolean = false;

    controls: SentinelControlItem[] = [];

    nodes: WritableSignal<Node[]> = signal([]);
    edges: WritableSignal<Edge[]> = signal([]);

    constructor(private dataService: DataService) {}

    ngOnInit(): void {
        // this.dataService.getMissionNames().subscribe({
        //   next: (missionNames: string[]) => {
        //     this.missionNames = missionNames;
        //   },
        //   error: (error) => {
        //     this.errorMessage = error.message || 'Error fetching mission names'; // Handle errors
        //   }
        // });
        this.getGraphData();
    }

    public getGraphData(): void {
        this.graphLoading = true
        this.getSubnets().subscribe({
            next: (subnets) => {
                this.subnets.set(subnets);
                console.log(this.dataService.converToGraph(this.subnets()));
                this.subnets().sort((a, b) => (a.range > b.range) ? -1 : ((b.range > a.range) ? 1 : 0));
                //this.subnets.set(this.subnets().filter((subnet) => subnet.parentSubnet !== undefined && subnet.parentSubnet !== null && subnet.parentSubnet !== ''));

                this.setEdgesAndNodes();
                this.graphLoading = false;
                this.errorMessage = "";
            },
            error: (error) => {
                this.subnets.set([]);
                this.graphLoading = false;
                this.errorMessage = error.message;
            }
        });
        this.selectedNode.set(null);   
        
    }

    setEdgesAndNodes(): void {
        this.nodes.set(this.subnets().map((subnet) => {
            return {
                id: subnet.range,
                label: subnet.range,
                data: {
                    type: 'subnet',
                    customColor: '#0f3057',
                    textColor: '#fff',
                    ... subnet
                }
            };
        }));

        this.edges.set(this.subnets().flatMap((subnet, index) => {
            if (subnet.parentSubnet === undefined || subnet.parentSubnet === null || subnet.parentSubnet === '') {
                return [];
            }

            return {
                id: `edge-${index}`,
                source: subnet.range,
                target: subnet.parentSubnet,
                label: "is part of",
            };
        }));

        console.log("Nodes and edges set", this.nodes(), this.edges());
    }

    private getSubnets(): Observable<SubnetExtendedData[]> {
        return this.dataService.getSubnets().pipe(
            tap((subnets: SubnetExtendedData[]) => {
                this.subnets.set(subnets);
            })
        );
    }

    public getLabel(node: Node) {
        console.log("Getting label for node", node);
        return this.dataService.getLabelOfGraphNode(node);
    }

//     ngOnChanges(changes: SimpleChanges): void {
//         if (changes['structure'] && !changes['structure'].firstChange) {
//             this.updateGraph();
//         }
//     }

//   private updateGraph(): void {
//     if (this.structure) {
//       [this.nodes, this.edges] = this.structureToGraph(this.structure);
//       this.center$.next(undefined);
//     }
//   }

//   /**
//    * Convert mission structure JSON to nodes and edges
//    * @param structure
//    */
//   structureToGraph(structureJSON: MissionStructure): [Node[], Edge[]] {
//     if (structureJSON) {
//       const nodes: Node[] = [],
//         edges: Edge[] = [];
//       // const structureJSON: Structure = JSON.parse(str);

//       /**
//        * Nodes
//        */
//       let newNode: Node;

//       // Missions
//       structureJSON.nodes.missions.forEach((n) => {
//         newNode = {
//           id: n.id.toString(),
//           label: n.name,
//           data: { 
//             type: 'mission',
//             customColor: '#0f3057',
//             textColor: '#fff',
//             criticality: n.criticality,
//             description: n.description
//           },
//         };
//         nodes.push(newNode);
//       });

//       /**
//        * Edges
//        */
//       let newEdge: Edge;

//       structureJSON.relationships.one_way.forEach((r) => {
//         newEdge = { source: r.from.toString(), target: r.to.toString(), label: '' };
//         edges.push(newEdge);
//       });

//       for (let i = 0; i < 4; i++) {
//         structureJSON.relationships.one_way.forEach((r) => {
//           if (this.disabledNodes.includes(r.to)) {
//             const index = nodes.findIndex((node) => node.id === r.from.toString());
//             if (nodes[index].label !== 'OR') {
//               nodes[index].data.disabled = true;
//               this.disabledNodes.push(r.from);
//             } else {
//               let disableOr = true;
//               structureJSON.relationships.one_way
//                 .filter((rel) => rel.from === r.from)
//                 .forEach((rel) => {
//                   if (!this.disabledNodes.includes(rel.to)) {
//                     disableOr = false;
//                   }
//                 });
//               if (disableOr) {
//                 nodes[index].data.disabled = true;
//                 this.disabledNodes.push(r.from);
//               }
//             }
//           }
//         });
//       }

//       return [nodes, edges];
//     } else {
//       return [[], []];
//     }
//   }

  selectNode(node: Node) {
    this.selectedNode.set(node);
  }
}

