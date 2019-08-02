import {CartItem} from './cart-item';
import {Observable, of} from 'rxjs';
import {BaseModel} from '../../api/model/base.model';

export class Cart extends BaseModel {
  [x: string]: any;

  public get cartId(): string | number {
    return this._cartId;
  }

  public set cartId(value: string | number) {
    this._cartId = value;
  }

  public get items(): CartItem[] {
    return this._items || [];
  }

  public set items(values: CartItem[]) {
    if (!Array.isArray(values)) {
      values = [];
    }
    this._items = values.map(item => {
      // item.productId = item.product_id;
      // item.itemId = item.item_id;
      return new CartItem(item);
    });
  }

  public get hasItems(): Observable<boolean> {
    return of(this.items.length > 0);
  }

  public get cartTotal() {
    let total = 0.00;
    (Array.isArray(this.items) ? this.items : []).forEach(item => total += parseFloat(String(item.subtotal)));
    return total;
  }

  public get cartItemTotal() {
    return this.items.length;
  }
}
