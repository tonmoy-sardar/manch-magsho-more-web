import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddreviewRoutingModule } from './addreview-routing.module';
import { AddreviewComponent } from './addreview.component';
//core modules
import {CoreModule} from '../../core/core.module';
@NgModule({
  declarations: [AddreviewComponent],
  imports: [
    CommonModule,
    AddreviewRoutingModule,
    CoreModule
    
  ]
})
export class AddreviewModule { }
