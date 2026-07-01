import { Component, OnInit, ViewChild, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { EMPTY, Subject, Subscription } from 'rxjs';
import { catchError, startWith, switchMap } from 'rxjs/operators';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { Router } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { InsertSubnetDialog } from './insert-subnet-dialog/insert.subnet.component';
import { MatIcon } from '@angular/material/icon';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { FormsModule } from '@angular/forms';
import { SentinelButtonWithIconComponent } from '@sentinel/components/button-with-icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ORGANIZATION_PATH, SUBNETS_PATH } from '../../paths';
import { GetAllSubnetsQuery, GetSubnetsPaginatedQueryService } from '../../graphql/subnets/subnets.operation.generated';
import { SubnetPageDeleteSubnetMutationService } from './graphql/subnet-page.operation.generated';
import { SortDirection, SubnetOptions, SubnetSort } from '../../../generated/base-types';

type SubnetRow = GetAllSubnetsQuery['subnets'][0];

@Component({
  selector: 'subnet-page',
  templateUrl: './subnet-page.component.html',
  styleUrls: ['./subnet-page.component.scss'],
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
export class SubnetPageComponent implements OnInit {
  displayedColumns: string[] = ['note', 'range', 'org_units', 'contacts', 'parent_subnet', 'actions'];
  dataSource: MatTableDataSource<SubnetRow> = new MatTableDataSource<SubnetRow>([]);

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
    private getSubnetsPaginated: GetSubnetsPaginatedQueryService,
    private deleteSubnetService: SubnetPageDeleteSubnetMutationService,
  ) {}

  ngOnInit(): void {
    this.dataLoading = true;
    this.fetch$
      .pipe(
        startWith(undefined as void),
        switchMap(() => {
          this.errorResponse = '';
          return this.getSubnetsPaginated.fetch({ options: this.buildOptions() }, { fetchPolicy: 'network-only' }).pipe(
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
        this.totalCount = result.data.subnetsAggregate.count;
        this.dataLoaded = true;
        // A collection-wide empty state, not "this page happens to be empty" - a stale
        // offset (e.g. after deleting the last row on a page) is handled below instead.
        this.emptyResponse = this.totalCount === 0;
        this.dataLoading = false;

        const pageSize = this.paginator?.pageSize ?? 25;
        const lastPageIndex = Math.max(0, Math.ceil(this.totalCount / pageSize) - 1);
        if (
          result.data.subnets.length === 0 &&
          this.totalCount > 0 &&
          this.paginator &&
          this.paginator.pageIndex > lastPageIndex
        ) {
          this.paginator.pageIndex = lastPageIndex;
          this.fetch$.next();
          return;
        }

        this.dataSource.data = result.data.subnets;
      });
  }

  private buildOptions(): SubnetOptions {
    const sort = this.buildSort();
    const pageSize = this.paginator?.pageSize ?? 25;
    return {
      limit: pageSize,
      offset: (this.paginator?.pageIndex ?? 0) * pageSize,
      ...(sort && { sort }),
    };
  }

  private buildSort(): SubnetSort[] | undefined {
    if (!this.sort?.active || !this.sort.direction) return undefined;
    const dir = this.sort.direction === 'asc' ? SortDirection.Asc : SortDirection.Desc;
    return [{ [this.sort.active]: dir }];
  }

  getContactNames(row: SubnetRow): string {
    const names = row.contacts.map((c) => c.name);
    return names.length > 0 ? names.join(', ') : '---';
  }

  openDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string,
    subnet: Partial<SubnetRow>,
    mode: 'insert' | 'edit',
  ): void {
    const dialogRef = this.dialog.open(InsertSubnetDialog, {
      width: '24em',
      enterAnimationDuration,
      exitAnimationDuration,
      data: { subnet, mode },
    });

    dialogRef.componentInstance.updateSubnetDataSource.subscribe(({ oldRange, subnet: updated }) => {
      this.fetch$.next();
      if (oldRange) {
        this.snackBar.open(`Subnet ${updated.range} updated successfully.`, 'Close');
      } else {
        this.snackBar.open(`Subnet ${updated.range} [${updated.note}] added successfully.`, 'Close');
      }
    });
  }

  deleteSubnet(subnet: SubnetRow): void {
    this.deleteSubnetService
      .mutate({ range: subnet.range })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (result) => {
          if ((result.data?.deleteSubnets.nodesDeleted ?? 0) > 0) {
            this.snackBar.open(`Subnet ${subnet.range} deleted successfully.`, 'Close');
            this.fetch$.next();
          } else {
            this.snackBar.open(`Failed to delete subnet ${subnet.range}.`, 'Close');
          }
        },
        error: () => this.snackBar.open(`Failed to delete subnet ${subnet.range}.`, 'Close'),
      });
  }

  reorganiseDatabase(): void {
    alert('TODO: Reorganize database when API is ready');
  }

  navigateToSubnetDetail(subnetRange: string): void {
    this.router.navigate([SUBNETS_PATH, subnetRange]);
  }

  navigateToOrgUnitDetail(orgName: string): void {
    this.router.navigate([ORGANIZATION_PATH, orgName]);
  }
}
