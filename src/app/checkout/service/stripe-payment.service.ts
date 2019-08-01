import {Injectable} from '@angular/core';
import {RestService} from '../../api/Rest.service';
import {BankCardModel} from '../model/bank-card.model';

@Injectable()
export class StripePaymentService {
  constructor(private client: RestService) {

  }

  createStripeToken(card: BankCardModel): Promise<{ stripeToken: string }> {
    return new Promise((resolve, reject) => {
      this.client.create(`stripe/token`, card)
        .subscribe(response => {
          resolve(response);
        }, error => reject(error));

    });
  }

  charge(model: any) {
    return new Promise((resolve, reject) => {
      this.client.create(`stripe/charge`, model)
        .subscribe(response => {
          resolve(response);
        }, error => reject(error));

    });
  }
}
