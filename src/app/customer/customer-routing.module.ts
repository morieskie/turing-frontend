import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CustomerComponent} from './customer.component';
import {CustomerService} from './service/customer.service';
import {AuthGuard} from "../auth/gaurd/auth.gaurd";
import {CustomerOrdersComponent} from "./customer-orders.component";
import {CustomerProfileComponent} from "./customer-profile.component";
import {CustomerAddressComponent} from "./customer-address.component";
import {CustomerWishlistComponent} from "./customer-wishlist.component";
import {CustomerTicketsComponent} from "./customer-tickets.component";

const customerRoutes: Routes = [
    {
        path: 'customer',
        component: CustomerComponent,
      children: [
        {
          path: '',
          canActivate: [AuthGuard],
          children: [
            {
              path: `orders`,
              component: CustomerOrdersComponent,
              canActivate: [AuthGuard],
            },
            {
              path: `profile`,
              component: CustomerProfileComponent,
              canActivate: [AuthGuard],
            },
            {
              path: `address`,
              component: CustomerAddressComponent,
              canActivate: [AuthGuard],
            },
            {
              path: `wishlist`,
              component: CustomerWishlistComponent,
              canActivate: [AuthGuard],
            },
            {
              path: `tickets`,
              component: CustomerTicketsComponent,
              canActivate: [AuthGuard],
            },
          ]
        }
      ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(customerRoutes)
    ],
    exports: [
        RouterModule
    ],
    providers: [
        CustomerService
    ]
})
export class CustomerRoutingModule {
}
