import { Routes } from '@angular/router';
import { ASSETS_PATH, HOME_PATH, SERVICE_PATH, SUBNETS_PATH } from './paths';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { SubnetsComponent } from './pages/subnet-page/subnets.component';
import { AssetsComponent } from './pages/assets-page/assets.component';
import { ServiceComponent } from './pages/service-page/service.component';

export const ROOT_ROUTES: Routes = [
  {
    path: HOME_PATH,
    component: HomePageComponent,
  },
  {
    path: SUBNETS_PATH,
    // loadChildren: () =>
    //   import('./pages/subnet-page/subnet.module').then(
    //     (m) => m.SubnetModule,
    //   ),
    component: SubnetsComponent,
    data: { breadcrumb: 'Subnets' },
  },
    {
    path: ASSETS_PATH,
    // loadChildren: () =>
    //   import('./network-vizualization-page/network-vizualization.module').then(
    //     (m) => m.NetworkVizualizationModule,
    //   ),
    component: AssetsComponent,
    data: { breadcrumb: 'Network Visualization' },
  },
  {
    path: SERVICE_PATH,
    component: ServiceComponent,
    data: { breadcrumb: 'Service' },
  },
  // {
  //   path: MISSION_PATH,
  //   loadChildren: () =>
  //     import('./mission-page/mission-page.module').then(
  //       (m) => m.MissionPageModule,
  //     ),
  //   data: { breadcrumb: 'Missions' },
  // },
  // {
  //   path: VULNERABILITY_PATH,
  //   loadChildren: () =>
  //     import('./vulnerability-page/vulnerability.module').then(
  //       (m) => m.VulnerabilityModule,
  //     ),
  //   data: { breadcrumb: 'Vulnerability' },
  // },
  // {
  //   path: ISSUE_PATH,
  //   data: { breadcrumb: 'Issues' },
  //   children: [
  //     {
  //       path: '',
  //       loadChildren: () =>
  //         import('./issue-page/issue.module').then((m) => m.IssueModule),
  //     },
  //   ],
  // },
  // {
  //   data: { type: 'Issue Details' },
  //   path: ISSUE_PATH + '/:name',
  //   children: [
  //     {
  //       path: '',
  //       loadChildren: () =>
  //         import('./issue-detail/issue-detail.module').then((m) => m.IssueDetailModule),
  //     },
  //   ],
  // },
  // {
  //   path: USER_PATH,
  //   loadChildren: () => import('./user-example-page/user-example-page.module').then((m) => m.UserExamplePageModule),
  //   data: { breadcrumb: 'User' },
  // },
  // {
  //   path: SUBNET_PATH,
  //   loadChildren: () =>
  //     import('./subnet-page/subnet.module').then(
  //       (m) => m.SubnetModule,
  //     ),
  //   data: { breadcrumb: 'Subnets' },
  // },
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
  {
    path: '',
    pathMatch: 'full',
    redirectTo: HOME_PATH,
  },
];
