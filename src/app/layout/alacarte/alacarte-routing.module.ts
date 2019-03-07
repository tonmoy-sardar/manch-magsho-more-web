import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AlacarteComponent} from './alacarte.component';
const routes: Routes = [
  {
    path: '',
    component: AlacarteComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlacarteRoutingModule { }
