import { NgModule } from '@angular/core';
import { ContextSidebarContentDirective } from './context-sidebar-content.directive';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [ContextSidebarContentDirective],
  imports: [CommonModule],
  exports: [ContextSidebarContentDirective],
})
export class SentinelSidebarCommonModule {}
