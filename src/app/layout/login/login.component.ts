import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from "../../core/services/user.service";
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private toastr: ToastrService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email_contact: ["", Validators.required],
      password: ["", Validators.required]
    });
  }

  signIn() {
    console.log(this.loginForm.value);
    if (this.loginForm.valid) {
      this.userService.userSignin(this.loginForm.value).subscribe(
        res => {
          console.log("Login Result==>",res);
          localStorage.setItem('isLoggedin', 'true');
          localStorage.setItem('userId', res['result']['id']);
          localStorage.setItem('userName', res['result']['name']);
          localStorage.setItem('userEmail', res['result']['email']);
          localStorage.setItem('userContact', res['result']['contact']);
          localStorage.setItem('userImage', res['result']['profile_image']);
          this.userService.loginStatus(true);
          this.router.navigate(['category']);
          this.toastr.success('Login successfully', '', {
            timeOut: 3000,
          });
        },
        error => {
          this.toastr.error(error.error.message, '', {
            timeOut: 3000,
          });
        }
      )
    } else {
      this.markFormGroupTouched(this.loginForm)
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
