import {Injectable} from '@angular/core';
import {OrderItemProviderInterface} from '../interface/order-item-provider.interface';
import {OrderItem} from '../model/order-item';
import {LocalStorageProvider} from '../../storage/provider/local-storage-provider.service';

@Injectable()
export class OrderItemLocalStorageProvider implements OrderItemProviderInterface {

    public model: Promise<OrderItem> = Promise.resolve<OrderItem>(null);

    constructor(private storage: LocalStorageProvider) {
    }

    collection(): Promise<OrderItem[]> {
        return this.storage.getItem('orderItems', []);
    }

    /**
     * Create orderItem
     */
    public create(model: OrderItem): Promise<OrderItem> {
        return this.storage.setItem('orderItems', []);
    }

    /**
     */
    public show(orderId: string | number, id: string | number): Promise<OrderItem> {
        return this.storage.getItem('orderItems', this.model);
    }

    /**
     */
    public update(orderId: string | number, id: string | number, model: OrderItem): Promise<boolean> {
        return this.storage.setItem('orderItems', model);
    }

    /**
     */
    public remove(orderId: string | number, id: string | number): Promise<boolean> {
        return this.storage.removeItem('orderItems');
    }
}
