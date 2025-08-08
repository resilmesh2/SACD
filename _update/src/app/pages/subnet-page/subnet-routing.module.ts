import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SubnetsComponent } from './subnets.component';

const routes: Routes = [
  {
    path: '',
    component: SubnetsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SubnetRoutingModule {}
