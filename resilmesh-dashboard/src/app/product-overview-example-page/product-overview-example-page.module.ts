import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ProductOverviewExamplePageRoutingModule } from './product-overview-example-page-routing.module';
import { ProductOverviewExamplePageComponent } from './product-overview-example-page.component';

@NgModule({
  declarations: [ProductOverviewExamplePageComponent],
  imports: [CommonModule, ProductOverviewExamplePageRoutingModule],
})
export class ProductOverviewExamplePageModule {}
