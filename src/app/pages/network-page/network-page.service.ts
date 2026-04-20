import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import gql from 'graphql-tag';
import { Node } from '@swimlane/ngx-graph';
import { GraphInput } from '../../models/graph.model';
import { Attributes, AttributeStructure } from '../../config/attributes';
import { converToGraph } from '../../utils/graph-utils/ngx-graph.utils';

@Injectable()
export class NetworkPageService {
  constructor(private apollo: Apollo) {}

  getIPNode(ip: string): Observable<GraphInput> {
    return this.apollo
      .query<any>({
        query: gql`
          query GetIPNode($address: String!) {
            ips(where: { address: $address }) {
              ${this.getAttributesOfType('IP')}
            }
          }
        `,
        variables: { address: ip },
        fetchPolicy: 'network-only',
      })
      .pipe(map((data) => converToGraph(data.data.ips)));
  }

  getNodeNeighbours(node: Node): Observable<GraphInput> {
    const type = node.data.type as keyof AttributeStructure;
    const allowedTypes = Object.keys(Attributes) as (keyof AttributeStructure)[];
    if (!allowedTypes.includes(type)) {
      return throwError(() => new Error(`Unknown node type: ${type}`));
    }

    return this.apollo
      .query<any>({
        query: gql`
          query GetNodeNeighbours($id: ID!) {
            ${type}(where: { _id: $id }) {
              ${this.getAttributesOfType(type)}
            }
          }
        `,
        variables: { id: node.id },
        fetchPolicy: 'network-only',
      })
      .pipe(map((data) => converToGraph(data.data[type])));
  }

  private getAttributesOfType(type: keyof AttributeStructure): string {
    return Attributes[type].toString();
  }
}
