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
  addFavourite(id,status): Observable<any> {
    return this.http.get(environment.apiEndpoint + 'favouriteOrder/'+id +'?order_status='+status)
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

  getFoodList(id): Observable<any> {
    return this.http.get(environment.apiEndpoint + 'productfoodvalue/'+id)
  }
  getSpendingPatternMonthWise(user_id,month_id): Observable<any> {
    return this.http.get(environment.apiEndpoint + 'productspendcatwisebyuserid/'+user_id+'/'+month_id)
  }

  getSpendingPatternQuater(user_id,id): Observable<any> {
    return this.http.get(environment.apiEndpoint + 'productspendcatandmonthbyuserid/'+user_id+'/'+id)
  }

  getSearchRecipeList(searchKey): Observable<any> {
    return this.http.get(environment.apiEndpoint + 'recipelistsearch/recipe?search_key='+searchKey)
  }

  myOrderDetails(id): Observable<any> {
    return this.http.get(environment.apiEndpoint + 'orderdetailsbyid/'+id)
  }

  getPriceTrendDetails(id): Observable<any> {
    return this.http.get(environment.apiEndpoint + 'productpricedetails/'+id)
  }

  getProductSpendAllMonth(id): Observable<any> {
    return this.http.get(environment.apiEndpoint + 'productspendallmonth/'+id)
  }

  getFilterRecipeList(language,habbit,time,food): Observable<any> {
    return this.http.get(environment.apiEndpoint + 'recipelistfilterwithrecipeval/recipe?recipe_language='+language+'&recipe_type='+habbit+'&cooking_time='+time+'&food_val='+food,)
  }

  myFavOrderList(id,params): Observable<any> {
    return this.http.get(environment.apiEndpoint + 'favouriteorderlistbycustid/'+id+'/?'+params)
  }

  getlistEthenicity(): Observable<any> {
    return this.http.get(environment.apiEndpoint + 'ethinicitylist')
  }

  getlistHabbit(): Observable<any> {
    return this.http.get(environment.apiEndpoint + 'habbitlist')
  }

  getlistFood(): Observable<any> {
    return this.http.get(environment.apiEndpoint + 'foodlist')
  }

  getlistCookingTime(): Observable<any> {
    return this.http.get(environment.apiEndpoint + 'cookingtimelist')
  }

  getBlogListNew(): Observable<any> {
    return this.http.get(environment.apiEndpoint + 'bloglistbypopularblog?popular_blog='+1)
  }

  getThemeList(): Observable<any> {
    return this.http.get(environment.apiEndpoint + 'themeofmonthlist')
  }
  getlatestBlog(params): Observable<any> {
    return this.http.get(environment.apiEndpoint + 'bloglist/latest?'+params)
  }

  getfoodBlog(params): Observable<any> {
    return this.http.get(environment.apiEndpoint + 'bloglist/food?'+params)
  }

  getnutritionList(params): Observable<any> {
    return this.http.get(environment.apiEndpoint + 'bloglist/nutrition?'+params)
  }

  getThemeDetails(id): Observable<any> {
    //return this.http.get(environment.apiEndpoint + 'bloglist/nutrition?'+id)
    //bloglistbythemeofmonth?theme_of_month=2
    return this.http.get(environment.apiEndpoint + 'bloglistbythemeofmonth?theme_of_month='+id)
  }
  savingsList(id): Observable<any> {
    return this.http.get(environment.apiEndpoint + 'productsavingpricebyuserid/'+id)
  }


}
