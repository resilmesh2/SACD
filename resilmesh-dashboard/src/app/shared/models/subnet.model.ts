export interface SubnetExtendedData {
  _id: string;
  note: string;
  range: string;
  org_units: string[];
  contacts: string[];
  parent_subnet: { note?: string, range: string } | null;
}