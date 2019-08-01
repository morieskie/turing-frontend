import {AfterViewInit, Component, OnInit} from '@angular/core';
import {StorageService} from './storage/service/storage.service';
import {CartService} from './cart/service/cart.service';
import {Cart} from './cart/model/cart';
import {ThrobberService} from './throbber/throbber.service';
import {CartItem} from './cart/model/cart-item';
import {OrderService} from './order/service/order.service';
import {AuthService} from './auth/service/auth.service';
import {CustomerService} from './customer/service/customer.service';
import {Router} from '@angular/router';
import {Order} from "./order/model/order";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [
    './app.component.css',
    './throbber/throbber.css'
  ]
})
export class AppComponent implements AfterViewInit, OnInit {
  title = 'turing-frontend';
  public cartId: string | number;
  public cart: Cart;
  public loading = false;
  public username: string;

  // Modal
  public showModal = false;

  // Order
  public order: Order;

  public queryString: string;

  constructor(private storageService: StorageService,
              public cartService: CartService,
              public orderService: OrderService,
              public customerService: CustomerService,
              public throbberService: ThrobberService,
              public authService: AuthService,
              public router: Router) {

    this.storageService.getItem('currentUser')
      .then(user => this.username = user.name)
      .catch(error => console.log(error.message));

    this.customerService.getCustomerObservable()
      .subscribe(next => this.username = next.name ? next.name : null);

    this.throbberService.getObservableThrobber()
      .subscribe(next => this.loading = next);

    this.cartService.getCartObservable()
      .subscribe(next => {
        if (!next) {
          this.cartId = null;
          this.cart = null;
          return false;
        }
        this.cart = next;
        this.cartId = next.cartId;
        this.cart.items = (next.items || []).map(item => new CartItem(item).toJson());
      });

    this.orderService.getOrderObservable()
      .subscribe(next => {
        console.log('AppComponent', 'order', next);
      });

    this.cartService.getCurrentCart().then(response => {
      this.cart = new Cart(response);
      this.cart.items = (response.items || []).map(item => new CartItem(item).toJson());
      this.cartId = response.cartId;
    }).catch(error => console.log(error.message));
  }

  onSearch() {
    return this.router.navigate(['catalogue'], {
      queryParams: {query_string: this.queryString, page: null},
      queryParamsHandling: 'merge'
    })
      .then(() => console.log('Searching for: ', this.queryString));
  }

  ngAfterViewInit(): void {
    // @ts-ignore
    // window.onReady();

    this.authService.getCurrentUserSubscription().subscribe(next => {
      console.log('APP_COMPONENT_CUSTOMER_UPDATE:', next);
      if (next === null) {
        console.log('No user found');
        this.username = null;
      } else if (next.name) {
        this.username = next.name;
        console.log('User found', next);
      }
    });
  }

  ngOnInit(): void {
    // @ts-ignore
    window.onReady();
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
