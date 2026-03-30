import * as SchemaTypes from '../../../../generated/base-types';

import { gql } from 'apollo-angular';
export type MissionPageMissionFragment = { __typename?: 'Mission', name: string, criticality?: number | null, description: string, structure: string };

export const MissionPageMissionFragmentDoc = gql`
    fragment MissionPageMission on Mission {
  name
  criticality
  description
  structure
}
    `;