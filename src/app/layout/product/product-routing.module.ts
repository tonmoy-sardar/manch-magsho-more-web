import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProductComponent} from './product.component';
import {DetailsComponent} from './details/details.component';
import {TriviaComponent} from './trivia/trivia.component';
const routes: Routes = [
  {
    path: '',
    component: ProductComponent
  },
  {
    path: 'details/:id',
    component: DetailsComponent
  },
  {
    path: 'trivia/:id',
    component: TriviaComponent
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
