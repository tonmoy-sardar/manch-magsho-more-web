import { Injectable, EventEmitter, Output } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private http: HttpClient
  ) { }
  getCategoryList(): Observable<any> {
    return this.http.get(environment.apiEndpoint + 'productcategorylist/')
  }
  getTodayspecialList(user_id): Observable<any> {
    return this.http.get(environment.apiEndpoint + 'todayspecial/'+user_id)
  }
  getAlacartList(user_id): Observable<any> {
    return this.http.get(environment.apiEndpoint + 'alacart/'+user_id)
  }
  getCombooffertList(user_id): Observable<any> {
    return this.http.get(environment.apiEndpoint + 'productslistbycombo/'+user_id)
  }
  getProductList(id,user_id,params): Observable<any> {
    return this.http.get(environment.apiEndpoint + 'productslistbycatid/'+id+'/'+user_id+'/?'+params)
  }
  getAllRecipeList(params): Observable<any> {
    return this.http.get(environment.apiEndpoint + 'recipelist/recipe/?'+params)
  }
  recipeByProduct(id): Observable<any> {
    return this.http.get(environment.apiEndpoint + 'recipedetailsbyproduct/'+id)
  }
  getrecipeDetails(id): Observable<any> {
    return this.http.get(environment.apiEndpoint + 'recipedetails/'+id)
  }
  myOrderList(id,params): Observable<any> {
    return this.http.get(environment.apiEndpoint + 'orderlistbycustid/'+id+'/?'+params)
  }
  getRepeatOrder(ids): Observable<any> {
    return this.http.get(environment.apiEndpoint + 'repeatorder/?product_id='+ids)
  }
  addWishlist(data): Observable<any> {
    return this.http.post(environment.apiEndpoint + 'whishlist/',data)
  }
  myWishlist(id): Observable<any> {
    return this.http.get(environment.apiEndpoint + 'whishlistbyuserid/'+id)
  }
  getProductDetails(id,user_id): Observable<any> {
    return this.http.get(environment.apiEndpoint + 'productdetails/'+id+'/'+user_id)
  }
  getriviaDetails(id): Observable<any> {
    return this.http.get(environment.apiEndpoint + 'producttrivialistbyproductid/'+id)
  }
  addFavourite(id): Observable<any> {
    return this.http.get(environment.apiEndpoint + 'favouriteOrder/'+id)
  }
  getSpendingPattern(id): Observable<any> {
    return this.http.get(environment.apiEndpoint + 'productspendcatwisebyuserid/'+id+'/')
  }
  addRating(data): Observable<any> {
    return this.http.post(environment.apiEndpoint + 'addRating/',data)
  }
  addReview(data): Observable<any> {
    return this.http.post(environment.apiEndpoint + 'addcomment/',data)
  }
  getSearchList(searchText,user_id): Observable<any> {
    if(user_id>0)
    {
      return this.http.get(environment.apiEndpoint + 'productslistsearch/' + user_id + '/?search_key='+searchText)
    }
    else
    {
      return this.http.get(environment.apiEndpoint + 'productslistsearch/?search_key='+searchText)
    }
   
  }
  productSearch(id,keywords): Observable<any> {
    if(id>0)
    {
      return this.http.get(environment.apiEndpoint + 'productslistsearchbycatid/' + id + '/?search_key='+keywords)
    }
    else
    {
      return this.http.get(environment.apiEndpoint + 'productslistsearchbycatid/?search_key='+keywords)
    }
   
  }
  getBlogList(): Observable<any> {
    return this.http.get(environment.apiEndpoint + 'bloglist/blog-cat/')
  }

  getAllProList(): Observable<any> {
    return this.http.get(environment.apiEndpoint + 'productslist')
  }
}
