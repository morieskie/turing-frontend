import {OrderItem} from './order-item';
import {BaseModel} from '../../api/model/base.model';
import {TaxModel} from '../../checkout/model/tax.model';
import {ShippingModel} from '../../checkout/model/shipping.model';
import {CatalogueItem} from "../../catalogue/model/catalogue-item";

export class Order extends BaseModel {
  [x: string]: any;

  public get orderId(): number {
    return this._orderId;
  }

  public set orderId(value: number) {
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
    this._shipping = new ShippingModel(value);
  }

  public get items(): OrderItem[] {
    return this._items || [];
  }

  public set items(value: OrderItem[]) {
    // console.log('LOGGING_SOME_WIERD_THING', value);

    // @ts-ignore
    const data = !Array.isArray(value) && (value instanceof Object) ? Object.values(value) : value;
    this._items = (data || []).map(item => new OrderItem(item));
  }

  public get tax(): TaxModel {
    return this._tax;
  }

  public set tax(value: TaxModel) {
    this._tax = new TaxModel(value);
  }

  public get estimatedTax(): number {
    return parseFloat(this.calculateEstimatedTax().toFixed(2));
  }

  public get subtotal() {
    let subtotal = 0;

    if (this.cart) {
      this.items = this.cart.items;
    }

    this.items.forEach(item => {
      subtotal = subtotal + parseFloat(item.subtotal)
    });

    return subtotal;
  }

  public get checkoutTotal(): number {
    let checkoutTotal = this.subtotal;
    if (this.shipping && this.shipping.shippingCost) {
      checkoutTotal += parseFloat(this.shipping.shippingCost);
    }

    checkoutTotal += this.estimatedTax;

    return checkoutTotal;
  }

  calculateEstimatedTax() {

    let subtotal = 0.00;
    let taxPercentage = 0.00;
    let shippingCost = 0.00;

    if (this.subtotal && this.shipping && this.shipping.shippingCost && this.tax && this.tax.taxPercentage) {
      subtotal = this.subtotal;
      taxPercentage = parseFloat(this.tax.taxPercentage);
      shippingCost = parseFloat(this.shipping.shippingCost);
    } else if (this.totalAmount && this.tax && this.tax.taxPercentage) {
      subtotal = this.subtotal;
      // console.log('______________________', this.subtotal)
      taxPercentage = parseFloat(this.tax.taxPercentage);
    }

    return (subtotal + shippingCost) * taxPercentage / 100;
  }

}
