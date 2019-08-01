import {CustomerProviderInterface} from '../interface/customer-provider.interface';
import {Customer} from '../model/customer';
import {Injectable} from '@angular/core';
import {RestService} from '../../api/Rest.service';

@Injectable()
export class CustomerApiProvider implements CustomerProviderInterface {

  public endpoint = 'customers';
  public model: Promise<Customer> = Promise.resolve<any>(null);
  public models: Promise<Customer[]> = Promise.resolve<Customer[]>(null);

  constructor(private client: RestService) {
  }

  /**
   *
   */
  public collection(): Promise<Customer[]> {
    this.client
      .get(`${this.endpoint}`)
      .subscribe(response => {
        this.models = Promise.resolve(response.body.data);
      });

    return this.models;
  }

  public create(model: Customer): Promise<Customer> {
    this.model = new Promise<Customer>((resolve, reject) => {
      this.client
        .create(`${this.endpoint}`, model)
        .subscribe(response => {
          console.log('CustomerApiProvider.create response:', response);
          const customer: Customer = new Customer(response.data);
          resolve(customer);
        }, (reason) => reject(reason));
    });

    return this.model;
  }

  /**
   * View customer
   */
  public show(id: string | number): Promise<Customer> {
    this.model = new Promise((resolve, reject) => {
      this.client
        .get(`${this.endpoint}/${id}?include=profile.entity,profile.contacts`)
        .subscribe(response => {
          const data: any = response.data;
          const model: Customer = Customer.transformResponse(data);
          resolve(model);
        }, (reason) => reject(reason));
    });

    return this.model;
  }

  /**
   * Update Customer
   */
  public update(id: string | number, model: Customer): Promise<Customer> {
    return new Promise((resolve, reject) => {
      this.client
        .update(`customer`, model.toSnakeCase(true))
        .subscribe(response => {
          resolve(new Customer(response));
        }, error => reject(error));
    });
  }

  /**
   * Delete Customer
   */
  public remove(id: string | number): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.client
        .delete(`${this.endpoint}/${id}`)
        .subscribe(response => {
          let result = false;
          if (response) {
            result = true;
          }
          resolve(result);
        }, error => reject(error));
    });
  }
}
