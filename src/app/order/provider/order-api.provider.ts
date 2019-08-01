import {OrderProviderInterface} from '../interface/order-provider.interface';
import {Order} from '../model/order';
import {Inject, Injectable} from '@angular/core';
import {RestService} from '../../api/Rest.service';

@Injectable()
export class OrderApiProvider implements OrderProviderInterface {

  public endpoint = 'orders';
  public model: Promise<Order> = Promise.resolve<Order>(null);

  constructor(private client: RestService) {
  }

  collection(): Promise<Order[]> {
    return new Promise<Order[]>((resolve, reject) => {
          this.client.get(`${this.endpoint}/inCustomer`)
            .subscribe(results => resolve(results.map(item => new Order(item))));
    });
  }

  public create(order: Order): Promise<Order> {
    this.model = new Promise((resolve, reject) => {
      this.client
        .create(`${this.endpoint}`, order)
        .subscribe(response => {
          const data: Order = new Order(response);
          resolve(data);
        }, error => reject(error));
    });

    return this.model;
  }

  /**
   * Update Order
   * @param {string | number} id
   * @param {Order} order
   * @returns {Promise<boolean>}
   */
  public update(id: string | number, order: Order): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.client
        .update(`${this.endpoint}/${id}`, order.toJson)
        .subscribe(response => {
          let result = false;
          if (response) {
            result = true;
          }
          resolve(result);
        }, error => reject(error));
    });
  }

  /**
   * View order
   * @param {string | number} id
   * @returns {Promise<Order>}
   */
  public show(id: string | number): Promise<Order> {
    this.model = new Promise((resolve, reject) => {
      this.client
        .get(`${this.endpoint}/${id}?include=items`)
        .subscribe(response => {
          const data: Order = Order.transformResponse(response.data);
          resolve(data);
        }, error => reject(error));
    });

    return this.model;
  }

  /**
   * Delete Order
   * @param {string | number} id
   * @returns {Promise<boolean>}
   */
  public remove(id: string | number): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.client
        .delete(`${this.endpoint}/${id}`)
        .subscribe(response => {
          let result = false;
          if (response) {
            result = true;
          }
          resolve(result);
        }, error => reject(error));
    });
  }
}
