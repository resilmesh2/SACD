import { Component, OnInit, ViewChild, DestroyRef, WritableSignal, signal, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { EMPTY, Subject, Subscription } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, startWith, switchMap } from 'rxjs/operators';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { ActivatedRoute, Router } from '@angular/router';
import { Issue } from '../../models/issue.model';
import {
  IssuePageGetCvesPaginatedQueryService,
  IssuePageUpdateVulnerabilityStatusMutationService,
} from './graphql/issue-page.operation.generated';
import { CveOptions, CveSort, CveWhere, SortDirection } from '../../../generated/base-types';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { DatePipe } from '@angular/common';
import { SentinelCardComponent } from '@sentinel/components/card';
import { SentinelControlItem } from '@sentinel/components/controls';
import { CvssChipComponent } from '../../components/cvss-color-chip/cvss-chip.component';
import { SentinelButtonWithIconComponent } from '@sentinel/components/button-with-icon';
import { MatIcon } from '@angular/material/icon';
import { ISSUE_PATH } from '../../paths';
import { StatusChipComponent } from '../../components/status-color-chip/status-color-chip.component';
import { OverlayModule } from '@angular/cdk/overlay';

const ALL = 'All';

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
  standalone: true,
})
export class IssuePageComponent implements OnInit {
  dataSource = new MatTableDataSource<Issue>([]);

  displayedColumns: string[] = ['name', 'status', 'description', 'severity', 'last_seen'];

  private paginator: MatPaginator | null = null;
  private sort: MatSort | null = null;
  private paginatorSub: Subscription | null = null;
  private sortSub: Subscription | null = null;

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

