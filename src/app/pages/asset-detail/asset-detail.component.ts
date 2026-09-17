import { Component, DestroyRef, OnInit, ViewChild, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { SentinelButtonWithIconComponent } from '@sentinel/components/button-with-icon';
import { InlineElementDirective, InlineElementsPreviewComponent } from '../../components/inline-elements-preview';
import { TagComponent } from '../../components/tag-component/tag.component';
import { CriticalityChipComponent } from '../../components/criticality-chip/criticality-chip.component';
import { AssetStatusEditChipComponent } from '../asset-page/asset-status-edit-chip/asset-status-edit-chip.component';
import { AssetDetailGetIpQueryService } from './graphql/asset-detail.operation.generated';
import {
  AssetPageGetIpTagsQueryService,
  AssetPageUpdateIpTagMutationService,
} from '../asset-page/graphql/asset-page.operation.generated';
import { NETWORK_NODES_PATH, SUBNETS_PATH, VULNERABILITY_PATH } from '../../paths';

interface ServiceRow {
  service: string;
  port: number | null;
  protocol: string;
  status: string;
  isEditOpen?: boolean;
}

interface SoftwareRow {
  version: string;
  vulnerabilities: string[];
}

@Component({
  selector: 'asset-detail',
  templateUrl: './asset-detail.component.html',
  styleUrls: ['./asset-detail.component.scss'],
  imports: [
    MatPaginatorModule,
    MatTableModule,
    MatProgressSpinner,
    SentinelButtonWithIconComponent,
    InlineElementsPreviewComponent,
    InlineElementDirective,
    TagComponent,
    AssetStatusEditChipComponent,
    CriticalityChipComponent,
  ],
})
export class AssetDetailComponent implements OnInit {
  servicesDataSource = new MatTableDataSource<ServiceRow>([]);
  softwareDataSource = new MatTableDataSource<SoftwareRow>([]);
  servicesColumns = ['service', 'port', 'protocol', 'status'];
  softwareColumns = ['version', 'vulnerabilities', 'vulnerabilityCount'];

  @ViewChild('servicesPaginator') set servicesPaginator(mp: MatPaginator | undefined) {
    this.servicesDataSource.paginator = mp ?? null;
  }

  @ViewChild('softwarePaginator') set softwarePaginator(mp: MatPaginator | undefined) {
    this.softwareDataSource.paginator = mp ?? null;
  }

  address = '';
  version: number | null = null;
  status = 'unknown';
  tags: string[] = [];
  subnets: string[] = [];
  domainNames: string[] = [];
  hostnames: string[] = [];
  criticality: number | null = null;
  vulnerabilityCount = 0;
  allTags = signal<string[]>([]);

  dataLoading = false;
  notFound = false;
  errorResponse = '';

  private router = inject(Router);
  private destroyRef = inject(DestroyRef);

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private getIp: AssetDetailGetIpQueryService,
    private getIpTags: AssetPageGetIpTagsQueryService,
    private updateIpTag: AssetPageUpdateIpTagMutationService,
  ) {}

  ngOnInit(): void {
    this.route.paramMap.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((params) => {
      this.address = params.get('address') || '';
      this.fetchAsset();
    });
    this.loadAllTags();
  }

  private fetchAsset(): void {
    this.dataLoading = true;
    this.errorResponse = '';
    this.notFound = false;

    this.getIp
      .fetch({ address: this.address }, { fetchPolicy: 'network-only' })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: ({ data }) => {
          const ip = data.ips[0];
          if (!ip) {
            this.notFound = true;
            this.dataLoading = false;
            return;
          }

          this.version = ip.version ?? null;
          this.status = ip.status ?? 'unknown';
          this.tags = (ip.tag ?? []).filter((t): t is string => t !== null);
          this.subnets = ip.subnets.map((s) => s.range);
          this.domainNames = ip.domain_names.map((d) => d.domain_name);
          this.hostnames = ip.nodes.flatMap((node) => (node.host?.hostname ? [node.host.hostname] : []));
          this.criticality = ip.nodes.find((node) => node.final_criticality != null)?.final_criticality ?? null;

          const software = ip.nodes.flatMap((node) => node.host?.software_versions ?? []);
          const byVersion = new Map<string, Set<string>>();
          for (const sv of software) {
            const cves = byVersion.get(sv.version) ?? new Set<string>();
            for (const v of sv.vulnerabilities) if (v.cve?.cve_id) cves.add(v.cve.cve_id);
            byVersion.set(sv.version, cves);
          }
          this.softwareDataSource.data = [...byVersion].map(([version, cves]) => ({
            version,
            vulnerabilities: [...cves],
          }));
          this.vulnerabilityCount = new Set([...byVersion.values()].flatMap((cves) => [...cves])).size;

          this.servicesDataSource.data = data.networkServices.map((svc) => ({
            service: svc.service ?? '',
            port: svc.port ?? null,
            protocol: svc.protocol ?? '',
            status: svc.hostsConnection.edges[0]?.properties.status ?? 'unknown',
          }));

          this.dataLoading = false;
        },
        error: (error) => {
          this.errorResponse = error.message ?? `${error}`;
          this.dataLoading = false;
        },
      });
  }

  private loadAllTags(): void {
    this.getIpTags
      .fetch({}, { fetchPolicy: 'network-only' })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(({ data }) => {
        const tags = data.ips.flatMap((ip) => ip.tag ?? []).filter((t): t is string => t !== null);
        this.allTags.set([...new Set(tags)].sort());
      });
  }

  serviceData(row: ServiceRow): { service: string; port: number; protocol: string } {
    return { service: row.service, port: row.port ?? 0, protocol: row.protocol };
  }

  saveTags(address: string, tags: string[]): void {
    this.updateIpTag
      .mutate({ address, tag: tags })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.tags = tags;
          this.loadAllTags();
        },
        error: (e) => console.error('Error updating IP tags:', e),
      });
  }

  // Tooltip transform for inline-elements-preview
  readonly identity = (value: string): string => value;

  goBack(): void {
    this.location.back();
  }

  navigateToNetworkNodeView(): void {
    this.router.navigate([NETWORK_NODES_PATH], { queryParams: { ip: this.address } });
  }

  navigateToSubnetDetail(subnetRange: string): void {
    this.router.navigate([SUBNETS_PATH, subnetRange]);
  }

  navigateToVulnDetail(cveId: string): void {
    this.router.navigate([VULNERABILITY_PATH], { queryParams: { cve: cveId } });
  }
}
