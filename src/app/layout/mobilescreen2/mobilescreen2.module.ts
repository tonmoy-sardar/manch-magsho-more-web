import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Mobilescreen2RoutingModule } from './mobilescreen2-routing.module';
import { Mobilescreen2Component } from './mobilescreen2.component';
// core
import { CoreModule } from '../../core/core.module';
@NgModule({
  declarations: [Mobilescreen2Component],
  imports: [
    CommonModule,
    Mobilescreen2RoutingModule,
    CoreModule
  ]
})
export class Mobilescreen2Module { }
