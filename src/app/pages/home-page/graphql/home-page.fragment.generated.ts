import * as SchemaTypes from '../../../../generated/base-types';

import { gql } from 'apollo-angular';
export type HomePageSubnetFragment = { __typename?: 'Subnet'; note?: string | null; range: string };

export type HomePageOrgUnitFragment = { __typename?: 'OrganizationUnit'; name: string };

export type HomePageIpFragment = { __typename?: 'IP'; _id: string };

export type HomePageNodeObjectFragment = { __typename?: 'NodeObject'; _id: string };

export type HomePageMissionFragment = { __typename?: 'Mission'; _id: string };

export type HomePageCveFragment = {
  __typename?: 'CVE';
  cve_id: string;
  cvss_v2?: { __typename?: 'CVSSv2'; base_severity?: string | null } | null;
  cvss_v30?: { __typename?: 'CVSSv30'; base_severity?: string | null } | null;
  cvss_v31?: { __typename?: 'CVSSv31'; base_severity?: string | null } | null;
  cvss_v40?: { __typename?: 'CVSSv40'; base_severity?: string | null } | null;
};

export type HomePageHostFragment = {
  __typename?: 'Host';
  software_versions: Array<{ __typename?: 'SoftwareVersion'; version: string }>;
};

export const HomePageSubnetFragmentDoc = gql`
  fragment HomePageSubnet on Subnet {
    note
    range
  }
`;
export const HomePageOrgUnitFragmentDoc = gql`
  fragment HomePageOrgUnit on OrganizationUnit {
    name
  }
`;
export const HomePageIpFragmentDoc = gql`
  fragment HomePageIP on IP {
    _id
  }
`;
export const HomePageNodeObjectFragmentDoc = gql`
  fragment HomePageNodeObject on NodeObject {
    _id
  }
`;
export const HomePageMissionFragmentDoc = gql`
  fragment HomePageMission on Mission {
    _id
  }
`;
export const HomePageCveFragmentDoc = gql`
  fragment HomePageCVE on CVE {
    cve_id
    cvss_v2 {
      base_severity
    }
    cvss_v30 {
      base_severity
    }
    cvss_v31 {
      base_severity
    }
    cvss_v40 {
      base_severity
    }
  }
`;
export const HomePageHostFragmentDoc = gql`
  fragment HomePageHost on Host {
    software_versions {
      version
    }
  }
`;
