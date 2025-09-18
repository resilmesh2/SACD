import { ChangeDetectionStrategy, Component, inject, signal, WritableSignal } from '@angular/core';
import { SentinelButtonWithIconComponent } from '@sentinel/components/button-with-icon';
import { DataService } from '../../services/data.service';
import { Router } from '@angular/router';
import { ASSETS_PATH, ISSUE_PATH, ORGANIZATION_PATH, SUBNETS_PATH } from '../../paths';
import { MatIconModule } from '@angular/material/icon';
import { HomePageDataService } from './home-page.data.service';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-home-page-component',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    SentinelButtonWithIconComponent,
    MatIconModule,
    NgxChartsModule
  ]
})
export class HomePageComponent {
  subnetCount = signal(0);
  orgUnitCount = signal(0);
  ipCount = signal(0);

  private router = inject(Router);

  constructor(private data: HomePageDataService) {
  }

  ngOnInit(): void {
    this.data.getSubnetsMinimal().subscribe(subnets => {
      this.subnetCount.set(subnets.length);
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

}
