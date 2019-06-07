import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import * as Globals from '../../core/globals';
import { ProductService } from '../../core/services/product.service';
import { Chart, ChartType } from 'chart.js';
import { MultiDataSet, Label } from 'ng2-charts';
@Component({
  selector: 'app-spendingpatternbar',
  templateUrl: './spendingpatternbar.component.html',
  styleUrls: ['./spendingpatternbar.component.scss']
})
export class SpendingpatternbarComponent implements OnInit {
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
  @ViewChild('lineCanvas') lineCanvas;
  @ViewChild('barCanvas') barCanvas;
  doughnutChart: any;
  data: any;
  month:any;
  spendingData:any;
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
  public doughnutChartType: ChartType = 'bar';
  getSpendingDetails:any;
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
    console.log("Spending Data==>",JSON.parse(localStorage.getItem('spendingData')));
  this.spendingData = JSON.parse(localStorage.getItem('spendingData'));
  this.getnewBarChart(this.spendingData);
  }

  ngOnInit() {
    this.imageBaseUrl = environment.imageBaseUrl;
    this.userId = +localStorage.getItem('userId');
   // this.userId = +localStorage.getItem('userId');
    this.getSpendingPattern(this.userId);
    //console.log("kkkkkkkkkkk123",this.route.snapshot.params['data'])
    this.route.queryParams.subscribe(params => {
      // this.firstname = params["firstname"];
      // this.lastname = params["lastname"];
      console.log("cccc==>",params);
  });
  }

  getChart(context, chartType, data, options?) {
    return new Chart(context, {
      data,
      options,
      type: chartType,
    });
    
  }

  getBarChart() {

    // this.getSpendingDetails =this.navParams.get('data');
    // console.log("Spending details==>",this.getSpendingDetails);
    // var categoryNames: any = [];
    // var categorySpending: any = [];
    // this.getSpendingDetails.forEach(x => {
    //   categoryNames.push(x.product_category_name);
    //   categorySpending.push(x.order_details.total_price_val != null ? x.order_details.total_price_val:0)

    // })
    


    // const data = {
    //   labels: categoryNames,
    //   datasets: [{
    //     label: '',
    //     data: categorySpending,
    //     backgroundColor: [
    //       'rgba(255, 99, 132, 0.2)',
    //       'rgba(54, 162, 235, 0.2)',
    //       'rgba(255, 206, 86, 0.2)',
    //       'rgba(75, 192, 192, 0.2)',
    //       'rgba(153, 102, 255, 0.2)',
    //       'rgba(255, 159, 64, 0.2)'
    //     ],
    //     borderColor: [
    //       'rgba(255,99,132,1)',
    //       'rgba(54, 162, 235, 1)',
    //       'rgba(255, 206, 86, 1)',
    //       'rgba(75, 192, 192, 1)',
    //       'rgba(153, 102, 255, 1)',
    //       'rgba(255, 159, 64, 1)'
    //     ],
    //     borderWidth: 1
    //   }]
    // };

    // const options = {
    //   scales: {
    //     yAxes: [{
    //       ticks: {
    //         beginAtZero: true
    //       }
    //     }]
    //   }
    // };

    // return this.getChart(this.barCanvas.nativeElement, 'bar', data, options);
  }


  getSpendingPattern(userId) {
    this.productService.getSpendingPattern(userId).subscribe(
      res => {
        console.log("Spending Parretn==>", res);
        this.spendingPattern = res['result'];

        console.log("Kalyan 123==>",this.spendingPattern);
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
            }]

        };
        console.log(this.spendingPattern);
      },
      error => {
      }
    )
  }

 
 

  getnewBarChart(spendData) {



   // this.spendingPattern = res['result'];
    this.spendingPattern = spendData;
    console.log("Kalyan 234==>",this.spendingPattern);
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
        }]

    };
    // options: {
    //   legend: {
    //     display: false
    //   }
    // };
    console.log(this.spendingPattern);


  }


}
