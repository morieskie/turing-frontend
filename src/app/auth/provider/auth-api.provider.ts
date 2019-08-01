import {AuthProviderInterface} from '../interface/auth-provider.interface';
import {RestService} from '../../api/Rest.service';
import {RegisterModel} from '../../login/model/register.model';

export class AuthApiProvider implements AuthProviderInterface {

  public endpoint = 'customers';

  constructor(private client: RestService) {
  }

  login(username: string, password: string) {
    return new Promise((resolve, reject) => {
      this.client
        .create(`${this.endpoint}/login`, {
          email: username,
          password
        })
        .subscribe(response => {
          const data: { customer: { schema: object }, accessToken: string } = response;
          resolve(data);
        }, error => reject(error));
    });
  }

  facebookLogin(accessToken: string) {
    return new Promise((resolve, reject) => {
      this.client
        .create(`${this.endpoint}/facebook`, {access_token: accessToken})
        .subscribe(response => {
          const data: { customer: { schema: object }, accessToken: string } = response;
          resolve(data);
        }, error => reject(error));
    });
  }

  register(model: RegisterModel) {
    return new Promise((resolve, reject) => {
      this.client
        .create(`${this.endpoint}`, model.toSnakeCase(true))
        .subscribe(response => {
          const data: { customer: object, accessToken: string } = response;
          resolve(data);
        });
    });
  }

  currentUserValue(): any {
  }

  logout() {
  }

}
