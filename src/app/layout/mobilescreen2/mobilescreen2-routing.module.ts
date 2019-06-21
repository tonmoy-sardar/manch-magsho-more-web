import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Mobilescreen2Component } from './mobilescreen2.component';
const routes: Routes = [
  {
    path: '',
    component: Mobilescreen2Component
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Mobilescreen2RoutingModule { }
