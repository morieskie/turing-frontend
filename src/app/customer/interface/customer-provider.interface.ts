import {Customer} from '../model/customer';

export interface CustomerProviderInterface {
    /**
     *
     */

    collection(): Promise<Customer[]>;
    /**
     * Create Customer
     */
    create(customer: Customer): Promise<Customer>;

    /**
     * View customer
     */
    show(id: string | number): Promise<Customer>;

    /**
     * Update Customer
     */
    update(id: string | number, customer: Customer): Promise<Customer>;

    /**
     * Delete Customer
     */
    remove(id: string | number): Promise<boolean>;
}
