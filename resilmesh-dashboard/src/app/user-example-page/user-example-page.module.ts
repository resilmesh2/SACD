import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SentinelBreadcrumbsModule } from '../../../../sentinel-layout/breadcrumbs/src/sentinel-breadcrumbs.module';

import { UserExamplePageRoutingModule } from './user-example-page-routing.module';
import { UserExamplePageComponent } from './user-example-page.component';
import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
  declarations: [UserExamplePageComponent],
  imports: [CommonModule, UserExamplePageRoutingModule, SentinelBreadcrumbsModule, MatToolbarModule],
})
export class UserExamplePageModule {}
