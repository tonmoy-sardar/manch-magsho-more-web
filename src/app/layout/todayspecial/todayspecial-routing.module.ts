import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TodayspecialComponent} from './todayspecial.component';
const routes: Routes = [
  {
    path: '',
    component: TodayspecialComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TodayspecialRoutingModule { }
