import { inject, Injectable } from "@angular/core";
import { MissionData } from "./mission-editor.component";
import { MissionNode } from "./flow-editor/flow-editor.component";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

type NodeRelationshipById = {
    from: number;
    to: number;
}

type NodeRelationshipByName = {
    from: string;
    to: string;
}

export type MissionPayload = {
    relationships: {
        two_way: NodeRelationshipById[];
        one_way: NodeRelationshipById[];
        supports: NodeRelationshipByName[];
        has_identity: NodeRelationshipByName[];
        dependencies: NodeRelationshipById[];
    },
    nodes: {
        missions: {
            name: string;
            criticality: number;
            description: string;
            id: number;
        }[],
        hosts: {
            hostname: string;
            ip: string;
            id: number;
        }[],
        services: {
            name: string;
            id: number;
        }[],
        aggregations: {
            or: number[];
            and: number[];
        },
    }
}

type GroupedNodes = {
    missions: MissionNode[];
    hosts: MissionNode[];
    services: MissionNode[];
    aggregations: {
        or: MissionNode[];
        and: MissionNode[];
    };
}

type MissionNodeWithId = MissionNode & { id: number };

@Injectable({
  providedIn: 'root',
})
export class MissionEditorService {
    private API_URL = 'http://localhost:8008/missions';
    private http = inject(HttpClient);
    constructor() {}

    convertConnectionsToRelationships(connections: { from: string; to: string }[]): NodeRelationshipById[] {
        return connections.map(conn => {
            const fromId = parseInt(conn.from.split('-')[0], 10);
            const toId = parseInt(conn.to.split('-')[0], 10);
            return { from: fromId, to: toId };
        });
    }

    getNodesGroupedByType(missionData: MissionData): GroupedNodes {
        const groupedNodes: GroupedNodes = {
            missions: [],
            hosts: [],
            services: [],
            aggregations: {
                or: [],
                and: [],
            },
        };

        for (const node of missionData.nodes) {
            switch (node.type) {
                case 'root':
                    break;
                case 'host':
                    groupedNodes.hosts.push(node);
                    break;
                case 'component':
                    groupedNodes.services.push(node);
                    break;
                case 'or':
                    groupedNodes.aggregations.or.push(node);
                    break;
                case 'and':
                    groupedNodes.aggregations.and.push(node);
                    break;
                default:
                    console.warn(`Unknown node type: ${node.type}`);
            }
        }
        return groupedNodes;
    }

    getHostsConnectedToService(serviceId: number, relationships: NodeRelationshipById[], groupedNodes: GroupedNodes): MissionNodeWithId[] {
        const directIds: number[] = relationships.filter(r => r.from === serviceId).map(r => r.to);
        const indirectIds: number[] = relationships.filter(r => directIds.includes(r.from)).map(r => r.to);
        const leafHostsIds: number[] = relationships.filter(r => indirectIds.includes(r.from)).map(r => r.to);

        const allConnectedIds = [...new Set([...directIds, ...indirectIds, ...leafHostsIds])];

        return groupedNodes.hosts.map(host => ({ ...host, id: ~~host.id } as MissionNodeWithId))
            .filter((host) => allConnectedIds.includes(host.id));
    }

    getHasIdentityRelationships(relationships: NodeRelationshipById[], groupedNodes: GroupedNodes): NodeRelationshipByName[] {
        const hasIdentityRelationships: NodeRelationshipByName[] = [];
        const services = groupedNodes.services;

        for (const service of services) {
            const connectedHosts = this.getHostsConnectedToService(~~service.id, relationships, groupedNodes);
            for (const host of connectedHosts) {
                hasIdentityRelationships.push({
                    from: service.data.name || '',
                    to: host.data.hostname || '',
                });
            }
        }

        return hasIdentityRelationships;
    }

    getServicesConnectedToMission(relationships: NodeRelationshipById[], groupedNodes: GroupedNodes, rootId: number): MissionNodeWithId[] {
        const directIds: number[] = relationships.filter(r => r.from === rootId).map(r => r.to);
        const indirectIds: number[] = relationships.filter(r => directIds.includes(r.from)).map(r => r.to);
        const leafServiceIds: number[] = relationships.filter(r => indirectIds.includes(r.from)).map(r => r.to);

        const allConnectedIds = [...new Set([...directIds, ...indirectIds, ...leafServiceIds])];

        return groupedNodes.services.map(service => ({ ...service, id: ~~service.id } as MissionNodeWithId))
            .filter((service) => allConnectedIds.includes(service.id));
    }

    getSupportsRelationships(
        relationships: NodeRelationshipById[], 
        groupedNodes: GroupedNodes, 
        missionId: number,
        missionName: string
    ): NodeRelationshipByName[] {
        const connectedServices = this.getServicesConnectedToMission(relationships, groupedNodes, missionId);

        const supportsRelationships: NodeRelationshipByName[] = connectedServices.map(service => ({
            from: missionName,
            to: service.data.name || '',
        }));
        return supportsRelationships;
    }

    createMissionPayload(data: MissionData): MissionPayload {
        const relationships = this.convertConnectionsToRelationships(data.connections);
        const groupedNodes = this.getNodesGroupedByType(data);

        const allSupportsRelationships = Object.keys(data.missions).flatMap(missionId => {
            return this.getSupportsRelationships(relationships, groupedNodes, ~~missionId, data.missions[missionId].name);
        });

        const allMissions = Object.keys(data.missions).map(missionId => {
            const mission = data.missions[missionId];
            return {
                id: ~~missionId,
                name: mission.name,
                description: mission.description,
                criticality: mission.criticality
            }
        })

        const payload: MissionPayload = {
            relationships: {
                two_way: [],
                one_way: relationships,
                supports: allSupportsRelationships,
                has_identity: this.getHasIdentityRelationships(relationships, groupedNodes),
                dependencies: [],
            },
            nodes: {
                missions: allMissions,
                hosts: groupedNodes.hosts.map(host => ({
                    hostname: host.data.hostname || '',
                    ip: host.data.ip || '',
                    id: ~~host.id,
                })),
                services: groupedNodes.services.map(service => ({
                    name: service.data.name || '',
                    id: ~~service.id,
                })),
                aggregations: {
                    or: groupedNodes.aggregations.or.map(node => ~~node.id),
                    and: groupedNodes.aggregations.and.map(node => ~~node.id),
                },
            }
        };
        return payload;
    }

    uploadMissionPayload(payload: MissionPayload): Observable<any> {
        console.log('Uploading mission payload:', payload);
        // Connection check (optional)
        // this.http.get('http://localhost:8000/missions').subscribe({
        //     next: (response) => {
        //         console.log('Backend connection check successful:', response);
        //     },
        //     error: (error) => {
        //         console.error('Backend connection check failed:', error);
        //     }
        // });

        return this.http.post(this.API_URL, { ... payload}, {
            headers : new HttpHeaders({ 'Content-Type': 'application/json' })
        });
    }

}