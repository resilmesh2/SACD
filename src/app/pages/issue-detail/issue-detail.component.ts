import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  DestroyRef,
  inject,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { SentinelButtonWithIconComponent } from '@sentinel/components/button-with-icon';
import { CvssChipComponent } from '../../components/cvss-color-chip/cvss-chip.component';
import { scoreToClassCVSS } from '../../utils/utils';
import { GetVulnerableMachinesQueryService } from '../../graphql/vulnerable-machines/vulnerable-machines.operation.generated';

export interface IssueDetail {
  affectedAsset: string;
  description: string;
  software: string;
  vulnerabilityCount: number;
}

@Component({
  selector: 'issue-detail',
  templateUrl: './issue-detail.component.html',
  styleUrls: ['./issue-detail.component.scss'],
  imports: [
    MatPaginatorModule,
    MatTableModule,
    MatIconModule,
    MatProgressSpinner,
    SentinelButtonWithIconComponent,
    CvssChipComponent,
  ],
})
export class IssueDetailComponent implements OnInit, AfterViewInit {
  dataSource = new MatTableDataSource<IssueDetail>();

  displayedColumns: string[] = [
    'affectedAsset',
    'description',
    'software',
    'vulnerabilityCount',
  ];

  paginator: MatPaginator | null = null;

  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    this.setDataSourceAttributes();
  }

  setDataSourceAttributes() {
    this.dataSource.paginator = this.paginator;
  }

  issueName = '';
  issueSeverity = '';
  issueStatus = '';
  issueImpact = '';
  issueDescription = '';
  totalOccurrences = 0;

  issueDetails: IssueDetail[] = [];
  dataLoaded = false;
  dataLoading = false;
  emptyResponse = false;
  errorResponse = '';

  private router = inject(Router);
  private destroyRef = inject(DestroyRef);

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private getVulnerableMachinesService: GetVulnerableMachinesQueryService,
  ) {
    this.dataSource = new MatTableDataSource<IssueDetail>([]);
  }

  ngOnInit(): void {
    this.dataLoading = true;
    this.getRouteParameters();
    this.getVulnerableAssets();
  }

  ngAfterViewInit(): void {
    if (this.dataSource && this.paginator && this.dataLoaded) {
      this.dataSource.paginator = this.paginator;
    }
  }

  getRouteParameters(): void {
    this.route.paramMap
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((params) => {
        this.issueName = params.get('name') || '';
      });

    this.route.queryParams
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((params) => {
        this.issueSeverity = params['severity'] || '';
        this.issueStatus = params['status'] || '';
        this.issueDescription = params['description'] || '';
        this.issueImpact = params['impact'] || '';
      });
  }

  getVulnerableAssets(): void {
    this.getVulnerableMachinesService
      .fetch({ cveId: this.issueName }, { fetchPolicy: 'network-only' })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (result) => {
          const rows = (
            result.data.cves[0]?.vulnerability.software_versions ?? []
          ).flatMap((sv) =>
            sv.hosts.flatMap((host) =>
              (host.node?.ips ?? []).map((ip) => ({
                ip: ip.address,
                subnet: ip.subnets[0]?.range ?? '',
                software: sv.version,
              })),
            ),
          );

          const valid = rows.filter(
            (row) => row.ip && row.subnet && row.software,
          );

          if (valid.length > 0) {
            this.issueDetails = valid.map((row) => ({
              affectedAsset: row.ip,
              description: this.issueDescription,
              software: row.software,
              vulnerabilityCount: 1,
            }));
            this.totalOccurrences = this.issueDetails.length;
            this.setDataSource();
          } else {
            this.emptyResponse = true;
          }

          this.dataLoading = false;
          this.dataLoaded = true;
        },
        error: (error) => {
          this.errorResponse = `Error fetching data: ${error}`;
          this.dataLoading = false;
          this.emptyResponse = true;
          console.error(this.errorResponse);
        },
      });
  }

  navigateToVulnDetail(issueName: string): void {
    this.router.navigate(['/vulnerability'], {
      queryParams: {
        cve: issueName,
      },
    });
  }

  setDataSource(): void {
    this.dataSource.data = this.issueDetails;

    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }

  goBack(): void {
    this.location.back();
  }

  scoreToClassCVSS(score: string, version: number): string {
    return scoreToClassCVSS(score, version);
  }
}
