import { Component, OnInit, ViewChild, AfterViewInit, ElementRef, ChangeDetectorRef } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
# import { MatSort } from '@angular/material/sort';
import { zip } from 'rxjs';
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
  
  ngOnInit(): void {}

  ngAfterViewInit() {
    # This will ensure that paginator is assigned after view initialization
    this.dataSource.paginator = this.paginator;
  }  
}
