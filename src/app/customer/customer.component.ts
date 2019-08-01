import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Customer} from './model/customer';
import {Router} from '@angular/router';
import {BehaviorSubject, Subscription} from 'rxjs';
import {StorageService} from '../storage/service/storage.service';
import {CustomerService} from './service/customer.service';
import {OrderService} from '../order/service/order.service';

@Component({
  templateUrl: './template/customer.component.html',
  styleUrls: []
})
export class CustomerComponent implements OnInit, OnDestroy {

  public model: Customer = new Customer();
  public customerName: string;
  public modelSubject: BehaviorSubject<Customer> = new BehaviorSubject<Customer>(new Customer());
  public ordersCount = 0;

  constructor(
    public orderService: OrderService,
    public storageService: StorageService,
    public router: Router,
    public customerService: CustomerService) {

    this.storageService.getItem('currentUser')
      .then(item => {
        this.model = new Customer(item);
        this.customerName = this.model.name;
      });

    this.customerService.getCustomerObservable().subscribe(next => {
      this.customerName = next.name;
      this.modelSubject.next(new Customer(next));
    }, error => console.log(error.message));

    this.orderService.getOrders()
      .then(next => this.ordersCount = Array.isArray(next) ? next.length : 0);
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }

  onSubmit() {
  }
}

