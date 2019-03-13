import { Component, OnInit, Input } from '@angular/core';
import {Location} from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import * as Globals from '../../core/globals';
import { ProductService } from '../../core/services/product.service';
import { CartService } from '../../core/services/cart.service';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  userId: any;
  customer_cart_data: any = [];
  all_cart_data: any;
  total_item_price: any;
  total_packing_price: any;
  total_price: any;
  imageBaseUrl: any;
  total_market_price: any;
  total_market_saving: any;
  profileDetails: any = {};
  todayDate;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,
    private location: Location
  ) { }

  ngOnInit() {
    this.imageBaseUrl = environment.imageBaseUrl;
    if (localStorage.getItem('userId')) {
      this.userId = +localStorage.getItem('userId');
    }
    else {
      this.userId = '';
    }
    this.populateData();
    //this.getProfileDetails(this.userId);
    this.todayDate = Date.now();
  }

  populateData() {
    if (sessionStorage.getItem("cart")) {
      this.all_cart_data = JSON.parse(sessionStorage.getItem("cart"));
      this.customer_cart_data = this.all_cart_data;
      this.getTotalItemPrice();
      this.getTotalPackingPrice();
    }
    else {
      //this.customer_cart_data = [];
    }
  }


  setCartData() {
    console.log(this.all_cart_data);
    sessionStorage.setItem("cart", JSON.stringify(this.all_cart_data));
    this.getTotalItemPrice();
    this.getTotalPackingPrice();
  }

  getTotalItemPrice() {
    this.total_item_price = 0;
    this.total_market_price = 0;
    this.total_market_saving = 0
    this.customer_cart_data.forEach(x => {
      this.total_item_price += (x.price * x.quantity);
      this.total_market_price += (x.market_price * x.quantity);
    })
    this.getTotalSaving(this.total_item_price, this.total_market_price)

  }

  getTotalPackingPrice() {
    this.total_packing_price = 0;
    this.customer_cart_data.forEach(x => {
      this.total_packing_price += x.packing_charges;
    })
  }
  getTotalSaving(total_item_price, total_market_price, ) {
    this.total_market_saving += (total_market_price - total_item_price);
  }

  removeCart(id) {
    var index = this.all_cart_data.findIndex(x => x.product_id == id);
    if (index != -1) {
      this.customer_cart_data.splice(index, 1);
      this.setCartData()
    }
    this.cartService.cartNumberStatus(true);
  }

  gotoDetails() {
    this.router.navigate(['/deliveryaddress']);
  }


  increment(i) {
    var qty = this.customer_cart_data[i].quantity;
    this.customer_cart_data[i].quantity = qty + 1;
    var index = this.all_cart_data.findIndex(x => x.customer_id == this.userId && x.product_id == this.customer_cart_data[i].product_id);
    if (index != -1) {
      this.all_cart_data[index].quantity = qty + 1;
      this.all_cart_data[index].totalOurPrice = (this.all_cart_data[index].price * this.all_cart_data[index].quantity);
      this.all_cart_data[index].totalMarketPrice = (this.all_cart_data[index].market_price * this.all_cart_data[index].quantity);
      this.all_cart_data[index].totalSavings = (this.all_cart_data[index].totalMarketPrice - this.all_cart_data[index].totalOurPrice);
      this.setCartData()
    }
  }

  decrement(i) {
    var qty = this.customer_cart_data[i].quantity;
    if (qty > 1) {
      this.customer_cart_data[i].quantity = qty - 1;
      var index = this.all_cart_data.findIndex(x => x.customer_id == this.userId && x.product_id == this.customer_cart_data[i].product_id);

      if (index != -1) {
        this.all_cart_data[index].quantity = qty - 1;
        this.all_cart_data[index].totalOurPrice = (this.all_cart_data[index].price * this.all_cart_data[index].quantity);
        this.all_cart_data[index].totalMarketPrice = (this.all_cart_data[index].market_price * this.all_cart_data[index].quantity);
        this.all_cart_data[index].totalSavings = (this.all_cart_data[index].totalMarketPrice - this.all_cart_data[index].totalOurPrice);
        this.setCartData()
      }
    }
    else {
      this.removeCart(this.customer_cart_data[i].product_id)
    }
  }

  goBack() {
    this.location.back();
  }

}
