import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PricetrendRoutingModule } from './pricetrend-routing.module';
import { PricetrendComponent } from './pricetrend.component';
//core modules
import {CoreModule} from '../../core/core.module';
@NgModule({
  declarations: [PricetrendComponent],
  imports: [
    CommonModule,
    PricetrendRoutingModule,
    CoreModule
  ]
})
export class PricetrendModule { }
