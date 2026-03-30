import * as SchemaTypes from '../../../../generated/base-types';

import { gql } from 'apollo-angular';
export type AssetPageIpFragment = { __typename?: 'IP', _id: string, address: string, status?: string | null, tag?: Array<string | null> | null, subnets: Array<{ __typename?: 'Subnet', range: string }>, nodes: Array<{ __typename?: 'NodeObject', host?: { __typename?: 'Host', network_servicesAggregate?: { __typename?: 'HostNetworkServiceNetwork_servicesAggregationSelection', count: number } | null } | null }> };

export type AssetPageNetworkServiceFragment = { __typename?: 'NetworkService', _id: string, service?: string | null, protocol?: string | null, port?: number | null, hostsConnection: { __typename?: 'NetworkServiceHostsConnection', edges: Array<{ __typename?: 'NetworkServiceHostsRelationship', properties: { __typename?: 'NetworkServiceOn', status?: string | null }, node: { __typename?: 'Host', node?: { __typename?: 'NodeObject', ips: Array<{ __typename?: 'IP', address: string }> } | null } }> } };

export type AssetPageDomainNameFragment = { __typename?: 'DomainName', domain_name: string, ips: Array<{ __typename?: 'IP', address: string }> };

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
      network_servicesAggregate {
        count
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
  hostsConnection {
    edges {
      properties {
        status
      }
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