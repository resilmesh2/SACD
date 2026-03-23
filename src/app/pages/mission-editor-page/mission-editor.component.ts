import {
  Component,
  computed,
  DestroyRef,
  inject,
  model,
  signal,
  ViewChild,
  WritableSignal,
} from '@angular/core';
import { SentinelCardComponent } from '@sentinel/components/card';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import {
  AggregationLayer,
  FlowEditorComponent,
  MissionNode,
  MissionNodeData,
  MissionNodeType,
} from './flow-editor/flow-editor.component';
import { SentinelButtonWithIconComponent } from '@sentinel/components/button-with-icon';
import { MissionValidator } from './mission-validator';
import { MissionEditorService, MissionPayload } from './mission-editor.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatIcon } from '@angular/material/icon';
import { NgTemplateOutlet } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  MissionPageGetNamesQueryService,
  MissionPageGetMissionQueryService,
} from '../mission-page/graphql/mission-page.operation.generated';
import * as dagre from 'dagre';

export type MissionData = {
  missions: MissionsMap;
  nodes: MissionNode[];
  connections: {
    from: string;
    to: string;
  }[];
};

export type MissionsMap = Record<string, MissionMetadata>;

export type MissionMetadata = {
  name: string;
  description: string;
  criticality: number;
};

type NodeInfo = {
  id: number;
  type: MissionNodeType;
  layer: AggregationLayer | undefined;
  name: string;
  data: MissionNodeData;
};

@Component({
  selector: 'mission-page',
  templateUrl: './mission-editor.component.html',
  styleUrls: ['./mission-editor.component.scss'],
  imports: [
    SentinelCardComponent,
    MatLabel,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    SentinelButtonWithIconComponent,
    FlowEditorComponent,
    MatIcon,
    NgTemplateOutlet,
    MatSelectModule,
  ],
  providers: [MissionValidator, MissionEditorService],
})
export class MissionEditorComponent {
  missionsMap = model<MissionsMap>({
    '0': {
      name: '',
      description: '',
      criticality: 1,
    },
  });

  missionIds = computed(() => Object.keys(this.missionsMap()));
  existingMissionNames = signal([]);
  uploadMode = signal<'create' | 'update'>('create');
  selectedMission = signal('');

  public connections: WritableSignal<{ from: string; to: string }[]> = model([
    { from: '0-output', to: '1-input' },
  ]);

  public nodes: WritableSignal<MissionNode[]> = model([
    {
      id: '0',
      name: 'Mission',
      type: 'root',
      position: { x: 0, y: 0 },
      data: {},
      validation: { error: false, reason: '' },
    },
    {
      id: '1',
      name: 'AND',
      type: 'and',
      position: { x: 0, y: 100 },
      layer: 'root-and',
      data: {},
      validation: { error: false, reason: '' },
    },
  ]);

  private _snackBar = inject(MatSnackBar);
  private destroyRef = inject(DestroyRef);

  @ViewChild(FlowEditorComponent)
  private flowEditor!: FlowEditorComponent;

  openSnackBar(message: string, action: string, { error = false } = {}) {
    this._snackBar.open(message, action, {
      panelClass: error ? ['snackbar-error'] : undefined,
    });
  }

  constructor(
    private missionValidator: MissionValidator,
    private missionEditorService: MissionEditorService,
    private getMissionNamesService: MissionPageGetNamesQueryService,
    private getMissionService: MissionPageGetMissionQueryService,
  ) {
    this.getMissionNames();
  }

  updateMissionField(
    missionId: string,
    field: keyof MissionMetadata,
    value: any,
  ) {
    this.missionsMap.update((map) => ({
      ...map,
      [missionId]: { ...map[missionId], [field]: value },
    }));
  }

