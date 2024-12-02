import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SentinelLayout1Component } from './sentinel-layout1.component';
import { LayoutCommonComponentsSansProvidersModule } from '@sentinel/layout/common-components';
import { NotificationProvidersModule } from '@sentinel/layout/notification';
import { SentinelPipesModule } from '@sentinel/common/pipes';

@NgModule({
  declarations: [SentinelLayout1Component],
  imports: [CommonModule, RouterModule, LayoutCommonComponentsSansProvidersModule, SentinelPipesModule],
  exports: [SentinelLayout1Component],
})
export class SentinelLayout1SansProvidersModule {}

/**
 * Module containing imports and components for SentinelLayout1
 */
@NgModule({
  imports: [CommonModule, RouterModule, NotificationProvidersModule],
  exports: [SentinelLayout1SansProvidersModule, NotificationProvidersModule],
})
export class SentinelLayout1Module {}
