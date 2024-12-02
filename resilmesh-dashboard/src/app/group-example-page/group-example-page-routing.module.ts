import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GroupExamplePageComponent } from './group-example-page.component';

const routes: Routes = [
  {
    path: '',
    component: GroupExamplePageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GroupExamplePageRoutingModule {}
