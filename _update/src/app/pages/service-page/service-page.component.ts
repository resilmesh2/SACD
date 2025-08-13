import { Component, OnInit, ViewChild, AfterViewInit, ElementRef, ChangeDetectorRef, signal, computed, WritableSignal } from '@angular/core';
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
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { DatePipe } from '@angular/common';
import { MatNativeDateModule } from '@angular/material/core';
import { SentinelCardComponent } from '@sentinel/components/card';
import { SentinelControlItem } from '@sentinel/components/controls';
import { TagComponent } from '../../components/tag-component/tag.component';
import { SentinelButtonWithIconComponent } from '@sentinel/components/button-with-icon';
import { DateRange } from '@sentinel/common';
import { provideMomentDateAdapter } from '@angular/material-moment-adapter';
import { DATE_FORMAT } from '../../config/dateFormat';

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

interface Filter {
    name: string;
    options: string[];
    defaultValue: string;
}

@Component({
  selector: 'service-page',
  templateUrl: './service-page.component.html',
  styleUrls: ['./service-page.component.scss'],
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
    DatePipe,
    SentinelCardComponent,
    TagComponent,
    SentinelButtonWithIconComponent,
  ],
  providers: [
    provideMomentDateAdapter(DATE_FORMAT)
  ]
})

export class ServicePageComponent implements OnInit, AfterViewInit {
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

  dataLoaded = false;
  dataLoading = false;
  emptyResponse = false;
  errorResponse = '';

  //services: Service[] = [];
  ips: IP[] = []

  editOn: boolean = false;
  separatorKeysCodes = [ENTER] as const;

  services = signal<Service[]>([]);
  tags = signal<string[]>([]);
  totalSortedServices = computed(() => this.dataSource.filteredData.length);

  filters: Filter[] = []; // Filters for severity and status (+ potentially other selects in the future)
  defaultValue = "All";
  filterDictionary = new Map<string, string>();

  selectedTag: WritableSignal<string> = signal(this.defaultValue);
  //selectedStatus: WritableSignal<string> = signal(this.defaultValue);

  tagOptions = computed(() => Array.from(new Set(this.services().flatMap(service => service.tag))));
  //statusOptions = computed(() => Array.from(new Set(this.services().map(service => service.status))));

  startDate: WritableSignal<Date | null> = signal(null);
  endDate: WritableSignal<Date | null> = signal(null);
  isDateRangeValid = computed(() => this.startDate() !== null && this.endDate() !== null);

