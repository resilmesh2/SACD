import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  SentinelNotificationOverviewModule,
  SentinelNotificationOverviewComponent,
  NotificationResolver,
} from '@sentinel/layout/notification';

@NgModule({
  imports: [
    SentinelNotificationOverviewModule,
    RouterModule.forChild([
      {
        path: '',
        component: SentinelNotificationOverviewComponent,
      },
      {
        path: ':id',
        loadChildren: () =>
          import('../notification-page/notification-page-detail.module').then((m) => m.NotificationPageDetailModule),
        resolve: { sentinelNotification: NotificationResolver },
        data: { breadcrumb: 'Detail' },
      },
    ]),
  ],
})
export class NotificationPageOverviewModule {}
