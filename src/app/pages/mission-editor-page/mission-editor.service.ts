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
    constructor() {}

    convertConnectionsToRelationships(connections: { from: string; to: string }[]): NodeRelationshipById[] {
        return connections.map(conn => {
            const fromId = conn.from.split('-')[0] == 'root' ? 0 : parseInt(conn.from.split('-')[0], 10);
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
                    from: service.name,
                    to: host.data.hostname || '',
                });
            }
        }

        return hasIdentityRelationships;
    }

    getServicesConnectedToMission(relationships: NodeRelationshipById[], groupedNodes: GroupedNodes): MissionNodeWithId[] {
        const directIds: number[] = relationships.filter(r => r.from === 0).map(r => r.to);
        const indirectIds: number[] = relationships.filter(r => directIds.includes(r.from)).map(r => r.to);
        const leafServiceIds: number[] = relationships.filter(r => indirectIds.includes(r.from)).map(r => r.to);

        const allConnectedIds = [...new Set([...directIds, ...indirectIds, ...leafServiceIds])];

        return groupedNodes.services.map(service => ({ ...service, id: ~~service.id } as MissionNodeWithId))
            .filter((service) => allConnectedIds.includes(service.id));
    }

    getSupportsRelationships(relationships: NodeRelationshipById[], groupedNodes: GroupedNodes, missionName: string): NodeRelationshipByName[] {
        const connectedServices = this.getServicesConnectedToMission(relationships, groupedNodes);

        const supportsRelationships: NodeRelationshipByName[] = connectedServices.map(service => ({
            from: missionName,
            to: service.name,
        }));
        return supportsRelationships;
    }

    createMissionPayload(missionData: MissionData): MissionPayload {
        const relationships = this.convertConnectionsToRelationships(missionData.connections);
        const groupedNodes = this.getNodesGroupedByType(missionData);

        const payload: MissionPayload = {
            relationships: {
                two_way: [],
                one_way: relationships,
                supports: this.getSupportsRelationships(relationships, groupedNodes, missionData.name),
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
                hosts: groupedNodes.hosts.map(host => ({
                    hostname: host.data.hostname || '',
                    ip: host.data.ip || '',
                    id: ~~host.id,
                })),
                services: groupedNodes.services.map(service => ({
                    name: service.name,
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
}