  getMissionNames() {
    this.getMissionNamesService
      .fetch({}, { fetchPolicy: 'network-only' })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (result) => {
          this.existingMissionNames.set(
            result.data.missions.map((m) => m.name) as any,
          );
        },
      });
  }

  loadMission(event: { value: string }) {
    this.getMissionService
      .fetch({ name: event.value ?? '' }, { fetchPolicy: 'network-only' })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (result) => {
          const payload = result.data.missions[0]?.structure;
          if (!payload) {
            alert('no structure for mission!');
            return;
          }
          this.convertPayloadToNodesConnections(JSON.parse(payload));
        },
      });
  }

  resetEditor() {
    this.missionsMap.set({
      '0': {
        name: '',
        description: '',
        criticality: 1,
      },
    });
    this.nodes.set([
      {
        id: '0',
        name: 'Mission',
        type: 'root',
        position: { x: 0, y: 0 },
        data: {},
        validation: { error: false, reason: '' },
      },
      {
        id: '1',
        name: 'AND',
        type: 'and',
        position: { x: 0, y: 100 },
        layer: 'root-and',
        data: {},
        validation: { error: false, reason: '' },
      },
    ]);
    this.connections.set([{ from: '0-output', to: '1-input' }]);
    this.flowEditor.fCanvas.resetScaleAndCenter(false);
    this.uploadMode.set('create');
    this.selectedMission.set('');
    this.openSnackBar('Mission editor reset to default state.', 'OK');
  }

  convertPayloadToNodesConnections(payload: MissionPayload) {
    this.missionsMap.set({});
    this.nodes.set([]);
    this.connections.set([]);

    payload.nodes.missions.forEach((mission) => {
      this.missionsMap.update((map) => {
        return {
          ...map,
          [mission.id]: {
            name: mission.name,
            description: mission.description,
            criticality: mission.criticality,
          },
        };
      });
    });

    // To avoid ID collisions when updating existing missions
    this.setNewGlobalIncrementId(payload);

    this.nodes.set(this.buildNodesWithLayout(payload));
    this.connections.set(
      payload.relationships.one_way.map((rel) => ({
        from: `${rel.from}-output`,
        to: `${rel.to}-input`,
      })),
    );

    this.flowEditor.fCanvas.resetScaleAndCenter(false);
    this.uploadMode.set('update');

    console.log(
      'Loaded mission payload:',
      this.missionsMap(),
      this.nodes(),
      this.connections(),
    );
    this.openSnackBar(
      `Successfully loaded existing mission (${payload.nodes.missions.length} connected mission(s) total)`,
      'OK',
    );
  }

  buildNodesWithLayout(payload: MissionPayload): MissionNode[] {
    // Build node info map
    const nodeInfoMap = new Map<number, NodeInfo>();
    payload.nodes.missions.forEach((m) =>
      nodeInfoMap.set(m.id, {
        id: m.id,
        type: 'root',
        layer: 'root',
        name: m.name,
        data: {},
      }),
    );
    payload.nodes.services.forEach((s) =>
      nodeInfoMap.set(s.id, {
        id: s.id,
        type: 'component',
        layer: 'component',
        name: s.name,
        data: { name: s.name },
      }),
    );
    payload.nodes.hosts.forEach((h) =>
      nodeInfoMap.set(h.id, {
        id: h.id,
        type: 'host',
        layer: 'host',
        name: h.hostname,
        data: { hostname: h.hostname, ip: h.ip },
      }),
    );
    payload.nodes.aggregations.and.forEach((id) =>
      nodeInfoMap.set(id, {
        id,
        type: 'and',
        layer: undefined,
        name: 'AND',
        data: {},
      }),
    );
    payload.nodes.aggregations.or.forEach((id) =>
      nodeInfoMap.set(id, {
        id,
        type: 'or',
        layer: undefined,
        name: 'OR',
        data: {},
      }),
    );

    // Build parent map to infer AND/OR layers
    const parentOf = new Map<number, number[]>();
    payload.relationships.one_way.forEach(({ from, to }) => {
      if (!parentOf.has(to)) parentOf.set(to, []);
      parentOf.get(to)!.push(from);
    });

    for (const info of nodeInfoMap.values()) {
      const parents = (parentOf.get(info.id) ?? []).map((p) =>
        nodeInfoMap.get(p),
      );
      if (info.type === 'and') {
        info.layer = parents.some((p) => p?.type === 'root')
          ? 'root-and'
          : 'component-and';
      } else if (info.type === 'or') {
        const parentLayers = parents.map((p) => p?.layer);
        info.layer = parentLayers.includes('root-and')
          ? 'component-or'
          : 'host-or';
      }
    }

    // Run dagre layout
    const g = new dagre.graphlib.Graph();
    g.setGraph({ rankdir: 'TB', nodesep: 60, ranksep: 90 });
    g.setDefaultEdgeLabel(() => ({}));

    for (const info of nodeInfoMap.values()) {
      g.setNode(`${info.id}`, { width: 200, height: 50 });
    }
    payload.relationships.one_way.forEach((rel) =>
      g.setEdge(`${rel.from}`, `${rel.to}`),
    );

    dagre.layout(g);

    return Array.from(nodeInfoMap.values()).map((info) => {
      const { x, y } = g.node(`${info.id}`);
      return {
        id: info.id.toString(),
        name: info.name,
        type: info.type,
        layer: info.layer,
        position: { x: x - 100, y: y - 25 }, // Center the node on its position
        data: info.data,
        validation: { error: false, reason: '' },
      };
    });
  }

  setNewGlobalIncrementId(payload: MissionPayload) {
    const allNodeIds = [
      payload.nodes.aggregations.or,
      payload.nodes.aggregations.and,
      payload.nodes.hosts.map((host) => host.id),
      payload.nodes.missions.map((mission) => mission.id),
      payload.nodes.services.map((service) => service.id),
    ].flat();

    const maxId = Math.max(...allNodeIds);
    this.flowEditor.setGlobalIncrement(maxId + 1);
  }

  validateMissionsMetadata() {
    for (var key in this.missionsMap()) {
      if (this.missionsMap()[key].name.trim() === '') {
        return false;
      }
    }
    return true;
  }

  validateMission(): boolean {
    if (Object.keys(this.missionsMap()).length === 0) {
      return false;
    }

    this.validateMissionsMetadata();

    const isValid = this.missionValidator.validateMission(
      this.nodes,
      this.connections,
    );

    if (!isValid) {
      return false;
    }

    // Additional validation logic can be added here
    return true;
  }

  saveMission() {
    const payload = this.getMissionPayload();
    if (!payload) {
      return;
    }
    let $missionUpload = this.missionEditorService.uploadMissionPayload(
      payload,
      this.uploadMode(),
    );

    $missionUpload.subscribe({
      next: (response) => {
        console.log('Mission payload uploaded successfully:', response);
        this.openSnackBar('Mission saved successfully.', 'Close');
      },
      error: (error) => {
        console.error('Error uploading mission payload:', error);
        this.openSnackBar(
          `Failed to save mission. [${error.message}]`,
          'Close',
          { error: true },
        );
      },
    });
  }

  // Prepares and returns the mission payload for copying or uploading to the backend REST API
  getMissionPayload(): MissionPayload | null {
    if (!this.validateMission()) {
      let status =
        Object.keys(this.missionsMap()).length === 0
          ? 'Mission is empty. Please add at least one mission.'
          : 'Mission validation failed. See highlighted issues.';
      this.openSnackBar(status, 'Close', { error: true });
      return null;
    }

    const missionData: MissionData = {
      missions: this.missionsMap(),
      nodes: this.nodes(),
      connections: this.connections(),
    };

    return this.missionEditorService.createMissionPayload(missionData);
  }

  // Copies the mission payload JSON to the clipboard
  copyMissionPayload() {
    if (!this.validateMission()) {
      let status = `Mission validation failed. See highlighted issues.`;
      this.openSnackBar(status, 'Close', { error: true });
      return;
    }

    const missionPayload = this.getMissionPayload();
    if (!missionPayload) {
      this.openSnackBar('No mission data to copy.', 'Close', { error: true });
      return;
    }

    navigator.clipboard
      .writeText(JSON.stringify(missionPayload, null, 2))
      .then(() => {
        this.openSnackBar('Mission JSON copied to clipboard.', 'Close');
      })
      .catch((err) => {
        console.error('Failed to copy mission JSON: ', err);
        this.openSnackBar('Failed to copy mission JSON.', 'Close', {
          error: true,
        });
      });
  }

  // Returns mission data as it is used in the mission editor
  // To be used for debugging purposes
  getMissionJSON(): string {
    return JSON.stringify(
      { nodes: this.nodes(), connections: this.connections() },
      null,
      2,
    );
  }
}
