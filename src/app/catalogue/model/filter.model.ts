import {BaseModel} from '../../api/model/base.model';

export class FilterModel extends BaseModel {

  get page(): number {
    return this._page;
  }

  set page(value: number) {
    this._page = value;
  }

  get limit(): number {
    return this._limit;
  }

  set limit(value: number) {
    this._limit = value;
  }

  get categoryId(): number {
    return this._categoryId;
  }

  set categoryId(value: number) {
    this._categoryId = value;
  }

  get size(): string {
    return this._size;
  }

  set size(value: string) {
    this._size = value;
  }

  get color(): string {
    return this._color;
  }

  set color(value: string) {
    this._color = value;
  }

  get queryString(): string {
    return this._queryString;
  }

  set queryString(value: string) {
    this._queryString = value;
  }

  get allWords(): boolean {
    return this._allWords;
  }

  set allWords(value: boolean) {
    this._allWords = value;
  }

  get order(): string {
    return this._order;
  }

  set order(value: string) {
    this._order = value;
  }

  get descriptionLength(): string {
    return this._descriptionLength;
  }

  set descriptionLength(value: string) {
    this._descriptionLength = value;
  }
}
