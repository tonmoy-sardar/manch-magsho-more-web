import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OurserviceComponent } from './ourservice.component';
const routes: Routes = [
  {
    path: '',
    component: OurserviceComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OurserviceRoutingModule { }
