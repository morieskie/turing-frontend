import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  templateUrl: './template/checkout-complete.component.html',
})
export class CheckoutCompleteComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              public router: Router,
              ) {
  }

  ngOnInit() {
  }
}
