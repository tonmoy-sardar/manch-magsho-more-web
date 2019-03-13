import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
@Component({
  selector: 'app-sidebar-menu',
  templateUrl: './sidebar-menu.component.html',
  styleUrls: ['./sidebar-menu.component.scss']
})
export class SidebarMenuComponent implements OnInit {
  loggedIn:any;
  constructor(
    private router: Router,
  ) { }

  ngOnInit() {
    this.loggedIn = localStorage.getItem('isLoggedin');
  }
  gotoPage(page) {
    this.router.navigate(['/login']);
  }

}
