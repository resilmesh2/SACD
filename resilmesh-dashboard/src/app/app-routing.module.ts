import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GROUP_PATH, HOME_PATH, NETWORK_PATH, MISSION_PATH, NOTIFICATION_PATH, PRODUCT_NEW_PATH, PRODUCT_OVERVIEW_PATH, USER_PATH, VULNERABILITY_PATH } from './paths';
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
    path: USER_PATH,
    loadChildren: () => import('./user-example-page/user-example-page.module').then((m) => m.UserExamplePageModule),
    data: { breadcrumb: 'User' },
  },
  {
    path: GROUP_PATH,
    loadChildren: () => import('./group-example-page/group-example-page.module').then((m) => m.GroupExamplePageModule),
    data: { breadcrumb: 'Group' },
  },
  {
    path: PRODUCT_NEW_PATH,
    loadChildren: () =>
      import('./product-new-example-page/product-new-example-page.module').then((m) => m.ProductNewExamplePageModule),
    data: { breadcrumb: 'New Product' },
  },
  {
    path: PRODUCT_OVERVIEW_PATH,
    loadChildren: () =>
      import('./product-overview-example-page/product-overview-example-page.module').then(
        (m) => m.ProductOverviewExamplePageModule,
      ),
    data: { breadcrumb: 'Product Overview' },
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
