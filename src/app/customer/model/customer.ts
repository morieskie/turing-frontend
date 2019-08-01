import {BaseModel} from '../../api/model/base.model';

export class Customer extends BaseModel {
  [x: string]: any;

  get customerId(): number {
    return this._customerId;
  }

  set customerId(value: number) {
    this._customerId = value;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get email(): string {
    return this._email;
  }

  set email(value: string) {
    this._email = value;
  }

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

  get postalCode(): string {
    return this._postalCode;
  }

  set postalCode(value: string) {
    this._postalCode = value;
  }

  get country(): string {
    return this._country;
  }

  set country(value: string) {
    this._country = value;
  }

  get shippingRegionId(): number {
    return this._shippingRegionId;
  }

  set shippingRegionId(value: number) {
    this._shippingRegionId = value;
  }

  get dayPhone(): string {
    return this._dayPhone;
  }

  set dayPhone(value: string) {
    this._dayPhone = value;
  }

  get evePhone(): string {
    return this._evePhone;
  }

  set evePhone(value: string) {
    this._evePhone = value;
  }

  get mobPhone(): string {
    return this._mobPhone;
  }

  set mobPhone(value: string) {
    this._mobPhone = value;
  }

  get creditCard(): string {
    return this._creditCard;
  }

  set creditCard(value: string) {
    this._creditCard = value;
  }

  get password(): string {
    return this._password;
  }

  set password(value: string) {
    this._password = value;
  }
}
