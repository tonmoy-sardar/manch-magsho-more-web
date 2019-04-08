import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import * as Globals from '../../core/globals';
import { ProductService } from '../../core/services/product.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  allProductList: any = [];
  imageBaseUrl: any;
  categoryBannerImage: any;
  defaultPagination: number;
  productResultNext: any;
  userId:number;
  catName:string;
  searchText:any;
  searchTxt:any;
  visibleKey: boolean;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService,
  ) { }

  ngOnInit() {
    this.visibleKey=false;
    this.imageBaseUrl = environment.imageBaseUrl;
    this.userId = +localStorage.getItem('userId');
    this.searchTxt = this.route.snapshot.params['name']
    this.getSearchList(this.searchTxt);
  }
  getSearchList(name) {
    this.searchTxt =name;
    this.productService.getSearchList(name, this.userId).subscribe(
      res => {
        this.visibleKey=true;
        console.log("Product List==>",res);
        this.categoryBannerImage = res['category_banner_image'];
        this.catName = res['category_name'];
        ;
   
        this.allProductList = res['result'];
        //code for pagination
      },
      error => {
        this.visibleKey=true;
        this.allProductList =[];
      console.log(error);
      }
    )
  }
 
  addWishList(id) {
    let data = {
      "product_id": id,
      "whist_status": "1",
      "user_id": this.userId
    }
    this.productService.addWishlist(data).subscribe(
      res => {
        this.getSearchList(this.searchTxt);
      },
      error => {
      }
    )
  }
  gotoProductDetails(id) {
    this.router.navigate(['/product/details',id]);
  }
  gotoPage() {
    this.router.navigate(['/login']);
  }

  

}
