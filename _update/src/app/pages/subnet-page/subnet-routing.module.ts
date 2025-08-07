import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SubnetComponent } from './subnet.component';

const routes: Routes = [
  {
    path: '',
    component: SubnetComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SubnetRoutingModule {}
