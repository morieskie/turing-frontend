import {Injectable} from '@angular/core';
import {RestService} from '../../api/Rest.service';
import {TaxModel} from '../model/tax.model';
import {BehaviorSubject, Observable, of} from "rxjs";

@Injectable()
export class TaxService {
  public taxObservable: BehaviorSubject<TaxModel> = new BehaviorSubject<TaxModel>(new TaxModel());

  constructor(private client: RestService) {

  }

  getTax(): Promise<TaxModel> {
    return new Promise<TaxModel>((resolve, reject) => {
      this.client.get(`tax/1`)
        .subscribe(response => resolve(new TaxModel(response)), error => reject(error));
    });
  }

  setTax(value: TaxModel) {
    this.taxObservable.next(value);
  }

  getTaxObservable() {
    return this.taxObservable.asObservable();
  }
}
