import * as SchemaTypes from '../../../../generated/base-types';

import { gql } from 'apollo-angular';
import {
  AssetPageDomainNameFragmentDoc,
  AssetPageNetworkServiceFragmentDoc,
  AssetPageIpFragmentDoc,
} from './asset-page.fragment.generated';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type AssetPageGetIPsPaginatedQueryVariables = SchemaTypes.Exact<{
  where?: SchemaTypes.InputMaybe<SchemaTypes.IpWhere>;
  options?: SchemaTypes.InputMaybe<SchemaTypes.IpOptions>;
}>;

export type AssetPageGetIPsPaginatedQuery = {
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
        network_services: Array<{
          __typename?: 'NetworkService';
          service?: string | null;
          port?: number | null;
          protocol?: string | null;
        }>;
      } | null;
    }>;
  }>;
  ipsAggregate: { __typename?: 'IPAggregateSelection'; count: number };
};

export type AssetPageGetNetworkServicesPaginatedQueryVariables = SchemaTypes.Exact<{
  where?: SchemaTypes.InputMaybe<SchemaTypes.NetworkServiceWhere>;
  options?: SchemaTypes.InputMaybe<SchemaTypes.NetworkServiceOptions>;
  hostWhere?: SchemaTypes.InputMaybe<SchemaTypes.NetworkServiceHostsConnectionWhere>;
}>;

export type AssetPageGetNetworkServicesPaginatedQuery = {
  __typename?: 'Query';
  networkServices: Array<{
    __typename?: 'NetworkService';
    _id: string;
    service?: string | null;
    protocol?: string | null;
    port?: number | null;
    hostsConnection: {
      __typename?: 'NetworkServiceHostsConnection';
      totalCount: number;
      edges: Array<{
        __typename?: 'NetworkServiceHostsRelationship';
        node: {
          __typename?: 'Host';
          node?: { __typename?: 'NodeObject'; ips: Array<{ __typename?: 'IP'; address: string }> } | null;
        };
      }>;
    };
  }>;
  networkServicesAggregate: { __typename?: 'NetworkServiceAggregateSelection'; count: number };
};

export type AssetPageGetDomainNamesPaginatedQueryVariables = SchemaTypes.Exact<{
  where?: SchemaTypes.InputMaybe<SchemaTypes.DomainNameWhere>;
  options?: SchemaTypes.InputMaybe<SchemaTypes.DomainNameOptions>;
}>;

export type AssetPageGetDomainNamesPaginatedQuery = {
  __typename?: 'Query';
  domainNames: Array<{
    __typename?: 'DomainName';
    domain_name: string;
    ips: Array<{ __typename?: 'IP'; address: string }>;
  }>;
  domainNamesAggregate: { __typename?: 'DomainNameAggregateSelection'; count: number };
};

export type AssetPageGetTypeCountsQueryVariables = SchemaTypes.Exact<{
  ipWhere?: SchemaTypes.InputMaybe<SchemaTypes.IpWhere>;
  serviceWhere?: SchemaTypes.InputMaybe<SchemaTypes.NetworkServiceWhere>;
  domainWhere?: SchemaTypes.InputMaybe<SchemaTypes.DomainNameWhere>;
}>;

export type AssetPageGetTypeCountsQuery = {
  __typename?: 'Query';
  ipsAggregate: { __typename?: 'IPAggregateSelection'; count: number };
  networkServicesAggregate: { __typename?: 'NetworkServiceAggregateSelection'; count: number };
  domainNamesAggregate: { __typename?: 'DomainNameAggregateSelection'; count: number };
};

export type AssetPageGetServiceOptionsQueryVariables = SchemaTypes.Exact<{ [key: string]: never }>;

export type AssetPageGetServiceOptionsQuery = {
  __typename?: 'Query';
  networkServices: Array<{
    __typename?: 'NetworkService';
    service?: string | null;
    port?: number | null;
    protocol?: string | null;
  }>;
};

export type AssetPageGetIpTagsQueryVariables = SchemaTypes.Exact<{ [key: string]: never }>;

export type AssetPageGetIpTagsQuery = {
  __typename?: 'Query';
  ips: Array<{ __typename?: 'IP'; tag?: Array<string | null> | null }>;
};

