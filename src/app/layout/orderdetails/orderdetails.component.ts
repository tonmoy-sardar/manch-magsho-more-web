import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import * as Globals from '../../core/globals';
import { ProductService } from '../../core/services/product.service';

@Component({
  selector: 'app-orderdetails',
  templateUrl: './orderdetails.component.html',
  styleUrls: ['./orderdetails.component.scss']
})
export class OrderdetailsComponent implements OnInit {
  orderDetails:any ={};
  productList:any = [];
  imageBaseUrl:any;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService,
  ) { }

  ngOnInit() {
    this.imageBaseUrl = environment.imageBaseUrl;
    this.getOrderDetails(this.route.snapshot.params['id']);
  }
  getOrderDetails(id) {
    this.productService.myOrderDetails(id).subscribe(
      res => {
        console.log("Order Details==>",res);
        this.orderDetails = res['result'];
        this.productList = res['result']['order_details'];
      },
      error => {
        console.log(error);
      }
    )
  }

}
