import * as SchemaTypes from '../../../../generated/base-types';

import { gql } from 'apollo-angular';
import { OrgUnitFragmentDoc } from '../../../graphql/org-units/org-units.fragment.generated';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type OrgUnitsPageGetOneQueryVariables = SchemaTypes.Exact<{
  name: SchemaTypes.Scalars['String']['input'];
}>;


export type OrgUnitsPageGetOneQuery = { __typename?: 'Query', organizationUnits: Array<{ __typename?: 'OrganizationUnit', name: string, contacts: Array<{ __typename?: 'Contact', name: string }>, subnets: Array<{ __typename?: 'Subnet', range: string, parent_subnet: Array<{ __typename?: 'Subnet', range: string }> }>, parent_org_unit: Array<{ __typename?: 'OrganizationUnit', name: string }> }> };

export const OrgUnitsPageGetOneDocument = gql`
    query OrgUnitsPageGetOne($name: String!) {
  organizationUnits(where: {name: $name}) {
    ...OrgUnit
  }
}
    ${OrgUnitFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class OrgUnitsPageGetOneQueryService extends Apollo.Query<OrgUnitsPageGetOneQuery, OrgUnitsPageGetOneQueryVariables> {
    document = OrgUnitsPageGetOneDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }