import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OurserviceRoutingModule } from './ourservice-routing.module';
import { OurserviceComponent } from './ourservice.component';
// core
import { CoreModule } from '../../core/core.module';

@NgModule({
  declarations: [OurserviceComponent],
  imports: [
    CommonModule,
    OurserviceRoutingModule,
    CoreModule
  ]
})
export class OurserviceModule { }
