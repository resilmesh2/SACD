import * as SchemaTypes from '../../../../generated/base-types';

import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type CreateSubnetMutationVariables = SchemaTypes.Exact<{
  range: SchemaTypes.Scalars['String']['input'];
  note?: SchemaTypes.InputMaybe<SchemaTypes.Scalars['String']['input']>;
}>;

export type CreateSubnetMutation = {
  __typename?: 'Mutation';
  createSubnets: {
    __typename?: 'CreateSubnetsMutationResponse';
    subnets: Array<{ __typename?: 'Subnet'; _id: string; range: string; note?: string | null }>;
  };
};

export type UpdateSubnetMutationVariables = SchemaTypes.Exact<{
  oldRange: SchemaTypes.Scalars['String']['input'];
  newRange: SchemaTypes.Scalars['String']['input'];
  note?: SchemaTypes.InputMaybe<SchemaTypes.Scalars['String']['input']>;
}>;

export type UpdateSubnetMutation = {
  __typename?: 'Mutation';
  updateSubnets: {
    __typename?: 'UpdateSubnetsMutationResponse';
    subnets: Array<{ __typename?: 'Subnet'; _id: string; range: string; note?: string | null }>;
  };
};

export type LinkSubnetToParentMutationVariables = SchemaTypes.Exact<{
  subnetRange: SchemaTypes.Scalars['String']['input'];
  parentSubnetRange: SchemaTypes.Scalars['String']['input'];
}>;

export type LinkSubnetToParentMutation = {
  __typename?: 'Mutation';
  linkSubnetToParent?: { __typename?: 'Subnet'; _id: string; range: string } | null;
};

export type UnlinkSubnetFromParentMutationVariables = SchemaTypes.Exact<{
  subnetRange: SchemaTypes.Scalars['String']['input'];
  parentRange: SchemaTypes.Scalars['String']['input'];
}>;

export type UnlinkSubnetFromParentMutation = {
  __typename?: 'Mutation';
  unlinkSubnetFromParent?: { __typename?: 'Subnet'; _id: string; range: string } | null;
};

export type LinkSubnetToOrgUnitMutationVariables = SchemaTypes.Exact<{
  subnetRange: SchemaTypes.Scalars['String']['input'];
  orgUnitName: SchemaTypes.Scalars['String']['input'];
}>;

export type LinkSubnetToOrgUnitMutation = {
  __typename?: 'Mutation';
  linkSubnetToOrgUnit?: { __typename?: 'Subnet'; _id: string; range: string } | null;
};

export type UnlinkSubnetFromOrgUnitMutationVariables = SchemaTypes.Exact<{
  subnetRange: SchemaTypes.Scalars['String']['input'];
  orgUnitName: SchemaTypes.Scalars['String']['input'];
}>;

export type UnlinkSubnetFromOrgUnitMutation = {
  __typename?: 'Mutation';
  unlinkSubnetFromOrgUnit?: { __typename?: 'Subnet'; _id: string; range: string } | null;
};

export type MergeSubnetWithContactsMutationVariables = SchemaTypes.Exact<{
  subnetRange: SchemaTypes.Scalars['String']['input'];
  contactNames: Array<SchemaTypes.Scalars['String']['input']> | SchemaTypes.Scalars['String']['input'];
}>;

export type MergeSubnetWithContactsMutation = {
  __typename?: 'Mutation';
  mergeSubnetWithContacts?: { __typename?: 'Subnet'; _id: string; range: string } | null;
};

export type UnlinkSubnetFromContactsMutationVariables = SchemaTypes.Exact<{
  subnetRange: SchemaTypes.Scalars['String']['input'];
  contactNames: Array<SchemaTypes.Scalars['String']['input']> | SchemaTypes.Scalars['String']['input'];
}>;

export type UnlinkSubnetFromContactsMutation = {
  __typename?: 'Mutation';
  unlinkSubnetFromContacts?: { __typename?: 'Subnet'; _id: string; range: string } | null;
};

