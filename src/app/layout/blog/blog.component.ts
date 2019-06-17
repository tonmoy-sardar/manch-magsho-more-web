import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import * as Globals from '../../core/globals';
import { ProductService } from '../../core/services/product.service';
@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {
  imageBaseUrl: any;
  blogList: any;
  blogListCount: any;
  itemPerPage: number;
  itemNo: number;
  lower_count: number;
  upper_count: number;
  paginationMaxSize: number;
  defaultPagination: number;
  blogResultNext: any;
  themeList:any=[];
  latestList:any=[];
  foodList:any=[];
  nutritionList:any=[];
  themeDetailss:any=[];
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
    this.getBlogList();
    this.getThemeMonthList();
    this.getLatestBlog();
    this.getFoodBlog();
    this.getNutritionList();
    //this.themeDetails(1);

  }

  getBlogList() {
    let params: URLSearchParams = new URLSearchParams();
    params.set('page', this.defaultPagination.toString());
    this.productService.getBlogListNew().subscribe(
      res => {
        
        console.log("Blog List New==>", res);
        this.blogList = res['result'];
        // this.blogResultNext = res['result']['next'];
        // //code for pagination
        // this.blogListCount = res['result']['total_count'];
        // this.itemNo = (this.defaultPagination - 1) * this.itemPerPage;
        // this.lower_count = this.itemNo + 1;
        // if (this.blogListCount > this.itemPerPage * this.defaultPagination) {
        //   this.upper_count = this.itemPerPage * this.defaultPagination
        // }
        // else {
        //   this.upper_count = this.blogListCount;
        // }
        // console.log(this.blogListCount);
      },
      error => {
        // console.log(error)
      }
    )
  }

  getThemeMonthList() {
    let params: URLSearchParams = new URLSearchParams();
    params.set('page', this.defaultPagination.toString());
    this.productService.getThemeList().subscribe(
      res => {
        console.log("Theme month List==>", res);
        this.themeList = res['result'];

        this.themeDetails(this.themeList.length);
      },
      error => {
        // console.log(error)
      }
    )
  }

  

  getLatestBlog() {
    let params: URLSearchParams = new URLSearchParams();
    params.set('page', this.defaultPagination.toString());
    this.productService.getlatestBlog(params).subscribe(
      res => {
        console.log("LatestList==>", res);
        this.latestList = res['result']['recipelist'];
      },
      error => {
        // console.log(error)
      }
    )
  }

  getFoodBlog() {
    let params: URLSearchParams = new URLSearchParams();
    params.set('page', this.defaultPagination.toString());
    this.productService.getfoodBlog(params).subscribe(
      res => {
        console.log("Food List==>", res);
        this.foodList = res['result']['recipelist'];
      },
      error => {
        // console.log(error)
      }
    )
  }

  getNutritionList() {
    let params: URLSearchParams = new URLSearchParams();
    params.set('page', this.defaultPagination.toString());
    this.productService.getnutritionList(params).subscribe(
      res => {
        console.log("Nutrition List==>", res);
        this.nutritionList = res['result']['recipelist'];
      },
      error => {
        // console.log(error)
      }
    )
  }

  themeDetails(id) {
    this.productService.getThemeDetails(id).subscribe(
      res => {
        console.log("Theme Details=>", res);
        this.themeDetailss = res['result']['list'];
      },
      error => {
        // console.log(error)
      }
    )
  }

  filterChanged(selectedValue:string){
    //alert(1);
    console.log('value is ',selectedValue);
    this.themeDetails(selectedValue)
 
    }

}
