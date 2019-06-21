import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { flattenStyles } from '@angular/platform-browser/src/dom/dom_renderer';
import { ProductService } from '../../core/services/product.service';
@Component({
  selector: 'app-mobilescreen',
  templateUrl: './mobilescreen.component.html',
  styleUrls: ['./mobilescreen.component.scss']
})
export class MobilescreenComponent implements OnInit {
  productList:any=[];
  visibleKey:boolean =false;
  constructor(
    public productService:ProductService,
    private router: Router,
  ) { }

  ngOnInit() {
  }
  gotoDetails(id) {
    this.router.navigate(['product/details', id]);
  }
}
