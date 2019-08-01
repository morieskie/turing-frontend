import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {StepService} from './service/step.service';
import {StripePaymentService} from './service/stripe-payment.service';
import {BankCardModel} from './model/bank-card.model';
import {StorageService} from '../storage/service/storage.service';
import {NotificationService} from '../throbber/service/notification.service';
import {ThrobberService} from '../throbber/throbber.service';

@Component({
  templateUrl: './template/checkout-payment.component.html',
})
export class CheckoutPaymentComponent implements OnInit, AfterViewInit {
  public model: BankCardModel = new BankCardModel();

  constructor(private route: ActivatedRoute,
              public router: Router,
              public stepService: StepService,
              public stripeService: StripePaymentService,
              public storageService: StorageService,
              public notificationService: NotificationService,
              public throbberService: ThrobberService) {
  }

  ngOnInit() {
    this.storageService.getItem('cardDetails')
      .then(results => this.model = new BankCardModel(results))
      .catch(error => console.log(error.message));
  }

  onSubmit() {
    this.throbberService.activate();
    this.storageService.setItem('cardDetails', this.model.toJson())
      .then(() => 'Saved card details');
    this.stripeService.createStripeToken(this.model.toSnakeCase())
      .then(res => {

        this.storageService.getItem('order')
          .then(order => {
            order.stripeToken = res.stripeToken;
            return this.storageService.setItem('order', order);
          })
          .then(() => this.notificationService.success('Success', 'Card details saved successfully', {
            onClosing: () => this.throbberService.deActivate()
          }))
          .catch(error => {
            this.notificationService.error('Error', error.message, {
              onClosing: () => this.throbberService.deActivate()
            });
          });
      })
      .catch(error => {
        try {
          this.notificationService.error('Error', error.message, {
            onClosing: () => this.throbberService.deActivate()
          });
        } catch (e) {
          this.throbberService.deActivate();
        }
      });
  }

  ngAfterViewInit(): void {
    // @ts-ignore
    const jQuery = window.jQuery;
    jQuery('.interactive-credit-card').card({
      container: '.card-wrapper'
    });
    this.stepService.setStatus(false);

  }
}
