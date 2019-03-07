import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import * as Globals from '../../../core/globals';
import { ProductService } from '../../../core/services/product.service';
import { CartService } from '../../../core/services/cart.service';
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  rangeValue: any;
  proDetails: any = {};
  imageBaseUrl: any;
  customer_cart_data: any;
  userId: any;
  totalOurPrice: any;
  totalMarketPrice: any;
  totalSavings: any;
  photo: any;
  foodValueList: any;
  private photos: any[] = [];
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,
  ) { }

  ngOnInit() {
    this.imageBaseUrl = environment.imageBaseUrl;
    this.userId = +localStorage.getItem('userId');
    this.rangeValue = 1;
    if (sessionStorage.getItem("cart")) {
      this.customer_cart_data = JSON.parse(sessionStorage.getItem("cart"));
    }
    else {
      this.customer_cart_data = [];
    }
    this.productDetails(this.route.snapshot.params['id']);

    //this.getFoodValueList(this.route.snapshot.params['id']);
  }
  productDetails(id) {
    this.productService.getProductDetails(id, this.userId).subscribe(
      res => {
        console.log(res);
        this.proDetails = res['result']['productlist'];

        this.proDetails.totalOurPrice = this.rangeValue * this.proDetails.price;
        this.proDetails.totalMarketPrice = this.rangeValue * this.proDetails.market_price;
        this.proDetails.totalSavings = this.proDetails.totalMarketPrice - this.proDetails.totalOurPrice;

        var index = this.customer_cart_data.findIndex(y => y.product_id == this.proDetails.id && y.customer_id == this.userId);

        if (index != -1) {
          this.proDetails.isCart = true;
          this.proDetails.quantity = this.customer_cart_data[index].quantity;
        }
        else {
          this.proDetails.isCart = false;
          this.proDetails.quantity = 0;
        }

      },
      error => {

      }
    )
  }

  changeRangeValue(value, proDetailss) {
    this.proDetails.quantity = value._value;
    this.proDetails.totalOurPrice = value._value * proDetailss.price;
    this.proDetails.totalMarketPrice = value._value * proDetailss.market_price;
    this.proDetails.totalSavings = this.proDetails.totalMarketPrice - this.proDetails.totalOurPrice;
  }
  addtoCart(item) {
    var data = {
      customer_id: this.userId,
      product_id: item.id,
      product_name: item.name,
      description: item.description,
      price: item.price,
      market_price: item.market_price,
      quantity_count: item.quantity_count,
      unit: item.unit,
      image_small: item.image_small,
      quantity: item.quantity + 1,
      totalOurPrice: item.totalOurPrice,
      totalMarketPrice: item.totalMarketPrice,
      totalSavings: item.totalSavings
    }
    var index = this.customer_cart_data.findIndex(y => y.product_id == item.id && y.customer_id == this.userId);
    this.proDetails.isCart = true;
    this.proDetails.quantity = item.quantity + 1;
    if (index == -1) {
      this.customer_cart_data.push(data);
      this.setCartData();
    }
    this.cartService.cartNumberStatus(true);
  }

  buyNow(item) {
      var data = {
        customer_id: this.userId,
        product_id: item.id,
        product_name: item.name,
        description: item.description,
        price: item.price,
        market_price: item.market_price,
        quantity_count: item.quantity_count,
        unit: item.unit,
        image_small: item.image_small,
        quantity: item.quantity + 1,
        totalOurPrice: item.totalOurPrice,
        totalMarketPrice: item.totalMarketPrice,
        totalSavings: item.totalSavings
      }
      var index = this.customer_cart_data.findIndex(y => y.product_id == item.id && y.customer_id == this.userId);
        this.proDetails.isCart = true;
      console.log(index);
      if (index == -1) {
        this.proDetails.quantity = item.quantity+1;
        this.customer_cart_data.push(data);
        this.setCartData();
        this.cartService.cartNumberStatus(true);
        //this.navCtrl.push('CartPage');
      }
      else {
       // this.navCtrl.push('CartPage');
      }
  }

  setCartData() {
    sessionStorage.setItem("cart", JSON.stringify(this.customer_cart_data));
  }

  RemoveCart(item) {
    var index = this.customer_cart_data.findIndex(y => y.product_id == item.id && y.customer_id == this.userId);
    if (index != -1) {
      this.customer_cart_data.splice(index, 1);
      this.setCartData();
    }
    if (this.proDetails['id'] == item.id) {
      this.proDetails.isCart = false;
      this.proDetails.quantity = 1;
    }
    this.cartService.cartNumberStatus(true);
  }

  decrement(product_details) {
    var index;
    if (product_details.quantity > 1) {
      index = this.customer_cart_data.findIndex(y => y.product_id == product_details.id && y.customer_id == this.userId);
      if (index != -1) {
        this.customer_cart_data[index].quantity = product_details.quantity - 1;
        this.setCartData();
      }
      
      this.proDetails['quantity'] = product_details.quantity - 1;
      if (this.proDetails['quantity'] == 0) {
       
        index = this.customer_cart_data.findIndex(y => y.product_id == product_details.id && y.customer_id == this.userId);
        if (index != -1) {
          this.customer_cart_data.splice(index, 1);
          this.setCartData();
        }
        this.proDetails.isCart = false;
      }
      this.proDetails.totalOurPrice = this.proDetails.quantity * product_details.price;
    this.proDetails.totalMarketPrice = this.proDetails.quantity * product_details.market_price;
    this.proDetails.totalSavings = this.proDetails.totalMarketPrice - this.proDetails.totalOurPrice;
    }
    else {
      index = this.customer_cart_data.findIndex(y => y.product_id == product_details.id && y.customer_id == this.userId);
      if (index != -1) {
        this.customer_cart_data.splice(index, 1);
        this.setCartData();
      }

      this.proDetails.isCart = false;
      console.log(this.proDetails);
      this.proDetails.quantity = product_details.quantity - 1;
      this.proDetails.totalOurPrice = product_details.price;
    this.proDetails.totalMarketPrice = product_details.market_price;
    this.proDetails.totalSavings = this.proDetails.totalMarketPrice - this.proDetails.totalOurPrice;

    }
    console.log(this.proDetails);
    
    this.cartService.cartNumberStatus(true);

  }
  increment(product_details) {
    var index = this.customer_cart_data.findIndex(y => y.product_id == product_details.id && y.customer_id == this.userId);
    if (index != -1) {
      this.customer_cart_data[index].quantity = product_details.quantity + 1;
      this.setCartData();
    }
    this.proDetails.quantity = product_details.quantity + 1
    this.proDetails.totalOurPrice = this.proDetails.quantity * product_details.price;
    this.proDetails.totalMarketPrice = this.proDetails.quantity * product_details.market_price;
    this.proDetails.totalSavings = this.proDetails.totalMarketPrice - this.proDetails.totalOurPrice;
    this.cartService.cartNumberStatus(true);
  }

  gotoFoodValue(id) {
    //this.navCtrl.push('FoodvaluePage', { id: id });
  }
  gotoRecipe(id) {
      this.router.navigate(['/recipe/product',id]);
  }
  gotoTrivia(id) {
    this.router.navigate(['/product/trivia',id]);
  }

}
