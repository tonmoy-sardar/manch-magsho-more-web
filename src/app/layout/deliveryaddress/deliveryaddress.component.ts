import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import * as Globals from '../../core/globals';
import { UserService } from '../../core/services/user.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-deliveryaddress',
  templateUrl: './deliveryaddress.component.html',
  styleUrls: ['./deliveryaddress.component.scss']
})
export class DeliveryaddressComponent implements OnInit {
  customer_cart_data: any = [];
  all_cart_data: any;
  allAddressList: any = [];
  profileDetails: any = {};
  total_item_price: any;
  total_packing_price: any;
  total_price: any;
  imageBaseUrl: any;
  total_market_price: any;
  total_market_saving: any;
  addressForm: FormGroup;
  showAddressForm: boolean;
  pinCheckForm: FormGroup;
  pincode:number;
  deliverySlot :any=[];
  isAvailable:any;
  isActive:any;
  isAvailablePin:any;
  total_market_price1:any;
  customer_data:any;
  todayDate;
  userId: any;
  type:any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private userService: UserService,
  ) { 
    this.type ='Home';
  }

  ngOnInit() {
    this.userId = +localStorage.getItem('userId');
    this.imageBaseUrl = environment.imageBaseUrl;
    this.addressForm = this.formBuilder.group({
      type: ["", Validators.required],
      customer_name: ["", Validators.required],
      address: ["", Validators.required],
      street_no: ["", Validators.required],
      landmark: ["", Validators.required],
      pincode: ["", Validators.required],
    });
    this.pinCheckForm = this.formBuilder.group({
      pincheck: ["", Validators.required],
    });
    this.showAddressForm = false;
    if (localStorage.getItem('userId')) {
      this.userId = +localStorage.getItem('userId');
    }
    else {
      this.userId = '';
    }
    this.myAddressList(this.userId);
   // this.getProfileDetails(this.userId);
    this.populateData();
    this.todayDate = Date.now();
    this.type ='Home';
  
  }
  addNewAddress() {
    this.showAddressForm = true;
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

  myAddressList(id) {
    this.userService.addressList(id).subscribe(
      res => {
        this.allAddressList = res['result'];

      },
      error => {
      }
    )
  }
  checkAvailability(i,addressId,pinCode,myAddress) {
    this.userService.getPinCode(pinCode).subscribe(
      res => {
        this.isAvailablePin='';
        this.deliverySlot = res['result'];
        this.isAvailable = res['result'].length;    
        if(this.isAvailable >0) {
         
          this.customer_data ={};
          this.customer_data.address_id = addressId;
          this.customer_data.address = myAddress.address;
          this.customer_data.pincode = myAddress.pincode;
          this.customer_data.state_name = myAddress.state_name;
          this.customer_data.type = myAddress.type;
          sessionStorage.setItem("customer_details", JSON.stringify(this.customer_data));
          localStorage.setItem("pincode", pinCode);
          
         this.router.navigate(['/deliveryslot']);
        }
        else {
          this.isActive = i;
        }
      },
      error => {
        this.deliverySlot = [];
        this.isAvailable = 0;
      }
    )
  }

 

  submitAddress() {
    if (this.addressForm.valid) {
      this.addressForm.value.customer_id = this.userId;
      this.addressForm.value.state_id = '';
      this.userService.submitAddress(this.addressForm.value).subscribe(
        res => {
          this.addressForm.reset();
          this.showAddressForm = false;
          this.myAddressList(this.userId);
          this.type ='Home';
        },
        error => {

        }
      )
    } else {
      this.markFormGroupTouched(this.addressForm)
    }
  }

  checkPinCode() {
    if (this.pinCheckForm.valid) {
      this.pincode = this.pinCheckForm.value.pincheck;
      this.userService.getPinCode(this.pincode).subscribe(
        res => {
         this.isAvailable='';
          this.isAvailablePin = res['result'].length;    

        },
        error => {
        }
      )
    } else {
      this.markFormGroupTouched(this.pinCheckForm)
    }
  }


  markFormGroupTouched(formGroup: FormGroup) {
    (<any>Object).values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control.controls) {
        control.controls.forEach(c => this.markFormGroupTouched(c));
      }
    });
  }
  isFieldValid(form: FormGroup, field: string) {
    return !form.get(field).valid && (form.get(field).dirty || form.get(field).touched);
  }

  displayFieldCss(form: FormGroup, field: string) {
    return {
      'is-invalid': form.get(field).invalid && (form.get(field).dirty || form.get(field).touched),
      'is-valid': form.get(field).valid && (form.get(field).dirty || form.get(field).touched)
    };
  }


}
