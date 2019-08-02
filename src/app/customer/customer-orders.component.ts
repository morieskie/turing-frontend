import {AfterViewInit, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Customer} from './model/customer';
import {CustomerService} from './service/customer.service';
import {Router} from '@angular/router';
import {OrderService} from '../order/service/order.service';
import {Order} from '../order/model/order';
import {ThrobberService} from '../throbber/throbber.service';

@Component({
  templateUrl: './template/customer-orders.component.html',
  styleUrls: []
})
export class CustomerOrdersComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input()
  public model: Customer;
  public orders: Order[];

  constructor(protected service: CustomerService, private orderService: OrderService, protected router: Router,
              public throbberService: ThrobberService) {
    this.orderService.getOrders().then(items => {
      this.orders = items.map<Order>(item => new Order(item));
    });
  }

  ngOnInit(): void {
    console.log('CustomerComponent.ngOnInit:', this.model);

  }

  ngAfterViewInit(): void {
  }

  ngOnDestroy(): void {
  }

  onOrderView(item: Order) {
    // @ts-ignore
    $('#orderDetails').modal('hide');
    this.throbberService.activate();

    this.orderService.getOrderDetails(item.orderId).then(response => {
      this.service.orderSubject.next(response);
      setTimeout(() => {
        this.throbberService.deActivate();

        // @ts-ignore
        $('#orderDetails').modal('show');
        console.log(response);
      }, 350);
    }).catch(() => this.throbberService.deActivate());
  }
}
