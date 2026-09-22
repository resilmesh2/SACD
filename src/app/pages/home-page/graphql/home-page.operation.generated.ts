import * as SchemaTypes from '../../../../generated/base-types';

import { gql } from 'apollo-angular';
import { HomePageHostFragmentDoc } from './home-page.fragment.generated';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type HomePageGetCountsQueryVariables = SchemaTypes.Exact<{ [key: string]: never }>;

export type HomePageGetCountsQuery = {
  __typename?: 'Query';
  ipsAggregate: { __typename?: 'IPAggregateSelection'; count: number };
  nodeObjectsAggregate: { __typename?: 'NodeObjectAggregateSelection'; count: number };
  missionsAggregate: { __typename?: 'MissionAggregateSelection'; count: number };
  subnetsAggregate: { __typename?: 'SubnetAggregateSelection'; count: number };
  organizationUnitsAggregate: { __typename?: 'OrganizationUnitAggregateSelection'; count: number };
};

export type HomePageGetSeverityCountsQueryVariables = SchemaTypes.Exact<{ [key: string]: never }>;

export type HomePageGetSeverityCountsQuery = {
  __typename?: 'Query';
  critical: { __typename?: 'CVEAggregateSelection'; count: number };
  high: { __typename?: 'CVEAggregateSelection'; count: number };
  medium: { __typename?: 'CVEAggregateSelection'; count: number };
  low: { __typename?: 'CVEAggregateSelection'; count: number };
  unknown: { __typename?: 'CVEAggregateSelection'; count: number };
};

export type HomePageGetHostsQueryVariables = SchemaTypes.Exact<{ [key: string]: never }>;

export type HomePageGetHostsQuery = {
  __typename?: 'Query';
  hosts: Array<{ __typename?: 'Host'; software_versions: Array<{ __typename?: 'SoftwareVersion'; version: string }> }>;
};

export const HomePageGetCountsDocument = gql`
  query HomePageGetCounts {
    ipsAggregate {
      count
    }
    nodeObjectsAggregate {
      count
    }
    missionsAggregate {
      count
    }
    subnetsAggregate {
      count
    }
    organizationUnitsAggregate {
      count
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class HomePageGetCountsQueryService extends Apollo.Query<
  HomePageGetCountsQuery,
  HomePageGetCountsQueryVariables
> {
  document = HomePageGetCountsDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
export const HomePageGetSeverityCountsDocument = gql`
  query HomePageGetSeverityCounts {
    critical: cvesAggregate(
      where: { AND: [{ vulnerabilityAggregate: { count_GT: 0 } }, { cvss_v31: { base_severity: "CRITICAL" } }] }
    ) {
      count
    }
    high: cvesAggregate(
      where: { AND: [{ vulnerabilityAggregate: { count_GT: 0 } }, { cvss_v31: { base_severity: "HIGH" } }] }
    ) {
      count
    }
    medium: cvesAggregate(
      where: { AND: [{ vulnerabilityAggregate: { count_GT: 0 } }, { cvss_v31: { base_severity: "MEDIUM" } }] }
    ) {
      count
    }
    low: cvesAggregate(
      where: { AND: [{ vulnerabilityAggregate: { count_GT: 0 } }, { cvss_v31: { base_severity: "LOW" } }] }
    ) {
      count
    }
    unknown: cvesAggregate(
      where: { AND: [{ vulnerabilityAggregate: { count_GT: 0 } }, { cvss_v31Aggregate: { count: 0 } }] }
    ) {
      count
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class HomePageGetSeverityCountsQueryService extends Apollo.Query<
  HomePageGetSeverityCountsQuery,
  HomePageGetSeverityCountsQueryVariables
> {
  document = HomePageGetSeverityCountsDocument;

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
export class HomePageGetHostsQueryService extends Apollo.Query<HomePageGetHostsQuery, HomePageGetHostsQueryVariables> {
  document = HomePageGetHostsDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
