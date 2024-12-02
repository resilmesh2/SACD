import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { GroupExamplePageRoutingModule } from './group-example-page-routing.module';
import { GroupExamplePageComponent } from './group-example-page.component';
import { GroupSidebarComponent } from './group-sidebar/group-sidebar.component';
import { SentinelSidebarPageLayoutModule, SentinelSidebarToggleModule } from '@sentinel/layout/sidebar';

@NgModule({
  declarations: [GroupExamplePageComponent, GroupSidebarComponent],
  imports: [CommonModule, GroupExamplePageRoutingModule, SentinelSidebarPageLayoutModule, SentinelSidebarToggleModule],
})
export class GroupExamplePageModule {}
