import {Injectable} from '@angular/core';
import {Cart} from '../model/cart';
import {CartRepository} from '../repository/cart.repository';
import {CartItem} from '../model/cart-item';
import {CartItemService} from './cart-item.service';
import {BehaviorSubject} from 'rxjs';
import {Observable} from 'rxjs';
import {StorageService} from '../../storage/service/storage.service';
import {CartApiRepository} from '../repository/cart-api.repository';

@Injectable()
export class CartService {
  public modelSubject: BehaviorSubject<Cart> = new BehaviorSubject<Cart>(null);
  public model: Cart;

  constructor(private repository: CartRepository, private cartApiRepository: CartApiRepository,
              public cartItemService: CartItemService, private storage: StorageService) {
    this.refreshCart();
    this.modelSubject.subscribe(next => this.model = next);
  }

  public refreshCart() {
    console.log('refreshing cart..');
    this.repository.show('currentCart')
      .then(response => {
        try {
          const cart: Cart = new Cart();
          cart.cartId = response.cartId;
          cart.items = response.items || [];
          if (typeof cart.cartId !== 'undefined') {
            if (cart) {
              this.model = cart;
              this.modelSubject.next(this.model);
            }
          } else {

            this.create(new Cart()).then(result => {
              console.log('Created new CART', result);
              if (result) {
                const newCart: Cart = new Cart();
                newCart.cartId = result.cartId;
                newCart.items = result.items || [];
                this.model = newCart;
                this.modelSubject.next(this.model);
              }
            }).catch(error => console.log(error.message));
          }

        } catch (e) {
          console.log(e);
        }
      }).catch(error => {
      console.log(error.message);
      this.create(new Cart()).then(result => {
        console.log('Created new CART', result);
        if (result) {
          const newCart: Cart = new Cart();
          newCart.cartId = result.cartId;
          newCart.items = result.items || [];
          this.model = newCart;
          this.modelSubject.next(this.model);
        }
      });
    });
  }

  public getCartObservable(): Observable<Cart> {
    return this.modelSubject.asObservable();
  }

  public getCurrentCart(): Promise<Cart> {
    return this.repository.show('currentCart');
  }

  public create(cart: Cart): Promise<Cart> {
    return this.cartApiRepository.generateUniqueId()
      .then(result => {
        cart.cartId = result.cart_id;
        cart.items = [];
        return cart;
      })
      .then(result => this.storage.setItem('currentCart', result.toJson())
        .then(response => {
          this.modelSubject.next(response);
          return response;
        }));
  }

  public show(id: string | number): Cart {
    this.repository
      .show(id)
      .then(response => {
        if (typeof response.id !== 'undefined') {
          const cart: Cart = new Cart();
          cart.cartId = response.cartId;
          cart.items = response.items || [];
          this.model = cart;
          this.modelSubject.next(this.model);
        }
      });
    return this.model;
  }

  public update(id: string | number, cart: Cart): Promise<boolean> {
    return this.repository.update(id, cart);
  }

  public remove(id: string | number): Promise<boolean> {
    return this.repository.remove(id);
  }

  public addToCart(model: CartItem) {
    return this.cartItemService.getApiRepository().create(model)
      .then(response => {
        this.handleItemsResponse(response, model);
      });
  }

  public updateCartItem(model: CartItem): Promise<boolean> {
    return this.cartItemService.getApiRepository().update(model.itemId, model)
      .then(response => {
        this.handleItemsResponse(response, model);
        // this.refreshCart();
        return response;
      });
  }

  public removeCartItem(model: CartItem): Promise<boolean> {
    return this.cartItemService.getApiRepository().remove(model.itemId)
      .then(response => {
        this.handleItemsResponse(this.model.toJson().items.filter(item => item.itemId !== model.itemId), model);
        // this.refreshCart();
        return response;
      })
      .catch(error => {
        console.log(error.message);
        this.handleItemsResponse(this.model.toJson().items.filter(item => item.itemId !== model.itemId), model);
        return false;
      });
  }

  public handleItemsResponse(response, model) {
    const cart = new Cart();
    cart.cartId = this.model.cartId;
    cart.items = response;
    this.model = cart;
    this.modelSubject.next(this.model);
    this.storage.updateItem('currentCart', cart.toJson())
      .then(result => console.log('add to cart', result, cart.toJson()));
  }

  public removeCartItems(model: Cart): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const totalPromises = model.items.length - 1;

      model.items.forEach((item, index) => this.removeCartItem(item).then(() => {
        if (index === totalPromises) {
          resolve(true);
        }
      }));
    });
  }

  setCurrentCart(cart: Cart) {
    this.modelSubject.next(cart);
  }
}
