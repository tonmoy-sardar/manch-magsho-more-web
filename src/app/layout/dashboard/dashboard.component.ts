import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  searchText:any;
  constructor(
    public router:Router
  ) { }

  ngOnInit() {
    this.searchText ='';
  }

  gotoPage(page) {
    this.router.navigate([page]);
  }
  proSearch(name) {
    this.router.navigate(['/search',name]);
  }

}
