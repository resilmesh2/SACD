import { Component, OnInit, ViewChild, DestroyRef, signal, WritableSignal, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { EMPTY, Subject, Subscription } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, startWith, switchMap } from 'rxjs/operators';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { Router } from '@angular/router';

import { ENTER } from '@angular/cdk/keycodes';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { SentinelCardComponent } from '@sentinel/components/card';
import { SentinelButtonWithIconComponent } from '@sentinel/components/button-with-icon';
import { MatIcon } from '@angular/material/icon';
import { NETWORK_NODES_PATH, SUBNETS_PATH } from '../../paths';
import { CsaPageGetNodeObjectsPaginatedQueryService } from './graphql/csa-page.operation.generated';
import { NodeObjectOptions, NodeObjectSort, NodeObjectWhere, SortDirection } from '../../../generated/base-types';

export interface CSANode {
  ips: string[];
  topology_degree?: number;
  topology_degree_norm: number;
  topology_betweenness?: number;
  topology_betweenness_norm: number;
  final_criticality: number;
  mission_criticality: number;
}

@Component({
  selector: 'csa-page',
  templateUrl: './csa-page.component.html',
  styleUrls: ['./csa-page.component.scss'],
  imports: [
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    SentinelCardComponent,
    SentinelButtonWithIconComponent,
    MatIcon,
  ],
  standalone: true,
})
export class CSAPageComponent implements OnInit {
  dataSource = new MatTableDataSource<CSANode>([]);

  displayedColumns: string[] = [
    'ips',
    'topology_degree_norm',
    'topology_betweenness_norm',
    'mission_criticality',
    'final_criticality',
  ];

