import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductOverviewExamplePageComponent } from './product-overview-example-page.component';

const routes: Routes = [
  {
    path: '',
    component: ProductOverviewExamplePageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductOverviewExamplePageRoutingModule {}
