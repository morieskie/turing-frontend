import {OrderItem} from './order-item';
import {BaseModel} from '../../api/model/base.model';
import {TaxModel} from "../../checkout/model/tax.model";
import {ShippingModel} from "../../checkout/model/shipping.model";

export class Order extends BaseModel {
  [x: string]: any;

  public get orderId(): string | number {
    return this._orderId;
  }

  public set orderId(value: string | number) {
    this._orderId = value;
  }

  get createdOn(): string {
    return this._createdOn;
  }

  set createdOn(value: string) {
    this._createdOn = value;
  }

  get totalAmount(): number {
    return this._totalAmount;
  }

  set totalAmount(value: number) {
    this._totalAmount = value;
  }

  get customerId(): number {
    return this._customerId;
  }

  set customerId(value: number) {
    this._customerId = value;
  }

  get comments(): number {
    return this._comments;
  }

  set comments(value: number) {
    this._comments = value;
  }

  get status(): number {
    return this._status;
  }

  set status(value: number) {
    this._status = value;
  }

  get shippedOn(): string {
    return this._shippedOn;
  }

  set shippedOn(value: string) {
    this._shippedOn = value;
  }

  get reference(): string | number {
    return this._reference;
  }

  set reference(value: string | number) {
    this._reference = value;
  }

  public get shippingId(): number {
    return this._shippingId;
  }

  public set shippingId(value: number) {
    this._shippingId = value;
  }

  public get taxId(): number {
    return this._taxId;
  }

  public set taxId(value: number) {
    this._taxId = value;
  }

  public get shipping(): ShippingModel {
    return this._shipping;
  }

  public set shipping(value: ShippingModel) {
    this._shipping = value;
  }

  public get items(): OrderItem[] {
    return this._items;
  }

  public set items(value: OrderItem[]) {
    this._items = value;
  }

  public get tax(): TaxModel {
    return this._tax;
  }

  public set tax(value: TaxModel) {
    this._tax = value;
  }

  public get estimatedTax(): number {
    return parseFloat(this.caltulateTax().toFixed(2));
  }

  public get checkoutTotal(): number {
    console.log('checkoutTotal',this.shipping, this.totalAmount, this.estimatedTax, this.caltulateTax())
    return this.shipping && this.shipping.shippingCost ?
      this.totalAmount + parseFloat(this.shipping.shippingCost) + this.estimatedTax :
      this.totalAmount + this.estimatedTax;
  }

  caltulateTax() {
    let response = 0;
    const shippingCost = this.shipping.shippingCost || this.shippingCost;
    console.log('this.shipping',this.shipping);
    console.log('shippingCost',shippingCost);
    console.log('this.totalAmount',this.totalAmount);
    console.log('this.tax',this.tax);
    if (!isNaN(shippingCost)) {
      response = ((this.totalAmount + parseFloat(shippingCost)) * parseFloat(this.tax.taxPercentage)) / 100;
    } else if (this.totalAmount && this.tax) {
      response = (this.totalAmount * parseFloat(this.tax.taxPercentage)) / 100;
    }
    return response;
  }

}
