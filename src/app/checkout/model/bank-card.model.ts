import {BaseModel} from '../../api/model/base.model';

export class BankCardModel extends BaseModel {

  get cardNumber(): string {
    return this._cardNumber;
  }

  set cardNumber(value: string) {
    this._number = parseFloat(value.split(' ').join(''));
    this._cardNumber = value;
  }

  get 'number'(): number {
    return this._number;
  }

  set 'number'(value: number) {
    this._number = value;
  }

  get expMonth(): number {
    return this._expMonth;
  }

  set expMonth(value: number) {
    this._expMonth = value;
  }

  get expYear(): number {
    return this._expYear;
  }

  set expYear(value: number) {
    this._expYear = value;
  }

  get cvc(): number {
    return this._cvc;
  }

  set cvc(value: number) {
    this._cvc = value;
  }

  get name(): number {
    return this._name;
  }

  set name(value: number) {
    this._name = value;
  }

  get expiry(): string {
    return this._expiry;
  }

  set expiry(value: string) {
    const pieces = value.replace(' ', '').split('/');
    this.expMonth = parseFloat(pieces[0]);
    this.expYear = parseFloat(pieces[1]);
    this._expiry = value;
  }
}
