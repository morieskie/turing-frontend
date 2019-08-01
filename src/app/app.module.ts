import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {Router} from '@angular/router';
import {StorageModule} from './storage/storage.module';

import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {CustomerApiProvider} from './customer/provider/customer-api.provider';
import {CustomerModule} from './customer/customer.module';
import {CartLocalStorageProvider} from './cart/provider/cart-local-storage.provider';
import {CartItemLocalStorageProvider} from './cart/provider/cart-item-local-storage.provider';
import {OrderApiProvider} from './order/provider/order-api.provider';
import {OrderItemApiProvider} from './order/provider/order-item-api.provider';
import {
  CatalogueProvider,
  API_CONFIG, CatalogueItemProvider, StorageProvider, AuthProvider,
  CartItemProvider,
  CartProvider,
  CustomerProvider, OrderProvider, OrderItemProvider, ApiCartProvider
} from './app.config';
import {CatalogueApiProvider} from './catalogue/provider/catalogue-api.provider';
import {RestService} from './api/Rest.service';
import {CartModule} from './cart/cart.module';
import {CatalogueModule} from './catalogue/catalogue.module';
import {OrderModule} from './order/order.module';
import {ThrobberService} from './throbber/throbber.service';
import {environment} from '../environments/environment';
import {CatalogueItemApiProvider} from './catalogue/provider/catalogue-item-api.provider';
import {LocalStorageProvider} from './storage/provider/local-storage-provider.service';
import {JwtInterceptor} from './auth/interceptor/jwt.interceptor';
import {ErrorInterceptor} from './auth/interceptor/error.interceptor';
import {AuthService} from './auth/service/auth.service';
import {AuthRepository} from './auth/repository/auth.repository';
import {AuthApiProvider} from './auth/provider/auth-api.provider';
import {LoginModule} from './login/login.module';
import {CartApiProvider} from './cart/provider/cart-api.provider';
import {CartApiRepository} from './cart/repository/cart-api.repository';
import {CheckoutModule} from './checkout/checkout.module';
import {Ng2IziToastModule} from 'ng2-izitoast';
import {NotificationService} from './throbber/service/notification.service';
import {PaginatorModule} from './paginator/paginator.module';
import {SocialLoginModule, AuthServiceConfig} from 'angularx-social-login';
import {GoogleLoginProvider, FacebookLoginProvider} from 'angularx-social-login';


const config = new AuthServiceConfig([
  // {
  //   id: GoogleLoginProvider.PROVIDER_ID,
  //   provider: new GoogleLoginProvider('Google-OAuth-Client-Id')
  // },
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider('1279192698904118')
  }
]);

export function provideConfig() {
  return config;
}

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    BrowserModule,
    FormsModule,
    StorageModule,
    LoginModule,
    CatalogueModule,
    CartModule,
    CustomerModule,
    CheckoutModule,
    OrderModule,
    Ng2IziToastModule,
    PaginatorModule,
    SocialLoginModule
  ],
  providers: [
    AuthService,
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    RestService,
    ThrobberService,
    NotificationService,
    {
      provide: AuthProvider,
      useClass: AuthApiProvider
    },
    {
      provide: CartProvider,
      useClass: CartLocalStorageProvider
    },
    {
      provide: ApiCartProvider,
      useClass: CartApiProvider
    },
    {
      provide: CatalogueProvider,
      useClass: CatalogueApiProvider
    },
    {
      provide: CartItemProvider,
      useClass: CartItemLocalStorageProvider
    },
    {
      provide: OrderProvider,
      useClass: OrderApiProvider
    },
    {
      provide: OrderItemProvider,
      useClass: OrderItemApiProvider
    },
    {
      provide: CatalogueProvider,
      useClass: CatalogueApiProvider
    },
    {
      provide: CatalogueItemProvider,
      useClass: CatalogueItemApiProvider
    },
    {
      provide: CustomerProvider,
      useClass: CustomerApiProvider
    },
    {
      provide: API_CONFIG,
      useValue: {
        baseUrl: environment.apiUrl
      }

    },
    AuthRepository,
    {
      provide: StorageProvider,
      useClass: LocalStorageProvider
    },
    CartApiRepository,
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    },
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  // Diagnostic only: inspect router configuration
  constructor(router: Router) {
    // console.log('Routes: ', JSON.stringify(router.config, undefined, 2));
  }
}
