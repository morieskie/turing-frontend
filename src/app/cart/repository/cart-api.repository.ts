import {Inject, Injectable} from '@angular/core';
import {Cart} from '../model/cart';
import {CartProviderInterface} from '../interface/cart-provider.interface';
import {RepositoryInterface} from '../interface/RepositoryInterface';
import {ApiCartProvider} from '../../app.config';

@Injectable()
export class CartApiRepository implements RepositoryInterface {
  public model: Promise<Cart>;

  constructor(@Inject(ApiCartProvider) private provider: CartProviderInterface) {
  }

  collection(): Promise<any> {
    return this.provider.collection();
  }

  /**
   * Create Cart
   */
  public create(model: Cart): Promise<Cart> {
    return this.model = this.provider.create(model);
  }

  /**
   * View cart
   */
  public show(id: string | number): Promise<Cart> {
    return this.model = this.provider.show(id);
  }

  /**
   * Update Cart
   */
  public update(id: string | number, model: Cart): Promise<boolean> {
    return this.provider.update(id, model);
  }

  /**
   * Delete Cart
   */
  public remove(id: string | number): Promise<boolean> {
    return this.provider.remove(id);
  }

  public generateUniqueId(): Promise<{cart_id: string}> {
    return this.provider.generateUniqueId();
  }

}
