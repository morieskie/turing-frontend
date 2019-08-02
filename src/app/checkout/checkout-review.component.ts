import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {StepService} from './service/step.service';
import {CartService} from '../cart/service/cart.service';
import {Cart} from '../cart/model/cart';
import {StripePaymentService} from './service/stripe-payment.service';
import {StorageService} from '../storage/service/storage.service';
import {Order} from '../order/model/order';
import {Customer} from '../customer/model/customer';
import {OrderService} from '../order/service/order.service';
import {NotificationService} from '../throbber/service/notification.service';
import {ThrobberService} from '../throbber/throbber.service';
import {TaxService} from './service/tax.service';
import {TaxModel} from './model/tax.model';
import {environment} from "../../environments/environment";

@Component({
  templateUrl: './template/checkout-review.component.html'
})
export class CheckoutReviewComponent implements OnInit {
  public model: Cart;
  public order: Order;
  public currentUser: any;
  public address: string;
  public cardNumber: string;
  private tax: TaxModel;
  public productImageFolder = `${environment.paths.catalogueImagesPath}`;

  constructor(public router: Router,
              public cartService: CartService,
              public stripeService: StripePaymentService,
              public storageService: StorageService,
              public orderService: OrderService,
              public taxService: TaxService,
              public notificationService: NotificationService,
              public throbberService: ThrobberService) {

    this.taxService.getTax().then(tax => {
      this.tax = tax;
      this.taxService.setTax(tax);
    });
  }

  ngOnInit() {

    this.storageService.getItem('order')
      .then(order => this.order = new Order(order))
      .then(order => {
        this.currentUser = new Customer(order.customer);

        this.address = [
          this.currentUser.address1,
          this.currentUser.address2,
          this.currentUser.city,
          this.currentUser.postalCode,
          this.currentUser.country,
        ].join(', ');
      });

    this.storageService.getItem('cardDetails')
      .then(cardDetails => {
        const ccNumber = cardDetails.cardNumber.split(' ')[3];
        if (ccNumber) {
          this.cardNumber = `**** **** **** ${ccNumber}`;
        }
      });

    this.cartService.getCurrentCart().then(response => {
      this.model = response;
      this.order.totalAmount = this.model.cartTotal;
      this.order.cartId = this.model.cartId;
      this.order.tax = this.tax;

      this.storageService.setItem('order', this.order.toJson())
        .then(() => this.orderService.setCurrentOrder(this.order));
    });
  }

  onSubmit() {
    this.throbberService.activate();
    this.order.taxId = 1;
    this.order.tax = this.tax;

    try {
      this.orderService.create(this.order.toSnakeCase()).then(order => {

        this.order.orderId = order.orderId;

        this.stripeService.charge({
          stripeToken: this.order.stripeToken,
          order_id: this.order.orderId,
          description: 'Order Payment',
          amount: this.order.checkoutTotal * 100,
        }).then(result => {
          console.log('STRIPE_CHARGE_RESPONSE', result);
          this.storageService.removeItem('cardDetails').then(() => console.log('Card has been removed'));
          this.storageService.removeItem('order').then(() => console.log('Order has been removed'));
          this.storageService.removeItem('currentCart').then(() => this.cartService.refreshCart());

          this.notificationService.success('Success', 'Order successfully placed', {
            onClosing: () => {
              this.throbberService.deActivate();
              this.router.navigate(['/checkout/complete']);
            }
          });
        })
          .catch(error => {
            throw new Error(error);
          });
      })
        .catch(() => {
          setTimeout(() => this.throbberService.deActivate(), 3500);
        });
    } catch (e) {
      setTimeout(() => this.throbberService.deActivate(), 3500);
    }
  }
}
