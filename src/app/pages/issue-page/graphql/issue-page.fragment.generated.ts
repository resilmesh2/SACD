import * as SchemaTypes from '../../../../generated/base-types';

import { gql } from 'apollo-angular';
export type IssuePageCveFragment = {
  __typename?: 'CVE';
  cve_id: string;
  description: string;
  published: string;
  result_impacts?: Array<string | null> | null;
  cvss_v31?: { __typename?: 'CVSSv31'; base_severity?: string | null } | null;
  vulnerability: { __typename?: 'Vulnerability'; status?: Array<string> | null };
};

export const IssuePageCveFragmentDoc = gql`
  fragment IssuePageCve on CVE {
    cve_id
    description
    published
    result_impacts
    cvss_v31 {
      base_severity
    }
    vulnerability {
      status
    }
  }
`;
