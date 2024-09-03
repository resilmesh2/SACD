export interface Issue {
  name: string;
  severity: string;
  status: string;
  affected_entity: string;
  description: string;
  last_seen: Date;
}

export interface IssueDetail {
  name: string;
  severity: string;
  status: string;
  affectedAssets: string[];
  description: string;
  software: string;
  vulnerabilityCount: int;
}
