import {CartProviderInterface} from '../interface/cart-provider.interface';
import {Cart} from '../model/cart';
import {Injectable} from '@angular/core';
import {StorageService} from '../../storage/service/storage.service';
import {CartService} from '../service/cart.service';
import * as moment from 'moment';
import {CartItem} from "../model/cart-item";

@Injectable()
export class CartLocalStorageProvider implements CartProviderInterface {
  public cart: Promise<Cart>;

  // @ts-ignore
  generateUniqueId(): { cart_id: string } {
    return undefined;
  }

  constructor(private storage: StorageService) {
  }

  collection(): Promise<Cart[]> {
    return undefined;
  }

  /**
   * Create cart
   */
  public create(model: Cart): Promise<Cart> {
    this.storage.setItem('cart', model.toJson);

    this.cart = new Promise((resolve, reject) => {
      const data: any = this.storage.getItem('cart');
      const cart: Cart = new Cart(data).toJson();
      resolve(cart);
    });

    return this.cart;
  }

  /**
   * View cart
   */
  public show(id: string | number): Promise<Cart> {

    this.cart = new Promise((resolve, reject) => {
      this.storage.getItem(id.toString())
        .then(data => {
          console.log(data);
          const cart: Cart = new Cart(data);
          cart.items = data.items;
          console.log('show.cart.data', cart);
          resolve(cart);
        })
        .catch(error => reject(error));
    });

    return this.cart;
  }

  /**
   * Update Cart
   */
  public update(id: string | number, cart: Cart): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.storage.setItem('cart', cart.toJson);
      resolve(true);
    });
  }

  /**
   * Delete Cart
   */
  public remove(id: string | number): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.storage.removeItem('cart');
      resolve(true);
    });
  }
}
