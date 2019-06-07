import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SpendingpatternbarComponent} from './spendingpatternbar.component';
const routes: Routes = [
  {
    path: '',
    component: SpendingpatternbarComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SpendingpatternbarRoutingModule { }
