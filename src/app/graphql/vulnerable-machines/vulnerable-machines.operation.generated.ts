import * as SchemaTypes from '../../../generated/base-types';

import { gql } from 'apollo-angular';
import { VulnerableMachinesFragmentDoc } from './vulnerable-machines.fragment.generated';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type GetVulnerableMachinesQueryVariables = SchemaTypes.Exact<{
  cveId: SchemaTypes.Scalars['String']['input'];
}>;

export type GetVulnerableMachinesQuery = {
  __typename?: 'Query';
  cves: Array<{
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
              domain_names: Array<{ __typename?: 'DomainName'; domain_name: string }>;
              subnets: Array<{ __typename?: 'Subnet'; range: string }>;
            }>;
          } | null;
        }>;
      }>;
    };
  }>;
};

export const GetVulnerableMachinesDocument = gql`
  query GetVulnerableMachines($cveId: String!) {
    cves(where: { cve_id: $cveId }) {
      ...VulnerableMachines
    }
  }
  ${VulnerableMachinesFragmentDoc}
`;

@Injectable({
  providedIn: 'root',
})
export class GetVulnerableMachinesQueryService extends Apollo.Query<
  GetVulnerableMachinesQuery,
  GetVulnerableMachinesQueryVariables
> {
  document = GetVulnerableMachinesDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
