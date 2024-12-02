import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ProductNewExamplePageRoutingModule } from './product-new-example-page-routing.module';
import { ProductNewExamplePageComponent } from './product-new-example-page.component';

@NgModule({
  declarations: [ProductNewExamplePageComponent],
  imports: [CommonModule, ProductNewExamplePageRoutingModule],
})
export class ProductNewExamplePageModule {}
