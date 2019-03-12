import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderdetailsRoutingModule } from './orderdetails-routing.module';
import { OrderdetailsComponent } from './orderdetails.component';

//core Modules
import {CoreModule} from '../../core/core.module';

@NgModule({
  declarations: [OrderdetailsComponent],
  imports: [
    CommonModule,
    OrderdetailsRoutingModule,
    CoreModule
  ]
})
export class OrderdetailsModule { }
