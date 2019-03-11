import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SpendingpatternRoutingModule } from './spendingpattern-routing.module';
import { SpendingpatternComponent } from './spendingpattern.component';

//core modules
import {CoreModule} from '../../core/core.module';

@NgModule({
  declarations: [SpendingpatternComponent],
  imports: [
    CommonModule,
    SpendingpatternRoutingModule,
    CoreModule
  ]
})
export class SpendingpatternModule { }
