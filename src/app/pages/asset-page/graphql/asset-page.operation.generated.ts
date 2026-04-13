import * as SchemaTypes from '../../../../generated/base-types';

import { gql } from 'apollo-angular';
import {
  AssetPageDomainNameFragmentDoc,
  AssetPageNetworkServiceFragmentDoc,
  AssetPageIpFragmentDoc,
} from './asset-page.fragment.generated';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type AssetPageGetIPsQueryVariables = SchemaTypes.Exact<{ [key: string]: never }>;

export type AssetPageGetIPsQuery = {
  __typename?: 'Query';
  ips: Array<{
    __typename?: 'IP';
    _id: string;
    address: string;
    status?: string | null;
    tag?: Array<string | null> | null;
    subnets: Array<{ __typename?: 'Subnet'; range: string }>;
    nodes: Array<{
      __typename?: 'NodeObject';
      host?: {
        __typename?: 'Host';
        network_servicesAggregate?: {
          __typename?: 'HostNetworkServiceNetwork_servicesAggregationSelection';
          count: number;
        } | null;
      } | null;
    }>;
  }>;
};

export type AssetPageGetNetworkServicesQueryVariables = SchemaTypes.Exact<{ [key: string]: never }>;

export type AssetPageGetNetworkServicesQuery = {
  __typename?: 'Query';
  networkServices: Array<{
    __typename?: 'NetworkService';
    _id: string;
    service?: string | null;
    protocol?: string | null;
    port?: number | null;
    hostsConnection: {
      __typename?: 'NetworkServiceHostsConnection';
      edges: Array<{
        __typename?: 'NetworkServiceHostsRelationship';
        properties: { __typename?: 'NetworkServiceOn'; status?: string | null };
        node: {
          __typename?: 'Host';
          node?: { __typename?: 'NodeObject'; ips: Array<{ __typename?: 'IP'; address: string }> } | null;
        };
      }>;
    };
  }>;
};

export type AssetPageGetDomainNamesQueryVariables = SchemaTypes.Exact<{ [key: string]: never }>;

export type AssetPageGetDomainNamesQuery = {
  __typename?: 'Query';
  domainNames: Array<{
    __typename?: 'DomainName';
    domain_name: string;
    ips: Array<{ __typename?: 'IP'; address: string }>;
  }>;
};

export type AssetPageUpdateIpTagMutationVariables = SchemaTypes.Exact<{
  address: SchemaTypes.Scalars['String']['input'];
  tag: Array<SchemaTypes.Scalars['String']['input']> | SchemaTypes.Scalars['String']['input'];
}>;

export type AssetPageUpdateIpTagMutation = {
  __typename?: 'Mutation';
  updateIPTag?: { __typename?: 'IP'; _id: string; address: string; tag?: Array<string | null> | null } | null;
};

export const AssetPageGetIPsDocument = gql`
  query AssetPageGetIPs {
    ips {
      ...AssetPageIP
    }
  }
  ${AssetPageIpFragmentDoc}
`;

@Injectable({
  providedIn: 'root',
})
export class AssetPageGetIPsQueryService extends Apollo.Query<AssetPageGetIPsQuery, AssetPageGetIPsQueryVariables> {
  document = AssetPageGetIPsDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
export const AssetPageGetNetworkServicesDocument = gql`
  query AssetPageGetNetworkServices {
    networkServices {
      ...AssetPageNetworkService
    }
  }
  ${AssetPageNetworkServiceFragmentDoc}
`;

@Injectable({
  providedIn: 'root',
})
export class AssetPageGetNetworkServicesQueryService extends Apollo.Query<
  AssetPageGetNetworkServicesQuery,
  AssetPageGetNetworkServicesQueryVariables
> {
  document = AssetPageGetNetworkServicesDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
export const AssetPageGetDomainNamesDocument = gql`
  query AssetPageGetDomainNames {
    domainNames {
      ...AssetPageDomainName
    }
  }
  ${AssetPageDomainNameFragmentDoc}
`;

@Injectable({
  providedIn: 'root',
})
export class AssetPageGetDomainNamesQueryService extends Apollo.Query<
  AssetPageGetDomainNamesQuery,
  AssetPageGetDomainNamesQueryVariables
> {
  document = AssetPageGetDomainNamesDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
export const AssetPageUpdateIpTagDocument = gql`
  mutation AssetPageUpdateIPTag($address: String!, $tag: [String!]!) {
    updateIPTag(address: $address, tag: $tag) {
      _id
      address
      tag
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class AssetPageUpdateIpTagMutationService extends Apollo.Mutation<
  AssetPageUpdateIpTagMutation,
  AssetPageUpdateIpTagMutationVariables
> {
  document = AssetPageUpdateIpTagDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
