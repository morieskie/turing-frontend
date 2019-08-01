import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {CheckoutRoutingModule} from './checkout-routing.module';
import {CheckoutComponent} from './checkout.component';
import {CheckoutShippingComponent} from './checkout-shipping.component';
import {CheckoutPaymentComponent} from './checkout-payment.component';
import {CheckoutReviewComponent} from './checkout-review.component';
import {CheckoutAddressComponent} from './checkout-address.component';
import {StepService} from './service/step.service';
import {StepModel} from './model/step.model';
import {CheckoutCompleteComponent} from './checkout-complete.component';
import {ShippingRegionService} from './service/shipping-region.service';
import {ShippingMethodService} from './service/shipping-method.service';
import {StripePaymentService} from './service/stripe-payment.service';
import {CheckoutOrderSummaryComponent} from './checkout-order-summary.component';
import {TaxService} from './service/tax.service';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CheckoutRoutingModule
  ],
  exports: [],
  declarations: [
    CheckoutComponent,
    CheckoutAddressComponent,
    CheckoutShippingComponent,
    CheckoutPaymentComponent,
    CheckoutReviewComponent,
    CheckoutCompleteComponent,
    CheckoutOrderSummaryComponent
  ],
  providers: [
    StepService, StepModel, ShippingRegionService, ShippingMethodService, StripePaymentService, TaxService
  ]
})

export class CheckoutModule {
}
