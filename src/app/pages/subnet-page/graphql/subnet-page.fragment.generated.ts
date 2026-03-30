import * as SchemaTypes from '../../../../generated/base-types';

import { gql } from 'apollo-angular';
export type SubnetPageChildIpFragment = {
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
};

export const SubnetPageChildIpFragmentDoc = gql`
  fragment SubnetPageChildIP on IP {
    address
    version
    subnets {
      range
    }
    nodes {
      host {
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
`;
