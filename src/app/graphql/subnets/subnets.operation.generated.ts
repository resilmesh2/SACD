import * as SchemaTypes from '../../../generated/base-types';

import { gql } from 'apollo-angular';
import { ChildIpFragmentDoc, SubnetFragmentDoc } from './subnets.fragment.generated';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type GetAllSubnetsQueryVariables = SchemaTypes.Exact<{ [key: string]: never }>;

export type GetAllSubnetsQuery = {
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

export type GetChildIPsQueryVariables = SchemaTypes.Exact<{
  range: SchemaTypes.Scalars['String']['input'];
}>;

export type GetChildIPsQuery = {
  __typename?: 'Query';
  ips: Array<{
    __typename?: 'IP';
    address: string;
    version?: number | null;
    subnets: Array<{ __typename?: 'Subnet'; range: string }>;
    nodes: Array<{
      __typename?: 'NodeObject';
      host?: {
        __typename?: 'Host';
        software_versions: Array<{
          __typename?: 'SoftwareVersion';
          version: string;
          vulnerabilities: Array<{ __typename?: 'Vulnerability'; cve?: { __typename?: 'CVE'; cve_id: string } | null }>;
        }>;
      } | null;
    }>;
  }>;
};

export const GetAllSubnetsDocument = gql`
  query GetAllSubnets {
    subnets {
      ...Subnet
    }
  }
  ${SubnetFragmentDoc}
`;

@Injectable({
  providedIn: 'root',
})
export class GetAllSubnetsQueryService extends Apollo.Query<GetAllSubnetsQuery, GetAllSubnetsQueryVariables> {
  document = GetAllSubnetsDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
export const GetChildIPsDocument = gql`
  query GetChildIPs($range: String!) {
    ips(where: { subnetsConnection_SINGLE: { node: { range: $range } } }) {
      ...ChildIP
    }
  }
  ${ChildIpFragmentDoc}
`;

@Injectable({
  providedIn: 'root',
})
export class GetChildIPsQueryService extends Apollo.Query<GetChildIPsQuery, GetChildIPsQueryVariables> {
  document = GetChildIPsDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
