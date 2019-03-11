import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
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
  constructor() { }

  ngOnInit() {
    this.imageBaseUrl = environment.imageBaseUrl;
    this.loadUserInfo();
  }

  loadUserInfo() {
    if (localStorage.getItem('isLoggedin')) {
      this.loggedIn = true;
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
    // this.myprofileService.updatemyProfile(this.user_id,this.profileImage, this.editForm.value).subscribe(
    //   res => {
    //     this.profileDetails = res['result'];
    //     this.userName = res['result']['name'];
    //     this.toastr.success('Profile Update successfully', '', {
    //       timeOut: 3000,
    //     });
    //     localStorage.setItem('userName', this.userName);
    //     this.myprofileService.updateProfileStatus(true);
    //     this.editProfile = false;
     
    
    //     this.getProfileDetails(localStorage.getItem('userId'));
    //   },
    //   error => {
    //     // console.log(error)
    //     this.toastr.error(error.error.message, '', {
    //       timeOut: 3000,
    //     });
    //   }
  }


}
