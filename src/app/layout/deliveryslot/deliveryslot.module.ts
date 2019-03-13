import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeliveryslotRoutingModule } from './deliveryslot-routing.module';
import { DeliveryslotComponent } from './deliveryslot.component';
import {CoreModule} from '../../core/core.module';

@NgModule({
  declarations: [DeliveryslotComponent],
  imports: [
    CommonModule,
    DeliveryslotRoutingModule,
    CoreModule
  ]
})
export class DeliveryslotModule { }
