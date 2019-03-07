import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import * as Globals from '../../core/globals';
import { ProductService } from '../../core/services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  allProductList: any = [];
  imageBaseUrl: any;
  categoryBannerImage: any;
  defaultPagination: number;
  productResultNext: any;
  userId:number;
  catName:string;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService,
  ) { }
  ngOnInit() {
    this.defaultPagination = 1;
    this.imageBaseUrl = environment.imageBaseUrl;
    this.userId = +localStorage.getItem('userId');
    this.productList(this.route.snapshot.params['id']);
 // this.catName = this.route.snapshot.params['name'];
  }
  productList(id) {
    let params: URLSearchParams = new URLSearchParams();
    params.set('page', this.defaultPagination.toString());
    this.productService.getProductList(id, this.userId,params).subscribe(
      res => {
        console.log("Product List==>",res);
        this.categoryBannerImage = res['category_banner_image'];
        this.catName = res['category_name'];
        ;
        this.productResultNext = res['result']['next'];
        this.allProductList = res['result']['productlist'];
      },
      error => {
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
        this.productList(this.route.snapshot.params['id']);
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
