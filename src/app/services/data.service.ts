// @ts-nocheck

import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable, throwError } from 'rxjs';
import gql from 'graphql-tag';
import { Node } from '@swimlane/ngx-graph';
import _ from 'lodash';
import { map, take } from 'rxjs/operators';
import { GraphInput } from '../../../models/graph.model';
import { Attributes, AttributeStructure } from '../config/attributes';
import { Mission } from '../../../models/mission.model';
import { MissionStructure } from '../../../models/mission-structure.model';
import { CVE, CVEResponse } from '../../../models/vulnerability.model';
import { VulnerabilityData } from '../../vulnerability-page/vulnerability.component';
import { OrgUnitData } from '../models/org-unit.model';
import { CSANode } from '../pages/csa-page/csa-page.component';
import { converToGraph } from '../utils/graph-utils/ngx-graph.utils';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private apollo: Apollo) {}

  /**
   * Get IP node from database based on IP address
   * @param ip
   */
  public getIPNode(ip: string): Observable<GraphInput> {
    return this.apollo
      .query<any>({
        query: gql`
        {
          ips(where: {address: "${ip}"}) {
            ${this.getAttributesOfType('IP')}
          }
        }
      `,
      })
      .pipe(
        map((data) => {
          const { nodes, edges } = converToGraph(data.data.ips);
          return { nodes, edges };
        }),
      );
  }

  /**
   * Gets neighbours of given node
   * @param node
   */
  public getNodeNeighbours(node: Node): Observable<GraphInput> {
    console.log(node, JSON.stringify(node));
    return this.apollo
      .query<any>({
        query: gql`
        {
          ${node.data.type}(where {_id: "${node.id}"}) {
            ${this.getAttributesOfType(node.data.type)}
          }
        }
      `,
      })
      .pipe(
        map((data) => {
          const { nodes, edges } = converToGraph(data.data[node.data.type]);
          return { nodes, edges };
        }),
      );
  }

  getAttributesOfType(type: keyof AttributeStructure): string {
    return Attributes[type].toString();
  }

  /**
   * Gets names of all available missions
   */
  public getMissionNames(): Observable<string[]> {
    return this.apollo // Assuming 'this' has an Apollo instance
      .query<any>({
        query: gql`
          {
            missions {
              name
            }
          }
        `,
      })
      .pipe(
        map((data) => {
          const missions = data.data.missions.map((mission: any) => mission.name);
          return missions;
        }),
      );
  }

  /**
   * Gets mission object by its name
   * @param name name of the mission
   */
  public getMission(name: string): Observable<Mission[]> {
    return this.apollo // Assuming 'this' has an Apollo instance
      .query<any>({
        query: gql`
        {
          missions(where: {name: "${name}"}) {
            criticality,
            description,
            name,
            structure,
          }
        }
      `,
      })
      .pipe(
        map((response) => {
          const missions: Mission[] = response.data.missions;
          return missions;
        }),
      );
  }

  /**
   * Gets structure parameter from each mission and merges them into one structure
   * @param missions list of missions
   *
   */
  public makeMissionsStructure(missions: Mission[]): MissionStructure {
    let result: MissionStructure;
    let structure: MissionStructure;

    result = missions.reduce(
      (acc: MissionStructure, mission: Mission) => {
        structure = JSON.parse(mission.structure);
        return {
          nodes: {
            missions: [...acc.nodes.missions, ...structure.nodes.missions],
            hosts: [...acc.nodes.hosts, ...structure.nodes.hosts],
            services: [...acc.nodes.services, ...structure.nodes.services],
            aggregations: {
              or: [...acc.nodes.aggregations.or, ...structure.nodes.aggregations.or],
              and: [...acc.nodes.aggregations.and, ...structure.nodes.aggregations.and],
            },
          },
          relationships: {
            two_way: [...acc.relationships.two_way, ...structure.relationships.two_way],
            one_way: [...acc.relationships.one_way, ...structure.relationships.one_way],
            supports: [...acc.relationships.supports, ...structure.relationships.supports],
            has_identity: [...acc.relationships.has_identity, ...structure.relationships.has_identity],
          },
        };
      },
      {
        nodes: {
          missions: [],
          hosts: [],
          aggregations: { and: [], or: [] },
          services: [],
        },
        relationships: {
          two_way: [],
          one_way: [],
          supports: [],
          has_identity: [],
        },
      },
    );

    return result;
  }

  /**
   * Returns the description of vulnerability
   */
  public getCVEDetails(cveCode: string): Observable<CVE> {
    return this.apollo
      .query<{ CVE: CVE[] }>({
        query: gql`
        {
          cves(where: {cve_id: "${cveCode}"}) {
            description
            cwe
            cpe_type
            ref_tags
            published
            last_modified
            result_impacts
            cvss_v2 {
              vector_string
              access_vector
              access_complexity
              authentication
              confidentiality_impact
              integrity_impact
              availability_impact
              base_score
              base_severity
              exploitability_score
              impact_score
              ac_insuf_info
              obtain_all_privilege
              obtain_user_privilege
              obtain_other_privilege
              user_interaction_required
            }
            cvss_v30 {
              vector_string
              attack_vector
              attack_complexity
              privileges_required
              user_interaction
              scope
              confidentiality_impact
              integrity_impact
              availability_impact
              base_score
              base_severity
              exploitability_score
              impact_score
            }
            cvss_v31 {
              vector_string
              attack_vector
              attack_complexity
              privileges_required
              user_interaction
              scope
              confidentiality_impact
              integrity_impact
              availability_impact
              base_score
              base_severity
              exploitability_score
              impact_score
            }
            cvss_v40 {
              vector_string
              attack_vector
              attack_complexity
              attack_requirements
              privileges_required
              user_interaction
              vulnerable_system_confidentiality
              vulnerable_system_integrity
              vulnerable_system_availability
              subsequent_system_confidentiality
              subsequent_system_integrity
              subsequent_system_availability
              base_score
              base_severity
              exploit_maturity
            }
          }
        }
        `,
      })
      .pipe(
        map((response) => {
          console.log('CVE Details loaded:', response.data.cves[0]);
          return response.data.cves[0];
        }),
      );
  }

  /**
   * Returns vulnerable machines (software version, ip address, domain, subnet)
   * @param cveCode CVE code of vulnerability
   */
  public getVulnerableMachines(cveCode: string): Observable<VulnerabilityData[] | null> {
    return this.apollo
      .query<CVEResponse>({
        query: gql`
        {
          cves(where: {cve_id: "${cveCode}"}) {
            vulnerability {
              software_versions {
                version
                hosts {
                  _id
                  node {
                    _id
                    ips {
                      _id
                      address
                      domain_names {
                        domain_name
                      }
                      subnets {
                        range
                      }
                    }
                  }
                }
              }
            }
          }
        }
        `,
      })
      .pipe(
        map((response) => {
          const responseArray: VulnerabilityData[] = [];

          if (!response.data || !response.data.cves || !response.data.cves[0]) {
            return null;
          }

          response.data.cves[0].vulnerability.software_versions.forEach((sv) => {
            const softwareName = sv.version || 'N/A';

            sv.hosts.forEach((host) => {
              if (host.node && host.node.ips) {
                host.node.ips.forEach((ip) => {
                  const domain = ip.domain_names && ip.domain_names.length > 0 ? ip.domain_names[0].domain_name : 'N/A';

                  const subnet = ip.subnets && ip.subnets.length > 0 ? ip.subnets[0].range : 'N/A';

                  responseArray.push({
                    domainName: domain,
                    subnet: subnet,
                    ip: ip.address || 'N/A',
                    software: softwareName,
                  });
                });
              }
            });
          });

          return responseArray;
        }),
      );
  }

  /**
   * Returns all CVE objects in bulk
   */
  public getVulnerabilities(): Observable<CVE[]> {
    return this.apollo
      .query<{ CVE: CVE[] }>({
        query: gql`
          {
            vulnerabilities {
              status
              cve {
                cve_id
                description
                cwe
                cpe_type
                ref_tags
                published
                last_modified
                result_impacts
                cvss_v2 {
                  vector_string
                  access_vector
                  access_complexity
                  authentication
                  confidentiality_impact
                  integrity_impact
                  availability_impact
                  base_score
                  base_severity
                  exploitability_score
                  impact_score
                  ac_insuf_info
                  obtain_all_privilege
                  obtain_user_privilege
                  obtain_other_privilege
                  user_interaction_required
                }
                cvss_v30 {
                  vector_string
                  attack_vector
                  attack_complexity
                  privileges_required
                  user_interaction
                  scope
                  confidentiality_impact
                  integrity_impact
                  availability_impact
                  base_score
                  base_severity
                  exploitability_score
                  impact_score
                }
                cvss_v31 {
                  vector_string
                  attack_vector
                  attack_complexity
                  privileges_required
                  user_interaction
                  scope
                  confidentiality_impact
                  integrity_impact
                  availability_impact
                  base_score
                  base_severity
                  exploitability_score
                  impact_score
                }
                cvss_v40 {
                  vector_string
                  attack_vector
                  attack_complexity
                  attack_requirements
                  privileges_required
                  user_interaction
                  vulnerable_system_confidentiality
                  vulnerable_system_integrity
                  vulnerable_system_availability
                  subsequent_system_confidentiality
                  subsequent_system_integrity
                  subsequent_system_availability
                  base_score
                  base_severity
                  exploit_maturity
                }
              }
            }
          }
        `,
      })
      .pipe(
        map((response) => {
          return response.data.vulnerabilities.map((vuln) => ({
            ...vuln.cve,
            status: vuln.status,
          }));
        }),
      );
  }

  public getIPAddresses(): Observable<string[]> {
    return this.apollo
      .query<any>({
        query: gql`
          {
            ips {
              _id
              address
            }
          }
        `,
      })
      .pipe(
        map((response) => {
          const ipAddresses: string[] = [];
          if (response.data && response.data.ips) {
            response.data.ips.forEach((ipNode: IPNode) => {
              if (ipNode.address) {
                ipAddresses.push(ipNode.address);
              }
            });
          }
          return ipAddresses;
        }),
      );
  }

  public getIPs(): Observable<IP[]> {
    return this.apollo
      .query<any>({
        query: gql`
          {
            ips {
              _id
              address
              status
              subnets {
                range
              }
              tag
              nodes {
                host {
                  network_servicesAggregate {
                    count
                  }
                }
              }
            }
          }
        `,
      })
      .pipe(
        map((response) => {
          return response.data.ips.map((ipNode: any) => ({
            _id: ipNode._id,
            type: ipNode.__typename,
            address: ipNode.address,
            status: ipNode.status,
            subnets: ipNode.subnets,
            tag: ipNode.tag,
            networkServicesCount: ipNode.nodes.reduce((count: number, node: any) => {
              return count + (node?.host?.network_servicesAggregate?.count || 0);
            }, 0),
          }));
        }),
      );
  }

  public getNetworkServices(): Observable<NetworkService[]> {
    return this.apollo
      .query<any>({
        query: gql`
          {
            networkServices {
              _id
              service
              protocol
              port
              hostsConnection {
                edges {
                  properties {
                    status
                  }
                  node {
                    node {
                      ips {
                        address
                      }
                    }
                  }
                }
              }
            }
          }
        `,
      })
      .pipe(
        map((response) => {
          return response.data.networkServices.flatMap((service: any) => {
            return service.hostsConnection.edges.flatMap((hostEdge: any) => {
              return hostEdge.node.node.ips.flatMap((ipNode: any) => {
                return {
                  _id: service._id,
                  type: service.__typename,
                  service: service.service,
                  protocol: service.protocol,
                  port: service.port,
                  status: hostEdge.properties.status,
                  ip_address: ipNode.address,
                } as NetworkService;
              });
            });
          });
        }),
      );
  }

  public getDomainNames(): Observable<string[]> {
    return this.apollo
      .query<any>({
        query: gql`
          {
            domainNames {
              domain_name
              __typename
              ips {
                address
              }
            }
          }
        `,
      })
      .pipe(
        map((response) => {
          return response.data.domainNames.map((domain: any) => {
            return {
              domain_name: domain.domain_name,
              type: domain.__typename,
              ips: domain.ips.map((ip: any) => ip.address),
            };
          });
        }),
      );
  }

  public updateVulnerabilityStatus(cve: string, status: string[]): void {
    this.apollo
      .mutate<any>({
        mutation: gql`
          mutation UpdateVulnerabilityStatus($cve: String!, $status: [String]!) {
            updateVulnerabilityStatus(cve: $cve, status: $status) {
              status
            }
          }
        `,
        variables: {
          cve: cve,
          status: status,
        },
      })
      .subscribe({
        error: (error) => {
          console.error('Error running mutation', error);
        },
        complete: () => {
          console.log('Mutation completed');
        },
      });
  }

  public changeIPStatus(address: string, status: string): void {
    this.apollo
      .mutate<any>({
        mutation: gql`
          mutation UpdateIPStatus($address: String!, $status: String!) {
            updateIPStatus(address: $address, status: $status) {
              _id
              address
              status
            }
          }
        `,
        variables: {
          address: address,
          status: status,
        },
      })
      .subscribe({
        error: (error) => {
          console.error('Error running mutation', error);
        },
        complete: () => {
          console.log('Mutation completed');
        },
      });
  }

  public changeNetworkServiceStatus(
    address: string,
    protocol: string,
    port: number,
    service: string,
    status: string,
  ): void {
    this.apollo
      .mutate<any>({
        mutation: gql`
          mutation UpdateNetworkServiceStatus(
            $address: String!
            $protocol: String!
            $port: Int!
            $service: String!
            $status: String!
          ) {
            updateNetworkServiceStatus(
              address: $address
              protocol: $protocol
              port: $port
              service: $service
              status: $status
            ) {
              status
            }
          }
        `,
        variables: {
          address: address,
          protocol: protocol,
          port: port,
          service: service,
          status: status,
        },
      })
      .subscribe({
        error: (error) => {
          console.error('Error running mutation', error);
        },
        complete: () => {
          console.log('Mutation completed');
        },
      });
  }

  public changeTag(address: string, tag: string[]): void {
    this.apollo
      .mutate<any>({
        mutation: gql`
          mutation UpdateIPTag($address: String!, $tag: [String!]!) {
            updateIPTag(address: $address, tag: $tag) {
              _id
              address
              tag
            }
          }
        `,
        variables: {
          address: address,
          tag: tag,
        },
      })
      .subscribe({
        error: (error) => {
          console.error('Error running mutation', error);
        },
        complete: () => {
          console.log('Mutation completed');
        },
      });
  }

  public getAllTags(): Observable<string[]> {
    return this.apollo
      .query<any>({
        query: gql`
          {
            ips {
              tag
            }
          }
        `,
      })
      .pipe(
        map((response) => {
          const allTags: string[] = [];
          response.data.ips.forEach((ip) => {
            if (ip.tag) {
              ip.tag.forEach((tag) => {
                if (!allTags.includes(tag)) {
                  allTags.push(tag);
                }
              });
            }
          });
          return allTags;
        }),
      );
  }

  public getOrgUnits(): Observable<OrgUnit[]> {
    return this.apollo
      .query<any>({
        query: gql`
          {
            organizationUnits {
              name
              subnets {
                range
                parent_subnet {
                  range
                }
              }
              contacts {
                name
              }
              parent_org_unit {
                name
              }
            }
          }
        `,
      })
      .pipe(
        map((response) => {
          const orgUnits: OrgUnitData[] = response.data.organizationUnits.map((orgUnit: any) => ({
            name: orgUnit.name,
            subnets: orgUnit.subnets.map((subnet) => {
              return {
                range: subnet.range,
                parent: subnet.parent_subnet[0]?.range,
              };
            }),
            contacts: orgUnit.contacts.map((contact: any) => contact.name),
            parentOrgUnit: orgUnit.parent_org_unit[0]?.name || '---',
          }));
          console.log('Org Units loaded:', orgUnits);
          return orgUnits;
        }),
      );
  }

  public getOrgUnit(orgName: string): Observable<OrgUnit> {
    return this.apollo
      .query<any>({
        query: gql`
        {
          organizationUnits(where: { name: "${orgName}" }) {
            name,
            subnets {
              range
              parent_subnet {
                range
              }
            },
            contacts {
              name
            },
            parent_org_unit {
              name
            }
          }
        }
      `,
      })
      .pipe(
        map((response) => {
          const orgUnits: OrgUnitData[] = response.data.organizationUnits.map((orgUnit: any) => ({
            name: orgUnit.name,
            subnets: orgUnit.subnets.map((subnet) => {
              return {
                range: subnet.range,
                parent: subnet.parent_subnet[0]?.range,
              };
            }),
            contacts: orgUnit.contacts.map((contact: any) => contact.name),
            parentOrgUnit: orgUnit.parent_org_unit[0]?.name || '---',
          }));
          console.log('Org Units loaded:', orgUnits);
          return orgUnits[0] || null;
        }),
      );
  }

  //? ORGANIZATION UNITS QUERIES AND MUTATIONS

  public createOrgUnit(name: string): Observable<OrgUnitData> {
    return this.apollo
      .mutate<any>({
        mutation: gql`
          mutation CreateOrgUnit($name: String!) {
            createOrganizationUnits(input: [{ name: $name }]) {
              organizationUnits {
                name
              }
            }
          }
        `,
        variables: {
          name: name,
        },
      })
      .pipe(
        map((response) => {
          const orgUnit: OrgUnitData = response.data.createOrganizationUnits.organizationUnits[0];
          console.log('Org Unit created:', orgUnit);
          return orgUnit;
        }),
      );
  }

  public linkOrgUnitToParent(orgUnitName: string, parentOrgUnitName: string): void {
    return this.apollo
      .mutate<any>({
        mutation: gql`
          mutation LinkOrgUnitToParent($orgUnitName: String!, $parentOrgUnitName: String!) {
            linkOrgUnitToParentOrg(orgUnitName: $orgUnitName, parentOrgUnitName: $parentOrgUnitName) {
              name
            }
          }
        `,
        variables: {
          orgUnitName: orgUnitName,
          parentOrgUnitName: parentOrgUnitName,
        },
      })
      .subscribe({
        next: (response) => {
          console.log('Org unit linked to parent org unit:', response.data.linkOrgUnitToParent);
          return response.data.linkOrgUnitToParent;
        },
        error: (error) => {
          console.error('Error linking org unit to parent org unit:', error);
          return throwError(() => new Error('Failed to link org unit to parent org unit'));
        },
      });
  }

  public mergeOrgUnitWithContacts(orgUnitName: string, contactNames: string[]): void {
    return this.apollo
      .mutate<any>({
        mutation: gql`
          mutation MergeOrgUnitWithContacts($orgUnitName: String!, $contactNames: [String!]!) {
            mergeOrgUnitWithContacts(orgUnitName: $orgUnitName, contactNames: $contactNames) {
              name
              contacts {
                name
              }
            }
          }
        `,
        variables: {
          orgUnitName: orgUnitName,
          contactNames: contactNames,
        },
      })
      .subscribe({
        next: (response) => {
          console.log('Org Unit merged with contacts:', response.data.mergeOrgUnitWithContacts);
          return response.data.mergeOrgUnitWithContacts;
        },
        error: (error) => {
          console.error('Error merging org unit with contacts:', error);
          return throwError(() => new Error('Failed to merge org unit with contacts'));
        },
      });
  }

  public insertOrgUnit(orgUnit: OrgUnitData): void {
    console.log('Inserting organization unit with data:', orgUnit);

    // First create the org unit and if successful, link it to parent org unit and contacts
    this.createOrgUnit(orgUnit.name).subscribe({
      next: (_response) => {
        if (orgUnit.parentOrgUnit) {
          this.linkOrgUnitToParent(orgUnit.name, orgUnit.parentOrgUnit);
        }

        if (orgUnit.contacts && orgUnit.contacts.length > 0) {
          this.mergeOrgUnitWithContacts(orgUnit.name, orgUnit.contacts);
        }
      },
      error: (error) => {
        console.error('Error creating org unit:', error);
        return throwError(() => new Error('Failed to create org unit'));
      },
    });
  }

  public deleteOrgUnit(name: string): boolean {
    console.log('Deleting org unit with name:', name);
    return this.apollo
      .mutate<any>({
        mutation: gql`
          mutation DeleteOrgUnit($name: String!) {
            deleteOrganizationUnits(where: { name: $name }) {
              nodesDeleted
              relationshipsDeleted
            }
          }
        `,
        variables: {
          name: name,
        },
      })
      .pipe(take(1))
      .subscribe({
        next: (response) => {
          console.log('Org Unit deleted:', response.data.deleteOrganizationUnits.nodesDeleted);
          return response.data.deleteOrganizationUnits.nodesDeleted > 0;
        },
        error: (error) => {
          console.error('Error deleting org unit:', error);
          return throwError(() => new Error('Failed to delete org unit'));
        },
      });
  }

  public updateOrgUnit(oldName: string, newName: string): Observable<OrgUnitData> {
    return this.apollo.mutate<any>({
      mutation: gql`
        mutation UpdateOrgUnit($oldName: String!, $newName: String!) {
          updateOrganizationUnits(where: { name: $oldName }, update: { name: $newName }) {
            organizationUnits {
              name
            }
          }
        }
      `,
      variables: {
        oldName: oldName,
        newName: newName,
      },
    });
  }

  public unlinkOrgUnitFromParents(orgUnitName: string): void {
    return this.apollo.mutate<any>({
      mutation: gql`
        mutation UnlinkOrgUnitFromParents($orgUnitName: String!) {
          unlinkOrgUnitFromParents(orgUnitName: $orgUnitName) {
            name
          }
        }
      `,
      variables: {
        orgUnitName: orgUnitName,
      },
    });
  }

  public unlinkOrgUnitFromContacts(orgUnitName: string, contactNames: string[]): void {
    return this.apollo.mutate<any>({
      mutation: gql`
        mutation UnlinkOrgUnitFromContacts($orgUnitName: String!, $contactNames: [String!]!) {
          unlinkOrgUnitFromContacts(orgUnitName: $orgUnitName, contactNames: $contactNames) {
            name
          }
        }
      `,
      variables: {
        orgUnitName: orgUnitName,
        contactNames: contactNames,
      },
    });
  }

  public editOrgUnit(oldOrgUnit: OrgUnitData, newOrgUnit: OrgUnitData): void {
    // First rename the org unit, then relink it to updated parent org unit and updated contacts
    this.updateOrgUnit(oldOrgUnit.name, newOrgUnit.name).subscribe({
      next: (response) => {
        console.log('Org Unit updated:', response.data.updateOrgUnits);

        this.unlinkOrgUnitFromParents(oldOrgUnit.name).subscribe({
          next: () => {
            if (newOrgUnit.parentOrgUnit && newOrgUnit.name !== newOrgUnit.parentOrgUnit) {
              this.linkOrgUnitToParent(newOrgUnit.name, newOrgUnit.parentOrgUnit);
            }
          },
          error: (error) => {
            console.error('Error unlinking org unit from parent:', error);
          },
        });

        this.unlinkOrgUnitFromContacts(oldOrgUnit.name, oldOrgUnit.contacts).subscribe({
          next: () => {
            console.log('Org Unit unlinked from contacts:', oldOrgUnit.contacts);
            if (newOrgUnit.contacts && newOrgUnit.contacts.length > 0) {
              console.log('Merging org unit with contacts:', newOrgUnit.contacts);
              this.mergeOrgUnitWithContacts(newOrgUnit.name, newOrgUnit.contacts);
            }
          },
          error: (error) => {
            console.error('Error unlinking org unit from contacts:', error);
          },
        });
      },
      error: (error) => {
        console.error('Error updating org unit:', error);
        return throwError(() => new Error('Failed to update org unit'));
      },
    });
  }

  public getCSANodes(): Observable<CSANode[]> {
    return this.apollo
      .query<any>({
        query: gql`
          {
            nodeObjects {
              topology_degree_norm
              topology_betweenness_norm
              mission_criticality
              final_criticality
              ips {
                address
              }
            }
          }
        `,
      })
      .pipe(
        map((response) => {
          return response.data.nodeObjects.map((node: any) => {
            return {
              ips: node.ips.map((ip: any) => ip.address),
              topology_degree_norm: node.topology_degree_norm ?? 0,
              topology_betweenness_norm: node.topology_betweenness_norm ?? 0,
              mission_criticality: node.mission_criticality ?? 0,
              final_criticality: node.final_criticality ?? 0,
            };
          });
        }),
      );
  }
}
