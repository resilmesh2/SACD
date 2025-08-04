import { Component, OnInit, ViewChild, AfterViewInit, ElementRef, ChangeDetectorRef, inject, ChangeDetectionStrategy, Signal, computed, signal } from '@angular/core';
import { DataService } from '../shared/services/data.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { map, startWith, Observable, filter, take, tap } from 'rxjs';
import { FormControl } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';

export interface SubnetExtendedData {
  _id: string;
  note: string;
  range: string;
  org_units: string[];
  contacts: string[];
  parent_subnet: { note?: string, range: string } | null;
}

@Component({
  selector: 'app-subnet',
  templateUrl: './subnet.component.html',
  styleUrls: ['./subnet.component.scss'],
})
export class SubnetComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['note', 'range', 'org_units', 'contacts', 'parent_subnet'];
  dataSource: MatTableDataSource<SubnetExtendedData>;
  colorScheme = {
    domain: [
      '#e0f7fa',
      '#b2ebf2',
      '#80deea',
      '#4dd0e1',
      '#26c6da',
      '#00bcd4',
      '#00acc1',
      '#0097a7',
      '#00838f',
      '#006064',
    ],
  };
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
    
    this.data.getAllSubnets().subscribe({
      next: (subnets: SubnetExtendedData[]) => {
        this.dataSource = new MatTableDataSource<SubnetExtendedData>(subnets.map(subnet => ({
          _id: subnet._id,
          note: subnet.note ?? "---",
          range: subnet.range, // Can't be null or undefined, so no need for a fallback
          org_units: subnet.org_units.length == 0 ? ["---"] : subnet.org_units,
          contacts: subnet.contacts.length == 0 ? ["---"] : subnet.contacts,
          parent_subnet: subnet.parent_subnet ?? { note: '---', range: '---' }
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

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(InsertSubnetDialog, {
      width: '24em',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }
}

@Component({
  selector: 'insert-subnet-dialog',
  templateUrl: 'insert-subnet-dialog.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class InsertSubnetDialog implements OnInit {
  readonly dialogRef = inject(MatDialogRef<InsertSubnetDialog>);

  subnetRange: string = '';
  subnetNote: string = '';

  parentSubnetControl = new FormControl<string>('');
  options: Signal<SubnetExtendedData[]>;

  constructor(private data: DataService) {
    this.options = toSignal(this.data.getAllSubnets().pipe(
      tap(() => {
        this.parentSubnetControl.setValue('');
      })
    ) , { initialValue: [] });
  }

  ngOnInit(): void {}

  insertSubnet() {
    const subnetData = {
      range: this.subnetRange,
      note: this.subnetNote,
      parent_subnet: this.parentSubnetControl.value || null,
    };

    this.data.insertSubnet(subnetData);
  }
}