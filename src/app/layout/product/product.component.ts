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
  productListCount:any;
  itemPerPage: number;
  itemNo: number;
  lower_count: number;
  upper_count: number;
  paginationMaxSize:number;
  catId:any;
  searchText:any;
  isPagination:number;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService,
  ) { }
  ngOnInit() {
    this.itemNo = 0;
    this.defaultPagination = 1;
    this.paginationMaxSize = Globals.paginationMaxSize;
    this.itemPerPage = Globals.itemPerPage;

    this.imageBaseUrl = environment.imageBaseUrl;
    this.userId = +localStorage.getItem('userId');
    this.catId = this.route.snapshot.params['id'];
    this.productList(this.catId);
    this.searchText ="";
    this.isPagination =0;
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

        //code for pagination
        this.isPagination=1;
        this.productListCount =  res['result']['total_count'];
        this.itemNo = (this.defaultPagination - 1) * this.itemPerPage;
        this.lower_count = this.itemNo + 1;
        if (this.productListCount > this.itemPerPage * this.defaultPagination) {
          this.upper_count = this.itemPerPage * this.defaultPagination
        }
        else {
          this.upper_count = this.productListCount;
        }
        console.log(this.productListCount);

        //this.productLinks = res['result']['links'];
      },
      error => {
      console.log(error);
      }
    )
  }
  pagination() {
    this.productList(this.route.snapshot.params['id']);
  };
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

  proSearch(searchtxt) {
    this.searchText = searchtxt;
    this.allProductList = [];
    this.productService.productSearch(this.catId, this.searchText).subscribe(
      res => {
        console.log(res);
        this.allProductList = res['result'];
        this.isPagination=0;
      },
      error => {
        this.allProductList=[];
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
