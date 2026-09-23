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

export type GetOrgUnitsPaginatedQueryVariables = SchemaTypes.Exact<{
  options?: SchemaTypes.InputMaybe<SchemaTypes.OrganizationUnitOptions>;
  where?: SchemaTypes.InputMaybe<SchemaTypes.OrganizationUnitWhere>;
}>;

export type GetOrgUnitsPaginatedQuery = {
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
  organizationUnitsAggregate: { __typename?: 'OrganizationUnitAggregateSelection'; count: number };
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
export const GetOrgUnitsPaginatedDocument = gql`
  query GetOrgUnitsPaginated($options: OrganizationUnitOptions, $where: OrganizationUnitWhere) {
    organizationUnits(options: $options, where: $where) {
      ...OrgUnit
    }
    organizationUnitsAggregate(where: $where) {
      count
    }
  }
  ${OrgUnitFragmentDoc}
`;

@Injectable({
  providedIn: 'root',
})
export class GetOrgUnitsPaginatedQueryService extends Apollo.Query<
  GetOrgUnitsPaginatedQuery,
  GetOrgUnitsPaginatedQueryVariables
> {
  document = GetOrgUnitsPaginatedDocument;

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
