import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import * as Globals from '../../core/globals';
import { ProductService } from '../../core/services/product.service';
import { CartService } from '../../core/services/cart.service';
@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  userId:number;
  orderList:any=[];
  imageBaseUrl:any;
  visibleKey: boolean;
  productList;
  customer_cart_data: any;
  orderListNext:any;
  defaultPagination:number;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService:CartService
  ) { }

  ngOnInit() {
    this.imageBaseUrl = environment.imageBaseUrl;
    this.userId = +localStorage.getItem('userId');
    this.customer_cart_data = [];
    this.defaultPagination = 1;
    this.getOrderList(this.userId);
  }

  getOrderList(id) {
    var params: URLSearchParams = new URLSearchParams();
    params.set('page', this.defaultPagination.toString());
    this.productService.myOrderList(id,params).subscribe(
      res => {
        console.log(res);
        this.orderListNext = res['result']['next'];
       this.orderList = res['result']['orderlist'];
      },
      error => {
      }
    )
  }

  repeatOrder(order)
  {
    var productIds: any = [];
    order.order_details.forEach(x => {
      productIds.push(x.product_id)
    })
    var ids = productIds.toString();
    this.productService.getRepeatOrder(ids).subscribe(
      res => {
       this.productList = res['result'];
       
       for(var i=0; i<this.productList.length; i++)
       {
        var index = order.order_details.findIndex(x => x.product_id == this.productList[i].id);
        var quantity = order.order_details[index].quantity;
        var totalOurPrice =   (this.productList[i].price * quantity);
        var totalMarketPrice =   (this.productList[i].market_price * quantity);
        var totalSavings =   (totalMarketPrice - totalOurPrice);
        var data = {
          customer_id: this.userId,
          product_id: this.productList[i].id,
          product_name: this.productList[i].name,
          description: this.productList[i].description,
          price: this.productList[i].price,
          market_price: this.productList[i].market_price,
          quantity_count: this.productList[i].quantity_count,
          unit: this.productList[i].unit,
          image_small: this.productList[i].image_small,
          quantity: quantity,
          totalOurPrice: totalOurPrice,
          totalMarketPrice: totalMarketPrice,
          totalSavings: totalSavings
        }

        this.customer_cart_data.push(data);
        this.setCartData();
        this.cartService.cartNumberStatus(true);
        if(i==this.productList.length-1)
        {
         // this.navCtrl.push('CartPage');
        }
       }

      },
      error => {
        
      }
    )
  }

  setCartData() {
    sessionStorage.setItem("cart", JSON.stringify(this.customer_cart_data));
  }

}
