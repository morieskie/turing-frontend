import {Component, OnInit} from '@angular/core';
import {LoginModel} from './model/login.model';
import {RegisterModel} from './model/register.model';
import {AuthService} from '../auth/service/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {NotificationService} from '../throbber/service/notification.service';
import {AuthService as SocialAuthService} from 'angularx-social-login';
import {FacebookLoginProvider, GoogleLoginProvider} from 'angularx-social-login';
import {ThrobberService} from '../throbber/throbber.service';
import {Customer} from "../customer/model/customer";

@Component({
  templateUrl: './template/login.component.html'
})
export class LoginComponent implements OnInit {
  public readonly loginModel: LoginModel;
  public readonly registerModel: RegisterModel;
  public returnUrl: string;

  constructor(private service: AuthService,
              public socialAuthService: SocialAuthService,
              public route: ActivatedRoute,
              public router: Router,
              public throbberService: ThrobberService,
              public notificationService: NotificationService) {
    this.loginModel = new LoginModel();
    this.registerModel = new RegisterModel();
  }

  ngOnInit() {
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
    this.socialAuthService.authState.subscribe((user) => {
      console.log(user);
      if (user && user.authToken) {
        this.service.facebookLogin(user.authToken)
          .then(result => {
            console.log('submitLogin.result', result);
            this.service.getCurrentUserSubscription().next(new Customer(result));
            this.notificationService.success('Success', `Logged in successfully`, {
              onClosed: () => {
                console.log('closed');
                this.router.navigate([this.returnUrl]);
              }
            });
          });
        // this.user = user;
        // this.loggedIn = (user != null);
      }
    });
  }

  submitLogin(event) {
    event.preventDefault();
    console.log(this.loginModel);
    this.service.login(this.loginModel.email, this.loginModel.password)
      .then(result => {
        console.log('submitLogin.result', result);
        this.service.getCurrentUserSubscription().next(result);
        this.notificationService.success('Success', `Logged in successfully`, {
          onClosed: () => {
            console.log('closed');
            this.router.navigate([this.returnUrl]);
          }
        });
      })
      .catch(error => {
        console.log('Error', error);
        this.notificationService.error('Error', error);
      });
    return false;
  }

  submitRegister(event) {
    event.preventDefault();
    this.throbberService.activate();
    console.log(this.registerModel);
    this.service.register(this.registerModel)
      .then(result => {
        console.log('submitRegister.result', result);
        this.service.getCurrentUserSubscription().next(new Customer(result));
        this.notificationService.success('Success', `Logged in registered`, {
          onClosed: () => {
            console.log('closed');
            this.throbberService.deActivate();
            this.router.navigate([this.returnUrl]);
          }
        });
      })
      .catch(error => {
        console.log('Error', error);
        this.notificationService.error('Error', error);
        this.throbberService.deActivate();
      });
    return false;
  }

  signInWithFB(event): void {
    event.preventDefault();
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID)
      .then(result => {
        console.log(result);
      });
  }

  signInWithGoogle(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }
}
