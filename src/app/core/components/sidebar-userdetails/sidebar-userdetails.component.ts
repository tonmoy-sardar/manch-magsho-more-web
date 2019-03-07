import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
@Component({
  selector: 'app-sidebar-userdetails',
  templateUrl: './sidebar-userdetails.component.html',
  styleUrls: ['./sidebar-userdetails.component.scss']
})
export class SidebarUserdetailsComponent implements OnInit {
  imageBaseUrl;
  loggedIn: boolean;
  userName:string;
  userImage:any;
  constructor(
    private router: Router,
  ) { }

  ngOnInit() {
    this.imageBaseUrl = environment.imageBaseUrl;
    this.loadUserInfo();
  }
  loadUserInfo() {
    if (localStorage.getItem('isLoggedin')) {
      this.loggedIn = true;
      this.userName = localStorage.getItem('userName');
      this.userImage = localStorage.getItem('userImage');
      console.log(this.userName);
    }
    else {
      this.loggedIn = false;
      this.userName = "Guest";
      this.userImage = '';
    }
  }
  logout() {
    localStorage.clear();
    this.loggedIn = false;
    this.router.navigate(['/']);
  }

}
