import { Component, OnInit, ViewChild, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { EMPTY, Subject, Subscription } from 'rxjs';
import { catchError, startWith, switchMap } from 'rxjs/operators';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { Router } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { OrgUnitCrudDialog } from './org-unit-crud-dialog/org-unit-crud.component';
import { MatIcon } from '@angular/material/icon';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { FormsModule } from '@angular/forms';
import { SentinelButtonWithIconComponent } from '@sentinel/components/button-with-icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ORGANIZATION_PATH } from '../../paths';
import {
  GetAllOrgUnitsQuery,
  GetOrgUnitsPaginatedQueryService,
} from '../../graphql/org-units/org-units.operation.generated';
import { OrgUnitsPageDeleteOrgUnitMutationService } from './graphql/org-units-page.operation.generated';
import { OrganizationUnitOptions, OrganizationUnitSort, SortDirection } from '../../../generated/base-types';

type OrgUnitRow = GetAllOrgUnitsQuery['organizationUnits'][0];

@Component({
  selector: 'org-units-page',
  templateUrl: './org-units.component.html',
  styleUrls: ['./org-units.component.scss'],
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    MatIcon,
    MatProgressSpinner,
    FormsModule,
    SentinelButtonWithIconComponent,
  ],
})
export class OrgUnitsComponent implements OnInit {
  displayedColumns: string[] = ['name', 'subnets', 'contacts', 'parent_org_unit', 'actions'];
  dataSource: MatTableDataSource<OrgUnitRow> = new MatTableDataSource<OrgUnitRow>([]);

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

  totalCount = 0;
  dataLoaded = false;
  dataLoading = false;
  emptyResponse = false;
  errorResponse = '';

  private readonly fetch$ = new Subject<void>();
  private destroyRef = inject(DestroyRef);
  private snackBar = inject(MatSnackBar);
  private router = inject(Router);
  readonly dialog = inject(MatDialog);

  constructor(
    private getOrgUnitsPaginated: GetOrgUnitsPaginatedQueryService,
    private deleteOrgUnitService: OrgUnitsPageDeleteOrgUnitMutationService,
  ) {}

  ngOnInit(): void {
    this.dataLoading = true;
    this.fetch$
      .pipe(
        startWith(undefined as void),
        switchMap(() => {
          this.errorResponse = '';
          return this.getOrgUnitsPaginated
            .fetch({ options: this.buildOptions() }, { fetchPolicy: 'network-only' })
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
        this.totalCount = result.data.organizationUnitsAggregate.count;
        this.dataLoaded = true;
        // A collection-wide empty state, not "this page happens to be empty" - a stale
        // offset (e.g. after deleting the last row on a page) is handled below instead.
        this.emptyResponse = this.totalCount === 0;
        this.dataLoading = false;

        const pageSize = this.paginator?.pageSize ?? 25;
        const lastPageIndex = Math.max(0, Math.ceil(this.totalCount / pageSize) - 1);
        if (
          result.data.organizationUnits.length === 0 &&
          this.totalCount > 0 &&
          this.paginator &&
          this.paginator.pageIndex > lastPageIndex
        ) {
          this.paginator.pageIndex = lastPageIndex;
          this.fetch$.next();
          return;
        }

        this.dataSource.data = result.data.organizationUnits;
      });
  }

  private buildOptions(): OrganizationUnitOptions {
    const sort = this.buildSort();
    const pageSize = this.paginator?.pageSize ?? 25;
    return {
      limit: pageSize,
      offset: (this.paginator?.pageIndex ?? 0) * pageSize,
      ...(sort && { sort }),
    };
  }

  private buildSort(): OrganizationUnitSort[] | undefined {
    if (!this.sort?.active || !this.sort.direction) return undefined;
    const dir = this.sort.direction === 'asc' ? SortDirection.Asc : SortDirection.Desc;
    return [{ [this.sort.active]: dir }];
  }

  getContactNames(row: OrgUnitRow): string {
    const names = row.contacts.map((c) => c.name);
    return names.length > 0 ? names.join(', ') : '---';
  }

  openDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string,
    orgUnit: Partial<OrgUnitRow>,
    mode: 'insert' | 'edit',
  ): void {
    const dialogRef = this.dialog.open(OrgUnitCrudDialog, {
      width: '24em',
      enterAnimationDuration,
      exitAnimationDuration,
      data: { orgUnit, mode },
    });

    dialogRef.componentInstance.updateOrgUnitDataSource.subscribe(({ oldName, orgUnit: updated }) => {
      this.fetch$.next();
      if (oldName) {
        this.snackBar.open(`Org Unit ${updated.name} updated successfully.`, 'Close');
      } else {
        this.snackBar.open(`Org Unit ${updated.name} added successfully.`, 'Close');
      }
    });
  }

  deleteOrgUnit(orgUnit: OrgUnitRow): void {
    this.deleteOrgUnitService
      .mutate({ name: orgUnit.name })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (result) => {
          if ((result.data?.deleteOrganizationUnits.nodesDeleted ?? 0) > 0) {
            this.snackBar.open(`Org Unit ${orgUnit.name} deleted successfully.`, 'Close');
            this.fetch$.next();
          } else {
            this.snackBar.open(`Failed to delete Org Unit ${orgUnit.name}.`, 'Close');
          }
        },
        error: () => this.snackBar.open(`Failed to delete Org Unit ${orgUnit.name}.`, 'Close'),
      });
  }

  reorganiseDatabase(): void {
    alert('TODO: Reorganize database when API is ready');
  }

  navigateToOrgUnitDetail(orgUnit: OrgUnitRow): void {
    this.router.navigate([ORGANIZATION_PATH, orgUnit.name]);
  }
}
