import * as SchemaTypes from '../../../../generated/base-types';

import { gql } from 'apollo-angular';
import { OrgUnitsPageOrgUnitFragmentDoc } from './org-units-page.fragment.generated';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type OrgUnitsPageGetAllQueryVariables = SchemaTypes.Exact<{
  [key: string]: never;
}>;

export type OrgUnitsPageGetAllQuery = {
  __typename?: 'Query';
  organizationUnits: Array<{
    __typename?: 'OrganizationUnit';
    name: string;
    contacts: Array<{ __typename?: 'Contact'; name: string }>;
    subnets: Array<{
      __typename?: 'Subnet';
      range: string;
      parent_subnet: Array<{ __typename?: 'Subnet'; range: string }>;
    }>;
    parent_org_unit: Array<{ __typename?: 'OrganizationUnit'; name: string }>;
  }>;
};

export type OrgUnitsPageGetOneQueryVariables = SchemaTypes.Exact<{
  name: SchemaTypes.Scalars['String']['input'];
}>;

export type OrgUnitsPageGetOneQuery = {
  __typename?: 'Query';
  organizationUnits: Array<{
    __typename?: 'OrganizationUnit';
    name: string;
    contacts: Array<{ __typename?: 'Contact'; name: string }>;
    subnets: Array<{
      __typename?: 'Subnet';
      range: string;
      parent_subnet: Array<{ __typename?: 'Subnet'; range: string }>;
    }>;
    parent_org_unit: Array<{ __typename?: 'OrganizationUnit'; name: string }>;
  }>;
};

export const OrgUnitsPageGetAllDocument = gql`
  query OrgUnitsPageGetAll {
    organizationUnits {
      ...OrgUnitsPageOrgUnit
    }
  }
  ${OrgUnitsPageOrgUnitFragmentDoc}
`;

@Injectable({
  providedIn: 'root',
})
export class OrgUnitsPageGetAllQueryService extends Apollo.Query<
  OrgUnitsPageGetAllQuery,
  OrgUnitsPageGetAllQueryVariables
> {
  document = OrgUnitsPageGetAllDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
export const OrgUnitsPageGetOneDocument = gql`
  query OrgUnitsPageGetOne($name: String!) {
    organizationUnits(where: { name: $name }) {
      ...OrgUnitsPageOrgUnit
    }
  }
  ${OrgUnitsPageOrgUnitFragmentDoc}
`;

@Injectable({
  providedIn: 'root',
})
export class OrgUnitsPageGetOneQueryService extends Apollo.Query<
  OrgUnitsPageGetOneQuery,
  OrgUnitsPageGetOneQueryVariables
> {
  document = OrgUnitsPageGetOneDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
