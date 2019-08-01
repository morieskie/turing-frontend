import {Injectable} from '@angular/core';
import {CartItemProviderInterface} from '../interface/cart-item-provider.interface';
import {CartItem} from '../model/cart-item';
import {StorageService} from '../../storage/service/storage.service';

@Injectable()
export class CartItemLocalStorageProvider implements CartItemProviderInterface {

  public model: Promise<CartItem> = Promise.resolve<CartItem>(null);

  constructor(private storage: StorageService) {
  }

  collection(cartId?: string | number): Promise<CartItem[]> {
    const key = 'cart/' + cartId + '/items';
    return this.storage.getItem(key, []);
  }

  /**
   * Create cartItem
   */
  public create(model: CartItem): Promise<CartItem[]> {
    return new Promise((resolve, reject) => {
      this.storage.setItem(model.itemId.toString(), model)
        .then(result => {
          resolve([CartItem.transformResponse<CartItem>(result)]);
        })
        .catch(error => reject(error));
    });
  }

  /**
   */
  public show(itemId: string | number): Promise<CartItem> {
    return new Promise((resolve, reject) => {
      this.storage.getItem(itemId.toString())
        .then(result => {
          resolve(CartItem.transformResponse<CartItem>(result));
        })
        .catch(error => reject(error));
    });
  }

  /**
   */
  public update(itemId: string | number, model: CartItem): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.storage.setItem(model.itemId.toString(), model)
        .then(result => {
          resolve(true);
        })
        .catch(error => reject(error));
    });
  }

  /**
   */
  public remove(itemId: string | number): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.storage.getItem(itemId.toString())
        .then(result => {
          resolve(true);
        })
        .catch(error => reject(error));
    });
  }
}
