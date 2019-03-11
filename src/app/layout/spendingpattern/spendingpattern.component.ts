import { Component, OnInit,ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import * as Globals from '../../core/globals';
import { ProductService } from '../../core/services/product.service';
import { Chart } from 'chart.js';
@Component({
  selector: 'app-spendingpattern',
  templateUrl: './spendingpattern.component.html',
  styleUrls: ['./spendingpattern.component.scss']
})
export class SpendingpatternComponent implements OnInit {
  userId: number;
  whisListProduct: any = [];
  imageBaseUrl: any;
  visibleKey: boolean;
  spendingPattern;
  @ViewChild('doughnutCanvas') doughnutCanvas;
  doughnutChart:any;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService,
  ) { }

  ngOnInit() {
    this.imageBaseUrl = environment.imageBaseUrl;
    this.userId = +localStorage.getItem('userId');
    this.userId = +localStorage.getItem('userId');
    this. getSpendingPattern(this.userId);
  }

  getSpendingPattern(userId)
  {
    this.productService.getSpendingPattern(userId).subscribe(
      res => {
        console.log("Spending Parretn==>",res);
        this.spendingPattern = res['result'];
        this.visibleKey = true;
        var categoryNames: any = [];
        var categorySpending: any = [];
        this.spendingPattern.forEach(x => {
          categoryNames.push(x.product_category_name);
          categorySpending.push(x.order_details.total_price_val != null ? x.order_details.total_price_val:0)
        })

      //   this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
      //     type: 'doughnut',
      //     data: {
      //         labels: categoryNames,
             
      //         datasets: [{
      //           label: '# of Votes',
      //           data: categorySpending,
      //           backgroundColor: [
      //               '#ff9980',
      //               '#74bff1',
      //               '#ffdb80',
      //               '#ff809b',
      //               '#80ffff'
      //           ],
      //           hoverBackgroundColor: [
      //               "#cc2900",
      //               "#1068a2",
      //               "#ffb700",
      //               "#e60032",
      //               "#00b3b3"
      //           ]
      //       }]
      //     }
    
      // });

        console.log(this.spendingPattern);
      },
      error => {
      }
    )
  }
  

}
