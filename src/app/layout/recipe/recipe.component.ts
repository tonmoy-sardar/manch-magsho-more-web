import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import * as Globals from '../../core/globals';
import { ProductService } from '../../core/services/product.service';
@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss']
})
export class RecipeComponent implements OnInit {
  rating;
  avg_rating;
  proRecipeList: any = [];
  proDetails: any = {};
  imageBaseUrl: any;
  userId: any;
  visibleKey: boolean;
  productName;
  productImage;
  defaultPagination: number;
  proRecipeListNext: any;
  proId: number;

  recipeListCount:any;
  itemPerPage: number;
  itemNo: number;
  lower_count: number;
  upper_count: number;
  paginationMaxSize:number;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService,
  ) { }

  ngOnInit() {
    this.rating = [1, 2, 3, 4, 5];
    this.itemNo = 0;
    this.defaultPagination = 1;
    this.paginationMaxSize = Globals.paginationMaxSize;
    this.itemPerPage = Globals.itemPerPage;
    this.imageBaseUrl = environment.imageBaseUrl;
    this.userId = +localStorage.getItem('userId');
    this.proId = this.route.snapshot.params['id'];
    if (!this.proId) {
      this.allrecipeList();
    }
    else {
      this.recipeById(this.proId);
    }

  }
  allrecipeList() {
    let params: URLSearchParams = new URLSearchParams();
    params.set('page', this.defaultPagination.toString());
    this.productService.getAllRecipeList(params).subscribe(
      res => {
        console.log("Recipe List==>", res);
        this.proRecipeListNext = res['result']['next'];
        this.proRecipeList = res['result']['recipelist'];
        //code for pagination
        this.recipeListCount =  res['result']['total_count'];
        this.itemNo = (this.defaultPagination - 1) * this.itemPerPage;
        this.lower_count = this.itemNo + 1;
        if (this.recipeListCount > this.itemPerPage * this.defaultPagination) {
          this.upper_count = this.itemPerPage * this.defaultPagination
        }
        else {
          this.upper_count = this.recipeListCount;
        }
        console.log(this.recipeListCount);
      },
      error => {
      }
    )
  }
  pagination() {
    this.allrecipeList();
  };
  recipeById(id) {
    this.productService.recipeByProduct(id).subscribe(
      res => {
        console.log("zzz==>",res);
        this.productName = res['product_name'];
        this.productImage = res['product_image'];
        this.proRecipeList = res['result'];
        this.visibleKey = true;
      },
      error => {
      }
    )
  }

  gotoDetails(id) {
    this.router.navigate(['recipe/details', id]);
  }

}
