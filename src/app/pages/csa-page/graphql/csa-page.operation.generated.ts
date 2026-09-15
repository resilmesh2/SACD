import * as SchemaTypes from '../../../../generated/base-types';

import { gql } from 'apollo-angular';
import { CsaPageNodeObjectFragmentDoc } from './csa-page.fragment.generated';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type CsaPageGetNodeObjectsPaginatedQueryVariables = SchemaTypes.Exact<{
  options?: SchemaTypes.InputMaybe<SchemaTypes.NodeObjectOptions>;
  where?: SchemaTypes.InputMaybe<SchemaTypes.NodeObjectWhere>;
}>;

export type CsaPageGetNodeObjectsPaginatedQuery = {
  __typename?: 'Query';
  nodeObjects: Array<{
    __typename?: 'NodeObject';
    topology_degree_norm?: number | null;
    topology_betweenness_norm?: number | null;
    mission_criticality?: number | null;
    final_criticality?: number | null;
    ips: Array<{ __typename?: 'IP'; address: string }>;
  }>;
  nodeObjectsAggregate: { __typename?: 'NodeObjectAggregateSelection'; count: number };
};

export const CsaPageGetNodeObjectsPaginatedDocument = gql`
  query CsaPageGetNodeObjectsPaginated($options: NodeObjectOptions, $where: NodeObjectWhere) {
    nodeObjects(options: $options, where: $where) {
      ...CsaPageNodeObject
    }
    nodeObjectsAggregate(where: $where) {
      count
    }
  }
  ${CsaPageNodeObjectFragmentDoc}
`;

@Injectable({
  providedIn: 'root',
})
export class CsaPageGetNodeObjectsPaginatedQueryService extends Apollo.Query<
  CsaPageGetNodeObjectsPaginatedQuery,
  CsaPageGetNodeObjectsPaginatedQueryVariables
> {
  document = CsaPageGetNodeObjectsPaginatedDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
