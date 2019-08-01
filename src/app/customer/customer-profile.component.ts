import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Customer} from './model/customer';
import {CustomerService} from './service/customer.service';
import {Router} from '@angular/router';
import {StorageService} from '../storage/service/storage.service';
import {NotificationService} from '../throbber/service/notification.service';

@Component({
  templateUrl: './template/customer-profile.component.html',
  styleUrls: []
})
export class CustomerProfileComponent implements OnInit, OnDestroy {

  public formModel: Customer = new Customer();

  constructor(protected storageService: StorageService, protected router: Router,
              public notificationService: NotificationService,
              public customerService: CustomerService) {
    console.log('CustomerComponent');
    this.storageService.getItem('currentUser').then(item => {
      const model: Customer = new Customer(item);
      Object.assign(this.formModel, model);
    });
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }

  onSubmit() {
    console.log(this.formModel);
    this.customerService.update(this.formModel.customerId, this.formModel)
      .then(response => {
        response.accessToken = this.formModel.accessToken;
        this.storageService.setItem('currentUser', response.toJson())
          .then(result => {
            this.customerService.setCurrentCustomer(new Customer(result));
            this.notificationService.success('Success', 'Your profile updated successfully.', {});
          });
      });
  }
}
