import { Component, OnInit, ViewChild, AfterViewInit, ElementRef, ChangeDetectorRef } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { zip } from 'rxjs';
import { Issue, issues } from 'src/app/app.data';

@Component({
  selector: 'app-issue',
  templateUrl: './issue.component.html',
  styleUrls: ['./issue.component.scss'],
})

export class IssueComponent implements OnInit, AfterViewInit {
  dataSource = new MatTableDataSource<Issue>(issues);

  displayedColumns: string[] = ['name', 'severity', 'status', 'affected_entity', 'description', 'last_seen'];
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  selectedSeverity = 'All';
  selectedStatus = 'All';
  issueSeverity: string[] = [];
  issueStatus: string[] = [];

  ngOnInit(): void {

    this.issueSeverity = Array.from(new Set(issues.map(issue => issue.severity)));
    this.issueStatus = Array.from(new Set(issues.map(issue => issue.status)));
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

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
  }

  onSeverityChange(): void {
    this.dataSource.filter = this.dataSource.filter.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onStatusChange(): void {
    this.dataSource.filter = this.dataSource.filter.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
