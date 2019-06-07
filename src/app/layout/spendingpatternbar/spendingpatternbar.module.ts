import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SpendingpatternbarRoutingModule } from './spendingpatternbar-routing.module';
import { SpendingpatternbarComponent } from './spendingpatternbar.component';
//core modules
import {CoreModule} from '../../core/core.module';
@NgModule({
  declarations: [SpendingpatternbarComponent],
  imports: [
    CommonModule,
    SpendingpatternbarRoutingModule,
    CoreModule
  ]
})
export class SpendingpatternbarModule { }
