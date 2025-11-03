import { Component, Host, OnInit, signal, WritableSignal } from "@angular/core";
import { SentinelCardComponent } from "@sentinel/components/card";
import { MatFormFieldModule, MatLabel } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { FormsModule } from "@angular/forms";
import { SentinelButtonWithIconComponent } from "@sentinel/components/button-with-icon";
//@ts-ignore
import treeify from "treeify";

type MissionHost = {
    id: number;
    hostname: string;
}

type MissionHostGroup = MissionHost[];

type MissionComponent = {
    id: number;
    name: string;
    hostGroups: MissionHostGroup[];
}

type MissionServiceGroup = [MissionComponent[]];


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
    SentinelButtonWithIconComponent
    // MatButton,
    // SentinelButtonWithIconComponent
]
})

export class MissionEditorComponent {
    missionName = signal('');
    missionDescription = signal('');
    missionCriticality = signal(0);
    globalIdIncrement = signal(1);

    services: WritableSignal<MissionServiceGroup> = signal([[]] as MissionServiceGroup);

    // if a component group has one compoent => direct link to root

    addNewServiceGroup() {
        const currentServices = this.services();
        currentServices.push([]);
        this.services.set(currentServices);
    }

    addComponentToGroup(groupIndex: number) {
        const currentServices = this.services();
        currentServices[groupIndex].push({
            id: this.globalIdIncrement(),
            name: '',
            hostGroups: []
        });
        this.services.set(currentServices);
        this.globalIdIncrement.set(this.globalIdIncrement() + 1);
    }

    addNewHostGroupToComponent(groupIndex: number, componentIndex: number) {
        const currentServices = this.services();
        currentServices[componentIndex][groupIndex].hostGroups.push([]);
        this.services.set(currentServices);
    }

    addHostToHostGroup(groupIndex: number, componentIndex: number, hostGroupIndex: number) {
        const currentServices = this.services();
        currentServices[componentIndex][groupIndex].hostGroups[hostGroupIndex].push({
            id: this.globalIdIncrement(),
            hostname: ''
        });
        this.services.set(currentServices);
        this.globalIdIncrement.set(this.globalIdIncrement() + 1);
    }

    getTreeifiedMission() {

        const hostGroupObject = (hostGroup: MissionHostGroup) => {
            if (hostGroup.length === 1) {
                return { 
                    HOST: {
                        id: hostGroup[0].id,
                        hostname: hostGroup[0].hostname
                    }
                };
            }

            return { 
                OR: hostGroup.map(host => {
                    return {
                        HOST: {
                            id: host.id,
                            hostname: host.hostname
                        }
                    };
                })
            };
        }

        const missionObject = {
            name: this.missionName(),
            description: this.missionDescription(),
            criticality: this.missionCriticality(),
            componentGroups: this.services().map(serviceGroup => {
                return {
                    OR: serviceGroup.map(component => {
                        return {
                            [`component`]: {
                                id: component.id,
                                name: component.name,
                                hostGroups: component.hostGroups.map(hg => hostGroupObject(hg))
                            }
                        }
                    })
                }
            })
        };
        return treeify.asTree(missionObject, true);
    }

}