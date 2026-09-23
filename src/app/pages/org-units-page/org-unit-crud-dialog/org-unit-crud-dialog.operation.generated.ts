import * as SchemaTypes from '../../../../generated/base-types';

import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type CreateOrgUnitMutationVariables = SchemaTypes.Exact<{
  name: SchemaTypes.Scalars['String']['input'];
}>;

export type CreateOrgUnitMutation = {
  __typename?: 'Mutation';
  createOrganizationUnits: {
    __typename?: 'CreateOrganizationUnitsMutationResponse';
    organizationUnits: Array<{ __typename?: 'OrganizationUnit'; name: string }>;
  };
};

export type UpdateOrgUnitMutationVariables = SchemaTypes.Exact<{
  oldName: SchemaTypes.Scalars['String']['input'];
  newName: SchemaTypes.Scalars['String']['input'];
}>;

export type UpdateOrgUnitMutation = {
  __typename?: 'Mutation';
  updateOrganizationUnits: {
    __typename?: 'UpdateOrganizationUnitsMutationResponse';
    organizationUnits: Array<{ __typename?: 'OrganizationUnit'; name: string }>;
  };
};

export type LinkOrgUnitToParentMutationVariables = SchemaTypes.Exact<{
  orgUnitName: SchemaTypes.Scalars['String']['input'];
  parentOrgUnitName: SchemaTypes.Scalars['String']['input'];
}>;

export type LinkOrgUnitToParentMutation = {
  __typename?: 'Mutation';
  linkOrgUnitToParentOrg?: { __typename?: 'OrganizationUnit'; name: string } | null;
};

export type UnlinkOrgUnitFromParentsMutationVariables = SchemaTypes.Exact<{
  orgUnitName: SchemaTypes.Scalars['String']['input'];
}>;

export type UnlinkOrgUnitFromParentsMutation = {
  __typename?: 'Mutation';
  unlinkOrgUnitFromParents?: { __typename?: 'OrganizationUnit'; name: string } | null;
};

export type MergeOrgUnitWithContactsMutationVariables = SchemaTypes.Exact<{
  orgUnitName: SchemaTypes.Scalars['String']['input'];
  contactNames: Array<SchemaTypes.Scalars['String']['input']> | SchemaTypes.Scalars['String']['input'];
}>;

export type MergeOrgUnitWithContactsMutation = {
  __typename?: 'Mutation';
  mergeOrgUnitWithContacts?: { __typename?: 'OrganizationUnit'; name: string } | null;
};

export type UnlinkOrgUnitFromContactsMutationVariables = SchemaTypes.Exact<{
  orgUnitName: SchemaTypes.Scalars['String']['input'];
  contactNames: Array<SchemaTypes.Scalars['String']['input']> | SchemaTypes.Scalars['String']['input'];
}>;

export type UnlinkOrgUnitFromContactsMutation = {
  __typename?: 'Mutation';
  unlinkOrgUnitFromContacts?: { __typename?: 'OrganizationUnit'; name: string } | null;
};

export const CreateOrgUnitDocument = gql`
  mutation CreateOrgUnit($name: String!) {
    createOrganizationUnits(input: [{ name: $name }]) {
      organizationUnits {
        name
      }
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class CreateOrgUnitMutationService extends Apollo.Mutation<
  CreateOrgUnitMutation,
  CreateOrgUnitMutationVariables
> {
  document = CreateOrgUnitDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
export const UpdateOrgUnitDocument = gql`
  mutation UpdateOrgUnit($oldName: String!, $newName: String!) {
    updateOrganizationUnits(where: { name: $oldName }, update: { name: $newName }) {
      organizationUnits {
        name
      }
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class UpdateOrgUnitMutationService extends Apollo.Mutation<
  UpdateOrgUnitMutation,
  UpdateOrgUnitMutationVariables
> {
  document = UpdateOrgUnitDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
export const LinkOrgUnitToParentDocument = gql`
  mutation LinkOrgUnitToParent($orgUnitName: String!, $parentOrgUnitName: String!) {
    linkOrgUnitToParentOrg(orgUnitName: $orgUnitName, parentOrgUnitName: $parentOrgUnitName) {
      name
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class LinkOrgUnitToParentMutationService extends Apollo.Mutation<
  LinkOrgUnitToParentMutation,
  LinkOrgUnitToParentMutationVariables
> {
  document = LinkOrgUnitToParentDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
export const UnlinkOrgUnitFromParentsDocument = gql`
  mutation UnlinkOrgUnitFromParents($orgUnitName: String!) {
    unlinkOrgUnitFromParents(orgUnitName: $orgUnitName) {
      name
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class UnlinkOrgUnitFromParentsMutationService extends Apollo.Mutation<
  UnlinkOrgUnitFromParentsMutation,
  UnlinkOrgUnitFromParentsMutationVariables
> {
  document = UnlinkOrgUnitFromParentsDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
export const MergeOrgUnitWithContactsDocument = gql`
  mutation MergeOrgUnitWithContacts($orgUnitName: String!, $contactNames: [String!]!) {
    mergeOrgUnitWithContacts(orgUnitName: $orgUnitName, contactNames: $contactNames) {
      name
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class MergeOrgUnitWithContactsMutationService extends Apollo.Mutation<
  MergeOrgUnitWithContactsMutation,
  MergeOrgUnitWithContactsMutationVariables
> {
  document = MergeOrgUnitWithContactsDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
export const UnlinkOrgUnitFromContactsDocument = gql`
  mutation UnlinkOrgUnitFromContacts($orgUnitName: String!, $contactNames: [String!]!) {
    unlinkOrgUnitFromContacts(orgUnitName: $orgUnitName, contactNames: $contactNames) {
      name
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class UnlinkOrgUnitFromContactsMutationService extends Apollo.Mutation<
  UnlinkOrgUnitFromContactsMutation,
  UnlinkOrgUnitFromContactsMutationVariables
> {
  document = UnlinkOrgUnitFromContactsDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
