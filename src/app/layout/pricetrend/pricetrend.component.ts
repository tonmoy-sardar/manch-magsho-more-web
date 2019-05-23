import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import * as Globals from '../../core/globals';
import { ProductService } from '../../core/services/product.service';
import { Chart, ChartType } from 'chart.js';
import { MultiDataSet, Label } from 'ng2-charts';

@Component({
  selector: 'app-pricetrend',
  templateUrl: './pricetrend.component.html',
  styleUrls: ['./pricetrend.component.scss']
})
export class PricetrendComponent implements OnInit {
  data:any;
  dataGraph:any;
  userId: number;
  whisListProduct: any = [];
  imageBaseUrl: any;
  visibleKey: boolean;
  searchText: string;
  monthList: any = [];
  spendingPattern;
  @ViewChild('barCanvas') barCanvas;
  doughnutChart: any;
  doughnutChartMonth: any;
  isMonthShow: number;
  trendDetails:any ={};
  priceStatus:any;
  priceTrend:any;
  public barChartType: ChartType = 'bar';
  public barChartLabels: Label[];
  public barChartData: MultiDataSet = [];

  public barChartColors: any[] = [{
    backgroundColor: [
      '#ff9980',
      '#74bff1',
      '#ffdb80',
      '#ff809b',
      '#80ffff']
  }];
  finalChartDetails:any;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService,
  ) { }

  ngOnInit() {
    //alert(this.route.snapshot.params['id']);
    this.getPriceTrendChart(this.route.snapshot.params['id']);
    this.priceTrendDetails(this.route.snapshot.params['id']);
  }

  getChart(context, chartType, data, options?) {
    return new Chart(context, {
      data,
      options,
      type: chartType,
    });
  }

  // getBarChart() {
  //   const data = {
  //     datasets: [{
  //       label: 'Bar Dataset',
  //       data: [10, 20, 70, 40],
  //       backgroundColor: [
  //         'rgba(255, 99, 132, 0.2)',
  //         'rgba(54, 162, 235, 0.2)',
  //         'rgba(255, 206, 86, 0.2)',
  //         'rgba(75, 192, 192, 0.2)',
  //       ],
  //       borderColor: [
  //         'rgba(255,99,132,1)',
  //         'rgba(54, 162, 235, 1)',
  //         'rgba(255, 206, 86, 1)',
  //         'rgba(75, 192, 192, 1)',
  //       ],
  //     }, {
  //       label: 'Line Dataset',
  //       data: [10, 20, 70, 40],
  //       borderColor: 'rgba(75,192,192,1)',
  //       fill: false,
  //       // Changes this dataset to become a line
  //       type: 'line'
  //     }],


  //     labels: ['January', 'February', 'March', 'April'],
  //   };
  //   const options = {
  //     scales: {
  //       yAxes: [{
  //         ticks: {
  //           beginAtZero: true
  //         }
  //       }]
  //     }
  //   };

  //   return this.getChart(this.barCanvas.nativeElement, 'bar', data, options);
  // }


  getPriceTrendChart(id){ 
    this.productService.getProductSpendAllMonth(id).subscribe(
      res => {
        this.priceTrend = res['result'];  
        console.log("priceTrend==>",this.priceTrend);
        this.visibleKey = true;
        var monthNames = Object.keys(this.priceTrend);
        console.log("Month Name",monthNames);
        var monthsSpending = Object.keys(this.priceTrend).map(key => this.priceTrend[key]);
        //const commaJoinedValues = values.join(",");
        console.log("Hello==>",monthsSpending);
        this.barChartLabels = monthNames;
        this.barChartData = monthsSpending;
      //  setTimeout( () => { 
          this.data = {
            datasets: [{
              label: 'Bar Dataset',
              data: this.barChartData,             
            }, {
              label: 'Line Dataset',
              data: this.barChartData,
             borderColor: 'rgba(75,192,192,1)',
              fill: false,
              // Changes this dataset to become a line
              type: 'line'
            }],
      
      
            labels: this.barChartLabels,
          };
         this.finalChartDetails = this.data;
         console.log("kkk==>",this.data);
          
          const options = {
            scales: {
              yAxes: [{
                ticks: {
                  beginAtZero: true
                }
              }]
            }
          };
      
          //return this.getChart(this.barCanvas.nativeElement, 'bar', data, options);
      // }, 3000 );

    
  
      },
      error => {
        this.visibleKey = true;
    
      }
    )
  }

  priceTrendDetails(id) {
    this.productService.getPriceTrendDetails(id).subscribe(
      res => {
        console.log("Price Trend==>",res);
        this.trendDetails = res['result'];
       if(this.trendDetails.todays_price > this.trendDetails.last_day_price) {
        this.priceStatus =1;
       }
       else if(this.trendDetails.todays_price < this.trendDetails.last_day_price) {
        this.priceStatus =2;
       }
       else {
        this.priceStatus =3;
       }

        this.visibleKey = true;
      },
      error => {
        this.visibleKey = true;
      }
    )
  }


}
