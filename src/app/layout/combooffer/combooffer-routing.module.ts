import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ComboofferComponent} from './combooffer.component';
const routes: Routes = [
  {
    path: '',
    component: ComboofferComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComboofferRoutingModule { }
