import { Component, OnInit, ViewChild, AfterViewInit, ElementRef, ChangeDetectorRef, signal, computed, WritableSignal, inject } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { Router } from '@angular/router';
import { Observable, zip } from 'rxjs';

import { ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Subnet } from '../../models/vulnerability.model';
import { DataService } from '../../services/data.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { DatePipe } from '@angular/common';
import { MatNativeDateModule } from '@angular/material/core';
import { SentinelCardComponent } from '@sentinel/components/card';
import { SentinelControlItem } from '@sentinel/components/controls';
import { TagComponent } from '../../components/tag-component/tag.component';
import { SentinelButtonWithIconComponent } from '@sentinel/components/button-with-icon';
import { DateRange } from '@sentinel/common';
import { provideMomentDateAdapter } from '@angular/material-moment-adapter';
import { DATE_FORMAT } from '../../config/dateFormat';
import { MatIcon } from '@angular/material/icon';
import { NETWORK_NODES_PATH, SUBNETS_PATH } from '../../paths';

export interface Service {
  name: string;
  id: string;
  tag: string[];
  subnet: string[];
  severity: string[];
  last_seen: Date | null;
}

export interface CSANode {
  address: string;
  topology_degree?: number;
  topology_degree_norm: number;
  topology_betweenness?: number;
  topology_betweenness_norm: number;
  final_criticality: number;
  mission_criticality: number;
}

interface Filter {
  name: string;
  options: string[];
  defaultValue: string;
}

@Component({
  selector: 'csa-page',
  templateUrl: './csa-page.component.html',
  styleUrls: ['./csa-page.component.scss'],
  imports: [
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    SentinelCardComponent,
    SentinelButtonWithIconComponent,
    MatIcon
  ],
  providers: [
    provideMomentDateAdapter(DATE_FORMAT)
  ]
})

export class CSAPageComponent implements OnInit, AfterViewInit {
  dataSource = new MatTableDataSource<CSANode>();

  displayedColumns: string[] = ['address', 'topology_degree_norm', 'topology_betweenness_norm', 'mission_criticality', 'final_criticality'];

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

  dataLoaded = false;
  dataLoading = false;
  emptyResponse = false;
  errorResponse = '';

  editOn: boolean = false;
  separatorKeysCodes = [ENTER] as const;

  nodes = signal<CSANode[]>([]);
  totalSortedServices = computed(() => this.dataSource.filteredData.length);

  defaultValue = "All";
  filterDictionary = new Map<string, string>();

  searchTerm: WritableSignal<string> = signal('');

  controls: SentinelControlItem[] = [];

  constructor(
    private data: DataService,
    private changeDetector: ChangeDetectorRef,
  ) {
    this.dataSource = new MatTableDataSource<CSANode>([]);
  }

  private router = inject(Router);

  getColor = ((value: number, isFinalCriticality: boolean = false) => {
    if (value === null || value === undefined) {
      return '#cacaca';
    } else if (value >= 9 * (isFinalCriticality ? 10 : 1)) {
      return '#8E5FFD';
    } else if (value >= 8 * (isFinalCriticality ? 10 : 1)) {
      return '#ed625e';
    } else if (value >= 6 * (isFinalCriticality ? 10 : 1)) {
      return '#ed913b';
    } else if (value > 4 * (isFinalCriticality ? 10 : 1)) {
      return '#f6d55c';
    } else {
      return '#86B46A';
    }
  });

  ngOnInit(): void {
    this.dataLoading = true;

    // this.nodes.set([
    //   { address: '10.0.0.1', topology_degree_norm: 1.63433, topology_betweenness_norm: 1.0, mission_criticality: 6, final_criticality: 1.787 },
    // ]);
    // this.dataSource.data = this.nodes();

    // if (this.paginator && this.sort) {
    //   this.dataSource.paginator = this.paginator;
    //   this.dataSource.sort = this.sort;
    // }
    
    // this.changeDetector.detectChanges();

    // this.dataLoading = false;
    // this.dataLoaded = true;

    this.data.getCSANodes().subscribe({
      next: (nodes) => {
        this.nodes.set(nodes);

        this.dataSource.data = this.nodes();

        if (this.paginator && this.sort) {
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }

        if (this.nodes().length > 0) {
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
          isMatch = (value === "All") || (value == '') || record.address.toLowerCase().includes(value.trim().toLowerCase());
          if (!isMatch) return false;
        }
      }

      return isMatch;
    };
  }

  applyNameFilter(): void {
    this.filterDictionary.set('name', this.searchTerm().trim().toLowerCase());
    this.dataSource.filter = JSON.stringify(Array.from(this.filterDictionary.entries()));
    
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  resetFilters(): void {
    this.filterDictionary.clear();
    this.dataSource.filter = '';
    this.searchTerm.set('');

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  saveData(address: string, tags: string[]): void {
    this.data.changeTag(address, tags)
  }

  // private processServices(): void {
  //   this.services.set(this.ips.map((ip, _) => ({
  //     name: ip.address,
  //     id: ip._id,
  //     tag: [...(ip.tag ?? [])],
  //     subnet: (ip.subnets ?? []).map(item => item.range),
  //     severity: ip.tag,
  //     last_seen: null, // TODO: When last_seen is available in the IP model, set it here
  //   })));

  //   this.dataSource.data = this.services();

    
  //   if (this.paginator && this.sort) {
  //     this.dataSource.paginator = this.paginator;
  //     this.dataSource.sort = this.sort;
  //   }
    
  //   this.changeDetector.detectChanges();
  // }

  
  selected(event: MatAutocompleteSelectedEvent, tags: string[]): void {
    tags.push(event.option.viewValue)
    event.option.deselect();
  }

  navigateToNetworkNodeView(node: CSANode): void {
    this.router.navigate([NETWORK_NODES_PATH], {
      queryParams: { ip: node.address }
    });
  }

  navigateToSubnetDetail(subnetRange: string): void {
      this.router.navigate([SUBNETS_PATH, subnetRange]);
  }
  
}
