import {Order} from '../model/order';

export interface OrderProviderInterface {
    collection(): Promise<Order[]>;
    /**
     * Create Order
     * @param {Order} order
     * @returns {Promise<Order>}
     */
    create(order: Order): Promise<Order>;

    /**
     * View order
     * @param {string | number} id
     * @returns {Promise<Order>}
     */
    show(id: string | number): Promise<Order>;

    /**
     * Update Order
     * @param {string | number} id
     * @param {Order} order
     * @returns {Promise<boolean>}
     */
    update(id: string | number, order: Order): Promise<boolean>;

    /**
     * Delete Order
     * @param {string | number} id
     * @returns {Promise<boolean>}
     */
    remove(id: string | number): Promise<boolean>;
}
