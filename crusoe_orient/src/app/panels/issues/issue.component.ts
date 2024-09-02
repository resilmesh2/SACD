import { Component, OnInit, ViewChild, AfterViewInit, ElementRef, ChangeDetectorRef } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Observable, zip } from 'rxjs';
import { DataService } from 'src/app/shared/services/data.service';
import { Issue } from 'src/app/app.data';
import { CVE } from 'src/app/shared/models/vulnerability.model';

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

  constructor(private data: DataService, private changeDetector: ChangeDetectorRef) {
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

      return matchesSearchTerm && matchesSeverity && matchesStatus;
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

  private getCombinedData(): Observable<[CVE[], string[]]> {
    const cveDetails$: Observable<CVE[]> = this.data.getAllCVEDetails();
    const ipAddresses$: Observable<string[]> = this.data.getIPAddresses();
    
    // validation Data
    const testingVuln$: Observable<any[]> = this.data.getTestingSoftware();
    const testingHostArray$: Observable<any[]> = this.data.getTestingHostArray();
    
    testingVuln$.subscribe(data => console.log('IssueComponent - CombinedData() - Testing Vulnerabilities', data));
    testingHostArray$.subscribe(data => console.log('IssueComponent - CombinedData() - Testing Host Array', data));

   
    return zip(cveDetails$, ipAddresses$);
  }

  private processIssues(): void {

    this.issues = this.cveDetails.map((cve, index) => ({
      name: cve.CVE_id,
      severity: this.scoreClass(cve.base_score_v3, 3),
      status: "Open",
      affected_entity: this.ipAddresses[index],
      description: cve.description,
      last_seen: cve.published_date,
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
