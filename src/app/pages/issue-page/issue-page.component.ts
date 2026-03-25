import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  ChangeDetectorRef,
  computed,
  DestroyRef,
  effect,
  WritableSignal,
  signal,
  inject,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { ActivatedRoute, Router } from '@angular/router';
import { Issue } from '../../models/issue.model';
import {
  IssuePageGetVulnerabilitiesQueryService,
  IssuePageGetVulnerabilitiesQuery,
  IssuePageUpdateVulnerabilityStatusMutationService,
} from './graphql/issue-page.operation.generated';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { DatePipe } from '@angular/common';
import { SentinelCardComponent } from '@sentinel/components/card';
import { SentinelControlItem } from '@sentinel/components/controls';
import { provideMomentDateAdapter } from '@angular/material-moment-adapter';
import { DATE_FORMAT } from '../../config/dateFormat';
import { CvssChipComponent } from '../../components/cvss-color-chip/cvss-chip.component';
import { SentinelButtonWithIconComponent } from '@sentinel/components/button-with-icon';
import { MatIcon } from '@angular/material/icon';
import { ISSUE_PATH } from '../../paths';
import { StatusChipComponent } from '../../components/status-color-chip/status-color-chip.component';
import { OverlayModule } from '@angular/cdk/overlay';

interface Filter {
  name: string;
  options: string[];
  defaultValue: string;
}

@Component({
  selector: 'issue-page',
  templateUrl: './issue-page.component.html',
  styleUrls: ['./issue-page.component.scss'],
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatSelectModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    DatePipe,
    SentinelCardComponent,
    CvssChipComponent,
    StatusChipComponent,
    MatIcon,
    SentinelButtonWithIconComponent,
    OverlayModule,
  ],
  providers: [provideMomentDateAdapter(DATE_FORMAT)],
  standalone: true,
})
export class IssuePageComponent implements OnInit, AfterViewInit {
  dataSource = new MatTableDataSource<Issue>();

  displayedColumns: string[] = [
    'name',
    'status',
    'description',
    'severity',
    'last_seen',
  ];

  private paginator: MatPaginator | null = null;
  private sort: MatSort | null = null;

