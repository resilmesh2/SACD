import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnInit,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SentinelButtonWithIconComponent } from '@sentinel/components/button-with-icon';
import { ActivatedRoute, Router } from '@angular/router';
import {
  ASSETS_PATH,
  CSA_PATH,
  ISSUE_PATH,
  MISSION_PATH,
  ORGANIZATION_PATH,
  SUBNETS_PATH,
} from '../../paths';
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
    NgxSkeletonLoaderModule,
  ],
  standalone: true,
})
export class HomePageComponent implements OnInit {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private destroyRef = inject(DestroyRef);
  data = inject(HomePageDataService);

  ngOnInit() {
    this.route.queryParams
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.data.fetchData(this.destroyRef);
      });
  }

  customColors = [
    { name: 'critical', value: '#1C1D21' },
    { name: 'high', value: '#ed625e' },
    { name: 'medium', value: '#ed913b' },
    { name: 'low', value: '#f6d55c' },
  ];

  onSelectSeverity(event: any) {
    this.router.navigate([ISSUE_PATH], {
      queryParams: { severity: event.name },
    });
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
