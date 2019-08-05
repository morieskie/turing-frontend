import {Injectable} from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {AuthService} from '../service/auth.service';
import {NotificationService} from '../../throbber/service/notification.service';
import {Router} from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthService,
              public notificationService: NotificationService,
              public route: Router) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(err => {
      console.log('ERROR_INTERCEPTOR', err.error.message, request.headers);
      // this.notificationService.error('Error', err.error.message || err, {
      //   onClosed: () => {
          if (err.status === 401) {
            // auto logout if 401 response returned from api
            this.authenticationService.logout();
            location.reload(true);
          } else if (err.error.message === 'Token has expired') {
            // auto logout if 401 response returned from api
            this.authenticationService.logout();
            this.route.navigate(['/login', {redirectUrl: location.pathname}]);
          } else if ((typeof err.error.code !== 'undefined' && err.error.code === 'AUT_01') ||
            (typeof err.error.code !== 'undefined' && err.error.code === 'AUT_02') ||
            (typeof err.error.field !== 'undefined' && err.error.field === 'API-KEY')) {
            // auto logout if 401 response returned from api

            this.route.navigate(['/login', {redirectUrl: location.pathname}]);
          }
       // }
      //});

      const error = err.error.message || err.statusText;
      return throwError(error);

    }));
  }
}
