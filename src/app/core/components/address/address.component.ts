import { Component, OnInit ,Inject} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../../core/services/user.service';
import { MatDialogRef } from '@angular/material';
@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {
  userId: any;
  addressForm: FormGroup;
  addressData:any;
  addressId:any;
  type:any;
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private dialogRef: MatDialogRef<AddressComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.type='Home';
    console.log("Address Edit Data==>",data);
    this.userId = +localStorage.getItem('userId');
    this.addressData = data.data;
    this.addressId = data.data.id;
    console.log(this.addressId);
    
    this.addressForm = this.formBuilder.group({
      type: ["", Validators.required],
      customer_name: ["", Validators.required],
      address: ["", Validators.required],
      street_no: ["", Validators.required],
      landmark: ["", Validators.required],
      pincode: ["", Validators.required],
    });
    if(this.addressData) {
      this.addressForm.patchValue({
        type: this.addressData.type,
        customer_name: this.addressData.customer_name,
        address: this.addressData.address,
        street_no: this.addressData.street_no,
        landmark: this.addressData.landmark,
        pincode: this.addressData.pincode,
    })
    }
    
   }

  ngOnInit() {
    // this.userId = +localStorage.getItem('userId');
    // this.addressForm = this.formBuilder.group({
    //   type: ["", Validators.required],
    //   address: ["", Validators.required],
    //   landmark: ["", Validators.required],
    //   pincode: ["", Validators.required],
    // });
  }

  updateAddress() {
    if (this.addressForm.valid) {
      this.addressForm.value.customer_id = this.userId;
      // this.addressForm.value.state_id = '';
      this.userService.updateAddress(this.addressForm.value,this.addressId).subscribe(
        res => {
          console.log("After Address update ==>",res);
          this.addressForm.reset();
          this.dialogRef.close();
         // this.getProfileDetails(this.userId);
        //  this.showAddAddressForm = !this.showAddAddressForm;
          //this.buttonClicked = !this.buttonClicked;
          //this.showMyAddress();
        },
        error => {
        }
      )
    } else {
      this.markFormGroupTouched(this.addressForm)
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
