import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Customer} from './model/customer';
import {CustomerService} from './service/customer.service';
import {Router} from '@angular/router';
import {OrderService} from '../order/service/order.service';
import {AddressService} from './service/address.service';
import {ShippingRegion} from '../checkout/model/shipping-region';
import {AddressModel} from '../checkout/model/address.model';
import {StorageService} from '../storage/service/storage.service';
import {ShippingRegionService} from '../checkout/service/shipping-region.service';
import {NotificationService} from '../throbber/service/notification.service';

@Component({
  templateUrl: './template/customer-address.component.html',
  styleUrls: []
})
export class CustomerAddressComponent implements OnInit, OnDestroy {

  shippingRegions: ShippingRegion[];
  public formModel: AddressModel = new AddressModel();
  public customer: Customer;

  constructor(
    public storageService: StorageService,
    public service: CustomerService,
    public orderService: OrderService,
    public router: Router,
    public addressService: AddressService,
    public shippingRegionService: ShippingRegionService,
    public notificationService: NotificationService
  ) {

    this.shippingRegionService.getShippingRegions()
      .then(regions => {
        // @ts-ignore
        regions[0].shippingRegionId = '';
        this.shippingRegions = regions;
      }).catch(error => console.log(error.message));

    this.storageService.getItem('currentUser')
      .then(user => {
        this.customer = new Customer(user).toJson();
        Object.assign(this.formModel, {
          country: this.customer.country,
          region: this.customer.region,
          city: this.customer.city,
          postalCode: this.customer.postalCode,
          address1: this.customer.address1,
          address2: this.customer.address2,
          shippingRegionId: this.customer.shippingRegionId,
        });
      });
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }

  onSubmit() {
    console.log(this.formModel);
    this.addressService.update(this.formModel).then(result => {
      result.accessToken = this.customer.accessToken;
      this.storageService.setItem('currentUser', new Customer(result).toJson())
        .then(() => {
          this.notificationService.success('Success', 'Your address updated successfully.');
          this.service.setCurrentCustomer(result);
        });
    }).catch(error => this.notificationService.error('Error', error.message));
  }
}
