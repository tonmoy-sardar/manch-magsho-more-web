import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import * as Globals from '../../core/globals';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../core/services/user.service';

@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.component.html',
  styleUrls: ['./myprofile.component.scss']
})
export class MyprofileComponent implements OnInit {
  imageBaseUrl: any;
  userId: any;
  userImage: any;
  profileDetails: any = [];
  public showAddAddressForm: boolean = false;
  public buttonClicked: boolean = false;
  allAddressList: any = [];
  addressForm: FormGroup;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private userService: UserService,
  ) { }

  ngOnInit() {
    this.imageBaseUrl = environment.imageBaseUrl;
    this.userId = +localStorage.getItem('userId');
    this.addressForm = this.formBuilder.group({
      type: ["", Validators.required],
      address: ["", Validators.required],
      landmark: ["", Validators.required],
      pincode: ["", Validators.required],
    });
    this.getProfileDetails(this.userId);
  }
  getProfileDetails(id) {
    this.userService.getProfile(id).subscribe(
      res => {
        console.log(res);
        this.profileDetails = res['result'];
      },
      error => {
      }
    )
  }
  showMyAddress() {
    this.userService.addressList(this.userId).subscribe(
      res => {
        this.allAddressList = res['result'];
        console.log(this.allAddressList);
        this.buttonClicked = !this.buttonClicked;
      },
      error => {
        this.buttonClicked = !this.buttonClicked;
      }
    )

  }

  showAddAddress() {
    this.showAddAddressForm = !this.showAddAddressForm;
  }
  submitAddress() {
    if (this.addressForm.valid) {
      this.addressForm.value.customer_id = this.userId;
      this.addressForm.value.state_id = '';
      this.userService.submitAddress(this.addressForm.value).subscribe(
        res => {
          this.addressForm.reset();
          this.getProfileDetails(this.userId);
          this.showAddAddressForm = !this.showAddAddressForm;
          //this.buttonClicked = !this.buttonClicked;
          this.showMyAddress();
        },
        error => {
        }
      )
    } else {
      this.markFormGroupTouched(this.addressForm)
    }
  }

  gotoEditPage() {
    this.router.navigate(['/myprofile/edit']);
  }

  deleteAddress(id) {
    this.userService.deleteMyAddress(id).subscribe(
      res => {
        this.showMyAddress();
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
