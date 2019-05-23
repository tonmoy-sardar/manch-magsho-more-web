import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { CartService } from '../../services/cart.service';
import { ProductService } from '../../services/product.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  loggedIn: boolean;
  userName:string;
  totalCart: any;
  productList:any =[];
  visibleKey: boolean;
  constructor(
    private router: Router,
    private userService: UserService,
    public cartService:CartService,
    public productService:ProductService,
    private location: Location
  ) {
    this.loadUserInfo();
    cartService.getCartNumberStatus.subscribe(status => this.cartNumberStatus(status));
    userService.getProfileUpdateStatus.subscribe(status => this.profileUpdateStatus(status));
   }

  ngOnInit() {
    if (sessionStorage.getItem("cart")) {
      this.totalCart = JSON.parse(sessionStorage.getItem("cart")).length;
      
    }
    else {
      this.totalCart = 0;
    }
    this.getProList();
    
  }
  
  loadUserInfo() {
    if (localStorage.getItem('isLoggedin')) {
      this.loggedIn = true;
      this.userName = localStorage.getItem('userName');
    }
    else {
      this.loggedIn = false;
    }
  }
  cartNumberStatus(status: boolean) {
    if (status) {
      if (sessionStorage.getItem("cart")) {
        this.totalCart = JSON.parse(sessionStorage.getItem("cart")).length;
      }
      else {
        this.totalCart = 0;
      }
    }
  }
  getProList() {

    this.productService.getAllProList().subscribe(
      res => {
        console.log("Marquee List===>",res);
        this.productList = res['result'];
        this.visibleKey = true;
      },
      error => {
        // console.log(error)
      }
    )
  }


  logout() {
    localStorage.clear();
    this.loggedIn = false;
    this.router.navigate(['/']);
  }

  private profileUpdateStatus(status: boolean) {
    if (status) {
      this.loadUserInfo();
    }
  }

  gotoDetails(id) {
    this.router.navigate(['product/details', id]);
  }

  goBack() {
    this.location.back();
  }


}
