import * as SchemaTypes from '../../../../generated/base-types';

import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type MissionEditorGetHostsQueryVariables = SchemaTypes.Exact<{ [key: string]: never; }>;


export type MissionEditorGetHostsQuery = { __typename?: 'Query', hosts: Array<{ __typename?: 'Host', hostname?: string | null }> };

export type MissionEditorGetIPsQueryVariables = SchemaTypes.Exact<{ [key: string]: never; }>;


export type MissionEditorGetIPsQuery = { __typename?: 'Query', ips: Array<{ __typename?: 'IP', address: string }> };

export type MissionEditorGetComponentsQueryVariables = SchemaTypes.Exact<{ [key: string]: never; }>;


export type MissionEditorGetComponentsQuery = { __typename?: 'Query', components: Array<{ __typename?: 'Component', name: string }> };

export const MissionEditorGetHostsDocument = gql`
    query MissionEditorGetHosts {
  hosts {
    hostname
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class MissionEditorGetHostsQueryService extends Apollo.Query<MissionEditorGetHostsQuery, MissionEditorGetHostsQueryVariables> {
    document = MissionEditorGetHostsDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const MissionEditorGetIPsDocument = gql`
    query MissionEditorGetIPs {
  ips {
    address
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class MissionEditorGetIPsQueryService extends Apollo.Query<MissionEditorGetIPsQuery, MissionEditorGetIPsQueryVariables> {
    document = MissionEditorGetIPsDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const MissionEditorGetComponentsDocument = gql`
    query MissionEditorGetComponents {
  components(where: {missionsAggregate: {count_GT: 0}}) {
    name
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class MissionEditorGetComponentsQueryService extends Apollo.Query<MissionEditorGetComponentsQuery, MissionEditorGetComponentsQueryVariables> {
    document = MissionEditorGetComponentsDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }