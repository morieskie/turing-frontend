import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {StorageService} from '../storage/service/storage.service';
import {OrderService} from '../order/service/order.service';
import {Order} from '../order/model/order';
import {ShippingModel} from './model/shipping.model';
import {TaxModel} from './model/tax.model';
import {TaxService} from './service/tax.service';
import {ShippingMethodService} from './service/shipping-method.service';
import {CartService} from "../cart/service/cart.service";
import {Cart} from "../cart/model/cart";

@Component({
  selector: 'app-checkout-order-summary',
  templateUrl: './template/checkout-order-summary.component.html',
})
export class CheckoutOrderSummaryComponent implements OnInit, AfterViewInit {
  @Input()
  public shipping: ShippingModel;
  @Input()
  public order: Order;
  @Input()
  public tax: TaxModel;
  private cart: Cart;

  constructor(public router: Router,
              public storageService: StorageService,
              public orderService: OrderService,
              public cartService: CartService,
              public taxService: TaxService,
              public shippingService: ShippingMethodService) {
    this.taxService.getTax().then(tax => this.tax = tax);

    this.cartService.getCurrentCart().then(cart => {
      this.cart = cart;
      if (this.order) {
        this.order.cart = cart;
      }
    })

    this.orderService.getOrderObservable().subscribe(next => {
      if (next) {
        this.order = next;
        this.shipping = this.order.shipping;
        this.tax = this.order.tax;
      }
    });

    this.taxService.getTaxObservable().subscribe(next => {
      this.tax = next;
      if (this.order) {
        this.order.tax = this.tax;
        // this.orderService.setCurrentOrder(this.order);
      }
    });

    this.shippingService.getShippingMethodObservable().subscribe(next => {
      this.shipping = next;
      if (this.order) {
        this.order.shipping = this.shipping;
        //  this.orderService.setCurrentOrder(this.order);
      }
    });

  }

  ngOnInit() {
    if (this.order) {
      this.orderService.setCurrentOrder(this.order);
    }
  }

  ngAfterViewInit(): void {
  }
}
