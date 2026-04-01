import * as SchemaTypes from '../../../../generated/base-types';

import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type OrgUnitsPageDeleteOrgUnitMutationVariables = SchemaTypes.Exact<{
  name: SchemaTypes.Scalars['String']['input'];
}>;

export type OrgUnitsPageDeleteOrgUnitMutation = {
  __typename?: 'Mutation';
  deleteOrganizationUnits: { __typename?: 'DeleteInfo'; nodesDeleted: number };
};

export const OrgUnitsPageDeleteOrgUnitDocument = gql`
  mutation OrgUnitsPageDeleteOrgUnit($name: String!) {
    deleteOrganizationUnits(where: { name: $name }) {
      nodesDeleted
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class OrgUnitsPageDeleteOrgUnitMutationService extends Apollo.Mutation<
  OrgUnitsPageDeleteOrgUnitMutation,
  OrgUnitsPageDeleteOrgUnitMutationVariables
> {
  document = OrgUnitsPageDeleteOrgUnitDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
