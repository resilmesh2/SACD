import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Issue, issues } from 'src/app/app.data';

@Component({
  selector: 'app-issue',
  templateUrl: './issue.component.html',
  styleUrls: ['./issue.component.scss'],
})
export class IssueComponent implements OnInit, AfterViewInit {
  // Initialize the data source with the issues array
  dataSource = new MatTableDataSource<Issue>(issues);

  // Define columns that will be displayed in the table
  displayedColumns: string[] = ['name', 'severity', 'status', 'affected_entity', 'description'];

  // ViewChild to access the paginator component
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    // Assign the paginator to the data source after the view has been initialized
    this.dataSource.paginator = this.paginator;
  }
}
