import {Inject, Injectable} from '@angular/core';
import {Order} from '../model/order';
import {OrderProviderInterface} from '../interface/order-provider.interface';
import {OrderProvider} from '../../app.config';
import {RepositoryInterface} from '../../cart/interface/RepositoryInterface';

@Injectable()
export class OrderRepository implements RepositoryInterface {
    public model: Promise<Order> = Promise.resolve<Order>(null);

    constructor(@Inject(OrderProvider) private provider: OrderProviderInterface) {
    }

    collection(): Promise<Order[]> {
        return this.provider.collection();
    }

    /**
     * Create Order
     */
    public create(model: Order): Promise<Order> {
        return this.model = this.provider.create(model);
    }

    /**
     * View order
     */
    public show(id: string | number): Promise<Order> {
        return this.model = this.provider.show(id);
    }

    /**
     * Update Order
     */
    public update(id: string | number, model: Order): Promise<boolean> {
        return this.provider.update(id, model);
    }

    /**
     * Delete Order
     * @returns {Promise<boolean>}
     */
    public remove(id: string | number): Promise<boolean> {
        return this.provider.remove(id);
    }
}
