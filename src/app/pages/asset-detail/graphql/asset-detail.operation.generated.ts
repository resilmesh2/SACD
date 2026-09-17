import * as SchemaTypes from '../../../../generated/base-types';

import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type AssetDetailGetIpQueryVariables = SchemaTypes.Exact<{
  address: SchemaTypes.Scalars['String']['input'];
}>;

export type AssetDetailGetIpQuery = {
  __typename?: 'Query';
  ips: Array<{
    __typename?: 'IP';
    address: string;
    version?: number | null;
    status?: string | null;
    tag?: Array<string | null> | null;
    subnets: Array<{ __typename?: 'Subnet'; range: string }>;
    domain_names: Array<{ __typename?: 'DomainName'; domain_name: string }>;
    nodes: Array<{
      __typename?: 'NodeObject';
      final_criticality?: number | null;
      host?: {
        __typename?: 'Host';
        hostname?: string | null;
        software_versions: Array<{
          __typename?: 'SoftwareVersion';
          version: string;
          vulnerabilities: Array<{ __typename?: 'Vulnerability'; cve?: { __typename?: 'CVE'; cve_id: string } | null }>;
        }>;
      } | null;
    }>;
  }>;
  networkServices: Array<{
    __typename?: 'NetworkService';
    service?: string | null;
    port?: number | null;
    protocol?: string | null;
    hostsConnection: {
      __typename?: 'NetworkServiceHostsConnection';
      edges: Array<{
        __typename?: 'NetworkServiceHostsRelationship';
        properties: { __typename?: 'NetworkServiceOn'; status?: string | null };
      }>;
    };
  }>;
};

export const AssetDetailGetIpDocument = gql`
  query AssetDetailGetIP($address: String!) {
    ips(where: { address: $address }) {
      address
      version
      status
      tag
      subnets {
        range
      }
      domain_names {
        domain_name
      }
      nodes {
        final_criticality
        host {
          hostname
          software_versions {
            version
            vulnerabilities {
              cve {
                cve_id
              }
            }
          }
        }
      }
    }
    networkServices(where: { hostsConnection_SOME: { node: { node: { ips_SOME: { address: $address } } } } }) {
      service
      port
      protocol
      hostsConnection(where: { node: { node: { ips_SOME: { address: $address } } } }) {
        edges {
          properties {
            status
          }
        }
      }
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class AssetDetailGetIpQueryService extends Apollo.Query<AssetDetailGetIpQuery, AssetDetailGetIpQueryVariables> {
  document = AssetDetailGetIpDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
