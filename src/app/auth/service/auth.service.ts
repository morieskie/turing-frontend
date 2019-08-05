import {Injectable, OnInit} from '@angular/core';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {AuthRepository} from '../repository/auth.repository';
import {StorageService} from '../../storage/service/storage.service';
import {Customer} from '../../customer/model/customer';
import {RegisterModel} from '../../login/model/register.model';
import {AuthService as SocialAuthService} from 'angularx-social-login';

@Injectable()

export class AuthService {
  public currentUserSubject: BehaviorSubject<Customer> = new BehaviorSubject<Customer>(null);
  public currentUser: Observable<any>;
  public redirectUrl: any;
  public storageKey = 'currentUser';

  constructor(private repository: AuthRepository, private storageService: StorageService,
              public socialAuthService: SocialAuthService) {
    this.storageService.getItem(this.storageKey).then(response => {
      this.currentUserSubject.next(response);
      this.currentUser = this.currentUserSubject.asObservable();
    }).catch(() => {
      this.currentUser = of(null);
      this.currentUserSubject = new BehaviorSubject<Customer>(null);
    });
  }

  public getCurrentUserSubscription() {
    return this.currentUserSubject;
  }

  public get currentUserValue() {
    let response: any = localStorage.getItem(this.storageKey);
    response = response ? JSON.parse(response) : null;
    return response;
  }

  login(username: string, password: string) {
    return this.repository.login(username, password)
      .then(response => {
        const data: any = {};
        Object.assign(data, response.customer.schema);
        data.accessToken = response.accessToken;
        const customer: Customer = new Customer(data);
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        this.currentUserSubject.next(customer);
        this.storageService.setItem('currentUser', customer.toJson())
          .then(() => console.log('USER SAVED TO LOCAL STORAGE', customer));
        return customer;
      });
  }

  register(model: RegisterModel) {
    return this.repository.register(model)
      .then(response => {
        const data: any = {};
        Object.assign(data, response.customer);
        data.accessToken = response.accessToken;
        const customer: Customer = new Customer(data);
        this.currentUserSubject.next(customer);
        this.storageService.setItem('currentUser', customer.toJson())
          .then(() => console.log('USER SAVED TO LOCAL STORAGE', customer));
        return customer;
      });
  }

  logout() {
    this.socialAuthService.signOut(true).catch(error => console.log(error.message));
    // remove user from local storage to log user out
    this.storageService.removeItem(this.storageKey)
      .then(() => {
      })
      .catch(() => {
      });

    this.storageService.removeItem('cardDetails').catch(() => {
    });

    this.storageService.removeItem('order').catch(() => {
    });

    this.currentUserSubject.next(null);
  }

  facebookLogin(accessToken: string) {
    return this.repository.facebookLogin(accessToken)
      .then(response => {
        const data: any = {};
        Object.assign(data, response.customer.schema);
        data.accessToken = response.accessToken;
        const customer: Customer = new Customer(data);

        this.storageService.setItem('currentUser', customer.toJson())
          .then(() => {
            this.currentUserSubject.next(customer);
            console.log('USER SAVED TO LOCAL STORAGE', customer);
          });
        return customer;
      });
  }

}
