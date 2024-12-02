import { PortalModule } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SidebarPageLayoutComponent } from './sidebar-page-layout.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SentinelSidebarToggleModule } from './sidebar-toggle/sentinel-sidebar-toggle.module';
import { SentinelSidebarCommonModule } from './sentinel-sidebar-common.module';
import { SLetDirective } from '@sentinel/common';
import { SentinelPipesModule } from '@sentinel/common/pipes';

@NgModule({
  declarations: [SidebarPageLayoutComponent],
  imports: [
    CommonModule,
    SentinelSidebarToggleModule,
    SentinelSidebarCommonModule,
    MatSidenavModule,
    PortalModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    SLetDirective,
    SentinelPipesModule,
  ],
  exports: [SidebarPageLayoutComponent, SentinelSidebarCommonModule],
})
export class SentinelSidebarPageLayoutModule {}
