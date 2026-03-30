import * as SchemaTypes from '../../../../generated/base-types';

import { gql } from 'apollo-angular';
import { CsaPageNodeObjectFragmentDoc } from './csa-page.fragment.generated';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type CsaPageGetNodeObjectsQueryVariables = SchemaTypes.Exact<{ [key: string]: never; }>;


export type CsaPageGetNodeObjectsQuery = { __typename?: 'Query', nodeObjects: Array<{ __typename?: 'NodeObject', topology_degree_norm?: number | null, topology_betweenness_norm?: number | null, mission_criticality?: number | null, final_criticality?: number | null, ips: Array<{ __typename?: 'IP', address: string }> }> };

export const CsaPageGetNodeObjectsDocument = gql`
    query CsaPageGetNodeObjects {
  nodeObjects {
    ...CsaPageNodeObject
  }
}
    ${CsaPageNodeObjectFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class CsaPageGetNodeObjectsQueryService extends Apollo.Query<CsaPageGetNodeObjectsQuery, CsaPageGetNodeObjectsQueryVariables> {
    document = CsaPageGetNodeObjectsDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }