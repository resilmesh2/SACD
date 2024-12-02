import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SentinelNotificationDetailModule, SentinelNotificationDetailComponent } from '@sentinel/layout/notification';

@NgModule({
  imports: [
    SentinelNotificationDetailModule,
    RouterModule.forChild([
      {
        path: '',
        component: SentinelNotificationDetailComponent,
      },
    ]),
  ],
})
export class NotificationPageDetailModule {}
