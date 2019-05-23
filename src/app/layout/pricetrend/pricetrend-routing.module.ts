import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PricetrendComponent} from './pricetrend.component';
const routes: Routes = [
  {
    path: '',
    component: PricetrendComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PricetrendRoutingModule { }
