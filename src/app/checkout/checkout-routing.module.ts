import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CheckoutComponent} from './checkout.component';
import {CheckoutShippingComponent} from './checkout-shipping.component';
import {CheckoutPaymentComponent} from './checkout-payment.component';
import {CheckoutReviewComponent} from './checkout-review.component';
import {CheckoutAddressComponent} from './checkout-address.component';
import {CheckoutCompleteComponent} from './checkout-complete.component';
import {AuthGuard} from '../auth/gaurd/auth.gaurd';

const checkoutRoutes: Routes = [
  {
    path: 'checkout',
    component: CheckoutComponent,
    children: [
      {
        path: '',
        canActivate: [AuthGuard],
        children: [
          {
            path: `:cartId/address`,
            component: CheckoutAddressComponent,
            canActivate: [AuthGuard],
          },
          {
            path: `:cartId/shipping`,
            component: CheckoutShippingComponent,
            canActivate: [AuthGuard],
          },
          {
            path: `:cartId/payment`,
            component: CheckoutPaymentComponent,
            canActivate: [AuthGuard],
          },
          {
            path: `:cartId/review`,
            component: CheckoutReviewComponent,
            canActivate: [AuthGuard],
          },
        ]
      }
    ]
  },
  {
    path: `checkout/complete`,
    component: CheckoutCompleteComponent
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(checkoutRoutes)
  ],
  exports: [
    RouterModule
  ],
  providers: []
})
export class CheckoutRoutingModule {
}
