import { NgModule } from '@angular/core';
import { SentinelBreadcrumbsComponent } from './sentinel-breadcrumbs.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { SentinelPipesModule } from '@sentinel/common/pipes';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
  declarations: [SentinelBreadcrumbsComponent],
  imports: [
    CommonModule,
    RouterModule,
    SentinelPipesModule,
    MatButtonModule,
    MatTooltipModule,
    MatRippleModule,
    MatMenuModule,
  ],
  exports: [SentinelBreadcrumbsComponent],
})
export class SentinelBreadcrumbsModule {}
