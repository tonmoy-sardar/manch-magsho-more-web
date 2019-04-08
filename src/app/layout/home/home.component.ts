import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { flattenStyles } from '@angular/platform-browser/src/dom/dom_renderer';
import { ProductService } from '../../core/services/product.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  productList:any=[];
  visibleKey:boolean =false;
  constructor(
    public productService:ProductService,
    private router: Router,
    ) { }

  ngOnInit() {
    this.getProList();
  }

  getProList() {

    this.productService.getAllProList().subscribe(
      res => {
        this.productList = res['result'];
        this.visibleKey = true;
        console.log("Pro List==>",this.productList);
      },
      error => {
        // console.log(error)
      }
    )
  }
  gotoDetails(id) {
    this.router.navigate(['product/details', id]);
  }

}
