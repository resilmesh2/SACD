import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { IP } from './flow-editor.component';
import {
  MissionEditorGetHostsQueryService,
  MissionEditorGetIPsQueryService,
  MissionEditorGetComponentsQueryService,
} from '../graphql/mission-editor-page.operation.generated';

@Injectable({
  providedIn: 'root',
})
export class ExistingNodeService {
  constructor(
    private getHostsService: MissionEditorGetHostsQueryService,
    private getIPsService: MissionEditorGetIPsQueryService,
    private getComponentsService: MissionEditorGetComponentsQueryService,
  ) {}

  public getHosts(): Observable<string[]> {
    return this.getHostsService.fetch({}, { fetchPolicy: 'network-only' }).pipe(
      map((result) =>
        result.data.hosts
          .map((host) => host.hostname ?? '')
          .filter((hostname) => hostname.length > 0)
          .sort((a, b) => a.localeCompare(b)),
      ),
    );
  }

  public getIPs(): Observable<IP[]> {
    return this.getIPsService.fetch({}, { fetchPolicy: 'network-only' }).pipe(
      map(
        (result) =>
          result.data.ips
            .filter((ip) => ip.address && ip.address.length > 0)
            .sort(
              (a, b) =>
                a.address
                  .split('.')
                  .map((n) => parseInt(n, 10))
                  .reduce((acc, n) => acc * 256 + n, 0) -
                b.address
                  .split('.')
                  .map((n) => parseInt(n, 10))
                  .reduce((acc, n) => acc * 256 + n, 0),
            ) as unknown as IP[],
      ),
    );
  }

  public getMissionComponents(): Observable<string[]> {
    return this.getComponentsService.fetch({}, { fetchPolicy: 'network-only' }).pipe(
      map((result) =>
        result.data.components
          .map((component) => component.name)
          .filter((name) => name && name.length > 0)
          .sort((a, b) => a.localeCompare(b)),
      ),
    );
  }
}
