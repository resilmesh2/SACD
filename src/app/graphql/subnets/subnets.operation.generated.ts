import * as SchemaTypes from '../../../generated/base-types';

import { gql } from 'apollo-angular';
import { SubnetFragmentDoc } from './subnets.fragment.generated';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type GetAllSubnetsQueryVariables = SchemaTypes.Exact<{ [key: string]: never; }>;


export type GetAllSubnetsQuery = { __typename?: 'Query', subnets: Array<{ __typename?: 'Subnet', _id: string, note?: string | null, range: string, org_units: Array<{ __typename?: 'OrganizationUnit', name: string }>, contacts: Array<{ __typename?: 'Contact', name: string }>, parent_subnet: Array<{ __typename?: 'Subnet', _id: string, note?: string | null, range: string }> }> };

export const GetAllSubnetsDocument = gql`
    query GetAllSubnets {
  subnets {
    ...Subnet
  }
}
    ${SubnetFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class GetAllSubnetsQueryService extends Apollo.Query<GetAllSubnetsQuery, GetAllSubnetsQueryVariables> {
    document = GetAllSubnetsDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }