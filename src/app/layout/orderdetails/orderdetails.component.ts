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
  visible: boolean;
  last_cat_id:any;
  last_cat_name:any;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService,
  ) {
    this.visible = false;
   }

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
        var last_cat_index =  res['result']['order_details'].length -1;
        this.last_cat_id = res['result']['order_details'][last_cat_index]['product_cat_id'];
        this.last_cat_name = res['result']['order_details'][last_cat_index]['product_cat_name'];
        this.visible = true;
      },
      error => {
        console.log(error);
        this.visible = true;
      }
    )
  }

  goBack() {
    this.router.navigate(['home']);
  }
  gotoCategory(id,name) {
   // alert(id+name);
   this.router.navigate(['/product',id]);
  }

}
