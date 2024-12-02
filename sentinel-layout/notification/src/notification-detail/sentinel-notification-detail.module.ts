import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { NotificationIconModule } from '../notification-icon/notification-icon.module';
import { SentinelNotificationDetailComponent } from './sentinel-notification-detail.component';
import { SentinelPipesModule } from '@sentinel/common/pipes';

@NgModule({
  declarations: [SentinelNotificationDetailComponent],
  imports: [CommonModule, MatCardModule, NotificationIconModule, SentinelPipesModule],
  exports: [SentinelNotificationDetailComponent],
})
export class SentinelNotificationDetailModule {}