  private paginator: MatPaginator | null = null;
  private sort: MatSort | null = null;
  private paginatorSub: Subscription | null = null;
  private sortSub: Subscription | null = null;

  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    // Runs every time the paginator is (re)created, not just the first time -
    // the element it's on gets torn down and rebuilt whenever emptyResponse/errorResponse
    // flips, so the old subscription must be dropped and a fresh one attached each time.
    this.paginatorSub?.unsubscribe();
    this.paginator = mp ?? null;
    this.paginatorSub = mp
      ? mp.page.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => this.fetch$.next())
      : null;
  }

  @ViewChild(MatSort) set matSort(ms: MatSort) {
    this.sortSub?.unsubscribe();
    this.sort = ms ?? null;
    this.sortSub = ms
      ? ms.sortChange.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
          if (this.paginator) this.paginator.pageIndex = 0;
          this.fetch$.next();
        })
      : null;
  }

  totalCount = 0;
  dataLoaded = false;
  dataLoading = false;
  emptyResponse = false;
  errorResponse = '';

  editOn: boolean = false;
  separatorKeysCodes = [ENTER] as const;

  defaultValue = 'All';

  searchTerm: WritableSignal<string> = signal('');

  private readonly fetch$ = new Subject<void>();
  private readonly search$ = new Subject<string>();
  private destroyRef = inject(DestroyRef);
  private router = inject(Router);

  constructor(private getNodeObjects: CsaPageGetNodeObjectsPaginatedQueryService) {}

  COLOR_THRESHOLDS = [9, 7, 5, 3, 1];
  getCriticalityColor = (value: number, isFinalCriticality: boolean = false) => {
    if (value === null || value === undefined) {
      return { bg: '#cacaca', color: '#000000' };
    } else if (value >= this.COLOR_THRESHOLDS[0] * (isFinalCriticality ? 10 : 1)) {
      return { bg: '#1C1D21', color: '#FFFFFF' };
    } else if (value >= this.COLOR_THRESHOLDS[1] * (isFinalCriticality ? 10 : 1)) {
      return { bg: '#9F85FF', color: '#000000' };
    } else if (value >= this.COLOR_THRESHOLDS[2] * (isFinalCriticality ? 10 : 1)) {
      return { bg: '#ed625e', color: '#000000' };
    } else if (value >= this.COLOR_THRESHOLDS[3] * (isFinalCriticality ? 10 : 1)) {
      return { bg: '#ed913b', color: '#000000' };
    } else if (value > this.COLOR_THRESHOLDS[4] * (isFinalCriticality ? 10 : 1)) {
      return { bg: '#f6d55c', color: '#000000' };
    } else {
      return { bg: '#86B46A', color: '#000000' };
    }
  };

  ngOnInit(): void {
    this.dataLoading = true;

    this.search$.pipe(debounceTime(300), distinctUntilChanged(), takeUntilDestroyed(this.destroyRef)).subscribe(() => {
      if (this.paginator) this.paginator.pageIndex = 0;
      this.fetch$.next();
    });

    this.fetch$
      .pipe(
        startWith(undefined as void),
        switchMap(() => {
          this.errorResponse = '';
          return this.getNodeObjects
            .fetch({ options: this.buildOptions(), where: this.buildWhere() }, { fetchPolicy: 'network-only' })
            .pipe(
              catchError((error) => {
                this.errorResponse = error.message ?? error;
                this.dataLoading = false;
                return EMPTY;
              }),
            );
        }),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((result) => {
        this.totalCount = result.data.nodeObjectsAggregate.count;
        this.dataLoaded = true;
        // A collection-wide empty state, not "the search term has no matches" - the latter
        // is handled inline by *matNoDataRow so the search box stays visible to clear it.
        this.emptyResponse = this.totalCount === 0 && !this.searchTerm().trim();
        this.dataLoading = false;

        const nodes = result.data.nodeObjects.map((node) => ({
          ips: node.ips.map((ip) => ip.address),
          topology_degree_norm: node.topology_degree_norm ?? 0,
          topology_betweenness_norm: node.topology_betweenness_norm ?? 0,
          mission_criticality: node.mission_criticality ?? 0,
          final_criticality: node.final_criticality ?? 0,
        }));

        const pageSize = this.paginator?.pageSize ?? 25;
        const lastPageIndex = Math.max(0, Math.ceil(this.totalCount / pageSize) - 1);
        if (nodes.length === 0 && this.totalCount > 0 && this.paginator && this.paginator.pageIndex > lastPageIndex) {
          this.paginator.pageIndex = lastPageIndex;
          this.fetch$.next();
          return;
        }

        this.dataSource.data = nodes;
      });
  }

  private buildOptions(): NodeObjectOptions {
    const sort = this.buildSort();
    const pageSize = this.paginator?.pageSize ?? 25;
    return {
      limit: pageSize,
      offset: (this.paginator?.pageIndex ?? 0) * pageSize,
      sort,
    };
  }

  private buildSort(): NodeObjectSort[] {
    // Table opens pre-sorted (matSortActive="final_criticality" matSortDirection="desc" on
    // the template) before Angular resolves the MatSort ViewChild, so the very first fetch
    // must request that same order itself rather than waiting on user interaction.
    if (!this.sort?.active || !this.sort.direction) return [{ final_criticality: SortDirection.Desc }];
    const dir = this.sort.direction === 'asc' ? SortDirection.Asc : SortDirection.Desc;
    return [{ [this.sort.active]: dir }];
  }

  private buildWhere(): NodeObjectWhere | undefined {
    const term = this.searchTerm().trim();
    return term ? { ips_SOME: { address_CONTAINS: term } } : undefined;
  }

  applyNameFilter(): void {
    this.search$.next(this.searchTerm());
  }

  resetFilters(): void {
    this.searchTerm.set('');
    if (this.paginator) this.paginator.pageIndex = 0;
    this.fetch$.next();
  }

  saveData(_address: string, _tags: string[]): void {
    // TODO: implement via mutation service when tag mutation is added to csa-page.operation.graphql
  }

  selected(event: MatAutocompleteSelectedEvent, tags: string[]): void {
    tags.push(event.option.viewValue);
    event.option.deselect();
  }

  navigateToNetworkNodeView(ip: string): void {
    this.router.navigate([NETWORK_NODES_PATH], {
      queryParams: { ip: ip },
    });
  }

  navigateToSubnetDetail(subnetRange: string): void {
    this.router.navigate([SUBNETS_PATH, subnetRange]);
  }
}
