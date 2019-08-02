import {Injectable, OnDestroy, OnInit} from '@angular/core';
import {Order} from '../model/order';
import {OrderRepository} from '../repository/order.repository';
import {BehaviorSubject, forkJoin, Subject} from 'rxjs';
import {Observable} from 'rxjs';
import {OrderLocalStorageProvider} from '../provider/order-local-storage.provider';
import {Subscription} from 'rxjs';
import {CartService} from '../../cart/service/cart.service';
import {OrderItem} from "../model/order-item";
import {RestService} from "../../api/Rest.service";
import {CategoryModel} from "../../catalogue/model/category.model";
import {CatalogueItem} from "../../catalogue/model/catalogue-item";

@Injectable()
export class OrderService implements OnDestroy {
  public modelSubscription: Subscription;
  public modelSubject: BehaviorSubject<Order> = new BehaviorSubject<Order>(null);
  public orderDetailSubscription: Subscription;
  public orderDetailSubject: BehaviorSubject<Order> = new BehaviorSubject<Order>(null);
  public model: Order;

  constructor(private repository: OrderRepository,
              public orderStorageProvider: OrderLocalStorageProvider,
              public client: RestService) {
    console.log('OrderService.constructor');
    this.modelSubscription = this.getOrderObservable().subscribe(value => {
      console.log('ORDER:', value);
     // this.model = value;
    });
    this.orderDetailSubscription = this.getOrderDetailObservable().subscribe(value => {
      console.log('ORDER_DETAIL:', value);
    });
    this.getCurrentOrder()
      .then(response => this.model = response)
      .catch(error => {
        const order = new Order();
        this.orderStorageProvider.create(order)
          .then(response => {
            console.log('New order instance:', response);
            this.modelSubject.next(new Order(response));
          });
      });
  }

  public getOrders(refetch = true): Promise<Order[]> {
    return this.repository.collection();
  }

  public refreshOrder(orderId?: string | number) {
    if (orderId) {
      console.log('refreshing order..');
      this.repository.show(orderId)
        .then(response => this.orderStorageProvider
          .update(orderId, response)
          .then(() => console.log('Order has been refreshed on storage to:', response)));
    }
  }

  public getOrderObservable(): Observable<Order> {
    return this.modelSubject.asObservable();
  }

  public getOrderDetailObservable(): Observable<Order> {
    return this.orderDetailSubject.asObservable();
  }

  public getCurrentOrder(): Promise<Order> {
    return this.orderStorageProvider.show('order')
      .then(response => {
        this.setCurrentOrder(new Order(response));
        console.log('Loaded order from storage:', response);
        return response;
      });
  }

  public getOrder(orderId: string): Promise<Order> {
    return this.repository.show(orderId).then(response => {
      if (response != null) {
        this.modelSubject.next(response);
      }
      return response;
    });

  }

  public getOrderDetails(orderId: number): Promise<Order> {
    return new Promise<Order>((resolve, reject) => {
      this.client.get(`orders/${orderId}/detailed`).subscribe(response => {
        resolve(new Order(response));
      });
    });

  }

  public getOrderItems(orderId: number): Promise<OrderItem[]> {
    return new Promise<OrderItem[]>((resolve, reject) => {
      this.client.get(`orders/${orderId}`).subscribe(response => {
        let items = response.map(item => new OrderItem(item));
        const bulk: Observable<CatalogueItem>[] = items.map(item => this.client.get(`products/${item.productId}`));

        forkJoin(bulk).subscribe(result => {
          console.log(result)
          items = items.forEach((item, index) => {
            item.thumbnail = result[index].thumbnail;
          });
        });
        console.log('CONSTRUCTED_ITEMS', items)

        resolve(items);
      }, error => reject(error));
    });

  }

  public create(order: Order): Promise<Order> {
    return this.repository
      .create(order)
      .then((response) => {
        // if (response.orderId) {
        //   this.orderStorageProvider.create(response)
        //     .then(() => console.log('order added to storage'));
        // }
        return response;
      });
  }

  public show(id: string | number): Promise<Order> {
    return this.repository.show(id);
  }

  public update(id: string | number, order: Order): Promise<boolean> {
    return this.repository.update(id, order).then(response => {
      this.refreshOrder(id);
      return response;
    });
  }

  public remove(id: string | number): Promise<boolean> {
    return this.repository.remove(id)
      .then(response => {
        this.modelSubject.next(null);
        this.refreshOrder(id);
        this.orderStorageProvider.remove(id)
          .then(() => console.log('order removed from storage'));
        return response;
      });
  }

  setCurrentOrder(model: Order) {
   // console.log('this:' + model.totalAmount);
    this.orderStorageProvider.create(model).then(result => console.log('UPDATED ORDER:', result));
    this.modelSubject.next(model);
  }

  setOrderDetail(model: Order) {
    console.log('Modal:' + model.totalAmount);
    this.orderDetailSubject.next(model);
  }

  ngOnDestroy(): void {
    this.modelSubscription.unsubscribe();
  }
}
