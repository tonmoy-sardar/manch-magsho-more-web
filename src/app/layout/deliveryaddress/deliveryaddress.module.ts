import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeliveryaddressRoutingModule } from './deliveryaddress-routing.module';
import { DeliveryaddressComponent } from './deliveryaddress.component';

// core Module
import { CoreModule } from '../../core/core.module';

@NgModule({
  declarations: [DeliveryaddressComponent],
  imports: [
    CommonModule,
    DeliveryaddressRoutingModule,
    CoreModule
  ]
})
export class DeliveryaddressModule { }
