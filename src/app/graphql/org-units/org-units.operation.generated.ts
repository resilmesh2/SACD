import * as SchemaTypes from '../../../generated/base-types';

import { gql } from 'apollo-angular';
import { OrgUnitFragmentDoc } from './org-units.fragment.generated';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type GetAllOrgUnitsQueryVariables = SchemaTypes.Exact<{ [key: string]: never }>;

export type GetAllOrgUnitsQuery = {
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

export type GetOrgUnitQueryVariables = SchemaTypes.Exact<{
  name: SchemaTypes.Scalars['String']['input'];
}>;

export type GetOrgUnitQuery = {
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

export const GetAllOrgUnitsDocument = gql`
  query GetAllOrgUnits {
    organizationUnits {
      ...OrgUnit
    }
  }
  ${OrgUnitFragmentDoc}
`;

@Injectable({
  providedIn: 'root',
})
export class GetAllOrgUnitsQueryService extends Apollo.Query<GetAllOrgUnitsQuery, GetAllOrgUnitsQueryVariables> {
  document = GetAllOrgUnitsDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
export const GetOrgUnitDocument = gql`
  query GetOrgUnit($name: String!) {
    organizationUnits(where: { name: $name }) {
      ...OrgUnit
    }
  }
  ${OrgUnitFragmentDoc}
`;

@Injectable({
  providedIn: 'root',
})
export class GetOrgUnitQueryService extends Apollo.Query<GetOrgUnitQuery, GetOrgUnitQueryVariables> {
  document = GetOrgUnitDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
