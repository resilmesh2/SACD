import { Component, OnInit, ViewChild, AfterViewInit, ElementRef, ChangeDetectorRef, inject, ChangeDetectionStrategy, Signal, computed, signal, WritableSignal, output, input, model } from '@angular/core';
import { DataService } from '../shared/services/data.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { toSignal } from '@angular/core/rxjs-interop';
import { SubnetExtendedData } from '../shared/models/subnet.model';
import { InsertSubnetDialog } from './insert-subnet-dialog/insert.subnet.component';


@Component({
  selector: 'app-subnet',
  templateUrl: './subnet.component.html',
  styleUrls: ['./subnet.component.scss'],
})
export class SubnetComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['note', 'range', 'org_units', 'contacts', 'parent_subnet', 'actions'];
  dataSource: MatTableDataSource<SubnetExtendedData>;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator | null = null;
  @ViewChild(MatSort, { static: false }) sort: MatSort | null = null;
  dataLoaded = false;
  dataLoading = true;

  constructor(private data: DataService, private changeDetector: ChangeDetectorRef, private route: ActivatedRoute) {
    this.dataSource = new MatTableDataSource<SubnetExtendedData>([]);
    this.getAllSubnets();
  }

  emptyResponse = false;
  errorResponse = '';

  ngOnInit(): void {}

  ngAfterViewInit(): void {}

  getAllSubnets() {
    this.emptyResponse = false;
    this.errorResponse = '';
    this.dataLoading = true;

    this.data.getSubnets().subscribe({
      next: (subnets: SubnetExtendedData[]) => {
        this.dataSource = new MatTableDataSource<SubnetExtendedData>(subnets.map(subnet => ({
          _id: subnet._id,
          range: subnet.range, // Can't be null or undefined, so no need for a fallback
          note: subnet.note ?? "---",
          organizationUnit: subnet.organizationUnit ?? "---",
          parentSubnet: subnet.parentSubnet ?? "---",
          contacts: subnet.contacts.length == 0 ? ["---"] : subnet.contacts,
        })));

        console.log('Subnets fetched:', this.dataSource.data);

        this.dataLoading = false;
        this.dataLoaded = true;
        this.changeDetector.detectChanges();

        if (this.paginator) {
          this.dataSource.paginator = this.paginator;
        }
        if (this.sort) {
          this.dataSource.sort = this.sort;
        }
      },
      error: (error) => {
        this.errorResponse = error;
        this.dataLoading = false;
      },
    });
  }

  readonly dialog = inject(MatDialog);

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string, subnet: Partial<SubnetExtendedData>, mode: 'insert' | 'edit'): void {
    let dialogRef = this.dialog.open(InsertSubnetDialog, {
      width: '24em',
      enterAnimationDuration,
      exitAnimationDuration,
      data: {
        subnet: {
          range: subnet.range,
          note: subnet.note,
          organizationUnit: subnet.organizationUnit,
          parentSubnet: subnet.parentSubnet,
          contacts: subnet.contacts,
        },
        mode: mode 
      },
    });

    // Listen for subnet updates from the dialog (e.g., after insert or edit)
    dialogRef.componentInstance.updateSubnetDataSource.subscribe(({ oldRange, subnet }) => {
      // Refreshes the data source with the updated subnet
      // Either updates the existing subnet or adds a new one if it doesn't exist
      const index = this.dataSource.data.findIndex(item => item.range === oldRange);
        if (index !== -1) {
          this.dataSource.data[index] = subnet;

          // Update parent subnet references
          this.dataSource.data.forEach(item => {
            if (item.parentSubnet === oldRange) {
              item.parentSubnet = subnet.range; 
            }
          });

          this.dataSource._updateChangeSubscription(); // Refresh the data source
        } else {
          this.dataSource.data = [...this.dataSource.data, subnet]; // Add new subnet if it doesn't exist
        }
    });
  }

  deleteSubnet(subnet: SubnetExtendedData): void {
    console.warn('Delete subnet not implemented yet:', subnet);
    if (this.data.deleteSubnet(subnet.range)) {
      // Handle successful deletion (e.g., show a message, refresh the list)
      this.dataSource.data = this.dataSource.data.filter(item => item.range !== subnet.range);
    } else {
      // Handle deletion failure (e.g., show an error message)
      console.error('Failed to delete subnet:', subnet);
    }
  }
}
