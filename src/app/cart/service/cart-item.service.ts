import {Injectable} from '@angular/core';
import {CartItem} from '../model/cart-item';
import {CartItemRepository} from '../repository/cart-item.repository';
import {CartItemApiProvider} from "../provider/cart-item-api.provider";
import {RestService} from "../../api/Rest.service";

@Injectable()
export class CartItemService {

  public item: CartItem;
  public items: CartItem[];

  constructor(private repository: CartItemRepository, private restService: RestService) {
    this.items = [];
  }

  public getCollection(cartId: string | number): CartItem[] {
    this.repository.collection(cartId)
      .then(response => this.items = response);
    return this.items;
  }

  public create(model: CartItem): Promise<CartItem[]> {
    return this.repository.create(model);
  }

  public getRepository(): CartItemRepository {
    return this.repository;
  }

  public getApiRepository(): CartItemRepository {
    return new CartItemRepository(new CartItemApiProvider(this.restService));
  }

  public add(model: CartItem): Promise<CartItem[]> {
    return this.repository.create(model);
  }

  public update(model: CartItem): Promise<boolean> {
    return this.repository.update(model.cartId, model);
  }

  public remove(model: CartItem): Promise<boolean> {
    return this.repository.remove(model.itemId);
  }
}
