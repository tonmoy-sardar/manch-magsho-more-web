import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { UserService } from '../../services/user.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-user-sidebar',
  templateUrl: './user-sidebar.component.html',
  styleUrls: ['./user-sidebar.component.scss']
})
export class UserSidebarComponent implements OnInit {
  imageBaseUrl;
  loggedIn: boolean;
  userName:string;
  userImage:any;
  profileImage:any;
  userId:any;
  constructor(
    public userService:UserService,
    private toastr: ToastrService,
  ) { }

  ngOnInit() {
    this.imageBaseUrl = environment.imageBaseUrl;
    this.loadUserInfo();
  }

  loadUserInfo() {
    if (localStorage.getItem('isLoggedin')) {
      this.loggedIn = true;
      this.userId = localStorage.getItem('userId');
      this.userName = localStorage.getItem('userName');
      this.userImage = localStorage.getItem('userImage');
      console.log("User Image ==>",this.userImage);
      console.log(this.userName);
    }
    else {
      this.loggedIn = false;
      this.userName = "Guest";
      this.userImage = '';
    }
  }

  onFileChange(event) {
    this.profileImage = event.target.files[0];
    console.log(this.profileImage);
    this.userService.updatemyProfileImage(this.userId,this.profileImage).subscribe(
      res => {
        console.log(res);
        //this.profileDetails = res['result'];
        this.userImage = res['result']['profile_image'];
        
        localStorage.setItem('userImage', this.userImage);
        // this.myprofileService.updateProfileStatus(true);
        // this.editProfile = false;
        // this.getProfileDetails(localStorage.getItem('userId'));
        this.loadUserInfo();
        this.toastr.success('Profile Update successfully', '', {
          timeOut: 3000,
        });
      },
      error => {
        // console.log(error)
        this.toastr.error(error.error.message, '', {
          timeOut: 3000,
        });
      });
  }
  


}
