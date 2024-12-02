import { NgModule } from '@angular/core';
import { SidebarToggleComponent } from './sidebar-toggle.component';
import { CommonModule } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [SidebarToggleComponent],
  imports: [CommonModule, MatTooltipModule, MatButtonModule, MatIconModule],
  exports: [SidebarToggleComponent],
})
export class SentinelSidebarToggleModule {}
