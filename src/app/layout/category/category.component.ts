import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import * as Globals from '../../core/globals';
import { ProductService } from '../../core/services/product.service';
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  categoryList : any=[];
  imageBaseUrl;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService,
  ) { }

  ngOnInit() {
    this.imageBaseUrl = environment.imageBaseUrl;
    this.getCategoryList();
  }
  getCategoryList() {
    this.productService.getCategoryList().subscribe(
      res => {
        console.log(res);
        this.categoryList = res['result'];
      },
      error => {
        // console.log(error)
      }
    )
  }
  goToProList(id,name) {
    this.router.navigate(['/product',id]);
  }
  

}
