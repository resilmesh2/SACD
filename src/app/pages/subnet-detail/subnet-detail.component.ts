import { AfterViewInit, Component, DestroyRef, inject, OnInit, signal, ViewChild, WritableSignal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { forkJoin, switchMap } from 'rxjs';
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
  SubnetPageGetChildSubnetsQueryService,
} from '../subnet-page/graphql/subnet-page.operation.generated';
import { GetChildIPsQueryService } from '../../graphql/subnets/subnets.operation.generated';

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
export class SubnetDetailComponent implements OnInit, AfterViewInit {
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

  subnetDetail: WritableSignal<SubnetDetail | null> = signal(null);
  range: string = '';
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
    private getSubnet: SubnetPageGetSubnetQueryService,
    private getChildSubnets: SubnetPageGetChildSubnetsQueryService,
    private getChildIPs: GetChildIPsQueryService,
  ) {
    this.dataSource = new MatTableDataSource<ChildIP>([]);
  }

  ngOnInit(): void {
    this.dataLoading = true;
    this.route.paramMap.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((params) => {
      this.range = params.get('range') || '';
    });
    this.fetchSubnetDetail();
    this.fetchChildIPs();
  }

  ngAfterViewInit(): void {
    if (this.dataSource && this.paginator && this.dataLoaded) {
      this.dataSource.paginator = this.paginator;
    }
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

  fetchChildIPs(): void {
    this.dataSource.data = [];
    this.getChildSubnets
      .fetch({ range: this.range }, { fetchPolicy: 'network-only' })
      .pipe(
        switchMap((result) => {
          const ranges = [{ range: this.range }, ...result.data.subnets];
          return forkJoin(
            ranges.map((subnet) => this.getChildIPs.fetch({ range: subnet.range }, { fetchPolicy: 'network-only' })),
          );
        }),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe({
        next: (results) => {
          this.dataSource.data = results.flatMap((ipResult) =>
            ipResult.data.ips.map((ip) => ({
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
            })),
          );
          this.pieChartData.set(this.calculateOccupancyData());
        },
        error: (error) => {
          console.error('Error fetching child IPs:', error);
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
    const occupied = this.dataSource.data.length;
    const unoccupied = total - occupied;
    const affectedCount = this.dataSource.data.filter((ip) => ip.affectedBy && ip.affectedBy.length > 0).length;

    return [
      { name: 'Unoccupied', value: unoccupied },
      { name: 'Occupied', value: occupied - affectedCount },
      { name: 'Affected', value: affectedCount },
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
      this.fetchSubnetDetail();
      this.fetchChildIPs();
    });
  }

  navigateToOrgUnitDetail(orgName: string): void {
    this.router.navigate([ORGANIZATION_PATH, orgName]);
  }
}
