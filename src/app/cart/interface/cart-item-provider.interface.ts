import {CartItem} from '../model/cart-item';

export interface CartItemProviderInterface {
    collection(modelId?: string | number): Promise<CartItem[]>;

    /**
     * Create CartItem
     */
    create(model: CartItem): Promise<CartItem[]>;

    /**
     * View cartItem
     */
    show(id: string | number): Promise<CartItem>;

    /**
     * Update CartItem
     */
    update(id: string | number, model: CartItem): Promise<boolean>;

    /**
     * Delete CartItem
     */
    remove(id: string | number): Promise<boolean>;
}
