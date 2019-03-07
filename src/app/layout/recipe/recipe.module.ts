import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipeRoutingModule } from './recipe-routing.module';
import { RecipeComponent } from './recipe.component';
// core
import { CoreModule } from '../../core/core.module';
import { DetailsComponent } from './details/details.component';

@NgModule({
  declarations: [RecipeComponent, DetailsComponent],
  imports: [
    CommonModule,
    RecipeRoutingModule,
    CoreModule

  ]
})
export class RecipeModule { }
