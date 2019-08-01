export class LoginModel {
  [x: string]: any;

  get remember(): boolean {
    return this._remember;
  }

  set remember(value: boolean) {
    this._remember = value;
  }

  get email(): string {
    return this._email;
  }

  set email(value: string) {
    this._email = value;
  }

  get password(): string {
    return this._password;
  }

  set password(value: string) {
    this._password = value;
  }
}
