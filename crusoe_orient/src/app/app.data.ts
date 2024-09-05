export interface Issue {
  name: string;
  severity: string;
  status: string;
  affected_entity: string;
  description: string;
  last_seen: Date;
  impact: string;
}

export interface IssueDetail {
  affectedAsset: string;
  description: string;
  software: string;
  vulnerabilityCount: number;
}
