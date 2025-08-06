// @ts-nocheck

import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable, throwError } from 'rxjs';
import gql from 'graphql-tag';
import { Node, Edge } from '@swimlane/ngx-graph';
import _ from 'lodash';
import { map, take, tap } from 'rxjs/operators';
import { GraphInput } from '../models/graph.model';
import { entities, EntityStructure } from '../config/network-visualization.config';
import { Attributes, AttributeStructure } from '../config/attributes';
import { Mission } from '../models/mission.model';
import { MissionStructure } from '../models/mission-structure.model';
import { CVE, CVEResponse } from '../models/vulnerability.model';
import { VulnerabilityData } from '../../vulnerability-page/vulnerability.component';

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
          const { nodes, edges } = this.converToGraph(data.data.ips);
          return { nodes, edges };
        })
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
          const { nodes, edges } = this.converToGraph(data.data[node.data.type]);
          return { nodes, edges };
        })
      );
  }

  getAttributesOfType(type: keyof AttributeStructure): string {
    return Attributes[type].toString();
  }

  /**
   * Converts graph data to ngx-graph compliant format
   * @param data
   * @param parent
   * @param edgeName
   */
  public converToGraph(data: any[], parent?: string, edgeName?: string): GraphInput {
    let nodes: Node[] = [];
    let edges: Edge[] = [];

    data.forEach((item) => {
      if (nodes.findIndex((n) => n.id === item._id) === -1) {
        nodes.push({
          id: item._id,
          label: this.getLabel(item),
          data: {
            customColor: this.getColor(item),
            type: item.__typename,
            labelName: this.getLabelName(item),
            ...this.clearAttributes(item),
          },
        });
      }

      if (parent) {
        edges.push({ source: parent, target: item._id, label: edgeName });
      }

      Object.keys(item).forEach((key) => {
        if (Array.isArray(item[key]) && item[key].length > 0 && item[key][0].__typename) {
          const { nodes: newNodes, edges: newEdges } = this.converToGraph(item[key], item._id, key);
          nodes = _.unionBy(nodes, newNodes, (n) => n.id);
          edges = _.unionBy(edges, newEdges, (e) => [e.source, e.target, e.label]);
        }
      });
    });

    return { nodes, edges };
  }


  /**
   * Gets label of given node based on static config
   * @param node
   */
  public getLabel(node: any): string {
    const initialLabel: keyof EntityStructure = node.__typename;
    if (typeof entities[initialLabel] === 'undefined') {
      return initialLabel;
    }
    if (entities[initialLabel].showProperty.length === 0) {
      return initialLabel;
    }
    const propKey = entities[initialLabel].showProperty.find(
      (pk) => typeof node[pk] !== 'undefined' && node[pk] !== null
    );

    if (propKey === undefined) {
      return ""
    }
    if (typeof node[propKey] === 'undefined') {
      return initialLabel;
    }
    return node[propKey].toString();
  }

  /**
   * Gets label name of given node (eg. DomainName, IP)
   * @param node
   */
  public getLabelName(node: any): string {
    const initialLabel: keyof EntityStructure = node.__typename;
    if (typeof entities[initialLabel] === 'undefined') {
      return initialLabel;
    }
    if (entities[initialLabel].showProperty.length === 0) {
      return initialLabel;
    }
    const propKey = entities[initialLabel].showProperty.find(
      (pk) => typeof node[pk] !== 'undefined' && node[pk] !== null
    );

    if (propKey === undefined) {
      return ""
    }
    if (typeof node[propKey] === 'undefined') {
      return initialLabel;
    }
    return propKey;
  }

  /**
   * Return color that should be assigned to given node
   * @param node
   */
  private getColor(node: any): string {
    const initialLabel: keyof EntityStructure = node.__typename;
    return entities[initialLabel]?.bgColor || 'red';
  }

  /**
   * Clears unneccessery attributes of item
   * @param item
   */
  private clearAttributes(item: any) {
    const clonedItem = { ...item };
    delete clonedItem._id;
    delete clonedItem.__typename;
    return clonedItem;
  }

  /**
   * Returns label of ngx-graph node based on static config
   * @param node
   */
  public getLabelOfGraphNode(node: Node) {
    const initialLabel: keyof EntityStructure = node.data.type;
    if (typeof entities[initialLabel] === 'undefined') {
      return initialLabel;
    }
    if (entities[initialLabel].showProperty.length === 0) {
      return initialLabel;
    }
    const propKey = entities[initialLabel].showProperty.find(
      (pk) => typeof node.data[pk] !== 'undefined' && node.data[pk] !== null
    );

    if (propKey === undefined) {
      return ""
    }
    if (typeof node.data[propKey] === 'undefined') {
      return initialLabel;
    }
    return node.data[propKey].toString();
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
        })
      );
  }

  /**
   * Gets mission object by its name
   * @param name name of the mission
   */
  public getMission(name: String): Observable<Mission[]> {
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
        const missions: Mission[] = response.data.missions
        return missions;
      })
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
        nodes: { missions: [], hosts: [], aggregations: { and: [], or: [] }, services: [] },
        relationships: { two_way: [], one_way: [], supports: [], has_identity: [] },
      }
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
            cwe
            description
            impact
            published
            ref_tags
            access_complexity_v2
            access_vector_v2
            authentication_v2
            availability_impact_v2
            confidentiality_impact_v2
            integrity_impact_v2
            base_score_v2
            obtain_all_privilege_v2
            obtain_other_privilege_v2
            obtain_user_privilege_v2
            attack_complexity_v30
            attack_vector_v30
            availability_impact_v30
            base_score_v30
            confidentiality_impact_v30
            integrity_impact_v30
            privileges_required_v30
            scope_v30
            user_interaction_v30
            attack_vector_v31
            attack_complexity_v31
            privileges_required_v31
            user_interaction_v31
            scope_v31
            confidentiality_impact_v31
            integrity_impact_v31
            availability_impact_v31
            base_score_v31
            attack_vector_v40
            attack_complexity_v40
            attack_requirements_v40
            privileges_required_v40
            user_interaction_v40
            vulnerable_system_confidentiality_v40
            vulnerable_system_integrity_v40
            vulnerable_system_availability_v40
            subsequent_system_confidentiality_v40
            subsequent_system_integrity_v40
            subsequent_system_availability_v40
            base_score_v40
          }
        }
        `,
        })
        .pipe(
          map((response) => {
            return response.data.cves[0];
          })
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
          if (!response.data.cves[0]) {
            return null;
          }
          let domain = '';
          let subnet = '';
          let software = '';
          response.data.cves[0].vulnerability.software_versions.forEach((software_version) => {
            software = software_version.version;
            software_version.hosts.forEach((host) => {
              host.node.ips.forEach((ip) => {
                if (ip.domain_names) {
                  domain = ip.domain_names[0].domain_name;
                }
                if (ip.subnets) {
                  subnet = ip.subnets[0].range;
                }
                responseArray.push({
                      domainName: domain,
                      subnet: subnet,
                      ip: ip.address,
                      software: software,
                });
              });
            });
          });
          return responseArray;
        })
      );
  }

/**
 * Returns all CVE objects in bulk
 */
public getAllCVEDetails(): Observable<CVE[]> {
  return this.apollo
    .query<{ CVE: CVE[] }>({
      query: gql`
      {
        cves {
            cve_id
            cwe
            description
            impact
            published
            ref_tags
            access_complexity_v2
            access_vector_v2
            authentication_v2
            availability_impact_v2
            confidentiality_impact_v2
            integrity_impact_v2
            base_score_v2
            obtain_all_privilege_v2
            obtain_other_privilege_v2
            obtain_user_privilege_v2
            attack_complexity_v30
            attack_vector_v30
            availability_impact_v30
            base_score_v30
            confidentiality_impact_v30
            integrity_impact_v30
            privileges_required_v30
            scope_v30
            user_interaction_v30
            attack_vector_v31
            attack_complexity_v31
            privileges_required_v31
            user_interaction_v31
            scope_v31
            confidentiality_impact_v31
            integrity_impact_v31
            availability_impact_v31
            base_score_v31
            attack_vector_v40
            attack_complexity_v40
            attack_requirements_v40
            privileges_required_v40
            user_interaction_v40
            vulnerable_system_confidentiality_v40
            vulnerable_system_integrity_v40
            vulnerable_system_availability_v40
            subsequent_system_confidentiality_v40
            subsequent_system_integrity_v40
            subsequent_system_availability_v40
            base_score_v40
        }
      }
      `,
    })
    .pipe(
      map((response) => {
        return response.data.cves;
      })
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
      })
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
            subnets {
              range
            }
            tag
          }
        }
      `,
      })
      .pipe(
        map((response) => {
          return response.data.ips;
        })
      );
    }

    public changeTag(id: number, tag: string[]): void {
      this.apollo.mutate<any>({
        mutation: gql`
          mutation UpdateIPTag($id: Int!, $tag: [String!]!) {
            updateIPTag(id: $id, tag: $tag) {
              _id
              address
              tag
            }
          }
        `,
        variables: {
          id: id,
          tag: tag
        },
      }).subscribe({
        error: (error) => {
          console.error('Error running mutation', error);
        },
        complete: () => {
          console.log('Mutation completed');
        }
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
            const allTags: String[] = [];
            response.data.ips.forEach((ip) => {
              if (ip.tag) {
                ip.tag.forEach((tag) => {
                  if (! allTags.includes(tag)) {
                    allTags.push(tag);
                  }
                });
              }
            });
            return allTags;
          })
        );
      }

  public getSubnets(): Observable<Subnet[]> {
    return this.apollo
      .query<any>({
        query: gql`
        {
          subnets {
            _id,
            note,
            range,
            org_units {
            name
          },
          contacts {
            name
          },
          parent_subnet {
            _id,
            note,
            range
          }
        },
      }
      `,
      })
      .pipe(
        map((response) => {
          const subnets: Subnet[] = response.data.subnets.map((subnet: any) => ({
            _id: subnet._id,
            range: subnet.range,
            note: subnet.note || null,
            org_units: subnet.org_units.map((ou: any) => ou.name),
            contacts: subnet.contacts.map((contact: any) => contact.name),
            parent_subnet: subnet.parent_subnet.length > 0 ? subnet.parent_subnet[0] : null
          }));
          console.log('Subnets fetched:', subnets);
          return subnets;
        })
      );
  }

  public getOrgUnits(): Observable<{ _id: string; name: string }[]> {
    return this.apollo
      .query<any>({
        query: gql`
        {
          organizationUnits {
            _id
            name
          }
        }
      `,
      })
      .pipe(
        map((response) => {
          return response.data.organizationUnits;
        })
      );
    }

  public createSubnet(range: string, note: string): Observable<Subnet> {
    return this.apollo.mutate<any>({
      mutation: gql`
        mutation CreateSubnet($range: String!, $note: String!) {
            createSubnets(input: [
                {
                    note: $note,
                    range: $range
                }
            ]) {
                subnets {
                    range
                    note
                }
            }
        }
      `,
      variables: {
        range: range,
        note: note,
      },
    }).subscribe({
        next: (response) => {
          console.log('Subnet created:', response.data.createSubnets.subnets[0]);
          return response.data.createSubnets.subnets[0];
        },
        error: (error) => { 
          console.error('Error creating subnet:', error);
          return throwError(() => new Error('Failed to create subnet'));
        }
    });
  }

  public linkSubnetToParent(subnetRange: string, parentSubnetRange: string): void {
    return this.apollo.mutate<any>({
        mutation: gql`
          mutation LinkSubnetToParent($subnetRange: String!, $parentSubnetRange: String!) {
            linkSubnetToParent(subnetRange: $subnetRange, parentSubnetRange: $parentSubnetRange) {
              _id
              range
              note
            }
          }
        `,
        variables: {
          subnetRange: subnetRange,
          parentSubnetRange: parentSubnetRange
        }
      }).subscribe();
  }

  public linkSubnetToOrgUnit(subnetRange: string, orgUnitName: string): void {
    return this.apollo.mutate<any>({
        mutation: gql`
          mutation LinkSubnetToOrgUnit($subnetRange: String!, $orgUnitName: String!) {
            linkSubnetToOrgUnit(subnetRange: $subnetRange, orgUnitName: $orgUnitName) {
              _id
              range
              note
            }
          }
        `,
        variables: {
          subnetRange: subnetRange,
          orgUnitName: orgUnitName
        }
      }).subscribe();
    }

  public mergeSubnetWithContacts(subnetRange: string, contactNames: string[]): Observable<any> {
    return this.apollo.mutate<any>({
      mutation: gql`
          mutation MergeSubnetWithContacts($subnetRange: String!, $contactNames: [String!]!) {
            mergeSubnetWithContacts(subnetRange: $subnetRange, contactNames: $contactNames) {
              _id
              range
              note
            }
          }
        `,
        variables: {
          subnetRange: subnetRange,
          contactNames: contactNames
        }
      }).subscribe();
    }


  public insertSubnet(subnet: { 
    range: string, 
    note: string, 
    parentSubnet?: string, 
    orgUnit?: string, 
    contacts?: string[]
  }): void {
    if (!(this.createSubnet(subnet.range, subnet.note))) {
      console.error('Failed to create subnet');
      // TODO: Handle error (e.g., show notification to user)
      return;
    }

    if (subnet.parentSubnet) {
      this.linkSubnetToParent(subnet.range, subnet.parentSubnet);
    }

    if (subnet.orgUnit) {
      this.linkSubnetToOrgUnit(subnet.range, subnet.orgUnit);
    }

    if (subnet.contacts && subnet.contacts.length > 0) {
      this.mergeSubnetWithContacts(subnet.range, subnet.contacts);
    }
  }

  public deleteSubnet(range: string): boolean {
    console.log('Deleting subnet with range:', range);
    return this.apollo.mutate<any>({
      mutation: gql`
        mutation DeleteSubnet($range: String!) {
            deleteSubnets(where: {
                range: $range
            }) {
                nodesDeleted
                relationshipsDeleted
            }
        }
      `,
      variables: {
        range: range,
      },
    }).pipe(take(1)).subscribe({
        next: (response) => {
          console.log('Subnet deleted:', response.data.deleteSubnets.nodesDeleted);
          return response.data.deleteSubnets.nodesDeleted > 0;
        },
        error: (error) => { 
          console.error('Error deleting subnet:', error);
          return throwError(() => new Error('Failed to delete subnet'));
        }
    });
  }
}