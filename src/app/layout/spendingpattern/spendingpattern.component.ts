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
  quarterly:any=[];

  catSpendPrice:any;
  catSpendPriceMonthly:any;
  catSpendSavingPrice:any;
  totalMonthlySum:any;
  catSavingPriceMonthly:any;
  totalMonthlySaving:any;
  catSpendPriceCurrent:any;
  catSavingPriceCurrent:any;
  totalCurrentSum:any;
  totalCurrentSaving:any;
  selectedQuater:any;
  isQuaterShow:any;
  totalQuaterSum:any;
  totalQuaterSaving:any;
  @ViewChild('doughnutCanvas') doughnutCanvas;
  doughnutChart: any;
  data: any;
  month:any;
  public doughnutChartLabels: Label[];
  public doughnutChartData: MultiDataSet = [];
  public doughnutChartLabelsMonthly: Label[];
  public doughnutChartDataMonthly: MultiDataSet = [];
  public doughnutChartLabelsQuaterly: Label[];
  public doughnutChartDataQuaterly: MultiDataSet = [];
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
    this.quarterly = [
      {
        'id':'3',
        'name':'3 Months'
      },
      {
        'id':'6',
        'name':'6 Months'
      },
      {
        'id':'12',
        'name':'12 Months'
      },
    ];
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
   // this.userId = +localStorage.getItem('userId');
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
        var categorySavingCurrent: any=[];
        this.spendingPattern.forEach(x => {
          // categoryNames.push(x.product_category_name);
          // categorySpending.push(x.order_details.total_price_val != null ? x.order_details.total_price_val : 0)
          categoryNames.push(x.product_category_name);
          //categorySpending.push(x.order_details.total_price_val != null ? x.order_details.total_price_val:0)
          this.catSpendPriceCurrent = parseFloat(x.order_details.total_price_val);
          if(isNaN(this.catSpendPriceCurrent)) {
            this.catSpendPriceCurrent =0;
          }
          categorySpending.push(this.catSpendPriceCurrent);

          // Saving monthly
          this.catSavingPriceCurrent = parseFloat(x.order_details.saving_price_cost_val);
          if(isNaN(this.catSavingPriceCurrent)) {
            this.catSavingPriceCurrent =0;
          }
          categorySavingCurrent.push(this.catSavingPriceCurrent);
        })
        console.log(categoryNames);
        console.log(categorySpending);

        // For Monthly Spending 
        console.log("Current Spending ==>",categorySpending);
        const currrentSum = categorySpending.reduce((partial_sum, a) => partial_sum + a); 
        this.totalCurrentSum  = currrentSum;
        //For Monthly Savings 
        console.log("Current Saving ==>",categorySavingCurrent);
       const currentsavings = categorySavingCurrent.reduce((partial_sum, a) => partial_sum + a); 
       this.totalCurrentSaving  = currentsavings;
       console.log("Current Savings==>",this.totalMonthlySaving); 


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
        var categorySavingMonthly :any =[];
        this.spendingPattern.forEach(x => {
          categoryNames.push(x.product_category_name);
          // categorySpending.push(x.order_details.total_price_val != null ? x.order_details.total_price_val : 0)
          this.catSpendPriceMonthly = parseFloat(x.order_details.total_price_val);
          if(isNaN(this.catSpendPriceMonthly)) {
            this.catSpendPriceMonthly =0;
          }
          categorySpending.push(this.catSpendPriceMonthly);

          // Saving monthly
          this.catSavingPriceMonthly = parseFloat(x.order_details.saving_price_cost_val);
          if(isNaN(this.catSavingPriceMonthly)) {
            this.catSavingPriceMonthly =0;
          }
          categorySavingMonthly.push(this.catSavingPriceMonthly);
        })
        console.log(categoryNames);
        console.log(categorySpending);
        console.log("Spending month wise ==>",categorySpending);
        // For Monthly Spending 
        console.log("Quater Spending ==>",categorySpending);
        const monthlySum = categorySpending.reduce((partial_sum, a) => partial_sum + a); 
        this.totalMonthlySum  = monthlySum;
        //For Monthly Savings 
       const monthlysavings = categorySavingMonthly.reduce((partial_sum, a) => partial_sum + a); 
       this.totalMonthlySaving  = monthlysavings;
       console.log("Monthly Savings==>",this.totalMonthlySaving); 
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

  selectQuater(id) {
    console.log("Select Quater",id)
   // console.log("Select Quater id",data.id)
   // this.selectedQuater = data.name;
    this.productService.getSpendingPatternQuater(this.userId,id).subscribe(
      res => {
        this.isQuaterShow =1;
        this.spendingPattern = res['result'];  
        console.log("Quaterly==>",this.spendingPattern);
        this.visibleKey = true;
        var categoryNames: any = [];
        var categorySpending: any = [];
        var categorySpendingSaving: any= [];
        this.totalQuaterSum =0;
        this.spendingPattern.forEach(x => {
          categoryNames.push(x.product_category_name);
          // For QUater spending amount
          this.catSpendPrice = parseFloat(x.order_details.total_price_val);
          if(isNaN(this.catSpendPrice)) {
            this.catSpendPrice =0;
          }
          categorySpending.push(this.catSpendPrice);
          //Quater savings amount
          this.catSpendSavingPrice = parseFloat(x.order_details.saving_price_cost_val);
          if(isNaN(this.catSpendSavingPrice)) {
            this.catSpendSavingPrice =0;
          }
          categorySpendingSaving.push(this.catSpendSavingPrice);
        })
        // For Quater Spending 
        console.log("Quater Spending ==>",categorySpending);
        const sum = categorySpending.reduce((partial_sum, a) => partial_sum + a); 
        this.totalQuaterSum  = sum;
        //For Quater Savings 
        const savings = categorySpendingSaving.reduce((partial_sum, a) => partial_sum + a); 
        this.totalQuaterSaving  = savings;
        console.log("Final Savings==>",this.totalQuaterSaving); 
        this.doughnutChartLabelsQuaterly = categoryNames;
        this.doughnutChartDataQuaterly = categorySpending;
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
        this.visibleKey = true;
      }
    )
  }

  gotoBarChart(id) {
    
  }


}
