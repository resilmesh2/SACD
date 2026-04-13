import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
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
          {
            ips(where: { address: "${ip}" }) {
              ${this.getAttributesOfType('IP')}
            }
          }
        `,
        fetchPolicy: 'network-only',
      })
      .pipe(map((data) => converToGraph(data.data.ips)));
  }

  getNodeNeighbours(node: Node): Observable<GraphInput> {
    const type = node.data.type as keyof AttributeStructure;
    return this.apollo
      .query<any>({
        query: gql`
          {
            ${type}(where: { _id: "${node.id}" }) {
              ${this.getAttributesOfType(type)}
            }
          }
        `,
        fetchPolicy: 'network-only',
      })
      .pipe(map((data) => converToGraph(data.data[type])));
  }

  private getAttributesOfType(type: keyof AttributeStructure): string {
    return Attributes[type].toString();
  }
}
