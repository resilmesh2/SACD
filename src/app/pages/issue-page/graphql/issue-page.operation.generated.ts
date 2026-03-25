import * as SchemaTypes from '../../../../generated/base-types';

import { gql } from 'apollo-angular';
import { IssuePageVulnerabilityFragmentDoc } from './issue-page.fragment.generated';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type IssuePageGetVulnerabilitiesQueryVariables = SchemaTypes.Exact<{
  [key: string]: never;
}>;

export type IssuePageGetVulnerabilitiesQuery = {
  __typename?: 'Query';
  vulnerabilities: Array<{
    __typename?: 'Vulnerability';
    status?: Array<string> | null;
    cve?: {
      __typename?: 'CVE';
      cve_id: string;
      description: string;
      published: string;
      result_impacts?: Array<string | null> | null;
      cvss_v31?: {
        __typename?: 'CVSSv31';
        base_severity?: string | null;
      } | null;
    } | null;
  }>;
};

export type IssuePageUpdateVulnerabilityStatusMutationVariables =
  SchemaTypes.Exact<{
    cve: SchemaTypes.Scalars['String']['input'];
    status:
      | Array<SchemaTypes.InputMaybe<SchemaTypes.Scalars['String']['input']>>
      | SchemaTypes.InputMaybe<SchemaTypes.Scalars['String']['input']>;
  }>;

export type IssuePageUpdateVulnerabilityStatusMutation = {
  __typename?: 'Mutation';
  updateVulnerabilityStatus?: {
    __typename?: 'Vulnerability';
    status?: Array<string> | null;
  } | null;
};

export const IssuePageGetVulnerabilitiesDocument = gql`
  query IssuePageGetVulnerabilities {
    vulnerabilities {
      ...IssuePageVulnerability
    }
  }
  ${IssuePageVulnerabilityFragmentDoc}
`;

@Injectable({
  providedIn: 'root',
})
export class IssuePageGetVulnerabilitiesQueryService extends Apollo.Query<
  IssuePageGetVulnerabilitiesQuery,
  IssuePageGetVulnerabilitiesQueryVariables
> {
  document = IssuePageGetVulnerabilitiesDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
export const IssuePageUpdateVulnerabilityStatusDocument = gql`
  mutation IssuePageUpdateVulnerabilityStatus(
    $cve: String!
    $status: [String]!
  ) {
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
