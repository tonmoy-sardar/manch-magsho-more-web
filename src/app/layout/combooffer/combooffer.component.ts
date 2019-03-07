import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import * as Globals from '../../core/globals';
import { ProductService } from '../../core/services/product.service';
@Component({
  selector: 'app-combooffer',
  templateUrl: './combooffer.component.html',
  styleUrls: ['./combooffer.component.scss']
})
export class ComboofferComponent implements OnInit {
  allProductList: any = [];
  imageBaseUrl: any;
  userId: number;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService,
  ) { }

  ngOnInit() {
    this.imageBaseUrl = environment.imageBaseUrl;
    this.userId = +localStorage.getItem('userId');
    this.productList(this.userId);
  }
  productList(user_id) {
    this.productService.getCombooffertList(user_id).subscribe(
      res => {
        this.allProductList = res['result'];
        console.log(this.allProductList);
      },
      error => {
      }
    )
  }

}
