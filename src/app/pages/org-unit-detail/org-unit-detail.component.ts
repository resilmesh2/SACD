import { Component, DestroyRef, inject, OnInit, signal, ViewChild, WritableSignal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { EMPTY, Subject, Subscription } from 'rxjs';
import { catchError, startWith, switchMap } from 'rxjs/operators';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { SentinelButtonWithIconComponent } from '@sentinel/components/button-with-icon';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ORGANIZATION_PATH, SUBNETS_PATH, VULNERABILITY_PATH } from '../../paths';
import { InlineElementDirective, InlineElementsPreviewComponent } from '../../components/inline-elements-preview';
import { customOccupancyColors } from '../../config/customPieChartColors';
import { GetOrgUnitQuery, GetOrgUnitQueryService } from '../../graphql/org-units/org-units.operation.generated';
import { GetIPsPaginatedQueryService } from '../../graphql/subnets/subnets.operation.generated';
import { IpOptions, IpWhere } from '../../../generated/base-types';

type OrgUnit = GetOrgUnitQuery['organizationUnits'][0];

interface ChildIP {
  address: string;
  version?: number | null;
  subnet: string;
  affectedBy: string[];
  softwareVersion: string[];
}

@Component({
  selector: 'org-unit-detail',
  templateUrl: './org-unit-detail.component.html',
  styleUrls: ['./org-unit-detail.component.scss'],
  imports: [
    MatPaginatorModule,
    MatTableModule,
    MatIconModule,
    MatProgressSpinner,
    SentinelButtonWithIconComponent,
    NgxChartsModule,
    InlineElementsPreviewComponent,
    InlineElementDirective,
  ],
})
export class OrgUnitDetailComponent implements OnInit {
  dataSource = new MatTableDataSource<ChildIP>();
  displayedColumns: string[] = ['ip', 'subnet', 'softwareVersion', 'affectedBy'];

