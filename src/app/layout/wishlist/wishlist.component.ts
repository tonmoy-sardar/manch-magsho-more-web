import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import * as Globals from '../../core/globals';
import { ProductService } from '../../core/services/product.service';
@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit {
  allProductList: any = [];
  userId: number;
  whisListProduct: any = [];
  imageBaseUrl: any;
  catName:any;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService,
  ) { }

  ngOnInit() {
    this.imageBaseUrl = environment.imageBaseUrl;
    this.userId = +localStorage.getItem('userId');
    this.getWishList(this.userId);
  }

  getWishList(id) {
    console.log(id);
    this.productService.myWishlist(id).subscribe(
      res => {
        this.whisListProduct = res['result'];
        console.log(this.whisListProduct);
      },
      error => {
      }
    )
  }

  deleteWishList(id) {
    let data = {
      "product_id": id,
      "whist_status": "0",
      "user_id": this.userId
    }
    this.productService.addWishlist(data).subscribe(
      res => {
        this.getWishList(this.userId);
      },
      error => {

      }
    )
  }

  gotoDetails(id) {
    //this.navCtrl.push('ProductdetailsPage', { id: id });
  }

}
