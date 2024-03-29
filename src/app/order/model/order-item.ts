import {OrderItemInterface} from '../interface/order-item.interface';
import {BaseModel} from '../../api/model/base.model';
import {CatalogueItem} from "../../catalogue/model/catalogue-item";

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

  get subtotal(): string {
    return this._subtotal;
  }

  set subtotal(value: string) {
    this._subtotal = value;
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

  public get product(): CatalogueItem {
    return this._product;
  }

  public set product(value: CatalogueItem) {
    this._product = new CatalogueItem(value);
  }
}