  controls: SentinelControlItem[] = [];

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
    this.getCombinedData().subscribe({
      next: ([ips, allTags]) => {
        this.ips = ips;
        this.tags.set(allTags);

        this.processServices();

        if (this.ips.length > 0) {
          this.dataLoaded = true;
        } else {
          this.emptyResponse = true;
        }
        this.dataLoading = false;

        //this.updateTotalSortedServices();

        this.changeDetector.detectChanges();
      },
      error: (error) => {
        console.error('Error:', error);
        this.errorResponse = error;
        this.dataLoading = false;
        this.changeDetector.detectChanges();
      }
    });
    this.filters.push({name: 'tag', options: this.tagOptions(), defaultValue: this.defaultValue});
  }

  ngAfterViewInit() {

    if (this.dataLoaded && this.dataSource) {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
    
    /**
     * Custom filter predicate for the data source.
     */
    this.dataSource.filterPredicate = function (record, filter) {
      var map: Map<string, any> = new Map(JSON.parse(filter));
      let isMatch = false;
      for(let [key,value] of map){
        // Name filter (CVE ID)
        if (key === 'name') {
          isMatch = (value === "All") || (value == '') || record.name.toLowerCase().includes(value.trim().toLowerCase());
          if (!isMatch) return false;
        } else if (key === 'dateRange') {
          console.log('Applying date range filter:', value);
          if (!value || value === '') {
            isMatch = true; // If no date range is specified, match all records
            continue;
          }

          const dateRange = JSON.parse(value);
          const startDate = new Date(dateRange.start);
          const endDate = new Date(dateRange.end);
          const lastSeenDate = record.last_seen ? new Date(record.last_seen) : null;
          isMatch = (!lastSeenDate || (lastSeenDate >= startDate && lastSeenDate <= endDate));

          if (!isMatch) return false;
        } else if (key === 'tag') {
          isMatch = (value === "All") || (value == '') || record.tag.includes(value.trim().toLowerCase());
          if (!isMatch) return false;
        }
      }

      return isMatch;
    };
  }

  // applyFilter(event: Event): void {
  //   const filterValue = (event.target as HTMLInputElement).value;
  //   this.dataSource.filter = filterValue.trim().toLowerCase();
    
  //   if (this.dataSource.paginator) {
  //     this.dataSource.paginator.firstPage();
  //   }
  // }

  /**
   * Used for applying filters from the select dropdowns.
   * @param event MatSelectChange event containing the selected value.
   */
  applySelectFilter(event: MatSelectChange, filter: Filter) {
    this.filterDictionary.set(filter.name, event.value);

    var jsonString = JSON.stringify(Array.from(this.filterDictionary.entries()));
    
    this.dataSource.filter = jsonString;
    
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }

    console.log('Applied Filter:', event.value, filter.name, this.dataSource.filter);
  }

  applyNameFilter(event: Event): void {
    this.filterDictionary.set('name', (event.target as HTMLInputElement).value.trim().toLowerCase());
    this.dataSource.filter = JSON.stringify(Array.from(this.filterDictionary.entries()));
    
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  applyDateFilter(): void {
    console.log('Applying date filter:', this.startDate(), this.endDate());
    if (this.isDateRangeValid()) {
      this.filterDictionary.set('dateRange', JSON.stringify({
        start: this.startDate()?.toISOString(),
        end: this.endDate()?.toISOString()
      }));
      this.dataSource.filter = JSON.stringify(Array.from(this.filterDictionary.entries()));
    }
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  clearDateFilter(): void {
    this.filterDictionary.set('dateRange', '');
    this.dataSource.filter = JSON.stringify(Array.from(this.filterDictionary.entries()));
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // dateChange(): void {
  //   this.validateDateInputs();

  //   // If either start or end date is cleared, reset the filter
  //   if (!this.startDateControl.value || !this.endDateControl.value) {
  //     this.clearDateFilter();
  //   }
  // }

  // clearDateFilter(): void {
  //   // Clear the filter predicate and reset the data
  //   this.dataSource.filterPredicate = () => true;
  //   this.dataSource.filter = ''; // Trigger the reset
  //   if (this.dataSource.paginator) {
  //     this.dataSource.paginator.firstPage();
  //   }
  //   this.updateTotalSortedServices();
  //   this.isDateRangeValid = false;
  // }

  // validateDateInputs(): void {
  //   console.log("Start Date:", this.startDate);
  //   console.log("End Date:", this.endDate);
  //   console.log('Checking date range validity:', this.startDateControl.value, this.endDateControl.value);

  //   if (this.startDateControl.value) {
  //     this.startDate = this.startDateControl.value.toDate();
  //   } else {
  //     this.startDate = null;
  //   }

  //   if (this.endDateControl.value) {
  //     this.endDate = this.endDateControl.value.toDate();
  //   } else {
  //     this.endDate = null;
  //   }

  //   this.isDateRangeValid = this.startDateControl.value && this.endDateControl.value && !!this.startDate && !!this.endDate;

  //   console.log('Is date range valid:', this.isDateRangeValid);
  // }

  // applyDateFilter(): void {
  //   if (this.isDateRangeValid) {
  //     this.dataSource.filterPredicate = (data: Service, filter: string) => {
  //       console.log("Here")
  //       if (data.last_seen === null) {
  //         return false;
  //       }
  //       const lastSeenDate = new Date(data.last_seen);
  //       return lastSeenDate >= this.startDate! && lastSeenDate <= this.endDate!;
  //     };

  //     this.dataSource.filter = 'filterDate'; // Trigger the filter to run
  //     if (this.dataSource.paginator) {
  //       this.dataSource.paginator.firstPage();
  //     }
  //     this.updateTotalSortedServices();
  //   }
  // }

  // onDateRangeChange(event: DateRange): void {
  //   console.log('Date range changed:', this.startDate, this.endDate);
  // }

  saveData(id: string, tags: string[]): void {
    this.data.changeTag(Number(id), tags)
  }

  // onTagChange(): void {
  //   this.dataSource.filter = this.dataSource.filter.trim().toLowerCase();

  //   if (this.dataSource.paginator) {
  //     this.dataSource.paginator.firstPage();
  //   }

  //   this.updateTotalSortedServices();
  // }

  // updateTotalSortedServices(): void {
  //   this.totalSortedAssets = this.dataSource.filteredData.length;
  // }

  private getCombinedData(): Observable<[IP[], string[]]> {
    const ips$: Observable<IP[]> = this.data.getIPs();
    const allTags$: Observable<string[]> = this.data.getAllTags();
   
    return zip(ips$, allTags$);
  }

  private processServices(): void {
    this.services.set(this.ips.map((ip, index) => ({
      name: ip.address,
      id: ip._id,
      tag: [...(ip.tag ?? [])],
      subnet: (ip.part_of ?? []).map(item => item.range),
      severity: ip.tag,
      last_seen: null,
    })));

    this.dataSource.data = this.services();

    // Update sorted services
    //this.updateTotalSortedServices();

    
    if (this.paginator && this.sort) {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
    
    this.changeDetector.detectChanges();

    this.tags.set(Array.from(new Set(this.services().flatMap(service => service.tag))));
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
