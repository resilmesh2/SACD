import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IssueDetailComponent } from './issue-detail.component';

const routes: Routes = [
  {
    path: '',
    component: IssueDetailComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IssueRoutingModule {}
