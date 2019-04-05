import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import * as Globals from '../../core/globals';
import { ProductService } from '../../core/services/product.service';
import { Chart, ChartType } from 'chart.js';
import { MultiDataSet, Label } from 'ng2-charts';
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
  monthList:any=[];
  @ViewChild('doughnutCanvas') doughnutCanvas;
  doughnutChart: any;
  data: any;
  month:any;
  public doughnutChartLabels: Label[];
  public doughnutChartData: MultiDataSet = [];
  public doughnutChartLabelsMonthly: Label[];
  public doughnutChartDataMonthly: MultiDataSet = [];
  public doughnutChartColors: any[] = [{
    backgroundColor: [
      '#ff9980',
      '#74bff1',
      '#ffdb80',
      '#ff809b',
      '#80ffff']
  }];

  // public doughnutChartLabels: Label[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  // public doughnutChartData: MultiDataSet = [
  //   [350, 450, 100],
  // ];
  public doughnutChartType: ChartType = 'doughnut';
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService,
  ) {
    this.month =null;
    this.monthList = [
      {
        'id': '01',
        'name': 'Jan'
      },
      {
        'id': '02',
        'name': 'Feb'
      },
      {
        'id': '03',
        'name': 'March'
      },
      {
        'id': '04',
        'name': 'Apr'
      },
      {
        'id': '05',
        'name': 'May'
      },
      {
        'id': '06',
        'name': 'Jun'
      },
      {
        'id': '07',
        'name': 'Jul'
      },
      {
        'id': '08',
        'name': 'Aug'
      },
      {
        'id': '09',
        'name': 'Sep'
      },
      {
        'id': '10',
        'name': 'Oct'
      },
      {
        'id': '11',
        'name': 'Nov'
      },
      {
        'id': '12',
        'name': 'Dec'
      }
    ]

  }

  ngOnInit() {
    this.imageBaseUrl = environment.imageBaseUrl;
    this.userId = +localStorage.getItem('userId');
    this.userId = +localStorage.getItem('userId');
    this.getSpendingPattern(this.userId);
  }

  getSpendingPattern(userId) {
    this.productService.getSpendingPattern(userId).subscribe(
      res => {
        console.log("Spending Parretn==>", res);
        this.spendingPattern = res['result'];
        this.visibleKey = true;
        var categoryNames: any = [];
        var categorySpending: any = [];
        this.spendingPattern.forEach(x => {
          categoryNames.push(x.product_category_name);
          categorySpending.push(x.order_details.total_price_val != null ? x.order_details.total_price_val : 0)
        })
        console.log(categoryNames);
        console.log(categorySpending);
        this.doughnutChartLabels = categoryNames;
        this.doughnutChartData = categorySpending;
        this.data = {
          labels: this.doughnutChartLabels,
          datasets: [
            {
              data: this.doughnutChartData,
              height: 260,
              // hoverBackgroundColor: [
              //   "#cc2900",
              //   "#1068a2",
              //   "#ffb700",
              //   "#e60032",
              //   "#00b3b3"
              // ],
              // backgroundColor: [
              //   '#ff9980',
              //   '#74bff1',
              //   '#ffdb80',
              //   '#ff809b',
              //   '#80ffff'
              // ]
            }]

        };
        console.log(this.spendingPattern);
      },
      error => {
      }
    )
  }

  selectMonth(monthid) {
    this.productService.getSpendingPatternMonthWise(this.userId,monthid).subscribe(
      res => {
        console.log("Spending Parretn==>", res);
        this.spendingPattern = res['result'];
        this.visibleKey = true;
        var categoryNames: any = [];
        var categorySpending: any = [];
        this.spendingPattern.forEach(x => {
          categoryNames.push(x.product_category_name);
          categorySpending.push(x.order_details.total_price_val != null ? x.order_details.total_price_val : 0)
        })
        console.log(categoryNames);
        console.log(categorySpending);
        this.doughnutChartLabelsMonthly = categoryNames;
        this.doughnutChartDataMonthly = categorySpending;
        this.data = {
          labels: this.doughnutChartLabels,
          datasets: [
            {
              data: this.doughnutChartData
            }]

        };
        console.log(this.spendingPattern);
      },
      error => {
      }
    )
  }


}
