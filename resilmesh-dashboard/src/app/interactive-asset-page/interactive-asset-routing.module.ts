import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InteractiveAssetComponent } from './interactive-asset.component';

const routes: Routes = [
  {
    path: '',
    component: InteractiveAssetComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class InteractiveAssetRoutingModule {}
