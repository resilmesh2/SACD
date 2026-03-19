import * as SchemaTypes from '../../../../generated/base-types';

import { gql } from 'apollo-angular';
import { MissionPageMissionFragmentDoc } from './mission-page.fragment.generated';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type MissionPageGetNamesQueryVariables = SchemaTypes.Exact<{
  [key: string]: never;
}>;

export type MissionPageGetNamesQuery = {
  __typename?: 'Query';
  missions: Array<{ __typename?: 'Mission'; name: string }>;
};

export type MissionPageGetMissionQueryVariables = SchemaTypes.Exact<{
  name: SchemaTypes.Scalars['String']['input'];
}>;

export type MissionPageGetMissionQuery = {
  __typename?: 'Query';
  missions: Array<{
    __typename?: 'Mission';
    name: string;
    criticality?: number | null;
    description: string;
    structure: string;
  }>;
};

export const MissionPageGetNamesDocument = gql`
  query MissionPageGetNames {
    missions {
      name
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class MissionPageGetNamesQueryService extends Apollo.Query<
  MissionPageGetNamesQuery,
  MissionPageGetNamesQueryVariables
> {
  document = MissionPageGetNamesDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
export const MissionPageGetMissionDocument = gql`
  query MissionPageGetMission($name: String!) {
    missions(where: { name: $name }) {
      ...MissionPageMission
    }
  }
  ${MissionPageMissionFragmentDoc}
`;

@Injectable({
  providedIn: 'root',
})
export class MissionPageGetMissionQueryService extends Apollo.Query<
  MissionPageGetMissionQuery,
  MissionPageGetMissionQueryVariables
> {
  document = MissionPageGetMissionDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
