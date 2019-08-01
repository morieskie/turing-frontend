import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import {AuthService} from '../service/auth.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // add authorization header with jwt token if available
    let newRequest;
    const currentUser = this.authenticationService.currentUserValue;
    if (currentUser && currentUser.accessToken) {
      newRequest = request.clone({
        // withCredentials: true,
        headers: request.headers.set('USER-KEY', `${currentUser.accessToken}`),
        // setHeaders: {
        //   'USER-KEY': `${currentUser.accessToken}` 
        // }
      });
    }

    return next.handle(newRequest || request);
  }
}
