import { Component, inject, model, ModelSignal, signal, WritableSignal } from "@angular/core";
import { SentinelCardComponent } from "@sentinel/components/card";
import { MatFormFieldModule, MatLabel } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { FormsModule } from "@angular/forms";
import { FlowEditorComponent, MissionNode } from "./flow-editor/flow-editor.component";
import { SentinelButtonWithIconComponent } from "@sentinel/components/button-with-icon";
import { MissionValidator } from "./mission-validator";
import { MissionEditorService } from "./mission-editor.service";
import { ExistingNodeService } from "./flow-editor/existing-node.service";

export type MissionData = {
    name: string;
    description: string;
    criticality: number;
    nodes: MissionNode[];
    connections: {
        from: string;
        to: string;
    }[];
}

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
    FlowEditorComponent
  ],
  providers: [
    MissionValidator, 
    MissionEditorService,
  ],
})

export class MissionEditorComponent {
    missionName = signal('');
    missionDescription = signal('');
    missionCriticality = signal(1);

    public connections: WritableSignal<{ from: string; to: string }[]> = model([
      { from: 'root-output', to: '1-input' },
    ]);

    public nodes: WritableSignal<MissionNode[]> = model([
      { id: 'root', name: 'Mission', type: 'root', position: { x: 0, y: 0 }, data: {}, validation: { error: false, reason: '' } },
      { id: '1', name: 'AND', type: 'and', position: { x: 0, y: 100 }, layer: 'root-and', data: {}, validation: { error: false, reason: '' } },
    ]);

    constructor(
      private missionValidator: MissionValidator, 
      private missionEditorService: MissionEditorService,
    ) {}

    validateMission(): boolean {
      if (this.missionName().trim() === '') {
        alert('Mission name cannot be empty.');
        return false;
      }

      const isValid = this.missionValidator.validateMission(this.nodes, this.connections);

      if (!isValid) {
        return false;
      }

      // Additional validation logic can be added here
      return true;
    }

    saveMission() {
        if (!this.validateMission()) {
            return;
        }

        const missionData: MissionData = {
            name: this.missionName(),
            description: this.missionDescription(),
            criticality: this.missionCriticality(),
            nodes: this.nodes(),
            connections: this.connections()
        };

        const payload = this.missionEditorService.createMissionPayload(missionData);
        this.missionEditorService.uploadMissionPayload(payload);
    }

    getMissionJSON(): string {
      return JSON.stringify({ nodes: this.nodes(), connections: this.connections() }, null, 2);
    }
}