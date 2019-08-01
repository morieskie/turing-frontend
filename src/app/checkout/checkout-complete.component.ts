import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  templateUrl: './template/checkout-complete.component.html',
})
export class CheckoutCompleteComponent implements OnInit {

  constructor(public router: Router) {
  }

  ngOnInit() {
  }
}
