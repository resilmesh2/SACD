/**
 * In GraphQL there is no such thing as "get all neighbours" using special character e.g. *.
 * Therefore, we have to manually define all attributes we want to fetch, in case we need to fetch "all neighbours".
 */
export const Attributes = {
  IP: `
    _id
    address
    domain_names {
      _id
      domain_name
    }
    subnets {
      _id
      range
      note
    }
    nodes {
      _id
      __typename
      host {
        _id
        network_services {
          _id
          port
          protocol
          service
          
        }
        software_versions {
          _id
          tag
          version
          vulnerabilities {
            description
            cve {
              CVE_id
            }
          }
        }
        components {
          _id
          name
          missions {
            _id
            name
          }
        }
      }
    }
    `,
  DomainName: `
      _id
      domain_name
      tag
  `,
};
