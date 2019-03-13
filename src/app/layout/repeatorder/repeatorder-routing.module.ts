import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RepeatorderComponent } from './repeatorder.component';
const routes: Routes = [
  {
    path: '',
    component: RepeatorderComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RepeatorderRoutingModule { }
