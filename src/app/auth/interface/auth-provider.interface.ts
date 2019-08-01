import {RegisterModel} from '../../login/model/register.model';

export interface AuthProviderInterface {
  currentUserValue(): any;

  login(username: string, password: string);

  facebookLogin(accessToken: string);

  logout();

  register(model: RegisterModel);
}
