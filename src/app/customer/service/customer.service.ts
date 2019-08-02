import {Injectable, OnDestroy} from '@angular/core';
import {CustomerRepository} from '../repository/customer.repository';
import {Customer} from '../model/customer';

import {Observable, BehaviorSubject} from 'rxjs';
import {Order} from "../../order/model/order";

@Injectable()
export class CustomerService implements OnDestroy{
  public redirectUrl: string;
  public model: Customer;
  public modelSubject: BehaviorSubject<Customer> = new BehaviorSubject<Customer>( new Customer());
  public orderSubject: BehaviorSubject<Order> = new BehaviorSubject<Order>( new Order());
  public models: Customer[];


  constructor(private repository: CustomerRepository) {
    console.log('CustomerService.constructor');
    this.orderSubject.asObservable().subscribe(next => console.log('DIALOG_NEXT', next));
    this.refreshCustomer();
  }

  public getCustomerObservable(): Observable<Customer> {
    return this.modelSubject.asObservable();
  }

  public getOrderViewObservable(): Observable<Order> {
    return this.orderSubject.asObservable();
  }

  public refreshCustomer() {
    const customerId: string = localStorage.getItem('customerId');
    this.model = new Customer();
    if (customerId) {
      this.repository.show(customerId)
        .then(response => {
          if (response) {
            this.modelSubject.next(response);
            this.model = response;
          }
        })
        .catch(error => console.log(error));
    }
  }

  public setCurrentCustomer(value: Customer) {
    this.model = value;
    this.modelSubject.next(value);
  }

  public setOrderView(value: Order) {
    this.orderSubject.next(value);
  }

  public get collection() {
    this.repository
      .collection
      .then(models => this.models = models)
      .catch(error => console.log(error));
    return this.models;
  }

  public create(model: Customer): Promise<Customer> {
    return this.repository.create(model);
  }

  public show(id: string | number): Promise<Customer> {
    return this.repository
      .show(id);
  }

  public update(id: string | number, model: Customer): Promise<Customer> {
    return this.repository.update(id, model);
  }

  public remove(id: string | number): Promise<boolean> {
    return this.repository.remove(id);
  }

  ngOnDestroy(): void {
    this.modelSubject.unsubscribe();
  }
}
