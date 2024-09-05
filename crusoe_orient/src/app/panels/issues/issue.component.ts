import { Component, OnInit, ViewChild, AfterViewInit, ElementRef, ChangeDetectorRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { Observable, zip } from 'rxjs';
import { DataService } from 'src/app/shared/services/data.service';
import { CVE } from 'src/app/shared/models/vulnerability.model';

export interface Issue {
  name: string;
  severity: string;
  status: string;
  affected_entity: string;
  description: string;
  last_seen: Date;
  impact: string;
}

@Component({
  selector: 'app-issue',
  templateUrl: './issue.component.html',
  styleUrls: ['./issue.component.scss'],
})

export class IssueComponent implements OnInit, AfterViewInit {
  dataSource = new MatTableDataSource<Issue>();

  displayedColumns: string[] = ['name', 'severity', 'status', 'affected_entity', 'description', 'last_seen'];
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  selectedSeverity = 'All';
  selectedStatus = 'All';
  issueSeverity: string[] = [];
  issueStatus: string[] = [];

  cveDetails: CVE[] = [];
  dataLoaded = false;
  dataLoading = false;
  emptyResponse = false;
  errorResponse = '';
  ipAddresses: string[] = [];
  issues: Issue[] = [];
  totalSortedIssues: number = 0;

  startDateControl = new FormControl();
  endDateControl = new FormControl();
  startDate: Date | null = null;
  endDate: Date | null = null;
  isDateRangeValid = false;

  constructor(
    private data: DataService, 
    private changeDetector: ChangeDetectorRef,
    private router: Router
  ) {
    this.dataSource = new MatTableDataSource([]);
  }

  ngOnInit(): void {
    this.dataLoading = true;

    console.log('Data Loading');
    this.getCombinedData().subscribe(
      ([cveDetails, ipAddresses]) => {
        this.cveDetails = cveDetails;
        this.ipAddresses = ipAddresses;

        this.processIssues();


        if (this.cveDetails.length > 0 && this.ipAddresses.length > 0) {
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

    this.dataSource.filterPredicate = (data: Issue, filter: string): boolean => {
      const searchTerm = filter.trim().toLowerCase();

      const matchesSearchTerm =
        data.name.toLowerCase().includes(searchTerm) ||
        data.affected_entity.toLowerCase().includes(searchTerm);

      const matchesSeverity =
        this.selectedSeverity === 'All' || data.severity === this.selectedSeverity;

      const matchesStatus =
        this.selectedStatus === 'All' || data.status === this.selectedStatus;

      const matchesDateRange =
        (!this.startDate || new Date(data.last_seen) >= this.startDate) &&
        (!this.endDate || new Date(data.last_seen) <= this.endDate);

      return matchesSearchTerm && matchesSeverity && matchesStatus && matchesDateRange;
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
    console.log('IssueComponent.isValidDateFormat()', date);
    if (!date) return false;
    const dateStr = date.toISOString().slice(0, 10).replace(/-/g, '/');
    console.log('IssueComponent.isValidDateFormat()', dateStr);
    return /^\d{4}\/\d{2}\/\d{2}$/.test(dateStr);
  }

  applyDateFilter(): void {
    if (this.isDateRangeValid) {
      this.dataSource.filterPredicate = (data: Issue, filter: string) => {
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

  onSeverityChange(): void {
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

  navigateToIssueDetail(issue: Issue): void {
    this.router.navigate(['/auth/panel/issue', issue.name], {
      queryParams: {
        severity: issue.severity,
        status: issue.status,
        description: issue.description,
        impact: issue.impact,
      },
    });
  }

  private getCombinedData(): Observable<[CVE[], string[]]> {
    const cveDetails$: Observable<CVE[]> = this.data.getAllCVEDetails();
    const ipAddresses$: Observable<string[]> = this.data.getIPAddresses();
   
    return zip(cveDetails$, ipAddresses$);
  }

  private processIssues(): void {

    this.issues = this.cveDetails.map((cve, index) => ({
      name: cve.CVE_id,
      severity: this.scoreClass(cve.base_score_v3, 3),
      status: "Open",
      affected_entity: this.ipAddresses[index],
      description: cve.description,
      last_seen: cve.published_date ? new Date(cve.published_date) : null,
      impact: cve.impact
    }));

    this.dataSource.data = this.issues;

    // Update sorted issues
    this.updateTotalSortedIssues();

    
    if (this.paginator && this.sort) {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
    
    this.changeDetector.detectChanges();

    this.issueSeverity = Array.from(new Set(this.issues.map(issue => issue.severity)));
    this.issueStatus = Array.from(new Set(this.issues.map(issue => issue.status)));
  }
}
