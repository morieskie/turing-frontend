import {Injectable} from '@angular/core';
import {CartItemProviderInterface} from '../interface/cart-item-provider.interface';
import {CartItem} from '../model/cart-item';
import {RestService} from '../../api/Rest.service';

@Injectable()
export class CartItemApiProvider implements CartItemProviderInterface {

  public endpoint = 'shoppingcart';

  constructor(private client: RestService) {
  }

  collection(): Promise<CartItem[]> {
    return undefined;
  }

  /**
   */
  public create(cartItem: CartItem): Promise<CartItem[]> {
    return new Promise((resolve, reject) => {
      this.client
        .create(`${this.endpoint}/add`, cartItem.toSnakeCase())
        .subscribe(response => {
          const items: CartItem[] = response.map(item => new CartItem(item));
          resolve(items);
        }, error => reject(error));
    });
  }

  /**
   */
  public show(id: string | number): Promise<CartItem> {
    return undefined;
  }

  /**
   * Update CartItem
   */
  public update(id: string | number, cartItem: CartItem): Promise<any> {
    return new Promise((resolve, reject) => {
      this.client
        .update(`${this.endpoint}/update/${id}`, cartItem.toSnakeCase())
        .subscribe(response => {
          const data: { quantity: number } = response;
          resolve(data);
        }, error => reject(error));
    });
  }

  /**
   * Delete Cart Item
   */
  public remove(id: string | number): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.client
        .delete(`${this.endpoint}/removeProduct/${id}`)
        .subscribe(response => {
          let result = false;
          if (response) {
            result = true;
          }
          resolve(result);
        }, error => reject(error), () => resolve(true));
    });
  }
}
