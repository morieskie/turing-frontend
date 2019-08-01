import {BaseModel} from '../../api/model/base.model';

export class ProductReview extends BaseModel {
  [x: string]: any;

  public ratingOptions: Array<{ key: number, value: string }> = [
    {
      key: 5,
      value: '5 Stars'
    },
    {
      key: 4,
      value: '4 Stars'
    },
    {
      key: 3,
      value: '3 Stars'
    },
    {
      key: 2,
      value: '2 Stars'
    },
    {
      key: 1,
      value: '1 Stars'
    },
  ];

  public get productId(): string | number {
    return this._productId;
  }

  public set productId(value) {
    this._productId = value;
  }

  public get name(): string | number {
    return this._name;
  }

  public set name(value) {
    this._name = value;
  }

  public get review(): string {
    return this._description;
  }

  public set review(value) {
    this._description = value;
  }

  public get rating(): number {
    return this._rating;
  }

  public set rating(value: number) {
    this._rating = value;
  }
}
