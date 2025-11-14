import { Injectable } from "@angular/core";
import { MissionData } from "./mission-editor.component";
import { MissionNode } from "./flow-editor/flow-editor.component";

type NodeRelationshipById = {
    from: number;
    to: number;
}

type NodeRelationshipByName = {
    from: string;
    to: string;
}

type MissionPayload = {
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
            ip_address: string;
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

type MissionNodeWithId = MissionNode & { id: number };

@Injectable({
  providedIn: 'root',
})
export class MissionEditorService {
    constructor() {}

    convertConnectionsToRelationships(connections: { from: string; to: string }[]): NodeRelationshipById[] {
        return connections.map(conn => {
            const fromId = conn.from.split('-')[0] == 'root' ? 0 : parseInt(conn.from.split('-')[0], 10);
            const toId = parseInt(conn.to.split('-')[0], 10);
            return { from: fromId, to: toId };
        });
    }

    getNodesGroupedByType(missionData: MissionData): { [key: string]: any[] } {
        const groupedNodes: { [key: string]: any } = {
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
                    groupedNodes['hosts'].push(node);
                    break;
                case 'component':
                    groupedNodes['services'].push(node);
                    break;
                case 'or':
                    groupedNodes['aggregations']['or'].push(node);
                    break;
                case 'and':
                    groupedNodes['aggregations']['and'].push(node);
                    break;
                default:
                    console.warn(`Unknown node type: ${node.type}`);
            }
        }
        return groupedNodes;
    }

    getHostsConnectedToService(serviceId: number, relationships: NodeRelationshipById[], groupedNodes: any): MissionNodeWithId[] {
        const directIds: number[] = relationships.filter(r => r.from === serviceId).map(r => r.to);
        const indirectIds: number[] = relationships.filter(r => directIds.includes(r.from)).map(r => r.to);
        const leafHostsIds: number[] = relationships.filter(r => indirectIds.includes(r.from)).map(r => r.to);

        const allConnectedIds = [...new Set([...directIds, ...indirectIds, ...leafHostsIds])];

        return groupedNodes['hosts'].filter((host: MissionNodeWithId) => allConnectedIds.includes(~~host.id));
    }

    getHasIdentityRelationships(relationships: NodeRelationshipById[], groupedNodes: any): NodeRelationshipByName[] {
        const hasIdentityRelationships: NodeRelationshipByName[] = [];
        const services = groupedNodes['services'];

        for (const service of services) {
            const connectedHosts = this.getHostsConnectedToService(~~service.id, relationships, groupedNodes);
            for (const host of connectedHosts) {
                hasIdentityRelationships.push({
                    from: service.name,
                    to: host.data.hostname || '',
                });
            }
        }

        return hasIdentityRelationships;
    }

    createMissionPayload(missionData: MissionData): MissionPayload {
        const relationships = this.convertConnectionsToRelationships(missionData.connections);
        const groupedNodes = this.getNodesGroupedByType(missionData);

        console.log('Grouped Nodes:', groupedNodes);

        const payload: MissionPayload = {
            relationships: {
                two_way: [],
                one_way: relationships,
                supports: [],
                has_identity: this.getHasIdentityRelationships(relationships, groupedNodes),
                dependencies: [],
            },
            nodes: {
                missions: [
                    {
                        name: missionData.name,
                        criticality: missionData.criticality,
                        description: missionData.description,
                        id: 0,
                    }
                ],
                hosts: [],
                services: [],
                aggregations: {
                    or: [],
                    and: [],
                },
            }
        };
        return payload;
    }
}