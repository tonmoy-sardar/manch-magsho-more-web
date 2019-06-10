import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import * as Globals from '../../core/globals';
import { UserService } from '../../core/services/user.service';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-deliveryslot',
  templateUrl: './deliveryslot.component.html',
  styleUrls: ['./deliveryslot.component.scss']
})
export class DeliveryslotComponent implements OnInit {
  deliverySlot;
  customer_cart_data: any = [];
  all_cart_data: any;
  userId: any;
  imageBaseUrl: any;
  allAddressList: any = [];
  profileDetails: any = {};
  total_item_price: any;
  total_packing_price: any;
  total_price: any;
  total_market_price: any;
  total_market_saving: any;
  all_customer_data: any;
  todayDate;
  pincode:any;
  isShowPayMode:number;

  order_data: any;
  user_email: any;
  order_details: any;
  orderStatus: any;
  delivery_charge;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    private cartService:CartService
  ) { 
    
  }

  ngOnInit() {
    this.isShowPayMode = 1;
    this.userId = +localStorage.getItem('userId');
    this.imageBaseUrl = environment.imageBaseUrl;
    if (localStorage.getItem('userId')) {
      this.userId = +localStorage.getItem('userId');
    }
    else {
      this.userId = '';
    }
    this.pincode = localStorage.getItem('pincode');
    this.populateData();
    this.getDeliverySlot();
    this.all_customer_data = JSON.parse(sessionStorage.getItem("customer_details"));
    this.todayDate = Date.now();
  }

  getDeliverySlot() {
    this.userService.getPinCode(this.pincode).subscribe(
      res => {
        this.deliverySlot = res['result'];
        console.log("kkkk==>",this.deliverySlot);
      },
      error => {
 
      }
    )
  }

  populateData() {
    if (sessionStorage.getItem("cart")) {
      this.all_cart_data = JSON.parse(sessionStorage.getItem("cart"));
      this.customer_cart_data = this.all_cart_data;
      this.getTotalItemPrice();
      this.getTotalPackingPrice();
    }
    else {
      this.customer_cart_data = [];
    }
  }
  getTotalItemPrice() {
    this.total_item_price = 0;
    this.total_market_price = 0;
    this.total_market_saving = 0
    this.customer_cart_data.forEach(x => {
      if (x.discounted_price > 0) {
        this.total_item_price += (x.discounted_price * x.quantity);
        this.total_market_price += x.totalMarketPrice;
        this.total_market_saving += x.totalSavings;
      }
      else {
        this.total_item_price += (x.price * x.quantity);
        this.total_market_price += x.totalMarketPrice;
        this.total_market_saving += x.totalSavings;

      }
    })
  }

  getTotalPackingPrice() {
    this.total_packing_price = 0;
    this.customer_cart_data.forEach(x => {
      this.total_packing_price += x.packing_charges;
    })
  }

  // getProfileDetails(id) {
  //   this.userService.getProfile(id).subscribe(
  //     res => {
  //       this.profileDetails = res['result'];
  //     },
  //     error => {
  //     }
  //   )
  // }

  gotoPayMode(delivery) {
    this.all_customer_data.delivery_slot = delivery;
    sessionStorage.setItem("customer_details", JSON.stringify(this.all_customer_data));
    this.isShowPayMode=2;
   // this.navCtrl.push('PaymentmodePage');
  }

  placeOrder(payment_type) {
    this.order_data = {};
    console.log("Customer Data ==>",this.all_customer_data);
    this.order_data.payment_type = payment_type;
    this.order_data.address_id = this.all_customer_data.address_id;
    this.order_data.address = this.all_customer_data.address;
    this.order_data.customer_id = this.userId;
    this.order_data.customer_email = this.user_email;
    this.order_data.order_total_price = this.total_item_price + parseFloat(this.all_customer_data.delivery_slot.deliver_charge);
    this.order_data.deliver_slot=this.all_customer_data.delivery_slot.deliver_slot_id;
    this.order_data.deliver_charge=this.all_customer_data.delivery_slot.deliver_charge;
    this.order_data.pincode= this.all_customer_data.pincode;
    this.order_data.state_id= "1";
    this.order_data.is_device_type= "1";
    this.order_data.type=this.all_customer_data.type;
   
    this.order_details = [];
    this.customer_cart_data.forEach(item => {
      console.log(item);
      this.order_details.push(
        {
          'product_id': item.product_id,
          'quantity': item.quantity,
          'unit_price': item.price,
          'saving_price': (item.market_price - item.price),
          'IGST': '',
          'CGST': '',
          'GST': ''
        }
      );
    });
    this.order_data.order_details = this.order_details;
    console.log("Order Details==>",this.order_data);
    this.cartService.addOrder(this.order_data).subscribe(
      res => {
        console.log("Order Placed ==>",res);
        this.orderStatus = res.result;
        sessionStorage.clear();
        this.cartService.cartNumberStatus(true);
        this.router.navigate(['/success']);
      },
      error => {
        console.log("Error==>",error);
        console.log(error);
      }
    );
  }

}
