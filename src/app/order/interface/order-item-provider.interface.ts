import {OrderItem} from '../model/order-item';

export interface OrderItemProviderInterface {
    collection(): Promise<OrderItem[]>;

    /**
     * Create OrderItem
     * @param {OrderItem} model
     * @returns {Promise<OrderItem>}
     */
    create(model: OrderItem): Promise<OrderItem>;

    /**
     * View orderItem
     * @param orderId
     * @param {string | number} id
     * @returns {Promise<OrderItem>}
     */
    show(orderId: string, id: string | number): Promise<OrderItem>;

    /**
     * Update OrderItem
     * @param orderId
     * @param {string | number} id
     * @param {OrderItem} model
     * @returns {Promise<boolean>}
     */
    update(orderId: string | number, id: string | number, model: OrderItem): Promise<boolean>;

    /**
     * Delete OrderItem
     * @param orderId
     * @param {string | number} id
     * @returns {Promise<boolean>}
     */
    remove(orderId: string | number, id: string | number): Promise<boolean>;
}
