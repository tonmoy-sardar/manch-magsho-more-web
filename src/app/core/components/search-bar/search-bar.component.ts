import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {
  searchText:any;
  constructor(
    public router:Router
  ) { }

  ngOnInit() {
  }
  proSearch(name) {
    this.router.navigate(['/search',name]);
  }


}
