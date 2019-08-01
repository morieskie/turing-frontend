import {CatalogueItem, CatalogueItemInterface} from '../model/catalogue-item';

export interface CatalogueItemProviderInterface {
  collection(filters?: {}): Promise<CatalogueItemInterface[]>;

  /**
   * Create CatalogueItem
   */
  create(model: CatalogueItem): Promise<CatalogueItemInterface>;

  /**
   * View cartItem
   */
  show(id: string | number): Promise<CatalogueItem>;

  /**
   * Update CatalogueItem
   */
  update(id: string | number, model: CatalogueItemInterface): Promise<boolean>;

  /**
   * Delete CatalogueItem
   */
  remove(id?: string | number): Promise<boolean>;

  /**
   * Review CatalogueItem
   */
  reviewProduct(id: string | number, data: { rating: number; review: string }): Promise<boolean>;

  getAttributes(id: string | number): Promise<{ sizes: Array<{ key: number, value: any }>, colors: Array<{ key: number, value: any }> }>;
}
