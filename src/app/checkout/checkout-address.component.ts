import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {StorageService} from '../storage/service/storage.service';
import {ShippingRegionService} from './service/shipping-region.service';
import {StepService} from './service/step.service';
import {AddressModel} from './model/address.model';
import {AddressService} from '../customer/service/address.service';
import {OrderService} from '../order/service/order.service';
import {Order} from '../order/model/order';
import {Customer} from '../customer/model/customer';
import {ShippingRegion} from './model/shipping-region';
import {CartService} from "../cart/service/cart.service";
import {Cart} from "../cart/model/cart";
import {TaxService} from "./service/tax.service";
import {TaxModel} from "./model/tax.model";

@Component({
  templateUrl: './template/checkout-address.component.html'
})
export class CheckoutAddressComponent implements OnInit, AfterViewInit {
  public customer;
  shippingRegions: ShippingRegion[];
  public formModel: AddressModel = new AddressModel();
  public order: Order;
  public cart: Cart;
  private tax: TaxModel;

  constructor(public router: Router,
              public storageService: StorageService,
              public shippingRegionService: ShippingRegionService,
              public stepService: StepService,
              public addressService: AddressService,
              public orderService: OrderService,
              public cartService: CartService,
              public taxService: TaxService) {

    this.taxService.getTax().then(tax => this.tax = tax)

    this.shippingRegionService.getShippingRegions().then(regions => {
      // @ts-ignore
      regions[0].shippingRegionId = '';
      this.shippingRegions = regions;
    });

    this.storageService.getItem('currentUser').then(response => {
      this.customer = new Customer(response);
      const data = this.customer.toJson();
      this.formModel.address1 = data.address1;
      this.formModel.address2 = data.address2;
      this.formModel.city = data.city;
      this.formModel.region = data.region;
      this.formModel.country = data.country;
      this.formModel.postalCode = data.postalCode;
      this.formModel.shippingRegionId = data.shippingRegionId === 1 ? '' : data.shippingRegionId;
      if (parseFloat(this.formModel.shippingRegionId) > 1) {
        this.stepService.setStatus(true);
      }
    });

    this.cartService.getCurrentCart().then(item => {
      this.cart = item;
    });
  }

  ngOnInit() {

    this.orderService.getCurrentOrder().then(order => {
      this.order = new Order(order);
      this.order.tax = this.tax;
      this.orderService.setCurrentOrder(this.order);
    }).catch(() => this.setCurrentCreateOrder());

    this.stepService.getSteps().forEach(item => {
      item.active = item.name === 'address';
      if (item.active) {
        this.stepService.setActiveStep(item);
      }
    });
  }

  onSubmit() {
    this.setCurrentCreateOrder();
    this.addressService.update(this.formModel).then(result => {
      const pieces = location.pathname.split('/');
      const data: Customer = new Customer(result);
      data.accessToken = this.customer.accessToken;
      this.order.customer = data.toJson();
      this.order.tax = this.tax;

      this.storageService.setItem('order', this.order)
        .then(() => {
          this.orderService.setCurrentOrder(this.order);
        });

      this.storageService.setItem('currentUser', data.toJson())
        .then(() => {
          this.router.navigate(['checkout', pieces[2], 'shipping']);
        });

    });
    return false;
  }

  ngAfterViewInit(): void {
    this.stepService.setStatus(false);
  }

  public setCurrentCreateOrder() {
    this.orderService.getCurrentOrder().then(order => {
      this.order = new Order(order);

      this.orderService.setCurrentOrder(this.order);

    }).catch(() => this.orderService.setCurrentOrder(new Order({
      customer: this.customer.toJson(),
      totalAmount: this.cart.cartTotal,
      cart: this.cart,
      cartId: this.cart.cartId,
    })));
  }
}
