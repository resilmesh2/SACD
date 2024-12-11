import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserExamplePageComponent } from './user-example-page.component';

const routes: Routes = [
  {
    path: '',
    component: UserExamplePageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserExamplePageRoutingModule {}
