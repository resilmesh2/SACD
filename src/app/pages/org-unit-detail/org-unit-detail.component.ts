import { AfterViewInit, Component, DestroyRef, inject, OnInit, signal, ViewChild, WritableSignal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { forkJoin, of, switchMap } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { SentinelButtonWithIconComponent } from '@sentinel/components/button-with-icon';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ORGANIZATION_PATH, SUBNETS_PATH } from '../../paths';
import { customOccupancyColors } from '../../config/customPieChartColors';
import { GetOrgUnitQuery, GetOrgUnitQueryService } from '../../graphql/org-units/org-units.operation.generated';
import { GetChildIPsQueryService } from '../../graphql/subnets/subnets.operation.generated';

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
  ],
})
export class OrgUnitDetailComponent implements OnInit, AfterViewInit {
  dataSource = new MatTableDataSource<ChildIP>();
  displayedColumns: string[] = ['ip', 'subnet', 'softwareVersion', 'affectedBy'];
  paginator: MatPaginator | null = null;

  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    this.setDataSourceAttributes();
  }

  setDataSourceAttributes() {
    this.dataSource.paginator = this.paginator;
  }

  orgUnitDetail: WritableSignal<OrgUnit | null> = signal(null);
  orgName: string = '';
  pieChartData: WritableSignal<{ name: string; value: number }[]> = signal([]);
  customColors = customOccupancyColors;

  private destroyRef = inject(DestroyRef);
  private router = inject(Router);

  dataLoading = false;
  dataLoaded = false;
  emptyResponse = false;
  errorResponse = '';

  constructor(
    private route: ActivatedRoute,
    private getOrgUnit: GetOrgUnitQueryService,
    private getChildIPs: GetChildIPsQueryService,
  ) {
    this.dataSource = new MatTableDataSource<ChildIP>([]);
  }

  ngOnInit(): void {
    this.dataLoading = true;
    this.route.paramMap.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((params) => {
      this.orgName = params.get('orgName') || '';
    });
    this.getOrgUnitDetail();
  }

  ngAfterViewInit(): void {
    if (this.dataSource && this.paginator && this.dataLoaded) {
      this.dataSource.paginator = this.paginator;
    }
  }

  getOrgUnitDetail(): void {
    this.getOrgUnit
      .fetch({ name: this.orgName }, { fetchPolicy: 'network-only' })
      .pipe(
        switchMap((result) => {
          const orgUnit = result.data.organizationUnits[0] ?? null;
          this.orgUnitDetail.set(orgUnit);
          this.dataLoading = false;
          this.dataLoaded = true;
          const subnets = orgUnit?.subnets ?? [];
          if (subnets.length === 0) {
            return of([]);
          }
          return forkJoin(
            subnets.map((subnet) => this.getChildIPs.fetch({ range: subnet.range }, { fetchPolicy: 'network-only' })),
          );
        }),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe({
        next: (results) => {
          this.dataSource.data = results.flatMap((result) =>
            result.data.ips.map((ip) => ({
              address: ip.address,
              version: ip.version,
              subnet: ip.subnets[0]?.range ?? '',
              affectedBy: ip.nodes.flatMap(
                (node) =>
                  node.host?.software_versions.flatMap((sv) =>
                    sv.vulnerabilities.map((v) => v.cve?.cve_id).filter((id): id is string => id != null),
                  ) ?? [],
              ),
              softwareVersion: ip.nodes.flatMap((node) => node.host?.software_versions.map((sv) => sv.version) ?? []),
            })),
          );
          this.pieChartData.set(this.calculateOccupancyData());
        },
        error: (error) => {
          console.error('Error fetching org unit details:', error);
          this.dataLoading = false;
        },
      });
  }

  getSaneAffectedBy(affectedBy: string[]): string {
    if (!affectedBy || affectedBy.length === 0) {
      return 'No vulnerabilities';
    }
    return affectedBy.slice(0, 5).join(', ') + (affectedBy.length > 5 ? `, ... (${affectedBy.length - 5} more)` : '');
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
    const occupied = this.dataSource.data.length;
    const unoccupied = total - occupied;
    const affectedCount = this.dataSource.data.filter((ip) => ip.affectedBy && ip.affectedBy.length > 0).length;

    return [
      { name: 'Unoccupied', value: unoccupied },
      { name: 'Occupied', value: occupied - affectedCount },
      { name: 'Affected', value: affectedCount },
    ];
  }

  getContactNames(): string {
    const contacts = this.orgUnitDetail()?.contacts;
    if (!contacts || contacts.length === 0) return 'N/A';
    return contacts.map((c) => c.name).join(', ');
  }

  goBack(): void {
    this.router.navigate([ORGANIZATION_PATH]);
  }

  navigateToOrgUnitDetail(orgName: string): void {
    this.router.navigate([ORGANIZATION_PATH, orgName]).then(() => {
      this.orgUnitDetail.set(null);
      this.dataSource.data = [];
      this.dataLoading = true;
      this.getOrgUnitDetail();
    });
  }

  navigateToSubnetDetail(subnetRange: string): void {
    this.router.navigate([SUBNETS_PATH, subnetRange]);
  }
}
