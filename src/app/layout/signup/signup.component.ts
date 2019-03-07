import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from "../../core/services/user.service";
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private toastr: ToastrService,
    private router: Router,
  ) { 
    this.signupForm = this.formBuilder.group({
      name: ["",Validators.required],
      email: ["",[
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)
      ]],
      contact: ["", [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10)
      ]],
      password: ["", Validators.required]
    });
  }

  ngOnInit() {
  }

  signUp() {
    console.log(this.signupForm.value);
    if (this.signupForm.valid) {
      this.signupForm.value.otp_verified =  '1';
      this.signupForm.value.address =  '1';
      this.userService.userSignup(this.signupForm.value).subscribe(
        res => {
          this.router.navigate(['login']);
          this.toastr.success('Register successfully', '', {
            timeOut: 3000,
          });
        },
        error => {
          // console.log(error)
          this.toastr.error(error.error.message, '', {
            timeOut: 3000,
          });
        }
      )
    } else {
      this.markFormGroupTouched(this.signupForm)
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
