import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NgxGraphModule, Node } from '@swimlane/ngx-graph';
import { MissionStructure } from '../../models/mission-structure.model';
import { getLabelOfGraphNode } from '../../utils/graph-utils/ngx-graph.utils';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MissionGraphComponent } from './mission-graph/mission-graph.component';
import { SentinelButtonWithIconComponent } from '@sentinel/components/button-with-icon';
import { SentinelCardComponent } from '@sentinel/components/card';
import { SentinelControlItem } from '@sentinel/components/controls';
import {
  MissionPageGetNamesQueryService,
  MissionPageGetMissionQueryService,
  MissionPageGetMissionQuery,
} from './graphql/mission-page.operation.generated';

type MissionEntry = MissionPageGetMissionQuery['missions'][0];

@Component({
  selector: 'mission-page',
  templateUrl: './mission-page.component.html',
  styleUrls: ['./mission-page.component.scss'],
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
    MissionGraphComponent,
    SentinelButtonWithIconComponent,
    SentinelCardComponent,
  ],
})
export class MissionPageComponent implements OnInit {
  private destroyRef = inject(DestroyRef);

  errorMessage = '';
  missionNames: string[] = [''];
  selectedMissionName = '';
  selectedNode: Node | null = null;
  setSelectedNode = (node: Node) => {
    this.selectedNode = node;
  };
  missionsStructure: MissionStructure | null = null;
  graphLoading: boolean = false;

  controls: SentinelControlItem[] = [];

  constructor(
    private getNamesService: MissionPageGetNamesQueryService,
    private getMissionService: MissionPageGetMissionQueryService,
  ) {}

  ngOnInit(): void {
    this.getNamesService
      .fetch({}, { fetchPolicy: 'network-only' })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (result) => {
          this.missionNames = result.data.missions.map((m) => m.name);
        },
        error: (error) => {
          this.errorMessage = error.message || 'Error fetching mission names';
        },
      });

    this.getGraphData();
  }

  public getGraphData(): void {
    this.graphLoading = true;
    this.selectedNode = null;

    this.getMissionService
      .fetch(
        { name: this.selectedMissionName },
        { fetchPolicy: 'network-only' },
      )
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (result) => {
          this.missionsStructure = this.makeMissionsStructure(
            result.data.missions,
          );
          this.graphLoading = false;
          this.errorMessage = '';
        },
        error: (error) => {
          this.missionsStructure = null;
          this.graphLoading = false;
          this.errorMessage = error.message;
        },
      });
  }

  public getLabel(node: Node) {
    return getLabelOfGraphNode(node);
  }

  private makeMissionsStructure(missions: MissionEntry[]): MissionStructure {
    return missions.reduce(
      (acc: MissionStructure, mission) => {
        const structure: MissionStructure = JSON.parse(mission.structure);
        return {
          nodes: {
            missions: [...acc.nodes.missions, ...structure.nodes.missions],
            hosts: [...acc.nodes.hosts, ...structure.nodes.hosts],
            services: [...acc.nodes.services, ...structure.nodes.services],
            aggregations: {
              or: [
                ...acc.nodes.aggregations.or,
                ...structure.nodes.aggregations.or,
              ],
              and: [
                ...acc.nodes.aggregations.and,
                ...structure.nodes.aggregations.and,
              ],
            },
          },
          relationships: {
            two_way: [
              ...acc.relationships.two_way,
              ...structure.relationships.two_way,
            ],
            one_way: [
              ...acc.relationships.one_way,
              ...structure.relationships.one_way,
            ],
            supports: [
              ...acc.relationships.supports,
              ...structure.relationships.supports,
            ],
            has_identity: [
              ...acc.relationships.has_identity,
              ...structure.relationships.has_identity,
            ],
          },
        };
      },
      {
        nodes: {
          missions: [],
          hosts: [],
          services: [],
          aggregations: { or: [], and: [] },
        },
        relationships: {
          two_way: [],
          one_way: [],
          supports: [],
          has_identity: [],
        },
      },
    );
  }
}
