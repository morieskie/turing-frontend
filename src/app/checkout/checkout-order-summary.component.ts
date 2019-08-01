import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {StorageService} from '../storage/service/storage.service';
import {OrderService} from '../order/service/order.service';
import {Order} from '../order/model/order';
import {ShippingModel} from './model/shipping.model';
import {TaxModel} from './model/tax.model';
import {TaxService} from './service/tax.service';
import {ShippingMethodService} from './service/shipping-method.service';

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

  constructor(public router: Router,
              public storageService: StorageService,
              public orderService: OrderService,
              public taxService: TaxService,
              public shippingService: ShippingMethodService) {

    this.orderService.getOrderObservable().subscribe(next => {
      this.order = next;
      this.shipping = this.order.shipping;
    });

    this.taxService.getTaxObservable().subscribe(next => {
      this.tax = next;
      this.order.tax = this.tax.toJson();
      this.orderService.setCurrentOrder(this.order);
    });

    this.shippingService.getShippingMethodObservable().subscribe(next => {
      this.shipping = next;
      this.order.shipping = this.shipping;
      this.orderService.setCurrentOrder(this.order);
    });

  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
  }
}
