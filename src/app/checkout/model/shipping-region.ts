import {BaseModel} from '../../api/model/base.model';

export class ShippingRegion extends BaseModel {

  get shippingCost(): string {
    return this._shippingCost;
  }

  set shippingCost(value: string) {
    this._shippingCost = value;
  }

  get shippingId(): number {
    return this._shippingId;
  }

  set shippingId(value: number) {
    this._shippingId = value;
  }

  get shippingRegionId(): number {
    return this._shippingRegionId;
  }

  set shippingRegionId(value: number) {
    this._shippingRegionId = value;
  }

  get shippingType(): string {
    return this._shippingType;
  }

  set shippingType(value: string) {
    this._shippingType = value;
  }

  get deliveryDuration(): string {
    return this._deliveryType;
  }

  set deliveryDuration(value: string) {
    this._deliveryType = value;
  }

  get deliveryMethod(): string {
    return this._deliveryMethod;
  }

  set deliveryMethod(value: string) {
    this._deliveryMethod = value;
  }
}
