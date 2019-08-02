import {AfterContentChecked, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {environment} from '../../environments/environment';
import {TaxService} from "../checkout/service/tax.service";
import {ShippingMethodService} from "../checkout/service/shipping-method.service";
import {StorageService} from "../storage/service/storage.service";
import {Customer} from "../customer/model/customer";
import {Order} from "./model/order";
import {OrderItem} from "./model/order-item";

@Component({
  selector: 'app-order-details-modal',
  templateUrl: './template/order-details-modal.component.html',
  styleUrls: []
})
export class OrderDetailsModalComponent implements OnInit, OnDestroy, AfterContentChecked {

  @Input()
  public order: Order;
  @Input()
  public items: OrderItem[];
  @Input()
  public subtotal: number;
  @Input()
  public checkoutTotal: number;
  @Input()
  public shippingCost: number;
  @Input()
  public estimatedTax: number;
  @Input()
  public totalAmount: number;
  public productImageFolder = `${environment.paths.catalogueImagesPath}`;

  constructor(protected router: Router,
              public storageService: StorageService) {
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }

  onSubmit() {
  }

  ngAfterContentChecked(): void {
  }

}
