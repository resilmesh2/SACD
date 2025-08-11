import { Component, OnInit, ViewChild, AfterViewInit, ElementRef, ChangeDetectorRef } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { Router } from '@angular/router';
import { Observable, zip } from 'rxjs';
import { Issue } from '../../models/issue.model';
import { CVE } from '../../models/vulnerability.model';
import { DataService } from '../../services/data.service';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { DatePipe } from '@angular/common';
import { SentinelCardComponent } from '@sentinel/components/card';
import { SentinelControlItem } from '@sentinel/components/controls';
import { SentinelButtonWithIconComponent } from '@sentinel/components/button-with-icon';

@Component({
  selector: 'issue-page',
  templateUrl: './issue-page.component.html',
  styleUrls: ['./issue-page.component.scss'],
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatSelectModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    DatePipe,
    SentinelCardComponent,
    SentinelButtonWithIconComponent
  ]
})

export class IssuePageComponent implements OnInit, AfterViewInit {
  dataSource = new MatTableDataSource<Issue>();

  displayedColumns: string[] = ['name', 'severity', 'status', 'description', 'last_seen'];
  
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
  
  selectedSeverity = 'All';
  selectedStatus = 'All';
  issueSeverity: string[] = [];
  issueStatus: string[] = [];

  cveDetails: CVE[] = [];
  dataLoaded = false;
  dataLoading = false;
  emptyResponse = false;
  errorResponse = '';
  issues: Issue[] = [];
  totalSortedIssues: number = 0;

  startDateControl = new FormControl();
  endDateControl = new FormControl();
  startDate: Date | null = null;
  endDate: Date | null = null;
  isDateRangeValid = false;

  controls: SentinelControlItem[] = [];

  constructor(
    private data: DataService, 
    private changeDetector: ChangeDetectorRef,
    private router: Router
  ) {
    this.dataSource = new MatTableDataSource<Issue>([]);
  }

  ngOnInit(): void {
    this.dataLoading = true;

    console.log('Data Loading');
    this.getData().subscribe(
      (cveDetails) => {
        this.cveDetails = cveDetails;

        this.processIssues();


        if (this.cveDetails.length > 0) {
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
        data.name.toLowerCase().includes(searchTerm);

      const matchesSeverity =
        this.selectedSeverity === 'All' || data.severity === this.selectedSeverity;

      const matchesStatus =
        this.selectedStatus === 'All' || data.status === this.selectedStatus;

      const matchesDateRange =
       (data.last_seen !== null ) &&
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

  isValidDateFormat(date: Date | null): boolean {
    if (!date) return false;
    const dateStr = date.toISOString().slice(0, 10).replace(/-/g, '/');
    return /^\d{4}\/\d{2}\/\d{2}$/.test(dateStr);
  }

  applyDateFilter(): void {
    if (this.isDateRangeValid) {
      this.dataSource.filterPredicate = (data: Issue, filter: string) => {
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
    console.log('Calculating score class for value:', value, 'type:', type);
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

      if (Number(value) > 6.9) {
        return 'high';
      }

      if (Number(value) > 3.9 && Number(value) <= 6.9) {
        return 'medium';
      }

      if (Number(value) <= 3.9) {
        return 'low';
      }
    }
    return 'unknown';
  }

  navigateToIssueDetail(issue: Issue): void {
    console.log('Navigating to issue detail:', issue);
  }

  // navigateToIssueDetail(issue: Issue): void {
  //   this.router.navigate([ISSUE_PATH, issue.name], {
  //     queryParams: {
  //       severity: issue.severity,
  //       status: issue.status,
  //       description: issue.description,
  //       impact: issue.impact,
  //     },
  //   });
  // }

  private getData(): Observable<CVE[]> {
    return this.data.getAllCVEDetails();
  }

  private processIssues(): void {

    this.issues = this.cveDetails.map((cve, index) => ({
      name: cve.CVE_id,
      severity: this.scoreClass(cve.base_score_v3, 3) ?? "",
      status: "Open",
      description: cve.description,
      last_seen: cve.published_date ? new Date(cve.published_date) : null,
      impact: cve.impact
    }));

    this.dataSource.data = this.issues;

    console.log('Processed Issues:', this.issues, this.dataSource.data);

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
