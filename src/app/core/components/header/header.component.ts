import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { CartService } from '../../services/cart.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  loggedIn: boolean;
  userName:string;
  totalCart: any;
  
  constructor(
    private router: Router,
    private userService: UserService,
    public cartService:CartService
  ) {
    this.loadUserInfo();
    cartService.getCartNumberStatus.subscribe(status => this.cartNumberStatus(status));
   }

  ngOnInit() {
    if (sessionStorage.getItem("cart")) {
      this.totalCart = JSON.parse(sessionStorage.getItem("cart")).length;
      
    }
    else {
      this.totalCart = 0;
    }
    
  }
  
  loadUserInfo() {
    if (localStorage.getItem('isLoggedin')) {
      this.loggedIn = true;
      this.userName = localStorage.getItem('userName');
      console.log(this.userName);
      console.log("Logged In ==>",this.loggedIn);
    }
    else {
      this.loggedIn = false;
      console.log("Logged In ==>",this.loggedIn);
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

  logout() {
    localStorage.clear();
    this.loggedIn = false;
    this.router.navigate(['/']);
  }

}
