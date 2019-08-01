import {CustomerProviderInterface} from '../interface/customer-provider.interface';
import {CustomerProvider} from '../../app.config';
import {Inject, Injectable} from '@angular/core';
import {Customer} from '../model/customer';

@Injectable()
export class CustomerRepository {
    public model: Promise<Customer> = Promise.resolve<Customer>(null);

    constructor(@Inject(CustomerProvider) private provider: CustomerProviderInterface) {
    }

    public get collection(): Promise<Customer[]> {
        return this.provider.collection();
    }

    /**
     * Create Customer
     */
    public create(model: Customer): Promise<Customer> {
        return this.model = this.provider.create(model);
    }

    /**
     * View Customer
     */
    public show(id: string | number): Promise<Customer> {
        return this.model = this.provider.show(id);
    }

    /**
     * Update Customer
     */
    public update(id: string | number, model: Customer): Promise<Customer> {
        return this.provider.update(id, model);
    }

    /**
     * Delete Customer
     */
    public remove(id: string | number): Promise<boolean> {
        return this.provider.remove(id);
    }
}
