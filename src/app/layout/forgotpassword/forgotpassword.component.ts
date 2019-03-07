import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from "../../core/services/user.service";
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.scss']
})
export class ForgotpasswordComponent implements OnInit {
  forgotForm: FormGroup;
  otpForm: FormGroup;
  newPasswordForm: FormGroup;
  isShow: number;
  otp:any;
  data: any = {};
  newOtp: string;
  getResult: any = {};
  otpVerified:number;
  useContactEmail;
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private toastr: ToastrService,
    private router: Router,
  ) { 
    this.forgotForm = this.formBuilder.group({
      contact_or_email: ["",Validators.required],
    });
    this.otpForm = this.formBuilder.group({
      otp: ["", Validators.required]
    });
    this.newPasswordForm = this.formBuilder.group({
      newpass: ["", Validators.required],
      confpass: ["", Validators.required]
    });
    this.isShow = 0;
  }

  ngOnInit() {
  }

  resetPassword() {
    if (this.forgotForm.valid) {
      this.useContactEmail = this.forgotForm.value.contact_or_email;
      this.userService.userForgotPassword(this.forgotForm.value).subscribe(
        res => {
          console.log(res);
          this.isShow = 1;
          this.newOtp = res['result']['otp'];
          this.getResult = res['result'];
          this.toastr.success('Otp Succesfully send to your email & mobile number', '', {
            timeOut: 3000,
          });
        },
        error => {
          this.toastr.error(error.error.message, '', {
            timeOut: 3000,
          });
        }
      )
    } 
    else {
      this.markFormGroupTouched(this.forgotForm)
    }
  }

  matchOtp() {
    if (this.otpForm.valid) {
      this.otp = this.otpForm.value.otp;
      if (this.newOtp == btoa(this.otp)) {
        this.otpVerified = 1;
        this.isShow = 2;
      }
      else {
        this.toastr.error('OTP mismatch', '', {
          timeOut: 3000,
        });
      }
    } 
    else {
      this.markFormGroupTouched(this.forgotForm)
    }
  }

  updatePassword() {
    console.log(this.newPasswordForm.value);
    if (this.newPasswordForm.value.newpass == this.newPasswordForm.value.confpass) {
      //this.data = {};
      this.data.otp_verified = 1;
      this.data.password = this.newPasswordForm.value.newpass;
      this.data.contact_or_email = this.useContactEmail;
      console.log(this.data);
      this.userService.updatePassword(this.data).subscribe(
        res => {
          this.isShow = 0;
          this.router.navigate(['login']);
        },
        error => {
          this.toastr.error(error.error.message, '', {
            timeOut: 3000,
          });


        }
      )
    } else {
      this.toastr.error('New Password and confirm password should be same', '', {
        timeOut: 3000,
      });

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
