import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NetworkVizualizationComponent } from './network-vizualization.component';

const routes: Routes = [
  {
    path: '',
    component: NetworkVizualizationComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NetworkVizualizationRoutingModule {}
