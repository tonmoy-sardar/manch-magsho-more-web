import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import * as Globals from '../../core/globals';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from '../../core/services/product.service';

@Component({
  selector: 'app-addrating',
  templateUrl: './addrating.component.html',
  styleUrls: ['./addrating.component.scss']
})
export class AddratingComponent implements OnInit {
  starList: boolean[] = [true,true,true,true,true];       // create a list which contains 
  rating:any;
  rate;
  userId:any;
  recipeId:any;
  imageBaseUrl:any;
  recipeDetails: any =[];
  recipeBannerImage:any;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private productService: ProductService,
  ) { }

  ngOnInit() {
    this.imageBaseUrl = environment.imageBaseUrl;
    this.userId = +localStorage.getItem('userId');
    this.recipeId = this.route.snapshot.params['id'];

    this.getRecipeDetails(this.recipeId);
  }

  setStar(ratingdata: any) {
    this.rating = ratingdata + 1;
    for (var i = 0; i <= 4; i++) {
      if (i <= ratingdata) {
        this.starList[i] = false;
      }
      else {
        this.starList[i] = true;
      }
    }

    localStorage.setItem('rating', this.rating);
    
  } 
  addRating() {
    var data = {
      "recipe_id": this.recipeId,
      "user_id": this.userId,
      "rating": this.rating
    }
    console.log(data);
    this.productService.addRating(data).subscribe(
      res => {
        console.log(res);
        this.getRecipeDetails(this.recipeId);
        this.toastr.success('Rating successfully Submitted', '', {
          timeOut: 3000,
        });
       // this.gotoPage(this.navParams.get('id'));
      },
      error => {
        this.toastr.success('Error Occured', '', {
          timeOut: 3000,
        });
      }
    )
  } 
  getRecipeDetails(id) {
    this.productService.getrecipeDetails(id).subscribe(
      res => {
        console.log(res);
        this.recipeDetails = res['result'];
        this.recipeBannerImage = this.imageBaseUrl + this.recipeDetails.blog_large_image;
      },
      error => {
      }
    )
  }

  gotoReview() {
    this.router.navigate(['/addreview',this.recipeId]);
  }

}
