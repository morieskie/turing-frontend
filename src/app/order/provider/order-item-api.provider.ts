import {Injectable} from '@angular/core';
import {OrderItemProviderInterface} from '../interface/order-item-provider.interface';
import {OrderItem} from '../model/order-item';
import {RestService} from '../../api/Rest.service';

@Injectable()
export class OrderItemApiProvider implements OrderItemProviderInterface {

    public endpoint = 'orders';
    public model: Promise<OrderItem> = Promise.resolve<OrderItem>(null);

    constructor(private client: RestService) {
    }

    collection(): Promise<OrderItem[]> {
        return undefined;
    }

    /**
     *
     */
    public create(orderItem: OrderItem): Promise<OrderItem> {
        this.model = new Promise((resolve, reject) => {
            this.client
                .create(`${this.endpoint}/${orderItem.orderId}/items`, orderItem)
                .subscribe(response => {
                    const model: OrderItem = OrderItem.transformResponse(response.data);
                    resolve(model);
                }, error => reject(error));
        });

        return this.model;
    }

    /**
     */
    public show(orderId: string | number, id: string | number): Promise<OrderItem> {
        this.model = new Promise((resolve, reject) => {
            this.client
                .get(`${this.endpoint}/${orderId}/items/${id}`)
                .subscribe(response => {
                    const model: OrderItem = OrderItem.transformResponse(response.data);
                    resolve(model);
                }, error => reject(error));
        });

        return this.model;
    }

    /**
     * Update OrderItem
     * @param orderId
     * @param {string | number} id
     * @param orderItem
     * @returns {Promise<boolean>}
     */
    public update(orderId: string | number, id: string | number, orderItem: OrderItem): Promise<boolean> {
        return new Promise((resolve, reject) => {
            this.client
                .update(`${this.endpoint}/${orderItem.orderId}/items/${id}`, orderItem)
                .subscribe(response => {
                    let result = false;
                    if (response) {
                        result = true;
                    }
                    resolve(result);
                }, error => reject(error));
        });
    }

    /**
     * Delete Order Item
     * @param {string | number} orderId
     * @param {string | number} id
     * @returns {Promise<boolean>}
     */
    public remove(orderId: string | number, id: string | number): Promise<boolean> {
        return new Promise((resolve, reject) => {
            this.client
                .delete(`${this.endpoint}/${orderId}/items/${id}`)
                .subscribe(response => {
                    let result = false;
                    if (response) {
                        result = true;
                    }
                    resolve(result);
                });
        });
    }
}
