import * as SchemaTypes from '../../../generated/base-types';

import { gql } from 'apollo-angular';
export type VulnerableMachinesFragment = {
  __typename?: 'CVE';
  vulnerability: {
    __typename?: 'Vulnerability';
    software_versions: Array<{
      __typename?: 'SoftwareVersion';
      version: string;
      hosts: Array<{
        __typename?: 'Host';
        _id: string;
        node?: {
          __typename?: 'NodeObject';
          _id: string;
          ips: Array<{
            __typename?: 'IP';
            _id: string;
            address: string;
            domain_names: Array<{
              __typename?: 'DomainName';
              domain_name: string;
            }>;
            subnets: Array<{ __typename?: 'Subnet'; range: string }>;
          }>;
        } | null;
      }>;
    }>;
  };
};

export const VulnerableMachinesFragmentDoc = gql`
  fragment VulnerableMachines on CVE {
    vulnerability {
      software_versions {
        version
        hosts {
          _id
          node {
            _id
            ips {
              _id
              address
              domain_names {
                domain_name
              }
              subnets {
                range
              }
            }
          }
        }
      }
    }
  }
`;
