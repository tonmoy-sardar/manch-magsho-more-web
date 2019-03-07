import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RecipeComponent} from './recipe.component';
import {DetailsComponent} from './details/details.component';
const routes: Routes = [
  {
    path: '',
    component: RecipeComponent
  },
  {
    path: 'details/:id',
    component: DetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecipeRoutingModule { }
