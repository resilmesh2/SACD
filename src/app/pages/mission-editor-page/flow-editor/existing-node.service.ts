import { Injectable } from "@angular/core";
import { Apollo, gql } from "apollo-angular";
import { map, Observable } from "rxjs";
import { IP } from "../../asset-page/asset-page.component";

@Injectable({
  providedIn: 'root',
})
export class ExistingNodeService {
    constructor(private apollo: Apollo) {}

    public getHosts(): Observable<string[]> {
      return this.apollo
        .query<any>({
          query: gql`
          {
            hosts {
              hostname
            }
          }`
        })
        .pipe(
          map((response) => {
            if (response.data && response.data.hosts) {
                return response.data.hosts.map((host: any) => host.hostname)
                  .filter((hostname: string) => hostname && hostname.length > 0)
                  .sort((a: string, b: string) => a.localeCompare(b));
            }
            return [];
          })
        );
    }

    public getIPs(): Observable<IP[]> {
      return this.apollo
        .query<any>({
          query: gql`
          {
            ips {
              address
            }
          }
        `,
        })
        .pipe(
          map((response) => {
            return response.data.ips
              .filter((ip: IP) => ip.address && ip.address.length > 0)
              .sort((a: IP, b: IP) => 
                a.address.split('.').map(num => parseInt(num, 10)).reduce((acc, num) => acc * 256 + num, 0) - 
                b.address.split('.').map(num => parseInt(num, 10)).reduce((acc, num) => acc * 256 + num, 0)
              );
          })
        );
      }

    public getMissionComponents(): Observable<string[]> {
      return this.apollo
        .query<any>({
          query: gql`
          {
            components (where: { missionsAggregate: { count_GT: 0}}) {
                name
            }
        }`
        })
        .pipe(
          map((response) => {
            if (response.data && response.data.components) {
                return response.data.components.map((component: any) => component.name)
                  .filter((name: string) => name && name.length > 0)
                  .sort((a: string, b: string) => a.localeCompare(b));
            }
            return [];
          })
        );
    }
}