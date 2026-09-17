import * as SchemaTypes from '../../../../generated/base-types';

import { gql } from 'apollo-angular';
import { IssuePageCveFragmentDoc } from './issue-page.fragment.generated';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type IssuePageGetCvesPaginatedQueryVariables = SchemaTypes.Exact<{
  where?: SchemaTypes.InputMaybe<SchemaTypes.CveWhere>;
  options?: SchemaTypes.InputMaybe<SchemaTypes.CveOptions>;
}>;

export type IssuePageGetCvesPaginatedQuery = {
  __typename?: 'Query';
  cves: Array<{
    __typename?: 'CVE';
    cve_id: string;
    description: string;
    published: string;
    result_impacts?: Array<string | null> | null;
    cvss_v31?: { __typename?: 'CVSSv31'; base_severity?: string | null } | null;
    vulnerability: { __typename?: 'Vulnerability'; status?: Array<string> | null };
  }>;
  cvesAggregate: { __typename?: 'CVEAggregateSelection'; count: number };
};

export type IssuePageUpdateVulnerabilityStatusMutationVariables = SchemaTypes.Exact<{
  cve: SchemaTypes.Scalars['String']['input'];
  status:
    | Array<SchemaTypes.InputMaybe<SchemaTypes.Scalars['String']['input']>>
    | SchemaTypes.InputMaybe<SchemaTypes.Scalars['String']['input']>;
}>;

export type IssuePageUpdateVulnerabilityStatusMutation = {
  __typename?: 'Mutation';
  updateVulnerabilityStatus?: { __typename?: 'Vulnerability'; status?: Array<string> | null } | null;
};

export const IssuePageGetCvesPaginatedDocument = gql`
  query IssuePageGetCvesPaginated($where: CVEWhere, $options: CVEOptions) {
    cves(where: $where, options: $options) {
      ...IssuePageCve
    }
    cvesAggregate(where: $where) {
      count
    }
  }
  ${IssuePageCveFragmentDoc}
`;

@Injectable({
  providedIn: 'root',
})
export class IssuePageGetCvesPaginatedQueryService extends Apollo.Query<
  IssuePageGetCvesPaginatedQuery,
  IssuePageGetCvesPaginatedQueryVariables
> {
  document = IssuePageGetCvesPaginatedDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
export const IssuePageUpdateVulnerabilityStatusDocument = gql`
  mutation IssuePageUpdateVulnerabilityStatus($cve: String!, $status: [String]!) {
    updateVulnerabilityStatus(cve: $cve, status: $status) {
      status
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class IssuePageUpdateVulnerabilityStatusMutationService extends Apollo.Mutation<
  IssuePageUpdateVulnerabilityStatusMutation,
  IssuePageUpdateVulnerabilityStatusMutationVariables
> {
  document = IssuePageUpdateVulnerabilityStatusDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
