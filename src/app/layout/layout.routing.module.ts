import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { AuthGuard } from '../core/guard/auth.guard';


const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: "full" },
      { path: '/', redirectTo: 'home', pathMatch: "full" },
      { path: 'home', loadChildren: './home/home.module#HomeModule' },
      { path: 'login', loadChildren: './login/login.module#LoginModule' },
      { path: 'signup', loadChildren: './signup/signup.module#SignupModule' },
      { path: 'forgotpassword', loadChildren: './forgotpassword/forgotpassword.module#ForgotpasswordModule' },    
      { path: 'aboutus', loadChildren: './aboutus/aboutus.module#AboutusModule' }, 
      { path: 'deals', loadChildren: './deals/deals.module#DealsModule' }, 
      { path: 'category', loadChildren: './category/category.module#CategoryModule' }, 
      { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule' }, 
      { path: 'product', loadChildren: './product/product.module#ProductModule' }, 
      { path: 'product/:id', loadChildren: './product/product.module#ProductModule' }, 
      { path: 'recipe', loadChildren: './recipe/recipe.module#RecipeModule' },
      { path: 'recipe/product/:id', loadChildren: './recipe/recipe.module#RecipeModule' }, 
      { path: 'order', loadChildren: './order/order.module#OrderModule' }, 
      { path: 'blog', loadChildren: './blog/blog.module#BlogModule' }, 
      { path: 'success', loadChildren: './success/success.module#SuccessModule' }, 
      { path: 'contactus', loadChildren: './contact/contact.module#ContactModule' },
      { path: 'todayspecial', loadChildren: './todayspecial/todayspecial.module#TodayspecialModule' },
      { path: 'alacarte', loadChildren: './alacarte/alacarte.module#AlacarteModule' },
      { path: 'combooffer', loadChildren: './combooffer/combooffer.module#ComboofferModule' },
      { path: 'repeatorder', loadChildren: './repeatorder/repeatorder.module#RepeatorderModule' },
      { path: 'wishlist', loadChildren: './wishlist/wishlist.module#WishlistModule' },
      { path: 'cart', loadChildren: './cart/cart.module#CartModule' },
      { path: 'deliveryaddress', loadChildren: './deliveryaddress/deliveryaddress.module#DeliveryaddressModule' },
      { path: 'deliveryslot', loadChildren: './deliveryslot/deliveryslot.module#DeliveryslotModule' },
      { path: 'myprofile', loadChildren: './myprofile/myprofile.module#MyprofileModule' },
      { path: 'spendingpattern', loadChildren: './spendingpattern/spendingpattern.module#SpendingpatternModule' },
      { path: 'addrating/:id', loadChildren: './addrating/addrating.module#AddratingModule' },
      { path: 'addreview/:id', loadChildren: './addreview/addreview.module#AddreviewModule' },
      { path: 'search/:name', loadChildren: './search/search.module#SearchModule' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
