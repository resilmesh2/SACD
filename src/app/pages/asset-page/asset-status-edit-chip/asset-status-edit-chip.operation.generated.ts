import * as SchemaTypes from '../../../../generated/base-types';

import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type AssetStatusEditChipUpdateIpStatusMutationVariables = SchemaTypes.Exact<{
  address: SchemaTypes.Scalars['String']['input'];
  status: SchemaTypes.Scalars['String']['input'];
}>;

export type AssetStatusEditChipUpdateIpStatusMutation = {
  __typename?: 'Mutation';
  updateIPStatus?: { __typename?: 'IP'; _id: string; address: string; status?: string | null } | null;
};

export type AssetStatusEditChipUpdateNetworkServiceStatusMutationVariables = SchemaTypes.Exact<{
  address: SchemaTypes.Scalars['String']['input'];
  protocol: SchemaTypes.Scalars['String']['input'];
  port: SchemaTypes.Scalars['Int']['input'];
  service: SchemaTypes.Scalars['String']['input'];
  status: SchemaTypes.Scalars['String']['input'];
}>;

export type AssetStatusEditChipUpdateNetworkServiceStatusMutation = {
  __typename?: 'Mutation';
  updateNetworkServiceStatus?: { __typename?: 'NetworkServiceOn'; status?: string | null } | null;
};

export const AssetStatusEditChipUpdateIpStatusDocument = gql`
  mutation AssetStatusEditChipUpdateIPStatus($address: String!, $status: String!) {
    updateIPStatus(address: $address, status: $status) {
      _id
      address
      status
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class AssetStatusEditChipUpdateIpStatusMutationService extends Apollo.Mutation<
  AssetStatusEditChipUpdateIpStatusMutation,
  AssetStatusEditChipUpdateIpStatusMutationVariables
> {
  document = AssetStatusEditChipUpdateIpStatusDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
export const AssetStatusEditChipUpdateNetworkServiceStatusDocument = gql`
  mutation AssetStatusEditChipUpdateNetworkServiceStatus(
    $address: String!
    $protocol: String!
    $port: Int!
    $service: String!
    $status: String!
  ) {
    updateNetworkServiceStatus(
      address: $address
      protocol: $protocol
      port: $port
      service: $service
      status: $status
    ) {
      status
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class AssetStatusEditChipUpdateNetworkServiceStatusMutationService extends Apollo.Mutation<
  AssetStatusEditChipUpdateNetworkServiceStatusMutation,
  AssetStatusEditChipUpdateNetworkServiceStatusMutationVariables
> {
  document = AssetStatusEditChipUpdateNetworkServiceStatusDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
