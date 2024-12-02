import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductNewExamplePageComponent } from './product-new-example-page.component';

const routes: Routes = [
  {
    path: '',
    component: ProductNewExamplePageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductNewExamplePageRoutingModule {}
