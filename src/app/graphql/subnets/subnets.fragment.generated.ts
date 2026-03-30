import * as SchemaTypes from '../../../generated/base-types';

import { gql } from 'apollo-angular';
export type SubnetFragment = { __typename?: 'Subnet', _id: string, note?: string | null, range: string, org_units: Array<{ __typename?: 'OrganizationUnit', name: string }>, contacts: Array<{ __typename?: 'Contact', name: string }>, parent_subnet: Array<{ __typename?: 'Subnet', _id: string, note?: string | null, range: string }> };

export const SubnetFragmentDoc = gql`
    fragment Subnet on Subnet {
  _id
  note
  range
  org_units {
    name
  }
  contacts {
    name
  }
  parent_subnet {
    _id
    note
    range
  }
}
    `;