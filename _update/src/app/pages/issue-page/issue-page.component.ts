import { Component, OnInit, ViewChild, AfterViewInit, ElementRef, ChangeDetectorRef, computed, effect, WritableSignal, signal } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { Router } from '@angular/router';
import { Issue } from '../../models/issue.model';
import { CVE } from '../../models/vulnerability.model';
import { DataService } from '../../services/data.service';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { DatePipe } from '@angular/common';
import { SentinelCardComponent } from '@sentinel/components/card';
import { SentinelControlItem } from '@sentinel/components/controls';
import { SentinelButtonWithIconComponent } from '@sentinel/components/button-with-icon';
import { provideMomentDateAdapter } from '@angular/material-moment-adapter';
import { DATE_FORMAT } from '../../config/dateFormat';
import { CvssScoreChipComponent } from '../../components/cvss-score-chip/cvss-score-chip.component';

interface Filter {
    name: string;
    options: string[];
    defaultValue: string;
}


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
    SentinelButtonWithIconComponent,
    CvssScoreChipComponent
  ],
  providers: [
    provideMomentDateAdapter(DATE_FORMAT)
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

  cveDetails: CVE[] = [];
  dataLoaded = false;
  dataLoading = false;
  emptyResponse = false;
  errorResponse = '';

  issues = signal<Issue[]>([]);
  totalSortedIssues = computed(() => this.dataSource.filteredData.length);

  filters: Filter[] = []; // Filters for severity and status (+ potentially other selects in the future)
  defaultValue = "All";
  filterDictionary = new Map<string, string>();

  selectedSeverity: WritableSignal<string> = signal(this.defaultValue);
  selectedStatus: WritableSignal<string> = signal(this.defaultValue);

  severityOptions = computed(() => Array.from(new Set(this.issues().map(issue => issue.severity))));
  statusOptions = computed(() => Array.from(new Set(this.issues().map(issue => issue.status))));

  startDate: WritableSignal<Date | null> = signal(null);
  endDate: WritableSignal<Date | null> = signal(null);
  isDateRangeValid = computed(() => this.startDate() !== null && this.endDate() !== null);

  controls: SentinelControlItem[] = [];

  constructor(
    private data: DataService, 
    private changeDetector: ChangeDetectorRef,
    private router: Router
  ) {
    this.dataSource = new MatTableDataSource<Issue>([]);

    // Fires whenever date range becomes valid or invalid
    effect(() => {
      if (this.isDateRangeValid()) {
        this.applyDateFilter();
      } else {
        this.clearDateFilter();
      }
    })
  }

  ngOnInit(): void {
    this.dataLoading = true;

    this.data.getAllCVEDetails().subscribe({
      next: (cveDetails) => {
        this.cveDetails = cveDetails;

        this.processIssues();

        if (this.cveDetails.length > 0) {
          this.dataLoaded = true;
        } else {
          this.emptyResponse = true;
        }
        this.dataLoading = false;

        this.changeDetector.detectChanges();
      },
      error: (error) => {
        console.error('Error:', error);
        this.errorResponse = error;
        this.dataLoading = false;
        this.changeDetector.detectChanges();
      }
    });

    this.filters.push({name: 'severity', options: this.severityOptions(), defaultValue: this.defaultValue});
    this.filters.push({name: 'status', options: this.statusOptions(), defaultValue: this.defaultValue});
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
        } else {
          isMatch = (value=="All") || (record[key as keyof Issue] == value); 
          if(!isMatch) return false;
        }
      }

      return isMatch;
    };
  }

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

  scoreClass(value: string | number | null, type: number) {
    console.log('Calculating score class for value:', value, 'type:', type);
    if (value === null || value === undefined) {
        return 'unknown';
    }

    if (typeof value == 'string') {
      value = ~~value; // Convert string to number
    }

    if (type === 2) {
      if (value <= 3.9) {
        return 'low';
      }

      if (value > 3.9 && value <= 6.9) {
        return 'medium';
      }

      if (value > 6.9) {
        return 'high';
      }
    } else if (type === 3) {
      if (value > 8.9) {
        return 'critical';
      }

      if (value > 6.9) {
        return 'high';
      }

      if (value > 3.9 && value <= 6.9) {
        return 'medium';
      }

      if (value <= 3.9) {
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

  private processIssues(): void {
    this.issues.set(this.cveDetails.map((cve, _) => ({
      name: cve.CVE_id,
      severity: this.scoreClass(cve.base_score_v31, 3) ?? "",
      status: "Open",
      description: cve.description,
      last_seen: cve.published ? new Date(cve.published) : null,
      impact: cve.impact,
    })));

    this.dataSource.data = this.issues();

    console.log('Processed Issues:', this.issues, this.dataSource.data);

    
    if (this.paginator && this.sort) {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
    
    this.changeDetector.detectChanges();
  }
}
