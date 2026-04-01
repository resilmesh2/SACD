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
import { OrgUnitData } from '../models/org-unit.model';
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
}
