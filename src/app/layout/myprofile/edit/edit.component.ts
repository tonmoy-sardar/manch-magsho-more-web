import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import * as Globals from '../../../core/globals';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../../core/services/user.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  userId: number;
  userName: string;
  imageBaseUrl: any;
  profileDetails: any = [];
  allAddressList: any = [];
  updateProfileForm: FormGroup;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private userService: UserService,
  ) {
    this.updateProfileForm = this.formBuilder.group({
      name: ["", Validators.required],
      email: ["", Validators.required],
      contact: ["", Validators.required],
    });
   }

  ngOnInit() {
    this.imageBaseUrl = environment.imageBaseUrl;
    this.userName = localStorage.getItem('userName');
    this.userId = +localStorage.getItem('userId');
    this.getProfileDetails(this.userId);
    this.getmyAddress();
  }


  getProfileDetails(id) {
    this.userService.getProfile(id).subscribe(
      res => {
        this.profileDetails = res['result'];
      },
      error => {
      }
    )
  }

  // updateProfile(profileDetails) {
  //   this.userId = +localStorage.getItem('userId');
  //   this.userService.updateUserProfile(this.userId, profileDetails).subscribe(
  //     res => {
  //       this.profileDetails = res['result'];
  //       this.getProfileDetails(this.userId);
  //       localStorage.setItem('userName', this.profileDetails.name);
  //      // this.userService.updateProfileStatus(true);
  //     },
  //     error => {
  //     }
  //   )

  // }

  updateProfile() {
    if (this.updateProfileForm.valid) {
      this.updateProfileForm.value.address = '';
      this.userService.updateUserProfile(this.userId,this.updateProfileForm.value).subscribe(
        res => {
          console.log(res);
          this.updateProfileForm.reset();
          localStorage.setItem('userName', this.profileDetails.name);
          this.getProfileDetails(this.userId);
          this.getmyAddress();

        },
        error => {
        }
      )
    } else {
      this.markFormGroupTouched(this.updateProfileForm)
    }
  }


  getmyAddress() {
    this.userService.addressList(this.userId).subscribe(
      res => {
        this.allAddressList = res['result'];
        console.log(this.allAddressList)
      },
      error => {
      }
    )
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
