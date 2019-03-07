import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DealsRoutingModule } from './deals-routing.module';
import { DealsComponent } from './deals.component';
// core
import { CoreModule } from '../../core/core.module';
@NgModule({
  declarations: [DealsComponent],
  imports: [
    CommonModule,
    DealsRoutingModule,
    CoreModule
  ]
})
export class DealsModule { }
