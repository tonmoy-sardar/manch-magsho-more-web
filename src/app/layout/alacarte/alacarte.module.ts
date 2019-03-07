import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlacarteRoutingModule } from './alacarte-routing.module';
import { AlacarteComponent } from './alacarte.component';
// core
import { CoreModule } from '../../core/core.module';

@NgModule({
  declarations: [AlacarteComponent],
  imports: [
    CommonModule,
    AlacarteRoutingModule,
    CoreModule
  ]
})
export class AlacarteModule { }
