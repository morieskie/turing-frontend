import {SafeResourceUrl} from '@angular/platform-browser';
import {BaseModel} from '../../api/model/base.model';
import {ProductReview} from './product-review';

export interface CatalogueItemInterface {
  productId: number | string;
  name: number | string;
  description: number | string;
  price: number | string;
  discountedPrice: number | string;
  thumbnail?: SafeResourceUrl | string;
  image?: SafeResourceUrl | string;
  image2?: SafeResourceUrl | string;
  display?: number;
  sizes?: Array<{ key: number, value: any }>;
  colors?: Array<{ key: number, value: any }>;
  categories?: [];
  reviews?: ProductReview[];
}

export class CatalogueItem extends BaseModel implements CatalogueItemInterface {
  [x: string]: any;

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

  public get description(): string | number {
    return this._description;
  }

  public set description(value) {
    this._description = value;
  }

  public get price(): number | string {
    return parseFloat(this._price).toFixed(2);
  }

  public set price(value: number | string) {
    this._price = value;
  }

  public get discountedPrice(): number | string {
    return parseFloat(this._discountedPrice).toFixed(2);
  }

  public set discountedPrice(value: number | string) {
    this._discountedPrice = value;
  }

  public get image(): string {
    return this._image;
  }

  public set image(value: string) {
    this._image = value;
  }

  public get image2(): string {
    return this._image2;
  }

  public set image2(value: string) {
    this._image2 = value;
  }

  public get thumbnail(): string | SafeResourceUrl {
    return this._thumbnail;
  }

  public set thumbnail(value: string | SafeResourceUrl) {
    this._thumbnail = value;
  }

  public get display(): number {
    return this._display;
  }

  public set display(value: number) {
    this._display = value;
  }

  public get sizes(): any {
    return this._sizes;
  }

  public set sizes(values: any) {
    this._sizes = values;
  }

  public get colors(): any {
    return this._colors;
  }

  public set colors(values: any) {
    this._colors = values;
  }

  public get categories(): any {
    return this._categories;
  }

  public set categories(values: any) {
    this._categories = values;
  }

  public get reviews(): ProductReview[] {
    return this._reviews;
  }

  public set reviews(values: ProductReview[]) {
    this._reviews = values.map(item => {
      return new ProductReview(item);
    });
    console.log('SETTING REVIEWS', this._reviews);
  }

  get discountPercentage() {
    return ((parseFloat(String(this.price)) - parseFloat(String(this.discountedPrice))) / parseFloat(String(this.price)) * 100);
  }
}
