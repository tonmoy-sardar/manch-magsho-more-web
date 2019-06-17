import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.scss']
})
export class SuccessComponent implements OnInit {
  orderId:any;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {

    this.orderId = this.route.snapshot.params['id'];
    setTimeout(() => {
      this.router.navigate(['/orderdetails', this.orderId]);

    }, 3000);
  }

  goBack() {
    this.router.navigate(['/category']);
  }

}
