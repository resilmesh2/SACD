import * as SchemaTypes from '../../../generated/base-types';

import { gql } from 'apollo-angular';
export type SubnetFragment = {
  __typename?: 'Subnet';
  _id: string;
  note?: string | null;
  range: string;
  org_units: Array<{ __typename?: 'OrganizationUnit'; name: string }>;
  contacts: Array<{ __typename?: 'Contact'; name: string }>;
  parent_subnet: Array<{ __typename?: 'Subnet'; _id: string; note?: string | null; range: string }>;
};

export type ChildIpFragment = {
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
};

export const SubnetFragmentDoc = gql`
  fragment Subnet on Subnet {
    _id
    note
    range
    org_units {
      name
    }
    contacts {
      name
    }
    parent_subnet {
      _id
      note
      range
    }
  }
`;
export const ChildIpFragmentDoc = gql`
  fragment ChildIP on IP {
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
