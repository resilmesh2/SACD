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
import { ORGANIZATION_PATH, SUBNETS_PATH } from '../../paths';
import { customOccupancyColors } from '../../config/customPieChartColors';
import {
  SubnetPageGetSubnetQuery,
  SubnetPageGetSubnetQueryService,
} from '../subnet-page/graphql/subnet-page.operation.generated';
import { GetIPsPaginatedQueryService } from '../../graphql/subnets/subnets.operation.generated';
import { IpOptions, IpWhere } from '../../../generated/base-types';

type SubnetDetail = SubnetPageGetSubnetQuery['subnets'][0];

interface ChildIP {
  address: string;
  version?: number | null;
  subnet: string;
  affectedBy: string[];
  softwareVersion: string[];
}

@Component({
  selector: 'subnet-detail',
  templateUrl: './subnet-detail.component.html',
  styleUrls: ['./subnet-detail.component.scss'],
  imports: [
    MatPaginatorModule,
    MatTableModule,
    MatIconModule,
    MatProgressSpinner,
    SentinelButtonWithIconComponent,
    NgxChartsModule,
  ],
})
export class SubnetDetailComponent implements OnInit {
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

  subnetDetail: WritableSignal<SubnetDetail | null> = signal(null);
  range: string = '';
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
    private getSubnet: SubnetPageGetSubnetQueryService,
    private getIPsPaginated: GetIPsPaginatedQueryService,
  ) {
    this.dataSource = new MatTableDataSource<ChildIP>([]);
  }

  ngOnInit(): void {
    this.dataLoading = true;
    this.route.paramMap.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((params) => {
      this.range = params.get('range') || '';
    });
    this.fetchSubnetDetail();

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
    return {
      subnets_SOME: {
        OR: [{ range: this.range }, { parent_subnet_SOME: { range: this.range } }],
      },
    };
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

  fetchSubnetDetail(): void {
    this.getSubnet
      .fetch({ range: this.range }, { fetchPolicy: 'network-only' })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (result) => {
          this.subnetDetail.set(result.data.subnets.at(0) ?? null);
          this.dataLoading = false;
          this.dataLoaded = true;
        },
        error: (error) => {
          console.error('Error fetching subnet details:', error);
          this.dataLoading = false;
        },
      });
  }

  getContactNames(): string {
    const contacts = this.subnetDetail()?.contacts;
    if (!contacts || contacts.length === 0) return 'N/A';
    return contacts.map((c) => c.name).join(', ');
  }

  getSaneAffectedBy(affectedBy: string[]): string {
    if (!affectedBy || affectedBy.length === 0) {
      return 'No vulnerabilities';
    }
    return affectedBy.slice(0, 5).join(', ') + (affectedBy.length > 5 ? `, ... (${affectedBy.length - 5} more)` : '');
  }

  calcSubnetSize(): number {
    const cidr = this.range.split('/')[1];
    if (!cidr || parseInt(cidr) < 0 || parseInt(cidr) > 32) {
      return 0;
    }
    return Math.pow(2, 32 - parseInt(cidr)) - 2;
  }

  calculateOccupancyData(): { name: string; value: number }[] {
    const total = this.calcSubnetSize();
    const unoccupied = total - this.totalCount;

    return [
      { name: 'Unoccupied', value: unoccupied },
      { name: 'Occupied', value: this.totalCount - this.affectedCount },
      { name: 'Affected', value: this.affectedCount },
    ];
  }

  goBack(): void {
    this.router.navigate([SUBNETS_PATH]);
  }

  navigateToSubnetDetail(subnetRange: string): void {
    this.router.navigate([SUBNETS_PATH, subnetRange]).then(() => {
      this.subnetDetail.set(null);
      this.dataSource.data = [];
      this.dataLoading = true;
      if (this.paginator) this.paginator.pageIndex = 0;
      this.fetchSubnetDetail();
      this.fetch$.next();
    });
  }

  navigateToOrgUnitDetail(orgName: string): void {
    this.router.navigate([ORGANIZATION_PATH, orgName]);
  }
}
