import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WhyusRoutingModule } from './whyus-routing.module';
import { WhyusComponent } from './whyus.component';
// core
import { CoreModule } from '../../core/core.module';
@NgModule({
  declarations: [WhyusComponent],
  imports: [
    CommonModule,
    WhyusRoutingModule,
    CoreModule
  ]
})
export class WhyusModule { }
