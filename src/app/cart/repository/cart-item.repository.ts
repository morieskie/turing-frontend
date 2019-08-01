import {Inject, Injectable} from '@angular/core';
import {CartItem} from '../model/cart-item';

import {CartItemProviderInterface} from '../interface/cart-item-provider.interface';
import {CartItemProvider} from '../../app.config';
import {RepositoryInterface} from '../interface/RepositoryInterface';

@Injectable()
export class CartItemRepository implements RepositoryInterface {

    public items: CartItem[];
    public model: Promise<CartItem>;

    constructor(@Inject(CartItemProvider) private provider: CartItemProviderInterface) {
        console.log('CartItemRepository::constructor called');
    }

    collection(modelId?: string | number): Promise<CartItem[]> {
        if (typeof modelId === 'undefined') {
            throw Error('Cart Id not defined');
        }
        return this.provider.collection(modelId);
    }

    create(model: CartItem): Promise<CartItem[]> {
        return this.provider.create(model);
    }

    show(id: string | number): Promise<CartItem> {
        return undefined;
    }

    update(id: string | number, model: CartItem): Promise<boolean> {
        return this.provider.update(id, model);
    }

    remove(id: string | number): Promise<boolean> {
        return this.provider.remove(id);
    }
}
