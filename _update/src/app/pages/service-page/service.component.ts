import { Component, OnInit, ViewChild, AfterViewInit, ElementRef, ChangeDetectorRef } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { Router } from '@angular/router';
import { Observable, zip } from 'rxjs';

import { ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Subnet } from '../../models/vulnerability.model';
import { DataService } from '../../services/data.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { DatePipe } from '@angular/common';
import { MatNativeDateModule } from '@angular/material/core';

export interface Service {
  name: string;
  id: string;
  tag: string[];
  subnet: string[];
  severity: string[];
  last_seen: Date | null;
}

export interface IP {
  _id: string;
  address: string;
  tag: string[];
  part_of: Subnet[];
  __typename: string;
}

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.scss'],
  imports: [
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    DatePipe
  ]
})

export class ServiceComponent implements OnInit, AfterViewInit {
  dataSource = new MatTableDataSource<Service>();

  displayedColumns: string[] = ['name', 'tag', 'subnet', 'last_seen'];
  
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
  
  selectedTag = 'All';
  tags: string[][] = [];

  dataLoaded = false;
  dataLoading = false;
  emptyResponse = false;
  errorResponse = '';
  services: Service[] = [];
  allTags: string[] = [];
  totalSortedAssets: number = 0;
  ips: IP[] = []

  startDateControl = new FormControl();
  endDateControl = new FormControl();
  startDate: Date | null = null;
  endDate: Date | null = null;
  isDateRangeValid = false;
  editOn: boolean = false;
  separatorKeysCodes = [ENTER] as const;

  constructor(
    private data: DataService,
    private changeDetector: ChangeDetectorRef,
    private router: Router
  ) {
    this.dataSource = new MatTableDataSource<Service>([]);
  }

  ngOnInit(): void {
    this.dataLoading = true;

    console.log('Data Loading');
    this.getCombinedData().subscribe(
      ([ips, allTags]) => {
        this.ips = ips;
        this.allTags = allTags;

        this.processServices();

        if (this.ips.length > 0) {
          this.dataLoaded = true;
        } else {
          this.emptyResponse = true;
        }
        this.dataLoading = false;

        this.updateTotalSortedServices();

        this.changeDetector.detectChanges();
      },
      (error) => {
        console.error('Error:', error);
        this.errorResponse = error;
        this.dataLoading = false;
        this.changeDetector.detectChanges()
      }
    );
  }

  ngAfterViewInit() {

    if (this.dataLoaded && this.dataSource) {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }

    this.dataSource.filterPredicate = (data: Service, filter: string): boolean => {
      const searchTerm = filter.trim().toLowerCase();

      const matchesSearchTerm =
        data.name.toLowerCase().includes(searchTerm)

      const matchesTag =
        this.selectedTag === 'All' || data.tag.includes(this.selectedTag);

      const matchesDateRange =
      (data.last_seen === null ) ||
        (!this.startDate || new Date(data.last_seen) >= this.startDate) &&
        (!this.endDate || new Date(data.last_seen) <= this.endDate);

      return matchesSearchTerm && matchesTag && matchesDateRange;
    };
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }

    this.updateTotalSortedServices();
  }

  dateChange(): void {
    this.validateDateInputs();

    // If either start or end date is cleared, reset the filter
    if (!this.startDateControl.value || !this.endDateControl.value) {
      this.clearDateFilter();
    }
  }

  clearDateFilter(): void {
    // Clear the filter predicate and reset the data
    this.dataSource.filterPredicate = () => true;
    this.dataSource.filter = ''; // Trigger the reset
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
    this.updateTotalSortedServices();
    this.isDateRangeValid = false;
  }

  validateDateInputs(): void {
    if (this.startDateControl.value) {
      this.startDate = this.startDateControl.value.toDate();
    } else {
      this.startDate = null;
    }

    if (this.endDateControl.value) {
      this.endDate = this.endDateControl.value.toDate();
    } else {
      this.endDate = null;
    }

    this.isDateRangeValid = this.startDateControl.value && this.endDateControl.value && !!this.startDate && !!this.endDate;
  }

  applyDateFilter(): void {
    if (this.isDateRangeValid) {
      this.dataSource.filterPredicate = (data: Service, filter: string) => {
        console.log("Here")
        if (data.last_seen === null) {
          return false;
        }
        const lastSeenDate = new Date(data.last_seen);
        return lastSeenDate >= this.startDate! && lastSeenDate <= this.endDate!;
      };

      this.dataSource.filter = 'filterDate'; // Trigger the filter to run
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
      this.updateTotalSortedServices();
    }
  }

  saveData(id: string, tags: string[]): void {
    this.data.changeTag(Number(id), tags)
  }

  onTagChange(): void {
    this.dataSource.filter = this.dataSource.filter.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }

    this.updateTotalSortedServices();
  }

  updateTotalSortedServices(): void {
    this.totalSortedAssets = this.dataSource.filteredData.length;
  }

  private getCombinedData(): Observable<[IP[], string[]]> {
    const ips$: Observable<IP[]> = this.data.getIPs();
    const allTags$: Observable<string[]> = this.data.getAllTags();
   
    return zip(ips$, allTags$);
  }

  private processServices(): void {
    this.services = this.ips.map((ip, index) => ({
      name: ip.address,
      id: ip._id,
      tag: [...(ip.tag ?? [])],
      subnet: (ip.part_of ?? []).map(item => item.range),
      severity: ip.tag,
      last_seen: null,
    }));

    this.dataSource.data = this.services;

    // Update sorted services
    this.updateTotalSortedServices();

    
    if (this.paginator && this.sort) {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
    
    this.changeDetector.detectChanges();

    this.tags = Array.from(new Set(this.services.map(service => service.tag)));
  }

  add(event: MatChipInputEvent, tags: string[]): void {
    const value = event.value;

    if (value) {
      tags.push(value)
    }

    event.chipInput!.clear();
  }

  remove(tag: string, tags: string[]): void {
      const index = tags.indexOf(tag);
      if (index >= 0) {
        tags.splice(index, 1);
      }
  }

  selected(event: MatAutocompleteSelectedEvent, tags: string[]): void {
    tags.push(event.option.viewValue)
    event.option.deselect();
  }
  
}
