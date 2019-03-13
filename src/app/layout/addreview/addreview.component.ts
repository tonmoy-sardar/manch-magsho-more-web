import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import * as Globals from '../../core/globals';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { ProductService } from '../../core/services/product.service';

@Component({
  selector: 'app-addreview',
  templateUrl: './addreview.component.html',
  styleUrls: ['./addreview.component.scss']
})
export class AddreviewComponent implements OnInit {
  userId:any;
  recipeId:any;
  imageBaseUrl:any;
  recipeDetails: any =[];
  recipeBannerImage:any;
  reviewForm: FormGroup;
  newRating:any;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private productService: ProductService,
  ) { 
    this.reviewForm = this.formBuilder.group({
      review: ["", Validators.required],
    });
  }

  ngOnInit() {
    this.imageBaseUrl = environment.imageBaseUrl;
    this.userId = +localStorage.getItem('userId');
    this.recipeId = this.route.snapshot.params['id'];
    this.newRating = localStorage.getItem('rating')
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

  addReview() {
    if (this.reviewForm.valid) {
     var data = {
        "post_id": this.recipeId,
        "user_id": this.userId,
        "rating": this.newRating ,
        "comment_parent":"0",
        "title":this.reviewForm.value.review
      }
      console.log(data);
      this.productService.addReview(data).subscribe(
        res => {
          this.getRecipeDetails(this.recipeId);
          this.toastr.success('Review successfully Submitted', '', {
            timeOut: 3000,
          });
        },
        error => {
          this.toastr.success('Error Occured', '', {
            timeOut: 3000,
          });
        }
      )
    }
    else {
      this.markFormGroupTouched(this.reviewForm)
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
