// @ts-nocheck

import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import gql from 'graphql-tag';
import { Node } from '@swimlane/ngx-graph';
import _ from 'lodash';
import { map } from 'rxjs/operators';
import { GraphInput } from '../../../models/graph.model';
import { Attributes, AttributeStructure } from '../config/attributes';
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
}
