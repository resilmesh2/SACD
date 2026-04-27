import { Component, DestroyRef, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Subject } from 'rxjs';
import { Edge, Layout, NgxGraphModule, Node } from '@swimlane/ngx-graph';
import { getLabelOfGraphNode } from '../../utils/graph-utils/ngx-graph.utils';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SentinelCardComponent } from '@sentinel/components/card';
import { SentinelControlItem } from '@sentinel/components/controls';
import { CustomLayout, Orientation } from '../../utils/custom-graph-layout';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router } from '@angular/router';
import { ORGANIZATION_PATH, SUBNETS_PATH } from '../../paths';
import { GetAllOrgUnitsQuery, GetAllOrgUnitsQueryService } from '../../graphql/org-units/org-units.operation.generated';

type OrgUnit = GetAllOrgUnitsQuery['organizationUnits'][0];

@Component({
  selector: 'org-graph-page',
  templateUrl: './org-graph-page.component.html',
  styleUrls: ['./org-graph-page.component.scss'],
  imports: [
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
    MatTooltipModule,
  ],
})
export class OrgGraphPageComponent implements OnInit {
  errorMessage = '';
  selectedNode: WritableSignal<Node | null> = signal(null);
  orgUnits: WritableSignal<OrgUnit[]> = signal([]);

  customLayout: Layout = new CustomLayout(Orientation.BOTTOM_TO_TOP);
  center$ = new Subject<any>();

  graphLoading: boolean = false;

  controls: SentinelControlItem[] = [];

  nodes: WritableSignal<Node[]> = signal([]);
  edges: WritableSignal<Edge[]> = signal([]);

  private destroyRef = inject(DestroyRef);
  private router = inject(Router);

  constructor(private getAllOrgUnits: GetAllOrgUnitsQueryService) {}

  ngOnInit(): void {
    this.getGraphData();
  }

  public getGraphData(): void {
    this.graphLoading = true;
    this.selectedNode.set(null);

    this.getAllOrgUnits
      .fetch({}, { fetchPolicy: 'network-only' })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (result) => {
          const orgUnits = [...result.data.organizationUnits].sort((a, b) => a.name.localeCompare(b.name));
          this.orgUnits.set(orgUnits);
          this.setEdgesAndNodes();
          this.graphLoading = false;
          this.errorMessage = '';
        },
        error: (error) => {
          this.orgUnits.set([]);
          this.graphLoading = false;
          this.errorMessage = error.message;
        },
      });
  }

  setEdgesAndNodes(): void {
    this.nodes.set(
      this.orgUnits().map((orgUnit) => ({
        id: orgUnit.name,
        label: orgUnit.name,
        data: {
          type: 'org unit',
          customColor: '#C1292E',
          textColor: '#fff',
          ...orgUnit,
        },
      })),
    );

    this.edges.set(
      this.orgUnits().flatMap((orgUnit, index) => {
        const parentName = orgUnit.parent_org_unit[0]?.name;
        if (!parentName) return [];

        return {
          id: `edge-${index}`,
          source: orgUnit.name,
          target: parentName,
          label: 'is part of',
        };
      }),
    );
  }

  // addSubnetsNodes() {
  //     this.nodes.update(value => [...value, ...this.orgUnits().flatMap(orgUnit => orgUnit.subnets.map(subnet => {
  //         return {
  //             id: `node-${subnet}`,
  //             label: subnet,
  //             data: {
  //                 type: 'subnet',
  //                 customColor: '#3a4d81',
  //                 textColor: '#fff',
  //             }
  //         };
  //     }))]);

  //     this.edges.update(value => [...value, ...this.orgUnits().flatMap(orgUnit => orgUnit.subnets.map(subnet => {
  //         return {
  //             id: `edge-${subnet}`,
  //             source: orgUnit.name,
  //             target: `node-${subnet}`,
  //             label: "is part of",
  //         };
  //     }))]);
  // }

  public getLabel(node: Node) {
    return getLabelOfGraphNode(node);
  }

  navigateToSubnetDetail(subnetRange: string): void {
    if (!subnetRange || subnetRange == '---') return;
    this.router.navigate([SUBNETS_PATH, subnetRange]);
  }

  navigateToOrgUnitDetail(orgName: string): void {
    if (!orgName || orgName == '---') return;
    this.router.navigate([ORGANIZATION_PATH, orgName]);
  }

  selectNode(node: Node) {
    this.selectedNode.set(node);
  }
}
