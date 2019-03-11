import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddratingRoutingModule } from './addrating-routing.module';
import { AddratingComponent } from './addrating.component';
//core modules
import {CoreModule} from '../../core/core.module';
@NgModule({
  declarations: [AddratingComponent],
  imports: [
    CommonModule,
    AddratingRoutingModule,
    CoreModule
  ]
})
export class AddratingModule { }
