import * as SchemaTypes from '../../../../generated/base-types';

import { gql } from 'apollo-angular';
import {
  HomePageHostFragmentDoc,
  HomePageCveFragmentDoc,
  HomePageMissionFragmentDoc,
  HomePageNodeObjectFragmentDoc,
  HomePageIpFragmentDoc,
  HomePageOrgUnitFragmentDoc,
  HomePageSubnetFragmentDoc,
} from './home-page.fragment.generated';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type HomePageGetSubnetsQueryVariables = SchemaTypes.Exact<{
  [key: string]: never;
}>;

export type HomePageGetSubnetsQuery = {
  __typename?: 'Query';
  subnets: Array<{
    __typename?: 'Subnet';
    note?: string | null;
    range: string;
  }>;
};

export type HomePageGetOrgUnitsQueryVariables = SchemaTypes.Exact<{
  [key: string]: never;
}>;

export type HomePageGetOrgUnitsQuery = {
  __typename?: 'Query';
  organizationUnits: Array<{ __typename?: 'OrganizationUnit'; name: string }>;
};

export type HomePageGetIPsQueryVariables = SchemaTypes.Exact<{
  [key: string]: never;
}>;

export type HomePageGetIPsQuery = {
  __typename?: 'Query';
  ips: Array<{ __typename?: 'IP'; _id: string }>;
};

export type HomePageGetNodeObjectsQueryVariables = SchemaTypes.Exact<{
  [key: string]: never;
}>;

export type HomePageGetNodeObjectsQuery = {
  __typename?: 'Query';
  nodeObjects: Array<{ __typename?: 'NodeObject'; _id: string }>;
};

export type HomePageGetMissionsQueryVariables = SchemaTypes.Exact<{
  [key: string]: never;
}>;

export type HomePageGetMissionsQuery = {
  __typename?: 'Query';
  missions: Array<{ __typename?: 'Mission'; _id: string }>;
};

export type HomePageGetVulnerabilitiesQueryVariables = SchemaTypes.Exact<{
  [key: string]: never;
}>;

export type HomePageGetVulnerabilitiesQuery = {
  __typename?: 'Query';
  cves: Array<{
    __typename?: 'CVE';
    cve_id: string;
    cvss_v2?: { __typename?: 'CVSSv2'; base_severity?: string | null } | null;
    cvss_v30?: { __typename?: 'CVSSv30'; base_severity?: string | null } | null;
    cvss_v31?: { __typename?: 'CVSSv31'; base_severity?: string | null } | null;
    cvss_v40?: { __typename?: 'CVSSv40'; base_severity?: string | null } | null;
  }>;
};

export type HomePageGetHostsQueryVariables = SchemaTypes.Exact<{
  [key: string]: never;
}>;

export type HomePageGetHostsQuery = {
  __typename?: 'Query';
  hosts: Array<{
    __typename?: 'Host';
    software_versions: Array<{
      __typename?: 'SoftwareVersion';
      version: string;
    }>;
  }>;
};

export const HomePageGetSubnetsDocument = gql`
  query HomePageGetSubnets {
    subnets {
      ...HomePageSubnet
    }
  }
  ${HomePageSubnetFragmentDoc}
`;

@Injectable({
  providedIn: 'root',
})
export class HomePageGetSubnetsQueryService extends Apollo.Query<
  HomePageGetSubnetsQuery,
  HomePageGetSubnetsQueryVariables
> {
  document = HomePageGetSubnetsDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
export const HomePageGetOrgUnitsDocument = gql`
  query HomePageGetOrgUnits {
    organizationUnits {
      ...HomePageOrgUnit
    }
  }
  ${HomePageOrgUnitFragmentDoc}
`;

@Injectable({
  providedIn: 'root',
})
export class HomePageGetOrgUnitsQueryService extends Apollo.Query<
  HomePageGetOrgUnitsQuery,
  HomePageGetOrgUnitsQueryVariables
> {
  document = HomePageGetOrgUnitsDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
export const HomePageGetIPsDocument = gql`
  query HomePageGetIPs {
    ips {
      ...HomePageIP
    }
  }
  ${HomePageIpFragmentDoc}
`;

@Injectable({
  providedIn: 'root',
})
export class HomePageGetIPsQueryService extends Apollo.Query<
  HomePageGetIPsQuery,
  HomePageGetIPsQueryVariables
> {
  document = HomePageGetIPsDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
export const HomePageGetNodeObjectsDocument = gql`
  query HomePageGetNodeObjects {
    nodeObjects {
      ...HomePageNodeObject
    }
  }
  ${HomePageNodeObjectFragmentDoc}
`;

@Injectable({
  providedIn: 'root',
})
export class HomePageGetNodeObjectsQueryService extends Apollo.Query<
  HomePageGetNodeObjectsQuery,
  HomePageGetNodeObjectsQueryVariables
> {
  document = HomePageGetNodeObjectsDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
export const HomePageGetMissionsDocument = gql`
  query HomePageGetMissions {
    missions {
      ...HomePageMission
    }
  }
  ${HomePageMissionFragmentDoc}
`;

@Injectable({
  providedIn: 'root',
})
export class HomePageGetMissionsQueryService extends Apollo.Query<
  HomePageGetMissionsQuery,
  HomePageGetMissionsQueryVariables
> {
  document = HomePageGetMissionsDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
export const HomePageGetVulnerabilitiesDocument = gql`
  query HomePageGetVulnerabilities {
    cves {
      ...HomePageCVE
    }
  }
  ${HomePageCveFragmentDoc}
`;

@Injectable({
  providedIn: 'root',
})
export class HomePageGetVulnerabilitiesQueryService extends Apollo.Query<
  HomePageGetVulnerabilitiesQuery,
  HomePageGetVulnerabilitiesQueryVariables
> {
  document = HomePageGetVulnerabilitiesDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
export const HomePageGetHostsDocument = gql`
  query HomePageGetHosts {
    hosts {
      ...HomePageHost
    }
  }
  ${HomePageHostFragmentDoc}
`;

@Injectable({
  providedIn: 'root',
})
export class HomePageGetHostsQueryService extends Apollo.Query<
  HomePageGetHostsQuery,
  HomePageGetHostsQueryVariables
> {
  document = HomePageGetHostsDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
