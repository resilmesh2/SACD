import { Component, OnInit, ViewChild, AfterViewInit, ElementRef, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Issue } from 'src/app/app.data';
import { DataService } from 'src/app/shared/services/data.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-issue',
  templateUrl: './issue-details.component.html',
  styleUrls: ['./issue-details.component.scss'],
})

export class IssueDetailComponent implements OnInit, AfterViewInit {
  
  // later use
  // dataSource = new MatTableDataSource<Issue-Detail>();
  // displayedColumns: string[] = ['Affected Assets', 'description', 'software', 'vulnerability occurrences'];
  
  issueName = '';
  issueSeverity = '';
  issueStatus = '';
  issueImpact = '';
  // total occurrences = 0;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.issueName = params.get('name') || '';
    });

    this.route.queryParams.subscribe(params => {
      this.issueSeverity = params['severity'] || '';
      this.issueStatus = params['status'] || '';
      this.issueImpact = params['impact'] || '';
    });
  }

  ngAfterViewInit() {

  }

  goBack(): void {
    this.location.back();
  }
}
