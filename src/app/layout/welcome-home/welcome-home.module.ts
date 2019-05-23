import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WelcomeHomeRoutingModule } from './welcome-home-routing.module';
import { WelcomeHomeComponent } from './welcome-home.component';
//core modules
import {CoreModule} from '../../core/core.module';
@NgModule({
  declarations: [WelcomeHomeComponent],
  imports: [
    CommonModule,
    WelcomeHomeRoutingModule,
    CoreModule
  ]
})
export class WelcomeHomeModule { }
