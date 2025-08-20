import { Routes } from '@angular/router';
import { HOME_PATH, ISSUE_PATH, MISSION_PATH, NETWORK_NODES_PATH, ORGANISATION_PATH, ASSETS_PATH, SUBNETS_PATH, VULNERABILITY_PATH } from './paths';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { MissionPageComponent } from './pages/mission-page/mission-page.component';
import { SubnetPageComponent } from './pages/subnet-page/subnet-page.component';
import { NetworkPageComponent } from './pages/network-page/network-page.component';
import { AssetPageComponent } from './pages/asset-page/asset-page.component';
import { IssuePageComponent } from './pages/issue-page/issue-page.component';
import { VulnerabilityPageComponent } from './pages/vulnerability-page/vulnerability.component';
import { IssueDetailComponent } from './pages/issue-detail/issue-detail.component';
import { OrgUnitsComponent } from './pages/org-units-page/org-units.component';
import { SubnetDetailComponent } from './pages/subnet-detail/subnet-detail.component';

export const ROOT_ROUTES: Routes = [
  {
    path: HOME_PATH,
    component: HomePageComponent,
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: HOME_PATH,
  },
  {
    path: SUBNETS_PATH,
    component: SubnetPageComponent,
    data: { breadcrumb: 'Subnets' },
  },
  {
    path: SUBNETS_PATH + '/:range',
    component: SubnetDetailComponent,
    data: { breadcrumb: 'Subnet Details' },
  },
  {
    path: NETWORK_NODES_PATH,
    component: NetworkPageComponent,
    data: { breadcrumb: 'Network nodes' },
  },
  {
    path: ASSETS_PATH,
    component: AssetPageComponent,
    data: { breadcrumb: 'Assets' },
  },
  {
    path: MISSION_PATH,
    component: MissionPageComponent,
    data: { breadcrumb: 'Missions' },
  },
  {
    path: ISSUE_PATH,
    component: IssuePageComponent,
    data: { breadcrumb: 'Issues' },
  },
  {
    path: ISSUE_PATH + '/:name',
    component: IssueDetailComponent,
    data: { breadcrumb: 'Issue Details' },
  },
  {
    path: VULNERABILITY_PATH,
    component: VulnerabilityPageComponent,
    data: { breadcrumb: 'Vulnerabilities' },
  },
  {
    path: ORGANISATION_PATH,
    component: OrgUnitsComponent,
    data: { breadcrumb: 'Organisation Units' },
  },

  // {
  //   path: USER_PATH,
  //   loadChildren: () => import('./user-example-page/user-example-page.module').then((m) => m.UserExamplePageModule),
  //   data: { breadcrumb: 'User' },
  // },
  // {
  // {
  //   path: NOTIFICATION_PATH,
  //   data: { breadcrumb: 'Notifications' },
  //   children: [
  //     {
  //       path: '',
  //       loadChildren: () =>
  //         import('./notification-page/notification-page-overview.module').then((m) => m.NotificationPageOverviewModule),
  //     },
  //   ],
  // },

];
