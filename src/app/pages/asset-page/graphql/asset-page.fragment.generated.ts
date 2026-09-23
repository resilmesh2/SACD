import * as SchemaTypes from '../../../../generated/base-types';

import { gql } from 'apollo-angular';
export type AssetPageIpFragment = {
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
};

export type AssetPageNetworkServiceFragment = {
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
};

export type AssetPageDomainNameFragment = {
  __typename?: 'DomainName';
  domain_name: string;
  ips: Array<{ __typename?: 'IP'; address: string }>;
};

export const AssetPageIpFragmentDoc = gql`
  fragment AssetPageIP on IP {
    _id
    address
    status
    tag
    subnets {
      range
    }
    nodes {
      host {
        network_services {
          service
          port
          protocol
        }
      }
    }
  }
`;
export const AssetPageNetworkServiceFragmentDoc = gql`
  fragment AssetPageNetworkService on NetworkService {
    _id
    service
    protocol
    port
    hostsConnection(where: $hostWhere, first: 25) {
      totalCount
      edges {
        node {
          node {
            ips {
              address
            }
          }
        }
      }
    }
  }
`;
export const AssetPageDomainNameFragmentDoc = gql`
  fragment AssetPageDomainName on DomainName {
    domain_name
    ips {
      address
    }
  }
`;
