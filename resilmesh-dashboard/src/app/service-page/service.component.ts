// @ts-nocheck

import { Component, OnInit, ViewChild, AfterViewInit, ElementRef, ChangeDetectorRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { Observable, zip } from 'rxjs';
import { CVE, Subnet } from '../shared/models/vulnerability.model';
import { DataService } from '../shared/services/data.service';

import { ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';

export interface Service {
  name: string;
  tag: string[];
  subnet: string[];
  severity: string;
  last_seen: Date;
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
})

export class ServiceComponent implements OnInit, AfterViewInit {
  dataSource = new MatTableDataSource<Service>();

  displayedColumns: string[] = ['name', 'tag', 'subnet', 'last_seen'];
  
  private paginator: MatPaginator;
  private sort: MatSort;

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
  selectedStatus = 'All';
  tags: string[] = [];
  issueStatus: string[] = [];

  cveDetails: CVE[] = [];
  dataLoaded = false;
  dataLoading = false;
  emptyResponse = false;
  errorResponse = '';
  ipAddresses: string[] = [];
  services: Service[] = [];
  allTags: string[] = [];
  totalSortedIssues: number = 0;
  ips: IP[] = []

  startDateControl = new FormControl();
  endDateControl = new FormControl();
  startDate: Date | null = null;
  endDate: Date | null = null;
  isDateRangeValid = false;
  editOn: boolean = false;
  separatorKeysCodes = [ENTER] as const;
  tagInputs: string[] = [];
  predefinedTags: string[] = ['aTag1', 'Tag2', 'Tag3'];

  constructor(
    private data: DataService,
    private changeDetector: ChangeDetectorRef,
    private router: Router
  ) {
    this.dataSource = new MatTableDataSource([]);
  }

  filterPredefinedTags(value: string): string {
    return this.predefinedTags.filter(tag => tag.toLocaleLowerCase().startsWith(this.currentTag))
  }

  ngOnInit(): void {
    this.dataLoading = true;

    this.getCombinedData().subscribe(
      ([cveDetails, ips, allTags]) => {
        this.cveDetails = cveDetails;
        this.ips = ips;
        this.allTags = allTags;

        this.processIssues();

        if (this.cveDetails.length > 0 && this.ips.length > 0) {
          this.dataLoaded = true;
        } else {
          this.emptyResponse = true;
        }
        this.dataLoading = false;

        this.updateTotalSortedIssues();

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

    this.updateTotalSortedIssues();
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
    this.updateTotalSortedIssues();
    this.isDateRangeValid = false;
  }

  validateDateInputs(): void {
    const datePattern = /^\d{4}\/\d{2}\/\d{2}$/; 
    
    const startDateValid = datePattern.test(this.startDateControl.value);
    const endDateValid = datePattern.test(this.endDateControl.value);

    if (startDateValid) {
      this.startDate = new Date(this.startDateControl.value.replace(/\//g, '-'));
    } else {
      this.startDate = null;
    }

    if (endDateValid) {
      this.endDate = new Date(this.endDateControl.value.replace(/\//g, '-'));
    } else {
      this.endDate = null;
    }

    this.isDateRangeValid = startDateValid && endDateValid && !!this.startDate && !!this.endDate;
  }

  isValidDateFormat(date: Date | null): boolean {
    if (!date) return false;
    const dateStr = date.toISOString().slice(0, 10).replace(/-/g, '/');
    return /^\d{4}\/\d{2}\/\d{2}$/.test(dateStr);
  }

  applyDateFilter(): void {
    if (this.isDateRangeValid) {
      this.dataSource.filterPredicate = (data: Service, filter: string) => {
        const lastSeenDate = new Date(data.last_seen);
        return lastSeenDate >= this.startDate! && lastSeenDate <= this.endDate!;
      };

      this.dataSource.filter = 'filterDate'; // Trigger the filter to run
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
      this.updateTotalSortedIssues();
    }
  }

  changeEdit(): void {
    this.editOn = !this.editOn
  }

  saveData(id: string, tags: string[]): void {
    this.data.changeTag(Number(id), tags)
  }

  onTagChange(): void {
    this.dataSource.filter = this.dataSource.filter.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }

    this.updateTotalSortedIssues();
  }

  onStatusChange(): void {
    this.dataSource.filter = this.dataSource.filter.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }

    this.updateTotalSortedIssues();
  }

  updateTotalSortedIssues(): void {
    this.totalSortedIssues = this.dataSource.filteredData.length;
  }

  scoreClass(value: string, type: number) {
    if (type === 2) {
      if (Number(value) <= 3.9) {
        return 'low';
      }

      if (Number(value) > 3.9 && Number(value) <= 6.9) {
        return 'medium';
      }

      if (Number(value) > 6.9) {
        return 'high';
      }
    } else if (type === 3) {
      if (Number(value) > 8.9) {
        return 'critical';
      }
      if (Number(value) <= 3.9) {
        return 'low';
      }

      if (Number(value) > 3.9 && Number(value) <= 6.9) {
        return 'medium';
      }

      if (Number(value) > 6.9) {
        return 'high';
      }
    }
  }

  navigateToIssueDetail(issue: Service): void {
    // this.router.navigate(['/auth/panel/issue', issue.name], {
    //   queryParams: {
    //     severity: issue.tag,
    //     status: issue.status,
    //     description: issue.description,
    //     impact: issue.impact,
    //   },
    // });
  }

  private getCombinedData(): Observable<[CVE[], string[]]> {
    const cveDetails$: Observable<CVE[]> = this.data.getAllCVEDetails();
    const ips$: Observable<IP[]> = this.data.getIPs();
    const allTags$: Observable<string[]> = this.data.getAllTags();
   
    return zip(cveDetails$, ips$, allTags$);
  }

  private processIssues(): void {
    
    this.services = this.ips.map((ip, index) => ({
      name: ip.address,
      id: ip._id,
      //tag: [...ip.tag],
      tag: ip.tag,
      subnet: (ip.subnets && ip.subnets[0]) ? ip.subnets[0].range : "0.0.0.0/0",
      //severity: ip.tag,
      last_seen: "",
    }));

    this.dataSource.data = this.services;
    //console.log(this.services);

    // Update sorted issues
    this.updateTotalSortedIssues();

    
    if (this.paginator && this.sort) {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
    
    this.changeDetector.detectChanges();

    //this.tags = Array.from(new Set(this.services.map(issue => issue.tag)));
    this.issueStatus = Array.from(new Set(this.services.map(issue => issue.status)));
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
