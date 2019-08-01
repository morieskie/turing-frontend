import {BaseModel} from "../../api/model/base.model";

export class ShippingModel extends BaseModel {

  get shippingId(): number {
    return this._shippingId;
  }

  set shippingId(value: number) {
    this._shippingId = value;
  }

  get shippingType(): string {
    return this._shippingType;
  }

  set shippingType(value: string) {
    this._shippingType = value;
  }

  get shippingCost(): string {
    return this._shippingCost;
  }

  set shippingCost(value: string) {
    this._shippingCost = value;
  }

  get shippingRegionId(): number {
    return this._shippingRegionId;
  }

  set shippingRegionId(value: number) {
    this._shippingRegionId = value;
  }
}
