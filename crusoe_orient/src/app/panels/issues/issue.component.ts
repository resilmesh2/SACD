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

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    // Assign the paginator and sort after the view has been initialized
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    // Customize filterPredicate to filter by 'name' or 'affected_entity'
    this.dataSource.filterPredicate = (data: Issue, filter: string) => {
      const filterValue = filter.trim().toLowerCase();

      // Check if the filter matches either the name or affected_entity
      return (
        data.name.trim().toLowerCase().includes(filterValue) ||
        data.affected_entity.trim().toLowerCase().includes(filterValue)
      );
    };
  }

  // Method to apply the filter when user types in the search box
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
