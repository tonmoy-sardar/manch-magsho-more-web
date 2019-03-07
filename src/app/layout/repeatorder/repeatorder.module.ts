import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RepeatorderRoutingModule } from './repeatorder-routing.module';
import { RepeatorderComponent } from './repeatorder.component';
// core
import { CoreModule } from '../../core/core.module';
@NgModule({
  declarations: [RepeatorderComponent],
  imports: [
    CommonModule,
    RepeatorderRoutingModule,
    CoreModule
  ]
})
export class RepeatorderModule { }
