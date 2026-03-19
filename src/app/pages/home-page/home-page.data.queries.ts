import { gql } from 'apollo-angular';

export const QUERIES = {
  GET_SUBNETS: gql`
    query GetSubnets {
      subnets {
        note
        range
      }
    }
  `,
  GET_ORG_UNITS: gql`
    query GetOrgUnits {
      organizationUnits {
        name
      }
    }
  `,
  GET_IPS: gql`
    query GetIPs {
      ips {
        _id
      }
    }
  `,
  GET_CSA_NODES: gql`
    query GetCSANodes {
      nodeObjects {
        _id
      }
    }
  `,
  GET_MISSIONS: gql`
    query GetMissions {
      missions {
        _id
      }
    }
  `,
  GET_VULNERABILITIES: gql`
    query GetVulnerabilities {
      cves {
        cve_id
        cvss_v2 {
          base_severity
        }
        cvss_v30 {
          base_severity
        }
        cvss_v31 {
          base_severity
        }
        cvss_v40 {
          base_severity
        }
      }
    }
  `,
  GET_OS_DATA: gql`
    query GetOSData {
      hosts {
        software_versions {
          version
        }
      }
    }
  `,
};
