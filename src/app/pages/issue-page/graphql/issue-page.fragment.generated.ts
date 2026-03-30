import * as SchemaTypes from '../../../../generated/base-types';

import { gql } from 'apollo-angular';
export type IssuePageVulnerabilityFragment = { __typename?: 'Vulnerability', status?: Array<string> | null, cve?: { __typename?: 'CVE', cve_id: string, description: string, published: string, result_impacts?: Array<string | null> | null, cvss_v31?: { __typename?: 'CVSSv31', base_severity?: string | null } | null } | null };

export const IssuePageVulnerabilityFragmentDoc = gql`
    fragment IssuePageVulnerability on Vulnerability {
  status
  cve {
    cve_id
    description
    published
    result_impacts
    cvss_v31 {
      base_severity
    }
  }
}
    `;