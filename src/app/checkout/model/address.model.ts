import {Injectable} from '@angular/core';
import {BaseModel} from '../../api/model/base.model';

@Injectable()
export class AddressModel extends BaseModel {
  get address1(): string {
    return this._address1;
  }

  set address1(value: string) {
    this._address1 = value;
  }

  get address2(): string {
    return this._address2;
  }

  set address2(value: string) {
    this._address2 = value;
  }

  get city(): string {
    return this._city;
  }

  set city(value: string) {
    this._city = value;
  }

  get region(): string {
    return this._region;
  }

  set region(value: string) {
    this._region = value;
  }

  get country(): string {
    return this._country;
  }

  set country(value: string) {
    this._country = value;
  }

  get postalCode(): string {
    return this._postalCode;
  }

  set postalCode(value: string) {
    this._postalCode = value;
  }

  get shippingRegionId(): string {
    return this._shippingRegionId;
  }

  set shippingRegionId(value: string) {
    this._shippingRegionId = value;
  }
}
