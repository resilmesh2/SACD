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
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { GetAllSubnetsQuery, GetAllSubnetsQueryService } from '../../graphql/subnets/subnets.operation.generated';

type Subnet = GetAllSubnetsQuery['subnets'][0];

@Component({
  selector: 'subnet-graph-page',
  templateUrl: './subnet-graph-page.component.html',
  styleUrls: ['./subnet-graph-page.component.scss'],
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
    MatButtonToggleModule,
  ],
})
export class SubnetGraphPageComponent implements OnInit {
  errorMessage = '';
  selectedNode: WritableSignal<Node | null> = signal(null);
  subnets: WritableSignal<Subnet[]> = signal([]);

  customLayout: Layout = new CustomLayout(Orientation.BOTTOM_TO_TOP);
  center$ = new Subject<any>();

  graphLoading: boolean = false;

  controls: SentinelControlItem[] = [];

  nodes: WritableSignal<Node[]> = signal([]);
  edges: WritableSignal<Edge[]> = signal([]);

  ipVersion = signal<'v4' | 'v6'>('v4');

  private destroyRef = inject(DestroyRef);
  private router = inject(Router);

  constructor(private getAllSubnets: GetAllSubnetsQueryService) {}

  ngOnInit(): void {
    this.getGraphData();
  }

  public getGraphData(): void {
    this.graphLoading = true;
    this.selectedNode.set(null);

    this.getAllSubnets
      .fetch({}, { fetchPolicy: 'network-only' })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (result) => {
          const subnets = [...result.data.subnets].sort((a, b) => {
            const cidrA = ~~a.range.split('/')[1];
            const cidrB = ~~b.range.split('/')[1];
            return cidrA - cidrB || a.range.localeCompare(b.range);
          });
          this.subnets.set(subnets);
          this.setEdgesAndNodes();
          this.graphLoading = false;
          this.errorMessage = '';
        },
        error: (error) => {
          this.subnets.set([]);
          this.graphLoading = false;
          this.errorMessage = error.message;
        },
      });
  }

  isNotParent(subnetRange: string) {
    return this.subnets().some((subnet) => subnet.parent_subnet.some((ps) => ps.range === subnetRange));
  }

  hasNoParent(subnet: Subnet) {
    return subnet.parent_subnet.length === 0;
  }

  isRoot(subnetRange: string) {
    // TODO: extend this when needed (e.g. when IPv6 support is added)
    return subnetRange === '0.0.0.0/0';
  }

  isPartOfConstituency() {
    // TODO: TO BE IMPLEMENTED (IN ISIM)
    return true; //Math.random() < 0.5;
  }

  setEdgesAndNodes(): void {
    this.nodes.set(
      this.subnets().flatMap((subnet) => {
        if (!this.isNotParent(subnet.range) && this.hasNoParent(subnet) && !this.isRoot(subnet.range)) {
          return [];
        }
        const isInternal = this.isPartOfConstituency();
        return {
          id: subnet.range,
          label: subnet.range,
          data: {
            type: this.isRoot(subnet.range) ? 'root' : isInternal ? 'subnet' : 'external subnet',
            customColor: this.isRoot(subnet.range) ? '#e4295f' : isInternal ? '#343f5d' : '#307351',
            textColor: '#fff',
            ...subnet,
          },
        };
      }),
    );

    this.edges.set(
      this.subnets().flatMap((subnet, index) => {
        const parentRange = subnet.parent_subnet.at(0)?.range;
        if (!parentRange) return [];

        return {
          id: `edge-${index}`,
          source: subnet.range,
          target: parentRange,
          label: 'is part of',
        };
      }),
    );
  }

  onIpVersionChange() {
    // TODO: when IP versions are implemented/added in the schema
  }

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
