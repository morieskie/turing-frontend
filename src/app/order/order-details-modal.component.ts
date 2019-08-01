import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-order-details-modal',
  templateUrl: './template/order-details-modal.component.html',
  styleUrls: []
})
export class OrderDetailsModalComponent implements OnInit, OnDestroy {

  @Input()
  public order;

  constructor(protected router: Router) {
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }

  onSubmit() {
  }
}
