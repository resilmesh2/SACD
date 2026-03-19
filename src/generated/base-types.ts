export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never;
    };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
};

export type Application = {
  __typename?: 'Application';
  _id: Scalars['ID']['output'];
  devices: Array<Device>;
  devicesAggregate?: Maybe<ApplicationDeviceDevicesAggregationSelection>;
  devicesConnection: ApplicationDevicesConnection;
  name: Scalars['String']['output'];
};

export type ApplicationDevicesArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  options?: InputMaybe<DeviceOptions>;
  where?: InputMaybe<DeviceWhere>;
};

export type ApplicationDevicesAggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<DeviceWhere>;
};

export type ApplicationDevicesConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<ApplicationDevicesConnectionSort>>;
  where?: InputMaybe<ApplicationDevicesConnectionWhere>;
};

export type ApplicationAggregateSelection = {
  __typename?: 'ApplicationAggregateSelection';
  count: Scalars['Int']['output'];
  name: StringAggregateSelection;
};

export type ApplicationConnectInput = {
  devices?: InputMaybe<Array<ApplicationDevicesConnectFieldInput>>;
};

export type ApplicationConnectWhere = {
  node: ApplicationWhere;
};

export type ApplicationCreateInput = {
  devices?: InputMaybe<ApplicationDevicesFieldInput>;
  name: Scalars['String']['input'];
};

export type ApplicationDeleteInput = {
  devices?: InputMaybe<Array<ApplicationDevicesDeleteFieldInput>>;
};

export type ApplicationDeviceDevicesAggregationSelection = {
  __typename?: 'ApplicationDeviceDevicesAggregationSelection';
  count: Scalars['Int']['output'];
  node?: Maybe<ApplicationDeviceDevicesNodeAggregateSelection>;
};

export type ApplicationDeviceDevicesNodeAggregateSelection = {
  __typename?: 'ApplicationDeviceDevicesNodeAggregateSelection';
  name: StringAggregateSelection;
  power: StringAggregateSelection;
  state: StringAggregateSelection;
};

export type ApplicationDevicesAggregateInput = {
  AND?: InputMaybe<Array<ApplicationDevicesAggregateInput>>;
  NOT?: InputMaybe<ApplicationDevicesAggregateInput>;
  OR?: InputMaybe<Array<ApplicationDevicesAggregateInput>>;
  count?: InputMaybe<Scalars['Int']['input']>;
  count_GT?: InputMaybe<Scalars['Int']['input']>;
  count_GTE?: InputMaybe<Scalars['Int']['input']>;
  count_LT?: InputMaybe<Scalars['Int']['input']>;
  count_LTE?: InputMaybe<Scalars['Int']['input']>;
  node?: InputMaybe<ApplicationDevicesNodeAggregationWhereInput>;
};

export type ApplicationDevicesConnectFieldInput = {
  connect?: InputMaybe<Array<DeviceConnectInput>>;
  /** Whether or not to overwrite any matching relationship with the new properties. */
  overwrite?: Scalars['Boolean']['input'];
  where?: InputMaybe<DeviceConnectWhere>;
};

export type ApplicationDevicesConnection = {
  __typename?: 'ApplicationDevicesConnection';
  edges: Array<ApplicationDevicesRelationship>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type ApplicationDevicesConnectionSort = {
  node?: InputMaybe<DeviceSort>;
};

export type ApplicationDevicesConnectionWhere = {
  AND?: InputMaybe<Array<ApplicationDevicesConnectionWhere>>;
  NOT?: InputMaybe<ApplicationDevicesConnectionWhere>;
  OR?: InputMaybe<Array<ApplicationDevicesConnectionWhere>>;
  node?: InputMaybe<DeviceWhere>;
};

export type ApplicationDevicesCreateFieldInput = {
  node: DeviceCreateInput;
};

export type ApplicationDevicesDeleteFieldInput = {
  delete?: InputMaybe<DeviceDeleteInput>;
  where?: InputMaybe<ApplicationDevicesConnectionWhere>;
};

export type ApplicationDevicesDisconnectFieldInput = {
  disconnect?: InputMaybe<DeviceDisconnectInput>;
  where?: InputMaybe<ApplicationDevicesConnectionWhere>;
};

export type ApplicationDevicesFieldInput = {
  connect?: InputMaybe<Array<ApplicationDevicesConnectFieldInput>>;
  create?: InputMaybe<Array<ApplicationDevicesCreateFieldInput>>;
};

export type ApplicationDevicesNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<ApplicationDevicesNodeAggregationWhereInput>>;
  NOT?: InputMaybe<ApplicationDevicesNodeAggregationWhereInput>;
  OR?: InputMaybe<Array<ApplicationDevicesNodeAggregationWhereInput>>;
  name_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  power_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  power_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  power_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  power_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  power_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  power_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  power_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  power_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  power_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  power_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  power_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  power_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  power_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  power_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  power_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  state_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  state_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  state_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  state_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  state_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  state_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  state_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  state_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  state_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  state_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  state_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  state_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  state_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  state_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  state_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
};

export type ApplicationDevicesRelationship = {
  __typename?: 'ApplicationDevicesRelationship';
  cursor: Scalars['String']['output'];
  node: Device;
};

export type ApplicationDevicesUpdateConnectionInput = {
  node?: InputMaybe<DeviceUpdateInput>;
};

export type ApplicationDevicesUpdateFieldInput = {
  connect?: InputMaybe<Array<ApplicationDevicesConnectFieldInput>>;
  create?: InputMaybe<Array<ApplicationDevicesCreateFieldInput>>;
  delete?: InputMaybe<Array<ApplicationDevicesDeleteFieldInput>>;
  disconnect?: InputMaybe<Array<ApplicationDevicesDisconnectFieldInput>>;
  update?: InputMaybe<ApplicationDevicesUpdateConnectionInput>;
  where?: InputMaybe<ApplicationDevicesConnectionWhere>;
};

export type ApplicationDisconnectInput = {
  devices?: InputMaybe<Array<ApplicationDevicesDisconnectFieldInput>>;
};

export type ApplicationEdge = {
  __typename?: 'ApplicationEdge';
  cursor: Scalars['String']['output'];
  node: Application;
};

export type ApplicationOptions = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  /**
   * Specify one or more ApplicationSort objects to sort Applications by. The sorts
   * will be applied in the order in which they are arranged in the array.
   */
  sort?: InputMaybe<Array<ApplicationSort>>;
};

export type ApplicationRelationInput = {
  devices?: InputMaybe<Array<ApplicationDevicesCreateFieldInput>>;
};

/**
 * Fields to sort Applications by. The order in which sorts are applied is not
 * guaranteed when specifying many fields in one ApplicationSort object.
 */
export type ApplicationSort = {
  _id?: InputMaybe<SortDirection>;
  name?: InputMaybe<SortDirection>;
};

export type ApplicationUpdateInput = {
  devices?: InputMaybe<Array<ApplicationDevicesUpdateFieldInput>>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type ApplicationWhere = {
  AND?: InputMaybe<Array<ApplicationWhere>>;
  NOT?: InputMaybe<ApplicationWhere>;
  OR?: InputMaybe<Array<ApplicationWhere>>;
  _id?: InputMaybe<Scalars['ID']['input']>;
  _id_CONTAINS?: InputMaybe<Scalars['ID']['input']>;
  _id_ENDS_WITH?: InputMaybe<Scalars['ID']['input']>;
  _id_IN?: InputMaybe<Array<Scalars['ID']['input']>>;
  _id_STARTS_WITH?: InputMaybe<Scalars['ID']['input']>;
  devicesAggregate?: InputMaybe<ApplicationDevicesAggregateInput>;
  /** Return Applications where all of the related ApplicationDevicesConnections match this filter */
  devicesConnection_ALL?: InputMaybe<ApplicationDevicesConnectionWhere>;
  /** Return Applications where none of the related ApplicationDevicesConnections match this filter */
  devicesConnection_NONE?: InputMaybe<ApplicationDevicesConnectionWhere>;
  /** Return Applications where one of the related ApplicationDevicesConnections match this filter */
  devicesConnection_SINGLE?: InputMaybe<ApplicationDevicesConnectionWhere>;
  /** Return Applications where some of the related ApplicationDevicesConnections match this filter */
  devicesConnection_SOME?: InputMaybe<ApplicationDevicesConnectionWhere>;
  /** Return Applications where all of the related Devices match this filter */
  devices_ALL?: InputMaybe<DeviceWhere>;
  /** Return Applications where none of the related Devices match this filter */
  devices_NONE?: InputMaybe<DeviceWhere>;
  /** Return Applications where one of the related Devices match this filter */
  devices_SINGLE?: InputMaybe<DeviceWhere>;
  /** Return Applications where some of the related Devices match this filter */
  devices_SOME?: InputMaybe<DeviceWhere>;
  name?: InputMaybe<Scalars['String']['input']>;
  name_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  name_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  name_IN?: InputMaybe<Array<Scalars['String']['input']>>;
  name_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
};

export type ApplicationsConnection = {
  __typename?: 'ApplicationsConnection';
  edges: Array<ApplicationEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type Cve = {
  __typename?: 'CVE';
  _id: Scalars['ID']['output'];
  cpe_type: Array<Maybe<Scalars['String']['output']>>;
  cve_id: Scalars['String']['output'];
  cvss_v2?: Maybe<CvsSv2>;
  cvss_v2Aggregate?: Maybe<CvecvsSv2Cvss_V2AggregationSelection>;
  cvss_v2Connection: CveCvss_V2Connection;
  cvss_v30?: Maybe<CvsSv30>;
  cvss_v30Aggregate?: Maybe<CvecvsSv30Cvss_V30AggregationSelection>;
  cvss_v30Connection: CveCvss_V30Connection;
  cvss_v31?: Maybe<CvsSv31>;
  cvss_v31Aggregate?: Maybe<CvecvsSv31Cvss_V31AggregationSelection>;
  cvss_v31Connection: CveCvss_V31Connection;
  cvss_v40?: Maybe<CvsSv40>;
  cvss_v40Aggregate?: Maybe<CvecvsSv40Cvss_V40AggregationSelection>;
  cvss_v40Connection: CveCvss_V40Connection;
  cwe?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  description: Scalars['String']['output'];
  last_modified: Scalars['String']['output'];
  published: Scalars['String']['output'];
  ref_tags?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  result_impacts?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  vulnerability: Vulnerability;
  vulnerabilityAggregate?: Maybe<CveVulnerabilityVulnerabilityAggregationSelection>;
  vulnerabilityConnection: CveVulnerabilityConnection;
};

export type CveCvss_V2Args = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  options?: InputMaybe<CvsSv2Options>;
  where?: InputMaybe<CvsSv2Where>;
};

export type CveCvss_V2AggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<CvsSv2Where>;
};

export type CveCvss_V2ConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<CveCvss_V2ConnectionSort>>;
  where?: InputMaybe<CveCvss_V2ConnectionWhere>;
};

export type CveCvss_V30Args = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  options?: InputMaybe<CvsSv30Options>;
  where?: InputMaybe<CvsSv30Where>;
};

export type CveCvss_V30AggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<CvsSv30Where>;
};

export type CveCvss_V30ConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<CveCvss_V30ConnectionSort>>;
  where?: InputMaybe<CveCvss_V30ConnectionWhere>;
};

export type CveCvss_V31Args = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  options?: InputMaybe<CvsSv31Options>;
  where?: InputMaybe<CvsSv31Where>;
};

export type CveCvss_V31AggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<CvsSv31Where>;
};

export type CveCvss_V31ConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<CveCvss_V31ConnectionSort>>;
  where?: InputMaybe<CveCvss_V31ConnectionWhere>;
};

export type CveCvss_V40Args = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  options?: InputMaybe<CvsSv40Options>;
  where?: InputMaybe<CvsSv40Where>;
};

export type CveCvss_V40AggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<CvsSv40Where>;
};

export type CveCvss_V40ConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<CveCvss_V40ConnectionSort>>;
  where?: InputMaybe<CveCvss_V40ConnectionWhere>;
};

export type CveVulnerabilityArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  options?: InputMaybe<VulnerabilityOptions>;
  where?: InputMaybe<VulnerabilityWhere>;
};

export type CveVulnerabilityAggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<VulnerabilityWhere>;
};

export type CveVulnerabilityConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<CveVulnerabilityConnectionSort>>;
  where?: InputMaybe<CveVulnerabilityConnectionWhere>;
};

export type CveAggregateSelection = {
  __typename?: 'CVEAggregateSelection';
  count: Scalars['Int']['output'];
  cve_id: StringAggregateSelection;
  description: StringAggregateSelection;
  last_modified: StringAggregateSelection;
  published: StringAggregateSelection;
};

export type CvecvsSv2Cvss_V2AggregationSelection = {
  __typename?: 'CVECVSSv2Cvss_v2AggregationSelection';
  count: Scalars['Int']['output'];
  node?: Maybe<CvecvsSv2Cvss_V2NodeAggregateSelection>;
};

export type CvecvsSv2Cvss_V2NodeAggregateSelection = {
  __typename?: 'CVECVSSv2Cvss_v2NodeAggregateSelection';
  access_complexity: StringAggregateSelection;
  access_vector: StringAggregateSelection;
  authentication: StringAggregateSelection;
  availability_impact: StringAggregateSelection;
  base_score: FloatAggregateSelection;
  base_severity: StringAggregateSelection;
  confidentiality_impact: StringAggregateSelection;
  exploitability_score: FloatAggregateSelection;
  impact_score: FloatAggregateSelection;
  integrity_impact: StringAggregateSelection;
  vector_string: StringAggregateSelection;
};

export type CvecvsSv30Cvss_V30AggregationSelection = {
  __typename?: 'CVECVSSv30Cvss_v30AggregationSelection';
  count: Scalars['Int']['output'];
  node?: Maybe<CvecvsSv30Cvss_V30NodeAggregateSelection>;
};

export type CvecvsSv30Cvss_V30NodeAggregateSelection = {
  __typename?: 'CVECVSSv30Cvss_v30NodeAggregateSelection';
  attack_complexity: StringAggregateSelection;
  attack_vector: StringAggregateSelection;
  availability_impact: StringAggregateSelection;
  base_score: FloatAggregateSelection;
  base_severity: StringAggregateSelection;
  confidentiality_impact: StringAggregateSelection;
  exploitability_score: FloatAggregateSelection;
  impact_score: FloatAggregateSelection;
  integrity_impact: StringAggregateSelection;
  privileges_required: StringAggregateSelection;
  scope: StringAggregateSelection;
  user_interaction: StringAggregateSelection;
  vector_string: StringAggregateSelection;
};

export type CvecvsSv31Cvss_V31AggregationSelection = {
  __typename?: 'CVECVSSv31Cvss_v31AggregationSelection';
  count: Scalars['Int']['output'];
  node?: Maybe<CvecvsSv31Cvss_V31NodeAggregateSelection>;
};

export type CvecvsSv31Cvss_V31NodeAggregateSelection = {
  __typename?: 'CVECVSSv31Cvss_v31NodeAggregateSelection';
  attack_complexity: StringAggregateSelection;
  attack_vector: StringAggregateSelection;
  availability_impact: StringAggregateSelection;
  base_score: FloatAggregateSelection;
  base_severity: StringAggregateSelection;
  confidentiality_impact: StringAggregateSelection;
  exploitability_score: FloatAggregateSelection;
  impact_score: FloatAggregateSelection;
  integrity_impact: StringAggregateSelection;
  privileges_required: StringAggregateSelection;
  scope: StringAggregateSelection;
  user_interaction: StringAggregateSelection;
  vector_string: StringAggregateSelection;
};

export type CvecvsSv40Cvss_V40AggregationSelection = {
  __typename?: 'CVECVSSv40Cvss_v40AggregationSelection';
  count: Scalars['Int']['output'];
  node?: Maybe<CvecvsSv40Cvss_V40NodeAggregateSelection>;
};

export type CvecvsSv40Cvss_V40NodeAggregateSelection = {
  __typename?: 'CVECVSSv40Cvss_v40NodeAggregateSelection';
  attack_complexity: StringAggregateSelection;
  attack_requirements: StringAggregateSelection;
  attack_vector: StringAggregateSelection;
  base_score: FloatAggregateSelection;
  base_severity: StringAggregateSelection;
  exploit_maturity: StringAggregateSelection;
  privileges_required: StringAggregateSelection;
  subsequent_system_availability: StringAggregateSelection;
  subsequent_system_confidentiality: StringAggregateSelection;
  subsequent_system_integrity: StringAggregateSelection;
  user_interaction: StringAggregateSelection;
  vector_string: StringAggregateSelection;
  vulnerable_system_availability: StringAggregateSelection;
  vulnerable_system_confidentiality: StringAggregateSelection;
  vulnerable_system_integrity: StringAggregateSelection;
};

export type CveConnectInput = {
  cvss_v2?: InputMaybe<CveCvss_V2ConnectFieldInput>;
  cvss_v30?: InputMaybe<CveCvss_V30ConnectFieldInput>;
  cvss_v31?: InputMaybe<CveCvss_V31ConnectFieldInput>;
  cvss_v40?: InputMaybe<CveCvss_V40ConnectFieldInput>;
  vulnerability?: InputMaybe<CveVulnerabilityConnectFieldInput>;
};

export type CveConnectWhere = {
  node: CveWhere;
};

export type CveCreateInput = {
  cpe_type: Array<InputMaybe<Scalars['String']['input']>>;
  cve_id: Scalars['String']['input'];
  cvss_v2?: InputMaybe<CveCvss_V2FieldInput>;
  cvss_v30?: InputMaybe<CveCvss_V30FieldInput>;
  cvss_v31?: InputMaybe<CveCvss_V31FieldInput>;
  cvss_v40?: InputMaybe<CveCvss_V40FieldInput>;
  cwe?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  description: Scalars['String']['input'];
  last_modified: Scalars['String']['input'];
  published: Scalars['String']['input'];
  ref_tags?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  result_impacts?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  vulnerability?: InputMaybe<CveVulnerabilityFieldInput>;
};

export type CveCvss_V2AggregateInput = {
  AND?: InputMaybe<Array<CveCvss_V2AggregateInput>>;
  NOT?: InputMaybe<CveCvss_V2AggregateInput>;
  OR?: InputMaybe<Array<CveCvss_V2AggregateInput>>;
  count?: InputMaybe<Scalars['Int']['input']>;
  count_GT?: InputMaybe<Scalars['Int']['input']>;
  count_GTE?: InputMaybe<Scalars['Int']['input']>;
  count_LT?: InputMaybe<Scalars['Int']['input']>;
  count_LTE?: InputMaybe<Scalars['Int']['input']>;
  node?: InputMaybe<CveCvss_V2NodeAggregationWhereInput>;
};

export type CveCvss_V2ConnectFieldInput = {
  /** Whether or not to overwrite any matching relationship with the new properties. */
  overwrite?: Scalars['Boolean']['input'];
  where?: InputMaybe<CvsSv2ConnectWhere>;
};

export type CveCvss_V2Connection = {
  __typename?: 'CVECvss_v2Connection';
  edges: Array<CveCvss_V2Relationship>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type CveCvss_V2ConnectionSort = {
  node?: InputMaybe<CvsSv2Sort>;
};

export type CveCvss_V2ConnectionWhere = {
  AND?: InputMaybe<Array<CveCvss_V2ConnectionWhere>>;
  NOT?: InputMaybe<CveCvss_V2ConnectionWhere>;
  OR?: InputMaybe<Array<CveCvss_V2ConnectionWhere>>;
  node?: InputMaybe<CvsSv2Where>;
};

export type CveCvss_V2CreateFieldInput = {
  node: CvsSv2CreateInput;
};

export type CveCvss_V2DeleteFieldInput = {
  where?: InputMaybe<CveCvss_V2ConnectionWhere>;
};

export type CveCvss_V2DisconnectFieldInput = {
  where?: InputMaybe<CveCvss_V2ConnectionWhere>;
};

export type CveCvss_V2FieldInput = {
  connect?: InputMaybe<CveCvss_V2ConnectFieldInput>;
  create?: InputMaybe<CveCvss_V2CreateFieldInput>;
};

export type CveCvss_V2NodeAggregationWhereInput = {
  AND?: InputMaybe<Array<CveCvss_V2NodeAggregationWhereInput>>;
  NOT?: InputMaybe<CveCvss_V2NodeAggregationWhereInput>;
  OR?: InputMaybe<Array<CveCvss_V2NodeAggregationWhereInput>>;
  access_complexity_AVERAGE_LENGTH_EQUAL?: InputMaybe<
    Scalars['Float']['input']
  >;
  access_complexity_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  access_complexity_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  access_complexity_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  access_complexity_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  access_complexity_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  access_complexity_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  access_complexity_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  access_complexity_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  access_complexity_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  access_complexity_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  access_complexity_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  access_complexity_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  access_complexity_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  access_complexity_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  access_vector_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  access_vector_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  access_vector_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  access_vector_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  access_vector_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  access_vector_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  access_vector_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  access_vector_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  access_vector_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  access_vector_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  access_vector_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  access_vector_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  access_vector_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  access_vector_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  access_vector_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  authentication_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  authentication_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  authentication_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  authentication_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  authentication_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  authentication_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  authentication_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  authentication_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  authentication_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  authentication_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  authentication_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  authentication_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  authentication_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  authentication_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  authentication_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  availability_impact_AVERAGE_LENGTH_EQUAL?: InputMaybe<
    Scalars['Float']['input']
  >;
  availability_impact_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  availability_impact_AVERAGE_LENGTH_GTE?: InputMaybe<
    Scalars['Float']['input']
  >;
  availability_impact_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  availability_impact_AVERAGE_LENGTH_LTE?: InputMaybe<
    Scalars['Float']['input']
  >;
  availability_impact_LONGEST_LENGTH_EQUAL?: InputMaybe<
    Scalars['Int']['input']
  >;
  availability_impact_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  availability_impact_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  availability_impact_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  availability_impact_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  availability_impact_SHORTEST_LENGTH_EQUAL?: InputMaybe<
    Scalars['Int']['input']
  >;
  availability_impact_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  availability_impact_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  availability_impact_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  availability_impact_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  base_score_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  base_score_AVERAGE_GT?: InputMaybe<Scalars['Float']['input']>;
  base_score_AVERAGE_GTE?: InputMaybe<Scalars['Float']['input']>;
  base_score_AVERAGE_LT?: InputMaybe<Scalars['Float']['input']>;
  base_score_AVERAGE_LTE?: InputMaybe<Scalars['Float']['input']>;
  base_score_MAX_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  base_score_MAX_GT?: InputMaybe<Scalars['Float']['input']>;
  base_score_MAX_GTE?: InputMaybe<Scalars['Float']['input']>;
  base_score_MAX_LT?: InputMaybe<Scalars['Float']['input']>;
  base_score_MAX_LTE?: InputMaybe<Scalars['Float']['input']>;
  base_score_MIN_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  base_score_MIN_GT?: InputMaybe<Scalars['Float']['input']>;
  base_score_MIN_GTE?: InputMaybe<Scalars['Float']['input']>;
  base_score_MIN_LT?: InputMaybe<Scalars['Float']['input']>;
  base_score_MIN_LTE?: InputMaybe<Scalars['Float']['input']>;
  base_score_SUM_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  base_score_SUM_GT?: InputMaybe<Scalars['Float']['input']>;
  base_score_SUM_GTE?: InputMaybe<Scalars['Float']['input']>;
  base_score_SUM_LT?: InputMaybe<Scalars['Float']['input']>;
  base_score_SUM_LTE?: InputMaybe<Scalars['Float']['input']>;
  base_severity_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  base_severity_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  base_severity_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  base_severity_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  base_severity_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  base_severity_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  base_severity_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  base_severity_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  base_severity_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  base_severity_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  base_severity_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  base_severity_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  base_severity_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  base_severity_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  base_severity_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  confidentiality_impact_AVERAGE_LENGTH_EQUAL?: InputMaybe<
    Scalars['Float']['input']
  >;
  confidentiality_impact_AVERAGE_LENGTH_GT?: InputMaybe<
    Scalars['Float']['input']
  >;
  confidentiality_impact_AVERAGE_LENGTH_GTE?: InputMaybe<
    Scalars['Float']['input']
  >;
  confidentiality_impact_AVERAGE_LENGTH_LT?: InputMaybe<
    Scalars['Float']['input']
  >;
  confidentiality_impact_AVERAGE_LENGTH_LTE?: InputMaybe<
    Scalars['Float']['input']
  >;
  confidentiality_impact_LONGEST_LENGTH_EQUAL?: InputMaybe<
    Scalars['Int']['input']
  >;
  confidentiality_impact_LONGEST_LENGTH_GT?: InputMaybe<
    Scalars['Int']['input']
  >;
  confidentiality_impact_LONGEST_LENGTH_GTE?: InputMaybe<
    Scalars['Int']['input']
  >;
  confidentiality_impact_LONGEST_LENGTH_LT?: InputMaybe<
    Scalars['Int']['input']
  >;
  confidentiality_impact_LONGEST_LENGTH_LTE?: InputMaybe<
    Scalars['Int']['input']
  >;
  confidentiality_impact_SHORTEST_LENGTH_EQUAL?: InputMaybe<
    Scalars['Int']['input']
  >;
  confidentiality_impact_SHORTEST_LENGTH_GT?: InputMaybe<
    Scalars['Int']['input']
  >;
  confidentiality_impact_SHORTEST_LENGTH_GTE?: InputMaybe<
    Scalars['Int']['input']
  >;
  confidentiality_impact_SHORTEST_LENGTH_LT?: InputMaybe<
    Scalars['Int']['input']
  >;
  confidentiality_impact_SHORTEST_LENGTH_LTE?: InputMaybe<
    Scalars['Int']['input']
  >;
  exploitability_score_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  exploitability_score_AVERAGE_GT?: InputMaybe<Scalars['Float']['input']>;
  exploitability_score_AVERAGE_GTE?: InputMaybe<Scalars['Float']['input']>;
  exploitability_score_AVERAGE_LT?: InputMaybe<Scalars['Float']['input']>;
  exploitability_score_AVERAGE_LTE?: InputMaybe<Scalars['Float']['input']>;
  exploitability_score_MAX_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  exploitability_score_MAX_GT?: InputMaybe<Scalars['Float']['input']>;
  exploitability_score_MAX_GTE?: InputMaybe<Scalars['Float']['input']>;
  exploitability_score_MAX_LT?: InputMaybe<Scalars['Float']['input']>;
  exploitability_score_MAX_LTE?: InputMaybe<Scalars['Float']['input']>;
  exploitability_score_MIN_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  exploitability_score_MIN_GT?: InputMaybe<Scalars['Float']['input']>;
  exploitability_score_MIN_GTE?: InputMaybe<Scalars['Float']['input']>;
  exploitability_score_MIN_LT?: InputMaybe<Scalars['Float']['input']>;
  exploitability_score_MIN_LTE?: InputMaybe<Scalars['Float']['input']>;
  exploitability_score_SUM_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  exploitability_score_SUM_GT?: InputMaybe<Scalars['Float']['input']>;
  exploitability_score_SUM_GTE?: InputMaybe<Scalars['Float']['input']>;
  exploitability_score_SUM_LT?: InputMaybe<Scalars['Float']['input']>;
  exploitability_score_SUM_LTE?: InputMaybe<Scalars['Float']['input']>;
  impact_score_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  impact_score_AVERAGE_GT?: InputMaybe<Scalars['Float']['input']>;
  impact_score_AVERAGE_GTE?: InputMaybe<Scalars['Float']['input']>;
  impact_score_AVERAGE_LT?: InputMaybe<Scalars['Float']['input']>;
  impact_score_AVERAGE_LTE?: InputMaybe<Scalars['Float']['input']>;
  impact_score_MAX_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  impact_score_MAX_GT?: InputMaybe<Scalars['Float']['input']>;
  impact_score_MAX_GTE?: InputMaybe<Scalars['Float']['input']>;
  impact_score_MAX_LT?: InputMaybe<Scalars['Float']['input']>;
  impact_score_MAX_LTE?: InputMaybe<Scalars['Float']['input']>;
  impact_score_MIN_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  impact_score_MIN_GT?: InputMaybe<Scalars['Float']['input']>;
  impact_score_MIN_GTE?: InputMaybe<Scalars['Float']['input']>;
  impact_score_MIN_LT?: InputMaybe<Scalars['Float']['input']>;
  impact_score_MIN_LTE?: InputMaybe<Scalars['Float']['input']>;
  impact_score_SUM_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  impact_score_SUM_GT?: InputMaybe<Scalars['Float']['input']>;
  impact_score_SUM_GTE?: InputMaybe<Scalars['Float']['input']>;
  impact_score_SUM_LT?: InputMaybe<Scalars['Float']['input']>;
  impact_score_SUM_LTE?: InputMaybe<Scalars['Float']['input']>;
  integrity_impact_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  integrity_impact_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  integrity_impact_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  integrity_impact_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  integrity_impact_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  integrity_impact_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  integrity_impact_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  integrity_impact_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  integrity_impact_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  integrity_impact_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  integrity_impact_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  integrity_impact_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  integrity_impact_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  integrity_impact_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  integrity_impact_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  vector_string_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  vector_string_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  vector_string_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  vector_string_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  vector_string_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  vector_string_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  vector_string_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  vector_string_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  vector_string_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  vector_string_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  vector_string_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  vector_string_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  vector_string_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  vector_string_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  vector_string_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
};

export type CveCvss_V2Relationship = {
  __typename?: 'CVECvss_v2Relationship';
  cursor: Scalars['String']['output'];
  node: CvsSv2;
};

export type CveCvss_V2UpdateConnectionInput = {
  node?: InputMaybe<CvsSv2UpdateInput>;
};

export type CveCvss_V2UpdateFieldInput = {
  connect?: InputMaybe<CveCvss_V2ConnectFieldInput>;
  create?: InputMaybe<CveCvss_V2CreateFieldInput>;
  delete?: InputMaybe<CveCvss_V2DeleteFieldInput>;
  disconnect?: InputMaybe<CveCvss_V2DisconnectFieldInput>;
  update?: InputMaybe<CveCvss_V2UpdateConnectionInput>;
  where?: InputMaybe<CveCvss_V2ConnectionWhere>;
};

export type CveCvss_V30AggregateInput = {
  AND?: InputMaybe<Array<CveCvss_V30AggregateInput>>;
  NOT?: InputMaybe<CveCvss_V30AggregateInput>;
  OR?: InputMaybe<Array<CveCvss_V30AggregateInput>>;
  count?: InputMaybe<Scalars['Int']['input']>;
  count_GT?: InputMaybe<Scalars['Int']['input']>;
  count_GTE?: InputMaybe<Scalars['Int']['input']>;
  count_LT?: InputMaybe<Scalars['Int']['input']>;
  count_LTE?: InputMaybe<Scalars['Int']['input']>;
  node?: InputMaybe<CveCvss_V30NodeAggregationWhereInput>;
};

export type CveCvss_V30ConnectFieldInput = {
  /** Whether or not to overwrite any matching relationship with the new properties. */
  overwrite?: Scalars['Boolean']['input'];
  where?: InputMaybe<CvsSv30ConnectWhere>;
};

export type CveCvss_V30Connection = {
  __typename?: 'CVECvss_v30Connection';
  edges: Array<CveCvss_V30Relationship>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type CveCvss_V30ConnectionSort = {
  node?: InputMaybe<CvsSv30Sort>;
};

export type CveCvss_V30ConnectionWhere = {
  AND?: InputMaybe<Array<CveCvss_V30ConnectionWhere>>;
  NOT?: InputMaybe<CveCvss_V30ConnectionWhere>;
  OR?: InputMaybe<Array<CveCvss_V30ConnectionWhere>>;
  node?: InputMaybe<CvsSv30Where>;
};

export type CveCvss_V30CreateFieldInput = {
  node: CvsSv30CreateInput;
};

export type CveCvss_V30DeleteFieldInput = {
  where?: InputMaybe<CveCvss_V30ConnectionWhere>;
};

export type CveCvss_V30DisconnectFieldInput = {
  where?: InputMaybe<CveCvss_V30ConnectionWhere>;
};

export type CveCvss_V30FieldInput = {
  connect?: InputMaybe<CveCvss_V30ConnectFieldInput>;
  create?: InputMaybe<CveCvss_V30CreateFieldInput>;
};

export type CveCvss_V30NodeAggregationWhereInput = {
  AND?: InputMaybe<Array<CveCvss_V30NodeAggregationWhereInput>>;
  NOT?: InputMaybe<CveCvss_V30NodeAggregationWhereInput>;
  OR?: InputMaybe<Array<CveCvss_V30NodeAggregationWhereInput>>;
  attack_complexity_AVERAGE_LENGTH_EQUAL?: InputMaybe<
    Scalars['Float']['input']
  >;
  attack_complexity_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  attack_complexity_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  attack_complexity_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  attack_complexity_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  attack_complexity_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  attack_complexity_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  attack_complexity_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  attack_complexity_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  attack_complexity_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  attack_complexity_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  attack_complexity_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  attack_complexity_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  attack_complexity_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  attack_complexity_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  attack_vector_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  attack_vector_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  attack_vector_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  attack_vector_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  attack_vector_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  attack_vector_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  attack_vector_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  attack_vector_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  attack_vector_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  attack_vector_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  attack_vector_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  attack_vector_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  attack_vector_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  attack_vector_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  attack_vector_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  availability_impact_AVERAGE_LENGTH_EQUAL?: InputMaybe<
    Scalars['Float']['input']
  >;
  availability_impact_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  availability_impact_AVERAGE_LENGTH_GTE?: InputMaybe<
    Scalars['Float']['input']
  >;
  availability_impact_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  availability_impact_AVERAGE_LENGTH_LTE?: InputMaybe<
    Scalars['Float']['input']
  >;
  availability_impact_LONGEST_LENGTH_EQUAL?: InputMaybe<
    Scalars['Int']['input']
  >;
  availability_impact_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  availability_impact_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  availability_impact_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  availability_impact_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  availability_impact_SHORTEST_LENGTH_EQUAL?: InputMaybe<
    Scalars['Int']['input']
  >;
  availability_impact_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  availability_impact_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  availability_impact_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  availability_impact_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  base_score_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  base_score_AVERAGE_GT?: InputMaybe<Scalars['Float']['input']>;
  base_score_AVERAGE_GTE?: InputMaybe<Scalars['Float']['input']>;
  base_score_AVERAGE_LT?: InputMaybe<Scalars['Float']['input']>;
  base_score_AVERAGE_LTE?: InputMaybe<Scalars['Float']['input']>;
  base_score_MAX_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  base_score_MAX_GT?: InputMaybe<Scalars['Float']['input']>;
  base_score_MAX_GTE?: InputMaybe<Scalars['Float']['input']>;
  base_score_MAX_LT?: InputMaybe<Scalars['Float']['input']>;
  base_score_MAX_LTE?: InputMaybe<Scalars['Float']['input']>;
  base_score_MIN_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  base_score_MIN_GT?: InputMaybe<Scalars['Float']['input']>;
  base_score_MIN_GTE?: InputMaybe<Scalars['Float']['input']>;
  base_score_MIN_LT?: InputMaybe<Scalars['Float']['input']>;
  base_score_MIN_LTE?: InputMaybe<Scalars['Float']['input']>;
  base_score_SUM_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  base_score_SUM_GT?: InputMaybe<Scalars['Float']['input']>;
  base_score_SUM_GTE?: InputMaybe<Scalars['Float']['input']>;
  base_score_SUM_LT?: InputMaybe<Scalars['Float']['input']>;
  base_score_SUM_LTE?: InputMaybe<Scalars['Float']['input']>;
  base_severity_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  base_severity_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  base_severity_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  base_severity_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  base_severity_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  base_severity_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  base_severity_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  base_severity_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  base_severity_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  base_severity_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  base_severity_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  base_severity_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  base_severity_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  base_severity_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  base_severity_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  confidentiality_impact_AVERAGE_LENGTH_EQUAL?: InputMaybe<
    Scalars['Float']['input']
  >;
  confidentiality_impact_AVERAGE_LENGTH_GT?: InputMaybe<
    Scalars['Float']['input']
  >;
  confidentiality_impact_AVERAGE_LENGTH_GTE?: InputMaybe<
    Scalars['Float']['input']
  >;
  confidentiality_impact_AVERAGE_LENGTH_LT?: InputMaybe<
    Scalars['Float']['input']
  >;
  confidentiality_impact_AVERAGE_LENGTH_LTE?: InputMaybe<
    Scalars['Float']['input']
  >;
  confidentiality_impact_LONGEST_LENGTH_EQUAL?: InputMaybe<
    Scalars['Int']['input']
  >;
  confidentiality_impact_LONGEST_LENGTH_GT?: InputMaybe<
    Scalars['Int']['input']
  >;
  confidentiality_impact_LONGEST_LENGTH_GTE?: InputMaybe<
    Scalars['Int']['input']
  >;
  confidentiality_impact_LONGEST_LENGTH_LT?: InputMaybe<
    Scalars['Int']['input']
  >;
  confidentiality_impact_LONGEST_LENGTH_LTE?: InputMaybe<
    Scalars['Int']['input']
  >;
  confidentiality_impact_SHORTEST_LENGTH_EQUAL?: InputMaybe<
    Scalars['Int']['input']
  >;
  confidentiality_impact_SHORTEST_LENGTH_GT?: InputMaybe<
    Scalars['Int']['input']
  >;
  confidentiality_impact_SHORTEST_LENGTH_GTE?: InputMaybe<
    Scalars['Int']['input']
  >;
  confidentiality_impact_SHORTEST_LENGTH_LT?: InputMaybe<
    Scalars['Int']['input']
  >;
  confidentiality_impact_SHORTEST_LENGTH_LTE?: InputMaybe<
    Scalars['Int']['input']
  >;
  exploitability_score_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  exploitability_score_AVERAGE_GT?: InputMaybe<Scalars['Float']['input']>;
  exploitability_score_AVERAGE_GTE?: InputMaybe<Scalars['Float']['input']>;
  exploitability_score_AVERAGE_LT?: InputMaybe<Scalars['Float']['input']>;
  exploitability_score_AVERAGE_LTE?: InputMaybe<Scalars['Float']['input']>;
  exploitability_score_MAX_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  exploitability_score_MAX_GT?: InputMaybe<Scalars['Float']['input']>;
  exploitability_score_MAX_GTE?: InputMaybe<Scalars['Float']['input']>;
  exploitability_score_MAX_LT?: InputMaybe<Scalars['Float']['input']>;
  exploitability_score_MAX_LTE?: InputMaybe<Scalars['Float']['input']>;
  exploitability_score_MIN_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  exploitability_score_MIN_GT?: InputMaybe<Scalars['Float']['input']>;
  exploitability_score_MIN_GTE?: InputMaybe<Scalars['Float']['input']>;
  exploitability_score_MIN_LT?: InputMaybe<Scalars['Float']['input']>;
  exploitability_score_MIN_LTE?: InputMaybe<Scalars['Float']['input']>;
  exploitability_score_SUM_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  exploitability_score_SUM_GT?: InputMaybe<Scalars['Float']['input']>;
  exploitability_score_SUM_GTE?: InputMaybe<Scalars['Float']['input']>;
  exploitability_score_SUM_LT?: InputMaybe<Scalars['Float']['input']>;
  exploitability_score_SUM_LTE?: InputMaybe<Scalars['Float']['input']>;
  impact_score_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  impact_score_AVERAGE_GT?: InputMaybe<Scalars['Float']['input']>;
  impact_score_AVERAGE_GTE?: InputMaybe<Scalars['Float']['input']>;
  impact_score_AVERAGE_LT?: InputMaybe<Scalars['Float']['input']>;
  impact_score_AVERAGE_LTE?: InputMaybe<Scalars['Float']['input']>;
  impact_score_MAX_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  impact_score_MAX_GT?: InputMaybe<Scalars['Float']['input']>;
  impact_score_MAX_GTE?: InputMaybe<Scalars['Float']['input']>;
  impact_score_MAX_LT?: InputMaybe<Scalars['Float']['input']>;
  impact_score_MAX_LTE?: InputMaybe<Scalars['Float']['input']>;
  impact_score_MIN_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  impact_score_MIN_GT?: InputMaybe<Scalars['Float']['input']>;
  impact_score_MIN_GTE?: InputMaybe<Scalars['Float']['input']>;
  impact_score_MIN_LT?: InputMaybe<Scalars['Float']['input']>;
  impact_score_MIN_LTE?: InputMaybe<Scalars['Float']['input']>;
  impact_score_SUM_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  impact_score_SUM_GT?: InputMaybe<Scalars['Float']['input']>;
  impact_score_SUM_GTE?: InputMaybe<Scalars['Float']['input']>;
  impact_score_SUM_LT?: InputMaybe<Scalars['Float']['input']>;
  impact_score_SUM_LTE?: InputMaybe<Scalars['Float']['input']>;
  integrity_impact_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  integrity_impact_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  integrity_impact_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  integrity_impact_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  integrity_impact_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  integrity_impact_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  integrity_impact_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  integrity_impact_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  integrity_impact_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  integrity_impact_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  integrity_impact_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  integrity_impact_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  integrity_impact_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  integrity_impact_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  integrity_impact_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  privileges_required_AVERAGE_LENGTH_EQUAL?: InputMaybe<
    Scalars['Float']['input']
  >;
  privileges_required_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  privileges_required_AVERAGE_LENGTH_GTE?: InputMaybe<
    Scalars['Float']['input']
  >;
  privileges_required_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  privileges_required_AVERAGE_LENGTH_LTE?: InputMaybe<
    Scalars['Float']['input']
  >;
  privileges_required_LONGEST_LENGTH_EQUAL?: InputMaybe<
    Scalars['Int']['input']
  >;
  privileges_required_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  privileges_required_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  privileges_required_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  privileges_required_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  privileges_required_SHORTEST_LENGTH_EQUAL?: InputMaybe<
    Scalars['Int']['input']
  >;
  privileges_required_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  privileges_required_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  privileges_required_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  privileges_required_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  scope_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  scope_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  scope_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  scope_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  scope_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  scope_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  scope_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  scope_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  scope_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  scope_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  scope_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  scope_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  scope_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  scope_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  scope_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  user_interaction_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  user_interaction_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  user_interaction_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  user_interaction_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  user_interaction_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  user_interaction_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  user_interaction_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  user_interaction_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  user_interaction_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  user_interaction_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  user_interaction_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  user_interaction_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  user_interaction_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  user_interaction_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  user_interaction_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  vector_string_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  vector_string_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  vector_string_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  vector_string_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  vector_string_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  vector_string_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  vector_string_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  vector_string_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  vector_string_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  vector_string_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  vector_string_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  vector_string_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  vector_string_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  vector_string_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  vector_string_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
};

export type CveCvss_V30Relationship = {
  __typename?: 'CVECvss_v30Relationship';
  cursor: Scalars['String']['output'];
  node: CvsSv30;
};

export type CveCvss_V30UpdateConnectionInput = {
  node?: InputMaybe<CvsSv30UpdateInput>;
};

export type CveCvss_V30UpdateFieldInput = {
  connect?: InputMaybe<CveCvss_V30ConnectFieldInput>;
  create?: InputMaybe<CveCvss_V30CreateFieldInput>;
  delete?: InputMaybe<CveCvss_V30DeleteFieldInput>;
  disconnect?: InputMaybe<CveCvss_V30DisconnectFieldInput>;
  update?: InputMaybe<CveCvss_V30UpdateConnectionInput>;
  where?: InputMaybe<CveCvss_V30ConnectionWhere>;
};

export type CveCvss_V31AggregateInput = {
  AND?: InputMaybe<Array<CveCvss_V31AggregateInput>>;
  NOT?: InputMaybe<CveCvss_V31AggregateInput>;
  OR?: InputMaybe<Array<CveCvss_V31AggregateInput>>;
  count?: InputMaybe<Scalars['Int']['input']>;
  count_GT?: InputMaybe<Scalars['Int']['input']>;
  count_GTE?: InputMaybe<Scalars['Int']['input']>;
  count_LT?: InputMaybe<Scalars['Int']['input']>;
  count_LTE?: InputMaybe<Scalars['Int']['input']>;
  node?: InputMaybe<CveCvss_V31NodeAggregationWhereInput>;
};

export type CveCvss_V31ConnectFieldInput = {
  /** Whether or not to overwrite any matching relationship with the new properties. */
  overwrite?: Scalars['Boolean']['input'];
  where?: InputMaybe<CvsSv31ConnectWhere>;
};

export type CveCvss_V31Connection = {
  __typename?: 'CVECvss_v31Connection';
  edges: Array<CveCvss_V31Relationship>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type CveCvss_V31ConnectionSort = {
  node?: InputMaybe<CvsSv31Sort>;
};

export type CveCvss_V31ConnectionWhere = {
  AND?: InputMaybe<Array<CveCvss_V31ConnectionWhere>>;
  NOT?: InputMaybe<CveCvss_V31ConnectionWhere>;
  OR?: InputMaybe<Array<CveCvss_V31ConnectionWhere>>;
  node?: InputMaybe<CvsSv31Where>;
};

export type CveCvss_V31CreateFieldInput = {
  node: CvsSv31CreateInput;
};

export type CveCvss_V31DeleteFieldInput = {
  where?: InputMaybe<CveCvss_V31ConnectionWhere>;
};

export type CveCvss_V31DisconnectFieldInput = {
  where?: InputMaybe<CveCvss_V31ConnectionWhere>;
};

export type CveCvss_V31FieldInput = {
  connect?: InputMaybe<CveCvss_V31ConnectFieldInput>;
  create?: InputMaybe<CveCvss_V31CreateFieldInput>;
};

export type CveCvss_V31NodeAggregationWhereInput = {
  AND?: InputMaybe<Array<CveCvss_V31NodeAggregationWhereInput>>;
  NOT?: InputMaybe<CveCvss_V31NodeAggregationWhereInput>;
  OR?: InputMaybe<Array<CveCvss_V31NodeAggregationWhereInput>>;
  attack_complexity_AVERAGE_LENGTH_EQUAL?: InputMaybe<
    Scalars['Float']['input']
  >;
  attack_complexity_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  attack_complexity_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  attack_complexity_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  attack_complexity_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  attack_complexity_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  attack_complexity_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  attack_complexity_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  attack_complexity_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  attack_complexity_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  attack_complexity_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  attack_complexity_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  attack_complexity_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  attack_complexity_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  attack_complexity_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  attack_vector_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  attack_vector_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  attack_vector_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  attack_vector_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  attack_vector_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  attack_vector_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  attack_vector_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  attack_vector_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  attack_vector_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  attack_vector_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  attack_vector_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  attack_vector_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  attack_vector_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  attack_vector_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  attack_vector_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  availability_impact_AVERAGE_LENGTH_EQUAL?: InputMaybe<
    Scalars['Float']['input']
  >;
  availability_impact_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  availability_impact_AVERAGE_LENGTH_GTE?: InputMaybe<
    Scalars['Float']['input']
  >;
  availability_impact_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  availability_impact_AVERAGE_LENGTH_LTE?: InputMaybe<
    Scalars['Float']['input']
  >;
  availability_impact_LONGEST_LENGTH_EQUAL?: InputMaybe<
    Scalars['Int']['input']
  >;
  availability_impact_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  availability_impact_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  availability_impact_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  availability_impact_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  availability_impact_SHORTEST_LENGTH_EQUAL?: InputMaybe<
    Scalars['Int']['input']
  >;
  availability_impact_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  availability_impact_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  availability_impact_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  availability_impact_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  base_score_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  base_score_AVERAGE_GT?: InputMaybe<Scalars['Float']['input']>;
  base_score_AVERAGE_GTE?: InputMaybe<Scalars['Float']['input']>;
  base_score_AVERAGE_LT?: InputMaybe<Scalars['Float']['input']>;
  base_score_AVERAGE_LTE?: InputMaybe<Scalars['Float']['input']>;
  base_score_MAX_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  base_score_MAX_GT?: InputMaybe<Scalars['Float']['input']>;
  base_score_MAX_GTE?: InputMaybe<Scalars['Float']['input']>;
  base_score_MAX_LT?: InputMaybe<Scalars['Float']['input']>;
  base_score_MAX_LTE?: InputMaybe<Scalars['Float']['input']>;
  base_score_MIN_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  base_score_MIN_GT?: InputMaybe<Scalars['Float']['input']>;
  base_score_MIN_GTE?: InputMaybe<Scalars['Float']['input']>;
  base_score_MIN_LT?: InputMaybe<Scalars['Float']['input']>;
  base_score_MIN_LTE?: InputMaybe<Scalars['Float']['input']>;
  base_score_SUM_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  base_score_SUM_GT?: InputMaybe<Scalars['Float']['input']>;
  base_score_SUM_GTE?: InputMaybe<Scalars['Float']['input']>;
  base_score_SUM_LT?: InputMaybe<Scalars['Float']['input']>;
  base_score_SUM_LTE?: InputMaybe<Scalars['Float']['input']>;
  base_severity_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  base_severity_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  base_severity_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  base_severity_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  base_severity_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  base_severity_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  base_severity_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  base_severity_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  base_severity_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  base_severity_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  base_severity_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  base_severity_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  base_severity_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  base_severity_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  base_severity_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  confidentiality_impact_AVERAGE_LENGTH_EQUAL?: InputMaybe<
    Scalars['Float']['input']
  >;
  confidentiality_impact_AVERAGE_LENGTH_GT?: InputMaybe<
    Scalars['Float']['input']
  >;
  confidentiality_impact_AVERAGE_LENGTH_GTE?: InputMaybe<
    Scalars['Float']['input']
  >;
  confidentiality_impact_AVERAGE_LENGTH_LT?: InputMaybe<
    Scalars['Float']['input']
  >;
  confidentiality_impact_AVERAGE_LENGTH_LTE?: InputMaybe<
    Scalars['Float']['input']
  >;
  confidentiality_impact_LONGEST_LENGTH_EQUAL?: InputMaybe<
    Scalars['Int']['input']
  >;
  confidentiality_impact_LONGEST_LENGTH_GT?: InputMaybe<
    Scalars['Int']['input']
  >;
  confidentiality_impact_LONGEST_LENGTH_GTE?: InputMaybe<
    Scalars['Int']['input']
  >;
  confidentiality_impact_LONGEST_LENGTH_LT?: InputMaybe<
    Scalars['Int']['input']
  >;
  confidentiality_impact_LONGEST_LENGTH_LTE?: InputMaybe<
    Scalars['Int']['input']
  >;
  confidentiality_impact_SHORTEST_LENGTH_EQUAL?: InputMaybe<
    Scalars['Int']['input']
  >;
  confidentiality_impact_SHORTEST_LENGTH_GT?: InputMaybe<
    Scalars['Int']['input']
  >;
  confidentiality_impact_SHORTEST_LENGTH_GTE?: InputMaybe<
    Scalars['Int']['input']
  >;
  confidentiality_impact_SHORTEST_LENGTH_LT?: InputMaybe<
    Scalars['Int']['input']
  >;
  confidentiality_impact_SHORTEST_LENGTH_LTE?: InputMaybe<
    Scalars['Int']['input']
  >;
  exploitability_score_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  exploitability_score_AVERAGE_GT?: InputMaybe<Scalars['Float']['input']>;
  exploitability_score_AVERAGE_GTE?: InputMaybe<Scalars['Float']['input']>;
  exploitability_score_AVERAGE_LT?: InputMaybe<Scalars['Float']['input']>;
  exploitability_score_AVERAGE_LTE?: InputMaybe<Scalars['Float']['input']>;
  exploitability_score_MAX_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  exploitability_score_MAX_GT?: InputMaybe<Scalars['Float']['input']>;
  exploitability_score_MAX_GTE?: InputMaybe<Scalars['Float']['input']>;
  exploitability_score_MAX_LT?: InputMaybe<Scalars['Float']['input']>;
  exploitability_score_MAX_LTE?: InputMaybe<Scalars['Float']['input']>;
  exploitability_score_MIN_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  exploitability_score_MIN_GT?: InputMaybe<Scalars['Float']['input']>;
  exploitability_score_MIN_GTE?: InputMaybe<Scalars['Float']['input']>;
  exploitability_score_MIN_LT?: InputMaybe<Scalars['Float']['input']>;
  exploitability_score_MIN_LTE?: InputMaybe<Scalars['Float']['input']>;
  exploitability_score_SUM_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  exploitability_score_SUM_GT?: InputMaybe<Scalars['Float']['input']>;
  exploitability_score_SUM_GTE?: InputMaybe<Scalars['Float']['input']>;
  exploitability_score_SUM_LT?: InputMaybe<Scalars['Float']['input']>;
  exploitability_score_SUM_LTE?: InputMaybe<Scalars['Float']['input']>;
  impact_score_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  impact_score_AVERAGE_GT?: InputMaybe<Scalars['Float']['input']>;
  impact_score_AVERAGE_GTE?: InputMaybe<Scalars['Float']['input']>;
  impact_score_AVERAGE_LT?: InputMaybe<Scalars['Float']['input']>;
  impact_score_AVERAGE_LTE?: InputMaybe<Scalars['Float']['input']>;
  impact_score_MAX_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  impact_score_MAX_GT?: InputMaybe<Scalars['Float']['input']>;
  impact_score_MAX_GTE?: InputMaybe<Scalars['Float']['input']>;
  impact_score_MAX_LT?: InputMaybe<Scalars['Float']['input']>;
  impact_score_MAX_LTE?: InputMaybe<Scalars['Float']['input']>;
  impact_score_MIN_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  impact_score_MIN_GT?: InputMaybe<Scalars['Float']['input']>;
  impact_score_MIN_GTE?: InputMaybe<Scalars['Float']['input']>;
  impact_score_MIN_LT?: InputMaybe<Scalars['Float']['input']>;
  impact_score_MIN_LTE?: InputMaybe<Scalars['Float']['input']>;
  impact_score_SUM_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  impact_score_SUM_GT?: InputMaybe<Scalars['Float']['input']>;
  impact_score_SUM_GTE?: InputMaybe<Scalars['Float']['input']>;
  impact_score_SUM_LT?: InputMaybe<Scalars['Float']['input']>;
  impact_score_SUM_LTE?: InputMaybe<Scalars['Float']['input']>;
  integrity_impact_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  integrity_impact_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  integrity_impact_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  integrity_impact_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  integrity_impact_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  integrity_impact_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  integrity_impact_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  integrity_impact_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  integrity_impact_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  integrity_impact_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  integrity_impact_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  integrity_impact_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  integrity_impact_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  integrity_impact_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  integrity_impact_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  privileges_required_AVERAGE_LENGTH_EQUAL?: InputMaybe<
    Scalars['Float']['input']
  >;
  privileges_required_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  privileges_required_AVERAGE_LENGTH_GTE?: InputMaybe<
    Scalars['Float']['input']
  >;
  privileges_required_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  privileges_required_AVERAGE_LENGTH_LTE?: InputMaybe<
    Scalars['Float']['input']
  >;
  privileges_required_LONGEST_LENGTH_EQUAL?: InputMaybe<
    Scalars['Int']['input']
  >;
  privileges_required_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  privileges_required_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  privileges_required_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  privileges_required_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  privileges_required_SHORTEST_LENGTH_EQUAL?: InputMaybe<
    Scalars['Int']['input']
  >;
  privileges_required_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  privileges_required_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  privileges_required_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  privileges_required_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  scope_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  scope_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  scope_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  scope_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  scope_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  scope_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  scope_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  scope_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  scope_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  scope_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  scope_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  scope_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  scope_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  scope_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  scope_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  user_interaction_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  user_interaction_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  user_interaction_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  user_interaction_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  user_interaction_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  user_interaction_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  user_interaction_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  user_interaction_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  user_interaction_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  user_interaction_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  user_interaction_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  user_interaction_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  user_interaction_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  user_interaction_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  user_interaction_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  vector_string_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  vector_string_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  vector_string_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  vector_string_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  vector_string_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  vector_string_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  vector_string_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  vector_string_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  vector_string_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  vector_string_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  vector_string_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  vector_string_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  vector_string_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  vector_string_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  vector_string_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
};

export type CveCvss_V31Relationship = {
  __typename?: 'CVECvss_v31Relationship';
  cursor: Scalars['String']['output'];
  node: CvsSv31;
};

export type CveCvss_V31UpdateConnectionInput = {
  node?: InputMaybe<CvsSv31UpdateInput>;
};

export type CveCvss_V31UpdateFieldInput = {
  connect?: InputMaybe<CveCvss_V31ConnectFieldInput>;
  create?: InputMaybe<CveCvss_V31CreateFieldInput>;
  delete?: InputMaybe<CveCvss_V31DeleteFieldInput>;
  disconnect?: InputMaybe<CveCvss_V31DisconnectFieldInput>;
  update?: InputMaybe<CveCvss_V31UpdateConnectionInput>;
  where?: InputMaybe<CveCvss_V31ConnectionWhere>;
};

export type CveCvss_V40AggregateInput = {
  AND?: InputMaybe<Array<CveCvss_V40AggregateInput>>;
  NOT?: InputMaybe<CveCvss_V40AggregateInput>;
  OR?: InputMaybe<Array<CveCvss_V40AggregateInput>>;
  count?: InputMaybe<Scalars['Int']['input']>;
  count_GT?: InputMaybe<Scalars['Int']['input']>;
  count_GTE?: InputMaybe<Scalars['Int']['input']>;
  count_LT?: InputMaybe<Scalars['Int']['input']>;
  count_LTE?: InputMaybe<Scalars['Int']['input']>;
  node?: InputMaybe<CveCvss_V40NodeAggregationWhereInput>;
};

export type CveCvss_V40ConnectFieldInput = {
  /** Whether or not to overwrite any matching relationship with the new properties. */
  overwrite?: Scalars['Boolean']['input'];
  where?: InputMaybe<CvsSv40ConnectWhere>;
};

export type CveCvss_V40Connection = {
  __typename?: 'CVECvss_v40Connection';
  edges: Array<CveCvss_V40Relationship>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type CveCvss_V40ConnectionSort = {
  node?: InputMaybe<CvsSv40Sort>;
};

export type CveCvss_V40ConnectionWhere = {
  AND?: InputMaybe<Array<CveCvss_V40ConnectionWhere>>;
  NOT?: InputMaybe<CveCvss_V40ConnectionWhere>;
  OR?: InputMaybe<Array<CveCvss_V40ConnectionWhere>>;
  node?: InputMaybe<CvsSv40Where>;
};

export type CveCvss_V40CreateFieldInput = {
  node: CvsSv40CreateInput;
};

export type CveCvss_V40DeleteFieldInput = {
  where?: InputMaybe<CveCvss_V40ConnectionWhere>;
};

export type CveCvss_V40DisconnectFieldInput = {
  where?: InputMaybe<CveCvss_V40ConnectionWhere>;
};

export type CveCvss_V40FieldInput = {
  connect?: InputMaybe<CveCvss_V40ConnectFieldInput>;
  create?: InputMaybe<CveCvss_V40CreateFieldInput>;
};

export type CveCvss_V40NodeAggregationWhereInput = {
  AND?: InputMaybe<Array<CveCvss_V40NodeAggregationWhereInput>>;
  NOT?: InputMaybe<CveCvss_V40NodeAggregationWhereInput>;
  OR?: InputMaybe<Array<CveCvss_V40NodeAggregationWhereInput>>;
  attack_complexity_AVERAGE_LENGTH_EQUAL?: InputMaybe<
    Scalars['Float']['input']
  >;
  attack_complexity_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  attack_complexity_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  attack_complexity_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  attack_complexity_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  attack_complexity_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  attack_complexity_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  attack_complexity_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  attack_complexity_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  attack_complexity_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  attack_complexity_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  attack_complexity_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  attack_complexity_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  attack_complexity_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  attack_complexity_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  attack_requirements_AVERAGE_LENGTH_EQUAL?: InputMaybe<
    Scalars['Float']['input']
  >;
  attack_requirements_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  attack_requirements_AVERAGE_LENGTH_GTE?: InputMaybe<
    Scalars['Float']['input']
  >;
  attack_requirements_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  attack_requirements_AVERAGE_LENGTH_LTE?: InputMaybe<
    Scalars['Float']['input']
  >;
  attack_requirements_LONGEST_LENGTH_EQUAL?: InputMaybe<
    Scalars['Int']['input']
  >;
  attack_requirements_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  attack_requirements_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  attack_requirements_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  attack_requirements_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  attack_requirements_SHORTEST_LENGTH_EQUAL?: InputMaybe<
    Scalars['Int']['input']
  >;
  attack_requirements_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  attack_requirements_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  attack_requirements_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  attack_requirements_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  attack_vector_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  attack_vector_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  attack_vector_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  attack_vector_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  attack_vector_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  attack_vector_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  attack_vector_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  attack_vector_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  attack_vector_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  attack_vector_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  attack_vector_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  attack_vector_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  attack_vector_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  attack_vector_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  attack_vector_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  base_score_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  base_score_AVERAGE_GT?: InputMaybe<Scalars['Float']['input']>;
  base_score_AVERAGE_GTE?: InputMaybe<Scalars['Float']['input']>;
  base_score_AVERAGE_LT?: InputMaybe<Scalars['Float']['input']>;
  base_score_AVERAGE_LTE?: InputMaybe<Scalars['Float']['input']>;
  base_score_MAX_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  base_score_MAX_GT?: InputMaybe<Scalars['Float']['input']>;
  base_score_MAX_GTE?: InputMaybe<Scalars['Float']['input']>;
  base_score_MAX_LT?: InputMaybe<Scalars['Float']['input']>;
  base_score_MAX_LTE?: InputMaybe<Scalars['Float']['input']>;
  base_score_MIN_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  base_score_MIN_GT?: InputMaybe<Scalars['Float']['input']>;
  base_score_MIN_GTE?: InputMaybe<Scalars['Float']['input']>;
  base_score_MIN_LT?: InputMaybe<Scalars['Float']['input']>;
  base_score_MIN_LTE?: InputMaybe<Scalars['Float']['input']>;
  base_score_SUM_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  base_score_SUM_GT?: InputMaybe<Scalars['Float']['input']>;
  base_score_SUM_GTE?: InputMaybe<Scalars['Float']['input']>;
  base_score_SUM_LT?: InputMaybe<Scalars['Float']['input']>;
  base_score_SUM_LTE?: InputMaybe<Scalars['Float']['input']>;
  base_severity_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  base_severity_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  base_severity_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  base_severity_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  base_severity_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  base_severity_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  base_severity_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  base_severity_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  base_severity_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  base_severity_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  base_severity_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  base_severity_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  base_severity_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  base_severity_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  base_severity_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  exploit_maturity_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  exploit_maturity_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  exploit_maturity_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  exploit_maturity_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  exploit_maturity_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  exploit_maturity_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  exploit_maturity_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  exploit_maturity_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  exploit_maturity_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  exploit_maturity_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  exploit_maturity_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  exploit_maturity_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  exploit_maturity_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  exploit_maturity_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  exploit_maturity_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  privileges_required_AVERAGE_LENGTH_EQUAL?: InputMaybe<
    Scalars['Float']['input']
  >;
  privileges_required_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  privileges_required_AVERAGE_LENGTH_GTE?: InputMaybe<
    Scalars['Float']['input']
  >;
  privileges_required_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  privileges_required_AVERAGE_LENGTH_LTE?: InputMaybe<
    Scalars['Float']['input']
  >;
  privileges_required_LONGEST_LENGTH_EQUAL?: InputMaybe<
    Scalars['Int']['input']
  >;
  privileges_required_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  privileges_required_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  privileges_required_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  privileges_required_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  privileges_required_SHORTEST_LENGTH_EQUAL?: InputMaybe<
    Scalars['Int']['input']
  >;
  privileges_required_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  privileges_required_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  privileges_required_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  privileges_required_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  subsequent_system_availability_AVERAGE_LENGTH_EQUAL?: InputMaybe<
    Scalars['Float']['input']
  >;
  subsequent_system_availability_AVERAGE_LENGTH_GT?: InputMaybe<
    Scalars['Float']['input']
  >;
  subsequent_system_availability_AVERAGE_LENGTH_GTE?: InputMaybe<
    Scalars['Float']['input']
  >;
  subsequent_system_availability_AVERAGE_LENGTH_LT?: InputMaybe<
    Scalars['Float']['input']
  >;
  subsequent_system_availability_AVERAGE_LENGTH_LTE?: InputMaybe<
    Scalars['Float']['input']
  >;
  subsequent_system_availability_LONGEST_LENGTH_EQUAL?: InputMaybe<
    Scalars['Int']['input']
  >;
  subsequent_system_availability_LONGEST_LENGTH_GT?: InputMaybe<
    Scalars['Int']['input']
  >;
  subsequent_system_availability_LONGEST_LENGTH_GTE?: InputMaybe<
    Scalars['Int']['input']
  >;
  subsequent_system_availability_LONGEST_LENGTH_LT?: InputMaybe<
    Scalars['Int']['input']
  >;
  subsequent_system_availability_LONGEST_LENGTH_LTE?: InputMaybe<
    Scalars['Int']['input']
  >;
  subsequent_system_availability_SHORTEST_LENGTH_EQUAL?: InputMaybe<
    Scalars['Int']['input']
  >;
  subsequent_system_availability_SHORTEST_LENGTH_GT?: InputMaybe<
    Scalars['Int']['input']
  >;
  subsequent_system_availability_SHORTEST_LENGTH_GTE?: InputMaybe<
    Scalars['Int']['input']
  >;
  subsequent_system_availability_SHORTEST_LENGTH_LT?: InputMaybe<
    Scalars['Int']['input']
  >;
  subsequent_system_availability_SHORTEST_LENGTH_LTE?: InputMaybe<
    Scalars['Int']['input']
  >;
  subsequent_system_confidentiality_AVERAGE_LENGTH_EQUAL?: InputMaybe<
    Scalars['Float']['input']
  >;
  subsequent_system_confidentiality_AVERAGE_LENGTH_GT?: InputMaybe<
    Scalars['Float']['input']
  >;
  subsequent_system_confidentiality_AVERAGE_LENGTH_GTE?: InputMaybe<
    Scalars['Float']['input']
  >;
  subsequent_system_confidentiality_AVERAGE_LENGTH_LT?: InputMaybe<
    Scalars['Float']['input']
  >;
  subsequent_system_confidentiality_AVERAGE_LENGTH_LTE?: InputMaybe<
    Scalars['Float']['input']
  >;
  subsequent_system_confidentiality_LONGEST_LENGTH_EQUAL?: InputMaybe<
    Scalars['Int']['input']
  >;
  subsequent_system_confidentiality_LONGEST_LENGTH_GT?: InputMaybe<
    Scalars['Int']['input']
  >;
  subsequent_system_confidentiality_LONGEST_LENGTH_GTE?: InputMaybe<
    Scalars['Int']['input']
  >;
  subsequent_system_confidentiality_LONGEST_LENGTH_LT?: InputMaybe<
    Scalars['Int']['input']
  >;
  subsequent_system_confidentiality_LONGEST_LENGTH_LTE?: InputMaybe<
    Scalars['Int']['input']
  >;
  subsequent_system_confidentiality_SHORTEST_LENGTH_EQUAL?: InputMaybe<
    Scalars['Int']['input']
  >;
  subsequent_system_confidentiality_SHORTEST_LENGTH_GT?: InputMaybe<
    Scalars['Int']['input']
  >;
  subsequent_system_confidentiality_SHORTEST_LENGTH_GTE?: InputMaybe<
    Scalars['Int']['input']
  >;
  subsequent_system_confidentiality_SHORTEST_LENGTH_LT?: InputMaybe<
    Scalars['Int']['input']
  >;
  subsequent_system_confidentiality_SHORTEST_LENGTH_LTE?: InputMaybe<
    Scalars['Int']['input']
  >;
  subsequent_system_integrity_AVERAGE_LENGTH_EQUAL?: InputMaybe<
    Scalars['Float']['input']
  >;
  subsequent_system_integrity_AVERAGE_LENGTH_GT?: InputMaybe<
    Scalars['Float']['input']
  >;
  subsequent_system_integrity_AVERAGE_LENGTH_GTE?: InputMaybe<
    Scalars['Float']['input']
  >;
  subsequent_system_integrity_AVERAGE_LENGTH_LT?: InputMaybe<
    Scalars['Float']['input']
  >;
  subsequent_system_integrity_AVERAGE_LENGTH_LTE?: InputMaybe<
    Scalars['Float']['input']
  >;
  subsequent_system_integrity_LONGEST_LENGTH_EQUAL?: InputMaybe<
    Scalars['Int']['input']
  >;
  subsequent_system_integrity_LONGEST_LENGTH_GT?: InputMaybe<
    Scalars['Int']['input']
  >;
  subsequent_system_integrity_LONGEST_LENGTH_GTE?: InputMaybe<
    Scalars['Int']['input']
  >;
  subsequent_system_integrity_LONGEST_LENGTH_LT?: InputMaybe<
    Scalars['Int']['input']
  >;
  subsequent_system_integrity_LONGEST_LENGTH_LTE?: InputMaybe<
    Scalars['Int']['input']
  >;
  subsequent_system_integrity_SHORTEST_LENGTH_EQUAL?: InputMaybe<
    Scalars['Int']['input']
  >;
  subsequent_system_integrity_SHORTEST_LENGTH_GT?: InputMaybe<
    Scalars['Int']['input']
  >;
  subsequent_system_integrity_SHORTEST_LENGTH_GTE?: InputMaybe<
    Scalars['Int']['input']
  >;
  subsequent_system_integrity_SHORTEST_LENGTH_LT?: InputMaybe<
    Scalars['Int']['input']
  >;
  subsequent_system_integrity_SHORTEST_LENGTH_LTE?: InputMaybe<
    Scalars['Int']['input']
  >;
  user_interaction_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  user_interaction_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  user_interaction_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  user_interaction_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  user_interaction_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  user_interaction_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  user_interaction_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  user_interaction_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  user_interaction_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  user_interaction_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  user_interaction_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  user_interaction_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  user_interaction_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  user_interaction_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  user_interaction_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  vector_string_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  vector_string_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  vector_string_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  vector_string_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  vector_string_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  vector_string_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  vector_string_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  vector_string_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  vector_string_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  vector_string_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  vector_string_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  vector_string_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  vector_string_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  vector_string_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  vector_string_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  vulnerable_system_availability_AVERAGE_LENGTH_EQUAL?: InputMaybe<
    Scalars['Float']['input']
  >;
  vulnerable_system_availability_AVERAGE_LENGTH_GT?: InputMaybe<
    Scalars['Float']['input']
  >;
  vulnerable_system_availability_AVERAGE_LENGTH_GTE?: InputMaybe<
    Scalars['Float']['input']
  >;
  vulnerable_system_availability_AVERAGE_LENGTH_LT?: InputMaybe<
    Scalars['Float']['input']
  >;
  vulnerable_system_availability_AVERAGE_LENGTH_LTE?: InputMaybe<
    Scalars['Float']['input']
  >;
  vulnerable_system_availability_LONGEST_LENGTH_EQUAL?: InputMaybe<
    Scalars['Int']['input']
  >;
  vulnerable_system_availability_LONGEST_LENGTH_GT?: InputMaybe<
    Scalars['Int']['input']
  >;
  vulnerable_system_availability_LONGEST_LENGTH_GTE?: InputMaybe<
    Scalars['Int']['input']
  >;
  vulnerable_system_availability_LONGEST_LENGTH_LT?: InputMaybe<
    Scalars['Int']['input']
  >;
  vulnerable_system_availability_LONGEST_LENGTH_LTE?: InputMaybe<
    Scalars['Int']['input']
  >;
  vulnerable_system_availability_SHORTEST_LENGTH_EQUAL?: InputMaybe<
    Scalars['Int']['input']
  >;
  vulnerable_system_availability_SHORTEST_LENGTH_GT?: InputMaybe<
    Scalars['Int']['input']
  >;
  vulnerable_system_availability_SHORTEST_LENGTH_GTE?: InputMaybe<
    Scalars['Int']['input']
  >;
  vulnerable_system_availability_SHORTEST_LENGTH_LT?: InputMaybe<
    Scalars['Int']['input']
  >;
  vulnerable_system_availability_SHORTEST_LENGTH_LTE?: InputMaybe<
    Scalars['Int']['input']
  >;
  vulnerable_system_confidentiality_AVERAGE_LENGTH_EQUAL?: InputMaybe<
    Scalars['Float']['input']
  >;
  vulnerable_system_confidentiality_AVERAGE_LENGTH_GT?: InputMaybe<
    Scalars['Float']['input']
  >;
  vulnerable_system_confidentiality_AVERAGE_LENGTH_GTE?: InputMaybe<
    Scalars['Float']['input']
  >;
  vulnerable_system_confidentiality_AVERAGE_LENGTH_LT?: InputMaybe<
    Scalars['Float']['input']
  >;
  vulnerable_system_confidentiality_AVERAGE_LENGTH_LTE?: InputMaybe<
    Scalars['Float']['input']
  >;
  vulnerable_system_confidentiality_LONGEST_LENGTH_EQUAL?: InputMaybe<
    Scalars['Int']['input']
  >;
  vulnerable_system_confidentiality_LONGEST_LENGTH_GT?: InputMaybe<
    Scalars['Int']['input']
  >;
  vulnerable_system_confidentiality_LONGEST_LENGTH_GTE?: InputMaybe<
    Scalars['Int']['input']
  >;
  vulnerable_system_confidentiality_LONGEST_LENGTH_LT?: InputMaybe<
    Scalars['Int']['input']
  >;
  vulnerable_system_confidentiality_LONGEST_LENGTH_LTE?: InputMaybe<
    Scalars['Int']['input']
  >;
  vulnerable_system_confidentiality_SHORTEST_LENGTH_EQUAL?: InputMaybe<
    Scalars['Int']['input']
  >;
  vulnerable_system_confidentiality_SHORTEST_LENGTH_GT?: InputMaybe<
    Scalars['Int']['input']
  >;
  vulnerable_system_confidentiality_SHORTEST_LENGTH_GTE?: InputMaybe<
    Scalars['Int']['input']
  >;
  vulnerable_system_confidentiality_SHORTEST_LENGTH_LT?: InputMaybe<
    Scalars['Int']['input']
  >;
  vulnerable_system_confidentiality_SHORTEST_LENGTH_LTE?: InputMaybe<
    Scalars['Int']['input']
  >;
  vulnerable_system_integrity_AVERAGE_LENGTH_EQUAL?: InputMaybe<
    Scalars['Float']['input']
  >;
  vulnerable_system_integrity_AVERAGE_LENGTH_GT?: InputMaybe<
    Scalars['Float']['input']
  >;
  vulnerable_system_integrity_AVERAGE_LENGTH_GTE?: InputMaybe<
    Scalars['Float']['input']
  >;
  vulnerable_system_integrity_AVERAGE_LENGTH_LT?: InputMaybe<
    Scalars['Float']['input']
  >;
  vulnerable_system_integrity_AVERAGE_LENGTH_LTE?: InputMaybe<
    Scalars['Float']['input']
  >;
  vulnerable_system_integrity_LONGEST_LENGTH_EQUAL?: InputMaybe<
    Scalars['Int']['input']
  >;
  vulnerable_system_integrity_LONGEST_LENGTH_GT?: InputMaybe<
    Scalars['Int']['input']
  >;
  vulnerable_system_integrity_LONGEST_LENGTH_GTE?: InputMaybe<
    Scalars['Int']['input']
  >;
  vulnerable_system_integrity_LONGEST_LENGTH_LT?: InputMaybe<
    Scalars['Int']['input']
  >;
  vulnerable_system_integrity_LONGEST_LENGTH_LTE?: InputMaybe<
    Scalars['Int']['input']
  >;
  vulnerable_system_integrity_SHORTEST_LENGTH_EQUAL?: InputMaybe<
    Scalars['Int']['input']
  >;
  vulnerable_system_integrity_SHORTEST_LENGTH_GT?: InputMaybe<
    Scalars['Int']['input']
  >;
  vulnerable_system_integrity_SHORTEST_LENGTH_GTE?: InputMaybe<
    Scalars['Int']['input']
  >;
  vulnerable_system_integrity_SHORTEST_LENGTH_LT?: InputMaybe<
    Scalars['Int']['input']
  >;
  vulnerable_system_integrity_SHORTEST_LENGTH_LTE?: InputMaybe<
    Scalars['Int']['input']
  >;
};

export type CveCvss_V40Relationship = {
  __typename?: 'CVECvss_v40Relationship';
  cursor: Scalars['String']['output'];
  node: CvsSv40;
};

export type CveCvss_V40UpdateConnectionInput = {
  node?: InputMaybe<CvsSv40UpdateInput>;
};

export type CveCvss_V40UpdateFieldInput = {
  connect?: InputMaybe<CveCvss_V40ConnectFieldInput>;
  create?: InputMaybe<CveCvss_V40CreateFieldInput>;
  delete?: InputMaybe<CveCvss_V40DeleteFieldInput>;
  disconnect?: InputMaybe<CveCvss_V40DisconnectFieldInput>;
  update?: InputMaybe<CveCvss_V40UpdateConnectionInput>;
  where?: InputMaybe<CveCvss_V40ConnectionWhere>;
};

export type CveDeleteInput = {
  cvss_v2?: InputMaybe<CveCvss_V2DeleteFieldInput>;
  cvss_v30?: InputMaybe<CveCvss_V30DeleteFieldInput>;
  cvss_v31?: InputMaybe<CveCvss_V31DeleteFieldInput>;
  cvss_v40?: InputMaybe<CveCvss_V40DeleteFieldInput>;
  vulnerability?: InputMaybe<CveVulnerabilityDeleteFieldInput>;
};

export type CveDisconnectInput = {
  cvss_v2?: InputMaybe<CveCvss_V2DisconnectFieldInput>;
  cvss_v30?: InputMaybe<CveCvss_V30DisconnectFieldInput>;
  cvss_v31?: InputMaybe<CveCvss_V31DisconnectFieldInput>;
  cvss_v40?: InputMaybe<CveCvss_V40DisconnectFieldInput>;
  vulnerability?: InputMaybe<CveVulnerabilityDisconnectFieldInput>;
};

export type CveEdge = {
  __typename?: 'CVEEdge';
  cursor: Scalars['String']['output'];
  node: Cve;
};

export type CveOptions = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  /**
   * Specify one or more CVESort objects to sort Cves by. The sorts will be applied
   * in the order in which they are arranged in the array.
   */
  sort?: InputMaybe<Array<CveSort>>;
};

export type CveRelationInput = {
  cvss_v2?: InputMaybe<CveCvss_V2CreateFieldInput>;
  cvss_v30?: InputMaybe<CveCvss_V30CreateFieldInput>;
  cvss_v31?: InputMaybe<CveCvss_V31CreateFieldInput>;
  cvss_v40?: InputMaybe<CveCvss_V40CreateFieldInput>;
  vulnerability?: InputMaybe<CveVulnerabilityCreateFieldInput>;
};

/**
 * Fields to sort Cves by. The order in which sorts are applied is not guaranteed
 * when specifying many fields in one CVESort object.
 */
export type CveSort = {
  _id?: InputMaybe<SortDirection>;
  cve_id?: InputMaybe<SortDirection>;
  description?: InputMaybe<SortDirection>;
  last_modified?: InputMaybe<SortDirection>;
  published?: InputMaybe<SortDirection>;
};

export type CveUpdateInput = {
  cpe_type?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  cpe_type_POP?: InputMaybe<Scalars['Int']['input']>;
  cpe_type_PUSH?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  cve_id?: InputMaybe<Scalars['String']['input']>;
  cvss_v2?: InputMaybe<CveCvss_V2UpdateFieldInput>;
  cvss_v30?: InputMaybe<CveCvss_V30UpdateFieldInput>;
  cvss_v31?: InputMaybe<CveCvss_V31UpdateFieldInput>;
  cvss_v40?: InputMaybe<CveCvss_V40UpdateFieldInput>;
  cwe?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  cwe_POP?: InputMaybe<Scalars['Int']['input']>;
  cwe_PUSH?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  description?: InputMaybe<Scalars['String']['input']>;
  last_modified?: InputMaybe<Scalars['String']['input']>;
  published?: InputMaybe<Scalars['String']['input']>;
  ref_tags?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  ref_tags_POP?: InputMaybe<Scalars['Int']['input']>;
  ref_tags_PUSH?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  result_impacts?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  result_impacts_POP?: InputMaybe<Scalars['Int']['input']>;
  result_impacts_PUSH?: InputMaybe<
    Array<InputMaybe<Scalars['String']['input']>>
  >;
  vulnerability?: InputMaybe<CveVulnerabilityUpdateFieldInput>;
};

export type CveVulnerabilityAggregateInput = {
  AND?: InputMaybe<Array<CveVulnerabilityAggregateInput>>;
  NOT?: InputMaybe<CveVulnerabilityAggregateInput>;
  OR?: InputMaybe<Array<CveVulnerabilityAggregateInput>>;
  count?: InputMaybe<Scalars['Int']['input']>;
  count_GT?: InputMaybe<Scalars['Int']['input']>;
  count_GTE?: InputMaybe<Scalars['Int']['input']>;
  count_LT?: InputMaybe<Scalars['Int']['input']>;
  count_LTE?: InputMaybe<Scalars['Int']['input']>;
  node?: InputMaybe<CveVulnerabilityNodeAggregationWhereInput>;
};

export type CveVulnerabilityConnectFieldInput = {
  connect?: InputMaybe<VulnerabilityConnectInput>;
  /** Whether or not to overwrite any matching relationship with the new properties. */
  overwrite?: Scalars['Boolean']['input'];
  where?: InputMaybe<VulnerabilityConnectWhere>;
};

export type CveVulnerabilityConnection = {
  __typename?: 'CVEVulnerabilityConnection';
  edges: Array<CveVulnerabilityRelationship>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type CveVulnerabilityConnectionSort = {
  node?: InputMaybe<VulnerabilitySort>;
};

export type CveVulnerabilityConnectionWhere = {
  AND?: InputMaybe<Array<CveVulnerabilityConnectionWhere>>;
  NOT?: InputMaybe<CveVulnerabilityConnectionWhere>;
  OR?: InputMaybe<Array<CveVulnerabilityConnectionWhere>>;
  node?: InputMaybe<VulnerabilityWhere>;
};

export type CveVulnerabilityCreateFieldInput = {
  node: VulnerabilityCreateInput;
};

export type CveVulnerabilityDeleteFieldInput = {
  delete?: InputMaybe<VulnerabilityDeleteInput>;
  where?: InputMaybe<CveVulnerabilityConnectionWhere>;
};

export type CveVulnerabilityDisconnectFieldInput = {
  disconnect?: InputMaybe<VulnerabilityDisconnectInput>;
  where?: InputMaybe<CveVulnerabilityConnectionWhere>;
};

export type CveVulnerabilityFieldInput = {
  connect?: InputMaybe<CveVulnerabilityConnectFieldInput>;
  create?: InputMaybe<CveVulnerabilityCreateFieldInput>;
};

export type CveVulnerabilityNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<CveVulnerabilityNodeAggregationWhereInput>>;
  NOT?: InputMaybe<CveVulnerabilityNodeAggregationWhereInput>;
  OR?: InputMaybe<Array<CveVulnerabilityNodeAggregationWhereInput>>;
  description_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  description_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  description_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  description_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  description_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  description_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  description_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  description_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  description_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  description_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  description_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  description_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  description_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  description_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  description_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
};

export type CveVulnerabilityRelationship = {
  __typename?: 'CVEVulnerabilityRelationship';
  cursor: Scalars['String']['output'];
  node: Vulnerability;
};

export type CveVulnerabilityUpdateConnectionInput = {
  node?: InputMaybe<VulnerabilityUpdateInput>;
};

export type CveVulnerabilityUpdateFieldInput = {
  connect?: InputMaybe<CveVulnerabilityConnectFieldInput>;
  create?: InputMaybe<CveVulnerabilityCreateFieldInput>;
  delete?: InputMaybe<CveVulnerabilityDeleteFieldInput>;
  disconnect?: InputMaybe<CveVulnerabilityDisconnectFieldInput>;
  update?: InputMaybe<CveVulnerabilityUpdateConnectionInput>;
  where?: InputMaybe<CveVulnerabilityConnectionWhere>;
};

export type CveVulnerabilityVulnerabilityAggregationSelection = {
  __typename?: 'CVEVulnerabilityVulnerabilityAggregationSelection';
  count: Scalars['Int']['output'];
  node?: Maybe<CveVulnerabilityVulnerabilityNodeAggregateSelection>;
};

export type CveVulnerabilityVulnerabilityNodeAggregateSelection = {
  __typename?: 'CVEVulnerabilityVulnerabilityNodeAggregateSelection';
  description: StringAggregateSelection;
};

export type CveWhere = {
  AND?: InputMaybe<Array<CveWhere>>;
  NOT?: InputMaybe<CveWhere>;
  OR?: InputMaybe<Array<CveWhere>>;
  _id?: InputMaybe<Scalars['ID']['input']>;
  _id_CONTAINS?: InputMaybe<Scalars['ID']['input']>;
  _id_ENDS_WITH?: InputMaybe<Scalars['ID']['input']>;
  _id_IN?: InputMaybe<Array<Scalars['ID']['input']>>;
  _id_STARTS_WITH?: InputMaybe<Scalars['ID']['input']>;
  cpe_type?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  cpe_type_INCLUDES?: InputMaybe<Scalars['String']['input']>;
  cve_id?: InputMaybe<Scalars['String']['input']>;
  cve_id_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  cve_id_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  cve_id_IN?: InputMaybe<Array<Scalars['String']['input']>>;
  cve_id_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
  cvss_v2?: InputMaybe<CvsSv2Where>;
  cvss_v2Aggregate?: InputMaybe<CveCvss_V2AggregateInput>;
  cvss_v2Connection?: InputMaybe<CveCvss_V2ConnectionWhere>;
  cvss_v2Connection_NOT?: InputMaybe<CveCvss_V2ConnectionWhere>;
  cvss_v2_NOT?: InputMaybe<CvsSv2Where>;
  cvss_v30?: InputMaybe<CvsSv30Where>;
  cvss_v30Aggregate?: InputMaybe<CveCvss_V30AggregateInput>;
  cvss_v30Connection?: InputMaybe<CveCvss_V30ConnectionWhere>;
  cvss_v30Connection_NOT?: InputMaybe<CveCvss_V30ConnectionWhere>;
  cvss_v30_NOT?: InputMaybe<CvsSv30Where>;
  cvss_v31?: InputMaybe<CvsSv31Where>;
  cvss_v31Aggregate?: InputMaybe<CveCvss_V31AggregateInput>;
  cvss_v31Connection?: InputMaybe<CveCvss_V31ConnectionWhere>;
  cvss_v31Connection_NOT?: InputMaybe<CveCvss_V31ConnectionWhere>;
  cvss_v31_NOT?: InputMaybe<CvsSv31Where>;
  cvss_v40?: InputMaybe<CvsSv40Where>;
  cvss_v40Aggregate?: InputMaybe<CveCvss_V40AggregateInput>;
  cvss_v40Connection?: InputMaybe<CveCvss_V40ConnectionWhere>;
  cvss_v40Connection_NOT?: InputMaybe<CveCvss_V40ConnectionWhere>;
  cvss_v40_NOT?: InputMaybe<CvsSv40Where>;
  cwe?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  cwe_INCLUDES?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  description_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  description_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  description_IN?: InputMaybe<Array<Scalars['String']['input']>>;
  description_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
  last_modified?: InputMaybe<Scalars['String']['input']>;
  last_modified_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  last_modified_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  last_modified_IN?: InputMaybe<Array<Scalars['String']['input']>>;
  last_modified_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
  published?: InputMaybe<Scalars['String']['input']>;
  published_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  published_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  published_IN?: InputMaybe<Array<Scalars['String']['input']>>;
  published_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
  ref_tags?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  ref_tags_INCLUDES?: InputMaybe<Scalars['String']['input']>;
  result_impacts?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  result_impacts_INCLUDES?: InputMaybe<Scalars['String']['input']>;
  vulnerability?: InputMaybe<VulnerabilityWhere>;
  vulnerabilityAggregate?: InputMaybe<CveVulnerabilityAggregateInput>;
  vulnerabilityConnection?: InputMaybe<CveVulnerabilityConnectionWhere>;
  vulnerabilityConnection_NOT?: InputMaybe<CveVulnerabilityConnectionWhere>;
  vulnerability_NOT?: InputMaybe<VulnerabilityWhere>;
};

export type CvsSv2 = {
  __typename?: 'CVSSv2';
  _id: Scalars['ID']['output'];
  ac_insuf_info?: Maybe<Scalars['Boolean']['output']>;
  access_complexity?: Maybe<Scalars['String']['output']>;
  access_vector?: Maybe<Scalars['String']['output']>;
  authentication?: Maybe<Scalars['String']['output']>;
  availability_impact?: Maybe<Scalars['String']['output']>;
  base_score?: Maybe<Scalars['Float']['output']>;
  base_severity?: Maybe<Scalars['String']['output']>;
  confidentiality_impact?: Maybe<Scalars['String']['output']>;
  exploitability_score?: Maybe<Scalars['Float']['output']>;
  impact_score?: Maybe<Scalars['Float']['output']>;
  integrity_impact?: Maybe<Scalars['String']['output']>;
  obtain_all_privilege?: Maybe<Scalars['Boolean']['output']>;
  obtain_other_privilege?: Maybe<Scalars['Boolean']['output']>;
  obtain_user_privilege?: Maybe<Scalars['Boolean']['output']>;
  user_interaction_required?: Maybe<Scalars['Boolean']['output']>;
  vector_string?: Maybe<Scalars['String']['output']>;
};

export type CvsSv2AggregateSelection = {
  __typename?: 'CVSSv2AggregateSelection';
  access_complexity: StringAggregateSelection;
  access_vector: StringAggregateSelection;
  authentication: StringAggregateSelection;
  availability_impact: StringAggregateSelection;
  base_score: FloatAggregateSelection;
  base_severity: StringAggregateSelection;
  confidentiality_impact: StringAggregateSelection;
  count: Scalars['Int']['output'];
  exploitability_score: FloatAggregateSelection;
  impact_score: FloatAggregateSelection;
  integrity_impact: StringAggregateSelection;
  vector_string: StringAggregateSelection;
};

export type CvsSv2ConnectWhere = {
  node: CvsSv2Where;
};

export type CvsSv2CreateInput = {
  ac_insuf_info?: InputMaybe<Scalars['Boolean']['input']>;
  access_complexity?: InputMaybe<Scalars['String']['input']>;
  access_vector?: InputMaybe<Scalars['String']['input']>;
  authentication?: InputMaybe<Scalars['String']['input']>;
  availability_impact?: InputMaybe<Scalars['String']['input']>;
  base_score?: InputMaybe<Scalars['Float']['input']>;
  base_severity?: InputMaybe<Scalars['String']['input']>;
  confidentiality_impact?: InputMaybe<Scalars['String']['input']>;
  exploitability_score?: InputMaybe<Scalars['Float']['input']>;
  impact_score?: InputMaybe<Scalars['Float']['input']>;
  integrity_impact?: InputMaybe<Scalars['String']['input']>;
  obtain_all_privilege?: InputMaybe<Scalars['Boolean']['input']>;
  obtain_other_privilege?: InputMaybe<Scalars['Boolean']['input']>;
  obtain_user_privilege?: InputMaybe<Scalars['Boolean']['input']>;
  user_interaction_required?: InputMaybe<Scalars['Boolean']['input']>;
  vector_string?: InputMaybe<Scalars['String']['input']>;
};

export type CvsSv2Edge = {
  __typename?: 'CVSSv2Edge';
  cursor: Scalars['String']['output'];
  node: CvsSv2;
};

export type CvsSv2Options = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  /**
   * Specify one or more CVSSv2Sort objects to sort CvsSv2s by. The sorts will be
   * applied in the order in which they are arranged in the array.
   */
  sort?: InputMaybe<Array<CvsSv2Sort>>;
};

/**
 * Fields to sort CvsSv2s by. The order in which sorts are applied is not
 * guaranteed when specifying many fields in one CVSSv2Sort object.
 */
export type CvsSv2Sort = {
  _id?: InputMaybe<SortDirection>;
  ac_insuf_info?: InputMaybe<SortDirection>;
  access_complexity?: InputMaybe<SortDirection>;
  access_vector?: InputMaybe<SortDirection>;
  authentication?: InputMaybe<SortDirection>;
  availability_impact?: InputMaybe<SortDirection>;
  base_score?: InputMaybe<SortDirection>;
  base_severity?: InputMaybe<SortDirection>;
  confidentiality_impact?: InputMaybe<SortDirection>;
  exploitability_score?: InputMaybe<SortDirection>;
  impact_score?: InputMaybe<SortDirection>;
  integrity_impact?: InputMaybe<SortDirection>;
  obtain_all_privilege?: InputMaybe<SortDirection>;
  obtain_other_privilege?: InputMaybe<SortDirection>;
  obtain_user_privilege?: InputMaybe<SortDirection>;
  user_interaction_required?: InputMaybe<SortDirection>;
  vector_string?: InputMaybe<SortDirection>;
};

export type CvsSv2UpdateInput = {
  ac_insuf_info?: InputMaybe<Scalars['Boolean']['input']>;
  access_complexity?: InputMaybe<Scalars['String']['input']>;
  access_vector?: InputMaybe<Scalars['String']['input']>;
  authentication?: InputMaybe<Scalars['String']['input']>;
  availability_impact?: InputMaybe<Scalars['String']['input']>;
  base_score?: InputMaybe<Scalars['Float']['input']>;
  base_score_ADD?: InputMaybe<Scalars['Float']['input']>;
  base_score_DIVIDE?: InputMaybe<Scalars['Float']['input']>;
  base_score_MULTIPLY?: InputMaybe<Scalars['Float']['input']>;
  base_score_SUBTRACT?: InputMaybe<Scalars['Float']['input']>;
  base_severity?: InputMaybe<Scalars['String']['input']>;
  confidentiality_impact?: InputMaybe<Scalars['String']['input']>;
  exploitability_score?: InputMaybe<Scalars['Float']['input']>;
  exploitability_score_ADD?: InputMaybe<Scalars['Float']['input']>;
  exploitability_score_DIVIDE?: InputMaybe<Scalars['Float']['input']>;
  exploitability_score_MULTIPLY?: InputMaybe<Scalars['Float']['input']>;
  exploitability_score_SUBTRACT?: InputMaybe<Scalars['Float']['input']>;
  impact_score?: InputMaybe<Scalars['Float']['input']>;
  impact_score_ADD?: InputMaybe<Scalars['Float']['input']>;
  impact_score_DIVIDE?: InputMaybe<Scalars['Float']['input']>;
  impact_score_MULTIPLY?: InputMaybe<Scalars['Float']['input']>;
  impact_score_SUBTRACT?: InputMaybe<Scalars['Float']['input']>;
  integrity_impact?: InputMaybe<Scalars['String']['input']>;
  obtain_all_privilege?: InputMaybe<Scalars['Boolean']['input']>;
  obtain_other_privilege?: InputMaybe<Scalars['Boolean']['input']>;
  obtain_user_privilege?: InputMaybe<Scalars['Boolean']['input']>;
  user_interaction_required?: InputMaybe<Scalars['Boolean']['input']>;
  vector_string?: InputMaybe<Scalars['String']['input']>;
};

export type CvsSv2Where = {
  AND?: InputMaybe<Array<CvsSv2Where>>;
  NOT?: InputMaybe<CvsSv2Where>;
  OR?: InputMaybe<Array<CvsSv2Where>>;
  _id?: InputMaybe<Scalars['ID']['input']>;
  _id_CONTAINS?: InputMaybe<Scalars['ID']['input']>;
  _id_ENDS_WITH?: InputMaybe<Scalars['ID']['input']>;
  _id_IN?: InputMaybe<Array<Scalars['ID']['input']>>;
  _id_STARTS_WITH?: InputMaybe<Scalars['ID']['input']>;
  ac_insuf_info?: InputMaybe<Scalars['Boolean']['input']>;
  access_complexity?: InputMaybe<Scalars['String']['input']>;
  access_complexity_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  access_complexity_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  access_complexity_IN?: InputMaybe<
    Array<InputMaybe<Scalars['String']['input']>>
  >;
  access_complexity_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
  access_vector?: InputMaybe<Scalars['String']['input']>;
  access_vector_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  access_vector_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  access_vector_IN?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  access_vector_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
  authentication?: InputMaybe<Scalars['String']['input']>;
  authentication_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  authentication_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  authentication_IN?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  authentication_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
  availability_impact?: InputMaybe<Scalars['String']['input']>;
  availability_impact_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  availability_impact_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  availability_impact_IN?: InputMaybe<
    Array<InputMaybe<Scalars['String']['input']>>
  >;
  availability_impact_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
  base_score?: InputMaybe<Scalars['Float']['input']>;
  base_score_GT?: InputMaybe<Scalars['Float']['input']>;
  base_score_GTE?: InputMaybe<Scalars['Float']['input']>;
  base_score_IN?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  base_score_LT?: InputMaybe<Scalars['Float']['input']>;
  base_score_LTE?: InputMaybe<Scalars['Float']['input']>;
  base_severity?: InputMaybe<Scalars['String']['input']>;
  base_severity_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  base_severity_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  base_severity_IN?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  base_severity_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
  confidentiality_impact?: InputMaybe<Scalars['String']['input']>;
  confidentiality_impact_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  confidentiality_impact_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  confidentiality_impact_IN?: InputMaybe<
    Array<InputMaybe<Scalars['String']['input']>>
  >;
  confidentiality_impact_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
  exploitability_score?: InputMaybe<Scalars['Float']['input']>;
  exploitability_score_GT?: InputMaybe<Scalars['Float']['input']>;
  exploitability_score_GTE?: InputMaybe<Scalars['Float']['input']>;
  exploitability_score_IN?: InputMaybe<
    Array<InputMaybe<Scalars['Float']['input']>>
  >;
  exploitability_score_LT?: InputMaybe<Scalars['Float']['input']>;
  exploitability_score_LTE?: InputMaybe<Scalars['Float']['input']>;
  impact_score?: InputMaybe<Scalars['Float']['input']>;
  impact_score_GT?: InputMaybe<Scalars['Float']['input']>;
  impact_score_GTE?: InputMaybe<Scalars['Float']['input']>;
  impact_score_IN?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  impact_score_LT?: InputMaybe<Scalars['Float']['input']>;
  impact_score_LTE?: InputMaybe<Scalars['Float']['input']>;
  integrity_impact?: InputMaybe<Scalars['String']['input']>;
  integrity_impact_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  integrity_impact_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  integrity_impact_IN?: InputMaybe<
    Array<InputMaybe<Scalars['String']['input']>>
  >;
  integrity_impact_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
  obtain_all_privilege?: InputMaybe<Scalars['Boolean']['input']>;
  obtain_other_privilege?: InputMaybe<Scalars['Boolean']['input']>;
  obtain_user_privilege?: InputMaybe<Scalars['Boolean']['input']>;
  user_interaction_required?: InputMaybe<Scalars['Boolean']['input']>;
  vector_string?: InputMaybe<Scalars['String']['input']>;
  vector_string_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  vector_string_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  vector_string_IN?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  vector_string_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
};

export type CvsSv30 = {
  __typename?: 'CVSSv30';
  _id: Scalars['ID']['output'];
  attack_complexity?: Maybe<Scalars['String']['output']>;
  attack_vector?: Maybe<Scalars['String']['output']>;
  availability_impact?: Maybe<Scalars['String']['output']>;
  base_score?: Maybe<Scalars['Float']['output']>;
  base_severity?: Maybe<Scalars['String']['output']>;
  confidentiality_impact?: Maybe<Scalars['String']['output']>;
  exploitability_score?: Maybe<Scalars['Float']['output']>;
  impact_score?: Maybe<Scalars['Float']['output']>;
  integrity_impact?: Maybe<Scalars['String']['output']>;
  privileges_required?: Maybe<Scalars['String']['output']>;
  scope?: Maybe<Scalars['String']['output']>;
  user_interaction?: Maybe<Scalars['String']['output']>;
  vector_string?: Maybe<Scalars['String']['output']>;
};

export type CvsSv30AggregateSelection = {
  __typename?: 'CVSSv30AggregateSelection';
  attack_complexity: StringAggregateSelection;
  attack_vector: StringAggregateSelection;
  availability_impact: StringAggregateSelection;
  base_score: FloatAggregateSelection;
  base_severity: StringAggregateSelection;
  confidentiality_impact: StringAggregateSelection;
  count: Scalars['Int']['output'];
  exploitability_score: FloatAggregateSelection;
  impact_score: FloatAggregateSelection;
  integrity_impact: StringAggregateSelection;
  privileges_required: StringAggregateSelection;
  scope: StringAggregateSelection;
  user_interaction: StringAggregateSelection;
  vector_string: StringAggregateSelection;
};

export type CvsSv30ConnectWhere = {
  node: CvsSv30Where;
};

export type CvsSv30CreateInput = {
  attack_complexity?: InputMaybe<Scalars['String']['input']>;
  attack_vector?: InputMaybe<Scalars['String']['input']>;
  availability_impact?: InputMaybe<Scalars['String']['input']>;
  base_score?: InputMaybe<Scalars['Float']['input']>;
  base_severity?: InputMaybe<Scalars['String']['input']>;
  confidentiality_impact?: InputMaybe<Scalars['String']['input']>;
  exploitability_score?: InputMaybe<Scalars['Float']['input']>;
  impact_score?: InputMaybe<Scalars['Float']['input']>;
  integrity_impact?: InputMaybe<Scalars['String']['input']>;
  privileges_required?: InputMaybe<Scalars['String']['input']>;
  scope?: InputMaybe<Scalars['String']['input']>;
  user_interaction?: InputMaybe<Scalars['String']['input']>;
  vector_string?: InputMaybe<Scalars['String']['input']>;
};

export type CvsSv30Edge = {
  __typename?: 'CVSSv30Edge';
  cursor: Scalars['String']['output'];
  node: CvsSv30;
};

export type CvsSv30Options = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  /**
   * Specify one or more CVSSv30Sort objects to sort CvsSv30s by. The sorts will be
   * applied in the order in which they are arranged in the array.
   */
  sort?: InputMaybe<Array<CvsSv30Sort>>;
};

/**
 * Fields to sort CvsSv30s by. The order in which sorts are applied is not
 * guaranteed when specifying many fields in one CVSSv30Sort object.
 */
export type CvsSv30Sort = {
  _id?: InputMaybe<SortDirection>;
  attack_complexity?: InputMaybe<SortDirection>;
  attack_vector?: InputMaybe<SortDirection>;
  availability_impact?: InputMaybe<SortDirection>;
  base_score?: InputMaybe<SortDirection>;
  base_severity?: InputMaybe<SortDirection>;
  confidentiality_impact?: InputMaybe<SortDirection>;
  exploitability_score?: InputMaybe<SortDirection>;
  impact_score?: InputMaybe<SortDirection>;
  integrity_impact?: InputMaybe<SortDirection>;
  privileges_required?: InputMaybe<SortDirection>;
  scope?: InputMaybe<SortDirection>;
  user_interaction?: InputMaybe<SortDirection>;
  vector_string?: InputMaybe<SortDirection>;
};

export type CvsSv30UpdateInput = {
  attack_complexity?: InputMaybe<Scalars['String']['input']>;
  attack_vector?: InputMaybe<Scalars['String']['input']>;
  availability_impact?: InputMaybe<Scalars['String']['input']>;
  base_score?: InputMaybe<Scalars['Float']['input']>;
  base_score_ADD?: InputMaybe<Scalars['Float']['input']>;
  base_score_DIVIDE?: InputMaybe<Scalars['Float']['input']>;
  base_score_MULTIPLY?: InputMaybe<Scalars['Float']['input']>;
  base_score_SUBTRACT?: InputMaybe<Scalars['Float']['input']>;
  base_severity?: InputMaybe<Scalars['String']['input']>;
  confidentiality_impact?: InputMaybe<Scalars['String']['input']>;
  exploitability_score?: InputMaybe<Scalars['Float']['input']>;
  exploitability_score_ADD?: InputMaybe<Scalars['Float']['input']>;
  exploitability_score_DIVIDE?: InputMaybe<Scalars['Float']['input']>;
  exploitability_score_MULTIPLY?: InputMaybe<Scalars['Float']['input']>;
  exploitability_score_SUBTRACT?: InputMaybe<Scalars['Float']['input']>;
  impact_score?: InputMaybe<Scalars['Float']['input']>;
  impact_score_ADD?: InputMaybe<Scalars['Float']['input']>;
  impact_score_DIVIDE?: InputMaybe<Scalars['Float']['input']>;
  impact_score_MULTIPLY?: InputMaybe<Scalars['Float']['input']>;
  impact_score_SUBTRACT?: InputMaybe<Scalars['Float']['input']>;
  integrity_impact?: InputMaybe<Scalars['String']['input']>;
  privileges_required?: InputMaybe<Scalars['String']['input']>;
  scope?: InputMaybe<Scalars['String']['input']>;
  user_interaction?: InputMaybe<Scalars['String']['input']>;
  vector_string?: InputMaybe<Scalars['String']['input']>;
};

export type CvsSv30Where = {
  AND?: InputMaybe<Array<CvsSv30Where>>;
  NOT?: InputMaybe<CvsSv30Where>;
  OR?: InputMaybe<Array<CvsSv30Where>>;
  _id?: InputMaybe<Scalars['ID']['input']>;
  _id_CONTAINS?: InputMaybe<Scalars['ID']['input']>;
  _id_ENDS_WITH?: InputMaybe<Scalars['ID']['input']>;
  _id_IN?: InputMaybe<Array<Scalars['ID']['input']>>;
  _id_STARTS_WITH?: InputMaybe<Scalars['ID']['input']>;
  attack_complexity?: InputMaybe<Scalars['String']['input']>;
  attack_complexity_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  attack_complexity_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  attack_complexity_IN?: InputMaybe<
    Array<InputMaybe<Scalars['String']['input']>>
  >;
  attack_complexity_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
  attack_vector?: InputMaybe<Scalars['String']['input']>;
  attack_vector_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  attack_vector_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  attack_vector_IN?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  attack_vector_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
  availability_impact?: InputMaybe<Scalars['String']['input']>;
  availability_impact_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  availability_impact_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  availability_impact_IN?: InputMaybe<
    Array<InputMaybe<Scalars['String']['input']>>
  >;
  availability_impact_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
  base_score?: InputMaybe<Scalars['Float']['input']>;
  base_score_GT?: InputMaybe<Scalars['Float']['input']>;
  base_score_GTE?: InputMaybe<Scalars['Float']['input']>;
  base_score_IN?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  base_score_LT?: InputMaybe<Scalars['Float']['input']>;
  base_score_LTE?: InputMaybe<Scalars['Float']['input']>;
  base_severity?: InputMaybe<Scalars['String']['input']>;
  base_severity_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  base_severity_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  base_severity_IN?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  base_severity_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
  confidentiality_impact?: InputMaybe<Scalars['String']['input']>;
  confidentiality_impact_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  confidentiality_impact_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  confidentiality_impact_IN?: InputMaybe<
    Array<InputMaybe<Scalars['String']['input']>>
  >;
  confidentiality_impact_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
  exploitability_score?: InputMaybe<Scalars['Float']['input']>;
  exploitability_score_GT?: InputMaybe<Scalars['Float']['input']>;
  exploitability_score_GTE?: InputMaybe<Scalars['Float']['input']>;
  exploitability_score_IN?: InputMaybe<
    Array<InputMaybe<Scalars['Float']['input']>>
  >;
  exploitability_score_LT?: InputMaybe<Scalars['Float']['input']>;
  exploitability_score_LTE?: InputMaybe<Scalars['Float']['input']>;
  impact_score?: InputMaybe<Scalars['Float']['input']>;
  impact_score_GT?: InputMaybe<Scalars['Float']['input']>;
  impact_score_GTE?: InputMaybe<Scalars['Float']['input']>;
  impact_score_IN?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  impact_score_LT?: InputMaybe<Scalars['Float']['input']>;
  impact_score_LTE?: InputMaybe<Scalars['Float']['input']>;
  integrity_impact?: InputMaybe<Scalars['String']['input']>;
  integrity_impact_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  integrity_impact_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  integrity_impact_IN?: InputMaybe<
    Array<InputMaybe<Scalars['String']['input']>>
  >;
  integrity_impact_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
  privileges_required?: InputMaybe<Scalars['String']['input']>;
  privileges_required_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  privileges_required_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  privileges_required_IN?: InputMaybe<
    Array<InputMaybe<Scalars['String']['input']>>
  >;
  privileges_required_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
  scope?: InputMaybe<Scalars['String']['input']>;
  scope_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  scope_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  scope_IN?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  scope_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
  user_interaction?: InputMaybe<Scalars['String']['input']>;
  user_interaction_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  user_interaction_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  user_interaction_IN?: InputMaybe<
    Array<InputMaybe<Scalars['String']['input']>>
  >;
  user_interaction_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
  vector_string?: InputMaybe<Scalars['String']['input']>;
  vector_string_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  vector_string_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  vector_string_IN?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  vector_string_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
};

export type CvsSv31 = {
  __typename?: 'CVSSv31';
  _id: Scalars['ID']['output'];
  attack_complexity?: Maybe<Scalars['String']['output']>;
  attack_vector?: Maybe<Scalars['String']['output']>;
  availability_impact?: Maybe<Scalars['String']['output']>;
  base_score?: Maybe<Scalars['Float']['output']>;
  base_severity?: Maybe<Scalars['String']['output']>;
  confidentiality_impact?: Maybe<Scalars['String']['output']>;
  exploitability_score?: Maybe<Scalars['Float']['output']>;
  impact_score?: Maybe<Scalars['Float']['output']>;
  integrity_impact?: Maybe<Scalars['String']['output']>;
  privileges_required?: Maybe<Scalars['String']['output']>;
  scope?: Maybe<Scalars['String']['output']>;
  user_interaction?: Maybe<Scalars['String']['output']>;
  vector_string?: Maybe<Scalars['String']['output']>;
};

export type CvsSv31AggregateSelection = {
  __typename?: 'CVSSv31AggregateSelection';
  attack_complexity: StringAggregateSelection;
  attack_vector: StringAggregateSelection;
  availability_impact: StringAggregateSelection;
  base_score: FloatAggregateSelection;
  base_severity: StringAggregateSelection;
  confidentiality_impact: StringAggregateSelection;
  count: Scalars['Int']['output'];
  exploitability_score: FloatAggregateSelection;
  impact_score: FloatAggregateSelection;
  integrity_impact: StringAggregateSelection;
  privileges_required: StringAggregateSelection;
  scope: StringAggregateSelection;
  user_interaction: StringAggregateSelection;
  vector_string: StringAggregateSelection;
};

export type CvsSv31ConnectWhere = {
  node: CvsSv31Where;
};

export type CvsSv31CreateInput = {
  attack_complexity?: InputMaybe<Scalars['String']['input']>;
  attack_vector?: InputMaybe<Scalars['String']['input']>;
  availability_impact?: InputMaybe<Scalars['String']['input']>;
  base_score?: InputMaybe<Scalars['Float']['input']>;
  base_severity?: InputMaybe<Scalars['String']['input']>;
  confidentiality_impact?: InputMaybe<Scalars['String']['input']>;
  exploitability_score?: InputMaybe<Scalars['Float']['input']>;
  impact_score?: InputMaybe<Scalars['Float']['input']>;
  integrity_impact?: InputMaybe<Scalars['String']['input']>;
  privileges_required?: InputMaybe<Scalars['String']['input']>;
  scope?: InputMaybe<Scalars['String']['input']>;
  user_interaction?: InputMaybe<Scalars['String']['input']>;
  vector_string?: InputMaybe<Scalars['String']['input']>;
};

export type CvsSv31Edge = {
  __typename?: 'CVSSv31Edge';
  cursor: Scalars['String']['output'];
  node: CvsSv31;
};

export type CvsSv31Options = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  /**
   * Specify one or more CVSSv31Sort objects to sort CvsSv31s by. The sorts will be
   * applied in the order in which they are arranged in the array.
   */
  sort?: InputMaybe<Array<CvsSv31Sort>>;
};

/**
 * Fields to sort CvsSv31s by. The order in which sorts are applied is not
 * guaranteed when specifying many fields in one CVSSv31Sort object.
 */
export type CvsSv31Sort = {
  _id?: InputMaybe<SortDirection>;
  attack_complexity?: InputMaybe<SortDirection>;
  attack_vector?: InputMaybe<SortDirection>;
  availability_impact?: InputMaybe<SortDirection>;
  base_score?: InputMaybe<SortDirection>;
  base_severity?: InputMaybe<SortDirection>;
  confidentiality_impact?: InputMaybe<SortDirection>;
  exploitability_score?: InputMaybe<SortDirection>;
  impact_score?: InputMaybe<SortDirection>;
  integrity_impact?: InputMaybe<SortDirection>;
  privileges_required?: InputMaybe<SortDirection>;
  scope?: InputMaybe<SortDirection>;
  user_interaction?: InputMaybe<SortDirection>;
  vector_string?: InputMaybe<SortDirection>;
};

export type CvsSv31UpdateInput = {
  attack_complexity?: InputMaybe<Scalars['String']['input']>;
  attack_vector?: InputMaybe<Scalars['String']['input']>;
  availability_impact?: InputMaybe<Scalars['String']['input']>;
  base_score?: InputMaybe<Scalars['Float']['input']>;
  base_score_ADD?: InputMaybe<Scalars['Float']['input']>;
  base_score_DIVIDE?: InputMaybe<Scalars['Float']['input']>;
  base_score_MULTIPLY?: InputMaybe<Scalars['Float']['input']>;
  base_score_SUBTRACT?: InputMaybe<Scalars['Float']['input']>;
  base_severity?: InputMaybe<Scalars['String']['input']>;
  confidentiality_impact?: InputMaybe<Scalars['String']['input']>;
  exploitability_score?: InputMaybe<Scalars['Float']['input']>;
  exploitability_score_ADD?: InputMaybe<Scalars['Float']['input']>;
  exploitability_score_DIVIDE?: InputMaybe<Scalars['Float']['input']>;
  exploitability_score_MULTIPLY?: InputMaybe<Scalars['Float']['input']>;
  exploitability_score_SUBTRACT?: InputMaybe<Scalars['Float']['input']>;
  impact_score?: InputMaybe<Scalars['Float']['input']>;
  impact_score_ADD?: InputMaybe<Scalars['Float']['input']>;
  impact_score_DIVIDE?: InputMaybe<Scalars['Float']['input']>;
  impact_score_MULTIPLY?: InputMaybe<Scalars['Float']['input']>;
  impact_score_SUBTRACT?: InputMaybe<Scalars['Float']['input']>;
  integrity_impact?: InputMaybe<Scalars['String']['input']>;
  privileges_required?: InputMaybe<Scalars['String']['input']>;
  scope?: InputMaybe<Scalars['String']['input']>;
  user_interaction?: InputMaybe<Scalars['String']['input']>;
  vector_string?: InputMaybe<Scalars['String']['input']>;
};

export type CvsSv31Where = {
  AND?: InputMaybe<Array<CvsSv31Where>>;
  NOT?: InputMaybe<CvsSv31Where>;
  OR?: InputMaybe<Array<CvsSv31Where>>;
  _id?: InputMaybe<Scalars['ID']['input']>;
  _id_CONTAINS?: InputMaybe<Scalars['ID']['input']>;
  _id_ENDS_WITH?: InputMaybe<Scalars['ID']['input']>;
  _id_IN?: InputMaybe<Array<Scalars['ID']['input']>>;
  _id_STARTS_WITH?: InputMaybe<Scalars['ID']['input']>;
  attack_complexity?: InputMaybe<Scalars['String']['input']>;
  attack_complexity_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  attack_complexity_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  attack_complexity_IN?: InputMaybe<
    Array<InputMaybe<Scalars['String']['input']>>
  >;
  attack_complexity_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
  attack_vector?: InputMaybe<Scalars['String']['input']>;
  attack_vector_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  attack_vector_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  attack_vector_IN?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  attack_vector_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
  availability_impact?: InputMaybe<Scalars['String']['input']>;
  availability_impact_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  availability_impact_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  availability_impact_IN?: InputMaybe<
    Array<InputMaybe<Scalars['String']['input']>>
  >;
  availability_impact_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
  base_score?: InputMaybe<Scalars['Float']['input']>;
  base_score_GT?: InputMaybe<Scalars['Float']['input']>;
  base_score_GTE?: InputMaybe<Scalars['Float']['input']>;
  base_score_IN?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  base_score_LT?: InputMaybe<Scalars['Float']['input']>;
  base_score_LTE?: InputMaybe<Scalars['Float']['input']>;
  base_severity?: InputMaybe<Scalars['String']['input']>;
  base_severity_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  base_severity_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  base_severity_IN?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  base_severity_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
  confidentiality_impact?: InputMaybe<Scalars['String']['input']>;
  confidentiality_impact_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  confidentiality_impact_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  confidentiality_impact_IN?: InputMaybe<
    Array<InputMaybe<Scalars['String']['input']>>
  >;
  confidentiality_impact_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
  exploitability_score?: InputMaybe<Scalars['Float']['input']>;
  exploitability_score_GT?: InputMaybe<Scalars['Float']['input']>;
  exploitability_score_GTE?: InputMaybe<Scalars['Float']['input']>;
  exploitability_score_IN?: InputMaybe<
    Array<InputMaybe<Scalars['Float']['input']>>
  >;
  exploitability_score_LT?: InputMaybe<Scalars['Float']['input']>;
  exploitability_score_LTE?: InputMaybe<Scalars['Float']['input']>;
  impact_score?: InputMaybe<Scalars['Float']['input']>;
  impact_score_GT?: InputMaybe<Scalars['Float']['input']>;
  impact_score_GTE?: InputMaybe<Scalars['Float']['input']>;
  impact_score_IN?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  impact_score_LT?: InputMaybe<Scalars['Float']['input']>;
  impact_score_LTE?: InputMaybe<Scalars['Float']['input']>;
  integrity_impact?: InputMaybe<Scalars['String']['input']>;
  integrity_impact_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  integrity_impact_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  integrity_impact_IN?: InputMaybe<
    Array<InputMaybe<Scalars['String']['input']>>
  >;
  integrity_impact_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
  privileges_required?: InputMaybe<Scalars['String']['input']>;
  privileges_required_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  privileges_required_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  privileges_required_IN?: InputMaybe<
    Array<InputMaybe<Scalars['String']['input']>>
  >;
  privileges_required_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
  scope?: InputMaybe<Scalars['String']['input']>;
  scope_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  scope_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  scope_IN?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  scope_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
  user_interaction?: InputMaybe<Scalars['String']['input']>;
  user_interaction_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  user_interaction_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  user_interaction_IN?: InputMaybe<
    Array<InputMaybe<Scalars['String']['input']>>
  >;
  user_interaction_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
  vector_string?: InputMaybe<Scalars['String']['input']>;
  vector_string_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  vector_string_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  vector_string_IN?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  vector_string_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
};

export type CvsSv40 = {
  __typename?: 'CVSSv40';
  _id: Scalars['ID']['output'];
  attack_complexity?: Maybe<Scalars['String']['output']>;
  attack_requirements?: Maybe<Scalars['String']['output']>;
  attack_vector?: Maybe<Scalars['String']['output']>;
  base_score?: Maybe<Scalars['Float']['output']>;
  base_severity?: Maybe<Scalars['String']['output']>;
  exploit_maturity?: Maybe<Scalars['String']['output']>;
  privileges_required?: Maybe<Scalars['String']['output']>;
  subsequent_system_availability?: Maybe<Scalars['String']['output']>;
  subsequent_system_confidentiality?: Maybe<Scalars['String']['output']>;
  subsequent_system_integrity?: Maybe<Scalars['String']['output']>;
  user_interaction?: Maybe<Scalars['String']['output']>;
  vector_string?: Maybe<Scalars['String']['output']>;
  vulnerable_system_availability?: Maybe<Scalars['String']['output']>;
  vulnerable_system_confidentiality?: Maybe<Scalars['String']['output']>;
  vulnerable_system_integrity?: Maybe<Scalars['String']['output']>;
};

export type CvsSv40AggregateSelection = {
  __typename?: 'CVSSv40AggregateSelection';
  attack_complexity: StringAggregateSelection;
  attack_requirements: StringAggregateSelection;
  attack_vector: StringAggregateSelection;
  base_score: FloatAggregateSelection;
  base_severity: StringAggregateSelection;
  count: Scalars['Int']['output'];
  exploit_maturity: StringAggregateSelection;
  privileges_required: StringAggregateSelection;
  subsequent_system_availability: StringAggregateSelection;
  subsequent_system_confidentiality: StringAggregateSelection;
  subsequent_system_integrity: StringAggregateSelection;
  user_interaction: StringAggregateSelection;
  vector_string: StringAggregateSelection;
  vulnerable_system_availability: StringAggregateSelection;
  vulnerable_system_confidentiality: StringAggregateSelection;
  vulnerable_system_integrity: StringAggregateSelection;
};

export type CvsSv40ConnectWhere = {
  node: CvsSv40Where;
};

export type CvsSv40CreateInput = {
  attack_complexity?: InputMaybe<Scalars['String']['input']>;
  attack_requirements?: InputMaybe<Scalars['String']['input']>;
  attack_vector?: InputMaybe<Scalars['String']['input']>;
  base_score?: InputMaybe<Scalars['Float']['input']>;
  base_severity?: InputMaybe<Scalars['String']['input']>;
  exploit_maturity?: InputMaybe<Scalars['String']['input']>;
  privileges_required?: InputMaybe<Scalars['String']['input']>;
  subsequent_system_availability?: InputMaybe<Scalars['String']['input']>;
  subsequent_system_confidentiality?: InputMaybe<Scalars['String']['input']>;
  subsequent_system_integrity?: InputMaybe<Scalars['String']['input']>;
  user_interaction?: InputMaybe<Scalars['String']['input']>;
  vector_string?: InputMaybe<Scalars['String']['input']>;
  vulnerable_system_availability?: InputMaybe<Scalars['String']['input']>;
  vulnerable_system_confidentiality?: InputMaybe<Scalars['String']['input']>;
  vulnerable_system_integrity?: InputMaybe<Scalars['String']['input']>;
};

export type CvsSv40Edge = {
  __typename?: 'CVSSv40Edge';
  cursor: Scalars['String']['output'];
  node: CvsSv40;
};

export type CvsSv40Options = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  /**
   * Specify one or more CVSSv40Sort objects to sort CvsSv40s by. The sorts will be
   * applied in the order in which they are arranged in the array.
   */
  sort?: InputMaybe<Array<CvsSv40Sort>>;
};

/**
 * Fields to sort CvsSv40s by. The order in which sorts are applied is not
 * guaranteed when specifying many fields in one CVSSv40Sort object.
 */
export type CvsSv40Sort = {
  _id?: InputMaybe<SortDirection>;
  attack_complexity?: InputMaybe<SortDirection>;
  attack_requirements?: InputMaybe<SortDirection>;
  attack_vector?: InputMaybe<SortDirection>;
  base_score?: InputMaybe<SortDirection>;
  base_severity?: InputMaybe<SortDirection>;
  exploit_maturity?: InputMaybe<SortDirection>;
  privileges_required?: InputMaybe<SortDirection>;
  subsequent_system_availability?: InputMaybe<SortDirection>;
  subsequent_system_confidentiality?: InputMaybe<SortDirection>;
  subsequent_system_integrity?: InputMaybe<SortDirection>;
  user_interaction?: InputMaybe<SortDirection>;
  vector_string?: InputMaybe<SortDirection>;
  vulnerable_system_availability?: InputMaybe<SortDirection>;
  vulnerable_system_confidentiality?: InputMaybe<SortDirection>;
  vulnerable_system_integrity?: InputMaybe<SortDirection>;
};

export type CvsSv40UpdateInput = {
  attack_complexity?: InputMaybe<Scalars['String']['input']>;
  attack_requirements?: InputMaybe<Scalars['String']['input']>;
  attack_vector?: InputMaybe<Scalars['String']['input']>;
  base_score?: InputMaybe<Scalars['Float']['input']>;
  base_score_ADD?: InputMaybe<Scalars['Float']['input']>;
  base_score_DIVIDE?: InputMaybe<Scalars['Float']['input']>;
  base_score_MULTIPLY?: InputMaybe<Scalars['Float']['input']>;
  base_score_SUBTRACT?: InputMaybe<Scalars['Float']['input']>;
  base_severity?: InputMaybe<Scalars['String']['input']>;
  exploit_maturity?: InputMaybe<Scalars['String']['input']>;
  privileges_required?: InputMaybe<Scalars['String']['input']>;
  subsequent_system_availability?: InputMaybe<Scalars['String']['input']>;
  subsequent_system_confidentiality?: InputMaybe<Scalars['String']['input']>;
  subsequent_system_integrity?: InputMaybe<Scalars['String']['input']>;
  user_interaction?: InputMaybe<Scalars['String']['input']>;
  vector_string?: InputMaybe<Scalars['String']['input']>;
  vulnerable_system_availability?: InputMaybe<Scalars['String']['input']>;
  vulnerable_system_confidentiality?: InputMaybe<Scalars['String']['input']>;
  vulnerable_system_integrity?: InputMaybe<Scalars['String']['input']>;
};

export type CvsSv40Where = {
  AND?: InputMaybe<Array<CvsSv40Where>>;
  NOT?: InputMaybe<CvsSv40Where>;
  OR?: InputMaybe<Array<CvsSv40Where>>;
  _id?: InputMaybe<Scalars['ID']['input']>;
  _id_CONTAINS?: InputMaybe<Scalars['ID']['input']>;
  _id_ENDS_WITH?: InputMaybe<Scalars['ID']['input']>;
  _id_IN?: InputMaybe<Array<Scalars['ID']['input']>>;
  _id_STARTS_WITH?: InputMaybe<Scalars['ID']['input']>;
  attack_complexity?: InputMaybe<Scalars['String']['input']>;
  attack_complexity_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  attack_complexity_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  attack_complexity_IN?: InputMaybe<
    Array<InputMaybe<Scalars['String']['input']>>
  >;
  attack_complexity_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
  attack_requirements?: InputMaybe<Scalars['String']['input']>;
  attack_requirements_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  attack_requirements_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  attack_requirements_IN?: InputMaybe<
    Array<InputMaybe<Scalars['String']['input']>>
  >;
  attack_requirements_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
  attack_vector?: InputMaybe<Scalars['String']['input']>;
  attack_vector_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  attack_vector_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  attack_vector_IN?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  attack_vector_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
  base_score?: InputMaybe<Scalars['Float']['input']>;
  base_score_GT?: InputMaybe<Scalars['Float']['input']>;
  base_score_GTE?: InputMaybe<Scalars['Float']['input']>;
  base_score_IN?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  base_score_LT?: InputMaybe<Scalars['Float']['input']>;
  base_score_LTE?: InputMaybe<Scalars['Float']['input']>;
  base_severity?: InputMaybe<Scalars['String']['input']>;
  base_severity_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  base_severity_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  base_severity_IN?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  base_severity_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
  exploit_maturity?: InputMaybe<Scalars['String']['input']>;
  exploit_maturity_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  exploit_maturity_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  exploit_maturity_IN?: InputMaybe<
    Array<InputMaybe<Scalars['String']['input']>>
  >;
  exploit_maturity_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
  privileges_required?: InputMaybe<Scalars['String']['input']>;
  privileges_required_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  privileges_required_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  privileges_required_IN?: InputMaybe<
    Array<InputMaybe<Scalars['String']['input']>>
  >;
  privileges_required_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
  subsequent_system_availability?: InputMaybe<Scalars['String']['input']>;
  subsequent_system_availability_CONTAINS?: InputMaybe<
    Scalars['String']['input']
  >;
  subsequent_system_availability_ENDS_WITH?: InputMaybe<
    Scalars['String']['input']
  >;
  subsequent_system_availability_IN?: InputMaybe<
    Array<InputMaybe<Scalars['String']['input']>>
  >;
  subsequent_system_availability_STARTS_WITH?: InputMaybe<
    Scalars['String']['input']
  >;
  subsequent_system_confidentiality?: InputMaybe<Scalars['String']['input']>;
  subsequent_system_confidentiality_CONTAINS?: InputMaybe<
    Scalars['String']['input']
  >;
  subsequent_system_confidentiality_ENDS_WITH?: InputMaybe<
    Scalars['String']['input']
  >;
  subsequent_system_confidentiality_IN?: InputMaybe<
    Array<InputMaybe<Scalars['String']['input']>>
  >;
  subsequent_system_confidentiality_STARTS_WITH?: InputMaybe<
    Scalars['String']['input']
  >;
  subsequent_system_integrity?: InputMaybe<Scalars['String']['input']>;
  subsequent_system_integrity_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  subsequent_system_integrity_ENDS_WITH?: InputMaybe<
    Scalars['String']['input']
  >;
  subsequent_system_integrity_IN?: InputMaybe<
    Array<InputMaybe<Scalars['String']['input']>>
  >;
  subsequent_system_integrity_STARTS_WITH?: InputMaybe<
    Scalars['String']['input']
  >;
  user_interaction?: InputMaybe<Scalars['String']['input']>;
  user_interaction_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  user_interaction_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  user_interaction_IN?: InputMaybe<
    Array<InputMaybe<Scalars['String']['input']>>
  >;
  user_interaction_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
  vector_string?: InputMaybe<Scalars['String']['input']>;
  vector_string_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  vector_string_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  vector_string_IN?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  vector_string_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
  vulnerable_system_availability?: InputMaybe<Scalars['String']['input']>;
  vulnerable_system_availability_CONTAINS?: InputMaybe<
    Scalars['String']['input']
  >;
  vulnerable_system_availability_ENDS_WITH?: InputMaybe<
    Scalars['String']['input']
  >;
  vulnerable_system_availability_IN?: InputMaybe<
    Array<InputMaybe<Scalars['String']['input']>>
  >;
  vulnerable_system_availability_STARTS_WITH?: InputMaybe<
    Scalars['String']['input']
  >;
  vulnerable_system_confidentiality?: InputMaybe<Scalars['String']['input']>;
  vulnerable_system_confidentiality_CONTAINS?: InputMaybe<
    Scalars['String']['input']
  >;
  vulnerable_system_confidentiality_ENDS_WITH?: InputMaybe<
    Scalars['String']['input']
  >;
  vulnerable_system_confidentiality_IN?: InputMaybe<
    Array<InputMaybe<Scalars['String']['input']>>
  >;
  vulnerable_system_confidentiality_STARTS_WITH?: InputMaybe<
    Scalars['String']['input']
  >;
  vulnerable_system_integrity?: InputMaybe<Scalars['String']['input']>;
  vulnerable_system_integrity_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  vulnerable_system_integrity_ENDS_WITH?: InputMaybe<
    Scalars['String']['input']
  >;
  vulnerable_system_integrity_IN?: InputMaybe<
    Array<InputMaybe<Scalars['String']['input']>>
  >;
  vulnerable_system_integrity_STARTS_WITH?: InputMaybe<
    Scalars['String']['input']
  >;
};

export type Component = {
  __typename?: 'Component';
  _id: Scalars['ID']['output'];
  from_mission_dependencies: Array<MissionDependency>;
  from_mission_dependenciesAggregate?: Maybe<ComponentMissionDependencyFrom_Mission_DependenciesAggregationSelection>;
  from_mission_dependenciesConnection: ComponentFrom_Mission_DependenciesConnection;
  hosts: Array<Host>;
  hostsAggregate?: Maybe<ComponentHostHostsAggregationSelection>;
  hostsConnection: ComponentHostsConnection;
  missions: Array<Mission>;
  missionsAggregate?: Maybe<ComponentMissionMissionsAggregationSelection>;
  missionsConnection: ComponentMissionsConnection;
  name: Scalars['String']['output'];
  to_mission_dependencies: Array<MissionDependency>;
  to_mission_dependenciesAggregate?: Maybe<ComponentMissionDependencyTo_Mission_DependenciesAggregationSelection>;
  to_mission_dependenciesConnection: ComponentTo_Mission_DependenciesConnection;
};

export type ComponentFrom_Mission_DependenciesArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  options?: InputMaybe<MissionDependencyOptions>;
  where?: InputMaybe<MissionDependencyWhere>;
};

export type ComponentFrom_Mission_DependenciesAggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<MissionDependencyWhere>;
};

export type ComponentFrom_Mission_DependenciesConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<ComponentFrom_Mission_DependenciesConnectionSort>>;
  where?: InputMaybe<ComponentFrom_Mission_DependenciesConnectionWhere>;
};

export type ComponentHostsArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  options?: InputMaybe<HostOptions>;
  where?: InputMaybe<HostWhere>;
};

export type ComponentHostsAggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<HostWhere>;
};

export type ComponentHostsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<ComponentHostsConnectionSort>>;
  where?: InputMaybe<ComponentHostsConnectionWhere>;
};

export type ComponentMissionsArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  options?: InputMaybe<MissionOptions>;
  where?: InputMaybe<MissionWhere>;
};

export type ComponentMissionsAggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<MissionWhere>;
};

export type ComponentMissionsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<ComponentMissionsConnectionSort>>;
  where?: InputMaybe<ComponentMissionsConnectionWhere>;
};

export type ComponentTo_Mission_DependenciesArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  options?: InputMaybe<MissionDependencyOptions>;
  where?: InputMaybe<MissionDependencyWhere>;
};

export type ComponentTo_Mission_DependenciesAggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<MissionDependencyWhere>;
};

export type ComponentTo_Mission_DependenciesConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<ComponentTo_Mission_DependenciesConnectionSort>>;
  where?: InputMaybe<ComponentTo_Mission_DependenciesConnectionWhere>;
};

export type ComponentAggregateSelection = {
  __typename?: 'ComponentAggregateSelection';
  count: Scalars['Int']['output'];
  name: StringAggregateSelection;
};

export type ComponentConnectInput = {
  from_mission_dependencies?: InputMaybe<
    Array<ComponentFrom_Mission_DependenciesConnectFieldInput>
  >;
  hosts?: InputMaybe<Array<ComponentHostsConnectFieldInput>>;
  missions?: InputMaybe<Array<ComponentMissionsConnectFieldInput>>;
  to_mission_dependencies?: InputMaybe<
    Array<ComponentTo_Mission_DependenciesConnectFieldInput>
  >;
};

export type ComponentConnectWhere = {
  node: ComponentWhere;
};

export type ComponentCreateInput = {
  from_mission_dependencies?: InputMaybe<ComponentFrom_Mission_DependenciesFieldInput>;
  hosts?: InputMaybe<ComponentHostsFieldInput>;
  missions?: InputMaybe<ComponentMissionsFieldInput>;
  name: Scalars['String']['input'];
  to_mission_dependencies?: InputMaybe<ComponentTo_Mission_DependenciesFieldInput>;
};

export type ComponentDeleteInput = {
  from_mission_dependencies?: InputMaybe<
    Array<ComponentFrom_Mission_DependenciesDeleteFieldInput>
  >;
  hosts?: InputMaybe<Array<ComponentHostsDeleteFieldInput>>;
  missions?: InputMaybe<Array<ComponentMissionsDeleteFieldInput>>;
  to_mission_dependencies?: InputMaybe<
    Array<ComponentTo_Mission_DependenciesDeleteFieldInput>
  >;
};

export type ComponentDisconnectInput = {
  from_mission_dependencies?: InputMaybe<
    Array<ComponentFrom_Mission_DependenciesDisconnectFieldInput>
  >;
  hosts?: InputMaybe<Array<ComponentHostsDisconnectFieldInput>>;
  missions?: InputMaybe<Array<ComponentMissionsDisconnectFieldInput>>;
  to_mission_dependencies?: InputMaybe<
    Array<ComponentTo_Mission_DependenciesDisconnectFieldInput>
  >;
};

export type ComponentEdge = {
  __typename?: 'ComponentEdge';
  cursor: Scalars['String']['output'];
  node: Component;
};

export type ComponentFrom_Mission_DependenciesAggregateInput = {
  AND?: InputMaybe<Array<ComponentFrom_Mission_DependenciesAggregateInput>>;
  NOT?: InputMaybe<ComponentFrom_Mission_DependenciesAggregateInput>;
  OR?: InputMaybe<Array<ComponentFrom_Mission_DependenciesAggregateInput>>;
  count?: InputMaybe<Scalars['Int']['input']>;
  count_GT?: InputMaybe<Scalars['Int']['input']>;
  count_GTE?: InputMaybe<Scalars['Int']['input']>;
  count_LT?: InputMaybe<Scalars['Int']['input']>;
  count_LTE?: InputMaybe<Scalars['Int']['input']>;
};

export type ComponentFrom_Mission_DependenciesConnectFieldInput = {
  connect?: InputMaybe<Array<MissionDependencyConnectInput>>;
  /** Whether or not to overwrite any matching relationship with the new properties. */
  overwrite?: Scalars['Boolean']['input'];
  where?: InputMaybe<MissionDependencyConnectWhere>;
};

export type ComponentFrom_Mission_DependenciesConnection = {
  __typename?: 'ComponentFrom_mission_dependenciesConnection';
  edges: Array<ComponentFrom_Mission_DependenciesRelationship>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type ComponentFrom_Mission_DependenciesConnectionSort = {
  node?: InputMaybe<MissionDependencySort>;
};

export type ComponentFrom_Mission_DependenciesConnectionWhere = {
  AND?: InputMaybe<Array<ComponentFrom_Mission_DependenciesConnectionWhere>>;
  NOT?: InputMaybe<ComponentFrom_Mission_DependenciesConnectionWhere>;
  OR?: InputMaybe<Array<ComponentFrom_Mission_DependenciesConnectionWhere>>;
  node?: InputMaybe<MissionDependencyWhere>;
};

export type ComponentFrom_Mission_DependenciesCreateFieldInput = {
  node: MissionDependencyCreateInput;
};

export type ComponentFrom_Mission_DependenciesDeleteFieldInput = {
  delete?: InputMaybe<MissionDependencyDeleteInput>;
  where?: InputMaybe<ComponentFrom_Mission_DependenciesConnectionWhere>;
};

export type ComponentFrom_Mission_DependenciesDisconnectFieldInput = {
  disconnect?: InputMaybe<MissionDependencyDisconnectInput>;
  where?: InputMaybe<ComponentFrom_Mission_DependenciesConnectionWhere>;
};

export type ComponentFrom_Mission_DependenciesFieldInput = {
  connect?: InputMaybe<
    Array<ComponentFrom_Mission_DependenciesConnectFieldInput>
  >;
  create?: InputMaybe<
    Array<ComponentFrom_Mission_DependenciesCreateFieldInput>
  >;
};

export type ComponentFrom_Mission_DependenciesRelationship = {
  __typename?: 'ComponentFrom_mission_dependenciesRelationship';
  cursor: Scalars['String']['output'];
  node: MissionDependency;
};

export type ComponentFrom_Mission_DependenciesUpdateConnectionInput = {
  node?: InputMaybe<MissionDependencyUpdateInput>;
};

export type ComponentFrom_Mission_DependenciesUpdateFieldInput = {
  connect?: InputMaybe<
    Array<ComponentFrom_Mission_DependenciesConnectFieldInput>
  >;
  create?: InputMaybe<
    Array<ComponentFrom_Mission_DependenciesCreateFieldInput>
  >;
  delete?: InputMaybe<
    Array<ComponentFrom_Mission_DependenciesDeleteFieldInput>
  >;
  disconnect?: InputMaybe<
    Array<ComponentFrom_Mission_DependenciesDisconnectFieldInput>
  >;
  update?: InputMaybe<ComponentFrom_Mission_DependenciesUpdateConnectionInput>;
  where?: InputMaybe<ComponentFrom_Mission_DependenciesConnectionWhere>;
};

export type ComponentHostHostsAggregationSelection = {
  __typename?: 'ComponentHostHostsAggregationSelection';
  count: Scalars['Int']['output'];
  node?: Maybe<ComponentHostHostsNodeAggregateSelection>;
};

export type ComponentHostHostsNodeAggregateSelection = {
  __typename?: 'ComponentHostHostsNodeAggregateSelection';
  hostname: StringAggregateSelection;
};

export type ComponentHostsAggregateInput = {
  AND?: InputMaybe<Array<ComponentHostsAggregateInput>>;
  NOT?: InputMaybe<ComponentHostsAggregateInput>;
  OR?: InputMaybe<Array<ComponentHostsAggregateInput>>;
  count?: InputMaybe<Scalars['Int']['input']>;
  count_GT?: InputMaybe<Scalars['Int']['input']>;
  count_GTE?: InputMaybe<Scalars['Int']['input']>;
  count_LT?: InputMaybe<Scalars['Int']['input']>;
  count_LTE?: InputMaybe<Scalars['Int']['input']>;
  node?: InputMaybe<ComponentHostsNodeAggregationWhereInput>;
};

export type ComponentHostsConnectFieldInput = {
  connect?: InputMaybe<Array<HostConnectInput>>;
  /** Whether or not to overwrite any matching relationship with the new properties. */
  overwrite?: Scalars['Boolean']['input'];
  where?: InputMaybe<HostConnectWhere>;
};

export type ComponentHostsConnection = {
  __typename?: 'ComponentHostsConnection';
  edges: Array<ComponentHostsRelationship>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type ComponentHostsConnectionSort = {
  node?: InputMaybe<HostSort>;
};

export type ComponentHostsConnectionWhere = {
  AND?: InputMaybe<Array<ComponentHostsConnectionWhere>>;
  NOT?: InputMaybe<ComponentHostsConnectionWhere>;
  OR?: InputMaybe<Array<ComponentHostsConnectionWhere>>;
  node?: InputMaybe<HostWhere>;
};

export type ComponentHostsCreateFieldInput = {
  node: HostCreateInput;
};

export type ComponentHostsDeleteFieldInput = {
  delete?: InputMaybe<HostDeleteInput>;
  where?: InputMaybe<ComponentHostsConnectionWhere>;
};

export type ComponentHostsDisconnectFieldInput = {
  disconnect?: InputMaybe<HostDisconnectInput>;
  where?: InputMaybe<ComponentHostsConnectionWhere>;
};

export type ComponentHostsFieldInput = {
  connect?: InputMaybe<Array<ComponentHostsConnectFieldInput>>;
  create?: InputMaybe<Array<ComponentHostsCreateFieldInput>>;
};

export type ComponentHostsNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<ComponentHostsNodeAggregationWhereInput>>;
  NOT?: InputMaybe<ComponentHostsNodeAggregationWhereInput>;
  OR?: InputMaybe<Array<ComponentHostsNodeAggregationWhereInput>>;
  hostname_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  hostname_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  hostname_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  hostname_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  hostname_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  hostname_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  hostname_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  hostname_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  hostname_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  hostname_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  hostname_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  hostname_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  hostname_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  hostname_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  hostname_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
};

export type ComponentHostsRelationship = {
  __typename?: 'ComponentHostsRelationship';
  cursor: Scalars['String']['output'];
  node: Host;
};

export type ComponentHostsUpdateConnectionInput = {
  node?: InputMaybe<HostUpdateInput>;
};

export type ComponentHostsUpdateFieldInput = {
  connect?: InputMaybe<Array<ComponentHostsConnectFieldInput>>;
  create?: InputMaybe<Array<ComponentHostsCreateFieldInput>>;
  delete?: InputMaybe<Array<ComponentHostsDeleteFieldInput>>;
  disconnect?: InputMaybe<Array<ComponentHostsDisconnectFieldInput>>;
  update?: InputMaybe<ComponentHostsUpdateConnectionInput>;
  where?: InputMaybe<ComponentHostsConnectionWhere>;
};

export type ComponentMissionDependencyFrom_Mission_DependenciesAggregationSelection =
  {
    __typename?: 'ComponentMissionDependencyFrom_mission_dependenciesAggregationSelection';
    count: Scalars['Int']['output'];
  };

export type ComponentMissionDependencyTo_Mission_DependenciesAggregationSelection =
  {
    __typename?: 'ComponentMissionDependencyTo_mission_dependenciesAggregationSelection';
    count: Scalars['Int']['output'];
  };

export type ComponentMissionMissionsAggregationSelection = {
  __typename?: 'ComponentMissionMissionsAggregationSelection';
  count: Scalars['Int']['output'];
  node?: Maybe<ComponentMissionMissionsNodeAggregateSelection>;
};

export type ComponentMissionMissionsNodeAggregateSelection = {
  __typename?: 'ComponentMissionMissionsNodeAggregateSelection';
  availability_requirement: IntAggregateSelection;
  confidentiality_requirement: IntAggregateSelection;
  criticality: IntAggregateSelection;
  description: StringAggregateSelection;
  integrity_requirement: IntAggregateSelection;
  name: StringAggregateSelection;
  structure: StringAggregateSelection;
};

export type ComponentMissionsAggregateInput = {
  AND?: InputMaybe<Array<ComponentMissionsAggregateInput>>;
  NOT?: InputMaybe<ComponentMissionsAggregateInput>;
  OR?: InputMaybe<Array<ComponentMissionsAggregateInput>>;
  count?: InputMaybe<Scalars['Int']['input']>;
  count_GT?: InputMaybe<Scalars['Int']['input']>;
  count_GTE?: InputMaybe<Scalars['Int']['input']>;
  count_LT?: InputMaybe<Scalars['Int']['input']>;
  count_LTE?: InputMaybe<Scalars['Int']['input']>;
  node?: InputMaybe<ComponentMissionsNodeAggregationWhereInput>;
};

export type ComponentMissionsConnectFieldInput = {
  connect?: InputMaybe<Array<MissionConnectInput>>;
  /** Whether or not to overwrite any matching relationship with the new properties. */
  overwrite?: Scalars['Boolean']['input'];
  where?: InputMaybe<MissionConnectWhere>;
};

export type ComponentMissionsConnection = {
  __typename?: 'ComponentMissionsConnection';
  edges: Array<ComponentMissionsRelationship>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type ComponentMissionsConnectionSort = {
  node?: InputMaybe<MissionSort>;
};

export type ComponentMissionsConnectionWhere = {
  AND?: InputMaybe<Array<ComponentMissionsConnectionWhere>>;
  NOT?: InputMaybe<ComponentMissionsConnectionWhere>;
  OR?: InputMaybe<Array<ComponentMissionsConnectionWhere>>;
  node?: InputMaybe<MissionWhere>;
};

export type ComponentMissionsCreateFieldInput = {
  node: MissionCreateInput;
};

export type ComponentMissionsDeleteFieldInput = {
  delete?: InputMaybe<MissionDeleteInput>;
  where?: InputMaybe<ComponentMissionsConnectionWhere>;
};

export type ComponentMissionsDisconnectFieldInput = {
  disconnect?: InputMaybe<MissionDisconnectInput>;
  where?: InputMaybe<ComponentMissionsConnectionWhere>;
};

export type ComponentMissionsFieldInput = {
  connect?: InputMaybe<Array<ComponentMissionsConnectFieldInput>>;
  create?: InputMaybe<Array<ComponentMissionsCreateFieldInput>>;
};

export type ComponentMissionsNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<ComponentMissionsNodeAggregationWhereInput>>;
  NOT?: InputMaybe<ComponentMissionsNodeAggregationWhereInput>;
  OR?: InputMaybe<Array<ComponentMissionsNodeAggregationWhereInput>>;
  availability_requirement_AVERAGE_EQUAL?: InputMaybe<
    Scalars['Float']['input']
  >;
  availability_requirement_AVERAGE_GT?: InputMaybe<Scalars['Float']['input']>;
  availability_requirement_AVERAGE_GTE?: InputMaybe<Scalars['Float']['input']>;
  availability_requirement_AVERAGE_LT?: InputMaybe<Scalars['Float']['input']>;
  availability_requirement_AVERAGE_LTE?: InputMaybe<Scalars['Float']['input']>;
  availability_requirement_MAX_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  availability_requirement_MAX_GT?: InputMaybe<Scalars['Int']['input']>;
  availability_requirement_MAX_GTE?: InputMaybe<Scalars['Int']['input']>;
  availability_requirement_MAX_LT?: InputMaybe<Scalars['Int']['input']>;
  availability_requirement_MAX_LTE?: InputMaybe<Scalars['Int']['input']>;
  availability_requirement_MIN_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  availability_requirement_MIN_GT?: InputMaybe<Scalars['Int']['input']>;
  availability_requirement_MIN_GTE?: InputMaybe<Scalars['Int']['input']>;
  availability_requirement_MIN_LT?: InputMaybe<Scalars['Int']['input']>;
  availability_requirement_MIN_LTE?: InputMaybe<Scalars['Int']['input']>;
  availability_requirement_SUM_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  availability_requirement_SUM_GT?: InputMaybe<Scalars['Int']['input']>;
  availability_requirement_SUM_GTE?: InputMaybe<Scalars['Int']['input']>;
  availability_requirement_SUM_LT?: InputMaybe<Scalars['Int']['input']>;
  availability_requirement_SUM_LTE?: InputMaybe<Scalars['Int']['input']>;
  confidentiality_requirement_AVERAGE_EQUAL?: InputMaybe<
    Scalars['Float']['input']
  >;
  confidentiality_requirement_AVERAGE_GT?: InputMaybe<
    Scalars['Float']['input']
  >;
  confidentiality_requirement_AVERAGE_GTE?: InputMaybe<
    Scalars['Float']['input']
  >;
  confidentiality_requirement_AVERAGE_LT?: InputMaybe<
    Scalars['Float']['input']
  >;
  confidentiality_requirement_AVERAGE_LTE?: InputMaybe<
    Scalars['Float']['input']
  >;
  confidentiality_requirement_MAX_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  confidentiality_requirement_MAX_GT?: InputMaybe<Scalars['Int']['input']>;
  confidentiality_requirement_MAX_GTE?: InputMaybe<Scalars['Int']['input']>;
  confidentiality_requirement_MAX_LT?: InputMaybe<Scalars['Int']['input']>;
  confidentiality_requirement_MAX_LTE?: InputMaybe<Scalars['Int']['input']>;
  confidentiality_requirement_MIN_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  confidentiality_requirement_MIN_GT?: InputMaybe<Scalars['Int']['input']>;
  confidentiality_requirement_MIN_GTE?: InputMaybe<Scalars['Int']['input']>;
  confidentiality_requirement_MIN_LT?: InputMaybe<Scalars['Int']['input']>;
  confidentiality_requirement_MIN_LTE?: InputMaybe<Scalars['Int']['input']>;
  confidentiality_requirement_SUM_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  confidentiality_requirement_SUM_GT?: InputMaybe<Scalars['Int']['input']>;
  confidentiality_requirement_SUM_GTE?: InputMaybe<Scalars['Int']['input']>;
  confidentiality_requirement_SUM_LT?: InputMaybe<Scalars['Int']['input']>;
  confidentiality_requirement_SUM_LTE?: InputMaybe<Scalars['Int']['input']>;
  criticality_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  criticality_AVERAGE_GT?: InputMaybe<Scalars['Float']['input']>;
  criticality_AVERAGE_GTE?: InputMaybe<Scalars['Float']['input']>;
  criticality_AVERAGE_LT?: InputMaybe<Scalars['Float']['input']>;
  criticality_AVERAGE_LTE?: InputMaybe<Scalars['Float']['input']>;
  criticality_MAX_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  criticality_MAX_GT?: InputMaybe<Scalars['Int']['input']>;
  criticality_MAX_GTE?: InputMaybe<Scalars['Int']['input']>;
  criticality_MAX_LT?: InputMaybe<Scalars['Int']['input']>;
  criticality_MAX_LTE?: InputMaybe<Scalars['Int']['input']>;
  criticality_MIN_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  criticality_MIN_GT?: InputMaybe<Scalars['Int']['input']>;
  criticality_MIN_GTE?: InputMaybe<Scalars['Int']['input']>;
  criticality_MIN_LT?: InputMaybe<Scalars['Int']['input']>;
  criticality_MIN_LTE?: InputMaybe<Scalars['Int']['input']>;
  criticality_SUM_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  criticality_SUM_GT?: InputMaybe<Scalars['Int']['input']>;
  criticality_SUM_GTE?: InputMaybe<Scalars['Int']['input']>;
  criticality_SUM_LT?: InputMaybe<Scalars['Int']['input']>;
  criticality_SUM_LTE?: InputMaybe<Scalars['Int']['input']>;
  description_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  description_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  description_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  description_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  description_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  description_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  description_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  description_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  description_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  description_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  description_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  description_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  description_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  description_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  description_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  integrity_requirement_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  integrity_requirement_AVERAGE_GT?: InputMaybe<Scalars['Float']['input']>;
  integrity_requirement_AVERAGE_GTE?: InputMaybe<Scalars['Float']['input']>;
  integrity_requirement_AVERAGE_LT?: InputMaybe<Scalars['Float']['input']>;
  integrity_requirement_AVERAGE_LTE?: InputMaybe<Scalars['Float']['input']>;
  integrity_requirement_MAX_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  integrity_requirement_MAX_GT?: InputMaybe<Scalars['Int']['input']>;
  integrity_requirement_MAX_GTE?: InputMaybe<Scalars['Int']['input']>;
  integrity_requirement_MAX_LT?: InputMaybe<Scalars['Int']['input']>;
  integrity_requirement_MAX_LTE?: InputMaybe<Scalars['Int']['input']>;
  integrity_requirement_MIN_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  integrity_requirement_MIN_GT?: InputMaybe<Scalars['Int']['input']>;
  integrity_requirement_MIN_GTE?: InputMaybe<Scalars['Int']['input']>;
  integrity_requirement_MIN_LT?: InputMaybe<Scalars['Int']['input']>;
  integrity_requirement_MIN_LTE?: InputMaybe<Scalars['Int']['input']>;
  integrity_requirement_SUM_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  integrity_requirement_SUM_GT?: InputMaybe<Scalars['Int']['input']>;
  integrity_requirement_SUM_GTE?: InputMaybe<Scalars['Int']['input']>;
  integrity_requirement_SUM_LT?: InputMaybe<Scalars['Int']['input']>;
  integrity_requirement_SUM_LTE?: InputMaybe<Scalars['Int']['input']>;
  name_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  structure_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  structure_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  structure_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  structure_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  structure_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  structure_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  structure_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  structure_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  structure_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  structure_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  structure_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  structure_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  structure_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  structure_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  structure_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
};

export type ComponentMissionsRelationship = {
  __typename?: 'ComponentMissionsRelationship';
  cursor: Scalars['String']['output'];
  node: Mission;
};

export type ComponentMissionsUpdateConnectionInput = {
  node?: InputMaybe<MissionUpdateInput>;
};

export type ComponentMissionsUpdateFieldInput = {
  connect?: InputMaybe<Array<ComponentMissionsConnectFieldInput>>;
  create?: InputMaybe<Array<ComponentMissionsCreateFieldInput>>;
  delete?: InputMaybe<Array<ComponentMissionsDeleteFieldInput>>;
  disconnect?: InputMaybe<Array<ComponentMissionsDisconnectFieldInput>>;
  update?: InputMaybe<ComponentMissionsUpdateConnectionInput>;
  where?: InputMaybe<ComponentMissionsConnectionWhere>;
};

export type ComponentOptions = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  /**
   * Specify one or more ComponentSort objects to sort Components by. The sorts
   * will be applied in the order in which they are arranged in the array.
   */
  sort?: InputMaybe<Array<ComponentSort>>;
};

export type ComponentRelationInput = {
  from_mission_dependencies?: InputMaybe<
    Array<ComponentFrom_Mission_DependenciesCreateFieldInput>
  >;
  hosts?: InputMaybe<Array<ComponentHostsCreateFieldInput>>;
  missions?: InputMaybe<Array<ComponentMissionsCreateFieldInput>>;
  to_mission_dependencies?: InputMaybe<
    Array<ComponentTo_Mission_DependenciesCreateFieldInput>
  >;
};

/**
 * Fields to sort Components by. The order in which sorts are applied is not
 * guaranteed when specifying many fields in one ComponentSort object.
 */
export type ComponentSort = {
  _id?: InputMaybe<SortDirection>;
  name?: InputMaybe<SortDirection>;
};

export type ComponentTo_Mission_DependenciesAggregateInput = {
  AND?: InputMaybe<Array<ComponentTo_Mission_DependenciesAggregateInput>>;
  NOT?: InputMaybe<ComponentTo_Mission_DependenciesAggregateInput>;
  OR?: InputMaybe<Array<ComponentTo_Mission_DependenciesAggregateInput>>;
  count?: InputMaybe<Scalars['Int']['input']>;
  count_GT?: InputMaybe<Scalars['Int']['input']>;
  count_GTE?: InputMaybe<Scalars['Int']['input']>;
  count_LT?: InputMaybe<Scalars['Int']['input']>;
  count_LTE?: InputMaybe<Scalars['Int']['input']>;
};

export type ComponentTo_Mission_DependenciesConnectFieldInput = {
  connect?: InputMaybe<Array<MissionDependencyConnectInput>>;
  /** Whether or not to overwrite any matching relationship with the new properties. */
  overwrite?: Scalars['Boolean']['input'];
  where?: InputMaybe<MissionDependencyConnectWhere>;
};

export type ComponentTo_Mission_DependenciesConnection = {
  __typename?: 'ComponentTo_mission_dependenciesConnection';
  edges: Array<ComponentTo_Mission_DependenciesRelationship>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type ComponentTo_Mission_DependenciesConnectionSort = {
  node?: InputMaybe<MissionDependencySort>;
};

export type ComponentTo_Mission_DependenciesConnectionWhere = {
  AND?: InputMaybe<Array<ComponentTo_Mission_DependenciesConnectionWhere>>;
  NOT?: InputMaybe<ComponentTo_Mission_DependenciesConnectionWhere>;
  OR?: InputMaybe<Array<ComponentTo_Mission_DependenciesConnectionWhere>>;
  node?: InputMaybe<MissionDependencyWhere>;
};

export type ComponentTo_Mission_DependenciesCreateFieldInput = {
  node: MissionDependencyCreateInput;
};

export type ComponentTo_Mission_DependenciesDeleteFieldInput = {
  delete?: InputMaybe<MissionDependencyDeleteInput>;
  where?: InputMaybe<ComponentTo_Mission_DependenciesConnectionWhere>;
};

export type ComponentTo_Mission_DependenciesDisconnectFieldInput = {
  disconnect?: InputMaybe<MissionDependencyDisconnectInput>;
  where?: InputMaybe<ComponentTo_Mission_DependenciesConnectionWhere>;
};

export type ComponentTo_Mission_DependenciesFieldInput = {
  connect?: InputMaybe<
    Array<ComponentTo_Mission_DependenciesConnectFieldInput>
  >;
  create?: InputMaybe<Array<ComponentTo_Mission_DependenciesCreateFieldInput>>;
};

export type ComponentTo_Mission_DependenciesRelationship = {
  __typename?: 'ComponentTo_mission_dependenciesRelationship';
  cursor: Scalars['String']['output'];
  node: MissionDependency;
};

export type ComponentTo_Mission_DependenciesUpdateConnectionInput = {
  node?: InputMaybe<MissionDependencyUpdateInput>;
};

export type ComponentTo_Mission_DependenciesUpdateFieldInput = {
  connect?: InputMaybe<
    Array<ComponentTo_Mission_DependenciesConnectFieldInput>
  >;
  create?: InputMaybe<Array<ComponentTo_Mission_DependenciesCreateFieldInput>>;
  delete?: InputMaybe<Array<ComponentTo_Mission_DependenciesDeleteFieldInput>>;
  disconnect?: InputMaybe<
    Array<ComponentTo_Mission_DependenciesDisconnectFieldInput>
  >;
  update?: InputMaybe<ComponentTo_Mission_DependenciesUpdateConnectionInput>;
  where?: InputMaybe<ComponentTo_Mission_DependenciesConnectionWhere>;
};

export type ComponentUpdateInput = {
  from_mission_dependencies?: InputMaybe<
    Array<ComponentFrom_Mission_DependenciesUpdateFieldInput>
  >;
  hosts?: InputMaybe<Array<ComponentHostsUpdateFieldInput>>;
  missions?: InputMaybe<Array<ComponentMissionsUpdateFieldInput>>;
  name?: InputMaybe<Scalars['String']['input']>;
  to_mission_dependencies?: InputMaybe<
    Array<ComponentTo_Mission_DependenciesUpdateFieldInput>
  >;
};

export type ComponentWhere = {
  AND?: InputMaybe<Array<ComponentWhere>>;
  NOT?: InputMaybe<ComponentWhere>;
  OR?: InputMaybe<Array<ComponentWhere>>;
  _id?: InputMaybe<Scalars['ID']['input']>;
  _id_CONTAINS?: InputMaybe<Scalars['ID']['input']>;
  _id_ENDS_WITH?: InputMaybe<Scalars['ID']['input']>;
  _id_IN?: InputMaybe<Array<Scalars['ID']['input']>>;
  _id_STARTS_WITH?: InputMaybe<Scalars['ID']['input']>;
  from_mission_dependenciesAggregate?: InputMaybe<ComponentFrom_Mission_DependenciesAggregateInput>;
  /** Return Components where all of the related ComponentFrom_mission_dependenciesConnections match this filter */
  from_mission_dependenciesConnection_ALL?: InputMaybe<ComponentFrom_Mission_DependenciesConnectionWhere>;
  /** Return Components where none of the related ComponentFrom_mission_dependenciesConnections match this filter */
  from_mission_dependenciesConnection_NONE?: InputMaybe<ComponentFrom_Mission_DependenciesConnectionWhere>;
  /** Return Components where one of the related ComponentFrom_mission_dependenciesConnections match this filter */
  from_mission_dependenciesConnection_SINGLE?: InputMaybe<ComponentFrom_Mission_DependenciesConnectionWhere>;
  /** Return Components where some of the related ComponentFrom_mission_dependenciesConnections match this filter */
  from_mission_dependenciesConnection_SOME?: InputMaybe<ComponentFrom_Mission_DependenciesConnectionWhere>;
  /** Return Components where all of the related MissionDependencies match this filter */
  from_mission_dependencies_ALL?: InputMaybe<MissionDependencyWhere>;
  /** Return Components where none of the related MissionDependencies match this filter */
  from_mission_dependencies_NONE?: InputMaybe<MissionDependencyWhere>;
  /** Return Components where one of the related MissionDependencies match this filter */
  from_mission_dependencies_SINGLE?: InputMaybe<MissionDependencyWhere>;
  /** Return Components where some of the related MissionDependencies match this filter */
  from_mission_dependencies_SOME?: InputMaybe<MissionDependencyWhere>;
  hostsAggregate?: InputMaybe<ComponentHostsAggregateInput>;
  /** Return Components where all of the related ComponentHostsConnections match this filter */
  hostsConnection_ALL?: InputMaybe<ComponentHostsConnectionWhere>;
  /** Return Components where none of the related ComponentHostsConnections match this filter */
  hostsConnection_NONE?: InputMaybe<ComponentHostsConnectionWhere>;
  /** Return Components where one of the related ComponentHostsConnections match this filter */
  hostsConnection_SINGLE?: InputMaybe<ComponentHostsConnectionWhere>;
  /** Return Components where some of the related ComponentHostsConnections match this filter */
  hostsConnection_SOME?: InputMaybe<ComponentHostsConnectionWhere>;
  /** Return Components where all of the related Hosts match this filter */
  hosts_ALL?: InputMaybe<HostWhere>;
  /** Return Components where none of the related Hosts match this filter */
  hosts_NONE?: InputMaybe<HostWhere>;
  /** Return Components where one of the related Hosts match this filter */
  hosts_SINGLE?: InputMaybe<HostWhere>;
  /** Return Components where some of the related Hosts match this filter */
  hosts_SOME?: InputMaybe<HostWhere>;
  missionsAggregate?: InputMaybe<ComponentMissionsAggregateInput>;
  /** Return Components where all of the related ComponentMissionsConnections match this filter */
  missionsConnection_ALL?: InputMaybe<ComponentMissionsConnectionWhere>;
  /** Return Components where none of the related ComponentMissionsConnections match this filter */
  missionsConnection_NONE?: InputMaybe<ComponentMissionsConnectionWhere>;
  /** Return Components where one of the related ComponentMissionsConnections match this filter */
  missionsConnection_SINGLE?: InputMaybe<ComponentMissionsConnectionWhere>;
  /** Return Components where some of the related ComponentMissionsConnections match this filter */
  missionsConnection_SOME?: InputMaybe<ComponentMissionsConnectionWhere>;
  /** Return Components where all of the related Missions match this filter */
  missions_ALL?: InputMaybe<MissionWhere>;
  /** Return Components where none of the related Missions match this filter */
  missions_NONE?: InputMaybe<MissionWhere>;
  /** Return Components where one of the related Missions match this filter */
  missions_SINGLE?: InputMaybe<MissionWhere>;
  /** Return Components where some of the related Missions match this filter */
  missions_SOME?: InputMaybe<MissionWhere>;
  name?: InputMaybe<Scalars['String']['input']>;
  name_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  name_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  name_IN?: InputMaybe<Array<Scalars['String']['input']>>;
  name_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
  to_mission_dependenciesAggregate?: InputMaybe<ComponentTo_Mission_DependenciesAggregateInput>;
  /** Return Components where all of the related ComponentTo_mission_dependenciesConnections match this filter */
  to_mission_dependenciesConnection_ALL?: InputMaybe<ComponentTo_Mission_DependenciesConnectionWhere>;
  /** Return Components where none of the related ComponentTo_mission_dependenciesConnections match this filter */
  to_mission_dependenciesConnection_NONE?: InputMaybe<ComponentTo_Mission_DependenciesConnectionWhere>;
  /** Return Components where one of the related ComponentTo_mission_dependenciesConnections match this filter */
  to_mission_dependenciesConnection_SINGLE?: InputMaybe<ComponentTo_Mission_DependenciesConnectionWhere>;
  /** Return Components where some of the related ComponentTo_mission_dependenciesConnections match this filter */
  to_mission_dependenciesConnection_SOME?: InputMaybe<ComponentTo_Mission_DependenciesConnectionWhere>;
  /** Return Components where all of the related MissionDependencies match this filter */
  to_mission_dependencies_ALL?: InputMaybe<MissionDependencyWhere>;
  /** Return Components where none of the related MissionDependencies match this filter */
  to_mission_dependencies_NONE?: InputMaybe<MissionDependencyWhere>;
  /** Return Components where one of the related MissionDependencies match this filter */
  to_mission_dependencies_SINGLE?: InputMaybe<MissionDependencyWhere>;
  /** Return Components where some of the related MissionDependencies match this filter */
  to_mission_dependencies_SOME?: InputMaybe<MissionDependencyWhere>;
};

export type ComponentsConnection = {
  __typename?: 'ComponentsConnection';
  edges: Array<ComponentEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type Contact = {
  __typename?: 'Contact';
  _id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  subnets: Array<Subnet>;
  subnetsAggregate?: Maybe<ContactSubnetSubnetsAggregationSelection>;
  subnetsConnection: ContactSubnetsConnection;
};

export type ContactSubnetsArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  options?: InputMaybe<SubnetOptions>;
  where?: InputMaybe<SubnetWhere>;
};

export type ContactSubnetsAggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<SubnetWhere>;
};

export type ContactSubnetsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<ContactSubnetsConnectionSort>>;
  where?: InputMaybe<ContactSubnetsConnectionWhere>;
};

export type ContactAggregateSelection = {
  __typename?: 'ContactAggregateSelection';
  count: Scalars['Int']['output'];
  name: StringAggregateSelection;
};

export type ContactConnectInput = {
  subnets?: InputMaybe<Array<ContactSubnetsConnectFieldInput>>;
};

export type ContactConnectWhere = {
  node: ContactWhere;
};

export type ContactCreateInput = {
  name: Scalars['String']['input'];
  subnets?: InputMaybe<ContactSubnetsFieldInput>;
};

export type ContactDeleteInput = {
  subnets?: InputMaybe<Array<ContactSubnetsDeleteFieldInput>>;
};

export type ContactDisconnectInput = {
  subnets?: InputMaybe<Array<ContactSubnetsDisconnectFieldInput>>;
};

export type ContactEdge = {
  __typename?: 'ContactEdge';
  cursor: Scalars['String']['output'];
  node: Contact;
};

export type ContactOptions = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  /**
   * Specify one or more ContactSort objects to sort Contacts by. The sorts will be
   * applied in the order in which they are arranged in the array.
   */
  sort?: InputMaybe<Array<ContactSort>>;
};

export type ContactRelationInput = {
  subnets?: InputMaybe<Array<ContactSubnetsCreateFieldInput>>;
};

/**
 * Fields to sort Contacts by. The order in which sorts are applied is not
 * guaranteed when specifying many fields in one ContactSort object.
 */
export type ContactSort = {
  _id?: InputMaybe<SortDirection>;
  name?: InputMaybe<SortDirection>;
};

export type ContactSubnetSubnetsAggregationSelection = {
  __typename?: 'ContactSubnetSubnetsAggregationSelection';
  count: Scalars['Int']['output'];
  node?: Maybe<ContactSubnetSubnetsNodeAggregateSelection>;
};

export type ContactSubnetSubnetsNodeAggregateSelection = {
  __typename?: 'ContactSubnetSubnetsNodeAggregateSelection';
  note: StringAggregateSelection;
  range: StringAggregateSelection;
};

export type ContactSubnetsAggregateInput = {
  AND?: InputMaybe<Array<ContactSubnetsAggregateInput>>;
  NOT?: InputMaybe<ContactSubnetsAggregateInput>;
  OR?: InputMaybe<Array<ContactSubnetsAggregateInput>>;
  count?: InputMaybe<Scalars['Int']['input']>;
  count_GT?: InputMaybe<Scalars['Int']['input']>;
  count_GTE?: InputMaybe<Scalars['Int']['input']>;
  count_LT?: InputMaybe<Scalars['Int']['input']>;
  count_LTE?: InputMaybe<Scalars['Int']['input']>;
  node?: InputMaybe<ContactSubnetsNodeAggregationWhereInput>;
};

export type ContactSubnetsConnectFieldInput = {
  connect?: InputMaybe<Array<SubnetConnectInput>>;
  /** Whether or not to overwrite any matching relationship with the new properties. */
  overwrite?: Scalars['Boolean']['input'];
  where?: InputMaybe<SubnetConnectWhere>;
};

export type ContactSubnetsConnection = {
  __typename?: 'ContactSubnetsConnection';
  edges: Array<ContactSubnetsRelationship>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type ContactSubnetsConnectionSort = {
  node?: InputMaybe<SubnetSort>;
};

export type ContactSubnetsConnectionWhere = {
  AND?: InputMaybe<Array<ContactSubnetsConnectionWhere>>;
  NOT?: InputMaybe<ContactSubnetsConnectionWhere>;
  OR?: InputMaybe<Array<ContactSubnetsConnectionWhere>>;
  node?: InputMaybe<SubnetWhere>;
};

export type ContactSubnetsCreateFieldInput = {
  node: SubnetCreateInput;
};

export type ContactSubnetsDeleteFieldInput = {
  delete?: InputMaybe<SubnetDeleteInput>;
  where?: InputMaybe<ContactSubnetsConnectionWhere>;
};

export type ContactSubnetsDisconnectFieldInput = {
  disconnect?: InputMaybe<SubnetDisconnectInput>;
  where?: InputMaybe<ContactSubnetsConnectionWhere>;
};

export type ContactSubnetsFieldInput = {
  connect?: InputMaybe<Array<ContactSubnetsConnectFieldInput>>;
  create?: InputMaybe<Array<ContactSubnetsCreateFieldInput>>;
};

export type ContactSubnetsNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<ContactSubnetsNodeAggregationWhereInput>>;
  NOT?: InputMaybe<ContactSubnetsNodeAggregationWhereInput>;
  OR?: InputMaybe<Array<ContactSubnetsNodeAggregationWhereInput>>;
  note_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  note_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  note_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  note_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  note_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  note_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  note_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  note_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  note_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  note_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  note_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  note_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  note_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  note_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  note_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  range_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  range_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  range_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  range_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  range_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  range_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  range_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  range_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  range_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  range_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  range_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  range_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  range_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  range_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  range_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
};

export type ContactSubnetsRelationship = {
  __typename?: 'ContactSubnetsRelationship';
  cursor: Scalars['String']['output'];
  node: Subnet;
};

export type ContactSubnetsUpdateConnectionInput = {
  node?: InputMaybe<SubnetUpdateInput>;
};

export type ContactSubnetsUpdateFieldInput = {
  connect?: InputMaybe<Array<ContactSubnetsConnectFieldInput>>;
  create?: InputMaybe<Array<ContactSubnetsCreateFieldInput>>;
  delete?: InputMaybe<Array<ContactSubnetsDeleteFieldInput>>;
  disconnect?: InputMaybe<Array<ContactSubnetsDisconnectFieldInput>>;
  update?: InputMaybe<ContactSubnetsUpdateConnectionInput>;
  where?: InputMaybe<ContactSubnetsConnectionWhere>;
};

export type ContactUpdateInput = {
  name?: InputMaybe<Scalars['String']['input']>;
  subnets?: InputMaybe<Array<ContactSubnetsUpdateFieldInput>>;
};

export type ContactWhere = {
  AND?: InputMaybe<Array<ContactWhere>>;
  NOT?: InputMaybe<ContactWhere>;
  OR?: InputMaybe<Array<ContactWhere>>;
  _id?: InputMaybe<Scalars['ID']['input']>;
  _id_CONTAINS?: InputMaybe<Scalars['ID']['input']>;
  _id_ENDS_WITH?: InputMaybe<Scalars['ID']['input']>;
  _id_IN?: InputMaybe<Array<Scalars['ID']['input']>>;
  _id_STARTS_WITH?: InputMaybe<Scalars['ID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  name_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  name_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  name_IN?: InputMaybe<Array<Scalars['String']['input']>>;
  name_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
  subnetsAggregate?: InputMaybe<ContactSubnetsAggregateInput>;
  /** Return Contacts where all of the related ContactSubnetsConnections match this filter */
  subnetsConnection_ALL?: InputMaybe<ContactSubnetsConnectionWhere>;
  /** Return Contacts where none of the related ContactSubnetsConnections match this filter */
  subnetsConnection_NONE?: InputMaybe<ContactSubnetsConnectionWhere>;
  /** Return Contacts where one of the related ContactSubnetsConnections match this filter */
  subnetsConnection_SINGLE?: InputMaybe<ContactSubnetsConnectionWhere>;
  /** Return Contacts where some of the related ContactSubnetsConnections match this filter */
  subnetsConnection_SOME?: InputMaybe<ContactSubnetsConnectionWhere>;
  /** Return Contacts where all of the related Subnets match this filter */
  subnets_ALL?: InputMaybe<SubnetWhere>;
  /** Return Contacts where none of the related Subnets match this filter */
  subnets_NONE?: InputMaybe<SubnetWhere>;
  /** Return Contacts where one of the related Subnets match this filter */
  subnets_SINGLE?: InputMaybe<SubnetWhere>;
  /** Return Contacts where some of the related Subnets match this filter */
  subnets_SOME?: InputMaybe<SubnetWhere>;
};

export type ContactsConnection = {
  __typename?: 'ContactsConnection';
  edges: Array<ContactEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type CreateApplicationsMutationResponse = {
  __typename?: 'CreateApplicationsMutationResponse';
  applications: Array<Application>;
  info: CreateInfo;
};

export type CreateComponentsMutationResponse = {
  __typename?: 'CreateComponentsMutationResponse';
  components: Array<Component>;
  info: CreateInfo;
};

export type CreateContactsMutationResponse = {
  __typename?: 'CreateContactsMutationResponse';
  contacts: Array<Contact>;
  info: CreateInfo;
};

export type CreateCvesMutationResponse = {
  __typename?: 'CreateCvesMutationResponse';
  cves: Array<Cve>;
  info: CreateInfo;
};

export type CreateCvsSv2sMutationResponse = {
  __typename?: 'CreateCvsSv2sMutationResponse';
  cvsSv2s: Array<CvsSv2>;
  info: CreateInfo;
};

export type CreateCvsSv30sMutationResponse = {
  __typename?: 'CreateCvsSv30sMutationResponse';
  cvsSv30s: Array<CvsSv30>;
  info: CreateInfo;
};

export type CreateCvsSv31sMutationResponse = {
  __typename?: 'CreateCvsSv31sMutationResponse';
  cvsSv31s: Array<CvsSv31>;
  info: CreateInfo;
};

export type CreateCvsSv40sMutationResponse = {
  __typename?: 'CreateCvsSv40sMutationResponse';
  cvsSv40s: Array<CvsSv40>;
  info: CreateInfo;
};

export type CreateDevicesMutationResponse = {
  __typename?: 'CreateDevicesMutationResponse';
  devices: Array<Device>;
  info: CreateInfo;
};

export type CreateDomainNamesMutationResponse = {
  __typename?: 'CreateDomainNamesMutationResponse';
  domainNames: Array<DomainName>;
  info: CreateInfo;
};

export type CreateHardwareVersionsMutationResponse = {
  __typename?: 'CreateHardwareVersionsMutationResponse';
  hardwareVersions: Array<HardwareVersion>;
  info: CreateInfo;
};

export type CreateHostsMutationResponse = {
  __typename?: 'CreateHostsMutationResponse';
  hosts: Array<Host>;
  info: CreateInfo;
};

/** Information about the number of nodes and relationships created during a create mutation */
export type CreateInfo = {
  __typename?: 'CreateInfo';
  /** @deprecated This field has been deprecated because bookmarks are now handled by the driver. */
  bookmark?: Maybe<Scalars['String']['output']>;
  nodesCreated: Scalars['Int']['output'];
  relationshipsCreated: Scalars['Int']['output'];
};

export type CreateIpsMutationResponse = {
  __typename?: 'CreateIpsMutationResponse';
  info: CreateInfo;
  ips: Array<Ip>;
};

export type CreateMissionDependenciesMutationResponse = {
  __typename?: 'CreateMissionDependenciesMutationResponse';
  info: CreateInfo;
  missionDependencies: Array<MissionDependency>;
};

export type CreateMissionsMutationResponse = {
  __typename?: 'CreateMissionsMutationResponse';
  info: CreateInfo;
  missions: Array<Mission>;
};

export type CreateNetworkServicesMutationResponse = {
  __typename?: 'CreateNetworkServicesMutationResponse';
  info: CreateInfo;
  networkServices: Array<NetworkService>;
};

export type CreateNodeObjectsMutationResponse = {
  __typename?: 'CreateNodeObjectsMutationResponse';
  info: CreateInfo;
  nodeObjects: Array<NodeObject>;
};

export type CreateOrganizationUnitsMutationResponse = {
  __typename?: 'CreateOrganizationUnitsMutationResponse';
  info: CreateInfo;
  organizationUnits: Array<OrganizationUnit>;
};

export type CreatePhysicalEnvironmentsMutationResponse = {
  __typename?: 'CreatePhysicalEnvironmentsMutationResponse';
  info: CreateInfo;
  physicalEnvironments: Array<PhysicalEnvironment>;
};

export type CreateSoftwareVersionsMutationResponse = {
  __typename?: 'CreateSoftwareVersionsMutationResponse';
  info: CreateInfo;
  softwareVersions: Array<SoftwareVersion>;
};

export type CreateSubnetsMutationResponse = {
  __typename?: 'CreateSubnetsMutationResponse';
  info: CreateInfo;
  subnets: Array<Subnet>;
};

export type CreateUrisMutationResponse = {
  __typename?: 'CreateUrisMutationResponse';
  info: CreateInfo;
  uris: Array<Uri>;
};

export type CreateVulnerabilitiesMutationResponse = {
  __typename?: 'CreateVulnerabilitiesMutationResponse';
  info: CreateInfo;
  vulnerabilities: Array<Vulnerability>;
};

export type CvesConnection = {
  __typename?: 'CvesConnection';
  edges: Array<CveEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type CvsSv2sConnection = {
  __typename?: 'CvsSv2sConnection';
  edges: Array<CvsSv2Edge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type CvsSv30sConnection = {
  __typename?: 'CvsSv30sConnection';
  edges: Array<CvsSv30Edge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type CvsSv31sConnection = {
  __typename?: 'CvsSv31sConnection';
  edges: Array<CvsSv31Edge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type CvsSv40sConnection = {
  __typename?: 'CvsSv40sConnection';
  edges: Array<CvsSv40Edge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

/** Information about the number of nodes and relationships deleted during a delete mutation */
export type DeleteInfo = {
  __typename?: 'DeleteInfo';
  /** @deprecated This field has been deprecated because bookmarks are now handled by the driver. */
  bookmark?: Maybe<Scalars['String']['output']>;
  nodesDeleted: Scalars['Int']['output'];
  relationshipsDeleted: Scalars['Int']['output'];
};

export type Device = {
  __typename?: 'Device';
  _id: Scalars['ID']['output'];
  applications: Array<Application>;
  applicationsAggregate?: Maybe<DeviceApplicationApplicationsAggregationSelection>;
  applicationsConnection: DeviceApplicationsConnection;
  hardware_version?: Maybe<HardwareVersion>;
  hardware_versionAggregate?: Maybe<DeviceHardwareVersionHardware_VersionAggregationSelection>;
  hardware_versionConnection: DeviceHardware_VersionConnection;
  name?: Maybe<Scalars['String']['output']>;
  power?: Maybe<Scalars['String']['output']>;
  state?: Maybe<Scalars['String']['output']>;
};

export type DeviceApplicationsArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  options?: InputMaybe<ApplicationOptions>;
  where?: InputMaybe<ApplicationWhere>;
};

export type DeviceApplicationsAggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<ApplicationWhere>;
};

export type DeviceApplicationsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<DeviceApplicationsConnectionSort>>;
  where?: InputMaybe<DeviceApplicationsConnectionWhere>;
};

export type DeviceHardware_VersionArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  options?: InputMaybe<HardwareVersionOptions>;
  where?: InputMaybe<HardwareVersionWhere>;
};

export type DeviceHardware_VersionAggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<HardwareVersionWhere>;
};

export type DeviceHardware_VersionConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<DeviceHardware_VersionConnectionSort>>;
  where?: InputMaybe<DeviceHardware_VersionConnectionWhere>;
};

export type DeviceAggregateSelection = {
  __typename?: 'DeviceAggregateSelection';
  count: Scalars['Int']['output'];
  name: StringAggregateSelection;
  power: StringAggregateSelection;
  state: StringAggregateSelection;
};

export type DeviceApplicationApplicationsAggregationSelection = {
  __typename?: 'DeviceApplicationApplicationsAggregationSelection';
  count: Scalars['Int']['output'];
  node?: Maybe<DeviceApplicationApplicationsNodeAggregateSelection>;
};

export type DeviceApplicationApplicationsNodeAggregateSelection = {
  __typename?: 'DeviceApplicationApplicationsNodeAggregateSelection';
  name: StringAggregateSelection;
};

export type DeviceApplicationsAggregateInput = {
  AND?: InputMaybe<Array<DeviceApplicationsAggregateInput>>;
  NOT?: InputMaybe<DeviceApplicationsAggregateInput>;
  OR?: InputMaybe<Array<DeviceApplicationsAggregateInput>>;
  count?: InputMaybe<Scalars['Int']['input']>;
  count_GT?: InputMaybe<Scalars['Int']['input']>;
  count_GTE?: InputMaybe<Scalars['Int']['input']>;
  count_LT?: InputMaybe<Scalars['Int']['input']>;
  count_LTE?: InputMaybe<Scalars['Int']['input']>;
  node?: InputMaybe<DeviceApplicationsNodeAggregationWhereInput>;
};

export type DeviceApplicationsConnectFieldInput = {
  connect?: InputMaybe<Array<ApplicationConnectInput>>;
  /** Whether or not to overwrite any matching relationship with the new properties. */
  overwrite?: Scalars['Boolean']['input'];
  where?: InputMaybe<ApplicationConnectWhere>;
};

export type DeviceApplicationsConnection = {
  __typename?: 'DeviceApplicationsConnection';
  edges: Array<DeviceApplicationsRelationship>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type DeviceApplicationsConnectionSort = {
  node?: InputMaybe<ApplicationSort>;
};

export type DeviceApplicationsConnectionWhere = {
  AND?: InputMaybe<Array<DeviceApplicationsConnectionWhere>>;
  NOT?: InputMaybe<DeviceApplicationsConnectionWhere>;
  OR?: InputMaybe<Array<DeviceApplicationsConnectionWhere>>;
  node?: InputMaybe<ApplicationWhere>;
};

export type DeviceApplicationsCreateFieldInput = {
  node: ApplicationCreateInput;
};

export type DeviceApplicationsDeleteFieldInput = {
  delete?: InputMaybe<ApplicationDeleteInput>;
  where?: InputMaybe<DeviceApplicationsConnectionWhere>;
};

export type DeviceApplicationsDisconnectFieldInput = {
  disconnect?: InputMaybe<ApplicationDisconnectInput>;
  where?: InputMaybe<DeviceApplicationsConnectionWhere>;
};

export type DeviceApplicationsFieldInput = {
  connect?: InputMaybe<Array<DeviceApplicationsConnectFieldInput>>;
  create?: InputMaybe<Array<DeviceApplicationsCreateFieldInput>>;
};

export type DeviceApplicationsNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<DeviceApplicationsNodeAggregationWhereInput>>;
  NOT?: InputMaybe<DeviceApplicationsNodeAggregationWhereInput>;
  OR?: InputMaybe<Array<DeviceApplicationsNodeAggregationWhereInput>>;
  name_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
};

export type DeviceApplicationsRelationship = {
  __typename?: 'DeviceApplicationsRelationship';
  cursor: Scalars['String']['output'];
  node: Application;
};

export type DeviceApplicationsUpdateConnectionInput = {
  node?: InputMaybe<ApplicationUpdateInput>;
};

export type DeviceApplicationsUpdateFieldInput = {
  connect?: InputMaybe<Array<DeviceApplicationsConnectFieldInput>>;
  create?: InputMaybe<Array<DeviceApplicationsCreateFieldInput>>;
  delete?: InputMaybe<Array<DeviceApplicationsDeleteFieldInput>>;
  disconnect?: InputMaybe<Array<DeviceApplicationsDisconnectFieldInput>>;
  update?: InputMaybe<DeviceApplicationsUpdateConnectionInput>;
  where?: InputMaybe<DeviceApplicationsConnectionWhere>;
};

export type DeviceConnectInput = {
  applications?: InputMaybe<Array<DeviceApplicationsConnectFieldInput>>;
  hardware_version?: InputMaybe<DeviceHardware_VersionConnectFieldInput>;
};

export type DeviceConnectWhere = {
  node: DeviceWhere;
};

export type DeviceCreateInput = {
  applications?: InputMaybe<DeviceApplicationsFieldInput>;
  hardware_version?: InputMaybe<DeviceHardware_VersionFieldInput>;
  name?: InputMaybe<Scalars['String']['input']>;
  power?: InputMaybe<Scalars['String']['input']>;
  state?: InputMaybe<Scalars['String']['input']>;
};

export type DeviceDeleteInput = {
  applications?: InputMaybe<Array<DeviceApplicationsDeleteFieldInput>>;
  hardware_version?: InputMaybe<DeviceHardware_VersionDeleteFieldInput>;
};

export type DeviceDisconnectInput = {
  applications?: InputMaybe<Array<DeviceApplicationsDisconnectFieldInput>>;
  hardware_version?: InputMaybe<DeviceHardware_VersionDisconnectFieldInput>;
};

export type DeviceEdge = {
  __typename?: 'DeviceEdge';
  cursor: Scalars['String']['output'];
  node: Device;
};

export type DeviceHardwareVersionHardware_VersionAggregationSelection = {
  __typename?: 'DeviceHardwareVersionHardware_versionAggregationSelection';
  count: Scalars['Int']['output'];
  node?: Maybe<DeviceHardwareVersionHardware_VersionNodeAggregateSelection>;
};

export type DeviceHardwareVersionHardware_VersionNodeAggregateSelection = {
  __typename?: 'DeviceHardwareVersionHardware_versionNodeAggregateSelection';
  manufacturer: StringAggregateSelection;
  model: StringAggregateSelection;
};

export type DeviceHardware_VersionAggregateInput = {
  AND?: InputMaybe<Array<DeviceHardware_VersionAggregateInput>>;
  NOT?: InputMaybe<DeviceHardware_VersionAggregateInput>;
  OR?: InputMaybe<Array<DeviceHardware_VersionAggregateInput>>;
  count?: InputMaybe<Scalars['Int']['input']>;
  count_GT?: InputMaybe<Scalars['Int']['input']>;
  count_GTE?: InputMaybe<Scalars['Int']['input']>;
  count_LT?: InputMaybe<Scalars['Int']['input']>;
  count_LTE?: InputMaybe<Scalars['Int']['input']>;
  node?: InputMaybe<DeviceHardware_VersionNodeAggregationWhereInput>;
};

export type DeviceHardware_VersionConnectFieldInput = {
  connect?: InputMaybe<HardwareVersionConnectInput>;
  /** Whether or not to overwrite any matching relationship with the new properties. */
  overwrite?: Scalars['Boolean']['input'];
  where?: InputMaybe<HardwareVersionConnectWhere>;
};

export type DeviceHardware_VersionConnection = {
  __typename?: 'DeviceHardware_versionConnection';
  edges: Array<DeviceHardware_VersionRelationship>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type DeviceHardware_VersionConnectionSort = {
  node?: InputMaybe<HardwareVersionSort>;
};

export type DeviceHardware_VersionConnectionWhere = {
  AND?: InputMaybe<Array<DeviceHardware_VersionConnectionWhere>>;
  NOT?: InputMaybe<DeviceHardware_VersionConnectionWhere>;
  OR?: InputMaybe<Array<DeviceHardware_VersionConnectionWhere>>;
  node?: InputMaybe<HardwareVersionWhere>;
};

export type DeviceHardware_VersionCreateFieldInput = {
  node: HardwareVersionCreateInput;
};

export type DeviceHardware_VersionDeleteFieldInput = {
  delete?: InputMaybe<HardwareVersionDeleteInput>;
  where?: InputMaybe<DeviceHardware_VersionConnectionWhere>;
};

export type DeviceHardware_VersionDisconnectFieldInput = {
  disconnect?: InputMaybe<HardwareVersionDisconnectInput>;
  where?: InputMaybe<DeviceHardware_VersionConnectionWhere>;
};

export type DeviceHardware_VersionFieldInput = {
  connect?: InputMaybe<DeviceHardware_VersionConnectFieldInput>;
  create?: InputMaybe<DeviceHardware_VersionCreateFieldInput>;
};

export type DeviceHardware_VersionNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<DeviceHardware_VersionNodeAggregationWhereInput>>;
  NOT?: InputMaybe<DeviceHardware_VersionNodeAggregationWhereInput>;
  OR?: InputMaybe<Array<DeviceHardware_VersionNodeAggregationWhereInput>>;
  manufacturer_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  manufacturer_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  manufacturer_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  manufacturer_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  manufacturer_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  manufacturer_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  manufacturer_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  manufacturer_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  manufacturer_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  manufacturer_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  manufacturer_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  manufacturer_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  manufacturer_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  manufacturer_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  manufacturer_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  model_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  model_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  model_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  model_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  model_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  model_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  model_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  model_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  model_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  model_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  model_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  model_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  model_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  model_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  model_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
};

export type DeviceHardware_VersionRelationship = {
  __typename?: 'DeviceHardware_versionRelationship';
  cursor: Scalars['String']['output'];
  node: HardwareVersion;
};

export type DeviceHardware_VersionUpdateConnectionInput = {
  node?: InputMaybe<HardwareVersionUpdateInput>;
};

export type DeviceHardware_VersionUpdateFieldInput = {
  connect?: InputMaybe<DeviceHardware_VersionConnectFieldInput>;
  create?: InputMaybe<DeviceHardware_VersionCreateFieldInput>;
  delete?: InputMaybe<DeviceHardware_VersionDeleteFieldInput>;
  disconnect?: InputMaybe<DeviceHardware_VersionDisconnectFieldInput>;
  update?: InputMaybe<DeviceHardware_VersionUpdateConnectionInput>;
  where?: InputMaybe<DeviceHardware_VersionConnectionWhere>;
};

export type DeviceOptions = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  /**
   * Specify one or more DeviceSort objects to sort Devices by. The sorts will be
   * applied in the order in which they are arranged in the array.
   */
  sort?: InputMaybe<Array<DeviceSort>>;
};

export type DeviceRelationInput = {
  applications?: InputMaybe<Array<DeviceApplicationsCreateFieldInput>>;
  hardware_version?: InputMaybe<DeviceHardware_VersionCreateFieldInput>;
};

/**
 * Fields to sort Devices by. The order in which sorts are applied is not
 * guaranteed when specifying many fields in one DeviceSort object.
 */
export type DeviceSort = {
  _id?: InputMaybe<SortDirection>;
  name?: InputMaybe<SortDirection>;
  power?: InputMaybe<SortDirection>;
  state?: InputMaybe<SortDirection>;
};

export type DeviceUpdateInput = {
  applications?: InputMaybe<Array<DeviceApplicationsUpdateFieldInput>>;
  hardware_version?: InputMaybe<DeviceHardware_VersionUpdateFieldInput>;
  name?: InputMaybe<Scalars['String']['input']>;
  power?: InputMaybe<Scalars['String']['input']>;
  state?: InputMaybe<Scalars['String']['input']>;
};

export type DeviceWhere = {
  AND?: InputMaybe<Array<DeviceWhere>>;
  NOT?: InputMaybe<DeviceWhere>;
  OR?: InputMaybe<Array<DeviceWhere>>;
  _id?: InputMaybe<Scalars['ID']['input']>;
  _id_CONTAINS?: InputMaybe<Scalars['ID']['input']>;
  _id_ENDS_WITH?: InputMaybe<Scalars['ID']['input']>;
  _id_IN?: InputMaybe<Array<Scalars['ID']['input']>>;
  _id_STARTS_WITH?: InputMaybe<Scalars['ID']['input']>;
  applicationsAggregate?: InputMaybe<DeviceApplicationsAggregateInput>;
  /** Return Devices where all of the related DeviceApplicationsConnections match this filter */
  applicationsConnection_ALL?: InputMaybe<DeviceApplicationsConnectionWhere>;
  /** Return Devices where none of the related DeviceApplicationsConnections match this filter */
  applicationsConnection_NONE?: InputMaybe<DeviceApplicationsConnectionWhere>;
  /** Return Devices where one of the related DeviceApplicationsConnections match this filter */
  applicationsConnection_SINGLE?: InputMaybe<DeviceApplicationsConnectionWhere>;
  /** Return Devices where some of the related DeviceApplicationsConnections match this filter */
  applicationsConnection_SOME?: InputMaybe<DeviceApplicationsConnectionWhere>;
  /** Return Devices where all of the related Applications match this filter */
  applications_ALL?: InputMaybe<ApplicationWhere>;
  /** Return Devices where none of the related Applications match this filter */
  applications_NONE?: InputMaybe<ApplicationWhere>;
  /** Return Devices where one of the related Applications match this filter */
  applications_SINGLE?: InputMaybe<ApplicationWhere>;
  /** Return Devices where some of the related Applications match this filter */
  applications_SOME?: InputMaybe<ApplicationWhere>;
  hardware_version?: InputMaybe<HardwareVersionWhere>;
  hardware_versionAggregate?: InputMaybe<DeviceHardware_VersionAggregateInput>;
  hardware_versionConnection?: InputMaybe<DeviceHardware_VersionConnectionWhere>;
  hardware_versionConnection_NOT?: InputMaybe<DeviceHardware_VersionConnectionWhere>;
  hardware_version_NOT?: InputMaybe<HardwareVersionWhere>;
  name?: InputMaybe<Scalars['String']['input']>;
  name_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  name_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  name_IN?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  name_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
  power?: InputMaybe<Scalars['String']['input']>;
  power_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  power_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  power_IN?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  power_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
  state?: InputMaybe<Scalars['String']['input']>;
  state_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  state_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  state_IN?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  state_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
};

export type DevicesConnection = {
  __typename?: 'DevicesConnection';
  edges: Array<DeviceEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type DomainName = {
  __typename?: 'DomainName';
  _id: Scalars['ID']['output'];
  domain_name: Scalars['String']['output'];
  ips: Array<Ip>;
  ipsAggregate?: Maybe<DomainNameIpIpsAggregationSelection>;
  ipsConnection: DomainNameIpsConnection;
  tag: Array<Maybe<Scalars['String']['output']>>;
};

export type DomainNameIpsArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  options?: InputMaybe<IpOptions>;
  where?: InputMaybe<IpWhere>;
};

export type DomainNameIpsAggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<IpWhere>;
};

export type DomainNameIpsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<DomainNameIpsConnectionSort>>;
  where?: InputMaybe<DomainNameIpsConnectionWhere>;
};

export type DomainNameAggregateSelection = {
  __typename?: 'DomainNameAggregateSelection';
  count: Scalars['Int']['output'];
  domain_name: StringAggregateSelection;
};

export type DomainNameConnectInput = {
  ips?: InputMaybe<Array<DomainNameIpsConnectFieldInput>>;
};

export type DomainNameConnectWhere = {
  node: DomainNameWhere;
};

export type DomainNameCreateInput = {
  domain_name: Scalars['String']['input'];
  ips?: InputMaybe<DomainNameIpsFieldInput>;
  tag: Array<InputMaybe<Scalars['String']['input']>>;
};

export type DomainNameDeleteInput = {
  ips?: InputMaybe<Array<DomainNameIpsDeleteFieldInput>>;
};

export type DomainNameDisconnectInput = {
  ips?: InputMaybe<Array<DomainNameIpsDisconnectFieldInput>>;
};

export type DomainNameEdge = {
  __typename?: 'DomainNameEdge';
  cursor: Scalars['String']['output'];
  node: DomainName;
};

export type DomainNameIpIpsAggregationSelection = {
  __typename?: 'DomainNameIPIpsAggregationSelection';
  count: Scalars['Int']['output'];
  node?: Maybe<DomainNameIpIpsNodeAggregateSelection>;
};

export type DomainNameIpIpsNodeAggregateSelection = {
  __typename?: 'DomainNameIPIpsNodeAggregateSelection';
  address: StringAggregateSelection;
  status: StringAggregateSelection;
  version: IntAggregateSelection;
};

export type DomainNameIpsAggregateInput = {
  AND?: InputMaybe<Array<DomainNameIpsAggregateInput>>;
  NOT?: InputMaybe<DomainNameIpsAggregateInput>;
  OR?: InputMaybe<Array<DomainNameIpsAggregateInput>>;
  count?: InputMaybe<Scalars['Int']['input']>;
  count_GT?: InputMaybe<Scalars['Int']['input']>;
  count_GTE?: InputMaybe<Scalars['Int']['input']>;
  count_LT?: InputMaybe<Scalars['Int']['input']>;
  count_LTE?: InputMaybe<Scalars['Int']['input']>;
  node?: InputMaybe<DomainNameIpsNodeAggregationWhereInput>;
};

export type DomainNameIpsConnectFieldInput = {
  connect?: InputMaybe<Array<IpConnectInput>>;
  /** Whether or not to overwrite any matching relationship with the new properties. */
  overwrite?: Scalars['Boolean']['input'];
  where?: InputMaybe<IpConnectWhere>;
};

export type DomainNameIpsConnection = {
  __typename?: 'DomainNameIpsConnection';
  edges: Array<DomainNameIpsRelationship>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type DomainNameIpsConnectionSort = {
  node?: InputMaybe<IpSort>;
};

export type DomainNameIpsConnectionWhere = {
  AND?: InputMaybe<Array<DomainNameIpsConnectionWhere>>;
  NOT?: InputMaybe<DomainNameIpsConnectionWhere>;
  OR?: InputMaybe<Array<DomainNameIpsConnectionWhere>>;
  node?: InputMaybe<IpWhere>;
};

export type DomainNameIpsCreateFieldInput = {
  node: IpCreateInput;
};

export type DomainNameIpsDeleteFieldInput = {
  delete?: InputMaybe<IpDeleteInput>;
  where?: InputMaybe<DomainNameIpsConnectionWhere>;
};

export type DomainNameIpsDisconnectFieldInput = {
  disconnect?: InputMaybe<IpDisconnectInput>;
  where?: InputMaybe<DomainNameIpsConnectionWhere>;
};

export type DomainNameIpsFieldInput = {
  connect?: InputMaybe<Array<DomainNameIpsConnectFieldInput>>;
  create?: InputMaybe<Array<DomainNameIpsCreateFieldInput>>;
};

export type DomainNameIpsNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<DomainNameIpsNodeAggregationWhereInput>>;
  NOT?: InputMaybe<DomainNameIpsNodeAggregationWhereInput>;
  OR?: InputMaybe<Array<DomainNameIpsNodeAggregationWhereInput>>;
  address_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  address_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  address_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  address_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  address_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  address_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  address_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  address_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  address_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  address_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  address_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  address_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  address_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  address_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  address_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  status_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  status_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  status_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  status_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  status_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  status_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  status_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  status_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  status_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  status_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  status_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  status_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  status_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  status_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  status_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  version_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  version_AVERAGE_GT?: InputMaybe<Scalars['Float']['input']>;
  version_AVERAGE_GTE?: InputMaybe<Scalars['Float']['input']>;
  version_AVERAGE_LT?: InputMaybe<Scalars['Float']['input']>;
  version_AVERAGE_LTE?: InputMaybe<Scalars['Float']['input']>;
  version_MAX_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  version_MAX_GT?: InputMaybe<Scalars['Int']['input']>;
  version_MAX_GTE?: InputMaybe<Scalars['Int']['input']>;
  version_MAX_LT?: InputMaybe<Scalars['Int']['input']>;
  version_MAX_LTE?: InputMaybe<Scalars['Int']['input']>;
  version_MIN_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  version_MIN_GT?: InputMaybe<Scalars['Int']['input']>;
  version_MIN_GTE?: InputMaybe<Scalars['Int']['input']>;
  version_MIN_LT?: InputMaybe<Scalars['Int']['input']>;
  version_MIN_LTE?: InputMaybe<Scalars['Int']['input']>;
  version_SUM_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  version_SUM_GT?: InputMaybe<Scalars['Int']['input']>;
  version_SUM_GTE?: InputMaybe<Scalars['Int']['input']>;
  version_SUM_LT?: InputMaybe<Scalars['Int']['input']>;
  version_SUM_LTE?: InputMaybe<Scalars['Int']['input']>;
};

export type DomainNameIpsRelationship = {
  __typename?: 'DomainNameIpsRelationship';
  cursor: Scalars['String']['output'];
  node: Ip;
};

export type DomainNameIpsUpdateConnectionInput = {
  node?: InputMaybe<IpUpdateInput>;
};

export type DomainNameIpsUpdateFieldInput = {
  connect?: InputMaybe<Array<DomainNameIpsConnectFieldInput>>;
  create?: InputMaybe<Array<DomainNameIpsCreateFieldInput>>;
  delete?: InputMaybe<Array<DomainNameIpsDeleteFieldInput>>;
  disconnect?: InputMaybe<Array<DomainNameIpsDisconnectFieldInput>>;
  update?: InputMaybe<DomainNameIpsUpdateConnectionInput>;
  where?: InputMaybe<DomainNameIpsConnectionWhere>;
};

export type DomainNameOptions = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  /**
   * Specify one or more DomainNameSort objects to sort DomainNames by. The sorts
   * will be applied in the order in which they are arranged in the array.
   */
  sort?: InputMaybe<Array<DomainNameSort>>;
};

export type DomainNameRelationInput = {
  ips?: InputMaybe<Array<DomainNameIpsCreateFieldInput>>;
};

/**
 * Fields to sort DomainNames by. The order in which sorts are applied is not
 * guaranteed when specifying many fields in one DomainNameSort object.
 */
export type DomainNameSort = {
  _id?: InputMaybe<SortDirection>;
  domain_name?: InputMaybe<SortDirection>;
};

export type DomainNameUpdateInput = {
  domain_name?: InputMaybe<Scalars['String']['input']>;
  ips?: InputMaybe<Array<DomainNameIpsUpdateFieldInput>>;
  tag?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  tag_POP?: InputMaybe<Scalars['Int']['input']>;
  tag_PUSH?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type DomainNameWhere = {
  AND?: InputMaybe<Array<DomainNameWhere>>;
  NOT?: InputMaybe<DomainNameWhere>;
  OR?: InputMaybe<Array<DomainNameWhere>>;
  _id?: InputMaybe<Scalars['ID']['input']>;
  _id_CONTAINS?: InputMaybe<Scalars['ID']['input']>;
  _id_ENDS_WITH?: InputMaybe<Scalars['ID']['input']>;
  _id_IN?: InputMaybe<Array<Scalars['ID']['input']>>;
  _id_STARTS_WITH?: InputMaybe<Scalars['ID']['input']>;
  domain_name?: InputMaybe<Scalars['String']['input']>;
  domain_name_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  domain_name_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  domain_name_IN?: InputMaybe<Array<Scalars['String']['input']>>;
  domain_name_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
  ipsAggregate?: InputMaybe<DomainNameIpsAggregateInput>;
  /** Return DomainNames where all of the related DomainNameIpsConnections match this filter */
  ipsConnection_ALL?: InputMaybe<DomainNameIpsConnectionWhere>;
  /** Return DomainNames where none of the related DomainNameIpsConnections match this filter */
  ipsConnection_NONE?: InputMaybe<DomainNameIpsConnectionWhere>;
  /** Return DomainNames where one of the related DomainNameIpsConnections match this filter */
  ipsConnection_SINGLE?: InputMaybe<DomainNameIpsConnectionWhere>;
  /** Return DomainNames where some of the related DomainNameIpsConnections match this filter */
  ipsConnection_SOME?: InputMaybe<DomainNameIpsConnectionWhere>;
  /** Return DomainNames where all of the related IPS match this filter */
  ips_ALL?: InputMaybe<IpWhere>;
  /** Return DomainNames where none of the related IPS match this filter */
  ips_NONE?: InputMaybe<IpWhere>;
  /** Return DomainNames where one of the related IPS match this filter */
  ips_SINGLE?: InputMaybe<IpWhere>;
  /** Return DomainNames where some of the related IPS match this filter */
  ips_SOME?: InputMaybe<IpWhere>;
  tag?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  tag_INCLUDES?: InputMaybe<Scalars['String']['input']>;
};

export type DomainNamesConnection = {
  __typename?: 'DomainNamesConnection';
  edges: Array<DomainNameEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type FloatAggregateSelection = {
  __typename?: 'FloatAggregateSelection';
  average?: Maybe<Scalars['Float']['output']>;
  max?: Maybe<Scalars['Float']['output']>;
  min?: Maybe<Scalars['Float']['output']>;
  sum?: Maybe<Scalars['Float']['output']>;
};

export type HardwareVersion = {
  __typename?: 'HardwareVersion';
  _id: Scalars['ID']['output'];
  devices: Array<Device>;
  devicesAggregate?: Maybe<HardwareVersionDeviceDevicesAggregationSelection>;
  devicesConnection: HardwareVersionDevicesConnection;
  manufacturer: Scalars['String']['output'];
  model: Scalars['String']['output'];
};

export type HardwareVersionDevicesArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  options?: InputMaybe<DeviceOptions>;
  where?: InputMaybe<DeviceWhere>;
};

export type HardwareVersionDevicesAggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<DeviceWhere>;
};

export type HardwareVersionDevicesConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<HardwareVersionDevicesConnectionSort>>;
  where?: InputMaybe<HardwareVersionDevicesConnectionWhere>;
};

export type HardwareVersionAggregateSelection = {
  __typename?: 'HardwareVersionAggregateSelection';
  count: Scalars['Int']['output'];
  manufacturer: StringAggregateSelection;
  model: StringAggregateSelection;
};

export type HardwareVersionConnectInput = {
  devices?: InputMaybe<Array<HardwareVersionDevicesConnectFieldInput>>;
};

export type HardwareVersionConnectWhere = {
  node: HardwareVersionWhere;
};

export type HardwareVersionCreateInput = {
  devices?: InputMaybe<HardwareVersionDevicesFieldInput>;
  manufacturer: Scalars['String']['input'];
  model: Scalars['String']['input'];
};

export type HardwareVersionDeleteInput = {
  devices?: InputMaybe<Array<HardwareVersionDevicesDeleteFieldInput>>;
};

export type HardwareVersionDeviceDevicesAggregationSelection = {
  __typename?: 'HardwareVersionDeviceDevicesAggregationSelection';
  count: Scalars['Int']['output'];
  node?: Maybe<HardwareVersionDeviceDevicesNodeAggregateSelection>;
};

export type HardwareVersionDeviceDevicesNodeAggregateSelection = {
  __typename?: 'HardwareVersionDeviceDevicesNodeAggregateSelection';
  name: StringAggregateSelection;
  power: StringAggregateSelection;
  state: StringAggregateSelection;
};

export type HardwareVersionDevicesAggregateInput = {
  AND?: InputMaybe<Array<HardwareVersionDevicesAggregateInput>>;
  NOT?: InputMaybe<HardwareVersionDevicesAggregateInput>;
  OR?: InputMaybe<Array<HardwareVersionDevicesAggregateInput>>;
  count?: InputMaybe<Scalars['Int']['input']>;
  count_GT?: InputMaybe<Scalars['Int']['input']>;
  count_GTE?: InputMaybe<Scalars['Int']['input']>;
  count_LT?: InputMaybe<Scalars['Int']['input']>;
  count_LTE?: InputMaybe<Scalars['Int']['input']>;
  node?: InputMaybe<HardwareVersionDevicesNodeAggregationWhereInput>;
};

export type HardwareVersionDevicesConnectFieldInput = {
  connect?: InputMaybe<Array<DeviceConnectInput>>;
  /** Whether or not to overwrite any matching relationship with the new properties. */
  overwrite?: Scalars['Boolean']['input'];
  where?: InputMaybe<DeviceConnectWhere>;
};

export type HardwareVersionDevicesConnection = {
  __typename?: 'HardwareVersionDevicesConnection';
  edges: Array<HardwareVersionDevicesRelationship>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type HardwareVersionDevicesConnectionSort = {
  node?: InputMaybe<DeviceSort>;
};

export type HardwareVersionDevicesConnectionWhere = {
  AND?: InputMaybe<Array<HardwareVersionDevicesConnectionWhere>>;
  NOT?: InputMaybe<HardwareVersionDevicesConnectionWhere>;
  OR?: InputMaybe<Array<HardwareVersionDevicesConnectionWhere>>;
  node?: InputMaybe<DeviceWhere>;
};

export type HardwareVersionDevicesCreateFieldInput = {
  node: DeviceCreateInput;
};

export type HardwareVersionDevicesDeleteFieldInput = {
  delete?: InputMaybe<DeviceDeleteInput>;
  where?: InputMaybe<HardwareVersionDevicesConnectionWhere>;
};

export type HardwareVersionDevicesDisconnectFieldInput = {
  disconnect?: InputMaybe<DeviceDisconnectInput>;
  where?: InputMaybe<HardwareVersionDevicesConnectionWhere>;
};

export type HardwareVersionDevicesFieldInput = {
  connect?: InputMaybe<Array<HardwareVersionDevicesConnectFieldInput>>;
  create?: InputMaybe<Array<HardwareVersionDevicesCreateFieldInput>>;
};

export type HardwareVersionDevicesNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<HardwareVersionDevicesNodeAggregationWhereInput>>;
  NOT?: InputMaybe<HardwareVersionDevicesNodeAggregationWhereInput>;
  OR?: InputMaybe<Array<HardwareVersionDevicesNodeAggregationWhereInput>>;
  name_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  power_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  power_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  power_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  power_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  power_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  power_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  power_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  power_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  power_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  power_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  power_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  power_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  power_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  power_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  power_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  state_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  state_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  state_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  state_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  state_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  state_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  state_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  state_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  state_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  state_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  state_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  state_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  state_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  state_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  state_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
};

export type HardwareVersionDevicesRelationship = {
  __typename?: 'HardwareVersionDevicesRelationship';
  cursor: Scalars['String']['output'];
  node: Device;
};

export type HardwareVersionDevicesUpdateConnectionInput = {
  node?: InputMaybe<DeviceUpdateInput>;
};

export type HardwareVersionDevicesUpdateFieldInput = {
  connect?: InputMaybe<Array<HardwareVersionDevicesConnectFieldInput>>;
  create?: InputMaybe<Array<HardwareVersionDevicesCreateFieldInput>>;
  delete?: InputMaybe<Array<HardwareVersionDevicesDeleteFieldInput>>;
  disconnect?: InputMaybe<Array<HardwareVersionDevicesDisconnectFieldInput>>;
  update?: InputMaybe<HardwareVersionDevicesUpdateConnectionInput>;
  where?: InputMaybe<HardwareVersionDevicesConnectionWhere>;
};

export type HardwareVersionDisconnectInput = {
  devices?: InputMaybe<Array<HardwareVersionDevicesDisconnectFieldInput>>;
};

export type HardwareVersionEdge = {
  __typename?: 'HardwareVersionEdge';
  cursor: Scalars['String']['output'];
  node: HardwareVersion;
};

export type HardwareVersionOptions = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  /**
   * Specify one or more HardwareVersionSort objects to sort HardwareVersions by.
   * The sorts will be applied in the order in which they are arranged in the array.
   */
  sort?: InputMaybe<Array<HardwareVersionSort>>;
};

export type HardwareVersionRelationInput = {
  devices?: InputMaybe<Array<HardwareVersionDevicesCreateFieldInput>>;
};

/**
 * Fields to sort HardwareVersions by. The order in which sorts are applied is not
 * guaranteed when specifying many fields in one HardwareVersionSort object.
 */
export type HardwareVersionSort = {
  _id?: InputMaybe<SortDirection>;
  manufacturer?: InputMaybe<SortDirection>;
  model?: InputMaybe<SortDirection>;
};

export type HardwareVersionUpdateInput = {
  devices?: InputMaybe<Array<HardwareVersionDevicesUpdateFieldInput>>;
  manufacturer?: InputMaybe<Scalars['String']['input']>;
  model?: InputMaybe<Scalars['String']['input']>;
};

export type HardwareVersionWhere = {
  AND?: InputMaybe<Array<HardwareVersionWhere>>;
  NOT?: InputMaybe<HardwareVersionWhere>;
  OR?: InputMaybe<Array<HardwareVersionWhere>>;
  _id?: InputMaybe<Scalars['ID']['input']>;
  _id_CONTAINS?: InputMaybe<Scalars['ID']['input']>;
  _id_ENDS_WITH?: InputMaybe<Scalars['ID']['input']>;
  _id_IN?: InputMaybe<Array<Scalars['ID']['input']>>;
  _id_STARTS_WITH?: InputMaybe<Scalars['ID']['input']>;
  devicesAggregate?: InputMaybe<HardwareVersionDevicesAggregateInput>;
  /** Return HardwareVersions where all of the related HardwareVersionDevicesConnections match this filter */
  devicesConnection_ALL?: InputMaybe<HardwareVersionDevicesConnectionWhere>;
  /** Return HardwareVersions where none of the related HardwareVersionDevicesConnections match this filter */
  devicesConnection_NONE?: InputMaybe<HardwareVersionDevicesConnectionWhere>;
  /** Return HardwareVersions where one of the related HardwareVersionDevicesConnections match this filter */
  devicesConnection_SINGLE?: InputMaybe<HardwareVersionDevicesConnectionWhere>;
  /** Return HardwareVersions where some of the related HardwareVersionDevicesConnections match this filter */
  devicesConnection_SOME?: InputMaybe<HardwareVersionDevicesConnectionWhere>;
  /** Return HardwareVersions where all of the related Devices match this filter */
  devices_ALL?: InputMaybe<DeviceWhere>;
  /** Return HardwareVersions where none of the related Devices match this filter */
  devices_NONE?: InputMaybe<DeviceWhere>;
  /** Return HardwareVersions where one of the related Devices match this filter */
  devices_SINGLE?: InputMaybe<DeviceWhere>;
  /** Return HardwareVersions where some of the related Devices match this filter */
  devices_SOME?: InputMaybe<DeviceWhere>;
  manufacturer?: InputMaybe<Scalars['String']['input']>;
  manufacturer_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  manufacturer_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  manufacturer_IN?: InputMaybe<Array<Scalars['String']['input']>>;
  manufacturer_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
  model?: InputMaybe<Scalars['String']['input']>;
  model_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  model_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  model_IN?: InputMaybe<Array<Scalars['String']['input']>>;
  model_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
};

export type HardwareVersionsConnection = {
  __typename?: 'HardwareVersionsConnection';
  edges: Array<HardwareVersionEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

/**
 * The edge properties for the following fields:
 * * IP.nodes
 * * NodeObject.ips
 */
export type HasAssigned = {
  __typename?: 'HasAssigned';
  end?: Maybe<Scalars['String']['output']>;
  start?: Maybe<Scalars['String']['output']>;
};

export type HasAssignedAggregationWhereInput = {
  AND?: InputMaybe<Array<HasAssignedAggregationWhereInput>>;
  NOT?: InputMaybe<HasAssignedAggregationWhereInput>;
  OR?: InputMaybe<Array<HasAssignedAggregationWhereInput>>;
  end_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  end_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  end_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  end_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  end_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  end_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  end_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  end_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  end_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  end_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  end_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  end_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  end_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  end_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  end_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  start_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  start_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  start_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  start_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  start_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  start_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  start_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  start_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  start_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  start_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  start_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  start_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  start_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  start_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  start_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
};

export type HasAssignedCreateInput = {
  end?: InputMaybe<Scalars['String']['input']>;
  start?: InputMaybe<Scalars['String']['input']>;
};

export type HasAssignedSort = {
  end?: InputMaybe<SortDirection>;
  start?: InputMaybe<SortDirection>;
};

export type HasAssignedUpdateInput = {
  end?: InputMaybe<Scalars['String']['input']>;
  start?: InputMaybe<Scalars['String']['input']>;
};

export type HasAssignedWhere = {
  AND?: InputMaybe<Array<HasAssignedWhere>>;
  NOT?: InputMaybe<HasAssignedWhere>;
  OR?: InputMaybe<Array<HasAssignedWhere>>;
  end?: InputMaybe<Scalars['String']['input']>;
  end_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  end_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  end_IN?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  end_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
  start?: InputMaybe<Scalars['String']['input']>;
  start_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  start_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  start_IN?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  start_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
};

export type Host = {
  __typename?: 'Host';
  _id: Scalars['ID']['output'];
  components: Array<Component>;
  componentsAggregate?: Maybe<HostComponentComponentsAggregationSelection>;
  componentsConnection: HostComponentsConnection;
  hostname?: Maybe<Scalars['String']['output']>;
  network_services: Array<NetworkService>;
  network_servicesAggregate?: Maybe<HostNetworkServiceNetwork_ServicesAggregationSelection>;
  network_servicesConnection: HostNetwork_ServicesConnection;
  node?: Maybe<NodeObject>;
  nodeAggregate?: Maybe<HostNodeObjectNodeAggregationSelection>;
  nodeConnection: HostNodeConnection;
  software_versions: Array<SoftwareVersion>;
  software_versionsAggregate?: Maybe<HostSoftwareVersionSoftware_VersionsAggregationSelection>;
  software_versionsConnection: HostSoftware_VersionsConnection;
};

export type HostComponentsArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  options?: InputMaybe<ComponentOptions>;
  where?: InputMaybe<ComponentWhere>;
};

export type HostComponentsAggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<ComponentWhere>;
};

export type HostComponentsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<HostComponentsConnectionSort>>;
  where?: InputMaybe<HostComponentsConnectionWhere>;
};

export type HostNetwork_ServicesArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  options?: InputMaybe<NetworkServiceOptions>;
  where?: InputMaybe<NetworkServiceWhere>;
};

export type HostNetwork_ServicesAggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<NetworkServiceWhere>;
};

export type HostNetwork_ServicesConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<HostNetwork_ServicesConnectionSort>>;
  where?: InputMaybe<HostNetwork_ServicesConnectionWhere>;
};

export type HostNodeArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  options?: InputMaybe<NodeObjectOptions>;
  where?: InputMaybe<NodeObjectWhere>;
};

export type HostNodeAggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<NodeObjectWhere>;
};

export type HostNodeConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<HostNodeConnectionSort>>;
  where?: InputMaybe<HostNodeConnectionWhere>;
};

export type HostSoftware_VersionsArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  options?: InputMaybe<SoftwareVersionOptions>;
  where?: InputMaybe<SoftwareVersionWhere>;
};

export type HostSoftware_VersionsAggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<SoftwareVersionWhere>;
};

export type HostSoftware_VersionsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<HostSoftware_VersionsConnectionSort>>;
  where?: InputMaybe<HostSoftware_VersionsConnectionWhere>;
};

export type HostAggregateSelection = {
  __typename?: 'HostAggregateSelection';
  count: Scalars['Int']['output'];
  hostname: StringAggregateSelection;
};

export type HostComponentComponentsAggregationSelection = {
  __typename?: 'HostComponentComponentsAggregationSelection';
  count: Scalars['Int']['output'];
  node?: Maybe<HostComponentComponentsNodeAggregateSelection>;
};

export type HostComponentComponentsNodeAggregateSelection = {
  __typename?: 'HostComponentComponentsNodeAggregateSelection';
  name: StringAggregateSelection;
};

export type HostComponentsAggregateInput = {
  AND?: InputMaybe<Array<HostComponentsAggregateInput>>;
  NOT?: InputMaybe<HostComponentsAggregateInput>;
  OR?: InputMaybe<Array<HostComponentsAggregateInput>>;
  count?: InputMaybe<Scalars['Int']['input']>;
  count_GT?: InputMaybe<Scalars['Int']['input']>;
  count_GTE?: InputMaybe<Scalars['Int']['input']>;
  count_LT?: InputMaybe<Scalars['Int']['input']>;
  count_LTE?: InputMaybe<Scalars['Int']['input']>;
  node?: InputMaybe<HostComponentsNodeAggregationWhereInput>;
};

export type HostComponentsConnectFieldInput = {
  connect?: InputMaybe<Array<ComponentConnectInput>>;
  /** Whether or not to overwrite any matching relationship with the new properties. */
  overwrite?: Scalars['Boolean']['input'];
  where?: InputMaybe<ComponentConnectWhere>;
};

export type HostComponentsConnection = {
  __typename?: 'HostComponentsConnection';
  edges: Array<HostComponentsRelationship>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type HostComponentsConnectionSort = {
  node?: InputMaybe<ComponentSort>;
};

export type HostComponentsConnectionWhere = {
  AND?: InputMaybe<Array<HostComponentsConnectionWhere>>;
  NOT?: InputMaybe<HostComponentsConnectionWhere>;
  OR?: InputMaybe<Array<HostComponentsConnectionWhere>>;
  node?: InputMaybe<ComponentWhere>;
};

export type HostComponentsCreateFieldInput = {
  node: ComponentCreateInput;
};

export type HostComponentsDeleteFieldInput = {
  delete?: InputMaybe<ComponentDeleteInput>;
  where?: InputMaybe<HostComponentsConnectionWhere>;
};

export type HostComponentsDisconnectFieldInput = {
  disconnect?: InputMaybe<ComponentDisconnectInput>;
  where?: InputMaybe<HostComponentsConnectionWhere>;
};

export type HostComponentsFieldInput = {
  connect?: InputMaybe<Array<HostComponentsConnectFieldInput>>;
  create?: InputMaybe<Array<HostComponentsCreateFieldInput>>;
};

export type HostComponentsNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<HostComponentsNodeAggregationWhereInput>>;
  NOT?: InputMaybe<HostComponentsNodeAggregationWhereInput>;
  OR?: InputMaybe<Array<HostComponentsNodeAggregationWhereInput>>;
  name_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
};

export type HostComponentsRelationship = {
  __typename?: 'HostComponentsRelationship';
  cursor: Scalars['String']['output'];
  node: Component;
};

export type HostComponentsUpdateConnectionInput = {
  node?: InputMaybe<ComponentUpdateInput>;
};

export type HostComponentsUpdateFieldInput = {
  connect?: InputMaybe<Array<HostComponentsConnectFieldInput>>;
  create?: InputMaybe<Array<HostComponentsCreateFieldInput>>;
  delete?: InputMaybe<Array<HostComponentsDeleteFieldInput>>;
  disconnect?: InputMaybe<Array<HostComponentsDisconnectFieldInput>>;
  update?: InputMaybe<HostComponentsUpdateConnectionInput>;
  where?: InputMaybe<HostComponentsConnectionWhere>;
};

export type HostConnectInput = {
  components?: InputMaybe<Array<HostComponentsConnectFieldInput>>;
  network_services?: InputMaybe<Array<HostNetwork_ServicesConnectFieldInput>>;
  node?: InputMaybe<HostNodeConnectFieldInput>;
  software_versions?: InputMaybe<Array<HostSoftware_VersionsConnectFieldInput>>;
};

export type HostConnectWhere = {
  node: HostWhere;
};

export type HostCreateInput = {
  components?: InputMaybe<HostComponentsFieldInput>;
  hostname?: InputMaybe<Scalars['String']['input']>;
  network_services?: InputMaybe<HostNetwork_ServicesFieldInput>;
  node?: InputMaybe<HostNodeFieldInput>;
  software_versions?: InputMaybe<HostSoftware_VersionsFieldInput>;
};

export type HostDeleteInput = {
  components?: InputMaybe<Array<HostComponentsDeleteFieldInput>>;
  network_services?: InputMaybe<Array<HostNetwork_ServicesDeleteFieldInput>>;
  node?: InputMaybe<HostNodeDeleteFieldInput>;
  software_versions?: InputMaybe<Array<HostSoftware_VersionsDeleteFieldInput>>;
};

export type HostDisconnectInput = {
  components?: InputMaybe<Array<HostComponentsDisconnectFieldInput>>;
  network_services?: InputMaybe<
    Array<HostNetwork_ServicesDisconnectFieldInput>
  >;
  node?: InputMaybe<HostNodeDisconnectFieldInput>;
  software_versions?: InputMaybe<
    Array<HostSoftware_VersionsDisconnectFieldInput>
  >;
};

export type HostEdge = {
  __typename?: 'HostEdge';
  cursor: Scalars['String']['output'];
  node: Host;
};

export type HostNetworkServiceNetwork_ServicesAggregationSelection = {
  __typename?: 'HostNetworkServiceNetwork_servicesAggregationSelection';
  count: Scalars['Int']['output'];
  node?: Maybe<HostNetworkServiceNetwork_ServicesNodeAggregateSelection>;
};

export type HostNetworkServiceNetwork_ServicesNodeAggregateSelection = {
  __typename?: 'HostNetworkServiceNetwork_servicesNodeAggregateSelection';
  port: IntAggregateSelection;
  protocol: StringAggregateSelection;
  service: StringAggregateSelection;
};

export type HostNetwork_ServicesAggregateInput = {
  AND?: InputMaybe<Array<HostNetwork_ServicesAggregateInput>>;
  NOT?: InputMaybe<HostNetwork_ServicesAggregateInput>;
  OR?: InputMaybe<Array<HostNetwork_ServicesAggregateInput>>;
  count?: InputMaybe<Scalars['Int']['input']>;
  count_GT?: InputMaybe<Scalars['Int']['input']>;
  count_GTE?: InputMaybe<Scalars['Int']['input']>;
  count_LT?: InputMaybe<Scalars['Int']['input']>;
  count_LTE?: InputMaybe<Scalars['Int']['input']>;
  node?: InputMaybe<HostNetwork_ServicesNodeAggregationWhereInput>;
};

export type HostNetwork_ServicesConnectFieldInput = {
  connect?: InputMaybe<Array<NetworkServiceConnectInput>>;
  /** Whether or not to overwrite any matching relationship with the new properties. */
  overwrite?: Scalars['Boolean']['input'];
  where?: InputMaybe<NetworkServiceConnectWhere>;
};

export type HostNetwork_ServicesConnection = {
  __typename?: 'HostNetwork_servicesConnection';
  edges: Array<HostNetwork_ServicesRelationship>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type HostNetwork_ServicesConnectionSort = {
  node?: InputMaybe<NetworkServiceSort>;
};

export type HostNetwork_ServicesConnectionWhere = {
  AND?: InputMaybe<Array<HostNetwork_ServicesConnectionWhere>>;
  NOT?: InputMaybe<HostNetwork_ServicesConnectionWhere>;
  OR?: InputMaybe<Array<HostNetwork_ServicesConnectionWhere>>;
  node?: InputMaybe<NetworkServiceWhere>;
};

export type HostNetwork_ServicesCreateFieldInput = {
  node: NetworkServiceCreateInput;
};

export type HostNetwork_ServicesDeleteFieldInput = {
  delete?: InputMaybe<NetworkServiceDeleteInput>;
  where?: InputMaybe<HostNetwork_ServicesConnectionWhere>;
};

export type HostNetwork_ServicesDisconnectFieldInput = {
  disconnect?: InputMaybe<NetworkServiceDisconnectInput>;
  where?: InputMaybe<HostNetwork_ServicesConnectionWhere>;
};

export type HostNetwork_ServicesFieldInput = {
  connect?: InputMaybe<Array<HostNetwork_ServicesConnectFieldInput>>;
  create?: InputMaybe<Array<HostNetwork_ServicesCreateFieldInput>>;
};

export type HostNetwork_ServicesNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<HostNetwork_ServicesNodeAggregationWhereInput>>;
  NOT?: InputMaybe<HostNetwork_ServicesNodeAggregationWhereInput>;
  OR?: InputMaybe<Array<HostNetwork_ServicesNodeAggregationWhereInput>>;
  port_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  port_AVERAGE_GT?: InputMaybe<Scalars['Float']['input']>;
  port_AVERAGE_GTE?: InputMaybe<Scalars['Float']['input']>;
  port_AVERAGE_LT?: InputMaybe<Scalars['Float']['input']>;
  port_AVERAGE_LTE?: InputMaybe<Scalars['Float']['input']>;
  port_MAX_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  port_MAX_GT?: InputMaybe<Scalars['Int']['input']>;
  port_MAX_GTE?: InputMaybe<Scalars['Int']['input']>;
  port_MAX_LT?: InputMaybe<Scalars['Int']['input']>;
  port_MAX_LTE?: InputMaybe<Scalars['Int']['input']>;
  port_MIN_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  port_MIN_GT?: InputMaybe<Scalars['Int']['input']>;
  port_MIN_GTE?: InputMaybe<Scalars['Int']['input']>;
  port_MIN_LT?: InputMaybe<Scalars['Int']['input']>;
  port_MIN_LTE?: InputMaybe<Scalars['Int']['input']>;
  port_SUM_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  port_SUM_GT?: InputMaybe<Scalars['Int']['input']>;
  port_SUM_GTE?: InputMaybe<Scalars['Int']['input']>;
  port_SUM_LT?: InputMaybe<Scalars['Int']['input']>;
  port_SUM_LTE?: InputMaybe<Scalars['Int']['input']>;
  protocol_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  protocol_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  protocol_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  protocol_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  protocol_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  protocol_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  protocol_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  protocol_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  protocol_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  protocol_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  protocol_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  protocol_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  protocol_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  protocol_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  protocol_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  service_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  service_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  service_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  service_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  service_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  service_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  service_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  service_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  service_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  service_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  service_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  service_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  service_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  service_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  service_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
};

export type HostNetwork_ServicesRelationship = {
  __typename?: 'HostNetwork_servicesRelationship';
  cursor: Scalars['String']['output'];
  node: NetworkService;
};

export type HostNetwork_ServicesUpdateConnectionInput = {
  node?: InputMaybe<NetworkServiceUpdateInput>;
};

export type HostNetwork_ServicesUpdateFieldInput = {
  connect?: InputMaybe<Array<HostNetwork_ServicesConnectFieldInput>>;
  create?: InputMaybe<Array<HostNetwork_ServicesCreateFieldInput>>;
  delete?: InputMaybe<Array<HostNetwork_ServicesDeleteFieldInput>>;
  disconnect?: InputMaybe<Array<HostNetwork_ServicesDisconnectFieldInput>>;
  update?: InputMaybe<HostNetwork_ServicesUpdateConnectionInput>;
  where?: InputMaybe<HostNetwork_ServicesConnectionWhere>;
};

export type HostNodeAggregateInput = {
  AND?: InputMaybe<Array<HostNodeAggregateInput>>;
  NOT?: InputMaybe<HostNodeAggregateInput>;
  OR?: InputMaybe<Array<HostNodeAggregateInput>>;
  count?: InputMaybe<Scalars['Int']['input']>;
  count_GT?: InputMaybe<Scalars['Int']['input']>;
  count_GTE?: InputMaybe<Scalars['Int']['input']>;
  count_LT?: InputMaybe<Scalars['Int']['input']>;
  count_LTE?: InputMaybe<Scalars['Int']['input']>;
  node?: InputMaybe<HostNodeNodeAggregationWhereInput>;
};

export type HostNodeConnectFieldInput = {
  connect?: InputMaybe<NodeObjectConnectInput>;
  /** Whether or not to overwrite any matching relationship with the new properties. */
  overwrite?: Scalars['Boolean']['input'];
  where?: InputMaybe<NodeObjectConnectWhere>;
};

export type HostNodeConnection = {
  __typename?: 'HostNodeConnection';
  edges: Array<HostNodeRelationship>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type HostNodeConnectionSort = {
  node?: InputMaybe<NodeObjectSort>;
};

export type HostNodeConnectionWhere = {
  AND?: InputMaybe<Array<HostNodeConnectionWhere>>;
  NOT?: InputMaybe<HostNodeConnectionWhere>;
  OR?: InputMaybe<Array<HostNodeConnectionWhere>>;
  node?: InputMaybe<NodeObjectWhere>;
};

export type HostNodeCreateFieldInput = {
  node: NodeObjectCreateInput;
};

export type HostNodeDeleteFieldInput = {
  delete?: InputMaybe<NodeObjectDeleteInput>;
  where?: InputMaybe<HostNodeConnectionWhere>;
};

export type HostNodeDisconnectFieldInput = {
  disconnect?: InputMaybe<NodeObjectDisconnectInput>;
  where?: InputMaybe<HostNodeConnectionWhere>;
};

export type HostNodeFieldInput = {
  connect?: InputMaybe<HostNodeConnectFieldInput>;
  create?: InputMaybe<HostNodeCreateFieldInput>;
};

export type HostNodeNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<HostNodeNodeAggregationWhereInput>>;
  NOT?: InputMaybe<HostNodeNodeAggregationWhereInput>;
  OR?: InputMaybe<Array<HostNodeNodeAggregationWhereInput>>;
  degree_centrality_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  degree_centrality_AVERAGE_GT?: InputMaybe<Scalars['Float']['input']>;
  degree_centrality_AVERAGE_GTE?: InputMaybe<Scalars['Float']['input']>;
  degree_centrality_AVERAGE_LT?: InputMaybe<Scalars['Float']['input']>;
  degree_centrality_AVERAGE_LTE?: InputMaybe<Scalars['Float']['input']>;
  degree_centrality_MAX_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  degree_centrality_MAX_GT?: InputMaybe<Scalars['Float']['input']>;
  degree_centrality_MAX_GTE?: InputMaybe<Scalars['Float']['input']>;
  degree_centrality_MAX_LT?: InputMaybe<Scalars['Float']['input']>;
  degree_centrality_MAX_LTE?: InputMaybe<Scalars['Float']['input']>;
  degree_centrality_MIN_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  degree_centrality_MIN_GT?: InputMaybe<Scalars['Float']['input']>;
  degree_centrality_MIN_GTE?: InputMaybe<Scalars['Float']['input']>;
  degree_centrality_MIN_LT?: InputMaybe<Scalars['Float']['input']>;
  degree_centrality_MIN_LTE?: InputMaybe<Scalars['Float']['input']>;
  degree_centrality_SUM_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  degree_centrality_SUM_GT?: InputMaybe<Scalars['Float']['input']>;
  degree_centrality_SUM_GTE?: InputMaybe<Scalars['Float']['input']>;
  degree_centrality_SUM_LT?: InputMaybe<Scalars['Float']['input']>;
  degree_centrality_SUM_LTE?: InputMaybe<Scalars['Float']['input']>;
  final_criticality_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  final_criticality_AVERAGE_GT?: InputMaybe<Scalars['Float']['input']>;
  final_criticality_AVERAGE_GTE?: InputMaybe<Scalars['Float']['input']>;
  final_criticality_AVERAGE_LT?: InputMaybe<Scalars['Float']['input']>;
  final_criticality_AVERAGE_LTE?: InputMaybe<Scalars['Float']['input']>;
  final_criticality_MAX_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  final_criticality_MAX_GT?: InputMaybe<Scalars['Float']['input']>;
  final_criticality_MAX_GTE?: InputMaybe<Scalars['Float']['input']>;
  final_criticality_MAX_LT?: InputMaybe<Scalars['Float']['input']>;
  final_criticality_MAX_LTE?: InputMaybe<Scalars['Float']['input']>;
  final_criticality_MIN_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  final_criticality_MIN_GT?: InputMaybe<Scalars['Float']['input']>;
  final_criticality_MIN_GTE?: InputMaybe<Scalars['Float']['input']>;
  final_criticality_MIN_LT?: InputMaybe<Scalars['Float']['input']>;
  final_criticality_MIN_LTE?: InputMaybe<Scalars['Float']['input']>;
  final_criticality_SUM_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  final_criticality_SUM_GT?: InputMaybe<Scalars['Float']['input']>;
  final_criticality_SUM_GTE?: InputMaybe<Scalars['Float']['input']>;
  final_criticality_SUM_LT?: InputMaybe<Scalars['Float']['input']>;
  final_criticality_SUM_LTE?: InputMaybe<Scalars['Float']['input']>;
  mission_criticality_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  mission_criticality_AVERAGE_GT?: InputMaybe<Scalars['Float']['input']>;
  mission_criticality_AVERAGE_GTE?: InputMaybe<Scalars['Float']['input']>;
  mission_criticality_AVERAGE_LT?: InputMaybe<Scalars['Float']['input']>;
  mission_criticality_AVERAGE_LTE?: InputMaybe<Scalars['Float']['input']>;
  mission_criticality_MAX_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  mission_criticality_MAX_GT?: InputMaybe<Scalars['Float']['input']>;
  mission_criticality_MAX_GTE?: InputMaybe<Scalars['Float']['input']>;
  mission_criticality_MAX_LT?: InputMaybe<Scalars['Float']['input']>;
  mission_criticality_MAX_LTE?: InputMaybe<Scalars['Float']['input']>;
  mission_criticality_MIN_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  mission_criticality_MIN_GT?: InputMaybe<Scalars['Float']['input']>;
  mission_criticality_MIN_GTE?: InputMaybe<Scalars['Float']['input']>;
  mission_criticality_MIN_LT?: InputMaybe<Scalars['Float']['input']>;
  mission_criticality_MIN_LTE?: InputMaybe<Scalars['Float']['input']>;
  mission_criticality_SUM_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  mission_criticality_SUM_GT?: InputMaybe<Scalars['Float']['input']>;
  mission_criticality_SUM_GTE?: InputMaybe<Scalars['Float']['input']>;
  mission_criticality_SUM_LT?: InputMaybe<Scalars['Float']['input']>;
  mission_criticality_SUM_LTE?: InputMaybe<Scalars['Float']['input']>;
  pagerank_centrality_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  pagerank_centrality_AVERAGE_GT?: InputMaybe<Scalars['Float']['input']>;
  pagerank_centrality_AVERAGE_GTE?: InputMaybe<Scalars['Float']['input']>;
  pagerank_centrality_AVERAGE_LT?: InputMaybe<Scalars['Float']['input']>;
  pagerank_centrality_AVERAGE_LTE?: InputMaybe<Scalars['Float']['input']>;
  pagerank_centrality_MAX_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  pagerank_centrality_MAX_GT?: InputMaybe<Scalars['Float']['input']>;
  pagerank_centrality_MAX_GTE?: InputMaybe<Scalars['Float']['input']>;
  pagerank_centrality_MAX_LT?: InputMaybe<Scalars['Float']['input']>;
  pagerank_centrality_MAX_LTE?: InputMaybe<Scalars['Float']['input']>;
  pagerank_centrality_MIN_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  pagerank_centrality_MIN_GT?: InputMaybe<Scalars['Float']['input']>;
  pagerank_centrality_MIN_GTE?: InputMaybe<Scalars['Float']['input']>;
  pagerank_centrality_MIN_LT?: InputMaybe<Scalars['Float']['input']>;
  pagerank_centrality_MIN_LTE?: InputMaybe<Scalars['Float']['input']>;
  pagerank_centrality_SUM_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  pagerank_centrality_SUM_GT?: InputMaybe<Scalars['Float']['input']>;
  pagerank_centrality_SUM_GTE?: InputMaybe<Scalars['Float']['input']>;
  pagerank_centrality_SUM_LT?: InputMaybe<Scalars['Float']['input']>;
  pagerank_centrality_SUM_LTE?: InputMaybe<Scalars['Float']['input']>;
  topology_betweenness_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  topology_betweenness_AVERAGE_GT?: InputMaybe<Scalars['Float']['input']>;
  topology_betweenness_AVERAGE_GTE?: InputMaybe<Scalars['Float']['input']>;
  topology_betweenness_AVERAGE_LT?: InputMaybe<Scalars['Float']['input']>;
  topology_betweenness_AVERAGE_LTE?: InputMaybe<Scalars['Float']['input']>;
  topology_betweenness_MAX_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  topology_betweenness_MAX_GT?: InputMaybe<Scalars['Float']['input']>;
  topology_betweenness_MAX_GTE?: InputMaybe<Scalars['Float']['input']>;
  topology_betweenness_MAX_LT?: InputMaybe<Scalars['Float']['input']>;
  topology_betweenness_MAX_LTE?: InputMaybe<Scalars['Float']['input']>;
  topology_betweenness_MIN_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  topology_betweenness_MIN_GT?: InputMaybe<Scalars['Float']['input']>;
  topology_betweenness_MIN_GTE?: InputMaybe<Scalars['Float']['input']>;
  topology_betweenness_MIN_LT?: InputMaybe<Scalars['Float']['input']>;
  topology_betweenness_MIN_LTE?: InputMaybe<Scalars['Float']['input']>;
  topology_betweenness_SUM_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  topology_betweenness_SUM_GT?: InputMaybe<Scalars['Float']['input']>;
  topology_betweenness_SUM_GTE?: InputMaybe<Scalars['Float']['input']>;
  topology_betweenness_SUM_LT?: InputMaybe<Scalars['Float']['input']>;
  topology_betweenness_SUM_LTE?: InputMaybe<Scalars['Float']['input']>;
  topology_betweenness_norm_AVERAGE_EQUAL?: InputMaybe<
    Scalars['Float']['input']
  >;
  topology_betweenness_norm_AVERAGE_GT?: InputMaybe<Scalars['Float']['input']>;
  topology_betweenness_norm_AVERAGE_GTE?: InputMaybe<Scalars['Float']['input']>;
  topology_betweenness_norm_AVERAGE_LT?: InputMaybe<Scalars['Float']['input']>;
  topology_betweenness_norm_AVERAGE_LTE?: InputMaybe<Scalars['Float']['input']>;
  topology_betweenness_norm_MAX_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  topology_betweenness_norm_MAX_GT?: InputMaybe<Scalars['Float']['input']>;
  topology_betweenness_norm_MAX_GTE?: InputMaybe<Scalars['Float']['input']>;
  topology_betweenness_norm_MAX_LT?: InputMaybe<Scalars['Float']['input']>;
  topology_betweenness_norm_MAX_LTE?: InputMaybe<Scalars['Float']['input']>;
  topology_betweenness_norm_MIN_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  topology_betweenness_norm_MIN_GT?: InputMaybe<Scalars['Float']['input']>;
  topology_betweenness_norm_MIN_GTE?: InputMaybe<Scalars['Float']['input']>;
  topology_betweenness_norm_MIN_LT?: InputMaybe<Scalars['Float']['input']>;
  topology_betweenness_norm_MIN_LTE?: InputMaybe<Scalars['Float']['input']>;
  topology_betweenness_norm_SUM_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  topology_betweenness_norm_SUM_GT?: InputMaybe<Scalars['Float']['input']>;
  topology_betweenness_norm_SUM_GTE?: InputMaybe<Scalars['Float']['input']>;
  topology_betweenness_norm_SUM_LT?: InputMaybe<Scalars['Float']['input']>;
  topology_betweenness_norm_SUM_LTE?: InputMaybe<Scalars['Float']['input']>;
  topology_degree_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  topology_degree_AVERAGE_GT?: InputMaybe<Scalars['Float']['input']>;
  topology_degree_AVERAGE_GTE?: InputMaybe<Scalars['Float']['input']>;
  topology_degree_AVERAGE_LT?: InputMaybe<Scalars['Float']['input']>;
  topology_degree_AVERAGE_LTE?: InputMaybe<Scalars['Float']['input']>;
  topology_degree_MAX_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  topology_degree_MAX_GT?: InputMaybe<Scalars['Float']['input']>;
  topology_degree_MAX_GTE?: InputMaybe<Scalars['Float']['input']>;
  topology_degree_MAX_LT?: InputMaybe<Scalars['Float']['input']>;
  topology_degree_MAX_LTE?: InputMaybe<Scalars['Float']['input']>;
  topology_degree_MIN_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  topology_degree_MIN_GT?: InputMaybe<Scalars['Float']['input']>;
  topology_degree_MIN_GTE?: InputMaybe<Scalars['Float']['input']>;
  topology_degree_MIN_LT?: InputMaybe<Scalars['Float']['input']>;
  topology_degree_MIN_LTE?: InputMaybe<Scalars['Float']['input']>;
  topology_degree_SUM_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  topology_degree_SUM_GT?: InputMaybe<Scalars['Float']['input']>;
  topology_degree_SUM_GTE?: InputMaybe<Scalars['Float']['input']>;
  topology_degree_SUM_LT?: InputMaybe<Scalars['Float']['input']>;
  topology_degree_SUM_LTE?: InputMaybe<Scalars['Float']['input']>;
  topology_degree_norm_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  topology_degree_norm_AVERAGE_GT?: InputMaybe<Scalars['Float']['input']>;
  topology_degree_norm_AVERAGE_GTE?: InputMaybe<Scalars['Float']['input']>;
  topology_degree_norm_AVERAGE_LT?: InputMaybe<Scalars['Float']['input']>;
  topology_degree_norm_AVERAGE_LTE?: InputMaybe<Scalars['Float']['input']>;
  topology_degree_norm_MAX_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  topology_degree_norm_MAX_GT?: InputMaybe<Scalars['Float']['input']>;
  topology_degree_norm_MAX_GTE?: InputMaybe<Scalars['Float']['input']>;
  topology_degree_norm_MAX_LT?: InputMaybe<Scalars['Float']['input']>;
  topology_degree_norm_MAX_LTE?: InputMaybe<Scalars['Float']['input']>;
  topology_degree_norm_MIN_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  topology_degree_norm_MIN_GT?: InputMaybe<Scalars['Float']['input']>;
  topology_degree_norm_MIN_GTE?: InputMaybe<Scalars['Float']['input']>;
  topology_degree_norm_MIN_LT?: InputMaybe<Scalars['Float']['input']>;
  topology_degree_norm_MIN_LTE?: InputMaybe<Scalars['Float']['input']>;
  topology_degree_norm_SUM_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  topology_degree_norm_SUM_GT?: InputMaybe<Scalars['Float']['input']>;
  topology_degree_norm_SUM_GTE?: InputMaybe<Scalars['Float']['input']>;
  topology_degree_norm_SUM_LT?: InputMaybe<Scalars['Float']['input']>;
  topology_degree_norm_SUM_LTE?: InputMaybe<Scalars['Float']['input']>;
};

export type HostNodeObjectNodeAggregationSelection = {
  __typename?: 'HostNodeObjectNodeAggregationSelection';
  count: Scalars['Int']['output'];
  node?: Maybe<HostNodeObjectNodeNodeAggregateSelection>;
};

export type HostNodeObjectNodeNodeAggregateSelection = {
  __typename?: 'HostNodeObjectNodeNodeAggregateSelection';
  degree_centrality: FloatAggregateSelection;
  final_criticality: FloatAggregateSelection;
  mission_criticality: FloatAggregateSelection;
  pagerank_centrality: FloatAggregateSelection;
  topology_betweenness: FloatAggregateSelection;
  topology_betweenness_norm: FloatAggregateSelection;
  topology_degree: FloatAggregateSelection;
  topology_degree_norm: FloatAggregateSelection;
};

export type HostNodeRelationship = {
  __typename?: 'HostNodeRelationship';
  cursor: Scalars['String']['output'];
  node: NodeObject;
};

export type HostNodeUpdateConnectionInput = {
  node?: InputMaybe<NodeObjectUpdateInput>;
};

export type HostNodeUpdateFieldInput = {
  connect?: InputMaybe<HostNodeConnectFieldInput>;
  create?: InputMaybe<HostNodeCreateFieldInput>;
  delete?: InputMaybe<HostNodeDeleteFieldInput>;
  disconnect?: InputMaybe<HostNodeDisconnectFieldInput>;
  update?: InputMaybe<HostNodeUpdateConnectionInput>;
  where?: InputMaybe<HostNodeConnectionWhere>;
};

export type HostOptions = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  /**
   * Specify one or more HostSort objects to sort Hosts by. The sorts will be
   * applied in the order in which they are arranged in the array.
   */
  sort?: InputMaybe<Array<HostSort>>;
};

export type HostRelationInput = {
  components?: InputMaybe<Array<HostComponentsCreateFieldInput>>;
  network_services?: InputMaybe<Array<HostNetwork_ServicesCreateFieldInput>>;
  node?: InputMaybe<HostNodeCreateFieldInput>;
  software_versions?: InputMaybe<Array<HostSoftware_VersionsCreateFieldInput>>;
};

export type HostSoftwareVersionSoftware_VersionsAggregationSelection = {
  __typename?: 'HostSoftwareVersionSoftware_versionsAggregationSelection';
  count: Scalars['Int']['output'];
  node?: Maybe<HostSoftwareVersionSoftware_VersionsNodeAggregateSelection>;
};

export type HostSoftwareVersionSoftware_VersionsNodeAggregateSelection = {
  __typename?: 'HostSoftwareVersionSoftware_versionsNodeAggregateSelection';
  version: StringAggregateSelection;
};

export type HostSoftware_VersionsAggregateInput = {
  AND?: InputMaybe<Array<HostSoftware_VersionsAggregateInput>>;
  NOT?: InputMaybe<HostSoftware_VersionsAggregateInput>;
  OR?: InputMaybe<Array<HostSoftware_VersionsAggregateInput>>;
  count?: InputMaybe<Scalars['Int']['input']>;
  count_GT?: InputMaybe<Scalars['Int']['input']>;
  count_GTE?: InputMaybe<Scalars['Int']['input']>;
  count_LT?: InputMaybe<Scalars['Int']['input']>;
  count_LTE?: InputMaybe<Scalars['Int']['input']>;
  node?: InputMaybe<HostSoftware_VersionsNodeAggregationWhereInput>;
};

export type HostSoftware_VersionsConnectFieldInput = {
  connect?: InputMaybe<Array<SoftwareVersionConnectInput>>;
  /** Whether or not to overwrite any matching relationship with the new properties. */
  overwrite?: Scalars['Boolean']['input'];
  where?: InputMaybe<SoftwareVersionConnectWhere>;
};

export type HostSoftware_VersionsConnection = {
  __typename?: 'HostSoftware_versionsConnection';
  edges: Array<HostSoftware_VersionsRelationship>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type HostSoftware_VersionsConnectionSort = {
  node?: InputMaybe<SoftwareVersionSort>;
};

export type HostSoftware_VersionsConnectionWhere = {
  AND?: InputMaybe<Array<HostSoftware_VersionsConnectionWhere>>;
  NOT?: InputMaybe<HostSoftware_VersionsConnectionWhere>;
  OR?: InputMaybe<Array<HostSoftware_VersionsConnectionWhere>>;
  node?: InputMaybe<SoftwareVersionWhere>;
};

export type HostSoftware_VersionsCreateFieldInput = {
  node: SoftwareVersionCreateInput;
};

export type HostSoftware_VersionsDeleteFieldInput = {
  delete?: InputMaybe<SoftwareVersionDeleteInput>;
  where?: InputMaybe<HostSoftware_VersionsConnectionWhere>;
};

export type HostSoftware_VersionsDisconnectFieldInput = {
  disconnect?: InputMaybe<SoftwareVersionDisconnectInput>;
  where?: InputMaybe<HostSoftware_VersionsConnectionWhere>;
};

export type HostSoftware_VersionsFieldInput = {
  connect?: InputMaybe<Array<HostSoftware_VersionsConnectFieldInput>>;
  create?: InputMaybe<Array<HostSoftware_VersionsCreateFieldInput>>;
};

export type HostSoftware_VersionsNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<HostSoftware_VersionsNodeAggregationWhereInput>>;
  NOT?: InputMaybe<HostSoftware_VersionsNodeAggregationWhereInput>;
  OR?: InputMaybe<Array<HostSoftware_VersionsNodeAggregationWhereInput>>;
  version_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  version_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  version_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  version_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  version_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  version_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  version_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  version_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  version_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  version_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  version_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  version_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  version_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  version_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  version_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
};

export type HostSoftware_VersionsRelationship = {
  __typename?: 'HostSoftware_versionsRelationship';
  cursor: Scalars['String']['output'];
  node: SoftwareVersion;
};

export type HostSoftware_VersionsUpdateConnectionInput = {
  node?: InputMaybe<SoftwareVersionUpdateInput>;
};

export type HostSoftware_VersionsUpdateFieldInput = {
  connect?: InputMaybe<Array<HostSoftware_VersionsConnectFieldInput>>;
  create?: InputMaybe<Array<HostSoftware_VersionsCreateFieldInput>>;
  delete?: InputMaybe<Array<HostSoftware_VersionsDeleteFieldInput>>;
  disconnect?: InputMaybe<Array<HostSoftware_VersionsDisconnectFieldInput>>;
  update?: InputMaybe<HostSoftware_VersionsUpdateConnectionInput>;
  where?: InputMaybe<HostSoftware_VersionsConnectionWhere>;
};

/**
 * Fields to sort Hosts by. The order in which sorts are applied is not guaranteed
 * when specifying many fields in one HostSort object.
 */
export type HostSort = {
  _id?: InputMaybe<SortDirection>;
  hostname?: InputMaybe<SortDirection>;
};

export type HostUpdateInput = {
  components?: InputMaybe<Array<HostComponentsUpdateFieldInput>>;
  hostname?: InputMaybe<Scalars['String']['input']>;
  network_services?: InputMaybe<Array<HostNetwork_ServicesUpdateFieldInput>>;
  node?: InputMaybe<HostNodeUpdateFieldInput>;
  software_versions?: InputMaybe<Array<HostSoftware_VersionsUpdateFieldInput>>;
};

export type HostWhere = {
  AND?: InputMaybe<Array<HostWhere>>;
  NOT?: InputMaybe<HostWhere>;
  OR?: InputMaybe<Array<HostWhere>>;
  _id?: InputMaybe<Scalars['ID']['input']>;
  _id_CONTAINS?: InputMaybe<Scalars['ID']['input']>;
  _id_ENDS_WITH?: InputMaybe<Scalars['ID']['input']>;
  _id_IN?: InputMaybe<Array<Scalars['ID']['input']>>;
  _id_STARTS_WITH?: InputMaybe<Scalars['ID']['input']>;
  componentsAggregate?: InputMaybe<HostComponentsAggregateInput>;
  /** Return Hosts where all of the related HostComponentsConnections match this filter */
  componentsConnection_ALL?: InputMaybe<HostComponentsConnectionWhere>;
  /** Return Hosts where none of the related HostComponentsConnections match this filter */
  componentsConnection_NONE?: InputMaybe<HostComponentsConnectionWhere>;
  /** Return Hosts where one of the related HostComponentsConnections match this filter */
  componentsConnection_SINGLE?: InputMaybe<HostComponentsConnectionWhere>;
  /** Return Hosts where some of the related HostComponentsConnections match this filter */
  componentsConnection_SOME?: InputMaybe<HostComponentsConnectionWhere>;
  /** Return Hosts where all of the related Components match this filter */
  components_ALL?: InputMaybe<ComponentWhere>;
  /** Return Hosts where none of the related Components match this filter */
  components_NONE?: InputMaybe<ComponentWhere>;
  /** Return Hosts where one of the related Components match this filter */
  components_SINGLE?: InputMaybe<ComponentWhere>;
  /** Return Hosts where some of the related Components match this filter */
  components_SOME?: InputMaybe<ComponentWhere>;
  hostname?: InputMaybe<Scalars['String']['input']>;
  hostname_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  hostname_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  hostname_IN?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  hostname_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
  network_servicesAggregate?: InputMaybe<HostNetwork_ServicesAggregateInput>;
  /** Return Hosts where all of the related HostNetwork_servicesConnections match this filter */
  network_servicesConnection_ALL?: InputMaybe<HostNetwork_ServicesConnectionWhere>;
  /** Return Hosts where none of the related HostNetwork_servicesConnections match this filter */
  network_servicesConnection_NONE?: InputMaybe<HostNetwork_ServicesConnectionWhere>;
  /** Return Hosts where one of the related HostNetwork_servicesConnections match this filter */
  network_servicesConnection_SINGLE?: InputMaybe<HostNetwork_ServicesConnectionWhere>;
  /** Return Hosts where some of the related HostNetwork_servicesConnections match this filter */
  network_servicesConnection_SOME?: InputMaybe<HostNetwork_ServicesConnectionWhere>;
  /** Return Hosts where all of the related NetworkServices match this filter */
  network_services_ALL?: InputMaybe<NetworkServiceWhere>;
  /** Return Hosts where none of the related NetworkServices match this filter */
  network_services_NONE?: InputMaybe<NetworkServiceWhere>;
  /** Return Hosts where one of the related NetworkServices match this filter */
  network_services_SINGLE?: InputMaybe<NetworkServiceWhere>;
  /** Return Hosts where some of the related NetworkServices match this filter */
  network_services_SOME?: InputMaybe<NetworkServiceWhere>;
  node?: InputMaybe<NodeObjectWhere>;
  nodeAggregate?: InputMaybe<HostNodeAggregateInput>;
  nodeConnection?: InputMaybe<HostNodeConnectionWhere>;
  nodeConnection_NOT?: InputMaybe<HostNodeConnectionWhere>;
  node_NOT?: InputMaybe<NodeObjectWhere>;
  software_versionsAggregate?: InputMaybe<HostSoftware_VersionsAggregateInput>;
  /** Return Hosts where all of the related HostSoftware_versionsConnections match this filter */
  software_versionsConnection_ALL?: InputMaybe<HostSoftware_VersionsConnectionWhere>;
  /** Return Hosts where none of the related HostSoftware_versionsConnections match this filter */
  software_versionsConnection_NONE?: InputMaybe<HostSoftware_VersionsConnectionWhere>;
  /** Return Hosts where one of the related HostSoftware_versionsConnections match this filter */
  software_versionsConnection_SINGLE?: InputMaybe<HostSoftware_VersionsConnectionWhere>;
  /** Return Hosts where some of the related HostSoftware_versionsConnections match this filter */
  software_versionsConnection_SOME?: InputMaybe<HostSoftware_VersionsConnectionWhere>;
  /** Return Hosts where all of the related SoftwareVersions match this filter */
  software_versions_ALL?: InputMaybe<SoftwareVersionWhere>;
  /** Return Hosts where none of the related SoftwareVersions match this filter */
  software_versions_NONE?: InputMaybe<SoftwareVersionWhere>;
  /** Return Hosts where one of the related SoftwareVersions match this filter */
  software_versions_SINGLE?: InputMaybe<SoftwareVersionWhere>;
  /** Return Hosts where some of the related SoftwareVersions match this filter */
  software_versions_SOME?: InputMaybe<SoftwareVersionWhere>;
};

export type HostsConnection = {
  __typename?: 'HostsConnection';
  edges: Array<HostEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type Ip = {
  __typename?: 'IP';
  _id: Scalars['ID']['output'];
  address: Scalars['String']['output'];
  domain_names: Array<DomainName>;
  domain_namesAggregate?: Maybe<IpDomainNameDomain_NamesAggregationSelection>;
  domain_namesConnection: IpDomain_NamesConnection;
  nodes: Array<NodeObject>;
  nodesAggregate?: Maybe<IpNodeObjectNodesAggregationSelection>;
  nodesConnection: IpNodesConnection;
  status?: Maybe<Scalars['String']['output']>;
  subnets: Array<Subnet>;
  subnetsAggregate?: Maybe<IpSubnetSubnetsAggregationSelection>;
  subnetsConnection: IpSubnetsConnection;
  tag?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  uris: Array<Uri>;
  urisAggregate?: Maybe<IpuriUrisAggregationSelection>;
  urisConnection: IpUrisConnection;
  version?: Maybe<Scalars['Int']['output']>;
};

export type IpDomain_NamesArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  options?: InputMaybe<DomainNameOptions>;
  where?: InputMaybe<DomainNameWhere>;
};

export type IpDomain_NamesAggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<DomainNameWhere>;
};

export type IpDomain_NamesConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<IpDomain_NamesConnectionSort>>;
  where?: InputMaybe<IpDomain_NamesConnectionWhere>;
};

export type IpNodesArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  options?: InputMaybe<NodeObjectOptions>;
  where?: InputMaybe<NodeObjectWhere>;
};

export type IpNodesAggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<NodeObjectWhere>;
};

export type IpNodesConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<IpNodesConnectionSort>>;
  where?: InputMaybe<IpNodesConnectionWhere>;
};

export type IpSubnetsArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  options?: InputMaybe<SubnetOptions>;
  where?: InputMaybe<SubnetWhere>;
};

export type IpSubnetsAggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<SubnetWhere>;
};

export type IpSubnetsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<IpSubnetsConnectionSort>>;
  where?: InputMaybe<IpSubnetsConnectionWhere>;
};

export type IpUrisArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  options?: InputMaybe<UriOptions>;
  where?: InputMaybe<UriWhere>;
};

export type IpUrisAggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<UriWhere>;
};

export type IpUrisConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<IpUrisConnectionSort>>;
  where?: InputMaybe<IpUrisConnectionWhere>;
};

export type IpAggregateSelection = {
  __typename?: 'IPAggregateSelection';
  address: StringAggregateSelection;
  count: Scalars['Int']['output'];
  status: StringAggregateSelection;
  version: IntAggregateSelection;
};

export type IpConnectInput = {
  domain_names?: InputMaybe<Array<IpDomain_NamesConnectFieldInput>>;
  nodes?: InputMaybe<Array<IpNodesConnectFieldInput>>;
  subnets?: InputMaybe<Array<IpSubnetsConnectFieldInput>>;
  uris?: InputMaybe<Array<IpUrisConnectFieldInput>>;
};

export type IpConnectWhere = {
  node: IpWhere;
};

export type IpCreateInput = {
  address: Scalars['String']['input'];
  domain_names?: InputMaybe<IpDomain_NamesFieldInput>;
  nodes?: InputMaybe<IpNodesFieldInput>;
  status?: InputMaybe<Scalars['String']['input']>;
  subnets?: InputMaybe<IpSubnetsFieldInput>;
  tag?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  uris?: InputMaybe<IpUrisFieldInput>;
  version?: InputMaybe<Scalars['Int']['input']>;
};

export type IpDeleteInput = {
  domain_names?: InputMaybe<Array<IpDomain_NamesDeleteFieldInput>>;
  nodes?: InputMaybe<Array<IpNodesDeleteFieldInput>>;
  subnets?: InputMaybe<Array<IpSubnetsDeleteFieldInput>>;
  uris?: InputMaybe<Array<IpUrisDeleteFieldInput>>;
};

export type IpDisconnectInput = {
  domain_names?: InputMaybe<Array<IpDomain_NamesDisconnectFieldInput>>;
  nodes?: InputMaybe<Array<IpNodesDisconnectFieldInput>>;
  subnets?: InputMaybe<Array<IpSubnetsDisconnectFieldInput>>;
  uris?: InputMaybe<Array<IpUrisDisconnectFieldInput>>;
};

export type IpDomainNameDomain_NamesAggregationSelection = {
  __typename?: 'IPDomainNameDomain_namesAggregationSelection';
  count: Scalars['Int']['output'];
  edge?: Maybe<IpDomainNameDomain_NamesEdgeAggregateSelection>;
  node?: Maybe<IpDomainNameDomain_NamesNodeAggregateSelection>;
};

export type IpDomainNameDomain_NamesEdgeAggregateSelection = {
  __typename?: 'IPDomainNameDomain_namesEdgeAggregateSelection';
  end: StringAggregateSelection;
  start: StringAggregateSelection;
};

export type IpDomainNameDomain_NamesNodeAggregateSelection = {
  __typename?: 'IPDomainNameDomain_namesNodeAggregateSelection';
  domain_name: StringAggregateSelection;
};

export type IpDomain_NamesAggregateInput = {
  AND?: InputMaybe<Array<IpDomain_NamesAggregateInput>>;
  NOT?: InputMaybe<IpDomain_NamesAggregateInput>;
  OR?: InputMaybe<Array<IpDomain_NamesAggregateInput>>;
  count?: InputMaybe<Scalars['Int']['input']>;
  count_GT?: InputMaybe<Scalars['Int']['input']>;
  count_GTE?: InputMaybe<Scalars['Int']['input']>;
  count_LT?: InputMaybe<Scalars['Int']['input']>;
  count_LTE?: InputMaybe<Scalars['Int']['input']>;
  edge?: InputMaybe<ResolvesToAggregationWhereInput>;
  node?: InputMaybe<IpDomain_NamesNodeAggregationWhereInput>;
};

export type IpDomain_NamesConnectFieldInput = {
  connect?: InputMaybe<Array<DomainNameConnectInput>>;
  edge?: InputMaybe<ResolvesToCreateInput>;
  /** Whether or not to overwrite any matching relationship with the new properties. */
  overwrite?: Scalars['Boolean']['input'];
  where?: InputMaybe<DomainNameConnectWhere>;
};

export type IpDomain_NamesConnection = {
  __typename?: 'IPDomain_namesConnection';
  edges: Array<IpDomain_NamesRelationship>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type IpDomain_NamesConnectionSort = {
  edge?: InputMaybe<ResolvesToSort>;
  node?: InputMaybe<DomainNameSort>;
};

export type IpDomain_NamesConnectionWhere = {
  AND?: InputMaybe<Array<IpDomain_NamesConnectionWhere>>;
  NOT?: InputMaybe<IpDomain_NamesConnectionWhere>;
  OR?: InputMaybe<Array<IpDomain_NamesConnectionWhere>>;
  edge?: InputMaybe<ResolvesToWhere>;
  node?: InputMaybe<DomainNameWhere>;
};

export type IpDomain_NamesCreateFieldInput = {
  edge?: InputMaybe<ResolvesToCreateInput>;
  node: DomainNameCreateInput;
};

export type IpDomain_NamesDeleteFieldInput = {
  delete?: InputMaybe<DomainNameDeleteInput>;
  where?: InputMaybe<IpDomain_NamesConnectionWhere>;
};

export type IpDomain_NamesDisconnectFieldInput = {
  disconnect?: InputMaybe<DomainNameDisconnectInput>;
  where?: InputMaybe<IpDomain_NamesConnectionWhere>;
};

export type IpDomain_NamesFieldInput = {
  connect?: InputMaybe<Array<IpDomain_NamesConnectFieldInput>>;
  create?: InputMaybe<Array<IpDomain_NamesCreateFieldInput>>;
};

export type IpDomain_NamesNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<IpDomain_NamesNodeAggregationWhereInput>>;
  NOT?: InputMaybe<IpDomain_NamesNodeAggregationWhereInput>;
  OR?: InputMaybe<Array<IpDomain_NamesNodeAggregationWhereInput>>;
  domain_name_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  domain_name_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  domain_name_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  domain_name_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  domain_name_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  domain_name_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  domain_name_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  domain_name_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  domain_name_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  domain_name_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  domain_name_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  domain_name_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  domain_name_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  domain_name_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  domain_name_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
};

export type IpDomain_NamesRelationship = {
  __typename?: 'IPDomain_namesRelationship';
  cursor: Scalars['String']['output'];
  node: DomainName;
  properties: ResolvesTo;
};

export type IpDomain_NamesUpdateConnectionInput = {
  edge?: InputMaybe<ResolvesToUpdateInput>;
  node?: InputMaybe<DomainNameUpdateInput>;
};

export type IpDomain_NamesUpdateFieldInput = {
  connect?: InputMaybe<Array<IpDomain_NamesConnectFieldInput>>;
  create?: InputMaybe<Array<IpDomain_NamesCreateFieldInput>>;
  delete?: InputMaybe<Array<IpDomain_NamesDeleteFieldInput>>;
  disconnect?: InputMaybe<Array<IpDomain_NamesDisconnectFieldInput>>;
  update?: InputMaybe<IpDomain_NamesUpdateConnectionInput>;
  where?: InputMaybe<IpDomain_NamesConnectionWhere>;
};

export type IpEdge = {
  __typename?: 'IPEdge';
  cursor: Scalars['String']['output'];
  node: Ip;
};

export type IpNodeObjectNodesAggregationSelection = {
  __typename?: 'IPNodeObjectNodesAggregationSelection';
  count: Scalars['Int']['output'];
  edge?: Maybe<IpNodeObjectNodesEdgeAggregateSelection>;
  node?: Maybe<IpNodeObjectNodesNodeAggregateSelection>;
};

export type IpNodeObjectNodesEdgeAggregateSelection = {
  __typename?: 'IPNodeObjectNodesEdgeAggregateSelection';
  end: StringAggregateSelection;
  start: StringAggregateSelection;
};

export type IpNodeObjectNodesNodeAggregateSelection = {
  __typename?: 'IPNodeObjectNodesNodeAggregateSelection';
  degree_centrality: FloatAggregateSelection;
  final_criticality: FloatAggregateSelection;
  mission_criticality: FloatAggregateSelection;
  pagerank_centrality: FloatAggregateSelection;
  topology_betweenness: FloatAggregateSelection;
  topology_betweenness_norm: FloatAggregateSelection;
  topology_degree: FloatAggregateSelection;
  topology_degree_norm: FloatAggregateSelection;
};

export type IpNodesAggregateInput = {
  AND?: InputMaybe<Array<IpNodesAggregateInput>>;
  NOT?: InputMaybe<IpNodesAggregateInput>;
  OR?: InputMaybe<Array<IpNodesAggregateInput>>;
  count?: InputMaybe<Scalars['Int']['input']>;
  count_GT?: InputMaybe<Scalars['Int']['input']>;
  count_GTE?: InputMaybe<Scalars['Int']['input']>;
  count_LT?: InputMaybe<Scalars['Int']['input']>;
  count_LTE?: InputMaybe<Scalars['Int']['input']>;
  edge?: InputMaybe<HasAssignedAggregationWhereInput>;
  node?: InputMaybe<IpNodesNodeAggregationWhereInput>;
};

export type IpNodesConnectFieldInput = {
  connect?: InputMaybe<Array<NodeObjectConnectInput>>;
  edge?: InputMaybe<HasAssignedCreateInput>;
  /** Whether or not to overwrite any matching relationship with the new properties. */
  overwrite?: Scalars['Boolean']['input'];
  where?: InputMaybe<NodeObjectConnectWhere>;
};

export type IpNodesConnection = {
  __typename?: 'IPNodesConnection';
  edges: Array<IpNodesRelationship>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type IpNodesConnectionSort = {
  edge?: InputMaybe<HasAssignedSort>;
  node?: InputMaybe<NodeObjectSort>;
};

export type IpNodesConnectionWhere = {
  AND?: InputMaybe<Array<IpNodesConnectionWhere>>;
  NOT?: InputMaybe<IpNodesConnectionWhere>;
  OR?: InputMaybe<Array<IpNodesConnectionWhere>>;
  edge?: InputMaybe<HasAssignedWhere>;
  node?: InputMaybe<NodeObjectWhere>;
};

export type IpNodesCreateFieldInput = {
  edge?: InputMaybe<HasAssignedCreateInput>;
  node: NodeObjectCreateInput;
};

export type IpNodesDeleteFieldInput = {
  delete?: InputMaybe<NodeObjectDeleteInput>;
  where?: InputMaybe<IpNodesConnectionWhere>;
};

export type IpNodesDisconnectFieldInput = {
  disconnect?: InputMaybe<NodeObjectDisconnectInput>;
  where?: InputMaybe<IpNodesConnectionWhere>;
};

export type IpNodesFieldInput = {
  connect?: InputMaybe<Array<IpNodesConnectFieldInput>>;
  create?: InputMaybe<Array<IpNodesCreateFieldInput>>;
};

export type IpNodesNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<IpNodesNodeAggregationWhereInput>>;
  NOT?: InputMaybe<IpNodesNodeAggregationWhereInput>;
  OR?: InputMaybe<Array<IpNodesNodeAggregationWhereInput>>;
  degree_centrality_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  degree_centrality_AVERAGE_GT?: InputMaybe<Scalars['Float']['input']>;
  degree_centrality_AVERAGE_GTE?: InputMaybe<Scalars['Float']['input']>;
  degree_centrality_AVERAGE_LT?: InputMaybe<Scalars['Float']['input']>;
  degree_centrality_AVERAGE_LTE?: InputMaybe<Scalars['Float']['input']>;
  degree_centrality_MAX_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  degree_centrality_MAX_GT?: InputMaybe<Scalars['Float']['input']>;
  degree_centrality_MAX_GTE?: InputMaybe<Scalars['Float']['input']>;
  degree_centrality_MAX_LT?: InputMaybe<Scalars['Float']['input']>;
  degree_centrality_MAX_LTE?: InputMaybe<Scalars['Float']['input']>;
  degree_centrality_MIN_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  degree_centrality_MIN_GT?: InputMaybe<Scalars['Float']['input']>;
  degree_centrality_MIN_GTE?: InputMaybe<Scalars['Float']['input']>;
  degree_centrality_MIN_LT?: InputMaybe<Scalars['Float']['input']>;
  degree_centrality_MIN_LTE?: InputMaybe<Scalars['Float']['input']>;
  degree_centrality_SUM_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  degree_centrality_SUM_GT?: InputMaybe<Scalars['Float']['input']>;
  degree_centrality_SUM_GTE?: InputMaybe<Scalars['Float']['input']>;
  degree_centrality_SUM_LT?: InputMaybe<Scalars['Float']['input']>;
  degree_centrality_SUM_LTE?: InputMaybe<Scalars['Float']['input']>;
  final_criticality_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  final_criticality_AVERAGE_GT?: InputMaybe<Scalars['Float']['input']>;
  final_criticality_AVERAGE_GTE?: InputMaybe<Scalars['Float']['input']>;
  final_criticality_AVERAGE_LT?: InputMaybe<Scalars['Float']['input']>;
  final_criticality_AVERAGE_LTE?: InputMaybe<Scalars['Float']['input']>;
  final_criticality_MAX_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  final_criticality_MAX_GT?: InputMaybe<Scalars['Float']['input']>;
  final_criticality_MAX_GTE?: InputMaybe<Scalars['Float']['input']>;
  final_criticality_MAX_LT?: InputMaybe<Scalars['Float']['input']>;
  final_criticality_MAX_LTE?: InputMaybe<Scalars['Float']['input']>;
  final_criticality_MIN_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  final_criticality_MIN_GT?: InputMaybe<Scalars['Float']['input']>;
  final_criticality_MIN_GTE?: InputMaybe<Scalars['Float']['input']>;
  final_criticality_MIN_LT?: InputMaybe<Scalars['Float']['input']>;
  final_criticality_MIN_LTE?: InputMaybe<Scalars['Float']['input']>;
  final_criticality_SUM_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  final_criticality_SUM_GT?: InputMaybe<Scalars['Float']['input']>;
  final_criticality_SUM_GTE?: InputMaybe<Scalars['Float']['input']>;
  final_criticality_SUM_LT?: InputMaybe<Scalars['Float']['input']>;
  final_criticality_SUM_LTE?: InputMaybe<Scalars['Float']['input']>;
  mission_criticality_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  mission_criticality_AVERAGE_GT?: InputMaybe<Scalars['Float']['input']>;
  mission_criticality_AVERAGE_GTE?: InputMaybe<Scalars['Float']['input']>;
  mission_criticality_AVERAGE_LT?: InputMaybe<Scalars['Float']['input']>;
  mission_criticality_AVERAGE_LTE?: InputMaybe<Scalars['Float']['input']>;
  mission_criticality_MAX_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  mission_criticality_MAX_GT?: InputMaybe<Scalars['Float']['input']>;
  mission_criticality_MAX_GTE?: InputMaybe<Scalars['Float']['input']>;
  mission_criticality_MAX_LT?: InputMaybe<Scalars['Float']['input']>;
  mission_criticality_MAX_LTE?: InputMaybe<Scalars['Float']['input']>;
  mission_criticality_MIN_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  mission_criticality_MIN_GT?: InputMaybe<Scalars['Float']['input']>;
  mission_criticality_MIN_GTE?: InputMaybe<Scalars['Float']['input']>;
  mission_criticality_MIN_LT?: InputMaybe<Scalars['Float']['input']>;
  mission_criticality_MIN_LTE?: InputMaybe<Scalars['Float']['input']>;
  mission_criticality_SUM_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  mission_criticality_SUM_GT?: InputMaybe<Scalars['Float']['input']>;
  mission_criticality_SUM_GTE?: InputMaybe<Scalars['Float']['input']>;
  mission_criticality_SUM_LT?: InputMaybe<Scalars['Float']['input']>;
  mission_criticality_SUM_LTE?: InputMaybe<Scalars['Float']['input']>;
  pagerank_centrality_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  pagerank_centrality_AVERAGE_GT?: InputMaybe<Scalars['Float']['input']>;
  pagerank_centrality_AVERAGE_GTE?: InputMaybe<Scalars['Float']['input']>;
  pagerank_centrality_AVERAGE_LT?: InputMaybe<Scalars['Float']['input']>;
  pagerank_centrality_AVERAGE_LTE?: InputMaybe<Scalars['Float']['input']>;
  pagerank_centrality_MAX_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  pagerank_centrality_MAX_GT?: InputMaybe<Scalars['Float']['input']>;
  pagerank_centrality_MAX_GTE?: InputMaybe<Scalars['Float']['input']>;
  pagerank_centrality_MAX_LT?: InputMaybe<Scalars['Float']['input']>;
  pagerank_centrality_MAX_LTE?: InputMaybe<Scalars['Float']['input']>;
  pagerank_centrality_MIN_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  pagerank_centrality_MIN_GT?: InputMaybe<Scalars['Float']['input']>;
  pagerank_centrality_MIN_GTE?: InputMaybe<Scalars['Float']['input']>;
  pagerank_centrality_MIN_LT?: InputMaybe<Scalars['Float']['input']>;
  pagerank_centrality_MIN_LTE?: InputMaybe<Scalars['Float']['input']>;
  pagerank_centrality_SUM_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  pagerank_centrality_SUM_GT?: InputMaybe<Scalars['Float']['input']>;
  pagerank_centrality_SUM_GTE?: InputMaybe<Scalars['Float']['input']>;
  pagerank_centrality_SUM_LT?: InputMaybe<Scalars['Float']['input']>;
  pagerank_centrality_SUM_LTE?: InputMaybe<Scalars['Float']['input']>;
  topology_betweenness_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  topology_betweenness_AVERAGE_GT?: InputMaybe<Scalars['Float']['input']>;
  topology_betweenness_AVERAGE_GTE?: InputMaybe<Scalars['Float']['input']>;
  topology_betweenness_AVERAGE_LT?: InputMaybe<Scalars['Float']['input']>;
  topology_betweenness_AVERAGE_LTE?: InputMaybe<Scalars['Float']['input']>;
  topology_betweenness_MAX_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  topology_betweenness_MAX_GT?: InputMaybe<Scalars['Float']['input']>;
  topology_betweenness_MAX_GTE?: InputMaybe<Scalars['Float']['input']>;
  topology_betweenness_MAX_LT?: InputMaybe<Scalars['Float']['input']>;
  topology_betweenness_MAX_LTE?: InputMaybe<Scalars['Float']['input']>;
  topology_betweenness_MIN_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  topology_betweenness_MIN_GT?: InputMaybe<Scalars['Float']['input']>;
  topology_betweenness_MIN_GTE?: InputMaybe<Scalars['Float']['input']>;
  topology_betweenness_MIN_LT?: InputMaybe<Scalars['Float']['input']>;
  topology_betweenness_MIN_LTE?: InputMaybe<Scalars['Float']['input']>;
  topology_betweenness_SUM_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  topology_betweenness_SUM_GT?: InputMaybe<Scalars['Float']['input']>;
  topology_betweenness_SUM_GTE?: InputMaybe<Scalars['Float']['input']>;
  topology_betweenness_SUM_LT?: InputMaybe<Scalars['Float']['input']>;
  topology_betweenness_SUM_LTE?: InputMaybe<Scalars['Float']['input']>;
  topology_betweenness_norm_AVERAGE_EQUAL?: InputMaybe<
    Scalars['Float']['input']
  >;
  topology_betweenness_norm_AVERAGE_GT?: InputMaybe<Scalars['Float']['input']>;
  topology_betweenness_norm_AVERAGE_GTE?: InputMaybe<Scalars['Float']['input']>;
  topology_betweenness_norm_AVERAGE_LT?: InputMaybe<Scalars['Float']['input']>;
  topology_betweenness_norm_AVERAGE_LTE?: InputMaybe<Scalars['Float']['input']>;
  topology_betweenness_norm_MAX_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  topology_betweenness_norm_MAX_GT?: InputMaybe<Scalars['Float']['input']>;
  topology_betweenness_norm_MAX_GTE?: InputMaybe<Scalars['Float']['input']>;
  topology_betweenness_norm_MAX_LT?: InputMaybe<Scalars['Float']['input']>;
  topology_betweenness_norm_MAX_LTE?: InputMaybe<Scalars['Float']['input']>;
  topology_betweenness_norm_MIN_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  topology_betweenness_norm_MIN_GT?: InputMaybe<Scalars['Float']['input']>;
  topology_betweenness_norm_MIN_GTE?: InputMaybe<Scalars['Float']['input']>;
  topology_betweenness_norm_MIN_LT?: InputMaybe<Scalars['Float']['input']>;
  topology_betweenness_norm_MIN_LTE?: InputMaybe<Scalars['Float']['input']>;
  topology_betweenness_norm_SUM_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  topology_betweenness_norm_SUM_GT?: InputMaybe<Scalars['Float']['input']>;
  topology_betweenness_norm_SUM_GTE?: InputMaybe<Scalars['Float']['input']>;
  topology_betweenness_norm_SUM_LT?: InputMaybe<Scalars['Float']['input']>;
  topology_betweenness_norm_SUM_LTE?: InputMaybe<Scalars['Float']['input']>;
  topology_degree_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  topology_degree_AVERAGE_GT?: InputMaybe<Scalars['Float']['input']>;
  topology_degree_AVERAGE_GTE?: InputMaybe<Scalars['Float']['input']>;
  topology_degree_AVERAGE_LT?: InputMaybe<Scalars['Float']['input']>;
  topology_degree_AVERAGE_LTE?: InputMaybe<Scalars['Float']['input']>;
  topology_degree_MAX_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  topology_degree_MAX_GT?: InputMaybe<Scalars['Float']['input']>;
  topology_degree_MAX_GTE?: InputMaybe<Scalars['Float']['input']>;
  topology_degree_MAX_LT?: InputMaybe<Scalars['Float']['input']>;
  topology_degree_MAX_LTE?: InputMaybe<Scalars['Float']['input']>;
  topology_degree_MIN_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  topology_degree_MIN_GT?: InputMaybe<Scalars['Float']['input']>;
  topology_degree_MIN_GTE?: InputMaybe<Scalars['Float']['input']>;
  topology_degree_MIN_LT?: InputMaybe<Scalars['Float']['input']>;
  topology_degree_MIN_LTE?: InputMaybe<Scalars['Float']['input']>;
  topology_degree_SUM_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  topology_degree_SUM_GT?: InputMaybe<Scalars['Float']['input']>;
  topology_degree_SUM_GTE?: InputMaybe<Scalars['Float']['input']>;
  topology_degree_SUM_LT?: InputMaybe<Scalars['Float']['input']>;
  topology_degree_SUM_LTE?: InputMaybe<Scalars['Float']['input']>;
  topology_degree_norm_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  topology_degree_norm_AVERAGE_GT?: InputMaybe<Scalars['Float']['input']>;
  topology_degree_norm_AVERAGE_GTE?: InputMaybe<Scalars['Float']['input']>;
  topology_degree_norm_AVERAGE_LT?: InputMaybe<Scalars['Float']['input']>;
  topology_degree_norm_AVERAGE_LTE?: InputMaybe<Scalars['Float']['input']>;
  topology_degree_norm_MAX_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  topology_degree_norm_MAX_GT?: InputMaybe<Scalars['Float']['input']>;
  topology_degree_norm_MAX_GTE?: InputMaybe<Scalars['Float']['input']>;
  topology_degree_norm_MAX_LT?: InputMaybe<Scalars['Float']['input']>;
  topology_degree_norm_MAX_LTE?: InputMaybe<Scalars['Float']['input']>;
  topology_degree_norm_MIN_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  topology_degree_norm_MIN_GT?: InputMaybe<Scalars['Float']['input']>;
  topology_degree_norm_MIN_GTE?: InputMaybe<Scalars['Float']['input']>;
  topology_degree_norm_MIN_LT?: InputMaybe<Scalars['Float']['input']>;
  topology_degree_norm_MIN_LTE?: InputMaybe<Scalars['Float']['input']>;
  topology_degree_norm_SUM_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  topology_degree_norm_SUM_GT?: InputMaybe<Scalars['Float']['input']>;
  topology_degree_norm_SUM_GTE?: InputMaybe<Scalars['Float']['input']>;
  topology_degree_norm_SUM_LT?: InputMaybe<Scalars['Float']['input']>;
  topology_degree_norm_SUM_LTE?: InputMaybe<Scalars['Float']['input']>;
};

export type IpNodesRelationship = {
  __typename?: 'IPNodesRelationship';
  cursor: Scalars['String']['output'];
  node: NodeObject;
  properties: HasAssigned;
};

export type IpNodesUpdateConnectionInput = {
  edge?: InputMaybe<HasAssignedUpdateInput>;
  node?: InputMaybe<NodeObjectUpdateInput>;
};

export type IpNodesUpdateFieldInput = {
  connect?: InputMaybe<Array<IpNodesConnectFieldInput>>;
  create?: InputMaybe<Array<IpNodesCreateFieldInput>>;
  delete?: InputMaybe<Array<IpNodesDeleteFieldInput>>;
  disconnect?: InputMaybe<Array<IpNodesDisconnectFieldInput>>;
  update?: InputMaybe<IpNodesUpdateConnectionInput>;
  where?: InputMaybe<IpNodesConnectionWhere>;
};

export type IpOptions = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  /**
   * Specify one or more IPSort objects to sort Ips by. The sorts will be applied
   * in the order in which they are arranged in the array.
   */
  sort?: InputMaybe<Array<IpSort>>;
};

export type IpRelationInput = {
  domain_names?: InputMaybe<Array<IpDomain_NamesCreateFieldInput>>;
  nodes?: InputMaybe<Array<IpNodesCreateFieldInput>>;
  subnets?: InputMaybe<Array<IpSubnetsCreateFieldInput>>;
  uris?: InputMaybe<Array<IpUrisCreateFieldInput>>;
};

/**
 * Fields to sort Ips by. The order in which sorts are applied is not guaranteed
 * when specifying many fields in one IPSort object.
 */
export type IpSort = {
  _id?: InputMaybe<SortDirection>;
  address?: InputMaybe<SortDirection>;
  status?: InputMaybe<SortDirection>;
  version?: InputMaybe<SortDirection>;
};

export type IpSubnetSubnetsAggregationSelection = {
  __typename?: 'IPSubnetSubnetsAggregationSelection';
  count: Scalars['Int']['output'];
  node?: Maybe<IpSubnetSubnetsNodeAggregateSelection>;
};

export type IpSubnetSubnetsNodeAggregateSelection = {
  __typename?: 'IPSubnetSubnetsNodeAggregateSelection';
  note: StringAggregateSelection;
  range: StringAggregateSelection;
};

export type IpSubnetsAggregateInput = {
  AND?: InputMaybe<Array<IpSubnetsAggregateInput>>;
  NOT?: InputMaybe<IpSubnetsAggregateInput>;
  OR?: InputMaybe<Array<IpSubnetsAggregateInput>>;
  count?: InputMaybe<Scalars['Int']['input']>;
  count_GT?: InputMaybe<Scalars['Int']['input']>;
  count_GTE?: InputMaybe<Scalars['Int']['input']>;
  count_LT?: InputMaybe<Scalars['Int']['input']>;
  count_LTE?: InputMaybe<Scalars['Int']['input']>;
  node?: InputMaybe<IpSubnetsNodeAggregationWhereInput>;
};

export type IpSubnetsConnectFieldInput = {
  connect?: InputMaybe<Array<SubnetConnectInput>>;
  /** Whether or not to overwrite any matching relationship with the new properties. */
  overwrite?: Scalars['Boolean']['input'];
  where?: InputMaybe<SubnetConnectWhere>;
};

export type IpSubnetsConnection = {
  __typename?: 'IPSubnetsConnection';
  edges: Array<IpSubnetsRelationship>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type IpSubnetsConnectionSort = {
  node?: InputMaybe<SubnetSort>;
};

export type IpSubnetsConnectionWhere = {
  AND?: InputMaybe<Array<IpSubnetsConnectionWhere>>;
  NOT?: InputMaybe<IpSubnetsConnectionWhere>;
  OR?: InputMaybe<Array<IpSubnetsConnectionWhere>>;
  node?: InputMaybe<SubnetWhere>;
};

export type IpSubnetsCreateFieldInput = {
  node: SubnetCreateInput;
};

export type IpSubnetsDeleteFieldInput = {
  delete?: InputMaybe<SubnetDeleteInput>;
  where?: InputMaybe<IpSubnetsConnectionWhere>;
};

export type IpSubnetsDisconnectFieldInput = {
  disconnect?: InputMaybe<SubnetDisconnectInput>;
  where?: InputMaybe<IpSubnetsConnectionWhere>;
};

export type IpSubnetsFieldInput = {
  connect?: InputMaybe<Array<IpSubnetsConnectFieldInput>>;
  create?: InputMaybe<Array<IpSubnetsCreateFieldInput>>;
};

export type IpSubnetsNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<IpSubnetsNodeAggregationWhereInput>>;
  NOT?: InputMaybe<IpSubnetsNodeAggregationWhereInput>;
  OR?: InputMaybe<Array<IpSubnetsNodeAggregationWhereInput>>;
  note_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  note_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  note_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  note_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  note_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  note_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  note_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  note_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  note_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  note_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  note_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  note_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  note_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  note_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  note_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  range_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  range_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  range_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  range_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  range_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  range_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  range_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  range_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  range_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  range_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  range_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  range_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  range_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  range_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  range_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
};

export type IpSubnetsRelationship = {
  __typename?: 'IPSubnetsRelationship';
  cursor: Scalars['String']['output'];
  node: Subnet;
};

export type IpSubnetsUpdateConnectionInput = {
  node?: InputMaybe<SubnetUpdateInput>;
};

export type IpSubnetsUpdateFieldInput = {
  connect?: InputMaybe<Array<IpSubnetsConnectFieldInput>>;
  create?: InputMaybe<Array<IpSubnetsCreateFieldInput>>;
  delete?: InputMaybe<Array<IpSubnetsDeleteFieldInput>>;
  disconnect?: InputMaybe<Array<IpSubnetsDisconnectFieldInput>>;
  update?: InputMaybe<IpSubnetsUpdateConnectionInput>;
  where?: InputMaybe<IpSubnetsConnectionWhere>;
};

export type IpuriUrisAggregationSelection = {
  __typename?: 'IPURIUrisAggregationSelection';
  count: Scalars['Int']['output'];
  node?: Maybe<IpuriUrisNodeAggregateSelection>;
};

export type IpuriUrisNodeAggregateSelection = {
  __typename?: 'IPURIUrisNodeAggregateSelection';
  identifier: StringAggregateSelection;
};

export type IpUpdateInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  domain_names?: InputMaybe<Array<IpDomain_NamesUpdateFieldInput>>;
  nodes?: InputMaybe<Array<IpNodesUpdateFieldInput>>;
  status?: InputMaybe<Scalars['String']['input']>;
  subnets?: InputMaybe<Array<IpSubnetsUpdateFieldInput>>;
  tag?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  tag_POP?: InputMaybe<Scalars['Int']['input']>;
  tag_PUSH?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  uris?: InputMaybe<Array<IpUrisUpdateFieldInput>>;
  version?: InputMaybe<Scalars['Int']['input']>;
  version_DECREMENT?: InputMaybe<Scalars['Int']['input']>;
  version_INCREMENT?: InputMaybe<Scalars['Int']['input']>;
};

export type IpUrisAggregateInput = {
  AND?: InputMaybe<Array<IpUrisAggregateInput>>;
  NOT?: InputMaybe<IpUrisAggregateInput>;
  OR?: InputMaybe<Array<IpUrisAggregateInput>>;
  count?: InputMaybe<Scalars['Int']['input']>;
  count_GT?: InputMaybe<Scalars['Int']['input']>;
  count_GTE?: InputMaybe<Scalars['Int']['input']>;
  count_LT?: InputMaybe<Scalars['Int']['input']>;
  count_LTE?: InputMaybe<Scalars['Int']['input']>;
  node?: InputMaybe<IpUrisNodeAggregationWhereInput>;
};

export type IpUrisConnectFieldInput = {
  connect?: InputMaybe<Array<UriConnectInput>>;
  /** Whether or not to overwrite any matching relationship with the new properties. */
  overwrite?: Scalars['Boolean']['input'];
  where?: InputMaybe<UriConnectWhere>;
};

export type IpUrisConnection = {
  __typename?: 'IPUrisConnection';
  edges: Array<IpUrisRelationship>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type IpUrisConnectionSort = {
  node?: InputMaybe<UriSort>;
};

export type IpUrisConnectionWhere = {
  AND?: InputMaybe<Array<IpUrisConnectionWhere>>;
  NOT?: InputMaybe<IpUrisConnectionWhere>;
  OR?: InputMaybe<Array<IpUrisConnectionWhere>>;
  node?: InputMaybe<UriWhere>;
};

export type IpUrisCreateFieldInput = {
  node: UriCreateInput;
};

export type IpUrisDeleteFieldInput = {
  delete?: InputMaybe<UriDeleteInput>;
  where?: InputMaybe<IpUrisConnectionWhere>;
};

export type IpUrisDisconnectFieldInput = {
  disconnect?: InputMaybe<UriDisconnectInput>;
  where?: InputMaybe<IpUrisConnectionWhere>;
};

export type IpUrisFieldInput = {
  connect?: InputMaybe<Array<IpUrisConnectFieldInput>>;
  create?: InputMaybe<Array<IpUrisCreateFieldInput>>;
};

export type IpUrisNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<IpUrisNodeAggregationWhereInput>>;
  NOT?: InputMaybe<IpUrisNodeAggregationWhereInput>;
  OR?: InputMaybe<Array<IpUrisNodeAggregationWhereInput>>;
  identifier_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  identifier_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  identifier_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  identifier_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  identifier_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  identifier_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  identifier_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  identifier_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  identifier_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  identifier_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  identifier_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  identifier_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  identifier_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  identifier_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  identifier_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
};

export type IpUrisRelationship = {
  __typename?: 'IPUrisRelationship';
  cursor: Scalars['String']['output'];
  node: Uri;
};

export type IpUrisUpdateConnectionInput = {
  node?: InputMaybe<UriUpdateInput>;
};

export type IpUrisUpdateFieldInput = {
  connect?: InputMaybe<Array<IpUrisConnectFieldInput>>;
  create?: InputMaybe<Array<IpUrisCreateFieldInput>>;
  delete?: InputMaybe<Array<IpUrisDeleteFieldInput>>;
  disconnect?: InputMaybe<Array<IpUrisDisconnectFieldInput>>;
  update?: InputMaybe<IpUrisUpdateConnectionInput>;
  where?: InputMaybe<IpUrisConnectionWhere>;
};

export type IpWhere = {
  AND?: InputMaybe<Array<IpWhere>>;
  NOT?: InputMaybe<IpWhere>;
  OR?: InputMaybe<Array<IpWhere>>;
  _id?: InputMaybe<Scalars['ID']['input']>;
  _id_CONTAINS?: InputMaybe<Scalars['ID']['input']>;
  _id_ENDS_WITH?: InputMaybe<Scalars['ID']['input']>;
  _id_IN?: InputMaybe<Array<Scalars['ID']['input']>>;
  _id_STARTS_WITH?: InputMaybe<Scalars['ID']['input']>;
  address?: InputMaybe<Scalars['String']['input']>;
  address_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  address_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  address_IN?: InputMaybe<Array<Scalars['String']['input']>>;
  address_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
  domain_namesAggregate?: InputMaybe<IpDomain_NamesAggregateInput>;
  /** Return IPS where all of the related IPDomain_namesConnections match this filter */
  domain_namesConnection_ALL?: InputMaybe<IpDomain_NamesConnectionWhere>;
  /** Return IPS where none of the related IPDomain_namesConnections match this filter */
  domain_namesConnection_NONE?: InputMaybe<IpDomain_NamesConnectionWhere>;
  /** Return IPS where one of the related IPDomain_namesConnections match this filter */
  domain_namesConnection_SINGLE?: InputMaybe<IpDomain_NamesConnectionWhere>;
  /** Return IPS where some of the related IPDomain_namesConnections match this filter */
  domain_namesConnection_SOME?: InputMaybe<IpDomain_NamesConnectionWhere>;
  /** Return IPS where all of the related DomainNames match this filter */
  domain_names_ALL?: InputMaybe<DomainNameWhere>;
  /** Return IPS where none of the related DomainNames match this filter */
  domain_names_NONE?: InputMaybe<DomainNameWhere>;
  /** Return IPS where one of the related DomainNames match this filter */
  domain_names_SINGLE?: InputMaybe<DomainNameWhere>;
  /** Return IPS where some of the related DomainNames match this filter */
  domain_names_SOME?: InputMaybe<DomainNameWhere>;
  nodesAggregate?: InputMaybe<IpNodesAggregateInput>;
  /** Return IPS where all of the related IPNodesConnections match this filter */
  nodesConnection_ALL?: InputMaybe<IpNodesConnectionWhere>;
  /** Return IPS where none of the related IPNodesConnections match this filter */
  nodesConnection_NONE?: InputMaybe<IpNodesConnectionWhere>;
  /** Return IPS where one of the related IPNodesConnections match this filter */
  nodesConnection_SINGLE?: InputMaybe<IpNodesConnectionWhere>;
  /** Return IPS where some of the related IPNodesConnections match this filter */
  nodesConnection_SOME?: InputMaybe<IpNodesConnectionWhere>;
  /** Return IPS where all of the related NodeObjects match this filter */
  nodes_ALL?: InputMaybe<NodeObjectWhere>;
  /** Return IPS where none of the related NodeObjects match this filter */
  nodes_NONE?: InputMaybe<NodeObjectWhere>;
  /** Return IPS where one of the related NodeObjects match this filter */
  nodes_SINGLE?: InputMaybe<NodeObjectWhere>;
  /** Return IPS where some of the related NodeObjects match this filter */
  nodes_SOME?: InputMaybe<NodeObjectWhere>;
  status?: InputMaybe<Scalars['String']['input']>;
  status_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  status_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  status_IN?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  status_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
  subnetsAggregate?: InputMaybe<IpSubnetsAggregateInput>;
  /** Return IPS where all of the related IPSubnetsConnections match this filter */
  subnetsConnection_ALL?: InputMaybe<IpSubnetsConnectionWhere>;
  /** Return IPS where none of the related IPSubnetsConnections match this filter */
  subnetsConnection_NONE?: InputMaybe<IpSubnetsConnectionWhere>;
  /** Return IPS where one of the related IPSubnetsConnections match this filter */
  subnetsConnection_SINGLE?: InputMaybe<IpSubnetsConnectionWhere>;
  /** Return IPS where some of the related IPSubnetsConnections match this filter */
  subnetsConnection_SOME?: InputMaybe<IpSubnetsConnectionWhere>;
  /** Return IPS where all of the related Subnets match this filter */
  subnets_ALL?: InputMaybe<SubnetWhere>;
  /** Return IPS where none of the related Subnets match this filter */
  subnets_NONE?: InputMaybe<SubnetWhere>;
  /** Return IPS where one of the related Subnets match this filter */
  subnets_SINGLE?: InputMaybe<SubnetWhere>;
  /** Return IPS where some of the related Subnets match this filter */
  subnets_SOME?: InputMaybe<SubnetWhere>;
  tag?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  tag_INCLUDES?: InputMaybe<Scalars['String']['input']>;
  urisAggregate?: InputMaybe<IpUrisAggregateInput>;
  /** Return IPS where all of the related IPUrisConnections match this filter */
  urisConnection_ALL?: InputMaybe<IpUrisConnectionWhere>;
  /** Return IPS where none of the related IPUrisConnections match this filter */
  urisConnection_NONE?: InputMaybe<IpUrisConnectionWhere>;
  /** Return IPS where one of the related IPUrisConnections match this filter */
  urisConnection_SINGLE?: InputMaybe<IpUrisConnectionWhere>;
  /** Return IPS where some of the related IPUrisConnections match this filter */
  urisConnection_SOME?: InputMaybe<IpUrisConnectionWhere>;
  /** Return IPS where all of the related URIS match this filter */
  uris_ALL?: InputMaybe<UriWhere>;
  /** Return IPS where none of the related URIS match this filter */
  uris_NONE?: InputMaybe<UriWhere>;
  /** Return IPS where one of the related URIS match this filter */
  uris_SINGLE?: InputMaybe<UriWhere>;
  /** Return IPS where some of the related URIS match this filter */
  uris_SOME?: InputMaybe<UriWhere>;
  version?: InputMaybe<Scalars['Int']['input']>;
  version_GT?: InputMaybe<Scalars['Int']['input']>;
  version_GTE?: InputMaybe<Scalars['Int']['input']>;
  version_IN?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  version_LT?: InputMaybe<Scalars['Int']['input']>;
  version_LTE?: InputMaybe<Scalars['Int']['input']>;
};

export type IntAggregateSelection = {
  __typename?: 'IntAggregateSelection';
  average?: Maybe<Scalars['Float']['output']>;
  max?: Maybe<Scalars['Int']['output']>;
  min?: Maybe<Scalars['Int']['output']>;
  sum?: Maybe<Scalars['Int']['output']>;
};

export type IpsConnection = {
  __typename?: 'IpsConnection';
  edges: Array<IpEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type Mission = {
  __typename?: 'Mission';
  _id: Scalars['ID']['output'];
  availability_requirement?: Maybe<Scalars['Int']['output']>;
  components: Array<Component>;
  componentsAggregate?: Maybe<MissionComponentComponentsAggregationSelection>;
  componentsConnection: MissionComponentsConnection;
  confidentiality_requirement?: Maybe<Scalars['Int']['output']>;
  criticality?: Maybe<Scalars['Int']['output']>;
  description: Scalars['String']['output'];
  integrity_requirement?: Maybe<Scalars['Int']['output']>;
  name: Scalars['String']['output'];
  structure: Scalars['String']['output'];
};

export type MissionComponentsArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  options?: InputMaybe<ComponentOptions>;
  where?: InputMaybe<ComponentWhere>;
};

export type MissionComponentsAggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<ComponentWhere>;
};

export type MissionComponentsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<MissionComponentsConnectionSort>>;
  where?: InputMaybe<MissionComponentsConnectionWhere>;
};

export type MissionAggregateSelection = {
  __typename?: 'MissionAggregateSelection';
  availability_requirement: IntAggregateSelection;
  confidentiality_requirement: IntAggregateSelection;
  count: Scalars['Int']['output'];
  criticality: IntAggregateSelection;
  description: StringAggregateSelection;
  integrity_requirement: IntAggregateSelection;
  name: StringAggregateSelection;
  structure: StringAggregateSelection;
};

export type MissionComponentComponentsAggregationSelection = {
  __typename?: 'MissionComponentComponentsAggregationSelection';
  count: Scalars['Int']['output'];
  node?: Maybe<MissionComponentComponentsNodeAggregateSelection>;
};

export type MissionComponentComponentsNodeAggregateSelection = {
  __typename?: 'MissionComponentComponentsNodeAggregateSelection';
  name: StringAggregateSelection;
};

export type MissionComponentsAggregateInput = {
  AND?: InputMaybe<Array<MissionComponentsAggregateInput>>;
  NOT?: InputMaybe<MissionComponentsAggregateInput>;
  OR?: InputMaybe<Array<MissionComponentsAggregateInput>>;
  count?: InputMaybe<Scalars['Int']['input']>;
  count_GT?: InputMaybe<Scalars['Int']['input']>;
  count_GTE?: InputMaybe<Scalars['Int']['input']>;
  count_LT?: InputMaybe<Scalars['Int']['input']>;
  count_LTE?: InputMaybe<Scalars['Int']['input']>;
  node?: InputMaybe<MissionComponentsNodeAggregationWhereInput>;
};

export type MissionComponentsConnectFieldInput = {
  connect?: InputMaybe<Array<ComponentConnectInput>>;
  /** Whether or not to overwrite any matching relationship with the new properties. */
  overwrite?: Scalars['Boolean']['input'];
  where?: InputMaybe<ComponentConnectWhere>;
};

export type MissionComponentsConnection = {
  __typename?: 'MissionComponentsConnection';
  edges: Array<MissionComponentsRelationship>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type MissionComponentsConnectionSort = {
  node?: InputMaybe<ComponentSort>;
};

export type MissionComponentsConnectionWhere = {
  AND?: InputMaybe<Array<MissionComponentsConnectionWhere>>;
  NOT?: InputMaybe<MissionComponentsConnectionWhere>;
  OR?: InputMaybe<Array<MissionComponentsConnectionWhere>>;
  node?: InputMaybe<ComponentWhere>;
};

export type MissionComponentsCreateFieldInput = {
  node: ComponentCreateInput;
};

export type MissionComponentsDeleteFieldInput = {
  delete?: InputMaybe<ComponentDeleteInput>;
  where?: InputMaybe<MissionComponentsConnectionWhere>;
};

export type MissionComponentsDisconnectFieldInput = {
  disconnect?: InputMaybe<ComponentDisconnectInput>;
  where?: InputMaybe<MissionComponentsConnectionWhere>;
};

export type MissionComponentsFieldInput = {
  connect?: InputMaybe<Array<MissionComponentsConnectFieldInput>>;
  create?: InputMaybe<Array<MissionComponentsCreateFieldInput>>;
};

export type MissionComponentsNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<MissionComponentsNodeAggregationWhereInput>>;
  NOT?: InputMaybe<MissionComponentsNodeAggregationWhereInput>;
  OR?: InputMaybe<Array<MissionComponentsNodeAggregationWhereInput>>;
  name_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
};

export type MissionComponentsRelationship = {
  __typename?: 'MissionComponentsRelationship';
  cursor: Scalars['String']['output'];
  node: Component;
};

export type MissionComponentsUpdateConnectionInput = {
  node?: InputMaybe<ComponentUpdateInput>;
};

export type MissionComponentsUpdateFieldInput = {
  connect?: InputMaybe<Array<MissionComponentsConnectFieldInput>>;
  create?: InputMaybe<Array<MissionComponentsCreateFieldInput>>;
  delete?: InputMaybe<Array<MissionComponentsDeleteFieldInput>>;
  disconnect?: InputMaybe<Array<MissionComponentsDisconnectFieldInput>>;
  update?: InputMaybe<MissionComponentsUpdateConnectionInput>;
  where?: InputMaybe<MissionComponentsConnectionWhere>;
};

export type MissionConnectInput = {
  components?: InputMaybe<Array<MissionComponentsConnectFieldInput>>;
};

export type MissionConnectWhere = {
  node: MissionWhere;
};

export type MissionCreateInput = {
  availability_requirement?: InputMaybe<Scalars['Int']['input']>;
  components?: InputMaybe<MissionComponentsFieldInput>;
  confidentiality_requirement?: InputMaybe<Scalars['Int']['input']>;
  criticality?: InputMaybe<Scalars['Int']['input']>;
  description: Scalars['String']['input'];
  integrity_requirement?: InputMaybe<Scalars['Int']['input']>;
  name: Scalars['String']['input'];
  structure: Scalars['String']['input'];
};

export type MissionDeleteInput = {
  components?: InputMaybe<Array<MissionComponentsDeleteFieldInput>>;
};

export type MissionDependenciesConnection = {
  __typename?: 'MissionDependenciesConnection';
  edges: Array<MissionDependencyEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type MissionDependency = {
  __typename?: 'MissionDependency';
  _id: Scalars['ID']['output'];
  from_components: Array<Component>;
  from_componentsAggregate?: Maybe<MissionDependencyComponentFrom_ComponentsAggregationSelection>;
  from_componentsConnection: MissionDependencyFrom_ComponentsConnection;
  to_components: Array<Component>;
  to_componentsAggregate?: Maybe<MissionDependencyComponentTo_ComponentsAggregationSelection>;
  to_componentsConnection: MissionDependencyTo_ComponentsConnection;
};

export type MissionDependencyFrom_ComponentsArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  options?: InputMaybe<ComponentOptions>;
  where?: InputMaybe<ComponentWhere>;
};

export type MissionDependencyFrom_ComponentsAggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<ComponentWhere>;
};

export type MissionDependencyFrom_ComponentsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<MissionDependencyFrom_ComponentsConnectionSort>>;
  where?: InputMaybe<MissionDependencyFrom_ComponentsConnectionWhere>;
};

export type MissionDependencyTo_ComponentsArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  options?: InputMaybe<ComponentOptions>;
  where?: InputMaybe<ComponentWhere>;
};

export type MissionDependencyTo_ComponentsAggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<ComponentWhere>;
};

export type MissionDependencyTo_ComponentsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<MissionDependencyTo_ComponentsConnectionSort>>;
  where?: InputMaybe<MissionDependencyTo_ComponentsConnectionWhere>;
};

export type MissionDependencyAggregateSelection = {
  __typename?: 'MissionDependencyAggregateSelection';
  count: Scalars['Int']['output'];
};

export type MissionDependencyComponentFrom_ComponentsAggregationSelection = {
  __typename?: 'MissionDependencyComponentFrom_componentsAggregationSelection';
  count: Scalars['Int']['output'];
  node?: Maybe<MissionDependencyComponentFrom_ComponentsNodeAggregateSelection>;
};

export type MissionDependencyComponentFrom_ComponentsNodeAggregateSelection = {
  __typename?: 'MissionDependencyComponentFrom_componentsNodeAggregateSelection';
  name: StringAggregateSelection;
};

export type MissionDependencyComponentTo_ComponentsAggregationSelection = {
  __typename?: 'MissionDependencyComponentTo_componentsAggregationSelection';
  count: Scalars['Int']['output'];
  node?: Maybe<MissionDependencyComponentTo_ComponentsNodeAggregateSelection>;
};

export type MissionDependencyComponentTo_ComponentsNodeAggregateSelection = {
  __typename?: 'MissionDependencyComponentTo_componentsNodeAggregateSelection';
  name: StringAggregateSelection;
};

export type MissionDependencyConnectInput = {
  from_components?: InputMaybe<
    Array<MissionDependencyFrom_ComponentsConnectFieldInput>
  >;
  to_components?: InputMaybe<
    Array<MissionDependencyTo_ComponentsConnectFieldInput>
  >;
};

export type MissionDependencyConnectWhere = {
  node: MissionDependencyWhere;
};

export type MissionDependencyCreateInput = {
  from_components?: InputMaybe<MissionDependencyFrom_ComponentsFieldInput>;
  to_components?: InputMaybe<MissionDependencyTo_ComponentsFieldInput>;
};

export type MissionDependencyDeleteInput = {
  from_components?: InputMaybe<
    Array<MissionDependencyFrom_ComponentsDeleteFieldInput>
  >;
  to_components?: InputMaybe<
    Array<MissionDependencyTo_ComponentsDeleteFieldInput>
  >;
};

export type MissionDependencyDisconnectInput = {
  from_components?: InputMaybe<
    Array<MissionDependencyFrom_ComponentsDisconnectFieldInput>
  >;
  to_components?: InputMaybe<
    Array<MissionDependencyTo_ComponentsDisconnectFieldInput>
  >;
};

export type MissionDependencyEdge = {
  __typename?: 'MissionDependencyEdge';
  cursor: Scalars['String']['output'];
  node: MissionDependency;
};

export type MissionDependencyFrom_ComponentsAggregateInput = {
  AND?: InputMaybe<Array<MissionDependencyFrom_ComponentsAggregateInput>>;
  NOT?: InputMaybe<MissionDependencyFrom_ComponentsAggregateInput>;
  OR?: InputMaybe<Array<MissionDependencyFrom_ComponentsAggregateInput>>;
  count?: InputMaybe<Scalars['Int']['input']>;
  count_GT?: InputMaybe<Scalars['Int']['input']>;
  count_GTE?: InputMaybe<Scalars['Int']['input']>;
  count_LT?: InputMaybe<Scalars['Int']['input']>;
  count_LTE?: InputMaybe<Scalars['Int']['input']>;
  node?: InputMaybe<MissionDependencyFrom_ComponentsNodeAggregationWhereInput>;
};

export type MissionDependencyFrom_ComponentsConnectFieldInput = {
  connect?: InputMaybe<Array<ComponentConnectInput>>;
  /** Whether or not to overwrite any matching relationship with the new properties. */
  overwrite?: Scalars['Boolean']['input'];
  where?: InputMaybe<ComponentConnectWhere>;
};

export type MissionDependencyFrom_ComponentsConnection = {
  __typename?: 'MissionDependencyFrom_componentsConnection';
  edges: Array<MissionDependencyFrom_ComponentsRelationship>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type MissionDependencyFrom_ComponentsConnectionSort = {
  node?: InputMaybe<ComponentSort>;
};

export type MissionDependencyFrom_ComponentsConnectionWhere = {
  AND?: InputMaybe<Array<MissionDependencyFrom_ComponentsConnectionWhere>>;
  NOT?: InputMaybe<MissionDependencyFrom_ComponentsConnectionWhere>;
  OR?: InputMaybe<Array<MissionDependencyFrom_ComponentsConnectionWhere>>;
  node?: InputMaybe<ComponentWhere>;
};

export type MissionDependencyFrom_ComponentsCreateFieldInput = {
  node: ComponentCreateInput;
};

export type MissionDependencyFrom_ComponentsDeleteFieldInput = {
  delete?: InputMaybe<ComponentDeleteInput>;
  where?: InputMaybe<MissionDependencyFrom_ComponentsConnectionWhere>;
};

export type MissionDependencyFrom_ComponentsDisconnectFieldInput = {
  disconnect?: InputMaybe<ComponentDisconnectInput>;
  where?: InputMaybe<MissionDependencyFrom_ComponentsConnectionWhere>;
};

export type MissionDependencyFrom_ComponentsFieldInput = {
  connect?: InputMaybe<
    Array<MissionDependencyFrom_ComponentsConnectFieldInput>
  >;
  create?: InputMaybe<Array<MissionDependencyFrom_ComponentsCreateFieldInput>>;
};

export type MissionDependencyFrom_ComponentsNodeAggregationWhereInput = {
  AND?: InputMaybe<
    Array<MissionDependencyFrom_ComponentsNodeAggregationWhereInput>
  >;
  NOT?: InputMaybe<MissionDependencyFrom_ComponentsNodeAggregationWhereInput>;
  OR?: InputMaybe<
    Array<MissionDependencyFrom_ComponentsNodeAggregationWhereInput>
  >;
  name_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
};

export type MissionDependencyFrom_ComponentsRelationship = {
  __typename?: 'MissionDependencyFrom_componentsRelationship';
  cursor: Scalars['String']['output'];
  node: Component;
};

export type MissionDependencyFrom_ComponentsUpdateConnectionInput = {
  node?: InputMaybe<ComponentUpdateInput>;
};

export type MissionDependencyFrom_ComponentsUpdateFieldInput = {
  connect?: InputMaybe<
    Array<MissionDependencyFrom_ComponentsConnectFieldInput>
  >;
  create?: InputMaybe<Array<MissionDependencyFrom_ComponentsCreateFieldInput>>;
  delete?: InputMaybe<Array<MissionDependencyFrom_ComponentsDeleteFieldInput>>;
  disconnect?: InputMaybe<
    Array<MissionDependencyFrom_ComponentsDisconnectFieldInput>
  >;
  update?: InputMaybe<MissionDependencyFrom_ComponentsUpdateConnectionInput>;
  where?: InputMaybe<MissionDependencyFrom_ComponentsConnectionWhere>;
};

export type MissionDependencyOptions = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  /**
   * Specify one or more MissionDependencySort objects to sort MissionDependencies
   * by. The sorts will be applied in the order in which they are arranged in the array.
   */
  sort?: InputMaybe<Array<MissionDependencySort>>;
};

export type MissionDependencyRelationInput = {
  from_components?: InputMaybe<
    Array<MissionDependencyFrom_ComponentsCreateFieldInput>
  >;
  to_components?: InputMaybe<
    Array<MissionDependencyTo_ComponentsCreateFieldInput>
  >;
};

/**
 * Fields to sort MissionDependencies by. The order in which sorts are applied is
 * not guaranteed when specifying many fields in one MissionDependencySort object.
 */
export type MissionDependencySort = {
  _id?: InputMaybe<SortDirection>;
};

export type MissionDependencyTo_ComponentsAggregateInput = {
  AND?: InputMaybe<Array<MissionDependencyTo_ComponentsAggregateInput>>;
  NOT?: InputMaybe<MissionDependencyTo_ComponentsAggregateInput>;
  OR?: InputMaybe<Array<MissionDependencyTo_ComponentsAggregateInput>>;
  count?: InputMaybe<Scalars['Int']['input']>;
  count_GT?: InputMaybe<Scalars['Int']['input']>;
  count_GTE?: InputMaybe<Scalars['Int']['input']>;
  count_LT?: InputMaybe<Scalars['Int']['input']>;
  count_LTE?: InputMaybe<Scalars['Int']['input']>;
  node?: InputMaybe<MissionDependencyTo_ComponentsNodeAggregationWhereInput>;
};

export type MissionDependencyTo_ComponentsConnectFieldInput = {
  connect?: InputMaybe<Array<ComponentConnectInput>>;
  /** Whether or not to overwrite any matching relationship with the new properties. */
  overwrite?: Scalars['Boolean']['input'];
  where?: InputMaybe<ComponentConnectWhere>;
};

export type MissionDependencyTo_ComponentsConnection = {
  __typename?: 'MissionDependencyTo_componentsConnection';
  edges: Array<MissionDependencyTo_ComponentsRelationship>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type MissionDependencyTo_ComponentsConnectionSort = {
  node?: InputMaybe<ComponentSort>;
};

export type MissionDependencyTo_ComponentsConnectionWhere = {
  AND?: InputMaybe<Array<MissionDependencyTo_ComponentsConnectionWhere>>;
  NOT?: InputMaybe<MissionDependencyTo_ComponentsConnectionWhere>;
  OR?: InputMaybe<Array<MissionDependencyTo_ComponentsConnectionWhere>>;
  node?: InputMaybe<ComponentWhere>;
};

export type MissionDependencyTo_ComponentsCreateFieldInput = {
  node: ComponentCreateInput;
};

export type MissionDependencyTo_ComponentsDeleteFieldInput = {
  delete?: InputMaybe<ComponentDeleteInput>;
  where?: InputMaybe<MissionDependencyTo_ComponentsConnectionWhere>;
};

export type MissionDependencyTo_ComponentsDisconnectFieldInput = {
  disconnect?: InputMaybe<ComponentDisconnectInput>;
  where?: InputMaybe<MissionDependencyTo_ComponentsConnectionWhere>;
};

export type MissionDependencyTo_ComponentsFieldInput = {
  connect?: InputMaybe<Array<MissionDependencyTo_ComponentsConnectFieldInput>>;
  create?: InputMaybe<Array<MissionDependencyTo_ComponentsCreateFieldInput>>;
};

export type MissionDependencyTo_ComponentsNodeAggregationWhereInput = {
  AND?: InputMaybe<
    Array<MissionDependencyTo_ComponentsNodeAggregationWhereInput>
  >;
  NOT?: InputMaybe<MissionDependencyTo_ComponentsNodeAggregationWhereInput>;
  OR?: InputMaybe<
    Array<MissionDependencyTo_ComponentsNodeAggregationWhereInput>
  >;
  name_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
};

export type MissionDependencyTo_ComponentsRelationship = {
  __typename?: 'MissionDependencyTo_componentsRelationship';
  cursor: Scalars['String']['output'];
  node: Component;
};

export type MissionDependencyTo_ComponentsUpdateConnectionInput = {
  node?: InputMaybe<ComponentUpdateInput>;
};

export type MissionDependencyTo_ComponentsUpdateFieldInput = {
  connect?: InputMaybe<Array<MissionDependencyTo_ComponentsConnectFieldInput>>;
  create?: InputMaybe<Array<MissionDependencyTo_ComponentsCreateFieldInput>>;
  delete?: InputMaybe<Array<MissionDependencyTo_ComponentsDeleteFieldInput>>;
  disconnect?: InputMaybe<
    Array<MissionDependencyTo_ComponentsDisconnectFieldInput>
  >;
  update?: InputMaybe<MissionDependencyTo_ComponentsUpdateConnectionInput>;
  where?: InputMaybe<MissionDependencyTo_ComponentsConnectionWhere>;
};

export type MissionDependencyUpdateInput = {
  from_components?: InputMaybe<
    Array<MissionDependencyFrom_ComponentsUpdateFieldInput>
  >;
  to_components?: InputMaybe<
    Array<MissionDependencyTo_ComponentsUpdateFieldInput>
  >;
};

export type MissionDependencyWhere = {
  AND?: InputMaybe<Array<MissionDependencyWhere>>;
  NOT?: InputMaybe<MissionDependencyWhere>;
  OR?: InputMaybe<Array<MissionDependencyWhere>>;
  _id?: InputMaybe<Scalars['ID']['input']>;
  _id_CONTAINS?: InputMaybe<Scalars['ID']['input']>;
  _id_ENDS_WITH?: InputMaybe<Scalars['ID']['input']>;
  _id_IN?: InputMaybe<Array<Scalars['ID']['input']>>;
  _id_STARTS_WITH?: InputMaybe<Scalars['ID']['input']>;
  from_componentsAggregate?: InputMaybe<MissionDependencyFrom_ComponentsAggregateInput>;
  /** Return MissionDependencies where all of the related MissionDependencyFrom_componentsConnections match this filter */
  from_componentsConnection_ALL?: InputMaybe<MissionDependencyFrom_ComponentsConnectionWhere>;
  /** Return MissionDependencies where none of the related MissionDependencyFrom_componentsConnections match this filter */
  from_componentsConnection_NONE?: InputMaybe<MissionDependencyFrom_ComponentsConnectionWhere>;
  /** Return MissionDependencies where one of the related MissionDependencyFrom_componentsConnections match this filter */
  from_componentsConnection_SINGLE?: InputMaybe<MissionDependencyFrom_ComponentsConnectionWhere>;
  /** Return MissionDependencies where some of the related MissionDependencyFrom_componentsConnections match this filter */
  from_componentsConnection_SOME?: InputMaybe<MissionDependencyFrom_ComponentsConnectionWhere>;
  /** Return MissionDependencies where all of the related Components match this filter */
  from_components_ALL?: InputMaybe<ComponentWhere>;
  /** Return MissionDependencies where none of the related Components match this filter */
  from_components_NONE?: InputMaybe<ComponentWhere>;
  /** Return MissionDependencies where one of the related Components match this filter */
  from_components_SINGLE?: InputMaybe<ComponentWhere>;
  /** Return MissionDependencies where some of the related Components match this filter */
  from_components_SOME?: InputMaybe<ComponentWhere>;
  to_componentsAggregate?: InputMaybe<MissionDependencyTo_ComponentsAggregateInput>;
  /** Return MissionDependencies where all of the related MissionDependencyTo_componentsConnections match this filter */
  to_componentsConnection_ALL?: InputMaybe<MissionDependencyTo_ComponentsConnectionWhere>;
  /** Return MissionDependencies where none of the related MissionDependencyTo_componentsConnections match this filter */
  to_componentsConnection_NONE?: InputMaybe<MissionDependencyTo_ComponentsConnectionWhere>;
  /** Return MissionDependencies where one of the related MissionDependencyTo_componentsConnections match this filter */
  to_componentsConnection_SINGLE?: InputMaybe<MissionDependencyTo_ComponentsConnectionWhere>;
  /** Return MissionDependencies where some of the related MissionDependencyTo_componentsConnections match this filter */
  to_componentsConnection_SOME?: InputMaybe<MissionDependencyTo_ComponentsConnectionWhere>;
  /** Return MissionDependencies where all of the related Components match this filter */
  to_components_ALL?: InputMaybe<ComponentWhere>;
  /** Return MissionDependencies where none of the related Components match this filter */
  to_components_NONE?: InputMaybe<ComponentWhere>;
  /** Return MissionDependencies where one of the related Components match this filter */
  to_components_SINGLE?: InputMaybe<ComponentWhere>;
  /** Return MissionDependencies where some of the related Components match this filter */
  to_components_SOME?: InputMaybe<ComponentWhere>;
};

export type MissionDisconnectInput = {
  components?: InputMaybe<Array<MissionComponentsDisconnectFieldInput>>;
};

export type MissionEdge = {
  __typename?: 'MissionEdge';
  cursor: Scalars['String']['output'];
  node: Mission;
};

export type MissionOptions = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  /**
   * Specify one or more MissionSort objects to sort Missions by. The sorts will be
   * applied in the order in which they are arranged in the array.
   */
  sort?: InputMaybe<Array<MissionSort>>;
};

export type MissionRelationInput = {
  components?: InputMaybe<Array<MissionComponentsCreateFieldInput>>;
};

/**
 * Fields to sort Missions by. The order in which sorts are applied is not
 * guaranteed when specifying many fields in one MissionSort object.
 */
export type MissionSort = {
  _id?: InputMaybe<SortDirection>;
  availability_requirement?: InputMaybe<SortDirection>;
  confidentiality_requirement?: InputMaybe<SortDirection>;
  criticality?: InputMaybe<SortDirection>;
  description?: InputMaybe<SortDirection>;
  integrity_requirement?: InputMaybe<SortDirection>;
  name?: InputMaybe<SortDirection>;
  structure?: InputMaybe<SortDirection>;
};

export type MissionUpdateInput = {
  availability_requirement?: InputMaybe<Scalars['Int']['input']>;
  availability_requirement_DECREMENT?: InputMaybe<Scalars['Int']['input']>;
  availability_requirement_INCREMENT?: InputMaybe<Scalars['Int']['input']>;
  components?: InputMaybe<Array<MissionComponentsUpdateFieldInput>>;
  confidentiality_requirement?: InputMaybe<Scalars['Int']['input']>;
  confidentiality_requirement_DECREMENT?: InputMaybe<Scalars['Int']['input']>;
  confidentiality_requirement_INCREMENT?: InputMaybe<Scalars['Int']['input']>;
  criticality?: InputMaybe<Scalars['Int']['input']>;
  criticality_DECREMENT?: InputMaybe<Scalars['Int']['input']>;
  criticality_INCREMENT?: InputMaybe<Scalars['Int']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  integrity_requirement?: InputMaybe<Scalars['Int']['input']>;
  integrity_requirement_DECREMENT?: InputMaybe<Scalars['Int']['input']>;
  integrity_requirement_INCREMENT?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  structure?: InputMaybe<Scalars['String']['input']>;
};

export type MissionWhere = {
  AND?: InputMaybe<Array<MissionWhere>>;
  NOT?: InputMaybe<MissionWhere>;
  OR?: InputMaybe<Array<MissionWhere>>;
  _id?: InputMaybe<Scalars['ID']['input']>;
  _id_CONTAINS?: InputMaybe<Scalars['ID']['input']>;
  _id_ENDS_WITH?: InputMaybe<Scalars['ID']['input']>;
  _id_IN?: InputMaybe<Array<Scalars['ID']['input']>>;
  _id_STARTS_WITH?: InputMaybe<Scalars['ID']['input']>;
  availability_requirement?: InputMaybe<Scalars['Int']['input']>;
  availability_requirement_GT?: InputMaybe<Scalars['Int']['input']>;
  availability_requirement_GTE?: InputMaybe<Scalars['Int']['input']>;
  availability_requirement_IN?: InputMaybe<
    Array<InputMaybe<Scalars['Int']['input']>>
  >;
  availability_requirement_LT?: InputMaybe<Scalars['Int']['input']>;
  availability_requirement_LTE?: InputMaybe<Scalars['Int']['input']>;
  componentsAggregate?: InputMaybe<MissionComponentsAggregateInput>;
  /** Return Missions where all of the related MissionComponentsConnections match this filter */
  componentsConnection_ALL?: InputMaybe<MissionComponentsConnectionWhere>;
  /** Return Missions where none of the related MissionComponentsConnections match this filter */
  componentsConnection_NONE?: InputMaybe<MissionComponentsConnectionWhere>;
  /** Return Missions where one of the related MissionComponentsConnections match this filter */
  componentsConnection_SINGLE?: InputMaybe<MissionComponentsConnectionWhere>;
  /** Return Missions where some of the related MissionComponentsConnections match this filter */
  componentsConnection_SOME?: InputMaybe<MissionComponentsConnectionWhere>;
  /** Return Missions where all of the related Components match this filter */
  components_ALL?: InputMaybe<ComponentWhere>;
  /** Return Missions where none of the related Components match this filter */
  components_NONE?: InputMaybe<ComponentWhere>;
  /** Return Missions where one of the related Components match this filter */
  components_SINGLE?: InputMaybe<ComponentWhere>;
  /** Return Missions where some of the related Components match this filter */
  components_SOME?: InputMaybe<ComponentWhere>;
  confidentiality_requirement?: InputMaybe<Scalars['Int']['input']>;
  confidentiality_requirement_GT?: InputMaybe<Scalars['Int']['input']>;
  confidentiality_requirement_GTE?: InputMaybe<Scalars['Int']['input']>;
  confidentiality_requirement_IN?: InputMaybe<
    Array<InputMaybe<Scalars['Int']['input']>>
  >;
  confidentiality_requirement_LT?: InputMaybe<Scalars['Int']['input']>;
  confidentiality_requirement_LTE?: InputMaybe<Scalars['Int']['input']>;
  criticality?: InputMaybe<Scalars['Int']['input']>;
  criticality_GT?: InputMaybe<Scalars['Int']['input']>;
  criticality_GTE?: InputMaybe<Scalars['Int']['input']>;
  criticality_IN?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  criticality_LT?: InputMaybe<Scalars['Int']['input']>;
  criticality_LTE?: InputMaybe<Scalars['Int']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  description_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  description_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  description_IN?: InputMaybe<Array<Scalars['String']['input']>>;
  description_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
  integrity_requirement?: InputMaybe<Scalars['Int']['input']>;
  integrity_requirement_GT?: InputMaybe<Scalars['Int']['input']>;
  integrity_requirement_GTE?: InputMaybe<Scalars['Int']['input']>;
  integrity_requirement_IN?: InputMaybe<
    Array<InputMaybe<Scalars['Int']['input']>>
  >;
  integrity_requirement_LT?: InputMaybe<Scalars['Int']['input']>;
  integrity_requirement_LTE?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  name_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  name_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  name_IN?: InputMaybe<Array<Scalars['String']['input']>>;
  name_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
  structure?: InputMaybe<Scalars['String']['input']>;
  structure_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  structure_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  structure_IN?: InputMaybe<Array<Scalars['String']['input']>>;
  structure_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
};

export type MissionsConnection = {
  __typename?: 'MissionsConnection';
  edges: Array<MissionEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createApplications: CreateApplicationsMutationResponse;
  createComponents: CreateComponentsMutationResponse;
  createContacts: CreateContactsMutationResponse;
  createCves: CreateCvesMutationResponse;
  createCvsSv2s: CreateCvsSv2sMutationResponse;
  createCvsSv30s: CreateCvsSv30sMutationResponse;
  createCvsSv31s: CreateCvsSv31sMutationResponse;
  createCvsSv40s: CreateCvsSv40sMutationResponse;
  createDevices: CreateDevicesMutationResponse;
  createDomainNames: CreateDomainNamesMutationResponse;
  createHardwareVersions: CreateHardwareVersionsMutationResponse;
  createHosts: CreateHostsMutationResponse;
  createIps: CreateIpsMutationResponse;
  createMissionDependencies: CreateMissionDependenciesMutationResponse;
  createMissions: CreateMissionsMutationResponse;
  createNetworkServices: CreateNetworkServicesMutationResponse;
  createNodeObjects: CreateNodeObjectsMutationResponse;
  createOrganizationUnits: CreateOrganizationUnitsMutationResponse;
  createPhysicalEnvironments: CreatePhysicalEnvironmentsMutationResponse;
  createSoftwareVersions: CreateSoftwareVersionsMutationResponse;
  createSubnets: CreateSubnetsMutationResponse;
  createUris: CreateUrisMutationResponse;
  createVulnerabilities: CreateVulnerabilitiesMutationResponse;
  deleteApplications: DeleteInfo;
  deleteComponents: DeleteInfo;
  deleteContacts: DeleteInfo;
  deleteCves: DeleteInfo;
  deleteCvsSv2s: DeleteInfo;
  deleteCvsSv30s: DeleteInfo;
  deleteCvsSv31s: DeleteInfo;
  deleteCvsSv40s: DeleteInfo;
  deleteDevices: DeleteInfo;
  deleteDomainNames: DeleteInfo;
  deleteHardwareVersions: DeleteInfo;
  deleteHosts: DeleteInfo;
  deleteIps: DeleteInfo;
  deleteMissionDependencies: DeleteInfo;
  deleteMissions: DeleteInfo;
  deleteNetworkServices: DeleteInfo;
  deleteNodeObjects: DeleteInfo;
  deleteOrganizationUnits: DeleteInfo;
  deletePhysicalEnvironments: DeleteInfo;
  deleteSoftwareVersions: DeleteInfo;
  deleteSubnets: DeleteInfo;
  deleteUris: DeleteInfo;
  deleteVulnerabilities: DeleteInfo;
  linkOrgUnitToParentOrg?: Maybe<OrganizationUnit>;
  linkSubnetToOrgUnit?: Maybe<Subnet>;
  linkSubnetToParent?: Maybe<Subnet>;
  mergeOrgUnitWithContacts?: Maybe<OrganizationUnit>;
  mergeSubnetWithContacts?: Maybe<Subnet>;
  unlinkOrgUnitFromContacts?: Maybe<OrganizationUnit>;
  unlinkOrgUnitFromParents?: Maybe<OrganizationUnit>;
  unlinkSubnetFromContacts?: Maybe<Subnet>;
  unlinkSubnetFromOrgUnit?: Maybe<Subnet>;
  unlinkSubnetFromParent?: Maybe<Subnet>;
  updateApplications: UpdateApplicationsMutationResponse;
  updateComponents: UpdateComponentsMutationResponse;
  updateContacts: UpdateContactsMutationResponse;
  updateCves: UpdateCvesMutationResponse;
  updateCvsSv2s: UpdateCvsSv2sMutationResponse;
  updateCvsSv30s: UpdateCvsSv30sMutationResponse;
  updateCvsSv31s: UpdateCvsSv31sMutationResponse;
  updateCvsSv40s: UpdateCvsSv40sMutationResponse;
  updateDevices: UpdateDevicesMutationResponse;
  updateDomainNames: UpdateDomainNamesMutationResponse;
  updateHardwareVersions: UpdateHardwareVersionsMutationResponse;
  updateHosts: UpdateHostsMutationResponse;
  updateIPStatus?: Maybe<Ip>;
  updateIPTag?: Maybe<Ip>;
  updateIps: UpdateIpsMutationResponse;
  updateMissionDependencies: UpdateMissionDependenciesMutationResponse;
  updateMissions: UpdateMissionsMutationResponse;
  updateNetworkServiceStatus?: Maybe<NetworkServiceOn>;
  updateNetworkServices: UpdateNetworkServicesMutationResponse;
  updateNodeObjects: UpdateNodeObjectsMutationResponse;
  updateOrganizationUnits: UpdateOrganizationUnitsMutationResponse;
  updatePhysicalEnvironments: UpdatePhysicalEnvironmentsMutationResponse;
  updateSoftwareVersions: UpdateSoftwareVersionsMutationResponse;
  updateSubnets: UpdateSubnetsMutationResponse;
  updateUris: UpdateUrisMutationResponse;
  updateVulnerabilities: UpdateVulnerabilitiesMutationResponse;
  updateVulnerabilityStatus?: Maybe<Vulnerability>;
};

export type MutationCreateApplicationsArgs = {
  input: Array<ApplicationCreateInput>;
};

export type MutationCreateComponentsArgs = {
  input: Array<ComponentCreateInput>;
};

export type MutationCreateContactsArgs = {
  input: Array<ContactCreateInput>;
};

export type MutationCreateCvesArgs = {
  input: Array<CveCreateInput>;
};

export type MutationCreateCvsSv2sArgs = {
  input: Array<CvsSv2CreateInput>;
};

export type MutationCreateCvsSv30sArgs = {
  input: Array<CvsSv30CreateInput>;
};

export type MutationCreateCvsSv31sArgs = {
  input: Array<CvsSv31CreateInput>;
};

export type MutationCreateCvsSv40sArgs = {
  input: Array<CvsSv40CreateInput>;
};

export type MutationCreateDevicesArgs = {
  input: Array<DeviceCreateInput>;
};

export type MutationCreateDomainNamesArgs = {
  input: Array<DomainNameCreateInput>;
};

export type MutationCreateHardwareVersionsArgs = {
  input: Array<HardwareVersionCreateInput>;
};

export type MutationCreateHostsArgs = {
  input: Array<HostCreateInput>;
};

export type MutationCreateIpsArgs = {
  input: Array<IpCreateInput>;
};

export type MutationCreateMissionDependenciesArgs = {
  input: Array<MissionDependencyCreateInput>;
};

export type MutationCreateMissionsArgs = {
  input: Array<MissionCreateInput>;
};

export type MutationCreateNetworkServicesArgs = {
  input: Array<NetworkServiceCreateInput>;
};

export type MutationCreateNodeObjectsArgs = {
  input: Array<NodeObjectCreateInput>;
};

export type MutationCreateOrganizationUnitsArgs = {
  input: Array<OrganizationUnitCreateInput>;
};

export type MutationCreatePhysicalEnvironmentsArgs = {
  input: Array<PhysicalEnvironmentCreateInput>;
};

export type MutationCreateSoftwareVersionsArgs = {
  input: Array<SoftwareVersionCreateInput>;
};

export type MutationCreateSubnetsArgs = {
  input: Array<SubnetCreateInput>;
};

export type MutationCreateUrisArgs = {
  input: Array<UriCreateInput>;
};

export type MutationCreateVulnerabilitiesArgs = {
  input: Array<VulnerabilityCreateInput>;
};

export type MutationDeleteApplicationsArgs = {
  delete?: InputMaybe<ApplicationDeleteInput>;
  where?: InputMaybe<ApplicationWhere>;
};

export type MutationDeleteComponentsArgs = {
  delete?: InputMaybe<ComponentDeleteInput>;
  where?: InputMaybe<ComponentWhere>;
};

export type MutationDeleteContactsArgs = {
  delete?: InputMaybe<ContactDeleteInput>;
  where?: InputMaybe<ContactWhere>;
};

export type MutationDeleteCvesArgs = {
  delete?: InputMaybe<CveDeleteInput>;
  where?: InputMaybe<CveWhere>;
};

export type MutationDeleteCvsSv2sArgs = {
  where?: InputMaybe<CvsSv2Where>;
};

export type MutationDeleteCvsSv30sArgs = {
  where?: InputMaybe<CvsSv30Where>;
};

export type MutationDeleteCvsSv31sArgs = {
  where?: InputMaybe<CvsSv31Where>;
};

export type MutationDeleteCvsSv40sArgs = {
  where?: InputMaybe<CvsSv40Where>;
};

export type MutationDeleteDevicesArgs = {
  delete?: InputMaybe<DeviceDeleteInput>;
  where?: InputMaybe<DeviceWhere>;
};

export type MutationDeleteDomainNamesArgs = {
  delete?: InputMaybe<DomainNameDeleteInput>;
  where?: InputMaybe<DomainNameWhere>;
};

export type MutationDeleteHardwareVersionsArgs = {
  delete?: InputMaybe<HardwareVersionDeleteInput>;
  where?: InputMaybe<HardwareVersionWhere>;
};

export type MutationDeleteHostsArgs = {
  delete?: InputMaybe<HostDeleteInput>;
  where?: InputMaybe<HostWhere>;
};

export type MutationDeleteIpsArgs = {
  delete?: InputMaybe<IpDeleteInput>;
  where?: InputMaybe<IpWhere>;
};

export type MutationDeleteMissionDependenciesArgs = {
  delete?: InputMaybe<MissionDependencyDeleteInput>;
  where?: InputMaybe<MissionDependencyWhere>;
};

export type MutationDeleteMissionsArgs = {
  delete?: InputMaybe<MissionDeleteInput>;
  where?: InputMaybe<MissionWhere>;
};

export type MutationDeleteNetworkServicesArgs = {
  delete?: InputMaybe<NetworkServiceDeleteInput>;
  where?: InputMaybe<NetworkServiceWhere>;
};

export type MutationDeleteNodeObjectsArgs = {
  delete?: InputMaybe<NodeObjectDeleteInput>;
  where?: InputMaybe<NodeObjectWhere>;
};

export type MutationDeleteOrganizationUnitsArgs = {
  delete?: InputMaybe<OrganizationUnitDeleteInput>;
  where?: InputMaybe<OrganizationUnitWhere>;
};

export type MutationDeletePhysicalEnvironmentsArgs = {
  delete?: InputMaybe<PhysicalEnvironmentDeleteInput>;
  where?: InputMaybe<PhysicalEnvironmentWhere>;
};

export type MutationDeleteSoftwareVersionsArgs = {
  delete?: InputMaybe<SoftwareVersionDeleteInput>;
  where?: InputMaybe<SoftwareVersionWhere>;
};

export type MutationDeleteSubnetsArgs = {
  delete?: InputMaybe<SubnetDeleteInput>;
  where?: InputMaybe<SubnetWhere>;
};

export type MutationDeleteUrisArgs = {
  delete?: InputMaybe<UriDeleteInput>;
  where?: InputMaybe<UriWhere>;
};

export type MutationDeleteVulnerabilitiesArgs = {
  delete?: InputMaybe<VulnerabilityDeleteInput>;
  where?: InputMaybe<VulnerabilityWhere>;
};

export type MutationLinkOrgUnitToParentOrgArgs = {
  orgUnitName: Scalars['String']['input'];
  parentOrgUnitName: Scalars['String']['input'];
};

export type MutationLinkSubnetToOrgUnitArgs = {
  orgUnitName: Scalars['String']['input'];
  subnetRange: Scalars['String']['input'];
};

export type MutationLinkSubnetToParentArgs = {
  parentSubnetRange: Scalars['String']['input'];
  subnetRange: Scalars['String']['input'];
};

export type MutationMergeOrgUnitWithContactsArgs = {
  contactNames: Array<Scalars['String']['input']>;
  orgUnitName: Scalars['String']['input'];
};

export type MutationMergeSubnetWithContactsArgs = {
  contactNames: Array<Scalars['String']['input']>;
  subnetRange: Scalars['String']['input'];
};

export type MutationUnlinkOrgUnitFromContactsArgs = {
  contactNames: Array<Scalars['String']['input']>;
  orgUnitName: Scalars['String']['input'];
};

export type MutationUnlinkOrgUnitFromParentsArgs = {
  orgUnitName: Scalars['String']['input'];
};

export type MutationUnlinkSubnetFromContactsArgs = {
  contactNames: Array<Scalars['String']['input']>;
  subnetRange: Scalars['String']['input'];
};

export type MutationUnlinkSubnetFromOrgUnitArgs = {
  orgUnitName: Scalars['String']['input'];
  subnetRange: Scalars['String']['input'];
};

export type MutationUnlinkSubnetFromParentArgs = {
  parentRange: Scalars['String']['input'];
  subnetRange: Scalars['String']['input'];
};

export type MutationUpdateApplicationsArgs = {
  update?: InputMaybe<ApplicationUpdateInput>;
  where?: InputMaybe<ApplicationWhere>;
};

export type MutationUpdateComponentsArgs = {
  update?: InputMaybe<ComponentUpdateInput>;
  where?: InputMaybe<ComponentWhere>;
};

export type MutationUpdateContactsArgs = {
  update?: InputMaybe<ContactUpdateInput>;
  where?: InputMaybe<ContactWhere>;
};

export type MutationUpdateCvesArgs = {
  update?: InputMaybe<CveUpdateInput>;
  where?: InputMaybe<CveWhere>;
};

export type MutationUpdateCvsSv2sArgs = {
  update?: InputMaybe<CvsSv2UpdateInput>;
  where?: InputMaybe<CvsSv2Where>;
};

export type MutationUpdateCvsSv30sArgs = {
  update?: InputMaybe<CvsSv30UpdateInput>;
  where?: InputMaybe<CvsSv30Where>;
};

export type MutationUpdateCvsSv31sArgs = {
  update?: InputMaybe<CvsSv31UpdateInput>;
  where?: InputMaybe<CvsSv31Where>;
};

export type MutationUpdateCvsSv40sArgs = {
  update?: InputMaybe<CvsSv40UpdateInput>;
  where?: InputMaybe<CvsSv40Where>;
};

export type MutationUpdateDevicesArgs = {
  update?: InputMaybe<DeviceUpdateInput>;
  where?: InputMaybe<DeviceWhere>;
};

export type MutationUpdateDomainNamesArgs = {
  update?: InputMaybe<DomainNameUpdateInput>;
  where?: InputMaybe<DomainNameWhere>;
};

export type MutationUpdateHardwareVersionsArgs = {
  update?: InputMaybe<HardwareVersionUpdateInput>;
  where?: InputMaybe<HardwareVersionWhere>;
};

export type MutationUpdateHostsArgs = {
  update?: InputMaybe<HostUpdateInput>;
  where?: InputMaybe<HostWhere>;
};

export type MutationUpdateIpStatusArgs = {
  address: Scalars['String']['input'];
  status: Scalars['String']['input'];
};

export type MutationUpdateIpTagArgs = {
  address: Scalars['String']['input'];
  tag: Array<InputMaybe<Scalars['String']['input']>>;
};

export type MutationUpdateIpsArgs = {
  update?: InputMaybe<IpUpdateInput>;
  where?: InputMaybe<IpWhere>;
};

export type MutationUpdateMissionDependenciesArgs = {
  update?: InputMaybe<MissionDependencyUpdateInput>;
  where?: InputMaybe<MissionDependencyWhere>;
};

export type MutationUpdateMissionsArgs = {
  update?: InputMaybe<MissionUpdateInput>;
  where?: InputMaybe<MissionWhere>;
};

export type MutationUpdateNetworkServiceStatusArgs = {
  address: Scalars['String']['input'];
  port: Scalars['Int']['input'];
  protocol: Scalars['String']['input'];
  service: Scalars['String']['input'];
  status: Scalars['String']['input'];
};

export type MutationUpdateNetworkServicesArgs = {
  update?: InputMaybe<NetworkServiceUpdateInput>;
  where?: InputMaybe<NetworkServiceWhere>;
};

export type MutationUpdateNodeObjectsArgs = {
  update?: InputMaybe<NodeObjectUpdateInput>;
  where?: InputMaybe<NodeObjectWhere>;
};

export type MutationUpdateOrganizationUnitsArgs = {
  update?: InputMaybe<OrganizationUnitUpdateInput>;
  where?: InputMaybe<OrganizationUnitWhere>;
};

export type MutationUpdatePhysicalEnvironmentsArgs = {
  update?: InputMaybe<PhysicalEnvironmentUpdateInput>;
  where?: InputMaybe<PhysicalEnvironmentWhere>;
};

export type MutationUpdateSoftwareVersionsArgs = {
  update?: InputMaybe<SoftwareVersionUpdateInput>;
  where?: InputMaybe<SoftwareVersionWhere>;
};

export type MutationUpdateSubnetsArgs = {
  update?: InputMaybe<SubnetUpdateInput>;
  where?: InputMaybe<SubnetWhere>;
};

export type MutationUpdateUrisArgs = {
  update?: InputMaybe<UriUpdateInput>;
  where?: InputMaybe<UriWhere>;
};

export type MutationUpdateVulnerabilitiesArgs = {
  update?: InputMaybe<VulnerabilityUpdateInput>;
  where?: InputMaybe<VulnerabilityWhere>;
};

export type MutationUpdateVulnerabilityStatusArgs = {
  cve: Scalars['String']['input'];
  status: Array<InputMaybe<Scalars['String']['input']>>;
};

export type NetworkService = {
  __typename?: 'NetworkService';
  _id: Scalars['ID']['output'];
  hosts: Array<Host>;
  hostsAggregate?: Maybe<NetworkServiceHostHostsAggregationSelection>;
  hostsConnection: NetworkServiceHostsConnection;
  port?: Maybe<Scalars['Int']['output']>;
  protocol?: Maybe<Scalars['String']['output']>;
  service?: Maybe<Scalars['String']['output']>;
  software_versions: Array<SoftwareVersion>;
  software_versionsAggregate?: Maybe<NetworkServiceSoftwareVersionSoftware_VersionsAggregationSelection>;
  software_versionsConnection: NetworkServiceSoftware_VersionsConnection;
  tag?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
};

export type NetworkServiceHostsArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  options?: InputMaybe<HostOptions>;
  where?: InputMaybe<HostWhere>;
};

export type NetworkServiceHostsAggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<HostWhere>;
};

export type NetworkServiceHostsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<NetworkServiceHostsConnectionSort>>;
  where?: InputMaybe<NetworkServiceHostsConnectionWhere>;
};

export type NetworkServiceSoftware_VersionsArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  options?: InputMaybe<SoftwareVersionOptions>;
  where?: InputMaybe<SoftwareVersionWhere>;
};

export type NetworkServiceSoftware_VersionsAggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<SoftwareVersionWhere>;
};

export type NetworkServiceSoftware_VersionsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<NetworkServiceSoftware_VersionsConnectionSort>>;
  where?: InputMaybe<NetworkServiceSoftware_VersionsConnectionWhere>;
};

export type NetworkServiceAggregateSelection = {
  __typename?: 'NetworkServiceAggregateSelection';
  count: Scalars['Int']['output'];
  port: IntAggregateSelection;
  protocol: StringAggregateSelection;
  service: StringAggregateSelection;
};

export type NetworkServiceConnectInput = {
  hosts?: InputMaybe<Array<NetworkServiceHostsConnectFieldInput>>;
  software_versions?: InputMaybe<
    Array<NetworkServiceSoftware_VersionsConnectFieldInput>
  >;
};

export type NetworkServiceConnectWhere = {
  node: NetworkServiceWhere;
};

export type NetworkServiceCreateInput = {
  hosts?: InputMaybe<NetworkServiceHostsFieldInput>;
  port?: InputMaybe<Scalars['Int']['input']>;
  protocol?: InputMaybe<Scalars['String']['input']>;
  service?: InputMaybe<Scalars['String']['input']>;
  software_versions?: InputMaybe<NetworkServiceSoftware_VersionsFieldInput>;
  tag?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type NetworkServiceDeleteInput = {
  hosts?: InputMaybe<Array<NetworkServiceHostsDeleteFieldInput>>;
  software_versions?: InputMaybe<
    Array<NetworkServiceSoftware_VersionsDeleteFieldInput>
  >;
};

export type NetworkServiceDisconnectInput = {
  hosts?: InputMaybe<Array<NetworkServiceHostsDisconnectFieldInput>>;
  software_versions?: InputMaybe<
    Array<NetworkServiceSoftware_VersionsDisconnectFieldInput>
  >;
};

export type NetworkServiceEdge = {
  __typename?: 'NetworkServiceEdge';
  cursor: Scalars['String']['output'];
  node: NetworkService;
};

export type NetworkServiceHostHostsAggregationSelection = {
  __typename?: 'NetworkServiceHostHostsAggregationSelection';
  count: Scalars['Int']['output'];
  edge?: Maybe<NetworkServiceHostHostsEdgeAggregateSelection>;
  node?: Maybe<NetworkServiceHostHostsNodeAggregateSelection>;
};

export type NetworkServiceHostHostsEdgeAggregateSelection = {
  __typename?: 'NetworkServiceHostHostsEdgeAggregateSelection';
  end: StringAggregateSelection;
  start: StringAggregateSelection;
  status: StringAggregateSelection;
};

export type NetworkServiceHostHostsNodeAggregateSelection = {
  __typename?: 'NetworkServiceHostHostsNodeAggregateSelection';
  hostname: StringAggregateSelection;
};

export type NetworkServiceHostsAggregateInput = {
  AND?: InputMaybe<Array<NetworkServiceHostsAggregateInput>>;
  NOT?: InputMaybe<NetworkServiceHostsAggregateInput>;
  OR?: InputMaybe<Array<NetworkServiceHostsAggregateInput>>;
  count?: InputMaybe<Scalars['Int']['input']>;
  count_GT?: InputMaybe<Scalars['Int']['input']>;
  count_GTE?: InputMaybe<Scalars['Int']['input']>;
  count_LT?: InputMaybe<Scalars['Int']['input']>;
  count_LTE?: InputMaybe<Scalars['Int']['input']>;
  edge?: InputMaybe<NetworkServiceOnAggregationWhereInput>;
  node?: InputMaybe<NetworkServiceHostsNodeAggregationWhereInput>;
};

export type NetworkServiceHostsConnectFieldInput = {
  connect?: InputMaybe<Array<HostConnectInput>>;
  edge?: InputMaybe<NetworkServiceOnCreateInput>;
  /** Whether or not to overwrite any matching relationship with the new properties. */
  overwrite?: Scalars['Boolean']['input'];
  where?: InputMaybe<HostConnectWhere>;
};

export type NetworkServiceHostsConnection = {
  __typename?: 'NetworkServiceHostsConnection';
  edges: Array<NetworkServiceHostsRelationship>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type NetworkServiceHostsConnectionSort = {
  edge?: InputMaybe<NetworkServiceOnSort>;
  node?: InputMaybe<HostSort>;
};

export type NetworkServiceHostsConnectionWhere = {
  AND?: InputMaybe<Array<NetworkServiceHostsConnectionWhere>>;
  NOT?: InputMaybe<NetworkServiceHostsConnectionWhere>;
  OR?: InputMaybe<Array<NetworkServiceHostsConnectionWhere>>;
  edge?: InputMaybe<NetworkServiceOnWhere>;
  node?: InputMaybe<HostWhere>;
};

export type NetworkServiceHostsCreateFieldInput = {
  edge?: InputMaybe<NetworkServiceOnCreateInput>;
  node: HostCreateInput;
};

export type NetworkServiceHostsDeleteFieldInput = {
  delete?: InputMaybe<HostDeleteInput>;
  where?: InputMaybe<NetworkServiceHostsConnectionWhere>;
};

export type NetworkServiceHostsDisconnectFieldInput = {
  disconnect?: InputMaybe<HostDisconnectInput>;
  where?: InputMaybe<NetworkServiceHostsConnectionWhere>;
};

export type NetworkServiceHostsFieldInput = {
  connect?: InputMaybe<Array<NetworkServiceHostsConnectFieldInput>>;
  create?: InputMaybe<Array<NetworkServiceHostsCreateFieldInput>>;
};

export type NetworkServiceHostsNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<NetworkServiceHostsNodeAggregationWhereInput>>;
  NOT?: InputMaybe<NetworkServiceHostsNodeAggregationWhereInput>;
  OR?: InputMaybe<Array<NetworkServiceHostsNodeAggregationWhereInput>>;
  hostname_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  hostname_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  hostname_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  hostname_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  hostname_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  hostname_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  hostname_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  hostname_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  hostname_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  hostname_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  hostname_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  hostname_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  hostname_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  hostname_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  hostname_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
};

export type NetworkServiceHostsRelationship = {
  __typename?: 'NetworkServiceHostsRelationship';
  cursor: Scalars['String']['output'];
  node: Host;
  properties: NetworkServiceOn;
};

export type NetworkServiceHostsUpdateConnectionInput = {
  edge?: InputMaybe<NetworkServiceOnUpdateInput>;
  node?: InputMaybe<HostUpdateInput>;
};

export type NetworkServiceHostsUpdateFieldInput = {
  connect?: InputMaybe<Array<NetworkServiceHostsConnectFieldInput>>;
  create?: InputMaybe<Array<NetworkServiceHostsCreateFieldInput>>;
  delete?: InputMaybe<Array<NetworkServiceHostsDeleteFieldInput>>;
  disconnect?: InputMaybe<Array<NetworkServiceHostsDisconnectFieldInput>>;
  update?: InputMaybe<NetworkServiceHostsUpdateConnectionInput>;
  where?: InputMaybe<NetworkServiceHostsConnectionWhere>;
};

/**
 * The edge properties for the following fields:
 * * NetworkService.hosts
 */
export type NetworkServiceOn = {
  __typename?: 'NetworkServiceOn';
  end?: Maybe<Scalars['String']['output']>;
  start?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  tag?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
};

export type NetworkServiceOnAggregationWhereInput = {
  AND?: InputMaybe<Array<NetworkServiceOnAggregationWhereInput>>;
  NOT?: InputMaybe<NetworkServiceOnAggregationWhereInput>;
  OR?: InputMaybe<Array<NetworkServiceOnAggregationWhereInput>>;
  end_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  end_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  end_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  end_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  end_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  end_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  end_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  end_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  end_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  end_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  end_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  end_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  end_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  end_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  end_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  start_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  start_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  start_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  start_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  start_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  start_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  start_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  start_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  start_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  start_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  start_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  start_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  start_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  start_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  start_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  status_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  status_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  status_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  status_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  status_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  status_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  status_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  status_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  status_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  status_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  status_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  status_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  status_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  status_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  status_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
};

export type NetworkServiceOnCreateInput = {
  end?: InputMaybe<Scalars['String']['input']>;
  start?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  tag?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type NetworkServiceOnSort = {
  end?: InputMaybe<SortDirection>;
  start?: InputMaybe<SortDirection>;
  status?: InputMaybe<SortDirection>;
  tag?: InputMaybe<SortDirection>;
};

export type NetworkServiceOnUpdateInput = {
  end?: InputMaybe<Scalars['String']['input']>;
  start?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  tag?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  tag_POP?: InputMaybe<Scalars['Int']['input']>;
  tag_PUSH?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type NetworkServiceOnWhere = {
  AND?: InputMaybe<Array<NetworkServiceOnWhere>>;
  NOT?: InputMaybe<NetworkServiceOnWhere>;
  OR?: InputMaybe<Array<NetworkServiceOnWhere>>;
  end?: InputMaybe<Scalars['String']['input']>;
  end_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  end_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  end_IN?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  end_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
  start?: InputMaybe<Scalars['String']['input']>;
  start_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  start_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  start_IN?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  start_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  status_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  status_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  status_IN?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  status_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
  tag?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  tag_INCLUDES?: InputMaybe<Scalars['String']['input']>;
};

export type NetworkServiceOptions = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  /**
   * Specify one or more NetworkServiceSort objects to sort NetworkServices by. The
   * sorts will be applied in the order in which they are arranged in the array.
   */
  sort?: InputMaybe<Array<NetworkServiceSort>>;
};

export type NetworkServiceRelationInput = {
  hosts?: InputMaybe<Array<NetworkServiceHostsCreateFieldInput>>;
  software_versions?: InputMaybe<
    Array<NetworkServiceSoftware_VersionsCreateFieldInput>
  >;
};

export type NetworkServiceSoftwareVersionSoftware_VersionsAggregationSelection =
  {
    __typename?: 'NetworkServiceSoftwareVersionSoftware_versionsAggregationSelection';
    count: Scalars['Int']['output'];
    node?: Maybe<NetworkServiceSoftwareVersionSoftware_VersionsNodeAggregateSelection>;
  };

export type NetworkServiceSoftwareVersionSoftware_VersionsNodeAggregateSelection =
  {
    __typename?: 'NetworkServiceSoftwareVersionSoftware_versionsNodeAggregateSelection';
    version: StringAggregateSelection;
  };

export type NetworkServiceSoftware_VersionsAggregateInput = {
  AND?: InputMaybe<Array<NetworkServiceSoftware_VersionsAggregateInput>>;
  NOT?: InputMaybe<NetworkServiceSoftware_VersionsAggregateInput>;
  OR?: InputMaybe<Array<NetworkServiceSoftware_VersionsAggregateInput>>;
  count?: InputMaybe<Scalars['Int']['input']>;
  count_GT?: InputMaybe<Scalars['Int']['input']>;
  count_GTE?: InputMaybe<Scalars['Int']['input']>;
  count_LT?: InputMaybe<Scalars['Int']['input']>;
  count_LTE?: InputMaybe<Scalars['Int']['input']>;
  node?: InputMaybe<NetworkServiceSoftware_VersionsNodeAggregationWhereInput>;
};

export type NetworkServiceSoftware_VersionsConnectFieldInput = {
  connect?: InputMaybe<Array<SoftwareVersionConnectInput>>;
  /** Whether or not to overwrite any matching relationship with the new properties. */
  overwrite?: Scalars['Boolean']['input'];
  where?: InputMaybe<SoftwareVersionConnectWhere>;
};

export type NetworkServiceSoftware_VersionsConnection = {
  __typename?: 'NetworkServiceSoftware_versionsConnection';
  edges: Array<NetworkServiceSoftware_VersionsRelationship>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type NetworkServiceSoftware_VersionsConnectionSort = {
  node?: InputMaybe<SoftwareVersionSort>;
};

export type NetworkServiceSoftware_VersionsConnectionWhere = {
  AND?: InputMaybe<Array<NetworkServiceSoftware_VersionsConnectionWhere>>;
  NOT?: InputMaybe<NetworkServiceSoftware_VersionsConnectionWhere>;
  OR?: InputMaybe<Array<NetworkServiceSoftware_VersionsConnectionWhere>>;
  node?: InputMaybe<SoftwareVersionWhere>;
};

export type NetworkServiceSoftware_VersionsCreateFieldInput = {
  node: SoftwareVersionCreateInput;
};

export type NetworkServiceSoftware_VersionsDeleteFieldInput = {
  delete?: InputMaybe<SoftwareVersionDeleteInput>;
  where?: InputMaybe<NetworkServiceSoftware_VersionsConnectionWhere>;
};

export type NetworkServiceSoftware_VersionsDisconnectFieldInput = {
  disconnect?: InputMaybe<SoftwareVersionDisconnectInput>;
  where?: InputMaybe<NetworkServiceSoftware_VersionsConnectionWhere>;
};

export type NetworkServiceSoftware_VersionsFieldInput = {
  connect?: InputMaybe<Array<NetworkServiceSoftware_VersionsConnectFieldInput>>;
  create?: InputMaybe<Array<NetworkServiceSoftware_VersionsCreateFieldInput>>;
};

export type NetworkServiceSoftware_VersionsNodeAggregationWhereInput = {
  AND?: InputMaybe<
    Array<NetworkServiceSoftware_VersionsNodeAggregationWhereInput>
  >;
  NOT?: InputMaybe<NetworkServiceSoftware_VersionsNodeAggregationWhereInput>;
  OR?: InputMaybe<
    Array<NetworkServiceSoftware_VersionsNodeAggregationWhereInput>
  >;
  version_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  version_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  version_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  version_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  version_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  version_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  version_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  version_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  version_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  version_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  version_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  version_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  version_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  version_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  version_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
};

export type NetworkServiceSoftware_VersionsRelationship = {
  __typename?: 'NetworkServiceSoftware_versionsRelationship';
  cursor: Scalars['String']['output'];
  node: SoftwareVersion;
};

export type NetworkServiceSoftware_VersionsUpdateConnectionInput = {
  node?: InputMaybe<SoftwareVersionUpdateInput>;
};

export type NetworkServiceSoftware_VersionsUpdateFieldInput = {
  connect?: InputMaybe<Array<NetworkServiceSoftware_VersionsConnectFieldInput>>;
  create?: InputMaybe<Array<NetworkServiceSoftware_VersionsCreateFieldInput>>;
  delete?: InputMaybe<Array<NetworkServiceSoftware_VersionsDeleteFieldInput>>;
  disconnect?: InputMaybe<
    Array<NetworkServiceSoftware_VersionsDisconnectFieldInput>
  >;
  update?: InputMaybe<NetworkServiceSoftware_VersionsUpdateConnectionInput>;
  where?: InputMaybe<NetworkServiceSoftware_VersionsConnectionWhere>;
};

/**
 * Fields to sort NetworkServices by. The order in which sorts are applied is not
 * guaranteed when specifying many fields in one NetworkServiceSort object.
 */
export type NetworkServiceSort = {
  _id?: InputMaybe<SortDirection>;
  port?: InputMaybe<SortDirection>;
  protocol?: InputMaybe<SortDirection>;
  service?: InputMaybe<SortDirection>;
};

export type NetworkServiceUpdateInput = {
  hosts?: InputMaybe<Array<NetworkServiceHostsUpdateFieldInput>>;
  port?: InputMaybe<Scalars['Int']['input']>;
  port_DECREMENT?: InputMaybe<Scalars['Int']['input']>;
  port_INCREMENT?: InputMaybe<Scalars['Int']['input']>;
  protocol?: InputMaybe<Scalars['String']['input']>;
  service?: InputMaybe<Scalars['String']['input']>;
  software_versions?: InputMaybe<
    Array<NetworkServiceSoftware_VersionsUpdateFieldInput>
  >;
  tag?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  tag_POP?: InputMaybe<Scalars['Int']['input']>;
  tag_PUSH?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type NetworkServiceWhere = {
  AND?: InputMaybe<Array<NetworkServiceWhere>>;
  NOT?: InputMaybe<NetworkServiceWhere>;
  OR?: InputMaybe<Array<NetworkServiceWhere>>;
  _id?: InputMaybe<Scalars['ID']['input']>;
  _id_CONTAINS?: InputMaybe<Scalars['ID']['input']>;
  _id_ENDS_WITH?: InputMaybe<Scalars['ID']['input']>;
  _id_IN?: InputMaybe<Array<Scalars['ID']['input']>>;
  _id_STARTS_WITH?: InputMaybe<Scalars['ID']['input']>;
  hostsAggregate?: InputMaybe<NetworkServiceHostsAggregateInput>;
  /** Return NetworkServices where all of the related NetworkServiceHostsConnections match this filter */
  hostsConnection_ALL?: InputMaybe<NetworkServiceHostsConnectionWhere>;
  /** Return NetworkServices where none of the related NetworkServiceHostsConnections match this filter */
  hostsConnection_NONE?: InputMaybe<NetworkServiceHostsConnectionWhere>;
  /** Return NetworkServices where one of the related NetworkServiceHostsConnections match this filter */
  hostsConnection_SINGLE?: InputMaybe<NetworkServiceHostsConnectionWhere>;
  /** Return NetworkServices where some of the related NetworkServiceHostsConnections match this filter */
  hostsConnection_SOME?: InputMaybe<NetworkServiceHostsConnectionWhere>;
  /** Return NetworkServices where all of the related Hosts match this filter */
  hosts_ALL?: InputMaybe<HostWhere>;
  /** Return NetworkServices where none of the related Hosts match this filter */
  hosts_NONE?: InputMaybe<HostWhere>;
  /** Return NetworkServices where one of the related Hosts match this filter */
  hosts_SINGLE?: InputMaybe<HostWhere>;
  /** Return NetworkServices where some of the related Hosts match this filter */
  hosts_SOME?: InputMaybe<HostWhere>;
  port?: InputMaybe<Scalars['Int']['input']>;
  port_GT?: InputMaybe<Scalars['Int']['input']>;
  port_GTE?: InputMaybe<Scalars['Int']['input']>;
  port_IN?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  port_LT?: InputMaybe<Scalars['Int']['input']>;
  port_LTE?: InputMaybe<Scalars['Int']['input']>;
  protocol?: InputMaybe<Scalars['String']['input']>;
  protocol_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  protocol_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  protocol_IN?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  protocol_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
  service?: InputMaybe<Scalars['String']['input']>;
  service_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  service_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  service_IN?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  service_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
  software_versionsAggregate?: InputMaybe<NetworkServiceSoftware_VersionsAggregateInput>;
  /** Return NetworkServices where all of the related NetworkServiceSoftware_versionsConnections match this filter */
  software_versionsConnection_ALL?: InputMaybe<NetworkServiceSoftware_VersionsConnectionWhere>;
  /** Return NetworkServices where none of the related NetworkServiceSoftware_versionsConnections match this filter */
  software_versionsConnection_NONE?: InputMaybe<NetworkServiceSoftware_VersionsConnectionWhere>;
  /** Return NetworkServices where one of the related NetworkServiceSoftware_versionsConnections match this filter */
  software_versionsConnection_SINGLE?: InputMaybe<NetworkServiceSoftware_VersionsConnectionWhere>;
  /** Return NetworkServices where some of the related NetworkServiceSoftware_versionsConnections match this filter */
  software_versionsConnection_SOME?: InputMaybe<NetworkServiceSoftware_VersionsConnectionWhere>;
  /** Return NetworkServices where all of the related SoftwareVersions match this filter */
  software_versions_ALL?: InputMaybe<SoftwareVersionWhere>;
  /** Return NetworkServices where none of the related SoftwareVersions match this filter */
  software_versions_NONE?: InputMaybe<SoftwareVersionWhere>;
  /** Return NetworkServices where one of the related SoftwareVersions match this filter */
  software_versions_SINGLE?: InputMaybe<SoftwareVersionWhere>;
  /** Return NetworkServices where some of the related SoftwareVersions match this filter */
  software_versions_SOME?: InputMaybe<SoftwareVersionWhere>;
  tag?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  tag_INCLUDES?: InputMaybe<Scalars['String']['input']>;
};

export type NetworkServicesConnection = {
  __typename?: 'NetworkServicesConnection';
  edges: Array<NetworkServiceEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type NodeObject = {
  __typename?: 'NodeObject';
  _id: Scalars['ID']['output'];
  degree_centrality?: Maybe<Scalars['Float']['output']>;
  final_criticality?: Maybe<Scalars['Float']['output']>;
  host?: Maybe<Host>;
  hostAggregate?: Maybe<NodeObjectHostHostAggregationSelection>;
  hostConnection: NodeObjectHostConnection;
  ips: Array<Ip>;
  ipsAggregate?: Maybe<NodeObjectIpIpsAggregationSelection>;
  ipsConnection: NodeObjectIpsConnection;
  is_connected_to_nodes: Array<NodeObject>;
  is_connected_to_nodesAggregate?: Maybe<NodeObjectNodeObjectIs_Connected_To_NodesAggregationSelection>;
  is_connected_to_nodesConnection: NodeObjectIs_Connected_To_NodesConnection;
  is_dependent_on_nodes: Array<NodeObject>;
  is_dependent_on_nodesAggregate?: Maybe<NodeObjectNodeObjectIs_Dependent_On_NodesAggregationSelection>;
  is_dependent_on_nodesConnection: NodeObjectIs_Dependent_On_NodesConnection;
  mission_criticality?: Maybe<Scalars['Float']['output']>;
  pagerank_centrality?: Maybe<Scalars['Float']['output']>;
  topology_betweenness?: Maybe<Scalars['Float']['output']>;
  topology_betweenness_norm?: Maybe<Scalars['Float']['output']>;
  topology_degree?: Maybe<Scalars['Float']['output']>;
  topology_degree_norm?: Maybe<Scalars['Float']['output']>;
};

export type NodeObjectHostArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  options?: InputMaybe<HostOptions>;
  where?: InputMaybe<HostWhere>;
};

export type NodeObjectHostAggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<HostWhere>;
};

export type NodeObjectHostConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<NodeObjectHostConnectionSort>>;
  where?: InputMaybe<NodeObjectHostConnectionWhere>;
};

export type NodeObjectIpsArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  options?: InputMaybe<IpOptions>;
  where?: InputMaybe<IpWhere>;
};

export type NodeObjectIpsAggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<IpWhere>;
};

export type NodeObjectIpsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<NodeObjectIpsConnectionSort>>;
  where?: InputMaybe<NodeObjectIpsConnectionWhere>;
};

export type NodeObjectIs_Connected_To_NodesArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  options?: InputMaybe<NodeObjectOptions>;
  where?: InputMaybe<NodeObjectWhere>;
};

export type NodeObjectIs_Connected_To_NodesAggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<NodeObjectWhere>;
};

export type NodeObjectIs_Connected_To_NodesConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<NodeObjectIs_Connected_To_NodesConnectionSort>>;
  where?: InputMaybe<NodeObjectIs_Connected_To_NodesConnectionWhere>;
};

export type NodeObjectIs_Dependent_On_NodesArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  options?: InputMaybe<NodeObjectOptions>;
  where?: InputMaybe<NodeObjectWhere>;
};

export type NodeObjectIs_Dependent_On_NodesAggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<NodeObjectWhere>;
};

export type NodeObjectIs_Dependent_On_NodesConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<NodeObjectIs_Dependent_On_NodesConnectionSort>>;
  where?: InputMaybe<NodeObjectIs_Dependent_On_NodesConnectionWhere>;
};

export type NodeObjectAggregateSelection = {
  __typename?: 'NodeObjectAggregateSelection';
  count: Scalars['Int']['output'];
  degree_centrality: FloatAggregateSelection;
  final_criticality: FloatAggregateSelection;
  mission_criticality: FloatAggregateSelection;
  pagerank_centrality: FloatAggregateSelection;
  topology_betweenness: FloatAggregateSelection;
  topology_betweenness_norm: FloatAggregateSelection;
  topology_degree: FloatAggregateSelection;
  topology_degree_norm: FloatAggregateSelection;
};

export type NodeObjectConnectInput = {
  host?: InputMaybe<NodeObjectHostConnectFieldInput>;
  ips?: InputMaybe<Array<NodeObjectIpsConnectFieldInput>>;
  is_connected_to_nodes?: InputMaybe<
    Array<NodeObjectIs_Connected_To_NodesConnectFieldInput>
  >;
  is_dependent_on_nodes?: InputMaybe<
    Array<NodeObjectIs_Dependent_On_NodesConnectFieldInput>
  >;
};

export type NodeObjectConnectWhere = {
  node: NodeObjectWhere;
};

export type NodeObjectCreateInput = {
  degree_centrality?: InputMaybe<Scalars['Float']['input']>;
  final_criticality?: InputMaybe<Scalars['Float']['input']>;
  host?: InputMaybe<NodeObjectHostFieldInput>;
  ips?: InputMaybe<NodeObjectIpsFieldInput>;
  is_connected_to_nodes?: InputMaybe<NodeObjectIs_Connected_To_NodesFieldInput>;
  is_dependent_on_nodes?: InputMaybe<NodeObjectIs_Dependent_On_NodesFieldInput>;
  mission_criticality?: InputMaybe<Scalars['Float']['input']>;
  pagerank_centrality?: InputMaybe<Scalars['Float']['input']>;
  topology_betweenness?: InputMaybe<Scalars['Float']['input']>;
  topology_betweenness_norm?: InputMaybe<Scalars['Float']['input']>;
  topology_degree?: InputMaybe<Scalars['Float']['input']>;
  topology_degree_norm?: InputMaybe<Scalars['Float']['input']>;
};

export type NodeObjectDeleteInput = {
  host?: InputMaybe<NodeObjectHostDeleteFieldInput>;
  ips?: InputMaybe<Array<NodeObjectIpsDeleteFieldInput>>;
  is_connected_to_nodes?: InputMaybe<
    Array<NodeObjectIs_Connected_To_NodesDeleteFieldInput>
  >;
  is_dependent_on_nodes?: InputMaybe<
    Array<NodeObjectIs_Dependent_On_NodesDeleteFieldInput>
  >;
};

export type NodeObjectDisconnectInput = {
  host?: InputMaybe<NodeObjectHostDisconnectFieldInput>;
  ips?: InputMaybe<Array<NodeObjectIpsDisconnectFieldInput>>;
  is_connected_to_nodes?: InputMaybe<
    Array<NodeObjectIs_Connected_To_NodesDisconnectFieldInput>
  >;
  is_dependent_on_nodes?: InputMaybe<
    Array<NodeObjectIs_Dependent_On_NodesDisconnectFieldInput>
  >;
};

export type NodeObjectEdge = {
  __typename?: 'NodeObjectEdge';
  cursor: Scalars['String']['output'];
  node: NodeObject;
};

export type NodeObjectHostAggregateInput = {
  AND?: InputMaybe<Array<NodeObjectHostAggregateInput>>;
  NOT?: InputMaybe<NodeObjectHostAggregateInput>;
  OR?: InputMaybe<Array<NodeObjectHostAggregateInput>>;
  count?: InputMaybe<Scalars['Int']['input']>;
  count_GT?: InputMaybe<Scalars['Int']['input']>;
  count_GTE?: InputMaybe<Scalars['Int']['input']>;
  count_LT?: InputMaybe<Scalars['Int']['input']>;
  count_LTE?: InputMaybe<Scalars['Int']['input']>;
  node?: InputMaybe<NodeObjectHostNodeAggregationWhereInput>;
};

export type NodeObjectHostConnectFieldInput = {
  connect?: InputMaybe<HostConnectInput>;
  /** Whether or not to overwrite any matching relationship with the new properties. */
  overwrite?: Scalars['Boolean']['input'];
  where?: InputMaybe<HostConnectWhere>;
};

export type NodeObjectHostConnection = {
  __typename?: 'NodeObjectHostConnection';
  edges: Array<NodeObjectHostRelationship>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type NodeObjectHostConnectionSort = {
  node?: InputMaybe<HostSort>;
};

export type NodeObjectHostConnectionWhere = {
  AND?: InputMaybe<Array<NodeObjectHostConnectionWhere>>;
  NOT?: InputMaybe<NodeObjectHostConnectionWhere>;
  OR?: InputMaybe<Array<NodeObjectHostConnectionWhere>>;
  node?: InputMaybe<HostWhere>;
};

export type NodeObjectHostCreateFieldInput = {
  node: HostCreateInput;
};

export type NodeObjectHostDeleteFieldInput = {
  delete?: InputMaybe<HostDeleteInput>;
  where?: InputMaybe<NodeObjectHostConnectionWhere>;
};

export type NodeObjectHostDisconnectFieldInput = {
  disconnect?: InputMaybe<HostDisconnectInput>;
  where?: InputMaybe<NodeObjectHostConnectionWhere>;
};

export type NodeObjectHostFieldInput = {
  connect?: InputMaybe<NodeObjectHostConnectFieldInput>;
  create?: InputMaybe<NodeObjectHostCreateFieldInput>;
};

export type NodeObjectHostHostAggregationSelection = {
  __typename?: 'NodeObjectHostHostAggregationSelection';
  count: Scalars['Int']['output'];
  node?: Maybe<NodeObjectHostHostNodeAggregateSelection>;
};

export type NodeObjectHostHostNodeAggregateSelection = {
  __typename?: 'NodeObjectHostHostNodeAggregateSelection';
  hostname: StringAggregateSelection;
};

export type NodeObjectHostNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<NodeObjectHostNodeAggregationWhereInput>>;
  NOT?: InputMaybe<NodeObjectHostNodeAggregationWhereInput>;
  OR?: InputMaybe<Array<NodeObjectHostNodeAggregationWhereInput>>;
  hostname_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  hostname_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  hostname_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  hostname_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  hostname_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  hostname_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  hostname_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  hostname_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  hostname_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  hostname_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  hostname_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  hostname_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  hostname_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  hostname_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  hostname_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
};

export type NodeObjectHostRelationship = {
  __typename?: 'NodeObjectHostRelationship';
  cursor: Scalars['String']['output'];
  node: Host;
};

export type NodeObjectHostUpdateConnectionInput = {
  node?: InputMaybe<HostUpdateInput>;
};

export type NodeObjectHostUpdateFieldInput = {
  connect?: InputMaybe<NodeObjectHostConnectFieldInput>;
  create?: InputMaybe<NodeObjectHostCreateFieldInput>;
  delete?: InputMaybe<NodeObjectHostDeleteFieldInput>;
  disconnect?: InputMaybe<NodeObjectHostDisconnectFieldInput>;
  update?: InputMaybe<NodeObjectHostUpdateConnectionInput>;
  where?: InputMaybe<NodeObjectHostConnectionWhere>;
};

export type NodeObjectIpIpsAggregationSelection = {
  __typename?: 'NodeObjectIPIpsAggregationSelection';
  count: Scalars['Int']['output'];
  edge?: Maybe<NodeObjectIpIpsEdgeAggregateSelection>;
  node?: Maybe<NodeObjectIpIpsNodeAggregateSelection>;
};

export type NodeObjectIpIpsEdgeAggregateSelection = {
  __typename?: 'NodeObjectIPIpsEdgeAggregateSelection';
  end: StringAggregateSelection;
  start: StringAggregateSelection;
};

export type NodeObjectIpIpsNodeAggregateSelection = {
  __typename?: 'NodeObjectIPIpsNodeAggregateSelection';
  address: StringAggregateSelection;
  status: StringAggregateSelection;
  version: IntAggregateSelection;
};

export type NodeObjectIpsAggregateInput = {
  AND?: InputMaybe<Array<NodeObjectIpsAggregateInput>>;
  NOT?: InputMaybe<NodeObjectIpsAggregateInput>;
  OR?: InputMaybe<Array<NodeObjectIpsAggregateInput>>;
  count?: InputMaybe<Scalars['Int']['input']>;
  count_GT?: InputMaybe<Scalars['Int']['input']>;
  count_GTE?: InputMaybe<Scalars['Int']['input']>;
  count_LT?: InputMaybe<Scalars['Int']['input']>;
  count_LTE?: InputMaybe<Scalars['Int']['input']>;
  edge?: InputMaybe<HasAssignedAggregationWhereInput>;
  node?: InputMaybe<NodeObjectIpsNodeAggregationWhereInput>;
};

export type NodeObjectIpsConnectFieldInput = {
  connect?: InputMaybe<Array<IpConnectInput>>;
  edge?: InputMaybe<HasAssignedCreateInput>;
  /** Whether or not to overwrite any matching relationship with the new properties. */
  overwrite?: Scalars['Boolean']['input'];
  where?: InputMaybe<IpConnectWhere>;
};

export type NodeObjectIpsConnection = {
  __typename?: 'NodeObjectIpsConnection';
  edges: Array<NodeObjectIpsRelationship>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type NodeObjectIpsConnectionSort = {
  edge?: InputMaybe<HasAssignedSort>;
  node?: InputMaybe<IpSort>;
};

export type NodeObjectIpsConnectionWhere = {
  AND?: InputMaybe<Array<NodeObjectIpsConnectionWhere>>;
  NOT?: InputMaybe<NodeObjectIpsConnectionWhere>;
  OR?: InputMaybe<Array<NodeObjectIpsConnectionWhere>>;
  edge?: InputMaybe<HasAssignedWhere>;
  node?: InputMaybe<IpWhere>;
};

export type NodeObjectIpsCreateFieldInput = {
  edge?: InputMaybe<HasAssignedCreateInput>;
  node: IpCreateInput;
};

export type NodeObjectIpsDeleteFieldInput = {
  delete?: InputMaybe<IpDeleteInput>;
  where?: InputMaybe<NodeObjectIpsConnectionWhere>;
};

export type NodeObjectIpsDisconnectFieldInput = {
  disconnect?: InputMaybe<IpDisconnectInput>;
  where?: InputMaybe<NodeObjectIpsConnectionWhere>;
};

export type NodeObjectIpsFieldInput = {
  connect?: InputMaybe<Array<NodeObjectIpsConnectFieldInput>>;
  create?: InputMaybe<Array<NodeObjectIpsCreateFieldInput>>;
};

export type NodeObjectIpsNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<NodeObjectIpsNodeAggregationWhereInput>>;
  NOT?: InputMaybe<NodeObjectIpsNodeAggregationWhereInput>;
  OR?: InputMaybe<Array<NodeObjectIpsNodeAggregationWhereInput>>;
  address_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  address_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  address_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  address_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  address_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  address_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  address_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  address_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  address_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  address_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  address_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  address_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  address_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  address_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  address_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  status_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  status_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  status_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  status_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  status_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  status_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  status_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  status_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  status_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  status_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  status_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  status_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  status_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  status_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  status_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  version_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  version_AVERAGE_GT?: InputMaybe<Scalars['Float']['input']>;
  version_AVERAGE_GTE?: InputMaybe<Scalars['Float']['input']>;
  version_AVERAGE_LT?: InputMaybe<Scalars['Float']['input']>;
  version_AVERAGE_LTE?: InputMaybe<Scalars['Float']['input']>;
  version_MAX_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  version_MAX_GT?: InputMaybe<Scalars['Int']['input']>;
  version_MAX_GTE?: InputMaybe<Scalars['Int']['input']>;
  version_MAX_LT?: InputMaybe<Scalars['Int']['input']>;
  version_MAX_LTE?: InputMaybe<Scalars['Int']['input']>;
  version_MIN_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  version_MIN_GT?: InputMaybe<Scalars['Int']['input']>;
  version_MIN_GTE?: InputMaybe<Scalars['Int']['input']>;
  version_MIN_LT?: InputMaybe<Scalars['Int']['input']>;
  version_MIN_LTE?: InputMaybe<Scalars['Int']['input']>;
  version_SUM_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  version_SUM_GT?: InputMaybe<Scalars['Int']['input']>;
  version_SUM_GTE?: InputMaybe<Scalars['Int']['input']>;
  version_SUM_LT?: InputMaybe<Scalars['Int']['input']>;
  version_SUM_LTE?: InputMaybe<Scalars['Int']['input']>;
};

export type NodeObjectIpsRelationship = {
  __typename?: 'NodeObjectIpsRelationship';
  cursor: Scalars['String']['output'];
  node: Ip;
  properties: HasAssigned;
};

export type NodeObjectIpsUpdateConnectionInput = {
  edge?: InputMaybe<HasAssignedUpdateInput>;
  node?: InputMaybe<IpUpdateInput>;
};

export type NodeObjectIpsUpdateFieldInput = {
  connect?: InputMaybe<Array<NodeObjectIpsConnectFieldInput>>;
  create?: InputMaybe<Array<NodeObjectIpsCreateFieldInput>>;
  delete?: InputMaybe<Array<NodeObjectIpsDeleteFieldInput>>;
  disconnect?: InputMaybe<Array<NodeObjectIpsDisconnectFieldInput>>;
  update?: InputMaybe<NodeObjectIpsUpdateConnectionInput>;
  where?: InputMaybe<NodeObjectIpsConnectionWhere>;
};

export type NodeObjectIs_Connected_To_NodesAggregateInput = {
  AND?: InputMaybe<Array<NodeObjectIs_Connected_To_NodesAggregateInput>>;
  NOT?: InputMaybe<NodeObjectIs_Connected_To_NodesAggregateInput>;
  OR?: InputMaybe<Array<NodeObjectIs_Connected_To_NodesAggregateInput>>;
  count?: InputMaybe<Scalars['Int']['input']>;
  count_GT?: InputMaybe<Scalars['Int']['input']>;
  count_GTE?: InputMaybe<Scalars['Int']['input']>;
  count_LT?: InputMaybe<Scalars['Int']['input']>;
  count_LTE?: InputMaybe<Scalars['Int']['input']>;
  node?: InputMaybe<NodeObjectIs_Connected_To_NodesNodeAggregationWhereInput>;
};

export type NodeObjectIs_Connected_To_NodesConnectFieldInput = {
  connect?: InputMaybe<Array<NodeObjectConnectInput>>;
  /** Whether or not to overwrite any matching relationship with the new properties. */
  overwrite?: Scalars['Boolean']['input'];
  where?: InputMaybe<NodeObjectConnectWhere>;
};

export type NodeObjectIs_Connected_To_NodesConnection = {
  __typename?: 'NodeObjectIs_connected_to_nodesConnection';
  edges: Array<NodeObjectIs_Connected_To_NodesRelationship>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type NodeObjectIs_Connected_To_NodesConnectionSort = {
  node?: InputMaybe<NodeObjectSort>;
};

export type NodeObjectIs_Connected_To_NodesConnectionWhere = {
  AND?: InputMaybe<Array<NodeObjectIs_Connected_To_NodesConnectionWhere>>;
  NOT?: InputMaybe<NodeObjectIs_Connected_To_NodesConnectionWhere>;
  OR?: InputMaybe<Array<NodeObjectIs_Connected_To_NodesConnectionWhere>>;
  node?: InputMaybe<NodeObjectWhere>;
};

export type NodeObjectIs_Connected_To_NodesCreateFieldInput = {
  node: NodeObjectCreateInput;
};

export type NodeObjectIs_Connected_To_NodesDeleteFieldInput = {
  delete?: InputMaybe<NodeObjectDeleteInput>;
  where?: InputMaybe<NodeObjectIs_Connected_To_NodesConnectionWhere>;
};

export type NodeObjectIs_Connected_To_NodesDisconnectFieldInput = {
  disconnect?: InputMaybe<NodeObjectDisconnectInput>;
  where?: InputMaybe<NodeObjectIs_Connected_To_NodesConnectionWhere>;
};

export type NodeObjectIs_Connected_To_NodesFieldInput = {
  connect?: InputMaybe<Array<NodeObjectIs_Connected_To_NodesConnectFieldInput>>;
  create?: InputMaybe<Array<NodeObjectIs_Connected_To_NodesCreateFieldInput>>;
};

export type NodeObjectIs_Connected_To_NodesNodeAggregationWhereInput = {
  AND?: InputMaybe<
    Array<NodeObjectIs_Connected_To_NodesNodeAggregationWhereInput>
  >;
  NOT?: InputMaybe<NodeObjectIs_Connected_To_NodesNodeAggregationWhereInput>;
  OR?: InputMaybe<
    Array<NodeObjectIs_Connected_To_NodesNodeAggregationWhereInput>
  >;
  degree_centrality_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  degree_centrality_AVERAGE_GT?: InputMaybe<Scalars['Float']['input']>;
  degree_centrality_AVERAGE_GTE?: InputMaybe<Scalars['Float']['input']>;
  degree_centrality_AVERAGE_LT?: InputMaybe<Scalars['Float']['input']>;
  degree_centrality_AVERAGE_LTE?: InputMaybe<Scalars['Float']['input']>;
  degree_centrality_MAX_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  degree_centrality_MAX_GT?: InputMaybe<Scalars['Float']['input']>;
  degree_centrality_MAX_GTE?: InputMaybe<Scalars['Float']['input']>;
  degree_centrality_MAX_LT?: InputMaybe<Scalars['Float']['input']>;
  degree_centrality_MAX_LTE?: InputMaybe<Scalars['Float']['input']>;
  degree_centrality_MIN_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  degree_centrality_MIN_GT?: InputMaybe<Scalars['Float']['input']>;
  degree_centrality_MIN_GTE?: InputMaybe<Scalars['Float']['input']>;
  degree_centrality_MIN_LT?: InputMaybe<Scalars['Float']['input']>;
  degree_centrality_MIN_LTE?: InputMaybe<Scalars['Float']['input']>;
  degree_centrality_SUM_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  degree_centrality_SUM_GT?: InputMaybe<Scalars['Float']['input']>;
  degree_centrality_SUM_GTE?: InputMaybe<Scalars['Float']['input']>;
  degree_centrality_SUM_LT?: InputMaybe<Scalars['Float']['input']>;
  degree_centrality_SUM_LTE?: InputMaybe<Scalars['Float']['input']>;
  final_criticality_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  final_criticality_AVERAGE_GT?: InputMaybe<Scalars['Float']['input']>;
  final_criticality_AVERAGE_GTE?: InputMaybe<Scalars['Float']['input']>;
  final_criticality_AVERAGE_LT?: InputMaybe<Scalars['Float']['input']>;
  final_criticality_AVERAGE_LTE?: InputMaybe<Scalars['Float']['input']>;
  final_criticality_MAX_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  final_criticality_MAX_GT?: InputMaybe<Scalars['Float']['input']>;
  final_criticality_MAX_GTE?: InputMaybe<Scalars['Float']['input']>;
  final_criticality_MAX_LT?: InputMaybe<Scalars['Float']['input']>;
  final_criticality_MAX_LTE?: InputMaybe<Scalars['Float']['input']>;
  final_criticality_MIN_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  final_criticality_MIN_GT?: InputMaybe<Scalars['Float']['input']>;
  final_criticality_MIN_GTE?: InputMaybe<Scalars['Float']['input']>;
  final_criticality_MIN_LT?: InputMaybe<Scalars['Float']['input']>;
  final_criticality_MIN_LTE?: InputMaybe<Scalars['Float']['input']>;
  final_criticality_SUM_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  final_criticality_SUM_GT?: InputMaybe<Scalars['Float']['input']>;
  final_criticality_SUM_GTE?: InputMaybe<Scalars['Float']['input']>;
  final_criticality_SUM_LT?: InputMaybe<Scalars['Float']['input']>;
  final_criticality_SUM_LTE?: InputMaybe<Scalars['Float']['input']>;
  mission_criticality_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  mission_criticality_AVERAGE_GT?: InputMaybe<Scalars['Float']['input']>;
  mission_criticality_AVERAGE_GTE?: InputMaybe<Scalars['Float']['input']>;
  mission_criticality_AVERAGE_LT?: InputMaybe<Scalars['Float']['input']>;
  mission_criticality_AVERAGE_LTE?: InputMaybe<Scalars['Float']['input']>;
  mission_criticality_MAX_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  mission_criticality_MAX_GT?: InputMaybe<Scalars['Float']['input']>;
  mission_criticality_MAX_GTE?: InputMaybe<Scalars['Float']['input']>;
  mission_criticality_MAX_LT?: InputMaybe<Scalars['Float']['input']>;
  mission_criticality_MAX_LTE?: InputMaybe<Scalars['Float']['input']>;
  mission_criticality_MIN_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  mission_criticality_MIN_GT?: InputMaybe<Scalars['Float']['input']>;
  mission_criticality_MIN_GTE?: InputMaybe<Scalars['Float']['input']>;
  mission_criticality_MIN_LT?: InputMaybe<Scalars['Float']['input']>;
  mission_criticality_MIN_LTE?: InputMaybe<Scalars['Float']['input']>;
  mission_criticality_SUM_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  mission_criticality_SUM_GT?: InputMaybe<Scalars['Float']['input']>;
  mission_criticality_SUM_GTE?: InputMaybe<Scalars['Float']['input']>;
  mission_criticality_SUM_LT?: InputMaybe<Scalars['Float']['input']>;
  mission_criticality_SUM_LTE?: InputMaybe<Scalars['Float']['input']>;
  pagerank_centrality_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  pagerank_centrality_AVERAGE_GT?: InputMaybe<Scalars['Float']['input']>;
  pagerank_centrality_AVERAGE_GTE?: InputMaybe<Scalars['Float']['input']>;
  pagerank_centrality_AVERAGE_LT?: InputMaybe<Scalars['Float']['input']>;
  pagerank_centrality_AVERAGE_LTE?: InputMaybe<Scalars['Float']['input']>;
  pagerank_centrality_MAX_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  pagerank_centrality_MAX_GT?: InputMaybe<Scalars['Float']['input']>;
  pagerank_centrality_MAX_GTE?: InputMaybe<Scalars['Float']['input']>;
  pagerank_centrality_MAX_LT?: InputMaybe<Scalars['Float']['input']>;
  pagerank_centrality_MAX_LTE?: InputMaybe<Scalars['Float']['input']>;
  pagerank_centrality_MIN_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  pagerank_centrality_MIN_GT?: InputMaybe<Scalars['Float']['input']>;
  pagerank_centrality_MIN_GTE?: InputMaybe<Scalars['Float']['input']>;
  pagerank_centrality_MIN_LT?: InputMaybe<Scalars['Float']['input']>;
  pagerank_centrality_MIN_LTE?: InputMaybe<Scalars['Float']['input']>;
  pagerank_centrality_SUM_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  pagerank_centrality_SUM_GT?: InputMaybe<Scalars['Float']['input']>;
  pagerank_centrality_SUM_GTE?: InputMaybe<Scalars['Float']['input']>;
  pagerank_centrality_SUM_LT?: InputMaybe<Scalars['Float']['input']>;
  pagerank_centrality_SUM_LTE?: InputMaybe<Scalars['Float']['input']>;
  topology_betweenness_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  topology_betweenness_AVERAGE_GT?: InputMaybe<Scalars['Float']['input']>;
  topology_betweenness_AVERAGE_GTE?: InputMaybe<Scalars['Float']['input']>;
  topology_betweenness_AVERAGE_LT?: InputMaybe<Scalars['Float']['input']>;
  topology_betweenness_AVERAGE_LTE?: InputMaybe<Scalars['Float']['input']>;
  topology_betweenness_MAX_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  topology_betweenness_MAX_GT?: InputMaybe<Scalars['Float']['input']>;
  topology_betweenness_MAX_GTE?: InputMaybe<Scalars['Float']['input']>;
  topology_betweenness_MAX_LT?: InputMaybe<Scalars['Float']['input']>;
  topology_betweenness_MAX_LTE?: InputMaybe<Scalars['Float']['input']>;
  topology_betweenness_MIN_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  topology_betweenness_MIN_GT?: InputMaybe<Scalars['Float']['input']>;
  topology_betweenness_MIN_GTE?: InputMaybe<Scalars['Float']['input']>;
  topology_betweenness_MIN_LT?: InputMaybe<Scalars['Float']['input']>;
  topology_betweenness_MIN_LTE?: InputMaybe<Scalars['Float']['input']>;
  topology_betweenness_SUM_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  topology_betweenness_SUM_GT?: InputMaybe<Scalars['Float']['input']>;
  topology_betweenness_SUM_GTE?: InputMaybe<Scalars['Float']['input']>;
  topology_betweenness_SUM_LT?: InputMaybe<Scalars['Float']['input']>;
  topology_betweenness_SUM_LTE?: InputMaybe<Scalars['Float']['input']>;
  topology_betweenness_norm_AVERAGE_EQUAL?: InputMaybe<
    Scalars['Float']['input']
  >;
  topology_betweenness_norm_AVERAGE_GT?: InputMaybe<Scalars['Float']['input']>;
  topology_betweenness_norm_AVERAGE_GTE?: InputMaybe<Scalars['Float']['input']>;
  topology_betweenness_norm_AVERAGE_LT?: InputMaybe<Scalars['Float']['input']>;
  topology_betweenness_norm_AVERAGE_LTE?: InputMaybe<Scalars['Float']['input']>;
  topology_betweenness_norm_MAX_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  topology_betweenness_norm_MAX_GT?: InputMaybe<Scalars['Float']['input']>;
  topology_betweenness_norm_MAX_GTE?: InputMaybe<Scalars['Float']['input']>;
  topology_betweenness_norm_MAX_LT?: InputMaybe<Scalars['Float']['input']>;
  topology_betweenness_norm_MAX_LTE?: InputMaybe<Scalars['Float']['input']>;
  topology_betweenness_norm_MIN_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  topology_betweenness_norm_MIN_GT?: InputMaybe<Scalars['Float']['input']>;
  topology_betweenness_norm_MIN_GTE?: InputMaybe<Scalars['Float']['input']>;
  topology_betweenness_norm_MIN_LT?: InputMaybe<Scalars['Float']['input']>;
  topology_betweenness_norm_MIN_LTE?: InputMaybe<Scalars['Float']['input']>;
  topology_betweenness_norm_SUM_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  topology_betweenness_norm_SUM_GT?: InputMaybe<Scalars['Float']['input']>;
  topology_betweenness_norm_SUM_GTE?: InputMaybe<Scalars['Float']['input']>;
  topology_betweenness_norm_SUM_LT?: InputMaybe<Scalars['Float']['input']>;
  topology_betweenness_norm_SUM_LTE?: InputMaybe<Scalars['Float']['input']>;
  topology_degree_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  topology_degree_AVERAGE_GT?: InputMaybe<Scalars['Float']['input']>;
  topology_degree_AVERAGE_GTE?: InputMaybe<Scalars['Float']['input']>;
  topology_degree_AVERAGE_LT?: InputMaybe<Scalars['Float']['input']>;
  topology_degree_AVERAGE_LTE?: InputMaybe<Scalars['Float']['input']>;
  topology_degree_MAX_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  topology_degree_MAX_GT?: InputMaybe<Scalars['Float']['input']>;
  topology_degree_MAX_GTE?: InputMaybe<Scalars['Float']['input']>;
  topology_degree_MAX_LT?: InputMaybe<Scalars['Float']['input']>;
  topology_degree_MAX_LTE?: InputMaybe<Scalars['Float']['input']>;
  topology_degree_MIN_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  topology_degree_MIN_GT?: InputMaybe<Scalars['Float']['input']>;
  topology_degree_MIN_GTE?: InputMaybe<Scalars['Float']['input']>;
  topology_degree_MIN_LT?: InputMaybe<Scalars['Float']['input']>;
  topology_degree_MIN_LTE?: InputMaybe<Scalars['Float']['input']>;
  topology_degree_SUM_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  topology_degree_SUM_GT?: InputMaybe<Scalars['Float']['input']>;
  topology_degree_SUM_GTE?: InputMaybe<Scalars['Float']['input']>;
  topology_degree_SUM_LT?: InputMaybe<Scalars['Float']['input']>;
  topology_degree_SUM_LTE?: InputMaybe<Scalars['Float']['input']>;
  topology_degree_norm_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  topology_degree_norm_AVERAGE_GT?: InputMaybe<Scalars['Float']['input']>;
  topology_degree_norm_AVERAGE_GTE?: InputMaybe<Scalars['Float']['input']>;
  topology_degree_norm_AVERAGE_LT?: InputMaybe<Scalars['Float']['input']>;
  topology_degree_norm_AVERAGE_LTE?: InputMaybe<Scalars['Float']['input']>;
  topology_degree_norm_MAX_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  topology_degree_norm_MAX_GT?: InputMaybe<Scalars['Float']['input']>;
  topology_degree_norm_MAX_GTE?: InputMaybe<Scalars['Float']['input']>;
  topology_degree_norm_MAX_LT?: InputMaybe<Scalars['Float']['input']>;
  topology_degree_norm_MAX_LTE?: InputMaybe<Scalars['Float']['input']>;
  topology_degree_norm_MIN_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  topology_degree_norm_MIN_GT?: InputMaybe<Scalars['Float']['input']>;
  topology_degree_norm_MIN_GTE?: InputMaybe<Scalars['Float']['input']>;
  topology_degree_norm_MIN_LT?: InputMaybe<Scalars['Float']['input']>;
  topology_degree_norm_MIN_LTE?: InputMaybe<Scalars['Float']['input']>;
  topology_degree_norm_SUM_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  topology_degree_norm_SUM_GT?: InputMaybe<Scalars['Float']['input']>;
  topology_degree_norm_SUM_GTE?: InputMaybe<Scalars['Float']['input']>;
  topology_degree_norm_SUM_LT?: InputMaybe<Scalars['Float']['input']>;
  topology_degree_norm_SUM_LTE?: InputMaybe<Scalars['Float']['input']>;
};

export type NodeObjectIs_Connected_To_NodesRelationship = {
  __typename?: 'NodeObjectIs_connected_to_nodesRelationship';
  cursor: Scalars['String']['output'];
  node: NodeObject;
};

export type NodeObjectIs_Connected_To_NodesUpdateConnectionInput = {
  node?: InputMaybe<NodeObjectUpdateInput>;
};

export type NodeObjectIs_Connected_To_NodesUpdateFieldInput = {
  connect?: InputMaybe<Array<NodeObjectIs_Connected_To_NodesConnectFieldInput>>;
  create?: InputMaybe<Array<NodeObjectIs_Connected_To_NodesCreateFieldInput>>;
  delete?: InputMaybe<Array<NodeObjectIs_Connected_To_NodesDeleteFieldInput>>;
  disconnect?: InputMaybe<
    Array<NodeObjectIs_Connected_To_NodesDisconnectFieldInput>
  >;
  update?: InputMaybe<NodeObjectIs_Connected_To_NodesUpdateConnectionInput>;
  where?: InputMaybe<NodeObjectIs_Connected_To_NodesConnectionWhere>;
};

export type NodeObjectIs_Dependent_On_NodesAggregateInput = {
  AND?: InputMaybe<Array<NodeObjectIs_Dependent_On_NodesAggregateInput>>;
  NOT?: InputMaybe<NodeObjectIs_Dependent_On_NodesAggregateInput>;
  OR?: InputMaybe<Array<NodeObjectIs_Dependent_On_NodesAggregateInput>>;
  count?: InputMaybe<Scalars['Int']['input']>;
  count_GT?: InputMaybe<Scalars['Int']['input']>;
  count_GTE?: InputMaybe<Scalars['Int']['input']>;
  count_LT?: InputMaybe<Scalars['Int']['input']>;
  count_LTE?: InputMaybe<Scalars['Int']['input']>;
  node?: InputMaybe<NodeObjectIs_Dependent_On_NodesNodeAggregationWhereInput>;
};

export type NodeObjectIs_Dependent_On_NodesConnectFieldInput = {
  connect?: InputMaybe<Array<NodeObjectConnectInput>>;
  /** Whether or not to overwrite any matching relationship with the new properties. */
  overwrite?: Scalars['Boolean']['input'];
  where?: InputMaybe<NodeObjectConnectWhere>;
};

export type NodeObjectIs_Dependent_On_NodesConnection = {
  __typename?: 'NodeObjectIs_dependent_on_nodesConnection';
  edges: Array<NodeObjectIs_Dependent_On_NodesRelationship>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type NodeObjectIs_Dependent_On_NodesConnectionSort = {
  node?: InputMaybe<NodeObjectSort>;
};

export type NodeObjectIs_Dependent_On_NodesConnectionWhere = {
  AND?: InputMaybe<Array<NodeObjectIs_Dependent_On_NodesConnectionWhere>>;
  NOT?: InputMaybe<NodeObjectIs_Dependent_On_NodesConnectionWhere>;
  OR?: InputMaybe<Array<NodeObjectIs_Dependent_On_NodesConnectionWhere>>;
  node?: InputMaybe<NodeObjectWhere>;
};

export type NodeObjectIs_Dependent_On_NodesCreateFieldInput = {
  node: NodeObjectCreateInput;
};

export type NodeObjectIs_Dependent_On_NodesDeleteFieldInput = {
  delete?: InputMaybe<NodeObjectDeleteInput>;
  where?: InputMaybe<NodeObjectIs_Dependent_On_NodesConnectionWhere>;
};

export type NodeObjectIs_Dependent_On_NodesDisconnectFieldInput = {
  disconnect?: InputMaybe<NodeObjectDisconnectInput>;
  where?: InputMaybe<NodeObjectIs_Dependent_On_NodesConnectionWhere>;
};

export type NodeObjectIs_Dependent_On_NodesFieldInput = {
  connect?: InputMaybe<Array<NodeObjectIs_Dependent_On_NodesConnectFieldInput>>;
  create?: InputMaybe<Array<NodeObjectIs_Dependent_On_NodesCreateFieldInput>>;
};

export type NodeObjectIs_Dependent_On_NodesNodeAggregationWhereInput = {
  AND?: InputMaybe<
    Array<NodeObjectIs_Dependent_On_NodesNodeAggregationWhereInput>
  >;
  NOT?: InputMaybe<NodeObjectIs_Dependent_On_NodesNodeAggregationWhereInput>;
  OR?: InputMaybe<
    Array<NodeObjectIs_Dependent_On_NodesNodeAggregationWhereInput>
  >;
  degree_centrality_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  degree_centrality_AVERAGE_GT?: InputMaybe<Scalars['Float']['input']>;
  degree_centrality_AVERAGE_GTE?: InputMaybe<Scalars['Float']['input']>;
  degree_centrality_AVERAGE_LT?: InputMaybe<Scalars['Float']['input']>;
  degree_centrality_AVERAGE_LTE?: InputMaybe<Scalars['Float']['input']>;
  degree_centrality_MAX_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  degree_centrality_MAX_GT?: InputMaybe<Scalars['Float']['input']>;
  degree_centrality_MAX_GTE?: InputMaybe<Scalars['Float']['input']>;
  degree_centrality_MAX_LT?: InputMaybe<Scalars['Float']['input']>;
  degree_centrality_MAX_LTE?: InputMaybe<Scalars['Float']['input']>;
  degree_centrality_MIN_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  degree_centrality_MIN_GT?: InputMaybe<Scalars['Float']['input']>;
  degree_centrality_MIN_GTE?: InputMaybe<Scalars['Float']['input']>;
  degree_centrality_MIN_LT?: InputMaybe<Scalars['Float']['input']>;
  degree_centrality_MIN_LTE?: InputMaybe<Scalars['Float']['input']>;
  degree_centrality_SUM_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  degree_centrality_SUM_GT?: InputMaybe<Scalars['Float']['input']>;
  degree_centrality_SUM_GTE?: InputMaybe<Scalars['Float']['input']>;
  degree_centrality_SUM_LT?: InputMaybe<Scalars['Float']['input']>;
  degree_centrality_SUM_LTE?: InputMaybe<Scalars['Float']['input']>;
  final_criticality_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  final_criticality_AVERAGE_GT?: InputMaybe<Scalars['Float']['input']>;
  final_criticality_AVERAGE_GTE?: InputMaybe<Scalars['Float']['input']>;
  final_criticality_AVERAGE_LT?: InputMaybe<Scalars['Float']['input']>;
  final_criticality_AVERAGE_LTE?: InputMaybe<Scalars['Float']['input']>;
  final_criticality_MAX_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  final_criticality_MAX_GT?: InputMaybe<Scalars['Float']['input']>;
  final_criticality_MAX_GTE?: InputMaybe<Scalars['Float']['input']>;
  final_criticality_MAX_LT?: InputMaybe<Scalars['Float']['input']>;
  final_criticality_MAX_LTE?: InputMaybe<Scalars['Float']['input']>;
  final_criticality_MIN_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  final_criticality_MIN_GT?: InputMaybe<Scalars['Float']['input']>;
  final_criticality_MIN_GTE?: InputMaybe<Scalars['Float']['input']>;
  final_criticality_MIN_LT?: InputMaybe<Scalars['Float']['input']>;
  final_criticality_MIN_LTE?: InputMaybe<Scalars['Float']['input']>;
  final_criticality_SUM_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  final_criticality_SUM_GT?: InputMaybe<Scalars['Float']['input']>;
  final_criticality_SUM_GTE?: InputMaybe<Scalars['Float']['input']>;
  final_criticality_SUM_LT?: InputMaybe<Scalars['Float']['input']>;
  final_criticality_SUM_LTE?: InputMaybe<Scalars['Float']['input']>;
  mission_criticality_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  mission_criticality_AVERAGE_GT?: InputMaybe<Scalars['Float']['input']>;
  mission_criticality_AVERAGE_GTE?: InputMaybe<Scalars['Float']['input']>;
  mission_criticality_AVERAGE_LT?: InputMaybe<Scalars['Float']['input']>;
  mission_criticality_AVERAGE_LTE?: InputMaybe<Scalars['Float']['input']>;
  mission_criticality_MAX_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  mission_criticality_MAX_GT?: InputMaybe<Scalars['Float']['input']>;
  mission_criticality_MAX_GTE?: InputMaybe<Scalars['Float']['input']>;
  mission_criticality_MAX_LT?: InputMaybe<Scalars['Float']['input']>;
  mission_criticality_MAX_LTE?: InputMaybe<Scalars['Float']['input']>;
  mission_criticality_MIN_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  mission_criticality_MIN_GT?: InputMaybe<Scalars['Float']['input']>;
  mission_criticality_MIN_GTE?: InputMaybe<Scalars['Float']['input']>;
  mission_criticality_MIN_LT?: InputMaybe<Scalars['Float']['input']>;
  mission_criticality_MIN_LTE?: InputMaybe<Scalars['Float']['input']>;
  mission_criticality_SUM_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  mission_criticality_SUM_GT?: InputMaybe<Scalars['Float']['input']>;
  mission_criticality_SUM_GTE?: InputMaybe<Scalars['Float']['input']>;
  mission_criticality_SUM_LT?: InputMaybe<Scalars['Float']['input']>;
  mission_criticality_SUM_LTE?: InputMaybe<Scalars['Float']['input']>;
  pagerank_centrality_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  pagerank_centrality_AVERAGE_GT?: InputMaybe<Scalars['Float']['input']>;
  pagerank_centrality_AVERAGE_GTE?: InputMaybe<Scalars['Float']['input']>;
  pagerank_centrality_AVERAGE_LT?: InputMaybe<Scalars['Float']['input']>;
  pagerank_centrality_AVERAGE_LTE?: InputMaybe<Scalars['Float']['input']>;
  pagerank_centrality_MAX_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  pagerank_centrality_MAX_GT?: InputMaybe<Scalars['Float']['input']>;
  pagerank_centrality_MAX_GTE?: InputMaybe<Scalars['Float']['input']>;
  pagerank_centrality_MAX_LT?: InputMaybe<Scalars['Float']['input']>;
  pagerank_centrality_MAX_LTE?: InputMaybe<Scalars['Float']['input']>;
  pagerank_centrality_MIN_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  pagerank_centrality_MIN_GT?: InputMaybe<Scalars['Float']['input']>;
  pagerank_centrality_MIN_GTE?: InputMaybe<Scalars['Float']['input']>;
  pagerank_centrality_MIN_LT?: InputMaybe<Scalars['Float']['input']>;
  pagerank_centrality_MIN_LTE?: InputMaybe<Scalars['Float']['input']>;
  pagerank_centrality_SUM_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  pagerank_centrality_SUM_GT?: InputMaybe<Scalars['Float']['input']>;
  pagerank_centrality_SUM_GTE?: InputMaybe<Scalars['Float']['input']>;
  pagerank_centrality_SUM_LT?: InputMaybe<Scalars['Float']['input']>;
  pagerank_centrality_SUM_LTE?: InputMaybe<Scalars['Float']['input']>;
  topology_betweenness_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  topology_betweenness_AVERAGE_GT?: InputMaybe<Scalars['Float']['input']>;
  topology_betweenness_AVERAGE_GTE?: InputMaybe<Scalars['Float']['input']>;
  topology_betweenness_AVERAGE_LT?: InputMaybe<Scalars['Float']['input']>;
  topology_betweenness_AVERAGE_LTE?: InputMaybe<Scalars['Float']['input']>;
  topology_betweenness_MAX_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  topology_betweenness_MAX_GT?: InputMaybe<Scalars['Float']['input']>;
  topology_betweenness_MAX_GTE?: InputMaybe<Scalars['Float']['input']>;
  topology_betweenness_MAX_LT?: InputMaybe<Scalars['Float']['input']>;
  topology_betweenness_MAX_LTE?: InputMaybe<Scalars['Float']['input']>;
  topology_betweenness_MIN_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  topology_betweenness_MIN_GT?: InputMaybe<Scalars['Float']['input']>;
  topology_betweenness_MIN_GTE?: InputMaybe<Scalars['Float']['input']>;
  topology_betweenness_MIN_LT?: InputMaybe<Scalars['Float']['input']>;
  topology_betweenness_MIN_LTE?: InputMaybe<Scalars['Float']['input']>;
  topology_betweenness_SUM_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  topology_betweenness_SUM_GT?: InputMaybe<Scalars['Float']['input']>;
  topology_betweenness_SUM_GTE?: InputMaybe<Scalars['Float']['input']>;
  topology_betweenness_SUM_LT?: InputMaybe<Scalars['Float']['input']>;
  topology_betweenness_SUM_LTE?: InputMaybe<Scalars['Float']['input']>;
  topology_betweenness_norm_AVERAGE_EQUAL?: InputMaybe<
    Scalars['Float']['input']
  >;
  topology_betweenness_norm_AVERAGE_GT?: InputMaybe<Scalars['Float']['input']>;
  topology_betweenness_norm_AVERAGE_GTE?: InputMaybe<Scalars['Float']['input']>;
  topology_betweenness_norm_AVERAGE_LT?: InputMaybe<Scalars['Float']['input']>;
  topology_betweenness_norm_AVERAGE_LTE?: InputMaybe<Scalars['Float']['input']>;
  topology_betweenness_norm_MAX_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  topology_betweenness_norm_MAX_GT?: InputMaybe<Scalars['Float']['input']>;
  topology_betweenness_norm_MAX_GTE?: InputMaybe<Scalars['Float']['input']>;
  topology_betweenness_norm_MAX_LT?: InputMaybe<Scalars['Float']['input']>;
  topology_betweenness_norm_MAX_LTE?: InputMaybe<Scalars['Float']['input']>;
  topology_betweenness_norm_MIN_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  topology_betweenness_norm_MIN_GT?: InputMaybe<Scalars['Float']['input']>;
  topology_betweenness_norm_MIN_GTE?: InputMaybe<Scalars['Float']['input']>;
  topology_betweenness_norm_MIN_LT?: InputMaybe<Scalars['Float']['input']>;
  topology_betweenness_norm_MIN_LTE?: InputMaybe<Scalars['Float']['input']>;
  topology_betweenness_norm_SUM_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  topology_betweenness_norm_SUM_GT?: InputMaybe<Scalars['Float']['input']>;
  topology_betweenness_norm_SUM_GTE?: InputMaybe<Scalars['Float']['input']>;
  topology_betweenness_norm_SUM_LT?: InputMaybe<Scalars['Float']['input']>;
  topology_betweenness_norm_SUM_LTE?: InputMaybe<Scalars['Float']['input']>;
  topology_degree_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  topology_degree_AVERAGE_GT?: InputMaybe<Scalars['Float']['input']>;
  topology_degree_AVERAGE_GTE?: InputMaybe<Scalars['Float']['input']>;
  topology_degree_AVERAGE_LT?: InputMaybe<Scalars['Float']['input']>;
  topology_degree_AVERAGE_LTE?: InputMaybe<Scalars['Float']['input']>;
  topology_degree_MAX_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  topology_degree_MAX_GT?: InputMaybe<Scalars['Float']['input']>;
  topology_degree_MAX_GTE?: InputMaybe<Scalars['Float']['input']>;
  topology_degree_MAX_LT?: InputMaybe<Scalars['Float']['input']>;
  topology_degree_MAX_LTE?: InputMaybe<Scalars['Float']['input']>;
  topology_degree_MIN_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  topology_degree_MIN_GT?: InputMaybe<Scalars['Float']['input']>;
  topology_degree_MIN_GTE?: InputMaybe<Scalars['Float']['input']>;
  topology_degree_MIN_LT?: InputMaybe<Scalars['Float']['input']>;
  topology_degree_MIN_LTE?: InputMaybe<Scalars['Float']['input']>;
  topology_degree_SUM_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  topology_degree_SUM_GT?: InputMaybe<Scalars['Float']['input']>;
  topology_degree_SUM_GTE?: InputMaybe<Scalars['Float']['input']>;
  topology_degree_SUM_LT?: InputMaybe<Scalars['Float']['input']>;
  topology_degree_SUM_LTE?: InputMaybe<Scalars['Float']['input']>;
  topology_degree_norm_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  topology_degree_norm_AVERAGE_GT?: InputMaybe<Scalars['Float']['input']>;
  topology_degree_norm_AVERAGE_GTE?: InputMaybe<Scalars['Float']['input']>;
  topology_degree_norm_AVERAGE_LT?: InputMaybe<Scalars['Float']['input']>;
  topology_degree_norm_AVERAGE_LTE?: InputMaybe<Scalars['Float']['input']>;
  topology_degree_norm_MAX_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  topology_degree_norm_MAX_GT?: InputMaybe<Scalars['Float']['input']>;
  topology_degree_norm_MAX_GTE?: InputMaybe<Scalars['Float']['input']>;
  topology_degree_norm_MAX_LT?: InputMaybe<Scalars['Float']['input']>;
  topology_degree_norm_MAX_LTE?: InputMaybe<Scalars['Float']['input']>;
  topology_degree_norm_MIN_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  topology_degree_norm_MIN_GT?: InputMaybe<Scalars['Float']['input']>;
  topology_degree_norm_MIN_GTE?: InputMaybe<Scalars['Float']['input']>;
  topology_degree_norm_MIN_LT?: InputMaybe<Scalars['Float']['input']>;
  topology_degree_norm_MIN_LTE?: InputMaybe<Scalars['Float']['input']>;
  topology_degree_norm_SUM_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  topology_degree_norm_SUM_GT?: InputMaybe<Scalars['Float']['input']>;
  topology_degree_norm_SUM_GTE?: InputMaybe<Scalars['Float']['input']>;
  topology_degree_norm_SUM_LT?: InputMaybe<Scalars['Float']['input']>;
  topology_degree_norm_SUM_LTE?: InputMaybe<Scalars['Float']['input']>;
};

export type NodeObjectIs_Dependent_On_NodesRelationship = {
  __typename?: 'NodeObjectIs_dependent_on_nodesRelationship';
  cursor: Scalars['String']['output'];
  node: NodeObject;
};

export type NodeObjectIs_Dependent_On_NodesUpdateConnectionInput = {
  node?: InputMaybe<NodeObjectUpdateInput>;
};

export type NodeObjectIs_Dependent_On_NodesUpdateFieldInput = {
  connect?: InputMaybe<Array<NodeObjectIs_Dependent_On_NodesConnectFieldInput>>;
  create?: InputMaybe<Array<NodeObjectIs_Dependent_On_NodesCreateFieldInput>>;
  delete?: InputMaybe<Array<NodeObjectIs_Dependent_On_NodesDeleteFieldInput>>;
  disconnect?: InputMaybe<
    Array<NodeObjectIs_Dependent_On_NodesDisconnectFieldInput>
  >;
  update?: InputMaybe<NodeObjectIs_Dependent_On_NodesUpdateConnectionInput>;
  where?: InputMaybe<NodeObjectIs_Dependent_On_NodesConnectionWhere>;
};

export type NodeObjectNodeObjectIs_Connected_To_NodesAggregationSelection = {
  __typename?: 'NodeObjectNodeObjectIs_connected_to_nodesAggregationSelection';
  count: Scalars['Int']['output'];
  node?: Maybe<NodeObjectNodeObjectIs_Connected_To_NodesNodeAggregateSelection>;
};

export type NodeObjectNodeObjectIs_Connected_To_NodesNodeAggregateSelection = {
  __typename?: 'NodeObjectNodeObjectIs_connected_to_nodesNodeAggregateSelection';
  degree_centrality: FloatAggregateSelection;
  final_criticality: FloatAggregateSelection;
  mission_criticality: FloatAggregateSelection;
  pagerank_centrality: FloatAggregateSelection;
  topology_betweenness: FloatAggregateSelection;
  topology_betweenness_norm: FloatAggregateSelection;
  topology_degree: FloatAggregateSelection;
  topology_degree_norm: FloatAggregateSelection;
};

export type NodeObjectNodeObjectIs_Dependent_On_NodesAggregationSelection = {
  __typename?: 'NodeObjectNodeObjectIs_dependent_on_nodesAggregationSelection';
  count: Scalars['Int']['output'];
  node?: Maybe<NodeObjectNodeObjectIs_Dependent_On_NodesNodeAggregateSelection>;
};

export type NodeObjectNodeObjectIs_Dependent_On_NodesNodeAggregateSelection = {
  __typename?: 'NodeObjectNodeObjectIs_dependent_on_nodesNodeAggregateSelection';
  degree_centrality: FloatAggregateSelection;
  final_criticality: FloatAggregateSelection;
  mission_criticality: FloatAggregateSelection;
  pagerank_centrality: FloatAggregateSelection;
  topology_betweenness: FloatAggregateSelection;
  topology_betweenness_norm: FloatAggregateSelection;
  topology_degree: FloatAggregateSelection;
  topology_degree_norm: FloatAggregateSelection;
};

export type NodeObjectOptions = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  /**
   * Specify one or more NodeObjectSort objects to sort NodeObjects by. The sorts
   * will be applied in the order in which they are arranged in the array.
   */
  sort?: InputMaybe<Array<NodeObjectSort>>;
};

export type NodeObjectRelationInput = {
  host?: InputMaybe<NodeObjectHostCreateFieldInput>;
  ips?: InputMaybe<Array<NodeObjectIpsCreateFieldInput>>;
  is_connected_to_nodes?: InputMaybe<
    Array<NodeObjectIs_Connected_To_NodesCreateFieldInput>
  >;
  is_dependent_on_nodes?: InputMaybe<
    Array<NodeObjectIs_Dependent_On_NodesCreateFieldInput>
  >;
};

/**
 * Fields to sort NodeObjects by. The order in which sorts are applied is not
 * guaranteed when specifying many fields in one NodeObjectSort object.
 */
export type NodeObjectSort = {
  _id?: InputMaybe<SortDirection>;
  degree_centrality?: InputMaybe<SortDirection>;
  final_criticality?: InputMaybe<SortDirection>;
  mission_criticality?: InputMaybe<SortDirection>;
  pagerank_centrality?: InputMaybe<SortDirection>;
  topology_betweenness?: InputMaybe<SortDirection>;
  topology_betweenness_norm?: InputMaybe<SortDirection>;
  topology_degree?: InputMaybe<SortDirection>;
  topology_degree_norm?: InputMaybe<SortDirection>;
};

export type NodeObjectUpdateInput = {
  degree_centrality?: InputMaybe<Scalars['Float']['input']>;
  degree_centrality_ADD?: InputMaybe<Scalars['Float']['input']>;
  degree_centrality_DIVIDE?: InputMaybe<Scalars['Float']['input']>;
  degree_centrality_MULTIPLY?: InputMaybe<Scalars['Float']['input']>;
  degree_centrality_SUBTRACT?: InputMaybe<Scalars['Float']['input']>;
  final_criticality?: InputMaybe<Scalars['Float']['input']>;
  final_criticality_ADD?: InputMaybe<Scalars['Float']['input']>;
  final_criticality_DIVIDE?: InputMaybe<Scalars['Float']['input']>;
  final_criticality_MULTIPLY?: InputMaybe<Scalars['Float']['input']>;
  final_criticality_SUBTRACT?: InputMaybe<Scalars['Float']['input']>;
  host?: InputMaybe<NodeObjectHostUpdateFieldInput>;
  ips?: InputMaybe<Array<NodeObjectIpsUpdateFieldInput>>;
  is_connected_to_nodes?: InputMaybe<
    Array<NodeObjectIs_Connected_To_NodesUpdateFieldInput>
  >;
  is_dependent_on_nodes?: InputMaybe<
    Array<NodeObjectIs_Dependent_On_NodesUpdateFieldInput>
  >;
  mission_criticality?: InputMaybe<Scalars['Float']['input']>;
  mission_criticality_ADD?: InputMaybe<Scalars['Float']['input']>;
  mission_criticality_DIVIDE?: InputMaybe<Scalars['Float']['input']>;
  mission_criticality_MULTIPLY?: InputMaybe<Scalars['Float']['input']>;
  mission_criticality_SUBTRACT?: InputMaybe<Scalars['Float']['input']>;
  pagerank_centrality?: InputMaybe<Scalars['Float']['input']>;
  pagerank_centrality_ADD?: InputMaybe<Scalars['Float']['input']>;
  pagerank_centrality_DIVIDE?: InputMaybe<Scalars['Float']['input']>;
  pagerank_centrality_MULTIPLY?: InputMaybe<Scalars['Float']['input']>;
  pagerank_centrality_SUBTRACT?: InputMaybe<Scalars['Float']['input']>;
  topology_betweenness?: InputMaybe<Scalars['Float']['input']>;
  topology_betweenness_ADD?: InputMaybe<Scalars['Float']['input']>;
  topology_betweenness_DIVIDE?: InputMaybe<Scalars['Float']['input']>;
  topology_betweenness_MULTIPLY?: InputMaybe<Scalars['Float']['input']>;
  topology_betweenness_SUBTRACT?: InputMaybe<Scalars['Float']['input']>;
  topology_betweenness_norm?: InputMaybe<Scalars['Float']['input']>;
  topology_betweenness_norm_ADD?: InputMaybe<Scalars['Float']['input']>;
  topology_betweenness_norm_DIVIDE?: InputMaybe<Scalars['Float']['input']>;
  topology_betweenness_norm_MULTIPLY?: InputMaybe<Scalars['Float']['input']>;
  topology_betweenness_norm_SUBTRACT?: InputMaybe<Scalars['Float']['input']>;
  topology_degree?: InputMaybe<Scalars['Float']['input']>;
  topology_degree_ADD?: InputMaybe<Scalars['Float']['input']>;
  topology_degree_DIVIDE?: InputMaybe<Scalars['Float']['input']>;
  topology_degree_MULTIPLY?: InputMaybe<Scalars['Float']['input']>;
  topology_degree_SUBTRACT?: InputMaybe<Scalars['Float']['input']>;
  topology_degree_norm?: InputMaybe<Scalars['Float']['input']>;
  topology_degree_norm_ADD?: InputMaybe<Scalars['Float']['input']>;
  topology_degree_norm_DIVIDE?: InputMaybe<Scalars['Float']['input']>;
  topology_degree_norm_MULTIPLY?: InputMaybe<Scalars['Float']['input']>;
  topology_degree_norm_SUBTRACT?: InputMaybe<Scalars['Float']['input']>;
};

export type NodeObjectWhere = {
  AND?: InputMaybe<Array<NodeObjectWhere>>;
  NOT?: InputMaybe<NodeObjectWhere>;
  OR?: InputMaybe<Array<NodeObjectWhere>>;
  _id?: InputMaybe<Scalars['ID']['input']>;
  _id_CONTAINS?: InputMaybe<Scalars['ID']['input']>;
  _id_ENDS_WITH?: InputMaybe<Scalars['ID']['input']>;
  _id_IN?: InputMaybe<Array<Scalars['ID']['input']>>;
  _id_STARTS_WITH?: InputMaybe<Scalars['ID']['input']>;
  degree_centrality?: InputMaybe<Scalars['Float']['input']>;
  degree_centrality_GT?: InputMaybe<Scalars['Float']['input']>;
  degree_centrality_GTE?: InputMaybe<Scalars['Float']['input']>;
  degree_centrality_IN?: InputMaybe<
    Array<InputMaybe<Scalars['Float']['input']>>
  >;
  degree_centrality_LT?: InputMaybe<Scalars['Float']['input']>;
  degree_centrality_LTE?: InputMaybe<Scalars['Float']['input']>;
  final_criticality?: InputMaybe<Scalars['Float']['input']>;
  final_criticality_GT?: InputMaybe<Scalars['Float']['input']>;
  final_criticality_GTE?: InputMaybe<Scalars['Float']['input']>;
  final_criticality_IN?: InputMaybe<
    Array<InputMaybe<Scalars['Float']['input']>>
  >;
  final_criticality_LT?: InputMaybe<Scalars['Float']['input']>;
  final_criticality_LTE?: InputMaybe<Scalars['Float']['input']>;
  host?: InputMaybe<HostWhere>;
  hostAggregate?: InputMaybe<NodeObjectHostAggregateInput>;
  hostConnection?: InputMaybe<NodeObjectHostConnectionWhere>;
  hostConnection_NOT?: InputMaybe<NodeObjectHostConnectionWhere>;
  host_NOT?: InputMaybe<HostWhere>;
  ipsAggregate?: InputMaybe<NodeObjectIpsAggregateInput>;
  /** Return NodeObjects where all of the related NodeObjectIpsConnections match this filter */
  ipsConnection_ALL?: InputMaybe<NodeObjectIpsConnectionWhere>;
  /** Return NodeObjects where none of the related NodeObjectIpsConnections match this filter */
  ipsConnection_NONE?: InputMaybe<NodeObjectIpsConnectionWhere>;
  /** Return NodeObjects where one of the related NodeObjectIpsConnections match this filter */
  ipsConnection_SINGLE?: InputMaybe<NodeObjectIpsConnectionWhere>;
  /** Return NodeObjects where some of the related NodeObjectIpsConnections match this filter */
  ipsConnection_SOME?: InputMaybe<NodeObjectIpsConnectionWhere>;
  /** Return NodeObjects where all of the related IPS match this filter */
  ips_ALL?: InputMaybe<IpWhere>;
  /** Return NodeObjects where none of the related IPS match this filter */
  ips_NONE?: InputMaybe<IpWhere>;
  /** Return NodeObjects where one of the related IPS match this filter */
  ips_SINGLE?: InputMaybe<IpWhere>;
  /** Return NodeObjects where some of the related IPS match this filter */
  ips_SOME?: InputMaybe<IpWhere>;
  is_connected_to_nodesAggregate?: InputMaybe<NodeObjectIs_Connected_To_NodesAggregateInput>;
  /** Return NodeObjects where all of the related NodeObjectIs_connected_to_nodesConnections match this filter */
  is_connected_to_nodesConnection_ALL?: InputMaybe<NodeObjectIs_Connected_To_NodesConnectionWhere>;
  /** Return NodeObjects where none of the related NodeObjectIs_connected_to_nodesConnections match this filter */
  is_connected_to_nodesConnection_NONE?: InputMaybe<NodeObjectIs_Connected_To_NodesConnectionWhere>;
  /** Return NodeObjects where one of the related NodeObjectIs_connected_to_nodesConnections match this filter */
  is_connected_to_nodesConnection_SINGLE?: InputMaybe<NodeObjectIs_Connected_To_NodesConnectionWhere>;
  /** Return NodeObjects where some of the related NodeObjectIs_connected_to_nodesConnections match this filter */
  is_connected_to_nodesConnection_SOME?: InputMaybe<NodeObjectIs_Connected_To_NodesConnectionWhere>;
  /** Return NodeObjects where all of the related NodeObjects match this filter */
  is_connected_to_nodes_ALL?: InputMaybe<NodeObjectWhere>;
  /** Return NodeObjects where none of the related NodeObjects match this filter */
  is_connected_to_nodes_NONE?: InputMaybe<NodeObjectWhere>;
  /** Return NodeObjects where one of the related NodeObjects match this filter */
  is_connected_to_nodes_SINGLE?: InputMaybe<NodeObjectWhere>;
  /** Return NodeObjects where some of the related NodeObjects match this filter */
  is_connected_to_nodes_SOME?: InputMaybe<NodeObjectWhere>;
  is_dependent_on_nodesAggregate?: InputMaybe<NodeObjectIs_Dependent_On_NodesAggregateInput>;
  /** Return NodeObjects where all of the related NodeObjectIs_dependent_on_nodesConnections match this filter */
  is_dependent_on_nodesConnection_ALL?: InputMaybe<NodeObjectIs_Dependent_On_NodesConnectionWhere>;
  /** Return NodeObjects where none of the related NodeObjectIs_dependent_on_nodesConnections match this filter */
  is_dependent_on_nodesConnection_NONE?: InputMaybe<NodeObjectIs_Dependent_On_NodesConnectionWhere>;
  /** Return NodeObjects where one of the related NodeObjectIs_dependent_on_nodesConnections match this filter */
  is_dependent_on_nodesConnection_SINGLE?: InputMaybe<NodeObjectIs_Dependent_On_NodesConnectionWhere>;
  /** Return NodeObjects where some of the related NodeObjectIs_dependent_on_nodesConnections match this filter */
  is_dependent_on_nodesConnection_SOME?: InputMaybe<NodeObjectIs_Dependent_On_NodesConnectionWhere>;
  /** Return NodeObjects where all of the related NodeObjects match this filter */
  is_dependent_on_nodes_ALL?: InputMaybe<NodeObjectWhere>;
  /** Return NodeObjects where none of the related NodeObjects match this filter */
  is_dependent_on_nodes_NONE?: InputMaybe<NodeObjectWhere>;
  /** Return NodeObjects where one of the related NodeObjects match this filter */
  is_dependent_on_nodes_SINGLE?: InputMaybe<NodeObjectWhere>;
  /** Return NodeObjects where some of the related NodeObjects match this filter */
  is_dependent_on_nodes_SOME?: InputMaybe<NodeObjectWhere>;
  mission_criticality?: InputMaybe<Scalars['Float']['input']>;
  mission_criticality_GT?: InputMaybe<Scalars['Float']['input']>;
  mission_criticality_GTE?: InputMaybe<Scalars['Float']['input']>;
  mission_criticality_IN?: InputMaybe<
    Array<InputMaybe<Scalars['Float']['input']>>
  >;
  mission_criticality_LT?: InputMaybe<Scalars['Float']['input']>;
  mission_criticality_LTE?: InputMaybe<Scalars['Float']['input']>;
  pagerank_centrality?: InputMaybe<Scalars['Float']['input']>;
  pagerank_centrality_GT?: InputMaybe<Scalars['Float']['input']>;
  pagerank_centrality_GTE?: InputMaybe<Scalars['Float']['input']>;
  pagerank_centrality_IN?: InputMaybe<
    Array<InputMaybe<Scalars['Float']['input']>>
  >;
  pagerank_centrality_LT?: InputMaybe<Scalars['Float']['input']>;
  pagerank_centrality_LTE?: InputMaybe<Scalars['Float']['input']>;
  topology_betweenness?: InputMaybe<Scalars['Float']['input']>;
  topology_betweenness_GT?: InputMaybe<Scalars['Float']['input']>;
  topology_betweenness_GTE?: InputMaybe<Scalars['Float']['input']>;
  topology_betweenness_IN?: InputMaybe<
    Array<InputMaybe<Scalars['Float']['input']>>
  >;
  topology_betweenness_LT?: InputMaybe<Scalars['Float']['input']>;
  topology_betweenness_LTE?: InputMaybe<Scalars['Float']['input']>;
  topology_betweenness_norm?: InputMaybe<Scalars['Float']['input']>;
  topology_betweenness_norm_GT?: InputMaybe<Scalars['Float']['input']>;
  topology_betweenness_norm_GTE?: InputMaybe<Scalars['Float']['input']>;
  topology_betweenness_norm_IN?: InputMaybe<
    Array<InputMaybe<Scalars['Float']['input']>>
  >;
  topology_betweenness_norm_LT?: InputMaybe<Scalars['Float']['input']>;
  topology_betweenness_norm_LTE?: InputMaybe<Scalars['Float']['input']>;
  topology_degree?: InputMaybe<Scalars['Float']['input']>;
  topology_degree_GT?: InputMaybe<Scalars['Float']['input']>;
  topology_degree_GTE?: InputMaybe<Scalars['Float']['input']>;
  topology_degree_IN?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  topology_degree_LT?: InputMaybe<Scalars['Float']['input']>;
  topology_degree_LTE?: InputMaybe<Scalars['Float']['input']>;
  topology_degree_norm?: InputMaybe<Scalars['Float']['input']>;
  topology_degree_norm_GT?: InputMaybe<Scalars['Float']['input']>;
  topology_degree_norm_GTE?: InputMaybe<Scalars['Float']['input']>;
  topology_degree_norm_IN?: InputMaybe<
    Array<InputMaybe<Scalars['Float']['input']>>
  >;
  topology_degree_norm_LT?: InputMaybe<Scalars['Float']['input']>;
  topology_degree_norm_LTE?: InputMaybe<Scalars['Float']['input']>;
};

export type NodeObjectsConnection = {
  __typename?: 'NodeObjectsConnection';
  edges: Array<NodeObjectEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type OrganizationUnit = {
  __typename?: 'OrganizationUnit';
  _id: Scalars['ID']['output'];
  contacts: Array<Contact>;
  contactsAggregate?: Maybe<OrganizationUnitContactContactsAggregationSelection>;
  contactsConnection: OrganizationUnitContactsConnection;
  name: Scalars['String']['output'];
  parent_org_unit: Array<OrganizationUnit>;
  parent_org_unitAggregate?: Maybe<OrganizationUnitOrganizationUnitParent_Org_UnitAggregationSelection>;
  parent_org_unitConnection: OrganizationUnitParent_Org_UnitConnection;
  physical_environments: Array<PhysicalEnvironment>;
  physical_environmentsAggregate?: Maybe<OrganizationUnitPhysicalEnvironmentPhysical_EnvironmentsAggregationSelection>;
  physical_environmentsConnection: OrganizationUnitPhysical_EnvironmentsConnection;
  subnets: Array<Subnet>;
  subnetsAggregate?: Maybe<OrganizationUnitSubnetSubnetsAggregationSelection>;
  subnetsConnection: OrganizationUnitSubnetsConnection;
};

export type OrganizationUnitContactsArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  options?: InputMaybe<ContactOptions>;
  where?: InputMaybe<ContactWhere>;
};

export type OrganizationUnitContactsAggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<ContactWhere>;
};

export type OrganizationUnitContactsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<OrganizationUnitContactsConnectionSort>>;
  where?: InputMaybe<OrganizationUnitContactsConnectionWhere>;
};

export type OrganizationUnitParent_Org_UnitArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  options?: InputMaybe<OrganizationUnitOptions>;
  where?: InputMaybe<OrganizationUnitWhere>;
};

export type OrganizationUnitParent_Org_UnitAggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<OrganizationUnitWhere>;
};

export type OrganizationUnitParent_Org_UnitConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<OrganizationUnitParent_Org_UnitConnectionSort>>;
  where?: InputMaybe<OrganizationUnitParent_Org_UnitConnectionWhere>;
};

export type OrganizationUnitPhysical_EnvironmentsArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  options?: InputMaybe<PhysicalEnvironmentOptions>;
  where?: InputMaybe<PhysicalEnvironmentWhere>;
};

export type OrganizationUnitPhysical_EnvironmentsAggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<PhysicalEnvironmentWhere>;
};

export type OrganizationUnitPhysical_EnvironmentsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<OrganizationUnitPhysical_EnvironmentsConnectionSort>>;
  where?: InputMaybe<OrganizationUnitPhysical_EnvironmentsConnectionWhere>;
};

export type OrganizationUnitSubnetsArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  options?: InputMaybe<SubnetOptions>;
  where?: InputMaybe<SubnetWhere>;
};

export type OrganizationUnitSubnetsAggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<SubnetWhere>;
};

export type OrganizationUnitSubnetsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<OrganizationUnitSubnetsConnectionSort>>;
  where?: InputMaybe<OrganizationUnitSubnetsConnectionWhere>;
};

export type OrganizationUnitAggregateSelection = {
  __typename?: 'OrganizationUnitAggregateSelection';
  count: Scalars['Int']['output'];
  name: StringAggregateSelection;
};

export type OrganizationUnitConnectInput = {
  contacts?: InputMaybe<Array<OrganizationUnitContactsConnectFieldInput>>;
  parent_org_unit?: InputMaybe<
    Array<OrganizationUnitParent_Org_UnitConnectFieldInput>
  >;
  physical_environments?: InputMaybe<
    Array<OrganizationUnitPhysical_EnvironmentsConnectFieldInput>
  >;
  subnets?: InputMaybe<Array<OrganizationUnitSubnetsConnectFieldInput>>;
};

export type OrganizationUnitConnectWhere = {
  node: OrganizationUnitWhere;
};

export type OrganizationUnitContactContactsAggregationSelection = {
  __typename?: 'OrganizationUnitContactContactsAggregationSelection';
  count: Scalars['Int']['output'];
  node?: Maybe<OrganizationUnitContactContactsNodeAggregateSelection>;
};

export type OrganizationUnitContactContactsNodeAggregateSelection = {
  __typename?: 'OrganizationUnitContactContactsNodeAggregateSelection';
  name: StringAggregateSelection;
};

export type OrganizationUnitContactsAggregateInput = {
  AND?: InputMaybe<Array<OrganizationUnitContactsAggregateInput>>;
  NOT?: InputMaybe<OrganizationUnitContactsAggregateInput>;
  OR?: InputMaybe<Array<OrganizationUnitContactsAggregateInput>>;
  count?: InputMaybe<Scalars['Int']['input']>;
  count_GT?: InputMaybe<Scalars['Int']['input']>;
  count_GTE?: InputMaybe<Scalars['Int']['input']>;
  count_LT?: InputMaybe<Scalars['Int']['input']>;
  count_LTE?: InputMaybe<Scalars['Int']['input']>;
  node?: InputMaybe<OrganizationUnitContactsNodeAggregationWhereInput>;
};

export type OrganizationUnitContactsConnectFieldInput = {
  connect?: InputMaybe<Array<ContactConnectInput>>;
  /** Whether or not to overwrite any matching relationship with the new properties. */
  overwrite?: Scalars['Boolean']['input'];
  where?: InputMaybe<ContactConnectWhere>;
};

export type OrganizationUnitContactsConnection = {
  __typename?: 'OrganizationUnitContactsConnection';
  edges: Array<OrganizationUnitContactsRelationship>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type OrganizationUnitContactsConnectionSort = {
  node?: InputMaybe<ContactSort>;
};

export type OrganizationUnitContactsConnectionWhere = {
  AND?: InputMaybe<Array<OrganizationUnitContactsConnectionWhere>>;
  NOT?: InputMaybe<OrganizationUnitContactsConnectionWhere>;
  OR?: InputMaybe<Array<OrganizationUnitContactsConnectionWhere>>;
  node?: InputMaybe<ContactWhere>;
};

export type OrganizationUnitContactsCreateFieldInput = {
  node: ContactCreateInput;
};

export type OrganizationUnitContactsDeleteFieldInput = {
  delete?: InputMaybe<ContactDeleteInput>;
  where?: InputMaybe<OrganizationUnitContactsConnectionWhere>;
};

export type OrganizationUnitContactsDisconnectFieldInput = {
  disconnect?: InputMaybe<ContactDisconnectInput>;
  where?: InputMaybe<OrganizationUnitContactsConnectionWhere>;
};

export type OrganizationUnitContactsFieldInput = {
  connect?: InputMaybe<Array<OrganizationUnitContactsConnectFieldInput>>;
  create?: InputMaybe<Array<OrganizationUnitContactsCreateFieldInput>>;
};

export type OrganizationUnitContactsNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<OrganizationUnitContactsNodeAggregationWhereInput>>;
  NOT?: InputMaybe<OrganizationUnitContactsNodeAggregationWhereInput>;
  OR?: InputMaybe<Array<OrganizationUnitContactsNodeAggregationWhereInput>>;
  name_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
};

export type OrganizationUnitContactsRelationship = {
  __typename?: 'OrganizationUnitContactsRelationship';
  cursor: Scalars['String']['output'];
  node: Contact;
};

export type OrganizationUnitContactsUpdateConnectionInput = {
  node?: InputMaybe<ContactUpdateInput>;
};

export type OrganizationUnitContactsUpdateFieldInput = {
  connect?: InputMaybe<Array<OrganizationUnitContactsConnectFieldInput>>;
  create?: InputMaybe<Array<OrganizationUnitContactsCreateFieldInput>>;
  delete?: InputMaybe<Array<OrganizationUnitContactsDeleteFieldInput>>;
  disconnect?: InputMaybe<Array<OrganizationUnitContactsDisconnectFieldInput>>;
  update?: InputMaybe<OrganizationUnitContactsUpdateConnectionInput>;
  where?: InputMaybe<OrganizationUnitContactsConnectionWhere>;
};

export type OrganizationUnitCreateInput = {
  contacts?: InputMaybe<OrganizationUnitContactsFieldInput>;
  name: Scalars['String']['input'];
  parent_org_unit?: InputMaybe<OrganizationUnitParent_Org_UnitFieldInput>;
  physical_environments?: InputMaybe<OrganizationUnitPhysical_EnvironmentsFieldInput>;
  subnets?: InputMaybe<OrganizationUnitSubnetsFieldInput>;
};

export type OrganizationUnitDeleteInput = {
  contacts?: InputMaybe<Array<OrganizationUnitContactsDeleteFieldInput>>;
  parent_org_unit?: InputMaybe<
    Array<OrganizationUnitParent_Org_UnitDeleteFieldInput>
  >;
  physical_environments?: InputMaybe<
    Array<OrganizationUnitPhysical_EnvironmentsDeleteFieldInput>
  >;
  subnets?: InputMaybe<Array<OrganizationUnitSubnetsDeleteFieldInput>>;
};

export type OrganizationUnitDisconnectInput = {
  contacts?: InputMaybe<Array<OrganizationUnitContactsDisconnectFieldInput>>;
  parent_org_unit?: InputMaybe<
    Array<OrganizationUnitParent_Org_UnitDisconnectFieldInput>
  >;
  physical_environments?: InputMaybe<
    Array<OrganizationUnitPhysical_EnvironmentsDisconnectFieldInput>
  >;
  subnets?: InputMaybe<Array<OrganizationUnitSubnetsDisconnectFieldInput>>;
};

export type OrganizationUnitEdge = {
  __typename?: 'OrganizationUnitEdge';
  cursor: Scalars['String']['output'];
  node: OrganizationUnit;
};

export type OrganizationUnitOptions = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  /**
   * Specify one or more OrganizationUnitSort objects to sort OrganizationUnits by.
   * The sorts will be applied in the order in which they are arranged in the array.
   */
  sort?: InputMaybe<Array<OrganizationUnitSort>>;
};

export type OrganizationUnitOrganizationUnitParent_Org_UnitAggregationSelection =
  {
    __typename?: 'OrganizationUnitOrganizationUnitParent_org_unitAggregationSelection';
    count: Scalars['Int']['output'];
    node?: Maybe<OrganizationUnitOrganizationUnitParent_Org_UnitNodeAggregateSelection>;
  };

export type OrganizationUnitOrganizationUnitParent_Org_UnitNodeAggregateSelection =
  {
    __typename?: 'OrganizationUnitOrganizationUnitParent_org_unitNodeAggregateSelection';
    name: StringAggregateSelection;
  };

export type OrganizationUnitParent_Org_UnitAggregateInput = {
  AND?: InputMaybe<Array<OrganizationUnitParent_Org_UnitAggregateInput>>;
  NOT?: InputMaybe<OrganizationUnitParent_Org_UnitAggregateInput>;
  OR?: InputMaybe<Array<OrganizationUnitParent_Org_UnitAggregateInput>>;
  count?: InputMaybe<Scalars['Int']['input']>;
  count_GT?: InputMaybe<Scalars['Int']['input']>;
  count_GTE?: InputMaybe<Scalars['Int']['input']>;
  count_LT?: InputMaybe<Scalars['Int']['input']>;
  count_LTE?: InputMaybe<Scalars['Int']['input']>;
  node?: InputMaybe<OrganizationUnitParent_Org_UnitNodeAggregationWhereInput>;
};

export type OrganizationUnitParent_Org_UnitConnectFieldInput = {
  connect?: InputMaybe<Array<OrganizationUnitConnectInput>>;
  /** Whether or not to overwrite any matching relationship with the new properties. */
  overwrite?: Scalars['Boolean']['input'];
  where?: InputMaybe<OrganizationUnitConnectWhere>;
};

export type OrganizationUnitParent_Org_UnitConnection = {
  __typename?: 'OrganizationUnitParent_org_unitConnection';
  edges: Array<OrganizationUnitParent_Org_UnitRelationship>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type OrganizationUnitParent_Org_UnitConnectionSort = {
  node?: InputMaybe<OrganizationUnitSort>;
};

export type OrganizationUnitParent_Org_UnitConnectionWhere = {
  AND?: InputMaybe<Array<OrganizationUnitParent_Org_UnitConnectionWhere>>;
  NOT?: InputMaybe<OrganizationUnitParent_Org_UnitConnectionWhere>;
  OR?: InputMaybe<Array<OrganizationUnitParent_Org_UnitConnectionWhere>>;
  node?: InputMaybe<OrganizationUnitWhere>;
};

export type OrganizationUnitParent_Org_UnitCreateFieldInput = {
  node: OrganizationUnitCreateInput;
};

export type OrganizationUnitParent_Org_UnitDeleteFieldInput = {
  delete?: InputMaybe<OrganizationUnitDeleteInput>;
  where?: InputMaybe<OrganizationUnitParent_Org_UnitConnectionWhere>;
};

export type OrganizationUnitParent_Org_UnitDisconnectFieldInput = {
  disconnect?: InputMaybe<OrganizationUnitDisconnectInput>;
  where?: InputMaybe<OrganizationUnitParent_Org_UnitConnectionWhere>;
};

export type OrganizationUnitParent_Org_UnitFieldInput = {
  connect?: InputMaybe<Array<OrganizationUnitParent_Org_UnitConnectFieldInput>>;
  create?: InputMaybe<Array<OrganizationUnitParent_Org_UnitCreateFieldInput>>;
};

export type OrganizationUnitParent_Org_UnitNodeAggregationWhereInput = {
  AND?: InputMaybe<
    Array<OrganizationUnitParent_Org_UnitNodeAggregationWhereInput>
  >;
  NOT?: InputMaybe<OrganizationUnitParent_Org_UnitNodeAggregationWhereInput>;
  OR?: InputMaybe<
    Array<OrganizationUnitParent_Org_UnitNodeAggregationWhereInput>
  >;
  name_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
};

export type OrganizationUnitParent_Org_UnitRelationship = {
  __typename?: 'OrganizationUnitParent_org_unitRelationship';
  cursor: Scalars['String']['output'];
  node: OrganizationUnit;
};

export type OrganizationUnitParent_Org_UnitUpdateConnectionInput = {
  node?: InputMaybe<OrganizationUnitUpdateInput>;
};

export type OrganizationUnitParent_Org_UnitUpdateFieldInput = {
  connect?: InputMaybe<Array<OrganizationUnitParent_Org_UnitConnectFieldInput>>;
  create?: InputMaybe<Array<OrganizationUnitParent_Org_UnitCreateFieldInput>>;
  delete?: InputMaybe<Array<OrganizationUnitParent_Org_UnitDeleteFieldInput>>;
  disconnect?: InputMaybe<
    Array<OrganizationUnitParent_Org_UnitDisconnectFieldInput>
  >;
  update?: InputMaybe<OrganizationUnitParent_Org_UnitUpdateConnectionInput>;
  where?: InputMaybe<OrganizationUnitParent_Org_UnitConnectionWhere>;
};

export type OrganizationUnitPhysicalEnvironmentPhysical_EnvironmentsAggregationSelection =
  {
    __typename?: 'OrganizationUnitPhysicalEnvironmentPhysical_environmentsAggregationSelection';
    count: Scalars['Int']['output'];
    node?: Maybe<OrganizationUnitPhysicalEnvironmentPhysical_EnvironmentsNodeAggregateSelection>;
  };

export type OrganizationUnitPhysicalEnvironmentPhysical_EnvironmentsNodeAggregateSelection =
  {
    __typename?: 'OrganizationUnitPhysicalEnvironmentPhysical_environmentsNodeAggregateSelection';
    location: StringAggregateSelection;
  };

export type OrganizationUnitPhysical_EnvironmentsAggregateInput = {
  AND?: InputMaybe<Array<OrganizationUnitPhysical_EnvironmentsAggregateInput>>;
  NOT?: InputMaybe<OrganizationUnitPhysical_EnvironmentsAggregateInput>;
  OR?: InputMaybe<Array<OrganizationUnitPhysical_EnvironmentsAggregateInput>>;
  count?: InputMaybe<Scalars['Int']['input']>;
  count_GT?: InputMaybe<Scalars['Int']['input']>;
  count_GTE?: InputMaybe<Scalars['Int']['input']>;
  count_LT?: InputMaybe<Scalars['Int']['input']>;
  count_LTE?: InputMaybe<Scalars['Int']['input']>;
  node?: InputMaybe<OrganizationUnitPhysical_EnvironmentsNodeAggregationWhereInput>;
};

export type OrganizationUnitPhysical_EnvironmentsConnectFieldInput = {
  connect?: InputMaybe<Array<PhysicalEnvironmentConnectInput>>;
  /** Whether or not to overwrite any matching relationship with the new properties. */
  overwrite?: Scalars['Boolean']['input'];
  where?: InputMaybe<PhysicalEnvironmentConnectWhere>;
};

export type OrganizationUnitPhysical_EnvironmentsConnection = {
  __typename?: 'OrganizationUnitPhysical_environmentsConnection';
  edges: Array<OrganizationUnitPhysical_EnvironmentsRelationship>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type OrganizationUnitPhysical_EnvironmentsConnectionSort = {
  node?: InputMaybe<PhysicalEnvironmentSort>;
};

export type OrganizationUnitPhysical_EnvironmentsConnectionWhere = {
  AND?: InputMaybe<Array<OrganizationUnitPhysical_EnvironmentsConnectionWhere>>;
  NOT?: InputMaybe<OrganizationUnitPhysical_EnvironmentsConnectionWhere>;
  OR?: InputMaybe<Array<OrganizationUnitPhysical_EnvironmentsConnectionWhere>>;
  node?: InputMaybe<PhysicalEnvironmentWhere>;
};

export type OrganizationUnitPhysical_EnvironmentsCreateFieldInput = {
  node: PhysicalEnvironmentCreateInput;
};

export type OrganizationUnitPhysical_EnvironmentsDeleteFieldInput = {
  delete?: InputMaybe<PhysicalEnvironmentDeleteInput>;
  where?: InputMaybe<OrganizationUnitPhysical_EnvironmentsConnectionWhere>;
};

export type OrganizationUnitPhysical_EnvironmentsDisconnectFieldInput = {
  disconnect?: InputMaybe<PhysicalEnvironmentDisconnectInput>;
  where?: InputMaybe<OrganizationUnitPhysical_EnvironmentsConnectionWhere>;
};

export type OrganizationUnitPhysical_EnvironmentsFieldInput = {
  connect?: InputMaybe<
    Array<OrganizationUnitPhysical_EnvironmentsConnectFieldInput>
  >;
  create?: InputMaybe<
    Array<OrganizationUnitPhysical_EnvironmentsCreateFieldInput>
  >;
};

export type OrganizationUnitPhysical_EnvironmentsNodeAggregationWhereInput = {
  AND?: InputMaybe<
    Array<OrganizationUnitPhysical_EnvironmentsNodeAggregationWhereInput>
  >;
  NOT?: InputMaybe<OrganizationUnitPhysical_EnvironmentsNodeAggregationWhereInput>;
  OR?: InputMaybe<
    Array<OrganizationUnitPhysical_EnvironmentsNodeAggregationWhereInput>
  >;
  location_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  location_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  location_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  location_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  location_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  location_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  location_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  location_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  location_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  location_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  location_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  location_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  location_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  location_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  location_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
};

export type OrganizationUnitPhysical_EnvironmentsRelationship = {
  __typename?: 'OrganizationUnitPhysical_environmentsRelationship';
  cursor: Scalars['String']['output'];
  node: PhysicalEnvironment;
};

export type OrganizationUnitPhysical_EnvironmentsUpdateConnectionInput = {
  node?: InputMaybe<PhysicalEnvironmentUpdateInput>;
};

export type OrganizationUnitPhysical_EnvironmentsUpdateFieldInput = {
  connect?: InputMaybe<
    Array<OrganizationUnitPhysical_EnvironmentsConnectFieldInput>
  >;
  create?: InputMaybe<
    Array<OrganizationUnitPhysical_EnvironmentsCreateFieldInput>
  >;
  delete?: InputMaybe<
    Array<OrganizationUnitPhysical_EnvironmentsDeleteFieldInput>
  >;
  disconnect?: InputMaybe<
    Array<OrganizationUnitPhysical_EnvironmentsDisconnectFieldInput>
  >;
  update?: InputMaybe<OrganizationUnitPhysical_EnvironmentsUpdateConnectionInput>;
  where?: InputMaybe<OrganizationUnitPhysical_EnvironmentsConnectionWhere>;
};

export type OrganizationUnitRelationInput = {
  contacts?: InputMaybe<Array<OrganizationUnitContactsCreateFieldInput>>;
  parent_org_unit?: InputMaybe<
    Array<OrganizationUnitParent_Org_UnitCreateFieldInput>
  >;
  physical_environments?: InputMaybe<
    Array<OrganizationUnitPhysical_EnvironmentsCreateFieldInput>
  >;
  subnets?: InputMaybe<Array<OrganizationUnitSubnetsCreateFieldInput>>;
};

/**
 * Fields to sort OrganizationUnits by. The order in which sorts are applied is not
 * guaranteed when specifying many fields in one OrganizationUnitSort object.
 */
export type OrganizationUnitSort = {
  _id?: InputMaybe<SortDirection>;
  name?: InputMaybe<SortDirection>;
};

export type OrganizationUnitSubnetSubnetsAggregationSelection = {
  __typename?: 'OrganizationUnitSubnetSubnetsAggregationSelection';
  count: Scalars['Int']['output'];
  node?: Maybe<OrganizationUnitSubnetSubnetsNodeAggregateSelection>;
};

export type OrganizationUnitSubnetSubnetsNodeAggregateSelection = {
  __typename?: 'OrganizationUnitSubnetSubnetsNodeAggregateSelection';
  note: StringAggregateSelection;
  range: StringAggregateSelection;
};

export type OrganizationUnitSubnetsAggregateInput = {
  AND?: InputMaybe<Array<OrganizationUnitSubnetsAggregateInput>>;
  NOT?: InputMaybe<OrganizationUnitSubnetsAggregateInput>;
  OR?: InputMaybe<Array<OrganizationUnitSubnetsAggregateInput>>;
  count?: InputMaybe<Scalars['Int']['input']>;
  count_GT?: InputMaybe<Scalars['Int']['input']>;
  count_GTE?: InputMaybe<Scalars['Int']['input']>;
  count_LT?: InputMaybe<Scalars['Int']['input']>;
  count_LTE?: InputMaybe<Scalars['Int']['input']>;
  node?: InputMaybe<OrganizationUnitSubnetsNodeAggregationWhereInput>;
};

export type OrganizationUnitSubnetsConnectFieldInput = {
  connect?: InputMaybe<Array<SubnetConnectInput>>;
  /** Whether or not to overwrite any matching relationship with the new properties. */
  overwrite?: Scalars['Boolean']['input'];
  where?: InputMaybe<SubnetConnectWhere>;
};

export type OrganizationUnitSubnetsConnection = {
  __typename?: 'OrganizationUnitSubnetsConnection';
  edges: Array<OrganizationUnitSubnetsRelationship>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type OrganizationUnitSubnetsConnectionSort = {
  node?: InputMaybe<SubnetSort>;
};

export type OrganizationUnitSubnetsConnectionWhere = {
  AND?: InputMaybe<Array<OrganizationUnitSubnetsConnectionWhere>>;
  NOT?: InputMaybe<OrganizationUnitSubnetsConnectionWhere>;
  OR?: InputMaybe<Array<OrganizationUnitSubnetsConnectionWhere>>;
  node?: InputMaybe<SubnetWhere>;
};

export type OrganizationUnitSubnetsCreateFieldInput = {
  node: SubnetCreateInput;
};

export type OrganizationUnitSubnetsDeleteFieldInput = {
  delete?: InputMaybe<SubnetDeleteInput>;
  where?: InputMaybe<OrganizationUnitSubnetsConnectionWhere>;
};

export type OrganizationUnitSubnetsDisconnectFieldInput = {
  disconnect?: InputMaybe<SubnetDisconnectInput>;
  where?: InputMaybe<OrganizationUnitSubnetsConnectionWhere>;
};

export type OrganizationUnitSubnetsFieldInput = {
  connect?: InputMaybe<Array<OrganizationUnitSubnetsConnectFieldInput>>;
  create?: InputMaybe<Array<OrganizationUnitSubnetsCreateFieldInput>>;
};

export type OrganizationUnitSubnetsNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<OrganizationUnitSubnetsNodeAggregationWhereInput>>;
  NOT?: InputMaybe<OrganizationUnitSubnetsNodeAggregationWhereInput>;
  OR?: InputMaybe<Array<OrganizationUnitSubnetsNodeAggregationWhereInput>>;
  note_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  note_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  note_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  note_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  note_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  note_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  note_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  note_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  note_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  note_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  note_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  note_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  note_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  note_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  note_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  range_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  range_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  range_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  range_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  range_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  range_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  range_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  range_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  range_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  range_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  range_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  range_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  range_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  range_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  range_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
};

export type OrganizationUnitSubnetsRelationship = {
  __typename?: 'OrganizationUnitSubnetsRelationship';
  cursor: Scalars['String']['output'];
  node: Subnet;
};

export type OrganizationUnitSubnetsUpdateConnectionInput = {
  node?: InputMaybe<SubnetUpdateInput>;
};

export type OrganizationUnitSubnetsUpdateFieldInput = {
  connect?: InputMaybe<Array<OrganizationUnitSubnetsConnectFieldInput>>;
  create?: InputMaybe<Array<OrganizationUnitSubnetsCreateFieldInput>>;
  delete?: InputMaybe<Array<OrganizationUnitSubnetsDeleteFieldInput>>;
  disconnect?: InputMaybe<Array<OrganizationUnitSubnetsDisconnectFieldInput>>;
  update?: InputMaybe<OrganizationUnitSubnetsUpdateConnectionInput>;
  where?: InputMaybe<OrganizationUnitSubnetsConnectionWhere>;
};

export type OrganizationUnitUpdateInput = {
  contacts?: InputMaybe<Array<OrganizationUnitContactsUpdateFieldInput>>;
  name?: InputMaybe<Scalars['String']['input']>;
  parent_org_unit?: InputMaybe<
    Array<OrganizationUnitParent_Org_UnitUpdateFieldInput>
  >;
  physical_environments?: InputMaybe<
    Array<OrganizationUnitPhysical_EnvironmentsUpdateFieldInput>
  >;
  subnets?: InputMaybe<Array<OrganizationUnitSubnetsUpdateFieldInput>>;
};

export type OrganizationUnitWhere = {
  AND?: InputMaybe<Array<OrganizationUnitWhere>>;
  NOT?: InputMaybe<OrganizationUnitWhere>;
  OR?: InputMaybe<Array<OrganizationUnitWhere>>;
  _id?: InputMaybe<Scalars['ID']['input']>;
  _id_CONTAINS?: InputMaybe<Scalars['ID']['input']>;
  _id_ENDS_WITH?: InputMaybe<Scalars['ID']['input']>;
  _id_IN?: InputMaybe<Array<Scalars['ID']['input']>>;
  _id_STARTS_WITH?: InputMaybe<Scalars['ID']['input']>;
  contactsAggregate?: InputMaybe<OrganizationUnitContactsAggregateInput>;
  /** Return OrganizationUnits where all of the related OrganizationUnitContactsConnections match this filter */
  contactsConnection_ALL?: InputMaybe<OrganizationUnitContactsConnectionWhere>;
  /** Return OrganizationUnits where none of the related OrganizationUnitContactsConnections match this filter */
  contactsConnection_NONE?: InputMaybe<OrganizationUnitContactsConnectionWhere>;
  /** Return OrganizationUnits where one of the related OrganizationUnitContactsConnections match this filter */
  contactsConnection_SINGLE?: InputMaybe<OrganizationUnitContactsConnectionWhere>;
  /** Return OrganizationUnits where some of the related OrganizationUnitContactsConnections match this filter */
  contactsConnection_SOME?: InputMaybe<OrganizationUnitContactsConnectionWhere>;
  /** Return OrganizationUnits where all of the related Contacts match this filter */
  contacts_ALL?: InputMaybe<ContactWhere>;
  /** Return OrganizationUnits where none of the related Contacts match this filter */
  contacts_NONE?: InputMaybe<ContactWhere>;
  /** Return OrganizationUnits where one of the related Contacts match this filter */
  contacts_SINGLE?: InputMaybe<ContactWhere>;
  /** Return OrganizationUnits where some of the related Contacts match this filter */
  contacts_SOME?: InputMaybe<ContactWhere>;
  name?: InputMaybe<Scalars['String']['input']>;
  name_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  name_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  name_IN?: InputMaybe<Array<Scalars['String']['input']>>;
  name_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
  parent_org_unitAggregate?: InputMaybe<OrganizationUnitParent_Org_UnitAggregateInput>;
  /** Return OrganizationUnits where all of the related OrganizationUnitParent_org_unitConnections match this filter */
  parent_org_unitConnection_ALL?: InputMaybe<OrganizationUnitParent_Org_UnitConnectionWhere>;
  /** Return OrganizationUnits where none of the related OrganizationUnitParent_org_unitConnections match this filter */
  parent_org_unitConnection_NONE?: InputMaybe<OrganizationUnitParent_Org_UnitConnectionWhere>;
  /** Return OrganizationUnits where one of the related OrganizationUnitParent_org_unitConnections match this filter */
  parent_org_unitConnection_SINGLE?: InputMaybe<OrganizationUnitParent_Org_UnitConnectionWhere>;
  /** Return OrganizationUnits where some of the related OrganizationUnitParent_org_unitConnections match this filter */
  parent_org_unitConnection_SOME?: InputMaybe<OrganizationUnitParent_Org_UnitConnectionWhere>;
  /** Return OrganizationUnits where all of the related OrganizationUnits match this filter */
  parent_org_unit_ALL?: InputMaybe<OrganizationUnitWhere>;
  /** Return OrganizationUnits where none of the related OrganizationUnits match this filter */
  parent_org_unit_NONE?: InputMaybe<OrganizationUnitWhere>;
  /** Return OrganizationUnits where one of the related OrganizationUnits match this filter */
  parent_org_unit_SINGLE?: InputMaybe<OrganizationUnitWhere>;
  /** Return OrganizationUnits where some of the related OrganizationUnits match this filter */
  parent_org_unit_SOME?: InputMaybe<OrganizationUnitWhere>;
  physical_environmentsAggregate?: InputMaybe<OrganizationUnitPhysical_EnvironmentsAggregateInput>;
  /** Return OrganizationUnits where all of the related OrganizationUnitPhysical_environmentsConnections match this filter */
  physical_environmentsConnection_ALL?: InputMaybe<OrganizationUnitPhysical_EnvironmentsConnectionWhere>;
  /** Return OrganizationUnits where none of the related OrganizationUnitPhysical_environmentsConnections match this filter */
  physical_environmentsConnection_NONE?: InputMaybe<OrganizationUnitPhysical_EnvironmentsConnectionWhere>;
  /** Return OrganizationUnits where one of the related OrganizationUnitPhysical_environmentsConnections match this filter */
  physical_environmentsConnection_SINGLE?: InputMaybe<OrganizationUnitPhysical_EnvironmentsConnectionWhere>;
  /** Return OrganizationUnits where some of the related OrganizationUnitPhysical_environmentsConnections match this filter */
  physical_environmentsConnection_SOME?: InputMaybe<OrganizationUnitPhysical_EnvironmentsConnectionWhere>;
  /** Return OrganizationUnits where all of the related PhysicalEnvironments match this filter */
  physical_environments_ALL?: InputMaybe<PhysicalEnvironmentWhere>;
  /** Return OrganizationUnits where none of the related PhysicalEnvironments match this filter */
  physical_environments_NONE?: InputMaybe<PhysicalEnvironmentWhere>;
  /** Return OrganizationUnits where one of the related PhysicalEnvironments match this filter */
  physical_environments_SINGLE?: InputMaybe<PhysicalEnvironmentWhere>;
  /** Return OrganizationUnits where some of the related PhysicalEnvironments match this filter */
  physical_environments_SOME?: InputMaybe<PhysicalEnvironmentWhere>;
  subnetsAggregate?: InputMaybe<OrganizationUnitSubnetsAggregateInput>;
  /** Return OrganizationUnits where all of the related OrganizationUnitSubnetsConnections match this filter */
  subnetsConnection_ALL?: InputMaybe<OrganizationUnitSubnetsConnectionWhere>;
  /** Return OrganizationUnits where none of the related OrganizationUnitSubnetsConnections match this filter */
  subnetsConnection_NONE?: InputMaybe<OrganizationUnitSubnetsConnectionWhere>;
  /** Return OrganizationUnits where one of the related OrganizationUnitSubnetsConnections match this filter */
  subnetsConnection_SINGLE?: InputMaybe<OrganizationUnitSubnetsConnectionWhere>;
  /** Return OrganizationUnits where some of the related OrganizationUnitSubnetsConnections match this filter */
  subnetsConnection_SOME?: InputMaybe<OrganizationUnitSubnetsConnectionWhere>;
  /** Return OrganizationUnits where all of the related Subnets match this filter */
  subnets_ALL?: InputMaybe<SubnetWhere>;
  /** Return OrganizationUnits where none of the related Subnets match this filter */
  subnets_NONE?: InputMaybe<SubnetWhere>;
  /** Return OrganizationUnits where one of the related Subnets match this filter */
  subnets_SINGLE?: InputMaybe<SubnetWhere>;
  /** Return OrganizationUnits where some of the related Subnets match this filter */
  subnets_SOME?: InputMaybe<SubnetWhere>;
};

export type OrganizationUnitsConnection = {
  __typename?: 'OrganizationUnitsConnection';
  edges: Array<OrganizationUnitEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

/** Pagination information (Relay) */
export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor?: Maybe<Scalars['String']['output']>;
  hasNextPage: Scalars['Boolean']['output'];
  hasPreviousPage: Scalars['Boolean']['output'];
  startCursor?: Maybe<Scalars['String']['output']>;
};

export type PhysicalEnvironment = {
  __typename?: 'PhysicalEnvironment';
  _id: Scalars['ID']['output'];
  location: Scalars['String']['output'];
  org_units: Array<OrganizationUnit>;
  org_unitsAggregate?: Maybe<PhysicalEnvironmentOrganizationUnitOrg_UnitsAggregationSelection>;
  org_unitsConnection: PhysicalEnvironmentOrg_UnitsConnection;
};

export type PhysicalEnvironmentOrg_UnitsArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  options?: InputMaybe<OrganizationUnitOptions>;
  where?: InputMaybe<OrganizationUnitWhere>;
};

export type PhysicalEnvironmentOrg_UnitsAggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<OrganizationUnitWhere>;
};

export type PhysicalEnvironmentOrg_UnitsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<PhysicalEnvironmentOrg_UnitsConnectionSort>>;
  where?: InputMaybe<PhysicalEnvironmentOrg_UnitsConnectionWhere>;
};

export type PhysicalEnvironmentAggregateSelection = {
  __typename?: 'PhysicalEnvironmentAggregateSelection';
  count: Scalars['Int']['output'];
  location: StringAggregateSelection;
};

export type PhysicalEnvironmentConnectInput = {
  org_units?: InputMaybe<Array<PhysicalEnvironmentOrg_UnitsConnectFieldInput>>;
};

export type PhysicalEnvironmentConnectWhere = {
  node: PhysicalEnvironmentWhere;
};

export type PhysicalEnvironmentCreateInput = {
  location: Scalars['String']['input'];
  org_units?: InputMaybe<PhysicalEnvironmentOrg_UnitsFieldInput>;
};

export type PhysicalEnvironmentDeleteInput = {
  org_units?: InputMaybe<Array<PhysicalEnvironmentOrg_UnitsDeleteFieldInput>>;
};

export type PhysicalEnvironmentDisconnectInput = {
  org_units?: InputMaybe<
    Array<PhysicalEnvironmentOrg_UnitsDisconnectFieldInput>
  >;
};

export type PhysicalEnvironmentEdge = {
  __typename?: 'PhysicalEnvironmentEdge';
  cursor: Scalars['String']['output'];
  node: PhysicalEnvironment;
};

export type PhysicalEnvironmentOptions = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  /**
   * Specify one or more PhysicalEnvironmentSort objects to sort
   * PhysicalEnvironments by. The sorts will be applied in the order in which they
   * are arranged in the array.
   */
  sort?: InputMaybe<Array<PhysicalEnvironmentSort>>;
};

export type PhysicalEnvironmentOrg_UnitsAggregateInput = {
  AND?: InputMaybe<Array<PhysicalEnvironmentOrg_UnitsAggregateInput>>;
  NOT?: InputMaybe<PhysicalEnvironmentOrg_UnitsAggregateInput>;
  OR?: InputMaybe<Array<PhysicalEnvironmentOrg_UnitsAggregateInput>>;
  count?: InputMaybe<Scalars['Int']['input']>;
  count_GT?: InputMaybe<Scalars['Int']['input']>;
  count_GTE?: InputMaybe<Scalars['Int']['input']>;
  count_LT?: InputMaybe<Scalars['Int']['input']>;
  count_LTE?: InputMaybe<Scalars['Int']['input']>;
  node?: InputMaybe<PhysicalEnvironmentOrg_UnitsNodeAggregationWhereInput>;
};

export type PhysicalEnvironmentOrg_UnitsConnectFieldInput = {
  connect?: InputMaybe<Array<OrganizationUnitConnectInput>>;
  /** Whether or not to overwrite any matching relationship with the new properties. */
  overwrite?: Scalars['Boolean']['input'];
  where?: InputMaybe<OrganizationUnitConnectWhere>;
};

export type PhysicalEnvironmentOrg_UnitsConnection = {
  __typename?: 'PhysicalEnvironmentOrg_unitsConnection';
  edges: Array<PhysicalEnvironmentOrg_UnitsRelationship>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type PhysicalEnvironmentOrg_UnitsConnectionSort = {
  node?: InputMaybe<OrganizationUnitSort>;
};

export type PhysicalEnvironmentOrg_UnitsConnectionWhere = {
  AND?: InputMaybe<Array<PhysicalEnvironmentOrg_UnitsConnectionWhere>>;
  NOT?: InputMaybe<PhysicalEnvironmentOrg_UnitsConnectionWhere>;
  OR?: InputMaybe<Array<PhysicalEnvironmentOrg_UnitsConnectionWhere>>;
  node?: InputMaybe<OrganizationUnitWhere>;
};

export type PhysicalEnvironmentOrg_UnitsCreateFieldInput = {
  node: OrganizationUnitCreateInput;
};

export type PhysicalEnvironmentOrg_UnitsDeleteFieldInput = {
  delete?: InputMaybe<OrganizationUnitDeleteInput>;
  where?: InputMaybe<PhysicalEnvironmentOrg_UnitsConnectionWhere>;
};

export type PhysicalEnvironmentOrg_UnitsDisconnectFieldInput = {
  disconnect?: InputMaybe<OrganizationUnitDisconnectInput>;
  where?: InputMaybe<PhysicalEnvironmentOrg_UnitsConnectionWhere>;
};

export type PhysicalEnvironmentOrg_UnitsFieldInput = {
  connect?: InputMaybe<Array<PhysicalEnvironmentOrg_UnitsConnectFieldInput>>;
  create?: InputMaybe<Array<PhysicalEnvironmentOrg_UnitsCreateFieldInput>>;
};

export type PhysicalEnvironmentOrg_UnitsNodeAggregationWhereInput = {
  AND?: InputMaybe<
    Array<PhysicalEnvironmentOrg_UnitsNodeAggregationWhereInput>
  >;
  NOT?: InputMaybe<PhysicalEnvironmentOrg_UnitsNodeAggregationWhereInput>;
  OR?: InputMaybe<Array<PhysicalEnvironmentOrg_UnitsNodeAggregationWhereInput>>;
  name_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
};

export type PhysicalEnvironmentOrg_UnitsRelationship = {
  __typename?: 'PhysicalEnvironmentOrg_unitsRelationship';
  cursor: Scalars['String']['output'];
  node: OrganizationUnit;
};

export type PhysicalEnvironmentOrg_UnitsUpdateConnectionInput = {
  node?: InputMaybe<OrganizationUnitUpdateInput>;
};

export type PhysicalEnvironmentOrg_UnitsUpdateFieldInput = {
  connect?: InputMaybe<Array<PhysicalEnvironmentOrg_UnitsConnectFieldInput>>;
  create?: InputMaybe<Array<PhysicalEnvironmentOrg_UnitsCreateFieldInput>>;
  delete?: InputMaybe<Array<PhysicalEnvironmentOrg_UnitsDeleteFieldInput>>;
  disconnect?: InputMaybe<
    Array<PhysicalEnvironmentOrg_UnitsDisconnectFieldInput>
  >;
  update?: InputMaybe<PhysicalEnvironmentOrg_UnitsUpdateConnectionInput>;
  where?: InputMaybe<PhysicalEnvironmentOrg_UnitsConnectionWhere>;
};

export type PhysicalEnvironmentOrganizationUnitOrg_UnitsAggregationSelection = {
  __typename?: 'PhysicalEnvironmentOrganizationUnitOrg_unitsAggregationSelection';
  count: Scalars['Int']['output'];
  node?: Maybe<PhysicalEnvironmentOrganizationUnitOrg_UnitsNodeAggregateSelection>;
};

export type PhysicalEnvironmentOrganizationUnitOrg_UnitsNodeAggregateSelection =
  {
    __typename?: 'PhysicalEnvironmentOrganizationUnitOrg_unitsNodeAggregateSelection';
    name: StringAggregateSelection;
  };

export type PhysicalEnvironmentRelationInput = {
  org_units?: InputMaybe<Array<PhysicalEnvironmentOrg_UnitsCreateFieldInput>>;
};

/**
 * Fields to sort PhysicalEnvironments by. The order in which sorts are applied is
 * not guaranteed when specifying many fields in one PhysicalEnvironmentSort object.
 */
export type PhysicalEnvironmentSort = {
  _id?: InputMaybe<SortDirection>;
  location?: InputMaybe<SortDirection>;
};

export type PhysicalEnvironmentUpdateInput = {
  location?: InputMaybe<Scalars['String']['input']>;
  org_units?: InputMaybe<Array<PhysicalEnvironmentOrg_UnitsUpdateFieldInput>>;
};

export type PhysicalEnvironmentWhere = {
  AND?: InputMaybe<Array<PhysicalEnvironmentWhere>>;
  NOT?: InputMaybe<PhysicalEnvironmentWhere>;
  OR?: InputMaybe<Array<PhysicalEnvironmentWhere>>;
  _id?: InputMaybe<Scalars['ID']['input']>;
  _id_CONTAINS?: InputMaybe<Scalars['ID']['input']>;
  _id_ENDS_WITH?: InputMaybe<Scalars['ID']['input']>;
  _id_IN?: InputMaybe<Array<Scalars['ID']['input']>>;
  _id_STARTS_WITH?: InputMaybe<Scalars['ID']['input']>;
  location?: InputMaybe<Scalars['String']['input']>;
  location_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  location_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  location_IN?: InputMaybe<Array<Scalars['String']['input']>>;
  location_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
  org_unitsAggregate?: InputMaybe<PhysicalEnvironmentOrg_UnitsAggregateInput>;
  /** Return PhysicalEnvironments where all of the related PhysicalEnvironmentOrg_unitsConnections match this filter */
  org_unitsConnection_ALL?: InputMaybe<PhysicalEnvironmentOrg_UnitsConnectionWhere>;
  /** Return PhysicalEnvironments where none of the related PhysicalEnvironmentOrg_unitsConnections match this filter */
  org_unitsConnection_NONE?: InputMaybe<PhysicalEnvironmentOrg_UnitsConnectionWhere>;
  /** Return PhysicalEnvironments where one of the related PhysicalEnvironmentOrg_unitsConnections match this filter */
  org_unitsConnection_SINGLE?: InputMaybe<PhysicalEnvironmentOrg_UnitsConnectionWhere>;
  /** Return PhysicalEnvironments where some of the related PhysicalEnvironmentOrg_unitsConnections match this filter */
  org_unitsConnection_SOME?: InputMaybe<PhysicalEnvironmentOrg_UnitsConnectionWhere>;
  /** Return PhysicalEnvironments where all of the related OrganizationUnits match this filter */
  org_units_ALL?: InputMaybe<OrganizationUnitWhere>;
  /** Return PhysicalEnvironments where none of the related OrganizationUnits match this filter */
  org_units_NONE?: InputMaybe<OrganizationUnitWhere>;
  /** Return PhysicalEnvironments where one of the related OrganizationUnits match this filter */
  org_units_SINGLE?: InputMaybe<OrganizationUnitWhere>;
  /** Return PhysicalEnvironments where some of the related OrganizationUnits match this filter */
  org_units_SOME?: InputMaybe<OrganizationUnitWhere>;
};

export type PhysicalEnvironmentsConnection = {
  __typename?: 'PhysicalEnvironmentsConnection';
  edges: Array<PhysicalEnvironmentEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type Query = {
  __typename?: 'Query';
  applications: Array<Application>;
  applicationsAggregate: ApplicationAggregateSelection;
  applicationsConnection: ApplicationsConnection;
  components: Array<Component>;
  componentsAggregate: ComponentAggregateSelection;
  componentsConnection: ComponentsConnection;
  contacts: Array<Contact>;
  contactsAggregate: ContactAggregateSelection;
  contactsConnection: ContactsConnection;
  cves: Array<Cve>;
  cvesAggregate: CveAggregateSelection;
  cvesConnection: CvesConnection;
  cvsSv2s: Array<CvsSv2>;
  cvsSv2sAggregate: CvsSv2AggregateSelection;
  cvsSv2sConnection: CvsSv2sConnection;
  cvsSv30s: Array<CvsSv30>;
  cvsSv30sAggregate: CvsSv30AggregateSelection;
  cvsSv30sConnection: CvsSv30sConnection;
  cvsSv31s: Array<CvsSv31>;
  cvsSv31sAggregate: CvsSv31AggregateSelection;
  cvsSv31sConnection: CvsSv31sConnection;
  cvsSv40s: Array<CvsSv40>;
  cvsSv40sAggregate: CvsSv40AggregateSelection;
  cvsSv40sConnection: CvsSv40sConnection;
  devices: Array<Device>;
  devicesAggregate: DeviceAggregateSelection;
  devicesConnection: DevicesConnection;
  domainNames: Array<DomainName>;
  domainNamesAggregate: DomainNameAggregateSelection;
  domainNamesConnection: DomainNamesConnection;
  hardwareVersions: Array<HardwareVersion>;
  hardwareVersionsAggregate: HardwareVersionAggregateSelection;
  hardwareVersionsConnection: HardwareVersionsConnection;
  hosts: Array<Host>;
  hostsAggregate: HostAggregateSelection;
  hostsConnection: HostsConnection;
  ips: Array<Ip>;
  ipsAggregate: IpAggregateSelection;
  ipsConnection: IpsConnection;
  missionDependencies: Array<MissionDependency>;
  missionDependenciesAggregate: MissionDependencyAggregateSelection;
  missionDependenciesConnection: MissionDependenciesConnection;
  missions: Array<Mission>;
  missionsAggregate: MissionAggregateSelection;
  missionsConnection: MissionsConnection;
  networkServices: Array<NetworkService>;
  networkServicesAggregate: NetworkServiceAggregateSelection;
  networkServicesConnection: NetworkServicesConnection;
  nodeObjects: Array<NodeObject>;
  nodeObjectsAggregate: NodeObjectAggregateSelection;
  nodeObjectsConnection: NodeObjectsConnection;
  organizationUnits: Array<OrganizationUnit>;
  organizationUnitsAggregate: OrganizationUnitAggregateSelection;
  organizationUnitsConnection: OrganizationUnitsConnection;
  physicalEnvironments: Array<PhysicalEnvironment>;
  physicalEnvironmentsAggregate: PhysicalEnvironmentAggregateSelection;
  physicalEnvironmentsConnection: PhysicalEnvironmentsConnection;
  softwareVersions: Array<SoftwareVersion>;
  softwareVersionsAggregate: SoftwareVersionAggregateSelection;
  softwareVersionsConnection: SoftwareVersionsConnection;
  subnets: Array<Subnet>;
  subnetsAggregate: SubnetAggregateSelection;
  subnetsConnection: SubnetsConnection;
  uris: Array<Uri>;
  urisAggregate: UriAggregateSelection;
  urisConnection: UrisConnection;
  vulnerabilities: Array<Vulnerability>;
  vulnerabilitiesAggregate: VulnerabilityAggregateSelection;
  vulnerabilitiesConnection: VulnerabilitiesConnection;
};

export type QueryApplicationsArgs = {
  options?: InputMaybe<ApplicationOptions>;
  where?: InputMaybe<ApplicationWhere>;
};

export type QueryApplicationsAggregateArgs = {
  where?: InputMaybe<ApplicationWhere>;
};

export type QueryApplicationsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<InputMaybe<ApplicationSort>>>;
  where?: InputMaybe<ApplicationWhere>;
};

export type QueryComponentsArgs = {
  options?: InputMaybe<ComponentOptions>;
  where?: InputMaybe<ComponentWhere>;
};

export type QueryComponentsAggregateArgs = {
  where?: InputMaybe<ComponentWhere>;
};

export type QueryComponentsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<InputMaybe<ComponentSort>>>;
  where?: InputMaybe<ComponentWhere>;
};

export type QueryContactsArgs = {
  options?: InputMaybe<ContactOptions>;
  where?: InputMaybe<ContactWhere>;
};

export type QueryContactsAggregateArgs = {
  where?: InputMaybe<ContactWhere>;
};

export type QueryContactsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<InputMaybe<ContactSort>>>;
  where?: InputMaybe<ContactWhere>;
};

export type QueryCvesArgs = {
  options?: InputMaybe<CveOptions>;
  where?: InputMaybe<CveWhere>;
};

export type QueryCvesAggregateArgs = {
  where?: InputMaybe<CveWhere>;
};

export type QueryCvesConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<InputMaybe<CveSort>>>;
  where?: InputMaybe<CveWhere>;
};

export type QueryCvsSv2sArgs = {
  options?: InputMaybe<CvsSv2Options>;
  where?: InputMaybe<CvsSv2Where>;
};

export type QueryCvsSv2sAggregateArgs = {
  where?: InputMaybe<CvsSv2Where>;
};

export type QueryCvsSv2sConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<InputMaybe<CvsSv2Sort>>>;
  where?: InputMaybe<CvsSv2Where>;
};

export type QueryCvsSv30sArgs = {
  options?: InputMaybe<CvsSv30Options>;
  where?: InputMaybe<CvsSv30Where>;
};

export type QueryCvsSv30sAggregateArgs = {
  where?: InputMaybe<CvsSv30Where>;
};

export type QueryCvsSv30sConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<InputMaybe<CvsSv30Sort>>>;
  where?: InputMaybe<CvsSv30Where>;
};

export type QueryCvsSv31sArgs = {
  options?: InputMaybe<CvsSv31Options>;
  where?: InputMaybe<CvsSv31Where>;
};

export type QueryCvsSv31sAggregateArgs = {
  where?: InputMaybe<CvsSv31Where>;
};

export type QueryCvsSv31sConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<InputMaybe<CvsSv31Sort>>>;
  where?: InputMaybe<CvsSv31Where>;
};

export type QueryCvsSv40sArgs = {
  options?: InputMaybe<CvsSv40Options>;
  where?: InputMaybe<CvsSv40Where>;
};

export type QueryCvsSv40sAggregateArgs = {
  where?: InputMaybe<CvsSv40Where>;
};

export type QueryCvsSv40sConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<InputMaybe<CvsSv40Sort>>>;
  where?: InputMaybe<CvsSv40Where>;
};

export type QueryDevicesArgs = {
  options?: InputMaybe<DeviceOptions>;
  where?: InputMaybe<DeviceWhere>;
};

export type QueryDevicesAggregateArgs = {
  where?: InputMaybe<DeviceWhere>;
};

export type QueryDevicesConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<InputMaybe<DeviceSort>>>;
  where?: InputMaybe<DeviceWhere>;
};

export type QueryDomainNamesArgs = {
  options?: InputMaybe<DomainNameOptions>;
  where?: InputMaybe<DomainNameWhere>;
};

export type QueryDomainNamesAggregateArgs = {
  where?: InputMaybe<DomainNameWhere>;
};

export type QueryDomainNamesConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<InputMaybe<DomainNameSort>>>;
  where?: InputMaybe<DomainNameWhere>;
};

export type QueryHardwareVersionsArgs = {
  options?: InputMaybe<HardwareVersionOptions>;
  where?: InputMaybe<HardwareVersionWhere>;
};

export type QueryHardwareVersionsAggregateArgs = {
  where?: InputMaybe<HardwareVersionWhere>;
};

export type QueryHardwareVersionsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<InputMaybe<HardwareVersionSort>>>;
  where?: InputMaybe<HardwareVersionWhere>;
};

export type QueryHostsArgs = {
  options?: InputMaybe<HostOptions>;
  where?: InputMaybe<HostWhere>;
};

export type QueryHostsAggregateArgs = {
  where?: InputMaybe<HostWhere>;
};

export type QueryHostsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<InputMaybe<HostSort>>>;
  where?: InputMaybe<HostWhere>;
};

export type QueryIpsArgs = {
  options?: InputMaybe<IpOptions>;
  where?: InputMaybe<IpWhere>;
};

export type QueryIpsAggregateArgs = {
  where?: InputMaybe<IpWhere>;
};

export type QueryIpsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<InputMaybe<IpSort>>>;
  where?: InputMaybe<IpWhere>;
};

export type QueryMissionDependenciesArgs = {
  options?: InputMaybe<MissionDependencyOptions>;
  where?: InputMaybe<MissionDependencyWhere>;
};

export type QueryMissionDependenciesAggregateArgs = {
  where?: InputMaybe<MissionDependencyWhere>;
};

export type QueryMissionDependenciesConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<InputMaybe<MissionDependencySort>>>;
  where?: InputMaybe<MissionDependencyWhere>;
};

export type QueryMissionsArgs = {
  options?: InputMaybe<MissionOptions>;
  where?: InputMaybe<MissionWhere>;
};

export type QueryMissionsAggregateArgs = {
  where?: InputMaybe<MissionWhere>;
};

export type QueryMissionsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<InputMaybe<MissionSort>>>;
  where?: InputMaybe<MissionWhere>;
};

export type QueryNetworkServicesArgs = {
  options?: InputMaybe<NetworkServiceOptions>;
  where?: InputMaybe<NetworkServiceWhere>;
};

export type QueryNetworkServicesAggregateArgs = {
  where?: InputMaybe<NetworkServiceWhere>;
};

export type QueryNetworkServicesConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<InputMaybe<NetworkServiceSort>>>;
  where?: InputMaybe<NetworkServiceWhere>;
};

export type QueryNodeObjectsArgs = {
  options?: InputMaybe<NodeObjectOptions>;
  where?: InputMaybe<NodeObjectWhere>;
};

export type QueryNodeObjectsAggregateArgs = {
  where?: InputMaybe<NodeObjectWhere>;
};

export type QueryNodeObjectsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<InputMaybe<NodeObjectSort>>>;
  where?: InputMaybe<NodeObjectWhere>;
};

export type QueryOrganizationUnitsArgs = {
  options?: InputMaybe<OrganizationUnitOptions>;
  where?: InputMaybe<OrganizationUnitWhere>;
};

export type QueryOrganizationUnitsAggregateArgs = {
  where?: InputMaybe<OrganizationUnitWhere>;
};

export type QueryOrganizationUnitsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<InputMaybe<OrganizationUnitSort>>>;
  where?: InputMaybe<OrganizationUnitWhere>;
};

export type QueryPhysicalEnvironmentsArgs = {
  options?: InputMaybe<PhysicalEnvironmentOptions>;
  where?: InputMaybe<PhysicalEnvironmentWhere>;
};

export type QueryPhysicalEnvironmentsAggregateArgs = {
  where?: InputMaybe<PhysicalEnvironmentWhere>;
};

export type QueryPhysicalEnvironmentsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<InputMaybe<PhysicalEnvironmentSort>>>;
  where?: InputMaybe<PhysicalEnvironmentWhere>;
};

export type QuerySoftwareVersionsArgs = {
  options?: InputMaybe<SoftwareVersionOptions>;
  where?: InputMaybe<SoftwareVersionWhere>;
};

export type QuerySoftwareVersionsAggregateArgs = {
  where?: InputMaybe<SoftwareVersionWhere>;
};

export type QuerySoftwareVersionsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<InputMaybe<SoftwareVersionSort>>>;
  where?: InputMaybe<SoftwareVersionWhere>;
};

export type QuerySubnetsArgs = {
  options?: InputMaybe<SubnetOptions>;
  where?: InputMaybe<SubnetWhere>;
};

export type QuerySubnetsAggregateArgs = {
  where?: InputMaybe<SubnetWhere>;
};

export type QuerySubnetsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<InputMaybe<SubnetSort>>>;
  where?: InputMaybe<SubnetWhere>;
};

export type QueryUrisArgs = {
  options?: InputMaybe<UriOptions>;
  where?: InputMaybe<UriWhere>;
};

export type QueryUrisAggregateArgs = {
  where?: InputMaybe<UriWhere>;
};

export type QueryUrisConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<InputMaybe<UriSort>>>;
  where?: InputMaybe<UriWhere>;
};

export type QueryVulnerabilitiesArgs = {
  options?: InputMaybe<VulnerabilityOptions>;
  where?: InputMaybe<VulnerabilityWhere>;
};

export type QueryVulnerabilitiesAggregateArgs = {
  where?: InputMaybe<VulnerabilityWhere>;
};

export type QueryVulnerabilitiesConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<InputMaybe<VulnerabilitySort>>>;
  where?: InputMaybe<VulnerabilityWhere>;
};

/**
 * The edge properties for the following fields:
 * * IP.domain_names
 */
export type ResolvesTo = {
  __typename?: 'ResolvesTo';
  end?: Maybe<Scalars['String']['output']>;
  start?: Maybe<Scalars['String']['output']>;
};

export type ResolvesToAggregationWhereInput = {
  AND?: InputMaybe<Array<ResolvesToAggregationWhereInput>>;
  NOT?: InputMaybe<ResolvesToAggregationWhereInput>;
  OR?: InputMaybe<Array<ResolvesToAggregationWhereInput>>;
  end_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  end_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  end_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  end_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  end_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  end_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  end_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  end_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  end_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  end_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  end_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  end_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  end_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  end_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  end_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  start_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  start_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  start_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  start_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  start_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  start_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  start_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  start_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  start_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  start_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  start_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  start_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  start_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  start_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  start_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
};

export type ResolvesToCreateInput = {
  end?: InputMaybe<Scalars['String']['input']>;
  start?: InputMaybe<Scalars['String']['input']>;
};

export type ResolvesToSort = {
  end?: InputMaybe<SortDirection>;
  start?: InputMaybe<SortDirection>;
};

export type ResolvesToUpdateInput = {
  end?: InputMaybe<Scalars['String']['input']>;
  start?: InputMaybe<Scalars['String']['input']>;
};

export type ResolvesToWhere = {
  AND?: InputMaybe<Array<ResolvesToWhere>>;
  NOT?: InputMaybe<ResolvesToWhere>;
  OR?: InputMaybe<Array<ResolvesToWhere>>;
  end?: InputMaybe<Scalars['String']['input']>;
  end_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  end_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  end_IN?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  end_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
  start?: InputMaybe<Scalars['String']['input']>;
  start_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  start_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  start_IN?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  start_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
};

/**
 * The edge properties for the following fields:
 * * SoftwareVersion.hosts
 */
export type SoftwareOn = {
  __typename?: 'SoftwareOn';
  end?: Maybe<Scalars['String']['output']>;
  start?: Maybe<Scalars['String']['output']>;
};

export type SoftwareOnAggregationWhereInput = {
  AND?: InputMaybe<Array<SoftwareOnAggregationWhereInput>>;
  NOT?: InputMaybe<SoftwareOnAggregationWhereInput>;
  OR?: InputMaybe<Array<SoftwareOnAggregationWhereInput>>;
  end_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  end_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  end_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  end_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  end_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  end_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  end_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  end_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  end_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  end_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  end_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  end_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  end_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  end_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  end_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  start_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  start_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  start_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  start_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  start_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  start_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  start_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  start_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  start_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  start_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  start_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  start_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  start_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  start_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  start_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
};

export type SoftwareOnCreateInput = {
  end?: InputMaybe<Scalars['String']['input']>;
  start?: InputMaybe<Scalars['String']['input']>;
};

export type SoftwareOnSort = {
  end?: InputMaybe<SortDirection>;
  start?: InputMaybe<SortDirection>;
};

export type SoftwareOnUpdateInput = {
  end?: InputMaybe<Scalars['String']['input']>;
  start?: InputMaybe<Scalars['String']['input']>;
};

export type SoftwareOnWhere = {
  AND?: InputMaybe<Array<SoftwareOnWhere>>;
  NOT?: InputMaybe<SoftwareOnWhere>;
  OR?: InputMaybe<Array<SoftwareOnWhere>>;
  end?: InputMaybe<Scalars['String']['input']>;
  end_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  end_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  end_IN?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  end_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
  start?: InputMaybe<Scalars['String']['input']>;
  start_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  start_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  start_IN?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  start_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
};

export type SoftwareVersion = {
  __typename?: 'SoftwareVersion';
  _id: Scalars['ID']['output'];
  hosts: Array<Host>;
  hostsAggregate?: Maybe<SoftwareVersionHostHostsAggregationSelection>;
  hostsConnection: SoftwareVersionHostsConnection;
  network_services: Array<NetworkService>;
  network_servicesAggregate?: Maybe<SoftwareVersionNetworkServiceNetwork_ServicesAggregationSelection>;
  network_servicesConnection: SoftwareVersionNetwork_ServicesConnection;
  version: Scalars['String']['output'];
  vulnerabilities: Array<Vulnerability>;
  vulnerabilitiesAggregate?: Maybe<SoftwareVersionVulnerabilityVulnerabilitiesAggregationSelection>;
  vulnerabilitiesConnection: SoftwareVersionVulnerabilitiesConnection;
};

export type SoftwareVersionHostsArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  options?: InputMaybe<HostOptions>;
  where?: InputMaybe<HostWhere>;
};

export type SoftwareVersionHostsAggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<HostWhere>;
};

export type SoftwareVersionHostsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<SoftwareVersionHostsConnectionSort>>;
  where?: InputMaybe<SoftwareVersionHostsConnectionWhere>;
};

export type SoftwareVersionNetwork_ServicesArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  options?: InputMaybe<NetworkServiceOptions>;
  where?: InputMaybe<NetworkServiceWhere>;
};

export type SoftwareVersionNetwork_ServicesAggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<NetworkServiceWhere>;
};

export type SoftwareVersionNetwork_ServicesConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<SoftwareVersionNetwork_ServicesConnectionSort>>;
  where?: InputMaybe<SoftwareVersionNetwork_ServicesConnectionWhere>;
};

export type SoftwareVersionVulnerabilitiesArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  options?: InputMaybe<VulnerabilityOptions>;
  where?: InputMaybe<VulnerabilityWhere>;
};

export type SoftwareVersionVulnerabilitiesAggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<VulnerabilityWhere>;
};

export type SoftwareVersionVulnerabilitiesConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<SoftwareVersionVulnerabilitiesConnectionSort>>;
  where?: InputMaybe<SoftwareVersionVulnerabilitiesConnectionWhere>;
};

export type SoftwareVersionAggregateSelection = {
  __typename?: 'SoftwareVersionAggregateSelection';
  count: Scalars['Int']['output'];
  version: StringAggregateSelection;
};

export type SoftwareVersionConnectInput = {
  hosts?: InputMaybe<Array<SoftwareVersionHostsConnectFieldInput>>;
  network_services?: InputMaybe<
    Array<SoftwareVersionNetwork_ServicesConnectFieldInput>
  >;
  vulnerabilities?: InputMaybe<
    Array<SoftwareVersionVulnerabilitiesConnectFieldInput>
  >;
};

export type SoftwareVersionConnectWhere = {
  node: SoftwareVersionWhere;
};

export type SoftwareVersionCreateInput = {
  hosts?: InputMaybe<SoftwareVersionHostsFieldInput>;
  network_services?: InputMaybe<SoftwareVersionNetwork_ServicesFieldInput>;
  version: Scalars['String']['input'];
  vulnerabilities?: InputMaybe<SoftwareVersionVulnerabilitiesFieldInput>;
};

export type SoftwareVersionDeleteInput = {
  hosts?: InputMaybe<Array<SoftwareVersionHostsDeleteFieldInput>>;
  network_services?: InputMaybe<
    Array<SoftwareVersionNetwork_ServicesDeleteFieldInput>
  >;
  vulnerabilities?: InputMaybe<
    Array<SoftwareVersionVulnerabilitiesDeleteFieldInput>
  >;
};

export type SoftwareVersionDisconnectInput = {
  hosts?: InputMaybe<Array<SoftwareVersionHostsDisconnectFieldInput>>;
  network_services?: InputMaybe<
    Array<SoftwareVersionNetwork_ServicesDisconnectFieldInput>
  >;
  vulnerabilities?: InputMaybe<
    Array<SoftwareVersionVulnerabilitiesDisconnectFieldInput>
  >;
};

export type SoftwareVersionEdge = {
  __typename?: 'SoftwareVersionEdge';
  cursor: Scalars['String']['output'];
  node: SoftwareVersion;
};

export type SoftwareVersionHostHostsAggregationSelection = {
  __typename?: 'SoftwareVersionHostHostsAggregationSelection';
  count: Scalars['Int']['output'];
  edge?: Maybe<SoftwareVersionHostHostsEdgeAggregateSelection>;
  node?: Maybe<SoftwareVersionHostHostsNodeAggregateSelection>;
};

export type SoftwareVersionHostHostsEdgeAggregateSelection = {
  __typename?: 'SoftwareVersionHostHostsEdgeAggregateSelection';
  end: StringAggregateSelection;
  start: StringAggregateSelection;
};

export type SoftwareVersionHostHostsNodeAggregateSelection = {
  __typename?: 'SoftwareVersionHostHostsNodeAggregateSelection';
  hostname: StringAggregateSelection;
};

export type SoftwareVersionHostsAggregateInput = {
  AND?: InputMaybe<Array<SoftwareVersionHostsAggregateInput>>;
  NOT?: InputMaybe<SoftwareVersionHostsAggregateInput>;
  OR?: InputMaybe<Array<SoftwareVersionHostsAggregateInput>>;
  count?: InputMaybe<Scalars['Int']['input']>;
  count_GT?: InputMaybe<Scalars['Int']['input']>;
  count_GTE?: InputMaybe<Scalars['Int']['input']>;
  count_LT?: InputMaybe<Scalars['Int']['input']>;
  count_LTE?: InputMaybe<Scalars['Int']['input']>;
  edge?: InputMaybe<SoftwareOnAggregationWhereInput>;
  node?: InputMaybe<SoftwareVersionHostsNodeAggregationWhereInput>;
};

export type SoftwareVersionHostsConnectFieldInput = {
  connect?: InputMaybe<Array<HostConnectInput>>;
  edge?: InputMaybe<SoftwareOnCreateInput>;
  /** Whether or not to overwrite any matching relationship with the new properties. */
  overwrite?: Scalars['Boolean']['input'];
  where?: InputMaybe<HostConnectWhere>;
};

export type SoftwareVersionHostsConnection = {
  __typename?: 'SoftwareVersionHostsConnection';
  edges: Array<SoftwareVersionHostsRelationship>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type SoftwareVersionHostsConnectionSort = {
  edge?: InputMaybe<SoftwareOnSort>;
  node?: InputMaybe<HostSort>;
};

export type SoftwareVersionHostsConnectionWhere = {
  AND?: InputMaybe<Array<SoftwareVersionHostsConnectionWhere>>;
  NOT?: InputMaybe<SoftwareVersionHostsConnectionWhere>;
  OR?: InputMaybe<Array<SoftwareVersionHostsConnectionWhere>>;
  edge?: InputMaybe<SoftwareOnWhere>;
  node?: InputMaybe<HostWhere>;
};

export type SoftwareVersionHostsCreateFieldInput = {
  edge?: InputMaybe<SoftwareOnCreateInput>;
  node: HostCreateInput;
};

export type SoftwareVersionHostsDeleteFieldInput = {
  delete?: InputMaybe<HostDeleteInput>;
  where?: InputMaybe<SoftwareVersionHostsConnectionWhere>;
};

export type SoftwareVersionHostsDisconnectFieldInput = {
  disconnect?: InputMaybe<HostDisconnectInput>;
  where?: InputMaybe<SoftwareVersionHostsConnectionWhere>;
};

export type SoftwareVersionHostsFieldInput = {
  connect?: InputMaybe<Array<SoftwareVersionHostsConnectFieldInput>>;
  create?: InputMaybe<Array<SoftwareVersionHostsCreateFieldInput>>;
};

export type SoftwareVersionHostsNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<SoftwareVersionHostsNodeAggregationWhereInput>>;
  NOT?: InputMaybe<SoftwareVersionHostsNodeAggregationWhereInput>;
  OR?: InputMaybe<Array<SoftwareVersionHostsNodeAggregationWhereInput>>;
  hostname_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  hostname_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  hostname_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  hostname_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  hostname_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  hostname_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  hostname_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  hostname_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  hostname_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  hostname_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  hostname_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  hostname_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  hostname_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  hostname_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  hostname_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
};

export type SoftwareVersionHostsRelationship = {
  __typename?: 'SoftwareVersionHostsRelationship';
  cursor: Scalars['String']['output'];
  node: Host;
  properties: SoftwareOn;
};

export type SoftwareVersionHostsUpdateConnectionInput = {
  edge?: InputMaybe<SoftwareOnUpdateInput>;
  node?: InputMaybe<HostUpdateInput>;
};

export type SoftwareVersionHostsUpdateFieldInput = {
  connect?: InputMaybe<Array<SoftwareVersionHostsConnectFieldInput>>;
  create?: InputMaybe<Array<SoftwareVersionHostsCreateFieldInput>>;
  delete?: InputMaybe<Array<SoftwareVersionHostsDeleteFieldInput>>;
  disconnect?: InputMaybe<Array<SoftwareVersionHostsDisconnectFieldInput>>;
  update?: InputMaybe<SoftwareVersionHostsUpdateConnectionInput>;
  where?: InputMaybe<SoftwareVersionHostsConnectionWhere>;
};

export type SoftwareVersionNetworkServiceNetwork_ServicesAggregationSelection =
  {
    __typename?: 'SoftwareVersionNetworkServiceNetwork_servicesAggregationSelection';
    count: Scalars['Int']['output'];
    node?: Maybe<SoftwareVersionNetworkServiceNetwork_ServicesNodeAggregateSelection>;
  };

export type SoftwareVersionNetworkServiceNetwork_ServicesNodeAggregateSelection =
  {
    __typename?: 'SoftwareVersionNetworkServiceNetwork_servicesNodeAggregateSelection';
    port: IntAggregateSelection;
    protocol: StringAggregateSelection;
    service: StringAggregateSelection;
  };

export type SoftwareVersionNetwork_ServicesAggregateInput = {
  AND?: InputMaybe<Array<SoftwareVersionNetwork_ServicesAggregateInput>>;
  NOT?: InputMaybe<SoftwareVersionNetwork_ServicesAggregateInput>;
  OR?: InputMaybe<Array<SoftwareVersionNetwork_ServicesAggregateInput>>;
  count?: InputMaybe<Scalars['Int']['input']>;
  count_GT?: InputMaybe<Scalars['Int']['input']>;
  count_GTE?: InputMaybe<Scalars['Int']['input']>;
  count_LT?: InputMaybe<Scalars['Int']['input']>;
  count_LTE?: InputMaybe<Scalars['Int']['input']>;
  node?: InputMaybe<SoftwareVersionNetwork_ServicesNodeAggregationWhereInput>;
};

export type SoftwareVersionNetwork_ServicesConnectFieldInput = {
  connect?: InputMaybe<Array<NetworkServiceConnectInput>>;
  /** Whether or not to overwrite any matching relationship with the new properties. */
  overwrite?: Scalars['Boolean']['input'];
  where?: InputMaybe<NetworkServiceConnectWhere>;
};

export type SoftwareVersionNetwork_ServicesConnection = {
  __typename?: 'SoftwareVersionNetwork_servicesConnection';
  edges: Array<SoftwareVersionNetwork_ServicesRelationship>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type SoftwareVersionNetwork_ServicesConnectionSort = {
  node?: InputMaybe<NetworkServiceSort>;
};

export type SoftwareVersionNetwork_ServicesConnectionWhere = {
  AND?: InputMaybe<Array<SoftwareVersionNetwork_ServicesConnectionWhere>>;
  NOT?: InputMaybe<SoftwareVersionNetwork_ServicesConnectionWhere>;
  OR?: InputMaybe<Array<SoftwareVersionNetwork_ServicesConnectionWhere>>;
  node?: InputMaybe<NetworkServiceWhere>;
};

export type SoftwareVersionNetwork_ServicesCreateFieldInput = {
  node: NetworkServiceCreateInput;
};

export type SoftwareVersionNetwork_ServicesDeleteFieldInput = {
  delete?: InputMaybe<NetworkServiceDeleteInput>;
  where?: InputMaybe<SoftwareVersionNetwork_ServicesConnectionWhere>;
};

export type SoftwareVersionNetwork_ServicesDisconnectFieldInput = {
  disconnect?: InputMaybe<NetworkServiceDisconnectInput>;
  where?: InputMaybe<SoftwareVersionNetwork_ServicesConnectionWhere>;
};

export type SoftwareVersionNetwork_ServicesFieldInput = {
  connect?: InputMaybe<Array<SoftwareVersionNetwork_ServicesConnectFieldInput>>;
  create?: InputMaybe<Array<SoftwareVersionNetwork_ServicesCreateFieldInput>>;
};

export type SoftwareVersionNetwork_ServicesNodeAggregationWhereInput = {
  AND?: InputMaybe<
    Array<SoftwareVersionNetwork_ServicesNodeAggregationWhereInput>
  >;
  NOT?: InputMaybe<SoftwareVersionNetwork_ServicesNodeAggregationWhereInput>;
  OR?: InputMaybe<
    Array<SoftwareVersionNetwork_ServicesNodeAggregationWhereInput>
  >;
  port_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  port_AVERAGE_GT?: InputMaybe<Scalars['Float']['input']>;
  port_AVERAGE_GTE?: InputMaybe<Scalars['Float']['input']>;
  port_AVERAGE_LT?: InputMaybe<Scalars['Float']['input']>;
  port_AVERAGE_LTE?: InputMaybe<Scalars['Float']['input']>;
  port_MAX_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  port_MAX_GT?: InputMaybe<Scalars['Int']['input']>;
  port_MAX_GTE?: InputMaybe<Scalars['Int']['input']>;
  port_MAX_LT?: InputMaybe<Scalars['Int']['input']>;
  port_MAX_LTE?: InputMaybe<Scalars['Int']['input']>;
  port_MIN_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  port_MIN_GT?: InputMaybe<Scalars['Int']['input']>;
  port_MIN_GTE?: InputMaybe<Scalars['Int']['input']>;
  port_MIN_LT?: InputMaybe<Scalars['Int']['input']>;
  port_MIN_LTE?: InputMaybe<Scalars['Int']['input']>;
  port_SUM_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  port_SUM_GT?: InputMaybe<Scalars['Int']['input']>;
  port_SUM_GTE?: InputMaybe<Scalars['Int']['input']>;
  port_SUM_LT?: InputMaybe<Scalars['Int']['input']>;
  port_SUM_LTE?: InputMaybe<Scalars['Int']['input']>;
  protocol_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  protocol_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  protocol_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  protocol_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  protocol_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  protocol_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  protocol_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  protocol_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  protocol_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  protocol_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  protocol_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  protocol_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  protocol_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  protocol_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  protocol_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  service_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  service_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  service_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  service_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  service_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  service_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  service_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  service_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  service_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  service_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  service_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  service_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  service_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  service_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  service_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
};

export type SoftwareVersionNetwork_ServicesRelationship = {
  __typename?: 'SoftwareVersionNetwork_servicesRelationship';
  cursor: Scalars['String']['output'];
  node: NetworkService;
};

export type SoftwareVersionNetwork_ServicesUpdateConnectionInput = {
  node?: InputMaybe<NetworkServiceUpdateInput>;
};

export type SoftwareVersionNetwork_ServicesUpdateFieldInput = {
  connect?: InputMaybe<Array<SoftwareVersionNetwork_ServicesConnectFieldInput>>;
  create?: InputMaybe<Array<SoftwareVersionNetwork_ServicesCreateFieldInput>>;
  delete?: InputMaybe<Array<SoftwareVersionNetwork_ServicesDeleteFieldInput>>;
  disconnect?: InputMaybe<
    Array<SoftwareVersionNetwork_ServicesDisconnectFieldInput>
  >;
  update?: InputMaybe<SoftwareVersionNetwork_ServicesUpdateConnectionInput>;
  where?: InputMaybe<SoftwareVersionNetwork_ServicesConnectionWhere>;
};

export type SoftwareVersionOptions = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  /**
   * Specify one or more SoftwareVersionSort objects to sort SoftwareVersions by.
   * The sorts will be applied in the order in which they are arranged in the array.
   */
  sort?: InputMaybe<Array<SoftwareVersionSort>>;
};

export type SoftwareVersionRelationInput = {
  hosts?: InputMaybe<Array<SoftwareVersionHostsCreateFieldInput>>;
  network_services?: InputMaybe<
    Array<SoftwareVersionNetwork_ServicesCreateFieldInput>
  >;
  vulnerabilities?: InputMaybe<
    Array<SoftwareVersionVulnerabilitiesCreateFieldInput>
  >;
};

/**
 * Fields to sort SoftwareVersions by. The order in which sorts are applied is not
 * guaranteed when specifying many fields in one SoftwareVersionSort object.
 */
export type SoftwareVersionSort = {
  _id?: InputMaybe<SortDirection>;
  version?: InputMaybe<SortDirection>;
};

export type SoftwareVersionUpdateInput = {
  hosts?: InputMaybe<Array<SoftwareVersionHostsUpdateFieldInput>>;
  network_services?: InputMaybe<
    Array<SoftwareVersionNetwork_ServicesUpdateFieldInput>
  >;
  version?: InputMaybe<Scalars['String']['input']>;
  vulnerabilities?: InputMaybe<
    Array<SoftwareVersionVulnerabilitiesUpdateFieldInput>
  >;
};

export type SoftwareVersionVulnerabilitiesAggregateInput = {
  AND?: InputMaybe<Array<SoftwareVersionVulnerabilitiesAggregateInput>>;
  NOT?: InputMaybe<SoftwareVersionVulnerabilitiesAggregateInput>;
  OR?: InputMaybe<Array<SoftwareVersionVulnerabilitiesAggregateInput>>;
  count?: InputMaybe<Scalars['Int']['input']>;
  count_GT?: InputMaybe<Scalars['Int']['input']>;
  count_GTE?: InputMaybe<Scalars['Int']['input']>;
  count_LT?: InputMaybe<Scalars['Int']['input']>;
  count_LTE?: InputMaybe<Scalars['Int']['input']>;
  node?: InputMaybe<SoftwareVersionVulnerabilitiesNodeAggregationWhereInput>;
};

export type SoftwareVersionVulnerabilitiesConnectFieldInput = {
  connect?: InputMaybe<Array<VulnerabilityConnectInput>>;
  /** Whether or not to overwrite any matching relationship with the new properties. */
  overwrite?: Scalars['Boolean']['input'];
  where?: InputMaybe<VulnerabilityConnectWhere>;
};

export type SoftwareVersionVulnerabilitiesConnection = {
  __typename?: 'SoftwareVersionVulnerabilitiesConnection';
  edges: Array<SoftwareVersionVulnerabilitiesRelationship>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type SoftwareVersionVulnerabilitiesConnectionSort = {
  node?: InputMaybe<VulnerabilitySort>;
};

export type SoftwareVersionVulnerabilitiesConnectionWhere = {
  AND?: InputMaybe<Array<SoftwareVersionVulnerabilitiesConnectionWhere>>;
  NOT?: InputMaybe<SoftwareVersionVulnerabilitiesConnectionWhere>;
  OR?: InputMaybe<Array<SoftwareVersionVulnerabilitiesConnectionWhere>>;
  node?: InputMaybe<VulnerabilityWhere>;
};

export type SoftwareVersionVulnerabilitiesCreateFieldInput = {
  node: VulnerabilityCreateInput;
};

export type SoftwareVersionVulnerabilitiesDeleteFieldInput = {
  delete?: InputMaybe<VulnerabilityDeleteInput>;
  where?: InputMaybe<SoftwareVersionVulnerabilitiesConnectionWhere>;
};

export type SoftwareVersionVulnerabilitiesDisconnectFieldInput = {
  disconnect?: InputMaybe<VulnerabilityDisconnectInput>;
  where?: InputMaybe<SoftwareVersionVulnerabilitiesConnectionWhere>;
};

export type SoftwareVersionVulnerabilitiesFieldInput = {
  connect?: InputMaybe<Array<SoftwareVersionVulnerabilitiesConnectFieldInput>>;
  create?: InputMaybe<Array<SoftwareVersionVulnerabilitiesCreateFieldInput>>;
};

export type SoftwareVersionVulnerabilitiesNodeAggregationWhereInput = {
  AND?: InputMaybe<
    Array<SoftwareVersionVulnerabilitiesNodeAggregationWhereInput>
  >;
  NOT?: InputMaybe<SoftwareVersionVulnerabilitiesNodeAggregationWhereInput>;
  OR?: InputMaybe<
    Array<SoftwareVersionVulnerabilitiesNodeAggregationWhereInput>
  >;
  description_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  description_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  description_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  description_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  description_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  description_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  description_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  description_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  description_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  description_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  description_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  description_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  description_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  description_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  description_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
};

export type SoftwareVersionVulnerabilitiesRelationship = {
  __typename?: 'SoftwareVersionVulnerabilitiesRelationship';
  cursor: Scalars['String']['output'];
  node: Vulnerability;
};

export type SoftwareVersionVulnerabilitiesUpdateConnectionInput = {
  node?: InputMaybe<VulnerabilityUpdateInput>;
};

export type SoftwareVersionVulnerabilitiesUpdateFieldInput = {
  connect?: InputMaybe<Array<SoftwareVersionVulnerabilitiesConnectFieldInput>>;
  create?: InputMaybe<Array<SoftwareVersionVulnerabilitiesCreateFieldInput>>;
  delete?: InputMaybe<Array<SoftwareVersionVulnerabilitiesDeleteFieldInput>>;
  disconnect?: InputMaybe<
    Array<SoftwareVersionVulnerabilitiesDisconnectFieldInput>
  >;
  update?: InputMaybe<SoftwareVersionVulnerabilitiesUpdateConnectionInput>;
  where?: InputMaybe<SoftwareVersionVulnerabilitiesConnectionWhere>;
};

export type SoftwareVersionVulnerabilityVulnerabilitiesAggregationSelection = {
  __typename?: 'SoftwareVersionVulnerabilityVulnerabilitiesAggregationSelection';
  count: Scalars['Int']['output'];
  node?: Maybe<SoftwareVersionVulnerabilityVulnerabilitiesNodeAggregateSelection>;
};

export type SoftwareVersionVulnerabilityVulnerabilitiesNodeAggregateSelection =
  {
    __typename?: 'SoftwareVersionVulnerabilityVulnerabilitiesNodeAggregateSelection';
    description: StringAggregateSelection;
  };

export type SoftwareVersionWhere = {
  AND?: InputMaybe<Array<SoftwareVersionWhere>>;
  NOT?: InputMaybe<SoftwareVersionWhere>;
  OR?: InputMaybe<Array<SoftwareVersionWhere>>;
  _id?: InputMaybe<Scalars['ID']['input']>;
  _id_CONTAINS?: InputMaybe<Scalars['ID']['input']>;
  _id_ENDS_WITH?: InputMaybe<Scalars['ID']['input']>;
  _id_IN?: InputMaybe<Array<Scalars['ID']['input']>>;
  _id_STARTS_WITH?: InputMaybe<Scalars['ID']['input']>;
  hostsAggregate?: InputMaybe<SoftwareVersionHostsAggregateInput>;
  /** Return SoftwareVersions where all of the related SoftwareVersionHostsConnections match this filter */
  hostsConnection_ALL?: InputMaybe<SoftwareVersionHostsConnectionWhere>;
  /** Return SoftwareVersions where none of the related SoftwareVersionHostsConnections match this filter */
  hostsConnection_NONE?: InputMaybe<SoftwareVersionHostsConnectionWhere>;
  /** Return SoftwareVersions where one of the related SoftwareVersionHostsConnections match this filter */
  hostsConnection_SINGLE?: InputMaybe<SoftwareVersionHostsConnectionWhere>;
  /** Return SoftwareVersions where some of the related SoftwareVersionHostsConnections match this filter */
  hostsConnection_SOME?: InputMaybe<SoftwareVersionHostsConnectionWhere>;
  /** Return SoftwareVersions where all of the related Hosts match this filter */
  hosts_ALL?: InputMaybe<HostWhere>;
  /** Return SoftwareVersions where none of the related Hosts match this filter */
  hosts_NONE?: InputMaybe<HostWhere>;
  /** Return SoftwareVersions where one of the related Hosts match this filter */
  hosts_SINGLE?: InputMaybe<HostWhere>;
  /** Return SoftwareVersions where some of the related Hosts match this filter */
  hosts_SOME?: InputMaybe<HostWhere>;
  network_servicesAggregate?: InputMaybe<SoftwareVersionNetwork_ServicesAggregateInput>;
  /** Return SoftwareVersions where all of the related SoftwareVersionNetwork_servicesConnections match this filter */
  network_servicesConnection_ALL?: InputMaybe<SoftwareVersionNetwork_ServicesConnectionWhere>;
  /** Return SoftwareVersions where none of the related SoftwareVersionNetwork_servicesConnections match this filter */
  network_servicesConnection_NONE?: InputMaybe<SoftwareVersionNetwork_ServicesConnectionWhere>;
  /** Return SoftwareVersions where one of the related SoftwareVersionNetwork_servicesConnections match this filter */
  network_servicesConnection_SINGLE?: InputMaybe<SoftwareVersionNetwork_ServicesConnectionWhere>;
  /** Return SoftwareVersions where some of the related SoftwareVersionNetwork_servicesConnections match this filter */
  network_servicesConnection_SOME?: InputMaybe<SoftwareVersionNetwork_ServicesConnectionWhere>;
  /** Return SoftwareVersions where all of the related NetworkServices match this filter */
  network_services_ALL?: InputMaybe<NetworkServiceWhere>;
  /** Return SoftwareVersions where none of the related NetworkServices match this filter */
  network_services_NONE?: InputMaybe<NetworkServiceWhere>;
  /** Return SoftwareVersions where one of the related NetworkServices match this filter */
  network_services_SINGLE?: InputMaybe<NetworkServiceWhere>;
  /** Return SoftwareVersions where some of the related NetworkServices match this filter */
  network_services_SOME?: InputMaybe<NetworkServiceWhere>;
  version?: InputMaybe<Scalars['String']['input']>;
  version_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  version_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  version_IN?: InputMaybe<Array<Scalars['String']['input']>>;
  version_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
  vulnerabilitiesAggregate?: InputMaybe<SoftwareVersionVulnerabilitiesAggregateInput>;
  /** Return SoftwareVersions where all of the related SoftwareVersionVulnerabilitiesConnections match this filter */
  vulnerabilitiesConnection_ALL?: InputMaybe<SoftwareVersionVulnerabilitiesConnectionWhere>;
  /** Return SoftwareVersions where none of the related SoftwareVersionVulnerabilitiesConnections match this filter */
  vulnerabilitiesConnection_NONE?: InputMaybe<SoftwareVersionVulnerabilitiesConnectionWhere>;
  /** Return SoftwareVersions where one of the related SoftwareVersionVulnerabilitiesConnections match this filter */
  vulnerabilitiesConnection_SINGLE?: InputMaybe<SoftwareVersionVulnerabilitiesConnectionWhere>;
  /** Return SoftwareVersions where some of the related SoftwareVersionVulnerabilitiesConnections match this filter */
  vulnerabilitiesConnection_SOME?: InputMaybe<SoftwareVersionVulnerabilitiesConnectionWhere>;
  /** Return SoftwareVersions where all of the related Vulnerabilities match this filter */
  vulnerabilities_ALL?: InputMaybe<VulnerabilityWhere>;
  /** Return SoftwareVersions where none of the related Vulnerabilities match this filter */
  vulnerabilities_NONE?: InputMaybe<VulnerabilityWhere>;
  /** Return SoftwareVersions where one of the related Vulnerabilities match this filter */
  vulnerabilities_SINGLE?: InputMaybe<VulnerabilityWhere>;
  /** Return SoftwareVersions where some of the related Vulnerabilities match this filter */
  vulnerabilities_SOME?: InputMaybe<VulnerabilityWhere>;
};

export type SoftwareVersionsConnection = {
  __typename?: 'SoftwareVersionsConnection';
  edges: Array<SoftwareVersionEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

/** An enum for sorting in either ascending or descending order. */
export enum SortDirection {
  /** Sort by field values in ascending order. */
  Asc = 'ASC',
  /** Sort by field values in descending order. */
  Desc = 'DESC',
}

export type StringAggregateSelection = {
  __typename?: 'StringAggregateSelection';
  longest?: Maybe<Scalars['String']['output']>;
  shortest?: Maybe<Scalars['String']['output']>;
};

export type Subnet = {
  __typename?: 'Subnet';
  _id: Scalars['ID']['output'];
  contacts: Array<Contact>;
  contactsAggregate?: Maybe<SubnetContactContactsAggregationSelection>;
  contactsConnection: SubnetContactsConnection;
  note?: Maybe<Scalars['String']['output']>;
  org_units: Array<OrganizationUnit>;
  org_unitsAggregate?: Maybe<SubnetOrganizationUnitOrg_UnitsAggregationSelection>;
  org_unitsConnection: SubnetOrg_UnitsConnection;
  parent_subnet: Array<Subnet>;
  parent_subnetAggregate?: Maybe<SubnetSubnetParent_SubnetAggregationSelection>;
  parent_subnetConnection: SubnetParent_SubnetConnection;
  range: Scalars['String']['output'];
};

export type SubnetContactsArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  options?: InputMaybe<ContactOptions>;
  where?: InputMaybe<ContactWhere>;
};

export type SubnetContactsAggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<ContactWhere>;
};

export type SubnetContactsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<SubnetContactsConnectionSort>>;
  where?: InputMaybe<SubnetContactsConnectionWhere>;
};

export type SubnetOrg_UnitsArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  options?: InputMaybe<OrganizationUnitOptions>;
  where?: InputMaybe<OrganizationUnitWhere>;
};

export type SubnetOrg_UnitsAggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<OrganizationUnitWhere>;
};

export type SubnetOrg_UnitsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<SubnetOrg_UnitsConnectionSort>>;
  where?: InputMaybe<SubnetOrg_UnitsConnectionWhere>;
};

export type SubnetParent_SubnetArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  options?: InputMaybe<SubnetOptions>;
  where?: InputMaybe<SubnetWhere>;
};

export type SubnetParent_SubnetAggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<SubnetWhere>;
};

export type SubnetParent_SubnetConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<SubnetParent_SubnetConnectionSort>>;
  where?: InputMaybe<SubnetParent_SubnetConnectionWhere>;
};

export type SubnetAggregateSelection = {
  __typename?: 'SubnetAggregateSelection';
  count: Scalars['Int']['output'];
  note: StringAggregateSelection;
  range: StringAggregateSelection;
};

export type SubnetConnectInput = {
  contacts?: InputMaybe<Array<SubnetContactsConnectFieldInput>>;
  org_units?: InputMaybe<Array<SubnetOrg_UnitsConnectFieldInput>>;
  parent_subnet?: InputMaybe<Array<SubnetParent_SubnetConnectFieldInput>>;
};

export type SubnetConnectWhere = {
  node: SubnetWhere;
};

export type SubnetContactContactsAggregationSelection = {
  __typename?: 'SubnetContactContactsAggregationSelection';
  count: Scalars['Int']['output'];
  node?: Maybe<SubnetContactContactsNodeAggregateSelection>;
};

export type SubnetContactContactsNodeAggregateSelection = {
  __typename?: 'SubnetContactContactsNodeAggregateSelection';
  name: StringAggregateSelection;
};

export type SubnetContactsAggregateInput = {
  AND?: InputMaybe<Array<SubnetContactsAggregateInput>>;
  NOT?: InputMaybe<SubnetContactsAggregateInput>;
  OR?: InputMaybe<Array<SubnetContactsAggregateInput>>;
  count?: InputMaybe<Scalars['Int']['input']>;
  count_GT?: InputMaybe<Scalars['Int']['input']>;
  count_GTE?: InputMaybe<Scalars['Int']['input']>;
  count_LT?: InputMaybe<Scalars['Int']['input']>;
  count_LTE?: InputMaybe<Scalars['Int']['input']>;
  node?: InputMaybe<SubnetContactsNodeAggregationWhereInput>;
};

export type SubnetContactsConnectFieldInput = {
  connect?: InputMaybe<Array<ContactConnectInput>>;
  /** Whether or not to overwrite any matching relationship with the new properties. */
  overwrite?: Scalars['Boolean']['input'];
  where?: InputMaybe<ContactConnectWhere>;
};

export type SubnetContactsConnection = {
  __typename?: 'SubnetContactsConnection';
  edges: Array<SubnetContactsRelationship>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type SubnetContactsConnectionSort = {
  node?: InputMaybe<ContactSort>;
};

export type SubnetContactsConnectionWhere = {
  AND?: InputMaybe<Array<SubnetContactsConnectionWhere>>;
  NOT?: InputMaybe<SubnetContactsConnectionWhere>;
  OR?: InputMaybe<Array<SubnetContactsConnectionWhere>>;
  node?: InputMaybe<ContactWhere>;
};

export type SubnetContactsCreateFieldInput = {
  node: ContactCreateInput;
};

export type SubnetContactsDeleteFieldInput = {
  delete?: InputMaybe<ContactDeleteInput>;
  where?: InputMaybe<SubnetContactsConnectionWhere>;
};

export type SubnetContactsDisconnectFieldInput = {
  disconnect?: InputMaybe<ContactDisconnectInput>;
  where?: InputMaybe<SubnetContactsConnectionWhere>;
};

export type SubnetContactsFieldInput = {
  connect?: InputMaybe<Array<SubnetContactsConnectFieldInput>>;
  create?: InputMaybe<Array<SubnetContactsCreateFieldInput>>;
};

export type SubnetContactsNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<SubnetContactsNodeAggregationWhereInput>>;
  NOT?: InputMaybe<SubnetContactsNodeAggregationWhereInput>;
  OR?: InputMaybe<Array<SubnetContactsNodeAggregationWhereInput>>;
  name_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
};

export type SubnetContactsRelationship = {
  __typename?: 'SubnetContactsRelationship';
  cursor: Scalars['String']['output'];
  node: Contact;
};

export type SubnetContactsUpdateConnectionInput = {
  node?: InputMaybe<ContactUpdateInput>;
};

export type SubnetContactsUpdateFieldInput = {
  connect?: InputMaybe<Array<SubnetContactsConnectFieldInput>>;
  create?: InputMaybe<Array<SubnetContactsCreateFieldInput>>;
  delete?: InputMaybe<Array<SubnetContactsDeleteFieldInput>>;
  disconnect?: InputMaybe<Array<SubnetContactsDisconnectFieldInput>>;
  update?: InputMaybe<SubnetContactsUpdateConnectionInput>;
  where?: InputMaybe<SubnetContactsConnectionWhere>;
};

export type SubnetCreateInput = {
  contacts?: InputMaybe<SubnetContactsFieldInput>;
  note?: InputMaybe<Scalars['String']['input']>;
  org_units?: InputMaybe<SubnetOrg_UnitsFieldInput>;
  parent_subnet?: InputMaybe<SubnetParent_SubnetFieldInput>;
  range: Scalars['String']['input'];
};

export type SubnetDeleteInput = {
  contacts?: InputMaybe<Array<SubnetContactsDeleteFieldInput>>;
  org_units?: InputMaybe<Array<SubnetOrg_UnitsDeleteFieldInput>>;
  parent_subnet?: InputMaybe<Array<SubnetParent_SubnetDeleteFieldInput>>;
};

export type SubnetDisconnectInput = {
  contacts?: InputMaybe<Array<SubnetContactsDisconnectFieldInput>>;
  org_units?: InputMaybe<Array<SubnetOrg_UnitsDisconnectFieldInput>>;
  parent_subnet?: InputMaybe<Array<SubnetParent_SubnetDisconnectFieldInput>>;
};

export type SubnetEdge = {
  __typename?: 'SubnetEdge';
  cursor: Scalars['String']['output'];
  node: Subnet;
};

export type SubnetOptions = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  /**
   * Specify one or more SubnetSort objects to sort Subnets by. The sorts will be
   * applied in the order in which they are arranged in the array.
   */
  sort?: InputMaybe<Array<SubnetSort>>;
};

export type SubnetOrg_UnitsAggregateInput = {
  AND?: InputMaybe<Array<SubnetOrg_UnitsAggregateInput>>;
  NOT?: InputMaybe<SubnetOrg_UnitsAggregateInput>;
  OR?: InputMaybe<Array<SubnetOrg_UnitsAggregateInput>>;
  count?: InputMaybe<Scalars['Int']['input']>;
  count_GT?: InputMaybe<Scalars['Int']['input']>;
  count_GTE?: InputMaybe<Scalars['Int']['input']>;
  count_LT?: InputMaybe<Scalars['Int']['input']>;
  count_LTE?: InputMaybe<Scalars['Int']['input']>;
  node?: InputMaybe<SubnetOrg_UnitsNodeAggregationWhereInput>;
};

export type SubnetOrg_UnitsConnectFieldInput = {
  connect?: InputMaybe<Array<OrganizationUnitConnectInput>>;
  /** Whether or not to overwrite any matching relationship with the new properties. */
  overwrite?: Scalars['Boolean']['input'];
  where?: InputMaybe<OrganizationUnitConnectWhere>;
};

export type SubnetOrg_UnitsConnection = {
  __typename?: 'SubnetOrg_unitsConnection';
  edges: Array<SubnetOrg_UnitsRelationship>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type SubnetOrg_UnitsConnectionSort = {
  node?: InputMaybe<OrganizationUnitSort>;
};

export type SubnetOrg_UnitsConnectionWhere = {
  AND?: InputMaybe<Array<SubnetOrg_UnitsConnectionWhere>>;
  NOT?: InputMaybe<SubnetOrg_UnitsConnectionWhere>;
  OR?: InputMaybe<Array<SubnetOrg_UnitsConnectionWhere>>;
  node?: InputMaybe<OrganizationUnitWhere>;
};

export type SubnetOrg_UnitsCreateFieldInput = {
  node: OrganizationUnitCreateInput;
};

export type SubnetOrg_UnitsDeleteFieldInput = {
  delete?: InputMaybe<OrganizationUnitDeleteInput>;
  where?: InputMaybe<SubnetOrg_UnitsConnectionWhere>;
};

export type SubnetOrg_UnitsDisconnectFieldInput = {
  disconnect?: InputMaybe<OrganizationUnitDisconnectInput>;
  where?: InputMaybe<SubnetOrg_UnitsConnectionWhere>;
};

export type SubnetOrg_UnitsFieldInput = {
  connect?: InputMaybe<Array<SubnetOrg_UnitsConnectFieldInput>>;
  create?: InputMaybe<Array<SubnetOrg_UnitsCreateFieldInput>>;
};

export type SubnetOrg_UnitsNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<SubnetOrg_UnitsNodeAggregationWhereInput>>;
  NOT?: InputMaybe<SubnetOrg_UnitsNodeAggregationWhereInput>;
  OR?: InputMaybe<Array<SubnetOrg_UnitsNodeAggregationWhereInput>>;
  name_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
};

export type SubnetOrg_UnitsRelationship = {
  __typename?: 'SubnetOrg_unitsRelationship';
  cursor: Scalars['String']['output'];
  node: OrganizationUnit;
};

export type SubnetOrg_UnitsUpdateConnectionInput = {
  node?: InputMaybe<OrganizationUnitUpdateInput>;
};

export type SubnetOrg_UnitsUpdateFieldInput = {
  connect?: InputMaybe<Array<SubnetOrg_UnitsConnectFieldInput>>;
  create?: InputMaybe<Array<SubnetOrg_UnitsCreateFieldInput>>;
  delete?: InputMaybe<Array<SubnetOrg_UnitsDeleteFieldInput>>;
  disconnect?: InputMaybe<Array<SubnetOrg_UnitsDisconnectFieldInput>>;
  update?: InputMaybe<SubnetOrg_UnitsUpdateConnectionInput>;
  where?: InputMaybe<SubnetOrg_UnitsConnectionWhere>;
};

export type SubnetOrganizationUnitOrg_UnitsAggregationSelection = {
  __typename?: 'SubnetOrganizationUnitOrg_unitsAggregationSelection';
  count: Scalars['Int']['output'];
  node?: Maybe<SubnetOrganizationUnitOrg_UnitsNodeAggregateSelection>;
};

export type SubnetOrganizationUnitOrg_UnitsNodeAggregateSelection = {
  __typename?: 'SubnetOrganizationUnitOrg_unitsNodeAggregateSelection';
  name: StringAggregateSelection;
};

export type SubnetParent_SubnetAggregateInput = {
  AND?: InputMaybe<Array<SubnetParent_SubnetAggregateInput>>;
  NOT?: InputMaybe<SubnetParent_SubnetAggregateInput>;
  OR?: InputMaybe<Array<SubnetParent_SubnetAggregateInput>>;
  count?: InputMaybe<Scalars['Int']['input']>;
  count_GT?: InputMaybe<Scalars['Int']['input']>;
  count_GTE?: InputMaybe<Scalars['Int']['input']>;
  count_LT?: InputMaybe<Scalars['Int']['input']>;
  count_LTE?: InputMaybe<Scalars['Int']['input']>;
  node?: InputMaybe<SubnetParent_SubnetNodeAggregationWhereInput>;
};

export type SubnetParent_SubnetConnectFieldInput = {
  connect?: InputMaybe<Array<SubnetConnectInput>>;
  /** Whether or not to overwrite any matching relationship with the new properties. */
  overwrite?: Scalars['Boolean']['input'];
  where?: InputMaybe<SubnetConnectWhere>;
};

export type SubnetParent_SubnetConnection = {
  __typename?: 'SubnetParent_subnetConnection';
  edges: Array<SubnetParent_SubnetRelationship>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type SubnetParent_SubnetConnectionSort = {
  node?: InputMaybe<SubnetSort>;
};

export type SubnetParent_SubnetConnectionWhere = {
  AND?: InputMaybe<Array<SubnetParent_SubnetConnectionWhere>>;
  NOT?: InputMaybe<SubnetParent_SubnetConnectionWhere>;
  OR?: InputMaybe<Array<SubnetParent_SubnetConnectionWhere>>;
  node?: InputMaybe<SubnetWhere>;
};

export type SubnetParent_SubnetCreateFieldInput = {
  node: SubnetCreateInput;
};

export type SubnetParent_SubnetDeleteFieldInput = {
  delete?: InputMaybe<SubnetDeleteInput>;
  where?: InputMaybe<SubnetParent_SubnetConnectionWhere>;
};

export type SubnetParent_SubnetDisconnectFieldInput = {
  disconnect?: InputMaybe<SubnetDisconnectInput>;
  where?: InputMaybe<SubnetParent_SubnetConnectionWhere>;
};

export type SubnetParent_SubnetFieldInput = {
  connect?: InputMaybe<Array<SubnetParent_SubnetConnectFieldInput>>;
  create?: InputMaybe<Array<SubnetParent_SubnetCreateFieldInput>>;
};

export type SubnetParent_SubnetNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<SubnetParent_SubnetNodeAggregationWhereInput>>;
  NOT?: InputMaybe<SubnetParent_SubnetNodeAggregationWhereInput>;
  OR?: InputMaybe<Array<SubnetParent_SubnetNodeAggregationWhereInput>>;
  note_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  note_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  note_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  note_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  note_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  note_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  note_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  note_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  note_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  note_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  note_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  note_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  note_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  note_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  note_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  range_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  range_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  range_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  range_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  range_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  range_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  range_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  range_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  range_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  range_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  range_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  range_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  range_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  range_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  range_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
};

export type SubnetParent_SubnetRelationship = {
  __typename?: 'SubnetParent_subnetRelationship';
  cursor: Scalars['String']['output'];
  node: Subnet;
};

export type SubnetParent_SubnetUpdateConnectionInput = {
  node?: InputMaybe<SubnetUpdateInput>;
};

export type SubnetParent_SubnetUpdateFieldInput = {
  connect?: InputMaybe<Array<SubnetParent_SubnetConnectFieldInput>>;
  create?: InputMaybe<Array<SubnetParent_SubnetCreateFieldInput>>;
  delete?: InputMaybe<Array<SubnetParent_SubnetDeleteFieldInput>>;
  disconnect?: InputMaybe<Array<SubnetParent_SubnetDisconnectFieldInput>>;
  update?: InputMaybe<SubnetParent_SubnetUpdateConnectionInput>;
  where?: InputMaybe<SubnetParent_SubnetConnectionWhere>;
};

export type SubnetRelationInput = {
  contacts?: InputMaybe<Array<SubnetContactsCreateFieldInput>>;
  org_units?: InputMaybe<Array<SubnetOrg_UnitsCreateFieldInput>>;
  parent_subnet?: InputMaybe<Array<SubnetParent_SubnetCreateFieldInput>>;
};

/**
 * Fields to sort Subnets by. The order in which sorts are applied is not
 * guaranteed when specifying many fields in one SubnetSort object.
 */
export type SubnetSort = {
  _id?: InputMaybe<SortDirection>;
  note?: InputMaybe<SortDirection>;
  range?: InputMaybe<SortDirection>;
};

export type SubnetSubnetParent_SubnetAggregationSelection = {
  __typename?: 'SubnetSubnetParent_subnetAggregationSelection';
  count: Scalars['Int']['output'];
  node?: Maybe<SubnetSubnetParent_SubnetNodeAggregateSelection>;
};

export type SubnetSubnetParent_SubnetNodeAggregateSelection = {
  __typename?: 'SubnetSubnetParent_subnetNodeAggregateSelection';
  note: StringAggregateSelection;
  range: StringAggregateSelection;
};

export type SubnetUpdateInput = {
  contacts?: InputMaybe<Array<SubnetContactsUpdateFieldInput>>;
  note?: InputMaybe<Scalars['String']['input']>;
  org_units?: InputMaybe<Array<SubnetOrg_UnitsUpdateFieldInput>>;
  parent_subnet?: InputMaybe<Array<SubnetParent_SubnetUpdateFieldInput>>;
  range?: InputMaybe<Scalars['String']['input']>;
};

export type SubnetWhere = {
  AND?: InputMaybe<Array<SubnetWhere>>;
  NOT?: InputMaybe<SubnetWhere>;
  OR?: InputMaybe<Array<SubnetWhere>>;
  _id?: InputMaybe<Scalars['ID']['input']>;
  _id_CONTAINS?: InputMaybe<Scalars['ID']['input']>;
  _id_ENDS_WITH?: InputMaybe<Scalars['ID']['input']>;
  _id_IN?: InputMaybe<Array<Scalars['ID']['input']>>;
  _id_STARTS_WITH?: InputMaybe<Scalars['ID']['input']>;
  contactsAggregate?: InputMaybe<SubnetContactsAggregateInput>;
  /** Return Subnets where all of the related SubnetContactsConnections match this filter */
  contactsConnection_ALL?: InputMaybe<SubnetContactsConnectionWhere>;
  /** Return Subnets where none of the related SubnetContactsConnections match this filter */
  contactsConnection_NONE?: InputMaybe<SubnetContactsConnectionWhere>;
  /** Return Subnets where one of the related SubnetContactsConnections match this filter */
  contactsConnection_SINGLE?: InputMaybe<SubnetContactsConnectionWhere>;
  /** Return Subnets where some of the related SubnetContactsConnections match this filter */
  contactsConnection_SOME?: InputMaybe<SubnetContactsConnectionWhere>;
  /** Return Subnets where all of the related Contacts match this filter */
  contacts_ALL?: InputMaybe<ContactWhere>;
  /** Return Subnets where none of the related Contacts match this filter */
  contacts_NONE?: InputMaybe<ContactWhere>;
  /** Return Subnets where one of the related Contacts match this filter */
  contacts_SINGLE?: InputMaybe<ContactWhere>;
  /** Return Subnets where some of the related Contacts match this filter */
  contacts_SOME?: InputMaybe<ContactWhere>;
  note?: InputMaybe<Scalars['String']['input']>;
  note_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  note_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  note_IN?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  note_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
  org_unitsAggregate?: InputMaybe<SubnetOrg_UnitsAggregateInput>;
  /** Return Subnets where all of the related SubnetOrg_unitsConnections match this filter */
  org_unitsConnection_ALL?: InputMaybe<SubnetOrg_UnitsConnectionWhere>;
  /** Return Subnets where none of the related SubnetOrg_unitsConnections match this filter */
  org_unitsConnection_NONE?: InputMaybe<SubnetOrg_UnitsConnectionWhere>;
  /** Return Subnets where one of the related SubnetOrg_unitsConnections match this filter */
  org_unitsConnection_SINGLE?: InputMaybe<SubnetOrg_UnitsConnectionWhere>;
  /** Return Subnets where some of the related SubnetOrg_unitsConnections match this filter */
  org_unitsConnection_SOME?: InputMaybe<SubnetOrg_UnitsConnectionWhere>;
  /** Return Subnets where all of the related OrganizationUnits match this filter */
  org_units_ALL?: InputMaybe<OrganizationUnitWhere>;
  /** Return Subnets where none of the related OrganizationUnits match this filter */
  org_units_NONE?: InputMaybe<OrganizationUnitWhere>;
  /** Return Subnets where one of the related OrganizationUnits match this filter */
  org_units_SINGLE?: InputMaybe<OrganizationUnitWhere>;
  /** Return Subnets where some of the related OrganizationUnits match this filter */
  org_units_SOME?: InputMaybe<OrganizationUnitWhere>;
  parent_subnetAggregate?: InputMaybe<SubnetParent_SubnetAggregateInput>;
  /** Return Subnets where all of the related SubnetParent_subnetConnections match this filter */
  parent_subnetConnection_ALL?: InputMaybe<SubnetParent_SubnetConnectionWhere>;
  /** Return Subnets where none of the related SubnetParent_subnetConnections match this filter */
  parent_subnetConnection_NONE?: InputMaybe<SubnetParent_SubnetConnectionWhere>;
  /** Return Subnets where one of the related SubnetParent_subnetConnections match this filter */
  parent_subnetConnection_SINGLE?: InputMaybe<SubnetParent_SubnetConnectionWhere>;
  /** Return Subnets where some of the related SubnetParent_subnetConnections match this filter */
  parent_subnetConnection_SOME?: InputMaybe<SubnetParent_SubnetConnectionWhere>;
  /** Return Subnets where all of the related Subnets match this filter */
  parent_subnet_ALL?: InputMaybe<SubnetWhere>;
  /** Return Subnets where none of the related Subnets match this filter */
  parent_subnet_NONE?: InputMaybe<SubnetWhere>;
  /** Return Subnets where one of the related Subnets match this filter */
  parent_subnet_SINGLE?: InputMaybe<SubnetWhere>;
  /** Return Subnets where some of the related Subnets match this filter */
  parent_subnet_SOME?: InputMaybe<SubnetWhere>;
  range?: InputMaybe<Scalars['String']['input']>;
  range_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  range_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  range_IN?: InputMaybe<Array<Scalars['String']['input']>>;
  range_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
};

export type SubnetsConnection = {
  __typename?: 'SubnetsConnection';
  edges: Array<SubnetEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type Uri = {
  __typename?: 'URI';
  _id: Scalars['ID']['output'];
  identifier: Scalars['String']['output'];
  ips: Array<Ip>;
  ipsAggregate?: Maybe<UriipIpsAggregationSelection>;
  ipsConnection: UriIpsConnection;
};

export type UriIpsArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  options?: InputMaybe<IpOptions>;
  where?: InputMaybe<IpWhere>;
};

export type UriIpsAggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<IpWhere>;
};

export type UriIpsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<UriIpsConnectionSort>>;
  where?: InputMaybe<UriIpsConnectionWhere>;
};

export type UriAggregateSelection = {
  __typename?: 'URIAggregateSelection';
  count: Scalars['Int']['output'];
  identifier: StringAggregateSelection;
};

export type UriConnectInput = {
  ips?: InputMaybe<Array<UriIpsConnectFieldInput>>;
};

export type UriConnectWhere = {
  node: UriWhere;
};

export type UriCreateInput = {
  identifier: Scalars['String']['input'];
  ips?: InputMaybe<UriIpsFieldInput>;
};

export type UriDeleteInput = {
  ips?: InputMaybe<Array<UriIpsDeleteFieldInput>>;
};

export type UriDisconnectInput = {
  ips?: InputMaybe<Array<UriIpsDisconnectFieldInput>>;
};

export type UriEdge = {
  __typename?: 'URIEdge';
  cursor: Scalars['String']['output'];
  node: Uri;
};

export type UriipIpsAggregationSelection = {
  __typename?: 'URIIPIpsAggregationSelection';
  count: Scalars['Int']['output'];
  node?: Maybe<UriipIpsNodeAggregateSelection>;
};

export type UriipIpsNodeAggregateSelection = {
  __typename?: 'URIIPIpsNodeAggregateSelection';
  address: StringAggregateSelection;
  status: StringAggregateSelection;
  version: IntAggregateSelection;
};

export type UriIpsAggregateInput = {
  AND?: InputMaybe<Array<UriIpsAggregateInput>>;
  NOT?: InputMaybe<UriIpsAggregateInput>;
  OR?: InputMaybe<Array<UriIpsAggregateInput>>;
  count?: InputMaybe<Scalars['Int']['input']>;
  count_GT?: InputMaybe<Scalars['Int']['input']>;
  count_GTE?: InputMaybe<Scalars['Int']['input']>;
  count_LT?: InputMaybe<Scalars['Int']['input']>;
  count_LTE?: InputMaybe<Scalars['Int']['input']>;
  node?: InputMaybe<UriIpsNodeAggregationWhereInput>;
};

export type UriIpsConnectFieldInput = {
  connect?: InputMaybe<Array<IpConnectInput>>;
  /** Whether or not to overwrite any matching relationship with the new properties. */
  overwrite?: Scalars['Boolean']['input'];
  where?: InputMaybe<IpConnectWhere>;
};

export type UriIpsConnection = {
  __typename?: 'URIIpsConnection';
  edges: Array<UriIpsRelationship>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type UriIpsConnectionSort = {
  node?: InputMaybe<IpSort>;
};

export type UriIpsConnectionWhere = {
  AND?: InputMaybe<Array<UriIpsConnectionWhere>>;
  NOT?: InputMaybe<UriIpsConnectionWhere>;
  OR?: InputMaybe<Array<UriIpsConnectionWhere>>;
  node?: InputMaybe<IpWhere>;
};

export type UriIpsCreateFieldInput = {
  node: IpCreateInput;
};

export type UriIpsDeleteFieldInput = {
  delete?: InputMaybe<IpDeleteInput>;
  where?: InputMaybe<UriIpsConnectionWhere>;
};

export type UriIpsDisconnectFieldInput = {
  disconnect?: InputMaybe<IpDisconnectInput>;
  where?: InputMaybe<UriIpsConnectionWhere>;
};

export type UriIpsFieldInput = {
  connect?: InputMaybe<Array<UriIpsConnectFieldInput>>;
  create?: InputMaybe<Array<UriIpsCreateFieldInput>>;
};

export type UriIpsNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<UriIpsNodeAggregationWhereInput>>;
  NOT?: InputMaybe<UriIpsNodeAggregationWhereInput>;
  OR?: InputMaybe<Array<UriIpsNodeAggregationWhereInput>>;
  address_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  address_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  address_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  address_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  address_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  address_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  address_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  address_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  address_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  address_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  address_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  address_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  address_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  address_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  address_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  status_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  status_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  status_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  status_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  status_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  status_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  status_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  status_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  status_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  status_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  status_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  status_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  status_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  status_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  status_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  version_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  version_AVERAGE_GT?: InputMaybe<Scalars['Float']['input']>;
  version_AVERAGE_GTE?: InputMaybe<Scalars['Float']['input']>;
  version_AVERAGE_LT?: InputMaybe<Scalars['Float']['input']>;
  version_AVERAGE_LTE?: InputMaybe<Scalars['Float']['input']>;
  version_MAX_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  version_MAX_GT?: InputMaybe<Scalars['Int']['input']>;
  version_MAX_GTE?: InputMaybe<Scalars['Int']['input']>;
  version_MAX_LT?: InputMaybe<Scalars['Int']['input']>;
  version_MAX_LTE?: InputMaybe<Scalars['Int']['input']>;
  version_MIN_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  version_MIN_GT?: InputMaybe<Scalars['Int']['input']>;
  version_MIN_GTE?: InputMaybe<Scalars['Int']['input']>;
  version_MIN_LT?: InputMaybe<Scalars['Int']['input']>;
  version_MIN_LTE?: InputMaybe<Scalars['Int']['input']>;
  version_SUM_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  version_SUM_GT?: InputMaybe<Scalars['Int']['input']>;
  version_SUM_GTE?: InputMaybe<Scalars['Int']['input']>;
  version_SUM_LT?: InputMaybe<Scalars['Int']['input']>;
  version_SUM_LTE?: InputMaybe<Scalars['Int']['input']>;
};

export type UriIpsRelationship = {
  __typename?: 'URIIpsRelationship';
  cursor: Scalars['String']['output'];
  node: Ip;
};

export type UriIpsUpdateConnectionInput = {
  node?: InputMaybe<IpUpdateInput>;
};

export type UriIpsUpdateFieldInput = {
  connect?: InputMaybe<Array<UriIpsConnectFieldInput>>;
  create?: InputMaybe<Array<UriIpsCreateFieldInput>>;
  delete?: InputMaybe<Array<UriIpsDeleteFieldInput>>;
  disconnect?: InputMaybe<Array<UriIpsDisconnectFieldInput>>;
  update?: InputMaybe<UriIpsUpdateConnectionInput>;
  where?: InputMaybe<UriIpsConnectionWhere>;
};

export type UriOptions = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  /**
   * Specify one or more URISort objects to sort Uris by. The sorts will be applied
   * in the order in which they are arranged in the array.
   */
  sort?: InputMaybe<Array<UriSort>>;
};

export type UriRelationInput = {
  ips?: InputMaybe<Array<UriIpsCreateFieldInput>>;
};

/**
 * Fields to sort Uris by. The order in which sorts are applied is not guaranteed
 * when specifying many fields in one URISort object.
 */
export type UriSort = {
  _id?: InputMaybe<SortDirection>;
  identifier?: InputMaybe<SortDirection>;
};

export type UriUpdateInput = {
  identifier?: InputMaybe<Scalars['String']['input']>;
  ips?: InputMaybe<Array<UriIpsUpdateFieldInput>>;
};

export type UriWhere = {
  AND?: InputMaybe<Array<UriWhere>>;
  NOT?: InputMaybe<UriWhere>;
  OR?: InputMaybe<Array<UriWhere>>;
  _id?: InputMaybe<Scalars['ID']['input']>;
  _id_CONTAINS?: InputMaybe<Scalars['ID']['input']>;
  _id_ENDS_WITH?: InputMaybe<Scalars['ID']['input']>;
  _id_IN?: InputMaybe<Array<Scalars['ID']['input']>>;
  _id_STARTS_WITH?: InputMaybe<Scalars['ID']['input']>;
  identifier?: InputMaybe<Scalars['String']['input']>;
  identifier_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  identifier_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  identifier_IN?: InputMaybe<Array<Scalars['String']['input']>>;
  identifier_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
  ipsAggregate?: InputMaybe<UriIpsAggregateInput>;
  /** Return URIS where all of the related URIIpsConnections match this filter */
  ipsConnection_ALL?: InputMaybe<UriIpsConnectionWhere>;
  /** Return URIS where none of the related URIIpsConnections match this filter */
  ipsConnection_NONE?: InputMaybe<UriIpsConnectionWhere>;
  /** Return URIS where one of the related URIIpsConnections match this filter */
  ipsConnection_SINGLE?: InputMaybe<UriIpsConnectionWhere>;
  /** Return URIS where some of the related URIIpsConnections match this filter */
  ipsConnection_SOME?: InputMaybe<UriIpsConnectionWhere>;
  /** Return URIS where all of the related IPS match this filter */
  ips_ALL?: InputMaybe<IpWhere>;
  /** Return URIS where none of the related IPS match this filter */
  ips_NONE?: InputMaybe<IpWhere>;
  /** Return URIS where one of the related IPS match this filter */
  ips_SINGLE?: InputMaybe<IpWhere>;
  /** Return URIS where some of the related IPS match this filter */
  ips_SOME?: InputMaybe<IpWhere>;
};

export type UpdateApplicationsMutationResponse = {
  __typename?: 'UpdateApplicationsMutationResponse';
  applications: Array<Application>;
  info: UpdateInfo;
};

export type UpdateComponentsMutationResponse = {
  __typename?: 'UpdateComponentsMutationResponse';
  components: Array<Component>;
  info: UpdateInfo;
};

export type UpdateContactsMutationResponse = {
  __typename?: 'UpdateContactsMutationResponse';
  contacts: Array<Contact>;
  info: UpdateInfo;
};

export type UpdateCvesMutationResponse = {
  __typename?: 'UpdateCvesMutationResponse';
  cves: Array<Cve>;
  info: UpdateInfo;
};

export type UpdateCvsSv2sMutationResponse = {
  __typename?: 'UpdateCvsSv2sMutationResponse';
  cvsSv2s: Array<CvsSv2>;
  info: UpdateInfo;
};

export type UpdateCvsSv30sMutationResponse = {
  __typename?: 'UpdateCvsSv30sMutationResponse';
  cvsSv30s: Array<CvsSv30>;
  info: UpdateInfo;
};

export type UpdateCvsSv31sMutationResponse = {
  __typename?: 'UpdateCvsSv31sMutationResponse';
  cvsSv31s: Array<CvsSv31>;
  info: UpdateInfo;
};

export type UpdateCvsSv40sMutationResponse = {
  __typename?: 'UpdateCvsSv40sMutationResponse';
  cvsSv40s: Array<CvsSv40>;
  info: UpdateInfo;
};

export type UpdateDevicesMutationResponse = {
  __typename?: 'UpdateDevicesMutationResponse';
  devices: Array<Device>;
  info: UpdateInfo;
};

export type UpdateDomainNamesMutationResponse = {
  __typename?: 'UpdateDomainNamesMutationResponse';
  domainNames: Array<DomainName>;
  info: UpdateInfo;
};

export type UpdateHardwareVersionsMutationResponse = {
  __typename?: 'UpdateHardwareVersionsMutationResponse';
  hardwareVersions: Array<HardwareVersion>;
  info: UpdateInfo;
};

export type UpdateHostsMutationResponse = {
  __typename?: 'UpdateHostsMutationResponse';
  hosts: Array<Host>;
  info: UpdateInfo;
};

/** Information about the number of nodes and relationships created and deleted during an update mutation */
export type UpdateInfo = {
  __typename?: 'UpdateInfo';
  /** @deprecated This field has been deprecated because bookmarks are now handled by the driver. */
  bookmark?: Maybe<Scalars['String']['output']>;
  nodesCreated: Scalars['Int']['output'];
  nodesDeleted: Scalars['Int']['output'];
  relationshipsCreated: Scalars['Int']['output'];
  relationshipsDeleted: Scalars['Int']['output'];
};

export type UpdateIpsMutationResponse = {
  __typename?: 'UpdateIpsMutationResponse';
  info: UpdateInfo;
  ips: Array<Ip>;
};

export type UpdateMissionDependenciesMutationResponse = {
  __typename?: 'UpdateMissionDependenciesMutationResponse';
  info: UpdateInfo;
  missionDependencies: Array<MissionDependency>;
};

export type UpdateMissionsMutationResponse = {
  __typename?: 'UpdateMissionsMutationResponse';
  info: UpdateInfo;
  missions: Array<Mission>;
};

export type UpdateNetworkServicesMutationResponse = {
  __typename?: 'UpdateNetworkServicesMutationResponse';
  info: UpdateInfo;
  networkServices: Array<NetworkService>;
};

export type UpdateNodeObjectsMutationResponse = {
  __typename?: 'UpdateNodeObjectsMutationResponse';
  info: UpdateInfo;
  nodeObjects: Array<NodeObject>;
};

export type UpdateOrganizationUnitsMutationResponse = {
  __typename?: 'UpdateOrganizationUnitsMutationResponse';
  info: UpdateInfo;
  organizationUnits: Array<OrganizationUnit>;
};

export type UpdatePhysicalEnvironmentsMutationResponse = {
  __typename?: 'UpdatePhysicalEnvironmentsMutationResponse';
  info: UpdateInfo;
  physicalEnvironments: Array<PhysicalEnvironment>;
};

export type UpdateSoftwareVersionsMutationResponse = {
  __typename?: 'UpdateSoftwareVersionsMutationResponse';
  info: UpdateInfo;
  softwareVersions: Array<SoftwareVersion>;
};

export type UpdateSubnetsMutationResponse = {
  __typename?: 'UpdateSubnetsMutationResponse';
  info: UpdateInfo;
  subnets: Array<Subnet>;
};

export type UpdateUrisMutationResponse = {
  __typename?: 'UpdateUrisMutationResponse';
  info: UpdateInfo;
  uris: Array<Uri>;
};

export type UpdateVulnerabilitiesMutationResponse = {
  __typename?: 'UpdateVulnerabilitiesMutationResponse';
  info: UpdateInfo;
  vulnerabilities: Array<Vulnerability>;
};

export type UrisConnection = {
  __typename?: 'UrisConnection';
  edges: Array<UriEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type VulnerabilitiesConnection = {
  __typename?: 'VulnerabilitiesConnection';
  edges: Array<VulnerabilityEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type Vulnerability = {
  __typename?: 'Vulnerability';
  _id: Scalars['ID']['output'];
  cve?: Maybe<Cve>;
  cveAggregate?: Maybe<VulnerabilityCveCveAggregationSelection>;
  cveConnection: VulnerabilityCveConnection;
  description: Scalars['String']['output'];
  software_versions: Array<SoftwareVersion>;
  software_versionsAggregate?: Maybe<VulnerabilitySoftwareVersionSoftware_VersionsAggregationSelection>;
  software_versionsConnection: VulnerabilitySoftware_VersionsConnection;
  status?: Maybe<Array<Scalars['String']['output']>>;
};

export type VulnerabilityCveArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  options?: InputMaybe<CveOptions>;
  where?: InputMaybe<CveWhere>;
};

export type VulnerabilityCveAggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<CveWhere>;
};

export type VulnerabilityCveConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<VulnerabilityCveConnectionSort>>;
  where?: InputMaybe<VulnerabilityCveConnectionWhere>;
};

export type VulnerabilitySoftware_VersionsArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  options?: InputMaybe<SoftwareVersionOptions>;
  where?: InputMaybe<SoftwareVersionWhere>;
};

export type VulnerabilitySoftware_VersionsAggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<SoftwareVersionWhere>;
};

export type VulnerabilitySoftware_VersionsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<VulnerabilitySoftware_VersionsConnectionSort>>;
  where?: InputMaybe<VulnerabilitySoftware_VersionsConnectionWhere>;
};

export type VulnerabilityAggregateSelection = {
  __typename?: 'VulnerabilityAggregateSelection';
  count: Scalars['Int']['output'];
  description: StringAggregateSelection;
};

export type VulnerabilityCveCveAggregationSelection = {
  __typename?: 'VulnerabilityCVECveAggregationSelection';
  count: Scalars['Int']['output'];
  node?: Maybe<VulnerabilityCveCveNodeAggregateSelection>;
};

export type VulnerabilityCveCveNodeAggregateSelection = {
  __typename?: 'VulnerabilityCVECveNodeAggregateSelection';
  cve_id: StringAggregateSelection;
  description: StringAggregateSelection;
  last_modified: StringAggregateSelection;
  published: StringAggregateSelection;
};

export type VulnerabilityConnectInput = {
  cve?: InputMaybe<VulnerabilityCveConnectFieldInput>;
  software_versions?: InputMaybe<
    Array<VulnerabilitySoftware_VersionsConnectFieldInput>
  >;
};

export type VulnerabilityConnectWhere = {
  node: VulnerabilityWhere;
};

export type VulnerabilityCreateInput = {
  cve?: InputMaybe<VulnerabilityCveFieldInput>;
  description: Scalars['String']['input'];
  software_versions?: InputMaybe<VulnerabilitySoftware_VersionsFieldInput>;
  status?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type VulnerabilityCveAggregateInput = {
  AND?: InputMaybe<Array<VulnerabilityCveAggregateInput>>;
  NOT?: InputMaybe<VulnerabilityCveAggregateInput>;
  OR?: InputMaybe<Array<VulnerabilityCveAggregateInput>>;
  count?: InputMaybe<Scalars['Int']['input']>;
  count_GT?: InputMaybe<Scalars['Int']['input']>;
  count_GTE?: InputMaybe<Scalars['Int']['input']>;
  count_LT?: InputMaybe<Scalars['Int']['input']>;
  count_LTE?: InputMaybe<Scalars['Int']['input']>;
  node?: InputMaybe<VulnerabilityCveNodeAggregationWhereInput>;
};

export type VulnerabilityCveConnectFieldInput = {
  connect?: InputMaybe<CveConnectInput>;
  /** Whether or not to overwrite any matching relationship with the new properties. */
  overwrite?: Scalars['Boolean']['input'];
  where?: InputMaybe<CveConnectWhere>;
};

export type VulnerabilityCveConnection = {
  __typename?: 'VulnerabilityCveConnection';
  edges: Array<VulnerabilityCveRelationship>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type VulnerabilityCveConnectionSort = {
  node?: InputMaybe<CveSort>;
};

export type VulnerabilityCveConnectionWhere = {
  AND?: InputMaybe<Array<VulnerabilityCveConnectionWhere>>;
  NOT?: InputMaybe<VulnerabilityCveConnectionWhere>;
  OR?: InputMaybe<Array<VulnerabilityCveConnectionWhere>>;
  node?: InputMaybe<CveWhere>;
};

export type VulnerabilityCveCreateFieldInput = {
  node: CveCreateInput;
};

export type VulnerabilityCveDeleteFieldInput = {
  delete?: InputMaybe<CveDeleteInput>;
  where?: InputMaybe<VulnerabilityCveConnectionWhere>;
};

export type VulnerabilityCveDisconnectFieldInput = {
  disconnect?: InputMaybe<CveDisconnectInput>;
  where?: InputMaybe<VulnerabilityCveConnectionWhere>;
};

export type VulnerabilityCveFieldInput = {
  connect?: InputMaybe<VulnerabilityCveConnectFieldInput>;
  create?: InputMaybe<VulnerabilityCveCreateFieldInput>;
};

export type VulnerabilityCveNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<VulnerabilityCveNodeAggregationWhereInput>>;
  NOT?: InputMaybe<VulnerabilityCveNodeAggregationWhereInput>;
  OR?: InputMaybe<Array<VulnerabilityCveNodeAggregationWhereInput>>;
  cve_id_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  cve_id_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  cve_id_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  cve_id_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  cve_id_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  cve_id_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  cve_id_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  cve_id_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  cve_id_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  cve_id_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  cve_id_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  cve_id_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  cve_id_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  cve_id_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  cve_id_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  description_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  description_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  description_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  description_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  description_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  description_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  description_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  description_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  description_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  description_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  description_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  description_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  description_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  description_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  description_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  last_modified_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  last_modified_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  last_modified_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  last_modified_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  last_modified_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  last_modified_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  last_modified_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  last_modified_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  last_modified_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  last_modified_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  last_modified_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  last_modified_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  last_modified_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  last_modified_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  last_modified_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  published_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  published_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  published_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  published_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  published_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  published_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  published_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  published_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  published_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  published_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  published_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  published_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  published_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  published_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  published_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
};

export type VulnerabilityCveRelationship = {
  __typename?: 'VulnerabilityCveRelationship';
  cursor: Scalars['String']['output'];
  node: Cve;
};

export type VulnerabilityCveUpdateConnectionInput = {
  node?: InputMaybe<CveUpdateInput>;
};

export type VulnerabilityCveUpdateFieldInput = {
  connect?: InputMaybe<VulnerabilityCveConnectFieldInput>;
  create?: InputMaybe<VulnerabilityCveCreateFieldInput>;
  delete?: InputMaybe<VulnerabilityCveDeleteFieldInput>;
  disconnect?: InputMaybe<VulnerabilityCveDisconnectFieldInput>;
  update?: InputMaybe<VulnerabilityCveUpdateConnectionInput>;
  where?: InputMaybe<VulnerabilityCveConnectionWhere>;
};

export type VulnerabilityDeleteInput = {
  cve?: InputMaybe<VulnerabilityCveDeleteFieldInput>;
  software_versions?: InputMaybe<
    Array<VulnerabilitySoftware_VersionsDeleteFieldInput>
  >;
};

export type VulnerabilityDisconnectInput = {
  cve?: InputMaybe<VulnerabilityCveDisconnectFieldInput>;
  software_versions?: InputMaybe<
    Array<VulnerabilitySoftware_VersionsDisconnectFieldInput>
  >;
};

export type VulnerabilityEdge = {
  __typename?: 'VulnerabilityEdge';
  cursor: Scalars['String']['output'];
  node: Vulnerability;
};

export type VulnerabilityOptions = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  /**
   * Specify one or more VulnerabilitySort objects to sort Vulnerabilities by. The
   * sorts will be applied in the order in which they are arranged in the array.
   */
  sort?: InputMaybe<Array<VulnerabilitySort>>;
};

export type VulnerabilityRelationInput = {
  cve?: InputMaybe<VulnerabilityCveCreateFieldInput>;
  software_versions?: InputMaybe<
    Array<VulnerabilitySoftware_VersionsCreateFieldInput>
  >;
};

export type VulnerabilitySoftwareVersionSoftware_VersionsAggregationSelection =
  {
    __typename?: 'VulnerabilitySoftwareVersionSoftware_versionsAggregationSelection';
    count: Scalars['Int']['output'];
    node?: Maybe<VulnerabilitySoftwareVersionSoftware_VersionsNodeAggregateSelection>;
  };

export type VulnerabilitySoftwareVersionSoftware_VersionsNodeAggregateSelection =
  {
    __typename?: 'VulnerabilitySoftwareVersionSoftware_versionsNodeAggregateSelection';
    version: StringAggregateSelection;
  };

export type VulnerabilitySoftware_VersionsAggregateInput = {
  AND?: InputMaybe<Array<VulnerabilitySoftware_VersionsAggregateInput>>;
  NOT?: InputMaybe<VulnerabilitySoftware_VersionsAggregateInput>;
  OR?: InputMaybe<Array<VulnerabilitySoftware_VersionsAggregateInput>>;
  count?: InputMaybe<Scalars['Int']['input']>;
  count_GT?: InputMaybe<Scalars['Int']['input']>;
  count_GTE?: InputMaybe<Scalars['Int']['input']>;
  count_LT?: InputMaybe<Scalars['Int']['input']>;
  count_LTE?: InputMaybe<Scalars['Int']['input']>;
  node?: InputMaybe<VulnerabilitySoftware_VersionsNodeAggregationWhereInput>;
};

export type VulnerabilitySoftware_VersionsConnectFieldInput = {
  connect?: InputMaybe<Array<SoftwareVersionConnectInput>>;
  /** Whether or not to overwrite any matching relationship with the new properties. */
  overwrite?: Scalars['Boolean']['input'];
  where?: InputMaybe<SoftwareVersionConnectWhere>;
};

export type VulnerabilitySoftware_VersionsConnection = {
  __typename?: 'VulnerabilitySoftware_versionsConnection';
  edges: Array<VulnerabilitySoftware_VersionsRelationship>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type VulnerabilitySoftware_VersionsConnectionSort = {
  node?: InputMaybe<SoftwareVersionSort>;
};

export type VulnerabilitySoftware_VersionsConnectionWhere = {
  AND?: InputMaybe<Array<VulnerabilitySoftware_VersionsConnectionWhere>>;
  NOT?: InputMaybe<VulnerabilitySoftware_VersionsConnectionWhere>;
  OR?: InputMaybe<Array<VulnerabilitySoftware_VersionsConnectionWhere>>;
  node?: InputMaybe<SoftwareVersionWhere>;
};

export type VulnerabilitySoftware_VersionsCreateFieldInput = {
  node: SoftwareVersionCreateInput;
};

export type VulnerabilitySoftware_VersionsDeleteFieldInput = {
  delete?: InputMaybe<SoftwareVersionDeleteInput>;
  where?: InputMaybe<VulnerabilitySoftware_VersionsConnectionWhere>;
};

export type VulnerabilitySoftware_VersionsDisconnectFieldInput = {
  disconnect?: InputMaybe<SoftwareVersionDisconnectInput>;
  where?: InputMaybe<VulnerabilitySoftware_VersionsConnectionWhere>;
};

export type VulnerabilitySoftware_VersionsFieldInput = {
  connect?: InputMaybe<Array<VulnerabilitySoftware_VersionsConnectFieldInput>>;
  create?: InputMaybe<Array<VulnerabilitySoftware_VersionsCreateFieldInput>>;
};

export type VulnerabilitySoftware_VersionsNodeAggregationWhereInput = {
  AND?: InputMaybe<
    Array<VulnerabilitySoftware_VersionsNodeAggregationWhereInput>
  >;
  NOT?: InputMaybe<VulnerabilitySoftware_VersionsNodeAggregationWhereInput>;
  OR?: InputMaybe<
    Array<VulnerabilitySoftware_VersionsNodeAggregationWhereInput>
  >;
  version_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  version_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  version_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  version_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  version_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  version_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  version_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  version_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  version_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  version_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  version_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  version_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  version_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  version_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  version_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
};

export type VulnerabilitySoftware_VersionsRelationship = {
  __typename?: 'VulnerabilitySoftware_versionsRelationship';
  cursor: Scalars['String']['output'];
  node: SoftwareVersion;
};

export type VulnerabilitySoftware_VersionsUpdateConnectionInput = {
  node?: InputMaybe<SoftwareVersionUpdateInput>;
};

export type VulnerabilitySoftware_VersionsUpdateFieldInput = {
  connect?: InputMaybe<Array<VulnerabilitySoftware_VersionsConnectFieldInput>>;
  create?: InputMaybe<Array<VulnerabilitySoftware_VersionsCreateFieldInput>>;
  delete?: InputMaybe<Array<VulnerabilitySoftware_VersionsDeleteFieldInput>>;
  disconnect?: InputMaybe<
    Array<VulnerabilitySoftware_VersionsDisconnectFieldInput>
  >;
  update?: InputMaybe<VulnerabilitySoftware_VersionsUpdateConnectionInput>;
  where?: InputMaybe<VulnerabilitySoftware_VersionsConnectionWhere>;
};

/**
 * Fields to sort Vulnerabilities by. The order in which sorts are applied is not
 * guaranteed when specifying many fields in one VulnerabilitySort object.
 */
export type VulnerabilitySort = {
  _id?: InputMaybe<SortDirection>;
  description?: InputMaybe<SortDirection>;
};

export type VulnerabilityUpdateInput = {
  cve?: InputMaybe<VulnerabilityCveUpdateFieldInput>;
  description?: InputMaybe<Scalars['String']['input']>;
  software_versions?: InputMaybe<
    Array<VulnerabilitySoftware_VersionsUpdateFieldInput>
  >;
  status?: InputMaybe<Array<Scalars['String']['input']>>;
  status_POP?: InputMaybe<Scalars['Int']['input']>;
  status_PUSH?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type VulnerabilityWhere = {
  AND?: InputMaybe<Array<VulnerabilityWhere>>;
  NOT?: InputMaybe<VulnerabilityWhere>;
  OR?: InputMaybe<Array<VulnerabilityWhere>>;
  _id?: InputMaybe<Scalars['ID']['input']>;
  _id_CONTAINS?: InputMaybe<Scalars['ID']['input']>;
  _id_ENDS_WITH?: InputMaybe<Scalars['ID']['input']>;
  _id_IN?: InputMaybe<Array<Scalars['ID']['input']>>;
  _id_STARTS_WITH?: InputMaybe<Scalars['ID']['input']>;
  cve?: InputMaybe<CveWhere>;
  cveAggregate?: InputMaybe<VulnerabilityCveAggregateInput>;
  cveConnection?: InputMaybe<VulnerabilityCveConnectionWhere>;
  cveConnection_NOT?: InputMaybe<VulnerabilityCveConnectionWhere>;
  cve_NOT?: InputMaybe<CveWhere>;
  description?: InputMaybe<Scalars['String']['input']>;
  description_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  description_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  description_IN?: InputMaybe<Array<Scalars['String']['input']>>;
  description_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
  software_versionsAggregate?: InputMaybe<VulnerabilitySoftware_VersionsAggregateInput>;
  /** Return Vulnerabilities where all of the related VulnerabilitySoftware_versionsConnections match this filter */
  software_versionsConnection_ALL?: InputMaybe<VulnerabilitySoftware_VersionsConnectionWhere>;
  /** Return Vulnerabilities where none of the related VulnerabilitySoftware_versionsConnections match this filter */
  software_versionsConnection_NONE?: InputMaybe<VulnerabilitySoftware_VersionsConnectionWhere>;
  /** Return Vulnerabilities where one of the related VulnerabilitySoftware_versionsConnections match this filter */
  software_versionsConnection_SINGLE?: InputMaybe<VulnerabilitySoftware_VersionsConnectionWhere>;
  /** Return Vulnerabilities where some of the related VulnerabilitySoftware_versionsConnections match this filter */
  software_versionsConnection_SOME?: InputMaybe<VulnerabilitySoftware_VersionsConnectionWhere>;
  /** Return Vulnerabilities where all of the related SoftwareVersions match this filter */
  software_versions_ALL?: InputMaybe<SoftwareVersionWhere>;
  /** Return Vulnerabilities where none of the related SoftwareVersions match this filter */
  software_versions_NONE?: InputMaybe<SoftwareVersionWhere>;
  /** Return Vulnerabilities where one of the related SoftwareVersions match this filter */
  software_versions_SINGLE?: InputMaybe<SoftwareVersionWhere>;
  /** Return Vulnerabilities where some of the related SoftwareVersions match this filter */
  software_versions_SOME?: InputMaybe<SoftwareVersionWhere>;
  status?: InputMaybe<Array<Scalars['String']['input']>>;
  status_INCLUDES?: InputMaybe<Scalars['String']['input']>;
};
