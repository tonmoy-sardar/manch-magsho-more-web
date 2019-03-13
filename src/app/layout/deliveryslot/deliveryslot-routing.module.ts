import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DeliveryslotComponent} from './deliveryslot.component';

const routes: Routes = [
  {
    path: '',
    component: DeliveryslotComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeliveryslotRoutingModule { }
