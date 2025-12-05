export interface Issue {
    name: string;
    severity: string;
    status: string[];
    description: string;
    last_seen: Date | null;
    impact?: string; // Optional field for impact, can be added later
    isEditOpen?: boolean; // Optional field to track if the edit overlay is open
}

export interface IPNode {
    _id: string;
    address: string;
    __typename: string;
}