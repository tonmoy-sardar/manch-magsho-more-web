import { Injectable, EventEmitter, Output } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  @Output() getLoggedInStatus: EventEmitter<any> = new EventEmitter();
  @Output() getProfileUpdateStatus: EventEmitter<any> = new EventEmitter();
  constructor(
    private http: HttpClient
  ) { }

  loginStatus(data): Observable<any> {
    if (data = true) {
      this.getLoggedInStatus.emit(true);
      return
    }
  }

  userSignin(data): Observable<any> {
    return this.http.post(environment.apiEndpoint + 'userlogin/', data)
  }
  
  userSignup(data): Observable<any> {
    return this.http.post(environment.apiEndpoint + 'userregister/', data)
  }
  userForgotPassword(data): Observable<any> {
    return this.http.post(environment.apiEndpoint + 'userforgetpasswordotp/', data)
  }
  updatePassword(data): Observable<any> {
    return this.http.post(environment.apiEndpoint + 'userforgetpasswordupdate/', data)
  }

  addressList(id): Observable<any> {
    return this.http.get(environment.apiEndpoint + 'cusaddlistbycusid/' + id + '/')
  }
  
  getPinCode(pincode): Observable<any> {
    return this.http.get(environment.apiEndpoint + 'deliverslotbypincode/' + pincode + '/')
  }
  submitAddress(data): Observable<any> {
    return this.http.post(environment.apiEndpoint + 'addcustomeraddress/', data)
  }
  deleteMyAddress(id): Observable<any> {
    return this.http.get(environment.apiEndpoint + 'deletecustomeraddress/' +id)
  }

  myAddressDetails(id): Observable<any> {
    return this.http.get(environment.apiEndpoint + 'listcustomeraddressbyid/' +id)
  }
  getProfile(id): Observable<any> {
    return this.http.get(environment.apiEndpoint + 'userprofile/' + id + '/')
  }
  updateUserProfile(id, data): Observable<any> {
    return this.http.post(environment.apiEndpoint + 'userprofileupdate/' + id, data)
  }

  // updatemyProfileImage(id, data): Observable<any> {
  //   return this.http.post(environment.apiEndpoint + 'userprofileupdate/' + id, data)
  // }

  updatemyProfileImage(id,profileImage): Observable<any> {
    const formData: FormData = new FormData();
      if(profileImage) { 
        formData.append('profile_image', profileImage, profileImage.name);
      }
      console.log(formData);
    return this.http.post(environment.apiEndpoint + 'userprofileimageupdate/'+id, formData)
   }


  updateProfileStatus(data): Observable<any> {
    if (data = true) {
      this.getProfileUpdateStatus.emit(true);
      return
    }
  }

  updateAddress(data,id): Observable<any> {
    return this.http.post(environment.apiEndpoint + 'updateCustomerAddressById/' + id, data)
  }

}