export const CreateSubnetDocument = gql`
  mutation CreateSubnet($range: String!, $note: String) {
    createSubnets(input: [{ range: $range, note: $note }]) {
      subnets {
        _id
        range
        note
      }
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class CreateSubnetMutationService extends Apollo.Mutation<CreateSubnetMutation, CreateSubnetMutationVariables> {
  document = CreateSubnetDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
export const UpdateSubnetDocument = gql`
  mutation UpdateSubnet($oldRange: String!, $newRange: String!, $note: String) {
    updateSubnets(where: { range: $oldRange }, update: { range: $newRange, note: $note }) {
      subnets {
        _id
        range
        note
      }
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class UpdateSubnetMutationService extends Apollo.Mutation<UpdateSubnetMutation, UpdateSubnetMutationVariables> {
  document = UpdateSubnetDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
export const LinkSubnetToParentDocument = gql`
  mutation LinkSubnetToParent($subnetRange: String!, $parentSubnetRange: String!) {
    linkSubnetToParent(subnetRange: $subnetRange, parentSubnetRange: $parentSubnetRange) {
      _id
      range
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class LinkSubnetToParentMutationService extends Apollo.Mutation<
  LinkSubnetToParentMutation,
  LinkSubnetToParentMutationVariables
> {
  document = LinkSubnetToParentDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
export const UnlinkSubnetFromParentDocument = gql`
  mutation UnlinkSubnetFromParent($subnetRange: String!, $parentRange: String!) {
    unlinkSubnetFromParent(subnetRange: $subnetRange, parentRange: $parentRange) {
      _id
      range
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class UnlinkSubnetFromParentMutationService extends Apollo.Mutation<
  UnlinkSubnetFromParentMutation,
  UnlinkSubnetFromParentMutationVariables
> {
  document = UnlinkSubnetFromParentDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
export const LinkSubnetToOrgUnitDocument = gql`
  mutation LinkSubnetToOrgUnit($subnetRange: String!, $orgUnitName: String!) {
    linkSubnetToOrgUnit(subnetRange: $subnetRange, orgUnitName: $orgUnitName) {
      _id
      range
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class LinkSubnetToOrgUnitMutationService extends Apollo.Mutation<
  LinkSubnetToOrgUnitMutation,
  LinkSubnetToOrgUnitMutationVariables
> {
  document = LinkSubnetToOrgUnitDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
export const UnlinkSubnetFromOrgUnitDocument = gql`
  mutation UnlinkSubnetFromOrgUnit($subnetRange: String!, $orgUnitName: String!) {
    unlinkSubnetFromOrgUnit(subnetRange: $subnetRange, orgUnitName: $orgUnitName) {
      _id
      range
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class UnlinkSubnetFromOrgUnitMutationService extends Apollo.Mutation<
  UnlinkSubnetFromOrgUnitMutation,
  UnlinkSubnetFromOrgUnitMutationVariables
> {
  document = UnlinkSubnetFromOrgUnitDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
export const MergeSubnetWithContactsDocument = gql`
  mutation MergeSubnetWithContacts($subnetRange: String!, $contactNames: [String!]!) {
    mergeSubnetWithContacts(subnetRange: $subnetRange, contactNames: $contactNames) {
      _id
      range
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class MergeSubnetWithContactsMutationService extends Apollo.Mutation<
  MergeSubnetWithContactsMutation,
  MergeSubnetWithContactsMutationVariables
> {
  document = MergeSubnetWithContactsDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
export const UnlinkSubnetFromContactsDocument = gql`
  mutation UnlinkSubnetFromContacts($subnetRange: String!, $contactNames: [String!]!) {
    unlinkSubnetFromContacts(subnetRange: $subnetRange, contactNames: $contactNames) {
      _id
      range
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class UnlinkSubnetFromContactsMutationService extends Apollo.Mutation<
  UnlinkSubnetFromContactsMutation,
  UnlinkSubnetFromContactsMutationVariables
> {
  document = UnlinkSubnetFromContactsDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
