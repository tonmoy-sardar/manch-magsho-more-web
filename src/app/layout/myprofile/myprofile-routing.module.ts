import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MyprofileComponent} from './myprofile.component';
import {EditComponent} from './edit/edit.component';
const routes: Routes = [
  {
    path: '',
    component: MyprofileComponent
  },
  {
    path: 'edit',
    component: EditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyprofileRoutingModule { }
