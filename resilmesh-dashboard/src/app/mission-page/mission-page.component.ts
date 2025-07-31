import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { DataService } from '../shared/services/data.service'
import { Mission } from '../shared/models/mission.model';
import { MissionStructure } from '../shared/models/mission-structure.model';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Node } from '@swimlane/ngx-graph';

@Component({
  selector: 'mission-page',
  templateUrl: './mission-page.component.html',
  styleUrls: ['./mission-page.component.css'],
})
export class MissionPageComponent implements OnInit {
  errorMessage = '';
  missionNames: string[] = [""];
  selectedMissionName = "";
  selectedNode: Node | null = null;
  setSelectedNode = (node: Node) => {
    this.selectedNode = node
  }
  missions: Mission[] = [];
  missionsStructure: MissionStructure | null = null;
  graphLoading: boolean = false;

  constructor(private dataService: DataService) {
  }

  ngOnInit(): void {
    this.dataService.getMissionNames().subscribe(
      (missionNames) => {
        this.missionNames = missionNames;
      },
      (error) => {
        this.errorMessage = error.message || 'Error fetching subnets'; // Handle errors
      }
    );
    this.getGraphData();
  }

  public getGraphData(): void {
    this.graphLoading = true
    this.getMissions().subscribe(
      (missions) => {
        this.missions = missions;
        this.missionsStructure = this.dataService.makeMissionsStructure(missions);
        this.graphLoading = false;
        this.errorMessage = ""
      },
      (error) => {
        this.missions = [];
        this.missionsStructure = null;
        this.graphLoading = false;
        this.errorMessage = error.message;
      }
    );
    this.selectedNode = null
  }

  /**
   * Returns an observable of missions
   */
  private getMissions(): Observable<Mission[]> {
    return this.dataService.getMission(this.selectedMissionName).pipe(
      tap((missions: Mission[]) => {
        if (!this.missionsStructure) {
          this.missionsStructure = this.dataService.makeMissionsStructure(missions);
        }
      })
    );
  }
}