  @ViewChild(MatSort) set matSort(ms: MatSort) {
    this.sort = ms;
    this.setDataSourceAttributes();
  }

  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    this.setDataSourceAttributes();
  }

  setDataSourceAttributes() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  private router = inject(Router);
  private destroyRef = inject(DestroyRef);

  dataLoaded = false;
  dataLoading = false;
  emptyResponse = false;
  errorResponse = '';

  issues = signal<Issue[]>([]);
  totalSortedIssues = computed(() => this.dataSource.filteredData.length);

  filters: Filter[] = []; // Filters for severity and status (+ potentially other selects in the future)
  defaultValue = 'All';
  filterDictionary = new Map<string, string>();

  searchTerm: WritableSignal<string> = signal('');

  selectedSeverity: WritableSignal<string> = signal(this.defaultValue);
  selectedStatus: WritableSignal<string> = signal(this.defaultValue);

  severityOptions = computed(() =>
    Array.from(new Set(this.issues().map((issue) => issue.severity))),
  );
  statusOptions = computed(() =>
    Array.from(new Set(this.issues().flatMap((issue) => issue.status))),
  );

  startDate: WritableSignal<Date | null> = signal(null);
  endDate: WritableSignal<Date | null> = signal(null);
  isDateRangeValid = computed(
    () => this.startDate() !== null && this.endDate() !== null,
  );

  controls: SentinelControlItem[] = [];

  constructor(
    private getVulnerabilitiesService: IssuePageGetVulnerabilitiesQueryService,
    private updateStatusService: IssuePageUpdateVulnerabilityStatusMutationService,
    private route: ActivatedRoute,
    private changeDetector: ChangeDetectorRef,
  ) {
    this.dataSource = new MatTableDataSource<Issue>([]);

    // Fires whenever date range becomes valid or invalid
    effect(() => {
      if (this.isDateRangeValid()) {
        this.applyDateFilter();
      } else {
        this.clearDateFilter();
      }
    });

    this.route.queryParams
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((params) => {
        if (params['severity']) {
          if (params['severity'] !== 'All') {
            this.selectedSeverity.set(params['severity'].toLowerCase());
            this.filterDictionary.set(
              'severity',
              params['severity'].toLowerCase(),
            );
          }
        }
      });
  }

  ngOnInit(): void {
    this.dataLoading = true;

    this.getVulnerabilitiesService
      .fetch({}, { fetchPolicy: 'network-only' })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (result) => {
          const vulnerabilities = result.data.vulnerabilities;
          this.processIssues(vulnerabilities);
          this.dataLoaded = vulnerabilities.length > 0;
          this.emptyResponse = vulnerabilities.length === 0;
          this.dataLoading = false;
          this.changeDetector.detectChanges();
        },
        error: (error) => {
          console.error('Error:', error);
          this.errorResponse = error;
          this.dataLoading = false;
          this.changeDetector.detectChanges();
        },
      });

    this.filters.push({
      name: 'severity',
      options: this.severityOptions(),
      defaultValue: this.defaultValue,
    });
    this.filters.push({
      name: 'status',
      options: this.statusOptions(),
      defaultValue: this.defaultValue,
    });

    // Custom sorting logic (needed mainly for severity)
    this.dataSource.sortData = (data: Issue[], sort: Sort): Issue[] => {
      if (!sort.active || sort.direction === '') {
        return data;
      }

      return data.sort((a, b) => {
        const isAsc = sort.direction === 'asc';
        switch (sort.active) {
          case 'name':
            return this.compare(a.name, b.name, isAsc);
          case 'severity':
            return this.compareSeverity(a.severity, b.severity, isAsc);
          case 'status':
            return this.compare(a.status, b.status, isAsc);
          case 'last_seen':
            return this.compare(a.last_seen, b.last_seen, isAsc);
          default:
            return 0;
        }
      });
    };
  }

  ngAfterViewInit() {
    if (this.dataLoaded && this.dataSource) {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }

    /**
     * Custom filter predicate for the data source.
     * Filters the data based on the filterDictionary - stringified JSON of key-value pairs.
     */
    this.dataSource.filterPredicate = function (record, filter) {
      var map: Map<string, any> = new Map(JSON.parse(filter));
      let isMatch = false;
      for (let [key, value] of map) {
        // Name filter (CVE ID)
        if (key === 'name') {
          isMatch =
            value === 'All' ||
            value == '' ||
            record.name.toLowerCase().includes(value.trim().toLowerCase());
          if (!isMatch) return false;
        } else if (key === 'dateRange') {
          if (!value || value === '') {
            isMatch = true; // If no date range is specified, match all records
            continue;
          }

          const dateRange = JSON.parse(value);
          const startDate = new Date(dateRange.start);
          const endDate = new Date(dateRange.end);
          const lastSeenDate = record.last_seen
            ? new Date(record.last_seen)
            : null;
          isMatch =
            !lastSeenDate ||
            (lastSeenDate >= startDate && lastSeenDate <= endDate);

          if (!isMatch) return false;
        } else if (key === 'status') {
          isMatch =
            value == 'All' ||
            (record[key as keyof Issue] as string[]).includes(value);
          if (!isMatch) return false;
        } else {
          isMatch = value == 'All' || record[key as keyof Issue] == value;
          if (!isMatch) return false;
        }
      }

      return isMatch;
    };
  }

  /**
   * Used for applying filters from the select dropdowns.
   * @param event MatSelectChange event containing the selected value.
   */
  applySelectFilter(event: MatSelectChange, filter: Filter) {
    this.filterDictionary.set(filter.name, event.value);

    var jsonString = JSON.stringify(
      Array.from(this.filterDictionary.entries()),
    );

    this.dataSource.filter = jsonString;

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }

    console.log(
      'Applied Filter:',
      event.value,
      filter.name,
      this.dataSource.filter,
    );
  }

  /**
   * Applies the search term filter (CVE ID) to the data source.
   */
  applyNameFilter(): void {
    this.filterDictionary.set('name', this.searchTerm().trim().toLowerCase());
    this.dataSource.filter = JSON.stringify(
      Array.from(this.filterDictionary.entries()),
    );

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  applyDateFilter(): void {
    if (!this.isDateRangeValid()) {
      return;
    }

    if (this.isDateRangeValid()) {
      this.filterDictionary.set(
        'dateRange',
        JSON.stringify({
          start: this.startDate()?.toISOString(),
          end: this.endDate()?.toISOString(),
        }),
      );
      this.dataSource.filter = JSON.stringify(
        Array.from(this.filterDictionary.entries()),
      );
    }
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // When user clicks on one of the severity tags
  useSeverityFilter(severity: string): void {
    this.selectedSeverity.set(severity);
    this.filterDictionary.set('severity', severity);
    this.dataSource.filter = JSON.stringify(
      Array.from(this.filterDictionary.entries()),
    );
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // When user clicks on one of the status tags
  useStatusFilter(status: string): void {
    this.selectedStatus.set(status);
    this.filterDictionary.set('status', status);
    this.dataSource.filter = JSON.stringify(
      Array.from(this.filterDictionary.entries()),
    );
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  clearDateFilter(): void {
    this.filterDictionary.set('dateRange', '');
    this.dataSource.filter = JSON.stringify(
      Array.from(this.filterDictionary.entries()),
    );
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  resetFilters(): void {
    this.filterDictionary.clear();
    this.dataSource.filter = '';
    this.selectedSeverity.set(this.defaultValue);
    this.selectedStatus.set(this.defaultValue);
    this.startDate.set(null);
    this.endDate.set(null);
    this.searchTerm.set('');

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  navigateToVulnDetail(issue: Issue): void {
    this.router.navigate(['/vulnerability'], {
      queryParams: {
        cve: issue.name,
      },
    });
  }

  navigateToIssueDetail(issue: Issue): void {
    this.router.navigate([ISSUE_PATH, issue.name], {
      queryParams: {
        severity: issue.severity,
        status: issue.status,
        description: issue.description,
        impact: issue.impact,
      },
    });
  }

  private compare(a: any, b: any, isAsc: boolean): number {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  private compareSeverity(a: string, b: string, isAsc: boolean): number {
    const severityOrder = ['critical', 'high', 'medium', 'low', 'unknown'];
    const indexA = severityOrder.indexOf(a.toLowerCase());
    const indexB = severityOrder.indexOf(b.toLowerCase());
    return (indexA < indexB ? -1 : 1) * (isAsc ? 1 : -1);
  }

  private processIssues(
    vulnerabilities: IssuePageGetVulnerabilitiesQuery['vulnerabilities'],
  ): void {
    this.issues.set(
      vulnerabilities
        .filter((vuln) => vuln.cve != null)
        .map((vuln) => ({
          name: vuln.cve!.cve_id,
          severity:
            vuln.cve!.cvss_v31?.base_severity?.toLowerCase() ?? 'unknown',
          status: vuln.status ?? ['estimated'],
          description: vuln.cve!.description,
          last_seen: vuln.cve!.published ? new Date(vuln.cve!.published) : null,
          impact:
            vuln.cve!.result_impacts?.filter(Boolean).join(', ') ??
            'No impact data available',
        })),
    );

    this.dataSource.data = this.issues();

    if (this.paginator && this.sort) {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }

    this.changeDetector.detectChanges();
  }

  updateVulnerabilityStatus(issue: Issue, newStatus: string[]): void {
    const vulnIndex = this.issues().findIndex(
      (vuln) => vuln.name === issue.name,
    );
    if (vulnIndex !== -1) {
      const updatedIssues = [...this.issues()];
      updatedIssues[vulnIndex] = {
        ...updatedIssues[vulnIndex],
        status: newStatus,
      };

      this.issues.set(updatedIssues);
      this.dataSource.data = this.issues();
      issue.isEditOpen = false;
      this.changeDetector.detectChanges();
    }

    // Change status in the DB as well
    this.updateStatusService
      .mutate({ cve: issue.name, status: newStatus })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        error: (error) => console.error('Error running mutation', error),
      });
  }
}
