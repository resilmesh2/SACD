export interface OrgUnitData {
    name: string;
    parentOrgUnit: string | null;
    subnets: {
        range: string,
        parent?: string
    }[];
    contacts: string[];
}
