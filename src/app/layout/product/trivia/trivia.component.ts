import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import * as Globals from '../../../core/globals';
import { ProductService } from '../../../core/services/product.service';

@Component({
  selector: 'app-trivia',
  templateUrl: './trivia.component.html',
  styleUrls: ['./trivia.component.scss']
})
export class TriviaComponent implements OnInit {
  triviaDetails:any=[];
  imageBaseUrl:any;
  proDetails:any={};
  userId:any;
  visibleKey: boolean;
  productName;
  productImage;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public productService: ProductService
  ) { }

  ngOnInit() {
    this.imageBaseUrl = environment.imageBaseUrl; 
    this.userId = +localStorage.getItem('userId');
    this.getTriviaDetails(this.route.snapshot.params['id']);
    this.productDetails(this.route.snapshot.params['id']);
  }
  getTriviaDetails(id) {
    this.productService.getriviaDetails(id).subscribe(
      res => {
        console.log("Trivia details==>",res)
        this.productName = res['product_name'];
        this.productImage = res['product_image'];
        this.triviaDetails = res['result'];
        this.visibleKey = true;
      },
      error => {
        this.visibleKey = true;
      }
    )
  }

  productDetails(id) {
    this.productService.getProductDetails(id,this.userId).subscribe(
      res => {
        this.proDetails = res['result']['productlist'];
      },
      error => {
      }
    )
  }

}
