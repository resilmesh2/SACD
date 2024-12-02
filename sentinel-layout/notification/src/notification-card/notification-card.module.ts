import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { NotificationIconModule } from '../notification-icon/notification-icon.module';
import { NotificationCardComponent } from './notification-card.component';
import { SentinelPipesModule } from '@sentinel/common/pipes';

@NgModule({
  declarations: [NotificationCardComponent],
  imports: [CommonModule, NotificationIconModule, MatCardModule, MatButtonModule, SentinelPipesModule],
  exports: [NotificationCardComponent],
})
export class NotificationCardModule {}
