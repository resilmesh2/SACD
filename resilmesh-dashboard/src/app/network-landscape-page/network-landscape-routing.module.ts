import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NetworkLandscapeComponent } from './network-landscape.component';
import * as d3 from 'd3';

const routes: Routes = [
  {
    path: '',
    component: NetworkLandscapeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class NetworkLandscapeAssetRoutingModule {}
