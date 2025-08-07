import { Routes } from '@angular/router';
import { HOME_PATH, SUBNET_PATH } from './paths';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { SubnetComponent } from './pages/subnet-page/subnet.component';

export const ROOT_ROUTES: Routes = [
  {
    path: HOME_PATH,
    component: HomePageComponent,
  },
  {
    path: SUBNET_PATH,
    // loadChildren: () =>
    //   import('./pages/subnet-page/subnet.module').then(
    //     (m) => m.SubnetModule,
    //   ),
    component: SubnetComponent,
    data: { breadcrumb: 'Subnets' },
  },
  // {
  //   path: USER_PATH,
  //   loadChildren: () => import('./user-example-page/user-example-page.module').then((m) => m.UserExamplePageModule),
  //   data: { breadcrumb: 'User' },
  // },

//   {
//     path: USER_PATH,
//     loadChildren: () => import('./user-example-page/user-example-page.module').then((m) => m.UserExamplePageModule),
//     data: { breadcrumb: 'User' },
//   },
//   {
//     path: GROUP_PATH,
//     loadChildren: () => import('./group-example-page/group-example-page.module').then((m) => m.GroupExamplePageModule),
//     data: { breadcrumb: 'Group' },
//   },
//   {
//     path: PRODUCT_NEW_PATH,
//     loadChildren: () =>
//       import('./product-new-example-page/product-new-example-page.module').then((m) => m.ProductNewExamplePageModule),
//     data: { breadcrumb: 'New Product' },
//   },
//   {
//     path: PRODUCT_OVERVIEW_PATH,
//     loadChildren: () =>
//       import('./product-overview-example-page/product-overview-example-page.module').then(
//         (m) => m.ProductOverviewExamplePageModule,
//       ),
//     data: { breadcrumb: 'Product Overview' },
//   },
//   {
//     path: NOTIFICATION_PATH,
//     data: { breadcrumb: 'Notifications' },
//     children: [
//       {
//         path: '',
//         loadChildren: () =>
//           import('./notification-page/notification-page-overview.module').then((m) => m.NotificationPageOverviewModule),
//       },
//     ],
//   },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: HOME_PATH,
  },
];
