import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import * as Globals from '../../../core/globals';
import { ProductService } from '../../../core/services/product.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  rating;
  avg_rating;
  recipeDetails: any = {};
  imageBaseUrl: any;
  recipeBannerImage: any;
  userId:any;
  recipeId:any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public productService: ProductService
  ) { }

  ngOnInit() {
    this.imageBaseUrl = environment.imageBaseUrl;
    this.rating = [1, 2, 3, 4, 5];
    this.recipeId = this.route.snapshot.params['id'];
    this.getRecipeDetails(this.recipeId);
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
  gotoPage(id) {
    this.router.navigate(['/addrating',id]);
  }


}
