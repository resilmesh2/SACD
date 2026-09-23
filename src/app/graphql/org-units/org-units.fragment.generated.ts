import * as SchemaTypes from '../../../generated/base-types';

import { gql } from 'apollo-angular';
export type OrgUnitFragment = {
  __typename?: 'OrganizationUnit';
  name: string;
  contacts: Array<{ __typename?: 'Contact'; name: string }>;
  subnets: Array<{
    __typename?: 'Subnet';
    range: string;
    parent_subnet: Array<{ __typename?: 'Subnet'; range: string }>;
  }>;
  parent_org_unit: Array<{ __typename?: 'OrganizationUnit'; name: string }>;
};

export const OrgUnitFragmentDoc = gql`
  fragment OrgUnit on OrganizationUnit {
    name
    contacts {
      name
    }
    subnets {
      range
      parent_subnet {
        range
      }
    }
    parent_org_unit {
      name
    }
  }
`;