  private paginator: MatPaginator | null = null;
  private paginatorSub: Subscription | null = null;

  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    // Runs every time the paginator is (re)created, not just the first time -
    // the element it's on gets torn down and rebuilt whenever emptyResponse/errorResponse
    // flips, so the old subscription must be dropped and a fresh one attached each time.
    this.paginatorSub?.unsubscribe();
    this.paginator = mp ?? null;
    this.paginatorSub = mp
      ? mp.page.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => this.fetch$.next())
      : null;
  }

  orgUnitDetail: WritableSignal<OrgUnit | null> = signal(null);
  orgName: string = '';
  totalCount = 0;
  affectedCount = 0;
  pieChartData: WritableSignal<{ name: string; value: number }[]> = signal([]);
  customColors = customOccupancyColors;

  private readonly fetch$ = new Subject<void>();
  private destroyRef = inject(DestroyRef);
  private router = inject(Router);

  dataLoading = false;
  dataLoaded = false;
  emptyResponse = false;
  errorResponse = '';

  constructor(
    private route: ActivatedRoute,
    private getOrgUnit: GetOrgUnitQueryService,
    private getIPsPaginated: GetIPsPaginatedQueryService,
  ) {
    this.dataSource = new MatTableDataSource<ChildIP>([]);
  }

  ngOnInit(): void {
    this.dataLoading = true;
    this.route.paramMap.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((params) => {
      this.orgName = params.get('orgName') || '';
    });
    this.fetchOrgUnitDetail();

    this.fetch$
      .pipe(
        startWith(undefined as void),
        switchMap(() => {
          this.errorResponse = '';
          return this.getIPsPaginated
            .fetch(
              { where: this.buildWhere(), affectedWhere: this.buildAffectedWhere(), options: this.buildOptions() },
              { fetchPolicy: 'network-only' },
            )
            .pipe(
              catchError((error) => {
                this.errorResponse = error.message ?? error;
                this.dataLoading = false;
                return EMPTY;
              }),
            );
        }),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((result) => {
        this.totalCount = result.data.ipsAggregate.count;
        this.affectedCount = result.data.affectedIpsAggregate.count;
        this.emptyResponse = this.totalCount === 0;
        this.dataLoading = false;

        const pageSize = this.paginator?.pageSize ?? 25;
        const lastPageIndex = Math.max(0, Math.ceil(this.totalCount / pageSize) - 1);
        if (
          result.data.ips.length === 0 &&
          this.totalCount > 0 &&
          this.paginator &&
          this.paginator.pageIndex > lastPageIndex
        ) {
          this.paginator.pageIndex = lastPageIndex;
          this.fetch$.next();
          return;
        }

        this.dataSource.data = result.data.ips.map((ip) => ({
          address: ip.address,
          version: ip.version,
          subnet: ip.subnets.at(0)?.range ?? '',
          affectedBy: ip.nodes.flatMap(
            (node) =>
              node.host?.software_versions.flatMap((sv) =>
                sv.vulnerabilities.map((v) => v.cve?.cve_id).filter((id): id is string => id != null),
              ) ?? [],
          ),
          softwareVersion: ip.nodes.flatMap((node) => node.host?.software_versions.map((sv) => sv.version) ?? []),
        }));
        this.pieChartData.set(this.calculateOccupancyData());
      });
  }

  private buildWhere(): IpWhere {
    return { subnets_SOME: { org_units_SOME: { name: this.orgName } } };
  }

  private buildAffectedWhere(): IpWhere {
    return {
      AND: [this.buildWhere(), { nodes_SOME: { host: { software_versions_SOME: { vulnerabilities_SOME: {} } } } }],
    };
  }

  private buildOptions(): IpOptions {
    const pageSize = this.paginator?.pageSize ?? 25;
    return {
      limit: pageSize,
      offset: (this.paginator?.pageIndex ?? 0) * pageSize,
    };
  }

  fetchOrgUnitDetail(): void {
    this.getOrgUnit
      .fetch({ name: this.orgName }, { fetchPolicy: 'network-only' })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (result) => {
          this.orgUnitDetail.set(result.data.organizationUnits[0] ?? null);
          this.dataLoading = false;
          this.dataLoaded = true;
        },
        error: (error) => {
          console.error('Error fetching org unit details:', error);
          this.dataLoading = false;
        },
      });
  }

  // Tooltip transforms for inline-elements-preview
  readonly identity = (value: string): string => value;
  readonly contactName = (contact: { name: string }): string => contact.name;

  navigateToVulnDetail(cveId: string): void {
    this.router.navigate([VULNERABILITY_PATH], { queryParams: { cve: cveId } });
  }

  calcSubnetSize(range: string): number {
    let cidr = range.split('/')[1];
    if (!cidr || parseInt(cidr) < 0 || parseInt(cidr) > 32) {
      return 0;
    }
    return cidr ? Math.pow(2, 32 - parseInt(cidr)) - 2 : 0;
  }

  calculateOccupancyData(): { name: string; value: number }[] {
    const total =
      this.orgUnitDetail()?.subnets.reduce((acc, subnet) => acc + this.calcSubnetSize(subnet.range), 0) || 0;
    const unoccupied = total - this.totalCount;

    return [
      { name: 'Unoccupied', value: unoccupied },
      { name: 'Occupied', value: this.totalCount - this.affectedCount },
      { name: 'Affected', value: this.affectedCount },
    ];
  }

  goBack(): void {
    this.router.navigate([ORGANIZATION_PATH]);
  }

  navigateToOrgUnitDetail(orgName: string): void {
    this.router.navigate([ORGANIZATION_PATH, orgName]).then(() => {
      this.orgUnitDetail.set(null);
      this.dataSource.data = [];
      this.dataLoading = true;
      if (this.paginator) this.paginator.pageIndex = 0;
      this.fetchOrgUnitDetail();
      this.fetch$.next();
    });
  }

  navigateToSubnetDetail(subnetRange: string): void {
    this.router.navigate([SUBNETS_PATH, subnetRange]);
  }
}
