import { Component, OnInit, ViewChild, AfterViewInit, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
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
import { GetAllSubnetsQuery, GetAllSubnetsQueryService } from '../../graphql/subnets/subnets.operation.generated';
import { SubnetPageDeleteSubnetMutationService } from './graphql/subnet-page.operation.generated';

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
export class SubnetPageComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['note', 'range', 'org_units', 'contacts', 'parent_subnet', 'actions'];
  dataSource: MatTableDataSource<SubnetRow> = new MatTableDataSource<SubnetRow>([]);

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
    private getAllSubnets: GetAllSubnetsQueryService,
    private deleteSubnetService: SubnetPageDeleteSubnetMutationService,
  ) {}

  ngOnInit(): void {
    this.fetchAllSubnets();
  }

  ngAfterViewInit(): void {}

  fetchAllSubnets(): void {
    this.emptyResponse = false;
    this.errorResponse = '';
    this.dataLoading = true;

    this.getAllSubnets
      .fetch({}, { fetchPolicy: 'network-only' })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (result) => {
          this.dataSource = new MatTableDataSource<SubnetRow>(result.data.subnets);
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
      data: {
        allSubnets: this.dataSource.data,
        subnet,
        mode,
      },
    });

    dialogRef.componentInstance.updateSubnetDataSource.subscribe(({ oldRange, subnet: updated }) => {
      const index = this.dataSource.data.findIndex((item) => item.range === oldRange);
      if (index !== -1) {
        const newData = this.dataSource.data.map((item, i) => {
          if (i === index) return updated;
          if (item.parent_subnet?.[0]?.range === oldRange) {
            return { ...item, parent_subnet: [{ _id: '', note: null, range: updated.range }] };
          }
          return item;
        });
        this.dataSource.data = newData;
        this.snackBar.open(`Subnet ${updated.range} updated successfully.`, 'Close');
      } else {
        this.dataSource.data = [updated, ...this.dataSource.data];
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
            this.dataSource.data = this.dataSource.data.filter((item) => item.range !== subnet.range);
            this.snackBar.open(`Subnet ${subnet.range} deleted successfully.`, 'Close');
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
