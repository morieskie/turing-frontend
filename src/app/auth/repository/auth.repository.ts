import {Inject} from '@angular/core';
import {AuthProviderInterface} from '../interface/auth-provider.interface';
import {AuthProvider} from '../../app.config';
import {RegisterModel} from '../../login/model/register.model';

export class AuthRepository {
  constructor(@Inject(AuthProvider) private provider: AuthProviderInterface) {
  }

  register(model: RegisterModel) {
    return this.provider.register(model);
  }

  login(email: string, password: string) {
    return this.provider.login(email, password);
  }

  facebookLogin(accessToken: string) {
    return this.provider.facebookLogin(accessToken);
  }

  logout() {
    this.provider.logout();
  }
}
