import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MobilescreenRoutingModule } from './mobilescreen-routing.module';
import { MobilescreenComponent } from './mobilescreen.component';
// core
import { CoreModule } from '../../core/core.module';
@NgModule({
  declarations: [MobilescreenComponent],
  imports: [
    CommonModule,
    MobilescreenRoutingModule,
    CoreModule
  ]
})
export class MobilescreenModule { }
