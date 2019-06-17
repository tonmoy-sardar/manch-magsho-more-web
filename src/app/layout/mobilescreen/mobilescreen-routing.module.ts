import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MobilescreenComponent } from './mobilescreen.component';
const routes: Routes = [
  {
    path: '',
    component: MobilescreenComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MobilescreenRoutingModule { }
