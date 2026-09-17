import { Component, OnInit, ViewChild, DestroyRef, signal, computed, WritableSignal, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { EMPTY, forkJoin, Observable, Subject, Subscription } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, map, startWith, switchMap } from 'rxjs/operators';
import { FormsModule } from '@angular/forms';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { Router } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { SentinelCardComponent } from '@sentinel/components/card';
import { SentinelControlItem } from '@sentinel/components/controls';
import { TagComponent } from '../../components/tag-component/tag.component';
import { SentinelButtonWithIconComponent } from '@sentinel/components/button-with-icon';
import { MatIcon } from '@angular/material/icon';
import { ASSETS_PATH, NETWORK_NODES_PATH, SUBNETS_PATH } from '../../paths';
import { AssetStatusEditChipComponent } from './asset-status-edit-chip/asset-status-edit-chip.component';
import { InlineElementDirective, InlineElementsPreviewComponent } from '../../components/inline-elements-preview';
import {
  AssetPageGetIPsPaginatedQueryService,
  AssetPageGetNetworkServicesPaginatedQueryService,
  AssetPageGetDomainNamesPaginatedQueryService,
  AssetPageGetTypeCountsQueryService,
  AssetPageGetServiceOptionsQueryService,
  AssetPageGetIpTagsQueryService,
  AssetPageUpdateIpTagMutationService,
} from './graphql/asset-page.operation.generated';
import { GetAllSubnetsQueryService } from '../../graphql/subnets/subnets.operation.generated';
import {
  DomainNameOptions,
  DomainNameWhere,
  IpOptions,
  IpWhere,
  NetworkServiceHostsConnectionWhere,
  NetworkServiceOptions,
  NetworkServiceWhere,
  SortDirection,
} from '../../../generated/base-types';

export type AssetType = 'IP' | 'NetworkService' | 'DomainName';

export interface Asset {
  type: AssetType;
  ip: string;
  status: string;
  subnet: string[];
  tag: string[];
  ips: string[];
  services: string[];
  service: string | null;
  port?: number | null;
  protocol?: string | null;
  domainName?: string;
  isEditOpen?: boolean;
}

const ALL = 'All';
const NETWORK_ONLY = { fetchPolicy: 'network-only' } as const;

const DISPLAYED_COLUMNS: Record<AssetType, string[]> = {
  IP: ['ip', 'status', 'subnet', 'services', 'tag'],
  NetworkService: ['service', 'port', 'protocol', 'ips'],
  DomainName: ['domainName', 'ips'],
};

// MatSort column id -> GraphQL sort field, per type. Columns absent here are not sortable.
const SORT_FIELDS: Record<AssetType, Record<string, string>> = {
  IP: { ip: 'address', status: 'status' },
  NetworkService: { service: 'service', port: 'port', protocol: 'protocol' },
  DomainName: { domainName: 'domain_name' },
};

const SEARCH_PLACEHOLDER: Record<AssetType, string> = {
  IP: 'Search by IP',
  NetworkService: 'Search by host IP',
  DomainName: 'Search by domain or IP',
};

@Component({
  selector: 'asset-page',
  templateUrl: './asset-page.component.html',
  styleUrls: ['./asset-page.component.scss'],
  imports: [
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonToggleModule,
    FormsModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    SentinelCardComponent,
    TagComponent,
    SentinelButtonWithIconComponent,
    MatIcon,
    AssetStatusEditChipComponent,
    InlineElementsPreviewComponent,
    InlineElementDirective,
  ],
})
export class AssetPageComponent implements OnInit {
  dataSource = new MatTableDataSource<Asset>([]);

  private paginator: MatPaginator | null = null;
  private sort: MatSort | null = null;
  private paginatorSub: Subscription | null = null;
  private sortSub: Subscription | null = null;

  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    // Runs every time the paginator is (re)created, not just the first time -
    // the element it's on gets torn down and rebuilt whenever the loading/empty state
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

  activeType = signal<AssetType>('IP');
  displayedColumns = computed(() => DISPLAYED_COLUMNS[this.activeType()]);
  searchPlaceholder = computed(() => SEARCH_PLACEHOLDER[this.activeType()]);
  typeCounts = signal<Record<AssetType, number> | null>(null);

  totalCount = 0;
  dataLoading = false;
  emptyResponse = false;
  errorResponse = '';

  defaultValue = ALL;
  readonly statusOptions = ['unknown', 'known', 'rediscovered'];
  tags = signal<string[]>([]);
  subnets = signal<string[]>([]);
  serviceOptions = signal<string[]>([]);
  portOptions = signal<number[]>([]);
  protocolOptions = signal<string[]>([]);

  searchTerm: WritableSignal<string> = signal('');
  selectedStatus: WritableSignal<string> = signal(ALL);
  selectedSubnet: WritableSignal<string> = signal(ALL);
  selectedTag: WritableSignal<string> = signal(ALL);
  selectedService: WritableSignal<string> = signal(ALL);
  selectedPort: WritableSignal<number | typeof ALL> = signal(ALL);
  selectedProtocol: WritableSignal<string> = signal(ALL);

  controls: SentinelControlItem[] = [];

  private readonly fetch$ = new Subject<void>();
  private readonly search$ = new Subject<string>();
  private destroyRef = inject(DestroyRef);
  private router = inject(Router);

  constructor(
    private getIPs: AssetPageGetIPsPaginatedQueryService,
    private getNetworkServices: AssetPageGetNetworkServicesPaginatedQueryService,
    private getDomainNames: AssetPageGetDomainNamesPaginatedQueryService,
    private getTypeCounts: AssetPageGetTypeCountsQueryService,
    private getServiceOptions: AssetPageGetServiceOptionsQueryService,
    private getIpTags: AssetPageGetIpTagsQueryService,
    private getAllSubnets: GetAllSubnetsQueryService,
    private updateIpTag: AssetPageUpdateIpTagMutationService,
  ) {}

  ngOnInit(): void {
    this.dataLoading = true;
    this.loadTags();
    this.loadSubnets();
    this.loadServiceOptions();

    this.search$
      .pipe(debounceTime(300), distinctUntilChanged(), takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.applyFilters());

    this.fetch$
      .pipe(
        startWith(undefined as void),
        switchMap(() => {
          this.errorResponse = '';
          return forkJoin({ page: this.fetchPage(), counts: this.fetchTypeCounts() }).pipe(
            catchError((error) => {
              this.errorResponse = error.message ?? error;
              this.dataLoading = false;
              return EMPTY;
            }),
          );
        }),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe(({ page: { rows, total }, counts }) => {
        this.typeCounts.set(counts);
        this.totalCount = total;
        // A collection-wide empty state, not "the current filters have no matches" - the
        // latter is handled inline by *matNoDataRow so the filter bar stays usable.
        this.emptyResponse = total === 0 && !this.hasActiveFilters();
        this.dataLoading = false;

        const pageSize = this.paginator?.pageSize ?? 25;
        const lastPageIndex = Math.max(0, Math.ceil(total / pageSize) - 1);
        if (rows.length === 0 && total > 0 && this.paginator && this.paginator.pageIndex > lastPageIndex) {
          this.paginator.pageIndex = lastPageIndex;
          this.fetch$.next();
          return;
        }

        this.dataSource.data = rows;
      });
  }

  private fetchPage(): Observable<{ rows: Asset[]; total: number }> {
    const page = this.pageOptions();
    const sort = this.activeSort();

    switch (this.activeType()) {
      case 'IP': {
        const options: IpOptions = { ...page, ...(sort && { sort: [{ [sort.field]: sort.dir }] }) };
        return this.getIPs.fetch({ where: this.buildIpWhere(), options }, NETWORK_ONLY).pipe(
          map(({ data }) => ({
            total: data.ipsAggregate.count,
            rows: data.ips.map(
              (ip): Asset => ({
                type: 'IP',
                ip: ip.address,
                status: ip.status ?? 'unknown',
                subnet: ip.subnets.map((s) => s.range),
                tag: (ip.tag ?? []).filter((t): t is string => t !== null),
                ips: [],
                services: ip.nodes.flatMap(
                  (node) =>
                    node.host?.network_services.map(
                      (svc) => `${svc.service ?? ''}:${svc.port ?? ''}/${svc.protocol ?? ''}`,
                    ) ?? [],
                ),
                service: null,
              }),
            ),
          })),
        );
      }
      case 'NetworkService': {
        const options: NetworkServiceOptions = { ...page, ...(sort && { sort: [{ [sort.field]: sort.dir }] }) };
        return this.getNetworkServices
          .fetch({ where: this.buildNetworkServiceWhere(), options, hostWhere: this.buildHostWhere() }, NETWORK_ONLY)
          .pipe(
            map(({ data }) => ({
              total: data.networkServicesAggregate.count,
              rows: data.networkServices.map((svc): Asset => {
                // A NetworkService node is shared by every host running it; the nested
                // connection is filtered with the same host criteria as the top-level query,
                // so these are exactly the hosts that made the service match.
                const hosts = svc.hostsConnection.edges;
                return {
                  type: 'NetworkService',
                  ip: hosts[0]?.node.node?.ips[0]?.address ?? 'N/A',
                  status: 'unknown',
                  subnet: [],
                  tag: [],
                  ips: hosts.flatMap((edge) => edge.node.node?.ips.map((ip) => ip.address) ?? []),
                  services: [],
                  service: svc.service ?? null,
                  port: svc.port,
                  protocol: svc.protocol,
                };
              }),
            })),
          );
      }
      case 'DomainName': {
        const options: DomainNameOptions = { ...page, ...(sort && { sort: [{ [sort.field]: sort.dir }] }) };
        return this.getDomainNames.fetch({ where: this.buildDomainNameWhere(), options }, NETWORK_ONLY).pipe(
          map(({ data }) => ({
            total: data.domainNamesAggregate.count,
            rows: data.domainNames.map(
              (domain): Asset => ({
                type: 'DomainName',
                domainName: domain.domain_name,
                ip: domain.ips[0]?.address ?? 'N/A',
                ips: domain.ips.map((ip) => ip.address),
                status: 'known',
                subnet: [],
                tag: [],
                services: [],
                service: null,
              }),
            ),
          })),
        );
      }
    }
  }

  private pageOptions(): { limit: number; offset: number } {
    const pageSize = this.paginator?.pageSize ?? 25;
    return { limit: pageSize, offset: (this.paginator?.pageIndex ?? 0) * pageSize };
  }

  private activeSort(): { field: string; dir: SortDirection } | undefined {
    if (!this.sort?.active || !this.sort.direction) return undefined;
    const field = SORT_FIELDS[this.activeType()][this.sort.active];
    if (!field) return undefined;
    return { field, dir: this.sort.direction === 'asc' ? SortDirection.Asc : SortDirection.Desc };
  }

  private hasActiveFilters(): boolean {
    return (
      this.searchTerm().trim() !== '' ||
      this.selectedStatus() !== ALL ||
      this.selectedSubnet() !== ALL ||
      this.selectedTag() !== ALL ||
      this.selectedService() !== ALL ||
      this.selectedPort() !== ALL ||
      this.selectedProtocol() !== ALL
    );
  }

  private buildIpWhere(): IpWhere | undefined {
    const parts: IpWhere[] = [];
    const term = this.searchTerm().trim();
    if (term) parts.push({ address_CONTAINS: term });

    const status = this.selectedStatus();
    if (status !== ALL) {
      // An IP with no status is displayed as 'unknown', so that filter must match it too.
      parts.push(status === 'unknown' ? { OR: [{ status }, { status: null }] } : { status });
    }

    const subnet = this.selectedSubnet();
    if (subnet !== ALL) parts.push({ subnets_SOME: { range: subnet } });

    const tag = this.selectedTag();
    if (tag !== ALL) parts.push({ tag_INCLUDES: tag });

    return parts.length > 0 ? { AND: parts } : undefined;
  }

  // Host-level criteria for services (the host's IP). Used both to select services
  // (hostsConnection_SOME) and to narrow the hosts returned for each service, so the
  // listed hosts are exactly the ones that made the service match.
  private buildHostWhere(): NetworkServiceHostsConnectionWhere | undefined {
    const term = this.searchTerm().trim();
    return term ? { node: { node: { ips_SOME: { address_CONTAINS: term } } } } : undefined;
  }

  private buildNetworkServiceWhere(): NetworkServiceWhere | undefined {
    const parts: NetworkServiceWhere[] = [];
    const hostWhere = this.buildHostWhere();
    if (hostWhere) parts.push({ hostsConnection_SOME: hostWhere });

    const service = this.selectedService();
    if (service !== ALL) parts.push({ service });
    const port = this.selectedPort();
    if (port !== ALL) parts.push({ port });
    const protocol = this.selectedProtocol();
    if (protocol !== ALL) parts.push({ protocol });

    return parts.length > 0 ? { AND: parts } : undefined;
  }

  private buildDomainNameWhere(): DomainNameWhere | undefined {
    const term = this.searchTerm().trim();
    if (!term) return undefined;
    return { OR: [{ domain_name_CONTAINS: term }, { ips_SOME: { address_CONTAINS: term } }] };
  }

  // Per-type counts under the current filters, so the toggle labels answer "how many of
  // each would I see with these filters" rather than showing collection totals.
  private fetchTypeCounts(): Observable<Record<AssetType, number>> {
    return this.getTypeCounts
      .fetch(
        {
          ipWhere: this.buildIpWhere(),
          serviceWhere: this.buildNetworkServiceWhere(),
          domainWhere: this.buildDomainNameWhere(),
        },
        NETWORK_ONLY,
      )
      .pipe(
        map(({ data }) => ({
          IP: data.ipsAggregate.count,
          NetworkService: data.networkServicesAggregate.count,
          DomainName: data.domainNamesAggregate.count,
        })),
      );
  }

  private loadTags(): void {
    this.getIpTags
      .fetch({}, NETWORK_ONLY)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(({ data }) => {
        const tags = data.ips.flatMap((ip) => ip.tag ?? []).filter((t): t is string => t !== null);
        this.tags.set([...new Set(tags)].sort());
      });
  }

  // Service nodes are deduplicated (service, port, protocol) definitions, so this scan is small.
  private loadServiceOptions(): void {
    this.getServiceOptions
      .fetch({}, NETWORK_ONLY)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(({ data }) => {
        const distinct = <T>(values: (T | null | undefined)[]): T[] => [
          ...new Set(values.filter((v): v is T => v != null)),
        ];
        this.serviceOptions.set(distinct(data.networkServices.map((svc) => svc.service)).sort());
        this.portOptions.set(distinct(data.networkServices.map((svc) => svc.port)).sort((a, b) => a - b));
        this.protocolOptions.set(distinct(data.networkServices.map((svc) => svc.protocol)).sort());
      });
  }

  private loadSubnets(): void {
    this.getAllSubnets
      .fetch({}, NETWORK_ONLY)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(({ data }) => this.subnets.set(data.subnets.map((s) => s.range).sort()));
  }

  countLabel(type: AssetType): string {
    const count = this.typeCounts()?.[type];
    return count === undefined ? '' : ` (${count})`;
  }

  setType(type: AssetType): void {
    if (type === this.activeType()) return;
    this.activeType.set(type);
    // The search term carries over (it means "IP" on every tab); the dropdowns don't all apply.
    this.selectedStatus.set(ALL);
    this.selectedSubnet.set(ALL);
    this.selectedTag.set(ALL);
    this.selectedService.set(ALL);
    this.selectedPort.set(ALL);
    this.selectedProtocol.set(ALL);
    this.dataSource.data = [];
    this.dataLoading = true;
    if (this.paginator) this.paginator.pageIndex = 0;
    this.fetch$.next();
  }

  applyFilters(): void {
    if (this.paginator) this.paginator.pageIndex = 0;
    this.fetch$.next();
  }

  applySearch(): void {
    this.search$.next(this.searchTerm());
  }

  resetFilters(): void {
    this.searchTerm.set('');
    this.selectedStatus.set(ALL);
    this.selectedSubnet.set(ALL);
    this.selectedTag.set(ALL);
    this.selectedService.set(ALL);
    this.selectedPort.set(ALL);
    this.selectedProtocol.set(ALL);
    this.applyFilters();
  }

  saveData(address: string, tags: string[]): void {
    this.updateIpTag
      .mutate({ address, tag: tags })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          const row = this.dataSource.data.find((asset) => asset.ip === address);
          if (row) row.tag = tags;
          this.loadTags();
        },
        error: (e) => console.error('Error updating IP tags:', e),
      });
  }

  // Tooltip transform for inline-elements-preview
  readonly identity = (value: string): string => value;

  navigateToAssetDetail(ip: string): void {
    this.router.navigate([ASSETS_PATH, ip]);
  }

  navigateToNetworkNodeView(ip: string): void {
    this.router.navigate([NETWORK_NODES_PATH], { queryParams: { ip } });
  }

  navigateToSubnetDetail(subnetRange: string): void {
    this.router.navigate([SUBNETS_PATH, subnetRange]);
  }
}
