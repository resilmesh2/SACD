import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NotificationCardModule } from '../notification-card/notification-card.module';
import { SentinelNotificationOverviewComponent } from './sentinel-notification-overview.component';

@NgModule({
  declarations: [SentinelNotificationOverviewComponent],
  imports: [CommonModule, RouterModule, NotificationCardModule, ScrollingModule],
  exports: [SentinelNotificationOverviewComponent],
})
export class SentinelNotificationOverviewModule {}
