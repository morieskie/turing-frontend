import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {StepInterface} from './model/step.model';
import {StepService} from './service/step.service';
import {StorageService} from '../storage/service/storage.service';
import {Order} from '../order/model/order';
import {CartService} from '../cart/service/cart.service';
import {Cart} from '../cart/model/cart';
import {OrderService} from '../order/service/order.service';
import {TaxService} from './service/tax.service';
import {TaxModel} from './model/tax.model';

@Component({
  templateUrl: './template/checkout.component.html',
  styleUrls: ['./template/checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  public steps: StepInterface[];
  public order: Order;
  public cart: Cart;
  public shipping: any;
  public tax: TaxModel;

  constructor(public router: Router,
              public stepService: StepService,
              public storageService: StorageService,
              public cartService: CartService,
              public orderService: OrderService,
              public taxService: TaxService) {

    this.taxService.getTax().then(item => {
      this.tax = item;
      this.taxService.setTax(item);
      this.taxService.taxObservable.next(item);
    });

    this.cartService.getCurrentCart().then(item => {
      this.cart = new Cart(item);

      console.log('CART_TO_ORDER', this.cart.toJson());


      // this.storageService.getItem('order').then(orderItem => {
      //   this.order = new Order(orderItem);
      //   this.order.totalAmount = this.cart.cartTotal;
      //   this.order.cart = this.cart;
      //   this.order.cartId = this.cart.cartId;
      //
      //   this.orderService.setCurrentOrder(this.order);
      //
      //   this.storageService.getItem('shippingOptions').then(options => {
      //     this.shipping = options.filter(opt => opt.shippingId === orderItem.shippingId)[0];
      //     if (!this.shipping) {
      //       this.shipping = options[0];
      //     }
      //   }).catch(() => {
      //   });
      // }).catch(() => {
      // });
    });
  }

  ngOnInit() {
    this.steps = this.stepService.getSteps();
  }
}
