import {AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {CartItem} from './model/cart-item';
import {CartService} from './service/cart.service';
import {Cart} from './model/cart';
import {OrderService} from '../order/service/order.service';
import {Order} from '../order/model/order';
import {OrderItem} from '../order/model/order-item';
import {Router} from '@angular/router';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {OrderItemService} from '../order/service/order-item.service';
import {ThrobberService} from '../throbber/throbber.service';
import {NotificationService} from '../throbber/service/notification.service';
import {StorageService} from "../storage/service/storage.service";
import {environment} from "../../environments/environment";

@Component({
  templateUrl: './template/cart.component.html',
  styleUrls: [
    './template/cart.component.css'
  ]
})
export class CartComponent implements OnInit, AfterViewInit {
  public model: Cart;
  public items: BehaviorSubject<CartItem[]> = new BehaviorSubject<CartItem[]>([]);
  public models: CartItem[];
  public subtotal = 0.00;
  public productImageFolder = `${environment.paths.catalogueImagesPath}`;

  @Input() public hasItems: Observable<boolean>;

  constructor(private service: CartService,
              public orderService: OrderService, private orderItemService: OrderItemService,
              public router: Router, private storageService: StorageService,
              public throbberService: ThrobberService,
              public notificationService: NotificationService) {
    console.log('CartComponent.constructor');
    this.service.getCurrentCart().then(response => this.model = response);
    this.storageService.getItem('order').catch(error => {
      this.storageService.setItem('order', new Order().toJson());
    });
    this.subtotal = 0.00;
  }

  public onSubmit() {
    this.throbberService.activate();
    const order: Order = new Order();
    order.createdOn = new Date().toISOString();
    order.shippedOn = null;

    order.items = this.model.items.map(item => {
      return new OrderItem(item);
    });

    order.totalAmount = this.model.cartTotal;

    this.orderService.create(order)
      .then(response => {
        return response;
      })
      .then(response => {
        console.log('New Order creation:', response);
        this.service.removeCartItems(this.model);
        this.service.remove(this.model.id);
        this.throbberService.deActivate();
        return response;
      })
      .then(response => this.router.navigate(['/checkout/order', response.orderId]));
  }

  onClearCart() {
    this.service.removeCartItems(this.model)
      .then(result => {
        if (result) {
          this.notificationService.warning('Success', 'Cart has been cleared');
        }
      });
  }

  ngOnInit(): void {
    this.service.getCartObservable().subscribe(value => {
      this.subtotal = 0.00;
      this.model = value;
      this.items.next(this.model.items);
      this.hasItems = this.model.hasItems;
      this.model.items.forEach(item => this.subtotal += item.quantity * parseFloat(item.price));
    });

    this.subtotal = 0.00;
    this.hasItems = this.model.hasItems;
    this.items.next(this.model.items || []);
    this.items.subscribe(next => this.models = next);
    this.model.items.forEach(item => this.subtotal += item.quantity * parseFloat(item.price));
    this.service.setCurrentCart(this.model);
  }

  onDecrement($event, item) {
    const effect = $event.target.offsetParent.querySelector('input');
    const qty = effect.value;
    const unitCost: number = parseFloat(item.subtotal) / item.quantity;
    this.subtotal = 0.00;

    if (!isNaN(qty) && qty > 1) {
      effect.value--;
    }

    item.quantity = effect.value;
    item.subtotal = item.quantity * unitCost;
    this.model.items = this.model.items.map((value) => {

      if (value.itemId === item.itemId) {
        value.subtotal = item.subtotal;
      }

      return value;
    });

    this.model.items.forEach(value => this.subtotal += parseFloat(String(value.subtotal)));
    this.items.next(this.model.items);
    return false;
  }

  onIncrement($event, item) {
    const effect = $event.target.offsetParent.querySelector('input');
    const qty = effect.value;
    const unitCost: number = parseFloat(item.subtotal) / item.quantity;
    this.subtotal = 0.00;

    if (!isNaN(qty) && qty > 0) {
      effect.value++;
    }

    item.quantity = effect.value;
    item.subtotal = item.quantity * unitCost;
    this.model.items = this.model.items.map((value) => {

      if (value.itemId === item.itemId) {
        value.subtotal = item.subtotal;
      }

      return value;
    });

    this.model.items.forEach(value => this.subtotal += parseFloat(String(value.subtotal)));
    this.items.next(this.model.items);
    return false;
  }

  onQuantityChange(event, item) {
    console.log(event, item);
    const qty = event;
    const unitCost: number = item.price;

    if (!isNaN(qty) && qty > 0) {
      item.quantity = qty;
      this.subtotal = 0.00;
    }

    item.subtotal = item.quantity * unitCost;
    this.model.items = this.model.items.map((value) => {

      if (value.itemId === item.itemId) {
        value.subtotal = item.subtotal;
      }

      return value;
    });

    this.model.items.forEach(value => this.subtotal += parseFloat(String(value.subtotal)));
    this.items.next(this.model.items);
    return false;
  }

  onRemoveItem(item) {
    this.service.removeCartItem(item).then(result => {
      this.models = this.models.filter(obj => obj.itemId !== item.itemId);
      this.items.next(this.models);
      this.model.items.forEach(value => this.subtotal += parseFloat(String(value.subtotal)));
      this.notificationService.warning('Success', `Product removed from cart`);
    });
  }

  onUpdateCart() {

    // @ts-ignore
    if (Array.isArray(this.models)) {
      this.throbberService.activate();
      const totalPromises = this.models.length - 1;
      this.models.forEach((item, index) => {

        this.service.updateCartItem(item)
          .then(result => {

            if (totalPromises === index) {
              this.notificationService.success('Success', 'Cart successfully updated');
              this.throbberService.deActivate();
            }

          }).catch(error => {
          console.log(error.message);
          this.notificationService.error('Error', error.message);
          this.throbberService.deActivate();
        });
      });
    }
    return false;
  }

  goToCheckout() {
    this.service.setCurrentCart(this.model);
    this.router.navigate(['/checkout/' + this.model.cartId + '/address']);
  }

  ngAfterViewInit(): void {
    console.log('View has been initialised');
  }

}
