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

export type GetSubnetsPaginatedQueryVariables = SchemaTypes.Exact<{
  options?: SchemaTypes.InputMaybe<SchemaTypes.SubnetOptions>;
  where?: SchemaTypes.InputMaybe<SchemaTypes.SubnetWhere>;
}>;

export type GetSubnetsPaginatedQuery = {
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
  subnetsAggregate: { __typename?: 'SubnetAggregateSelection'; count: number };
};

export type GetIPsPaginatedQueryVariables = SchemaTypes.Exact<{
  where?: SchemaTypes.InputMaybe<SchemaTypes.IpWhere>;
  options?: SchemaTypes.InputMaybe<SchemaTypes.IpOptions>;
  affectedWhere?: SchemaTypes.InputMaybe<SchemaTypes.IpWhere>;
}>;

export type GetIPsPaginatedQuery = {
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
  ipsAggregate: { __typename?: 'IPAggregateSelection'; count: number };
  affectedIpsAggregate: { __typename?: 'IPAggregateSelection'; count: number };
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
export const GetSubnetsPaginatedDocument = gql`
  query GetSubnetsPaginated($options: SubnetOptions, $where: SubnetWhere) {
    subnets(options: $options, where: $where) {
      ...Subnet
    }
    subnetsAggregate(where: $where) {
      count
    }
  }
  ${SubnetFragmentDoc}
`;

@Injectable({
  providedIn: 'root',
})
export class GetSubnetsPaginatedQueryService extends Apollo.Query<
  GetSubnetsPaginatedQuery,
  GetSubnetsPaginatedQueryVariables
> {
  document = GetSubnetsPaginatedDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
export const GetIPsPaginatedDocument = gql`
  query GetIPsPaginated($where: IPWhere, $options: IPOptions, $affectedWhere: IPWhere) {
    ips(where: $where, options: $options) {
      ...ChildIP
    }
    ipsAggregate(where: $where) {
      count
    }
    affectedIpsAggregate: ipsAggregate(where: $affectedWhere) {
      count
    }
  }
  ${ChildIpFragmentDoc}
`;

@Injectable({
  providedIn: 'root',
})
export class GetIPsPaginatedQueryService extends Apollo.Query<GetIPsPaginatedQuery, GetIPsPaginatedQueryVariables> {
  document = GetIPsPaginatedDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
