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
  blogList: any = [];
  blogListCount: any;
  itemPerPage: number;
  itemNo: number;
  lower_count: number;
  upper_count: number;
  paginationMaxSize: number;
  defaultPagination: number;
  blogResultNext: any;
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
  }

  getBlogList() {
    let params: URLSearchParams = new URLSearchParams();
    params.set('page', this.defaultPagination.toString());
    this.productService.getBlogList().subscribe(
      res => {
        console.log("Blog List ==>", res);
        this.blogList = res['result']['recipelist'];
        this.blogResultNext = res['result']['next'];
        //code for pagination
        this.blogListCount = res['result']['total_count'];
        this.itemNo = (this.defaultPagination - 1) * this.itemPerPage;
        this.lower_count = this.itemNo + 1;
        if (this.blogListCount > this.itemPerPage * this.defaultPagination) {
          this.upper_count = this.itemPerPage * this.defaultPagination
        }
        else {
          this.upper_count = this.blogListCount;
        }
        console.log(this.blogListCount);
      },
      error => {
        // console.log(error)
      }
    )
  }

}
