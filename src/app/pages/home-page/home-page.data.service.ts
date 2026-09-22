import { DestroyRef, Injectable, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { combineLatest } from 'rxjs';
import { Subnet } from '../../models/vulnerability.model';
import {
  HomePageGetSubnetsQueryService,
  HomePageGetOrgUnitsQueryService,
  HomePageGetIPsQueryService,
  HomePageGetNodeObjectsQueryService,
  HomePageGetMissionsQueryService,
  HomePageGetVulnerabilitiesQueryService,
  HomePageGetHostsQueryService,
} from './graphql/home-page.operation.generated';

const MAX_OS_SLICES = 8;

@Injectable({
  providedIn: 'root',
})
export class HomePageDataService {
  subnets = signal(<Subnet[]>[]);
  orgUnits = signal(<{ name: string }[]>[]);
  ipCount = signal(0);
  csaNodesCount = signal(0);
  missionsCount = signal(0);
  vulnerabilityChartData = signal<{ name: string; value: number }[]>([]);
  osChartData = signal<{ name: string; value: number }[]>([]);

  constructor(
    private getSubnets: HomePageGetSubnetsQueryService,
    private getOrgUnits: HomePageGetOrgUnitsQueryService,
    private getIPs: HomePageGetIPsQueryService,
    private getNodeObjects: HomePageGetNodeObjectsQueryService,
    private getMissions: HomePageGetMissionsQueryService,
    private getVulnerabilities: HomePageGetVulnerabilitiesQueryService,
    private getHosts: HomePageGetHostsQueryService,
  ) {}

  fetchData(destroyRef: DestroyRef) {
    combineLatest([
      this.getSubnets.fetch({}, { fetchPolicy: 'network-only' }),
      this.getOrgUnits.fetch({}, { fetchPolicy: 'network-only' }),
      this.getIPs.fetch({}, { fetchPolicy: 'network-only' }),
      this.getNodeObjects.fetch({}, { fetchPolicy: 'network-only' }),
      this.getMissions.fetch({}, { fetchPolicy: 'network-only' }),
      this.getVulnerabilities.fetch({}, { fetchPolicy: 'network-only' }),
      this.getHosts.fetch({}, { fetchPolicy: 'network-only' }),
    ])
      .pipe(takeUntilDestroyed(destroyRef))
      .subscribe({
        next: ([subnetsResult, orgUnitsResult, ipsResult, nodesResult, missionsResult, vulnsResult, hostsResult]) => {
          this.subnets.set(subnetsResult.data.subnets as Subnet[]);
          this.orgUnits.set(orgUnitsResult.data.organizationUnits);
          this.ipCount.set(ipsResult.data.ips.length);
          this.csaNodesCount.set(nodesResult.data.nodeObjects.length);
          this.missionsCount.set(missionsResult.data.missions.length);

          const severityCountMap: Record<string, number> = {};
          vulnsResult.data.cves.forEach((cve) => {
            // The API stores severities uppercase ('CRITICAL'); the chart's customColors
            // are keyed lowercase, so they only apply once the name is normalised.
            const severity = cve.cvss_v31?.base_severity?.toLowerCase() ?? 'unknown';
            severityCountMap[severity] = (severityCountMap[severity] ?? 0) + 1;
          });
          this.vulnerabilityChartData.set(
            Object.entries(severityCountMap).map(([name, value]) => ({
              name,
              value,
            })),
          );

          const osCountMap: Record<string, number> = {};
          hostsResult.data.hosts.forEach((host) => {
            host.software_versions.forEach((sv) => {
              if (sv.version.startsWith('cpe:2.3:o')) {
                osCountMap[sv.version] = (osCountMap[sv.version] ?? 0) + 1;
              }
            });
          });
          // One slice per distinct OS CPE would put hundreds of rows in the legend on a
          // large estate, so only the most common ones are charted individually.
          const osEntries = Object.entries(osCountMap)
            .map(([name, value]) => ({
              name: name.split('cpe:2.3:o:')[1],
              value,
            }))
            .sort((a, b) => b.value - a.value);

          const otherCount = osEntries.slice(MAX_OS_SLICES).reduce((acc, os) => acc + os.value, 0);
          this.osChartData.set(
            otherCount > 0 ? [...osEntries.slice(0, MAX_OS_SLICES), { name: 'Other', value: otherCount }] : osEntries,
          );
        },
      });
  }
}
