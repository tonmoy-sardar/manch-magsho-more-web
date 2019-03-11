import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddratingComponent} from './addrating.component';

const routes: Routes = [
  {
    path: '',
    component: AddratingComponent
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddratingRoutingModule { }
