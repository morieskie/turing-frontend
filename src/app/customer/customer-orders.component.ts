import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Customer} from './model/customer';
import {CustomerService} from './service/customer.service';
import {Router} from '@angular/router';
import {OrderService} from '../order/service/order.service';
import {Order} from '../order/model/order';

@Component({
  templateUrl: './template/customer-orders.component.html',
  styleUrls: []
})
export class CustomerOrdersComponent implements OnInit, OnDestroy {

  @Input()
  public model: Customer;
  public orders: Order[];

  constructor(protected service: CustomerService, private orderService: OrderService, protected router: Router) {
    this.orderService.getOrders().then(items => {
      this.orders = items.map<Order>(item => new Order(item).toJson());
    });
  }

  ngOnInit(): void {
    console.log('CustomerComponent.ngOnInit:', this.model);
  }

  ngOnDestroy(): void {
  }

  onSubmit() {
  }
}
