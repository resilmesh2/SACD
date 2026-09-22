import { DestroyRef, Injectable, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { combineLatest } from 'rxjs';
import {
  HomePageGetCountsQueryService,
  HomePageGetSeverityCountsQueryService,
  HomePageGetHostsQueryService,
} from './graphql/home-page.operation.generated';

const MAX_OS_SLICES = 8;

@Injectable({
  providedIn: 'root',
})
export class HomePageDataService {
  ipCount = signal(0);
  csaNodesCount = signal(0);
  missionsCount = signal(0);
  subnetCount = signal(0);
  orgUnitCount = signal(0);
  vulnerabilityChartData = signal<{ name: string; value: number }[]>([]);
  osChartData = signal<{ name: string; value: number }[]>([]);

  // Two independent streams, so the counts and the severity pie are not held back by the
  // OS breakdown - the only one that still has to read a whole collection.
  dashboardLoaded = signal(false);
  dashboardError = signal('');
  osChartLoaded = signal(false);
  osChartError = signal('');

  constructor(
    private getCounts: HomePageGetCountsQueryService,
    private getSeverityCounts: HomePageGetSeverityCountsQueryService,
    private getHosts: HomePageGetHostsQueryService,
  ) {}

  fetchData(destroyRef: DestroyRef) {
    this.fetchDashboard(destroyRef);
    this.fetchOsChart(destroyRef);
  }

  private fetchDashboard(destroyRef: DestroyRef) {
    this.dashboardLoaded.set(false);
    this.dashboardError.set('');

    combineLatest([
      this.getCounts.fetch({}, { fetchPolicy: 'network-only' }),
      this.getSeverityCounts.fetch({}, { fetchPolicy: 'network-only' }),
    ])
      .pipe(takeUntilDestroyed(destroyRef))
      .subscribe({
        next: ([countsResult, severityResult]) => {
          const counts = countsResult.data;
          this.ipCount.set(counts.ipsAggregate.count);
          this.csaNodesCount.set(counts.nodeObjectsAggregate.count);
          this.missionsCount.set(counts.missionsAggregate.count);
          this.subnetCount.set(counts.subnetsAggregate.count);
          this.orgUnitCount.set(counts.organizationUnitsAggregate.count);

          // Bucket names are lowercase to match the chart's customColors, and are the same
          // set the issue page offers, so clicking a slice always lands on a valid filter.
          const severities = severityResult.data;
          this.vulnerabilityChartData.set(
            [
              { name: 'critical', value: severities.critical.count },
              { name: 'high', value: severities.high.count },
              { name: 'medium', value: severities.medium.count },
              { name: 'low', value: severities.low.count },
              { name: 'unknown', value: severities.unknown.count },
            ].filter((bucket) => bucket.value > 0),
          );

          this.dashboardLoaded.set(true);
        },
        error: (error) => {
          this.dashboardError.set(error.message ?? String(error));
          this.dashboardLoaded.set(true);
        },
      });
  }

  private fetchOsChart(destroyRef: DestroyRef) {
    this.osChartLoaded.set(false);
    this.osChartError.set('');

    this.getHosts
      .fetch({}, { fetchPolicy: 'network-only' })
      .pipe(takeUntilDestroyed(destroyRef))
      .subscribe({
        next: (hostsResult) => {
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

          this.osChartLoaded.set(true);
        },
        error: (error) => {
          this.osChartError.set(error.message ?? String(error));
          this.osChartLoaded.set(true);
        },
      });
  }
}
