import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ForgotpasswordRoutingModule } from './forgotpassword-routing.module';
import { ForgotpasswordComponent } from './forgotpassword.component';
// core
import { CoreModule } from '../../core/core.module';
@NgModule({
  declarations: [ForgotpasswordComponent],
  imports: [
    CommonModule,
    ForgotpasswordRoutingModule,
    CoreModule
  ]
})
export class ForgotpasswordModule { }
