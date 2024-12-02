import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { UserCardComponent } from './user-card.component';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';

/**
 * Module containing user card component
 */
@NgModule({
  declarations: [UserCardComponent],
  imports: [CommonModule, MatIconModule, MatDividerModule],
  exports: [UserCardComponent],
})
export class SentinelUserCardModule {}
