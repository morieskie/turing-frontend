import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {StepService} from './service/step.service';
import {ShippingMethodService} from './service/shipping-method.service';
import {StorageService} from '../storage/service/storage.service';
import {OrderService} from '../order/service/order.service';
import {Order} from '../order/model/order';
import {ShippingRegion} from './model/shipping-region';
import {ShippingModel} from './model/shipping.model';
import {TaxService} from './service/tax.service';
import {TaxModel} from './model/tax.model';

@Component({
  templateUrl: './template/checkout-shipping.component.html',
})
export class CheckoutShippingComponent implements OnInit, AfterViewInit {
  public shippingRegionId: string | any;
  public shipping: ShippingModel;
  public models: any;
  public order: Order;
  public skipCreatingOrder: boolean;
  private tax: TaxModel;

  constructor(public router: Router,
              public stepService: StepService,
              public storageService: StorageService,
              public shippingMethodService: ShippingMethodService,
              public orderService: OrderService,
              public taxService: TaxService) {

    this.taxService.getTax().then(response => {
      this.tax = response;
    });

    this.storageService.getItem('order')
      .then(orderResponse => {
        const order: Order = new Order(orderResponse);
        order.shippingId = orderResponse.shippingId;
        this.order = order;


        this.shippingRegionId = this.order.customer.shippingRegionId;

        this.shippingMethodService.getShippingRegions(this.shippingRegionId)
          .then(result => {
            this.models = result.map(item => new ShippingRegion(item));
            console.log('SHIPPING_REGIONS_LOADED', result);
          }).catch(error => console.log(error.message));

        if (order.orderId) {
          this.skipCreatingOrder = true;
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  ngOnInit() {
    if (Array.isArray(this.models)) {
      this.shipping = this.models.filter(item => this.order.shippingId === item.shippingId)[0];
      this.order.shipping = this.shipping;
    }
  }

  onSelect() {
    this.shipping = this.models.filter(item => this.order.shippingId === item.shippingId)[0];
    this.order.shipping = this.shipping;
    this.order.tax = this.tax;
    this.order.shippingCost = this.shipping.shippingCost;
    this.orderService.setCurrentOrder(this.order);
    this.storageService.setItem('order', this.order.toJson())
      .then(result => console.log('STORAGE_ORDER_UPDATE', result));
  }

  onSubmit() {
    const pieces = location.pathname.split('/');
    this.storageService.getItem('currentCart')
      .then(result => {
        this.storageService.setItem('order', this.order.toJson())
          .then(responseItem => {
            console.log('ORDER_WITH_ITEM_ON_STORAGE', responseItem);
            this.router.navigate(['checkout', pieces[2], 'payment']);
          });
      });
  }

  ngAfterViewInit(): void {
    const pieces = location.pathname.split('/');
    this.stepService.setStatus(false);
    this.storageService.getItem('order').then(currentOrder => {
      console.log(currentOrder);
      if (currentOrder.orderId) {
        this.skipCreatingOrder = true;
      }
    }).catch(() => {

    });
  }
}
