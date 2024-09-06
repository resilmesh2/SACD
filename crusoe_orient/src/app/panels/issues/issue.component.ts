import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Issue, issues } from 'src/app/app.data.ts';

@Component({
  selector: 'app-issue',
  templateUrl: './issue.component.html',
  styleUrls: ['./issue.component.scss'],
})
export class IssueComponent implements OnInit, AfterViewInit {
  dataSource = new MatTableDataSource<Issue>(issues);
  displayedColumns: string[] = ['name', 'severity', 'status', 'affected_entity', 'description'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  selectedSeverity = 'All'; // Default to "All" to show all data
  uniqueSeverities: string[] = []; // Array to hold unique severity values

  ngOnInit(): void {
    // Get unique severity values for the dropdown
    this.uniqueSeverities = Array.from(new Set(issues.map(issue => issue.severity)));
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    // Filter logic for both search term and severity
    this.dataSource.filterPredicate = (data: Issue, filter: string): boolean => {
      const searchTerm = filter.trim().toLowerCase();
      const matchesSearchTerm =
        data.name.toLowerCase().includes(searchTerm) ||
        data.affected_entity.toLowerCase().includes(searchTerm);

      // Filter based on the selected severity
      const matchesSeverity =
        this.selectedSeverity === 'All' || data.severity === this.selectedSeverity;

      // Return true if both conditions match
      return matchesSearchTerm && matchesSeverity;
    };
  }

  // Apply filter when search or dropdown value changes
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement)?.value || '';

    // Set the filter on the dataSource
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // Apply filter when severity dropdown changes
  onSeverityChange(): void {
    // Reapply the filter after changing severity
    this.dataSource.filter = this.dataSource.filter.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
