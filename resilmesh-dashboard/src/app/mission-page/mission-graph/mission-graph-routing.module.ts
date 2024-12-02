import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MissionGraphComponent } from './mission-graph.component';

const routes: Routes = [
  {
    path: '',
    component: MissionGraphComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MissionGraphRoutingModule {}
