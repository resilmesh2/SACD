import { Injectable } from "@angular/core";
import { Apollo, gql } from "apollo-angular";
import { map, Observable, take } from "rxjs";
import { CSANode } from "../csa-page/csa-page.component";

@Injectable({
  providedIn: 'root',
})
export class HomePageDataService {
    constructor(private apollo: Apollo) {}

    public getSubnetsMinimal(): Observable<number> {
        return this.apollo
        .query<any>({
            query: gql`
            {
                subnets {
                    note,
                    range,
                }
            }
        `,
        })
        .pipe(
            map((response) => {
                return response.data.subnets.length;
            }),
            take(1)
        );
    }

    public getOrgUnitsMinimal(): Observable<{name: string}[]> {
        return this.apollo
        .query<any>({
            query: gql`
            {
                organizationUnits {
                    name
                },
            }
        `,
        })
        .pipe(
            map((response) => {
            return response.data.organizationUnits;
            })
        );
    }

    public getIPCount(): Observable<number> {
        return this.apollo
        .query<any>({
            query: gql`
            {
                ips {
                    _id
                },
            }
        `,
        })
        .pipe(
            map((response) => {
                return response.data.ips.length;
            })
        );
    }

    public getVulnerabilityCounts(): Observable<{name: string, value: number}[]> {
        return this.apollo
        .query<any>({
            query: gql`
            {
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
      } `,
        })
        .pipe(
            map((response) => {
                const severityCountMap: { [key: string]: number } = {};
                const cves = response.data.cves;
                
                cves.forEach((cve: any) => {
                    const severity = cve.cvss_v31?.base_severity || 'unknown';
                    if (severityCountMap[severity]) {
                        severityCountMap[severity]++;
                    } else {
                        severityCountMap[severity] = 1;
                    }
                });
                
                return Object.entries(severityCountMap).map(([severity, count]) => ({
                    name: severity,
                    value: count
                }));
            })
        );
    }

    public getCSANodesCount(): Observable<number> {
        return this.apollo
            .query<any>({
                query: gql`
                {
                    nodeObjects {
                        _id
                    }
                }
                `,
                })
                .pipe(
                map((response) => {
                    console.log(response);
                    return response.data.nodeObjects.length;
                })
        );
    }

  public getMissionsCount(): Observable<number> {
    return this.apollo
      .query<any>({
        query: gql`
          {
            missions {
              name
            }
          }
        `,
      })
      .pipe(
        map((data) => {
          return data.data.missions.length;
        })
      );
  }

  public getOSData(): Observable<any[]> {
    return this.apollo
      .query<any>({
        query: gql`
          {
            hosts {
                software_versions {
                    version
                }
            }
          }
        `,
      })
      .pipe(
        map((data) => {
            const osCountMap: { [key: string]: number } = {};
            const hosts = data.data.hosts;

            hosts.forEach((host: any) => {
                host.software_versions.forEach((version: any) => {
                    if (version.version.startsWith('cpe:2.3:o')) {
                        osCountMap[version.version] = (osCountMap[version.version] || 0) + 1;
                    }
                });
            });

            return Object.entries(osCountMap).map(([name, value]) => ({ 
                name: name.split('cpe:2.3:o:')[1], 
                value 
            })).sort((a, b) => b.value - a.value);
        })
      );
  }

}