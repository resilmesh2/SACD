import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { 
  GROUP_PATH,
  HOME_PATH,
  NETWORK_PATH,
  MISSION_PATH,
  NOTIFICATION_PATH,
  USER_PATH,
  ISSUE_PATH,
  VULNERABILITY_PATH,
  NETWORK_INTERACTIVE_PATH,
  NETWORK_STATIC_LANDSCAPE,
} from './paths';
import { HomePageComponent } from './home-page/home-page.component';

const routes: Routes = [
  {
    path: HOME_PATH,
    component: HomePageComponent,
  },
  {
    path: NETWORK_PATH,
    loadChildren: () =>
      import('./network-vizualization-page/network-vizualization.module').then(
        (m) => m.NetworkVizualizationModule,
      ),
    data: { breadcrumb: 'Network Vizualization' },
  },
  {
    path: MISSION_PATH,
    loadChildren: () =>
      import('./mission-page/mission-page.module').then(
        (m) => m.MissionPageModule,
      ),
    data: { breadcrumb: 'Missions' },
  },
  {
    path: VULNERABILITY_PATH,
    loadChildren: () =>
      import('./vulnerability-page/vulnerability.module').then(
        (m) => m.VulnerabilityModule,
      ),
    data: { breadcrumb: 'Vulnerability' },
  },
  {
    path: ISSUE_PATH,
    data: { breadcrumb: 'Issues' },
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./issue-page/issue.module').then((m) => m.IssueModule),
      },
    ],
  },
  {
    data: { type: 'Issue Details' },
    path: ISSUE_PATH + '/:name',
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./issue-detail/issue-detail.module').then((m) => m.IssueDetailModule),
      },
    ],
  },
  {
    path: NETWORK_INTERACTIVE_PATH,
    loadChildren: () =>
      import('./interactive-asset-page/interactive-asset.module').then(
	(m) => m.InteractiveAssetModule,
      ),
    data: { breadcrumb: 'Interactive Asset Visualization' },
  },
  {
    path: USER_PATH,
    loadChildren: () => import('./user-example-page/user-example-page.module').then((m) => m.UserExamplePageModule),
    data: { breadcrumb: 'User' },
  },
  {
    path: NOTIFICATION_PATH,
    data: { breadcrumb: 'Notifications' },
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./notification-page/notification-page-overview.module').then((m) => m.NotificationPageOverviewModule),
      },
    ],
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: HOME_PATH,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
