import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SpendingpatternComponent} from './spendingpattern.component';

const routes: Routes = [
  {
    path: '',
    component: SpendingpatternComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SpendingpatternRoutingModule { }
