import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComboofferRoutingModule } from './combooffer-routing.module';
import { ComboofferComponent } from './combooffer.component';
// core
import { CoreModule } from '../../core/core.module';
@NgModule({
  declarations: [ComboofferComponent],
  imports: [
    CommonModule,
    ComboofferRoutingModule,
    CoreModule
  ]
})
export class ComboofferModule { }
