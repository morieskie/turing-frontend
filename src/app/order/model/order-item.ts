import {OrderItemInterface} from '../interface/order-item.interface';
import {BaseModel} from '../../api/model/base.model';

export class OrderItem extends BaseModel implements OrderItemInterface {
  [x: string]: any;

  get itemId(): string | number {
    return this._itemId;
  }

  set itemId(value: string | number) {
    this._itemId = value;
  }

  get unitCost(): number {
    return this._unitCost;
  }

  set unitCost(value: number) {
    this._unitCost = value;
  }

  get quantity(): number {
    return this._quantity;
  }

  set quantity(value: number) {
    this._quantity = value;
  }

  get productName(): string {
    return this._productName;
  }

  set productName(value: string) {
    this._productName = value;
  }

  get attributes(): string {
    return this._attributes;
  }

  set attributes(value: string) {
    this._attributes = value;
  }

  get productId(): string | number {
    return this._productId;
  }

  set productId(value: string | number) {
    this._productId = value;
  }

  get orderId(): string | number {
    return this._orderId;
  }

  set orderId(value: string | number) {
    this._orderId = value;
  }
}
