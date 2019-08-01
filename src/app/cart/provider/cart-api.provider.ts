import {CartProviderInterface} from '../interface/cart-provider.interface';
import {Cart} from '../model/cart';
import {Injectable} from '@angular/core';
import {RestService} from '../../api/Rest.service';

@Injectable()
export class CartApiProvider implements CartProviderInterface {

  public endpoint = 'shoppingcart';
  public cart: Promise<Cart>;

  constructor(private client: RestService) {
  }

  collection(): Promise<Cart[]> {
    return undefined;
  }

  public create(cart: Cart): Promise<Cart> {
    this.cart = new Promise((resolve, reject) => {
      this.client
        .create(`${this.endpoint}`, cart)
        .subscribe(response => {
          const data: Cart = response.body.data;
          resolve(data);
        }, error => reject(error));
    });
    return this.cart;
  }

  /**
   * Update Cart
   */
  public update(id: string | number, cart: Cart): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.client
        .update(`${this.endpoint}/${id}`, cart)
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
   * View cart
   */
  public show(id: string | number): Promise<Cart> {
    this.cart = new Promise((resolve, reject) => {
      this.client
        .get(`${this.endpoint}/${id}`)
        .subscribe(response => {
          const data: Cart = response.body.data;
          resolve(data);
        }, error => reject(error));
    });
    return this.cart;
  }

  /**
   * Delete Cart
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

  generateUniqueId(): Promise<{ cart_id: string }> {
    return new Promise((resolve, reject) => {
      this.client
        .get(`${this.endpoint}/generateUniqueId`)
        .subscribe(response => {
          const data: { cart_id: string } = response;
          resolve(data);
        });
    });
  }
}
