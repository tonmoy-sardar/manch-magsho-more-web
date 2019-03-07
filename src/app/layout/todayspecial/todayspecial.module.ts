import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TodayspecialRoutingModule } from './todayspecial-routing.module';
import { TodayspecialComponent } from './todayspecial.component';
// core
import { CoreModule } from '../../core/core.module';

@NgModule({
  declarations: [TodayspecialComponent],
  imports: [
    CommonModule,
    TodayspecialRoutingModule,
    CoreModule
  ]
})
export class TodayspecialModule { }
