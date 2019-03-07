import { Injectable, EventEmitter, Output } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CartService {
  @Output() getCartNumberStatus: EventEmitter<any> = new EventEmitter();
  constructor(
    private http: HttpClient
  ) { }

  cartNumberStatus(data): Observable<any> {
    if (data = true) {
      this.getCartNumberStatus.emit(true);
      return
    }
  }

  addOrder(data): Observable<any> {
    return this.http.post(environment.apiEndpoint + 'addorder/', data)
  }
}
