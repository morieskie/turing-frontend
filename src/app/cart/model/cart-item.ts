import {BaseModel} from '../../api/model/base.model';

export class CartItem extends BaseModel {
  [x: string]: any;

  get unitCost(): number {
    return this._unitCost;
  }

  set unitCost(value: number) {
    this._unitCost = value;
  }

  get productName(): string {
    return this._productName;
  }

  set productName(value: string) {
    this._productName = value;
  }

  get addedOn(): string {
    return this._addedOn;
  }

  set addedOn(value: string) {
    this._addedOn = value;
  }

  get buyNow(): boolean {
    return this._buyNow;
  }

  set buyNow(value: boolean) {
    this._buyNow = value;
  }

  get quantity(): number {
    return this._quantity;
  }

  set quantity(value: number) {
    this._quantity = value;
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

  get cartId(): string | number {
    return this._cartId;
  }

  set cartId(value: string | number) {
    this._cartId = value;
  }

  get itemId(): string | number {
    return this._itemId;
  }

  set itemId(value: string | number) {
    this._itemId = value;
  }

  get subtotal(): number {
    return this._subtotal;
  }

  set subtotal(value: number) {
    this._subtotal = value;
  }
}
