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
}
