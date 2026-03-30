import * as SchemaTypes from '../../../../generated/base-types';

import { gql } from 'apollo-angular';
export type CsaPageNodeObjectFragment = { __typename?: 'NodeObject', topology_degree_norm?: number | null, topology_betweenness_norm?: number | null, mission_criticality?: number | null, final_criticality?: number | null, ips: Array<{ __typename?: 'IP', address: string }> };

export const CsaPageNodeObjectFragmentDoc = gql`
    fragment CsaPageNodeObject on NodeObject {
  topology_degree_norm
  topology_betweenness_norm
  mission_criticality
  final_criticality
  ips {
    address
  }
}
    `;