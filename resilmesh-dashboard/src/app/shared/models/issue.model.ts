export interface Issue {
    name: string;
    severity: string;
    status: string;
    affected_entity: string;
    description: string;
    last_seen: Date | null;
    impact: string;
}

export interface IPNode {
    _id: string;
    address: string;
    __typename: string;
}