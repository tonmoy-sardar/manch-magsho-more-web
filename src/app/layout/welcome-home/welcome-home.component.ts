import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { flattenStyles } from '@angular/platform-browser/src/dom/dom_renderer';
import { ProductService } from '../../core/services/product.service';
import { environment } from '../../../environments/environment';
@Component({
  selector: 'app-welcome-home',
  templateUrl: './welcome-home.component.html',
  styleUrls: ['./welcome-home.component.scss']
})
export class WelcomeHomeComponent implements OnInit {
  productList:any=[];
  visibleKey:boolean =false;
  userId:any;
  allProductList:any=[];
  imageBaseUrl: any;
  selectedIndex:any;
  start:number;
  end:number;
  disablePrev:boolean =false;
  disableNext:boolean =false;
  lastMonth:any;
  spendingPattern;
  catSpendPriceMonthly:any;
  catSpendSavingPrice:any;
  catSavingPriceMonthly:any;
  totalMonthlySum:any;
  totalMonthlySaving:any;
  totalQuaterSum:any;
  totalQuaterSaving:any;
  isQuaterShow:any;
  catSpendPrice:any;
  constructor(
    public productService:ProductService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.imageBaseUrl = environment.imageBaseUrl;
    this.getProList();
    this.userId = +localStorage.getItem('userId');
    this.dealsProductList(this.userId);
       //alert(new Date().getMonth())
       this.lastMonth =  new Date().getMonth() -1;
      // alert(this.lastMonth);
       this.getLastMonthSpending(this.lastMonth);
       this.getTotalSpending(12);

  }
  getProList() {

    this.productService.getAllProList().subscribe(
      res => {
        this.productList = res['result'];
        this.visibleKey = true;
        console.log("Pro List==>",this.productList);
      },
      error => {
        // console.log(error)
      }
    )
  }

  dealsProductList(user_id) {
    this.productService.getTodayspecialList(user_id).subscribe(
      res => {
        this.start = 0;
        this.end=1;
        this.allProductList = res['result'];
        console.log(this.allProductList);
      },
      error => {
      }
    )
  }

  next() {
   // ++this.selectedIndex;
   // alert(this.selectedIndex);
   if(this.end !=0) {
    ++this.end;
    ++this.start;
    
   }
   if(this.allProductList.length == this.end) {
    this.disableNext =true;
    this.disablePrev =false;
   }
 }

 previous() {
   if(this.start !=0) {
    --this.start;
    --this.end;
    this.disableNext =false;
   }
   else {
     this.disablePrev = true;
     this.disableNext =false;
   }
  
     //--this.selectedIndex;
    // alert(this.selectedIndex);
 }


  gotoDetails(id) {
    this.router.navigate(['product/details', id]);
  }

  gotoCategory() {
    this.router.navigate(['category']);
  }

  getLastMonthSpending(monthid) {
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
        //alert( this.totalMonthlySum );
        //For Monthly Savings 
       const monthlysavings = categorySavingMonthly.reduce((partial_sum, a) => partial_sum + a); 
       this.totalMonthlySaving  = monthlysavings;
       console.log("Yearly Savings==>",this.totalMonthlySaving); 
        // this.doughnutChartLabelsMonthly = categoryNames;
        // this.doughnutChartDataMonthly = categorySpending;
        // this.data = {
        //   labels: this.doughnutChartLabels,
        //   datasets: [
        //     {
        //       data: this.doughnutChartData
        //     }]

        // };
        console.log(this.spendingPattern);
      },
      error => {
      }
    )
  }

  getTotalSpending(id) {
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
        // this.doughnutChartLabelsQuaterly = categoryNames;
        // this.doughnutChartDataQuaterly = categorySpending;
        // this.data = {
        //   labels: this.doughnutChartLabels,
        //   datasets: [
        //     {
        //       data: this.doughnutChartData
        //     }]

        // };
        console.log(this.spendingPattern);
  
      },
      error => {
        this.visibleKey = true;
      }
    )
  }
 

}
