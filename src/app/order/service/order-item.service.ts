import {Injectable} from '@angular/core';
import {OrderItem} from '../model/order-item';
import {OrderItemRepository} from '../repository/order-item.repository';

@Injectable()
export class OrderItemService {

    public item: OrderItem;
    public items: OrderItem[];

    constructor(private repository: OrderItemRepository) {
        /*this.getCollection().then(response => {
            this.items = response;
        });*/
    }

    public getCollection(): Promise<OrderItem[]> {
        return this.repository.collection()
            .then(response => this.items = response);
    }

    public create(model: OrderItem): Promise<OrderItem> {
        return this.repository.create(model)
            .then(response => {
                this.item = response;
                return response;
            });
    }

    public getRepository(): OrderItemRepository {
        return this.repository;
    }
}
