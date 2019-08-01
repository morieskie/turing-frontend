import {InjectionToken} from '@angular/core';
import {CatalogueProviderInterface} from './catalogue/interface/catalogue-provider.interface';
import {ApiConfigInterface} from './api/interface/api-config.interface';
import {CatalogueItemProviderInterface} from './catalogue/interface/catalogue-item-provider.interface';
import {StorageProviderInterface} from './storage/interface/storage-provider.interface';
import {AuthProviderInterface} from './auth/interface/auth-provider.interface';
import {CartProviderInterface} from './cart/interface/cart-provider.interface';
import {CartItemProviderInterface} from './cart/interface/cart-item-provider.interface';
import {CustomerProviderInterface} from './customer/interface/customer-provider.interface';
import {OrderProviderInterface} from './order/interface/order-provider.interface';
import {OrderItemProviderInterface} from './order/interface/order-item-provider.interface';
// import {PolicyProviderInterface} from './policy/interface/policy-provider.interface';
// import {PersonProviderInterface} from './person/interface/person-provider.interface';
// import {ContactProviderInterface} from './contact/interface/contact-provider.interface';
// import {ApplicationProviderInterface} from './application/interface/application-provider.interface';
// import {DriveProviderInterface} from './drive/interface/drive-provider.interface';
// import {LicenceProviderInterface} from './license/interface/licence-provider.interface';

export let CatalogueProvider = new InjectionToken<CatalogueProviderInterface>('app.config');
export let CatalogueItemProvider = new InjectionToken<CatalogueItemProviderInterface>('app.config');
export let API_CONFIG = new InjectionToken<ApiConfigInterface>('app.config');
export let StorageProvider = new InjectionToken<StorageProviderInterface>('app.config');
export let AuthProvider = new InjectionToken<AuthProviderInterface>('app.config');
export let CartProvider = new InjectionToken<CartProviderInterface>('app.config');
export let ApiCartProvider = new InjectionToken<CartProviderInterface>('app.config');
export let CartItemProvider = new InjectionToken<CartItemProviderInterface>('app.config');

export let OrderProvider = new InjectionToken<OrderProviderInterface>('app.config');
export let OrderItemProvider = new InjectionToken<OrderItemProviderInterface>('app.config');
export let CustomerProvider = new InjectionToken<CustomerProviderInterface>('app.config');
// export let LicenceProvider = new InjectionToken<LicenceProviderInterface>('app.config');
// export let ApplicationProvider = new InjectionToken<ApplicationProviderInterface>('app.config');
// export let DriveProvider = new InjectionToken<DriveProviderInterface>('app.config');
// export let PolicyProvider = new InjectionToken<PolicyProviderInterface>('app.config');
// export let PersonProvider = new InjectionToken<PersonProviderInterface>('app.config');
// export let ContactProvider = new InjectionToken<ContactProviderInterface>('app.config');

