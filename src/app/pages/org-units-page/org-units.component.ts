import { Component, OnInit, ViewChild, AfterViewInit, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
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
import { GetAllOrgUnitsQuery, GetAllOrgUnitsQueryService } from '../../graphql/org-units/org-units.operation.generated';
import { OrgUnitsPageDeleteOrgUnitMutationService } from './graphql/org-units-page.operation.generated';

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
export class OrgUnitsComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['name', 'subnets', 'contacts', 'parent_org_unit', 'actions'];
  dataSource: MatTableDataSource<OrgUnitRow> = new MatTableDataSource<OrgUnitRow>([]);

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator | null = null;
  @ViewChild(MatSort, { static: false }) sort: MatSort | null = null;

  dataLoaded = false;
  dataLoading = true;
  emptyResponse = false;
  errorResponse = '';

  private destroyRef = inject(DestroyRef);
  private snackBar = inject(MatSnackBar);
  private router = inject(Router);
  readonly dialog = inject(MatDialog);

  constructor(
    private getAllOrgUnits: GetAllOrgUnitsQueryService,
    private deleteOrgUnitService: OrgUnitsPageDeleteOrgUnitMutationService,
  ) {}

  ngOnInit(): void {
    this.fetchAllOrgUnits();
  }

  ngAfterViewInit(): void {}

  fetchAllOrgUnits(): void {
    this.emptyResponse = false;
    this.errorResponse = '';
    this.dataLoading = true;

    this.getAllOrgUnits
      .fetch({}, { fetchPolicy: 'network-only' })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (result) => {
          this.dataSource = new MatTableDataSource<OrgUnitRow>(result.data.organizationUnits);
          this.dataLoading = false;
          this.dataLoaded = true;

          if (this.paginator) this.dataSource.paginator = this.paginator;
          if (this.sort) this.dataSource.sort = this.sort;
        },
        error: (error) => {
          this.errorResponse = error.message ?? error;
          this.dataLoading = false;
        },
      });
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
      data: {
        allOrgUnits: this.dataSource.data,
        orgUnit,
        mode,
      },
    });

    dialogRef.componentInstance.updateOrgUnitDataSource.subscribe(({ oldName, orgUnit: updated }) => {
      const index = this.dataSource.data.findIndex((item) => item.name === oldName);
      if (index !== -1) {
        const newData = this.dataSource.data.map((item, i) => {
          if (i === index) return updated;
          if (item.parent_org_unit.at(0)?.name === oldName) {
            return { ...item, parent_org_unit: [{ name: updated.name }] };
          }
          return item;
        });
        this.dataSource.data = newData;
        this.snackBar.open(`Org Unit ${updated.name} updated successfully.`, 'Close');
      } else {
        this.dataSource.data = [updated, ...this.dataSource.data];
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
            this.dataSource.data = this.dataSource.data.filter((item) => item.name !== orgUnit.name);
            this.snackBar.open(`Org Unit ${orgUnit.name} deleted successfully.`, 'Close');
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
