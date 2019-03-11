import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyprofileRoutingModule } from './myprofile-routing.module';
import { MyprofileComponent } from './myprofile.component';
//Core modules
import {CoreModule} from '../../core/core.module';
import { EditComponent } from './edit/edit.component';

@NgModule({
  declarations: [MyprofileComponent, EditComponent],
  imports: [
    CommonModule,
    MyprofileRoutingModule,
    CoreModule
  ]
})
export class MyprofileModule { }
