import {OrderProviderInterface} from '../interface/order-provider.interface';
import {Order} from '../model/order';
import {Injectable} from '@angular/core';
import {LocalStorageProvider} from '../../storage/provider/local-storage-provider.service';

@Injectable()
export class OrderLocalStorageProvider implements OrderProviderInterface {

  public order: Promise<Order>;

  constructor(private storage: LocalStorageProvider) {
  }

  collection(): Promise<Order[]> {
    return undefined;
  }

  /**
   * Create order
   */
  public create(order: Order): Promise<Order> {
    return this.storage.setItem('order', order.toJson());
  }

  /**
   * View order
   */
  public show(id: string | number): Promise<Order> {
    return this.storage.getItem('order');
  }

  /**
   * Update Order
   */
  public update(id: string | number, order: Order): Promise<boolean> {
    return  this.storage.setItem('order', order.toJson());
  }

  /**
   * Delete Order
   */
  public remove(id: string | number): Promise<boolean> {
    return  this.storage.removeItem('order');
  }
}
