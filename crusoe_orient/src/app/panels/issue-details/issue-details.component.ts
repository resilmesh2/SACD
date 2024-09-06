import { Component, OnInit, ViewChild, AfterViewInit, ElementRef, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Issue } from '../../panels/issues/issue.component';
import { DataService } from 'src/app/shared/services/data.service';
import { Location } from '@angular/common';
import { VulnerabilityData } from '../../panels/vulnerability/vulnerability.component';
import { Observable } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

export interface VulnerableAsset {
  affectedAsset: string;
  affectedAssetType: string;
  software: string[];
  vulnerabilityCount: number;
}

export interface IssueDetail {
  affectedAsset: string;
  affectedAssetType: string;
  description: string;
  software: string[];
  vulnerabilityCount: number;
}


@Component({
  selector: 'app-issue',
  templateUrl: './issue-details.component.html',
  styleUrls: ['./issue-details.component.scss'],
})

export class IssueDetailComponent implements OnInit, AfterViewInit {

  dataSource = new MatTableDataSource<IssueDetail>();

  displayedColumns: string[] = ['affectedAsset', 'affectedAssetType', 'description', 'software', 'vulnerabilityCount'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
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
      this.dataSource = new MatTableDataSource([]);
    }

  ngOnInit(): void {

    this.dataLoading = true;    
    this.getRouteParameters();
    this.getVulnerableAffectedAssets();  
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
      .subscribe(
        (vulnerables: VulnerabilityData[]) => {
          if (vulnerables && vulnerables.length > 0) {
            // Filter and map valid rows
            this.issueDetails = vulnerables
              .filter(row => row.ip && row.domainName && row.subnet && row.software)
              .map(row => ({
                affectedAsset: row.ip,
                affectedAssetType: 'IP Address',
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
      )
      .pipe(
        catchError((error) => {
          this.errorResponse = `Error fetching data: ${error}`;
          this.dataLoading = false;
          this.emptyResponse = true;
          console.error(this.errorResponse);
          return of([]);
        })
      );
  }

  getVulnerableAffectedAssets(): void {
    this.data.getVulnerableAssets(this.issueName)
      .pipe(
        // Handle errors using catchError before subscribe
        catchError((error) => {
          this.errorResponse = `Error fetching data: ${error}`;
          this.dataLoading = false;
          this.emptyResponse = true;
          console.error(this.errorResponse);
          return of([]); // Return an empty array in case of error
        })
    )
    .subscribe(
      (assets: VulnerableAsset[]) => {
        if (assets && assets.length > 0) {
          // Filter and map valid rows
          this.issueDetails = assets
            .filter(row => 
              row.affectedAsset && 
              row.affectedAssetType && 
              row.software && 
              Array.isArray(row.software) && 
              row.software.every(item => typeof item === 'string') && 
              row.vulnerabilityCount)
            .map(row => ({
              affectedAsset: row.affectedAsset,
              affectedAssetType: row.affectedAssetType,
              description: this.issueDescription,
              software: row.software,
              vulnerabilityCount: row.vulnerabilityCount
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
