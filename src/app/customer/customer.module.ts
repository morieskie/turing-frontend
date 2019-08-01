import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {CustomerRoutingModule} from './customer-routing.module';
import {CustomerService} from './service/customer.service';
import {CustomerComponent} from './customer.component';
import {OrderService} from '../order/service/order.service';
import {CustomerRepository} from './repository/customer.repository';
import {Customer} from './model/customer';
import {OrderLocalStorageProvider} from '../order/provider/order-local-storage.provider';
import {CustomerGuard} from './guard/customer.guard';
import {CustomerApiProvider} from './provider/customer-api.provider';
import {AddressService} from './service/address.service';
import {AddressModel} from '../checkout/model/address.model';
import {CustomerOrdersComponent} from './customer-orders.component';
import {CustomerProfileComponent} from './customer-profile.component';
import {CustomerWishlistComponent} from './customer-wishlist.component';
import {CustomerAddressComponent} from './customer-address.component';
import {CustomerTicketsComponent} from './customer-tickets.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CustomerRoutingModule
  ],
  declarations: [
    CustomerComponent,
    CustomerOrdersComponent,
    CustomerProfileComponent,
    CustomerWishlistComponent,
    CustomerAddressComponent,
    CustomerTicketsComponent
  ],
  providers: [
    CustomerService,
    CustomerGuard,
    CustomerApiProvider,
    Customer,
    CustomerRepository,
    OrderService,
    OrderLocalStorageProvider,
    AddressModel,
    AddressService
  ]
})

export class CustomerModule {
}
