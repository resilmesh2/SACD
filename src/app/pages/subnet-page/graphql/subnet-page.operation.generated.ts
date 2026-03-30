import * as SchemaTypes from '../../../../generated/base-types';

import { gql } from 'apollo-angular';
import { SubnetFragmentDoc } from '../../../graphql/subnets/subnets.fragment.generated';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type SubnetPageGetSubnetQueryVariables = SchemaTypes.Exact<{
  range: SchemaTypes.Scalars['String']['input'];
}>;

export type SubnetPageGetSubnetQuery = {
  __typename?: 'Query';
  subnets: Array<{
    __typename?: 'Subnet';
    _id: string;
    note?: string | null;
    range: string;
    org_units: Array<{ __typename?: 'OrganizationUnit'; name: string }>;
    contacts: Array<{ __typename?: 'Contact'; name: string }>;
    parent_subnet: Array<{ __typename?: 'Subnet'; _id: string; note?: string | null; range: string }>;
  }>;
};

export type SubnetPageGetChildSubnetsQueryVariables = SchemaTypes.Exact<{
  range: SchemaTypes.Scalars['String']['input'];
}>;

export type SubnetPageGetChildSubnetsQuery = {
  __typename?: 'Query';
  subnets: Array<{ __typename?: 'Subnet'; range: string }>;
};

export const SubnetPageGetSubnetDocument = gql`
  query SubnetPageGetSubnet($range: String!) {
    subnets(where: { range: $range }) {
      ...Subnet
    }
  }
  ${SubnetFragmentDoc}
`;

@Injectable({
  providedIn: 'root',
})
export class SubnetPageGetSubnetQueryService extends Apollo.Query<
  SubnetPageGetSubnetQuery,
  SubnetPageGetSubnetQueryVariables
> {
  document = SubnetPageGetSubnetDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
export const SubnetPageGetChildSubnetsDocument = gql`
  query SubnetPageGetChildSubnets($range: String!) {
    subnets(where: { parent_subnet_SOME: { range: $range } }) {
      range
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class SubnetPageGetChildSubnetsQueryService extends Apollo.Query<
  SubnetPageGetChildSubnetsQuery,
  SubnetPageGetChildSubnetsQueryVariables
> {
  document = SubnetPageGetChildSubnetsDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
