import {Inject, Injectable, OnInit} from '@angular/core';
import {OrderItem} from '../model/order-item';

import {OrderItemProviderInterface} from '../interface/order-item-provider.interface';
import {OrderItemProvider} from '../../app.config';
import {RepositoryInterface} from '../../cart/interface/RepositoryInterface';

@Injectable()
export class OrderItemRepository implements RepositoryInterface, OnInit {

    public items: OrderItem[];
    public model: Promise<OrderItem>;

    constructor(@Inject(OrderItemProvider) private provider: OrderItemProviderInterface) {
        console.info('OrderItemRepository::constructor called');
    }

    collection(): Promise<OrderItem[]> {
        return this.provider.collection();
    }

    create(model: OrderItem): Promise<OrderItem> {
        return this.provider.create(model);
    }

    show(id: string | number): Promise<OrderItem> {
        return undefined;
    }

    update(id: string | number, model: OrderItem): Promise<boolean> {
        return this.provider.update(model.orderId, id, model);
    }

    remove(id: string | number): Promise<boolean> {

        return this.provider.remove(this.items[0].orderId, id);
    }

    ngOnInit(): void {
    }
}
