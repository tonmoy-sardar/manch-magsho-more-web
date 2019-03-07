import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DeliveryaddressComponent} from '../deliveryaddress/deliveryaddress.component';

const routes: Routes = [
  {
    path: '',
    component: DeliveryaddressComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeliveryaddressRoutingModule { }
