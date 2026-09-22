import * as SchemaTypes from '../../../../generated/base-types';

import { gql } from 'apollo-angular';
export type HomePageHostFragment = {
  __typename?: 'Host';
  software_versions: Array<{ __typename?: 'SoftwareVersion'; version: string }>;
};

export const HomePageHostFragmentDoc = gql`
  fragment HomePageHost on Host {
    software_versions {
      version
    }
  }
`;
