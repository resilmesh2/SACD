import * as SchemaTypes from '../../../../generated/base-types';

import { gql } from 'apollo-angular';
import {
  SubnetPageChildIpFragmentDoc,
  SubnetPageSubnetFragmentDoc,
} from './subnet-page.fragment.generated';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type SubnetPageGetSubnetsQueryVariables = SchemaTypes.Exact<{
  [key: string]: never;
}>;

export type SubnetPageGetSubnetsQuery = {
  __typename?: 'Query';
  subnets: Array<{
    __typename?: 'Subnet';
    _id: string;
    note?: string | null;
    range: string;
    org_units: Array<{ __typename?: 'OrganizationUnit'; name: string }>;
    contacts: Array<{ __typename?: 'Contact'; name: string }>;
    parent_subnet: Array<{
      __typename?: 'Subnet';
      _id: string;
      note?: string | null;
      range: string;
    }>;
  }>;
};

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
    parent_subnet: Array<{
      __typename?: 'Subnet';
      _id: string;
      note?: string | null;
      range: string;
    }>;
  }>;
};

export type SubnetPageGetChildIPsQueryVariables = SchemaTypes.Exact<{
  range: SchemaTypes.Scalars['String']['input'];
}>;

export type SubnetPageGetChildIPsQuery = {
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
          vulnerabilities: Array<{
            __typename?: 'Vulnerability';
            cve?: { __typename?: 'CVE'; cve_id: string } | null;
          }>;
        }>;
      } | null;
    }>;
  }>;
};

export type SubnetPageGetChildSubnetsQueryVariables = SchemaTypes.Exact<{
  range: SchemaTypes.Scalars['String']['input'];
}>;

export type SubnetPageGetChildSubnetsQuery = {
  __typename?: 'Query';
  subnets: Array<{ __typename?: 'Subnet'; range: string }>;
};

export const SubnetPageGetSubnetsDocument = gql`
  query SubnetPageGetSubnets {
    subnets {
      ...SubnetPageSubnet
    }
  }
  ${SubnetPageSubnetFragmentDoc}
`;

@Injectable({
  providedIn: 'root',
})
export class SubnetPageGetSubnetsQueryService extends Apollo.Query<
  SubnetPageGetSubnetsQuery,
  SubnetPageGetSubnetsQueryVariables
> {
  document = SubnetPageGetSubnetsDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
export const SubnetPageGetSubnetDocument = gql`
  query SubnetPageGetSubnet($range: String!) {
    subnets(where: { range: $range }) {
      ...SubnetPageSubnet
    }
  }
  ${SubnetPageSubnetFragmentDoc}
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
export const SubnetPageGetChildIPsDocument = gql`
  query SubnetPageGetChildIPs($range: String!) {
    ips(where: { subnetsConnection_SINGLE: { node: { range: $range } } }) {
      ...SubnetPageChildIP
    }
  }
  ${SubnetPageChildIpFragmentDoc}
`;

@Injectable({
  providedIn: 'root',
})
export class SubnetPageGetChildIPsQueryService extends Apollo.Query<
  SubnetPageGetChildIPsQuery,
  SubnetPageGetChildIPsQueryVariables
> {
  document = SubnetPageGetChildIPsDocument;

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
