import { Component, computed, inject, model, signal, WritableSignal } from "@angular/core";
import { SentinelCardComponent } from "@sentinel/components/card";
import { MatFormFieldModule, MatLabel } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { FormsModule } from "@angular/forms";
import { FlowEditorComponent, MissionNode } from "./flow-editor/flow-editor.component";
import { SentinelButtonWithIconComponent } from "@sentinel/components/button-with-icon";
import { MissionValidator } from "./mission-validator";
import { MissionEditorService, MissionPayload } from "./mission-editor.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatIcon } from "@angular/material/icon";
import { NgTemplateOutlet } from "@angular/common";
import { MatSelectModule } from "@angular/material/select";
import { DataService } from "../../services/data.service";

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

export type MissionMetadata = {
  name: string;
  description: string;
  criticality: number;
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
    FlowEditorComponent,
    MatIcon,
    NgTemplateOutlet,
    MatSelectModule
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

    // missions: WritableSignal<{name: string, description: string, criticality: number}[]> = model([
    //   {
    //     id: "0",
    //     name: "",
    //     description: "",
    //     criticality: 1
    //   }
    // ])

    missionsMap = model({
      "0": {
        name: "test",
        description: "",
        criticality: 1
      }
    })

    missionIds = computed(() => Object.keys(this.missionsMap()));

    existingMissionNames = signal([]);

    public connections: WritableSignal<{ from: string; to: string }[]> = model([
      { from: '0-output', to: '1-input' },
    ]);

    public nodes: WritableSignal<MissionNode[]> = model([
      { id: '0', name: 'Mission', type: 'root', position: { x: 0, y: 0 }, data: {}, validation: { error: false, reason: '' } },
      { id: '1', name: 'AND', type: 'and', position: { x: 0, y: 100 }, layer: 'root-and', data: {}, validation: { error: false, reason: '' } },
    ]);

    private _snackBar = inject(MatSnackBar);

    openSnackBar(message: string, action: string, { error = false } = {}) {
        this._snackBar.open(message, action, { panelClass: error ? ['snackbar-error'] : undefined });
    }

    constructor(
      private missionValidator: MissionValidator, 
      private missionEditorService: MissionEditorService,
      private dataService: DataService
    ) {
      this.getMissionNames();
    }

    getMissionNames() {
      this.dataService.getMissionNames().subscribe({
        next: (missions: any) => {
          this.existingMissionNames.set(missions);
        }
      })
    }

    loadMission(event: { value: string }) {
      this.dataService.getMission(event.value ?? "").subscribe({
        next: (response) => {
          console.log(response);
          const mission = response[0];
          console.log(mission);
          this.missionName.set(mission.name);
          this.missionCriticality.set(mission.criticality);
          this.missionDescription.set(mission.description);

          // TODO: convert mission structure to internal nodes/relationships

        }
      })
    }

    convertPayloadToNodesConnections() {

    }

    validateMission(): boolean {
      if (this.missionName().trim() === '') {
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
        const payload = this.getMissionPayloaad();
        if (!payload) {
            return;
        }
        let $missionUpload = this.missionEditorService.uploadMissionPayload(payload);

        $missionUpload.subscribe({
            next: (response) => {
                console.log('Mission payload uploaded successfully:', response);
                this.openSnackBar('Mission saved successfully.', 'Close');
            },
            error: (error) => {
                console.error('Error uploading mission payload:', error);
                this.openSnackBar(`Failed to save mission. [${error.message}]`, 'Close', { error: true });
            }
        })
    }

    // Prepares and returns the mission payload for copying or uploading to the backend REST API
    getMissionPayloaad(): MissionPayload | null {
        if (!this.validateMission()) {
            let status = `Mission validation failed. ${this.missionName().trim() === '' ? '[Empty mission name]' : 'See highlighted issues.'}`;
            this.openSnackBar(status, 'Close', { error: true });
            return null;
        }

        const missionData: MissionData = {
            name: this.missionName(),
            description: this.missionDescription(),
            criticality: this.missionCriticality(),
            nodes: this.nodes(),
            connections: this.connections()
        };

        return this.missionEditorService.createMissionPayload(missionData);
    }

    // Copies the mission payload JSON to the clipboard
    copyMissionPayload() {
      if (!this.validateMission()) {
          let status = `Mission validation failed. ${this.missionName().trim() === '' ? '[Empty mission name]' : 'See highlighted issues.'}`;
          this.openSnackBar(status, 'Close', { error: true });
          return;
      }

      const missionPayload = this.getMissionPayloaad();
      if (!missionPayload) {
        this.openSnackBar('No mission data to copy.', 'Close', { error: true });
        return;
      }

      navigator.clipboard.writeText(JSON.stringify(missionPayload, null, 2)).then(() => {
        this.openSnackBar('Mission JSON copied to clipboard.', 'Close');
      }).catch(err => {
        console.error('Failed to copy mission JSON: ', err);
        this.openSnackBar('Failed to copy mission JSON.', 'Close', { error: true });
      });
    }

    // Returns mission data as it is used in the mission editor
    // To be used for debugging purposes
    getMissionJSON(): string {
      return JSON.stringify({ nodes: this.nodes(), connections: this.connections() }, null, 2);
    }
}