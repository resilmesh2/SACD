import { ChangeDetectionStrategy, Component, inject, signal, WritableSignal } from '@angular/core';
import { SentinelButtonWithIconComponent } from '@sentinel/components/button-with-icon';
import { ActivatedRoute, Router } from '@angular/router';
import { ASSETS_PATH, CSA_PATH, ISSUE_PATH, MISSION_PATH, ORGANIZATION_PATH, SUBNETS_PATH } from '../../paths';
import { MatIconModule } from '@angular/material/icon';
import { HomePageDataService } from './home-page.data.service';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

@Component({
  selector: 'app-home-page-component',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    SentinelButtonWithIconComponent,
    MatIconModule,
    NgxChartsModule,
    NgxSkeletonLoaderModule
  ],
  standalone: true
})
export class HomePageComponent {
  subnetCount = signal(0);
  orgUnitCount = signal(0);
  ipCount = signal(0);
  nodeCount = signal(0);
  missionCount = signal(0);
  osData = signal<{ name: string; value: number }[]>([]);

  private router = inject(Router);

  constructor(private data: HomePageDataService, route: ActivatedRoute) {
    route.params.subscribe(val => {
      console.log('Route params changed, reloading data...', val);
      this.data.getSubnetsMinimal().subscribe(subnetsCount => {
        this.subnetCount.set(subnetsCount);
      });
      this.data.getOrgUnitsMinimal().subscribe(orgUnits => {
        this.orgUnitCount.set(orgUnits.length);
      });

      this.data.getIPCount().subscribe(ipCount => {
        this.ipCount.set(ipCount);
      });

      this.data.getVulnerabilityCounts().subscribe(vulnCounts => {
        this.vulnerabilityPieChartData.set(vulnCounts);
      });

      this.data.getCSANodesCount().subscribe(nodesCount => {
        this.nodeCount.set(nodesCount);
      });

      this.data.getMissionsCount().subscribe(missionCount => {
        this.missionCount.set(missionCount);
      });
      this.data.getOSData().subscribe(osData => {
        this.osData.set(osData);
      });
    });
  }

  vulnerabilityPieChartData: WritableSignal<{ name: string; value: number }[]> = signal([]);
  customColors = [
      { name: 'critical', value: '#1C1D21' },
      { name: 'high', value: '#ed625e' },
      { name: 'medium', value: '#ed913b' },
      { name: 'low', value: '#f6d55c' }
  ]

  onSelectSeverity(event: any) {
    this.router.navigate([ISSUE_PATH], { queryParams: { severity: event.name } });
  }

  navigateToSubnets(): void {
   this.router.navigate([SUBNETS_PATH]);
  }

  navigateToOrgUnits(): void {
   this.router.navigate([ORGANIZATION_PATH]);
  }

  navigateToIPs(): void {
    this.router.navigate([ASSETS_PATH]);
  }

  navigateToCSANodes(): void {
    this.router.navigate([CSA_PATH]);
  }

  navigateToMissions(): void {
    this.router.navigate([MISSION_PATH]);
  }

}
