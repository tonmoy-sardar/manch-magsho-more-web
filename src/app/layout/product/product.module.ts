import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductRoutingModule } from './product-routing.module';
import { ProductComponent } from './product.component';
// core
import { CoreModule } from '../../core/core.module';
import { DetailsComponent } from './details/details.component';
import { TriviaComponent } from './trivia/trivia.component';

@NgModule({
  declarations: [ProductComponent, DetailsComponent, TriviaComponent],
  imports: [
    CommonModule,
    ProductRoutingModule,
    CoreModule
  ]
})
export class ProductModule { }
