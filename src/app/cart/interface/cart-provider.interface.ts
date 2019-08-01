import {Cart} from '../model/cart';

export interface CartProviderInterface {
  collection(): Promise<Cart[]>;

  /**
   * Create Cart
   */
  create(cart: Cart): Promise<Cart>;

  /**
   * View cart
   */
  show(id: string | number): Promise<Cart>;

  /**
   * Update Cart
   */
  update(id: string | number, cart: Cart): Promise<boolean>;

  /**
   * Delete Cart
   */
  remove(id: string | number): Promise<boolean>;

  /**
   * Generate unique identifier
   */
  generateUniqueId(): Promise<{cart_id: string}>;
}
