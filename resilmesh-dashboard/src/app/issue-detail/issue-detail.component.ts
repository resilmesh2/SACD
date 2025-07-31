import { Component, OnInit, ViewChild, AfterViewInit, ElementRef, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { DataService } from '../shared/services/data.service';

export interface IssueDetail {
  affectedAsset: string;
  description: string;
  software: string;
  vulnerabilityCount: number;
}

export interface VulnerabilityData {
  ip: string;
  domainName: string;
  subnet: string;
  software: string;
}

@Component({
  selector: 'app-issue',
  templateUrl: './issue-detail.component.html',
  styleUrls: ['./issue-detail.component.scss'],
})

export class IssueDetailComponent implements OnInit, AfterViewInit {

  dataSource = new MatTableDataSource<IssueDetail>();

  displayedColumns: string[] = ['affectedAsset', 'description', 'software', 'vulnerabilityCount'];

  paginator: MatPaginator | null = null;

  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    this.setDataSourceAttributes();
  }

  setDataSourceAttributes() {
    this.dataSource.paginator = this.paginator;
  }
  
  issueName = '';
  issueSeverity = '';
  issueStatus = '';
  issueImpact = '';
  issueDescription = '';
  totalOccurrences = 0;

  issueDetails: IssueDetail[] = [];
  dataLoaded = false;
  dataLoading = false;
  emptyResponse = false;
  errorResponse = '';

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private data: DataService,
  ) {
      this.dataSource = new MatTableDataSource<IssueDetail>([]);
    }

  ngOnInit(): void {

    this.dataLoading = true;    
    this.getRouteParameters();
    this.getVulnerableAssets();  
  }

  ngAfterViewInit(): void {

    if (this.dataSource && this.paginator && this.dataLoaded) {
      this.dataSource.paginator = this.paginator;
    }
  }

  getRouteParameters(): void {
    
    this.route.paramMap.subscribe(params => {
      this.issueName = params.get('name') || '';
    });

    this.route.queryParams.subscribe(params => {
      this.issueSeverity = params['severity'] || '';
      this.issueStatus = params['status'] || '';
      this.issueDescription = params['description'] || '';
      this.issueImpact = params['impact'] || '';
    });
  }

  getVulnerableAssets(): void {
    console.log('Get Vulnerable Assets');

    this.data.getVulnerableMachines(this.issueName)
      .pipe(
        catchError((error) => {
          this.errorResponse = `Error fetching data: ${error}`;
          this.dataLoading = false;
          this.emptyResponse = true;
          console.error(this.errorResponse);
          return of([]);
        })
      )
      .subscribe(
        (vulnerables: VulnerabilityData[] | null) => {
          if (vulnerables && vulnerables.length > 0) {
            // Filter and map valid rows
            this.issueDetails = vulnerables
              .filter(row => row.ip && row.domainName && row.subnet && row.software)
              .map(row => ({
                affectedAsset: row.ip,
                description: this.issueDescription,
                software: row.software,
                vulnerabilityCount: 1
              }));

            this.totalOccurrences = this.issueDetails.length;

            // Set the dataSource with the fetched issueDetails
            this.setDataSource();
          } else {
            this.emptyResponse = true;
          }

          this.dataLoading = false;
          this.dataLoaded = true;
        }
      );
  }

  setDataSource(): void {
    this.dataSource.data = this.issueDetails;

    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }

  goBack(): void {
    this.location.back();
  }
}
