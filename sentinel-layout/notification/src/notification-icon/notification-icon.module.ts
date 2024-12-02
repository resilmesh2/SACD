import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { NotificationIconComponent } from './notification-icon.component';

@NgModule({
  declarations: [NotificationIconComponent],
  imports: [CommonModule, MatIconModule],
  exports: [NotificationIconComponent],
})
export class NotificationIconModule {}