  @ViewChild(MatSort) set matSort(ms: MatSort) {
    this.sortSub?.unsubscribe();
    this.sort = ms ?? null;
    this.sortSub = ms
      ? ms.sortChange.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
          if (this.paginator) this.paginator.pageIndex = 0;
          this.fetch$.next();
        })
      : null;
  }

  private router = inject(Router);
  private destroyRef = inject(DestroyRef);

  totalCount = 0;
  dataLoaded = false;
  dataLoading = false;
  emptyResponse = false;
  errorResponse = '';

  defaultValue = ALL;
  readonly severityOptions = ['critical', 'high', 'medium', 'low', 'unknown'];
  readonly statusOptions = ['estimated', 'confirmed', 'unconfirmed', 'assessed', 'reassessed', 'resolved', 'closed'];

  searchTerm: WritableSignal<string> = signal('');
  selectedSeverity: WritableSignal<string> = signal(ALL);
  selectedStatus: WritableSignal<string> = signal(ALL);

  controls: SentinelControlItem[] = [];

  private readonly fetch$ = new Subject<void>();
  private readonly search$ = new Subject<string>();

  constructor(
    private getCvesPaginated: IssuePageGetCvesPaginatedQueryService,
    private updateStatusService: IssuePageUpdateVulnerabilityStatusMutationService,
    private route: ActivatedRoute,
  ) {
    this.route.queryParams.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((params) => {
      if (params['severity'] && params['severity'] !== ALL) {
        this.selectedSeverity.set(params['severity'].toLowerCase());
      }
    });
  }

  ngOnInit(): void {
    this.dataLoading = true;

    this.search$
      .pipe(debounceTime(300), distinctUntilChanged(), takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.applyFilters());

    this.fetch$
      .pipe(
        startWith(undefined as void),
        switchMap(() => {
          this.errorResponse = '';
          return this.getCvesPaginated
            .fetch({ where: this.buildWhere(), options: this.buildOptions() }, { fetchPolicy: 'network-only' })
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
        this.totalCount = result.data.cvesAggregate.count;
        this.dataLoaded = true;
        // A collection-wide empty state, not "the current filters have no matches" - the
        // latter is handled inline by *matNoDataRow so the filter bar stays visible to clear it.
        this.emptyResponse = this.totalCount === 0 && !this.hasActiveFilters();
        this.dataLoading = false;

        const issues: Issue[] = result.data.cves.map((cve) => ({
          name: cve.cve_id,
          severity: cve.cvss_v31?.base_severity?.toLowerCase() ?? 'unknown',
          status: cve.vulnerability.status ?? ['estimated'],
          description: cve.description,
          last_seen: cve.published ? new Date(cve.published) : null,
          impact: cve.result_impacts?.filter(Boolean).join(', ') ?? 'No impact data available',
        }));

        const pageSize = this.paginator?.pageSize ?? 25;
        const lastPageIndex = Math.max(0, Math.ceil(this.totalCount / pageSize) - 1);
        if (issues.length === 0 && this.totalCount > 0 && this.paginator && this.paginator.pageIndex > lastPageIndex) {
          this.paginator.pageIndex = lastPageIndex;
          this.fetch$.next();
          return;
        }

        this.dataSource.data = issues;
      });
  }

  private hasActiveFilters(): boolean {
    return this.searchTerm().trim() !== '' || this.selectedSeverity() !== ALL || this.selectedStatus() !== ALL;
  }

  private buildWhere(): CveWhere {
    // The CVE.vulnerability field is non-null in the schema, so a CVE without a linked
    // vulnerability would fail the whole query - restrict to the ones that have one.
    const parts: CveWhere[] = [{ vulnerabilityAggregate: { count_GT: 0 } }];

    const term = this.searchTerm().trim();
    if (term) parts.push({ cve_id_CONTAINS: term.toUpperCase() });

    const severity = this.selectedSeverity();
    if (severity !== ALL) {
      parts.push(
        severity === 'unknown'
          ? { cvss_v31Aggregate: { count: 0 } }
          : { cvss_v31: { base_severity: severity.toUpperCase() } },
      );
    }

    const status = this.selectedStatus();
    if (status !== ALL) {
      // A vulnerability with no status is displayed as 'estimated', so that filter must match it too.
      parts.push({
        vulnerability:
          status === 'estimated'
            ? { OR: [{ status_INCLUDES: status }, { status: null }] }
            : { status_INCLUDES: status },
      });
    }

    return { AND: parts };
  }

  private buildOptions(): CveOptions {
    const sort = this.buildSort();
    const pageSize = this.paginator?.pageSize ?? 25;
    return {
      limit: pageSize,
      offset: (this.paginator?.pageIndex ?? 0) * pageSize,
      ...(sort && { sort }),
    };
  }

  private buildSort(): CveSort[] | undefined {
    if (!this.sort?.active || !this.sort.direction) return undefined;
    const dir = this.sort.direction === 'asc' ? SortDirection.Asc : SortDirection.Desc;
    const field: Record<string, keyof CveSort> = { name: 'cve_id', last_seen: 'published' };
    const key = field[this.sort.active];
    return key ? [{ [key]: dir }] : undefined;
  }

  applyFilters(): void {
    if (this.paginator) this.paginator.pageIndex = 0;
    this.fetch$.next();
  }

  applyNameFilter(): void {
    this.search$.next(this.searchTerm());
  }

  // When user clicks on one of the severity tags
  useSeverityFilter(severity: string): void {
    this.selectedSeverity.set(severity);
    this.applyFilters();
  }

  // When user clicks on one of the status tags
  useStatusFilter(status: string): void {
    this.selectedStatus.set(status);
    this.applyFilters();
  }

  resetFilters(): void {
    this.selectedSeverity.set(ALL);
    this.selectedStatus.set(ALL);
    this.searchTerm.set('');
    this.applyFilters();
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

  updateVulnerabilityStatus(issue: Issue, newStatus: string[]): void {
    issue.status = newStatus;
    issue.isEditOpen = false;

    // Change status in the DB as well
    this.updateStatusService
      .mutate({ cve: issue.name, status: newStatus })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        error: (error) => console.error('Error running mutation', error),
      });
  }
}