export type AssetPageUpdateIpTagMutationVariables = SchemaTypes.Exact<{
  address: SchemaTypes.Scalars['String']['input'];
  tag: Array<SchemaTypes.Scalars['String']['input']> | SchemaTypes.Scalars['String']['input'];
}>;

export type AssetPageUpdateIpTagMutation = {
  __typename?: 'Mutation';
  updateIPTag?: { __typename?: 'IP'; _id: string; address: string; tag?: Array<string | null> | null } | null;
};

export const AssetPageGetIPsPaginatedDocument = gql`
  query AssetPageGetIPsPaginated($where: IPWhere, $options: IPOptions) {
    ips(where: $where, options: $options) {
      ...AssetPageIP
    }
    ipsAggregate(where: $where) {
      count
    }
  }
  ${AssetPageIpFragmentDoc}
`;

@Injectable({
  providedIn: 'root',
})
export class AssetPageGetIPsPaginatedQueryService extends Apollo.Query<
  AssetPageGetIPsPaginatedQuery,
  AssetPageGetIPsPaginatedQueryVariables
> {
  document = AssetPageGetIPsPaginatedDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
export const AssetPageGetNetworkServicesPaginatedDocument = gql`
  query AssetPageGetNetworkServicesPaginated(
    $where: NetworkServiceWhere
    $options: NetworkServiceOptions
    $hostWhere: NetworkServiceHostsConnectionWhere
  ) {
    networkServices(where: $where, options: $options) {
      ...AssetPageNetworkService
    }
    networkServicesAggregate(where: $where) {
      count
    }
  }
  ${AssetPageNetworkServiceFragmentDoc}
`;

@Injectable({
  providedIn: 'root',
})
export class AssetPageGetNetworkServicesPaginatedQueryService extends Apollo.Query<
  AssetPageGetNetworkServicesPaginatedQuery,
  AssetPageGetNetworkServicesPaginatedQueryVariables
> {
  document = AssetPageGetNetworkServicesPaginatedDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
export const AssetPageGetDomainNamesPaginatedDocument = gql`
  query AssetPageGetDomainNamesPaginated($where: DomainNameWhere, $options: DomainNameOptions) {
    domainNames(where: $where, options: $options) {
      ...AssetPageDomainName
    }
    domainNamesAggregate(where: $where) {
      count
    }
  }
  ${AssetPageDomainNameFragmentDoc}
`;

@Injectable({
  providedIn: 'root',
})
export class AssetPageGetDomainNamesPaginatedQueryService extends Apollo.Query<
  AssetPageGetDomainNamesPaginatedQuery,
  AssetPageGetDomainNamesPaginatedQueryVariables
> {
  document = AssetPageGetDomainNamesPaginatedDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
export const AssetPageGetTypeCountsDocument = gql`
  query AssetPageGetTypeCounts($ipWhere: IPWhere, $serviceWhere: NetworkServiceWhere, $domainWhere: DomainNameWhere) {
    ipsAggregate(where: $ipWhere) {
      count
    }
    networkServicesAggregate(where: $serviceWhere) {
      count
    }
    domainNamesAggregate(where: $domainWhere) {
      count
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class AssetPageGetTypeCountsQueryService extends Apollo.Query<
  AssetPageGetTypeCountsQuery,
  AssetPageGetTypeCountsQueryVariables
> {
  document = AssetPageGetTypeCountsDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
export const AssetPageGetServiceOptionsDocument = gql`
  query AssetPageGetServiceOptions {
    networkServices {
      service
      port
      protocol
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class AssetPageGetServiceOptionsQueryService extends Apollo.Query<
  AssetPageGetServiceOptionsQuery,
  AssetPageGetServiceOptionsQueryVariables
> {
  document = AssetPageGetServiceOptionsDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
export const AssetPageGetIpTagsDocument = gql`
  query AssetPageGetIPTags {
    ips {
      tag
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class AssetPageGetIpTagsQueryService extends Apollo.Query<
  AssetPageGetIpTagsQuery,
  AssetPageGetIpTagsQueryVariables
> {
  document = AssetPageGetIpTagsDocument;

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
