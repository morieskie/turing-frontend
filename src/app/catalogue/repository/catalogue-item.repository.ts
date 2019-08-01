import {RepositoryInterface} from '../../api/interface/RepositoryInterface';
import {Inject} from '@angular/core';
import {CatalogueItemProvider} from '../../app.config';
import {CatalogueItem, CatalogueItemInterface} from '../model/catalogue-item';
import {CatalogueItemProviderInterface} from '../interface/catalogue-item-provider.interface';

export class CatalogueItemRepository implements RepositoryInterface {
  public model: Promise<CatalogueItemInterface> = Promise.resolve<CatalogueItemInterface>(null);

  constructor(@Inject(CatalogueItemProvider) private provider: CatalogueItemProviderInterface) {
  }

  public collection(filters?: {}): Promise<any> {
    return this.provider.collection(filters);
  }

  /**
   * Create Catalogue
   */
  public create(model: CatalogueItem): Promise<CatalogueItemInterface> {
    return this.model = this.provider.create(model);
  }

  /**
   * View Catalogue
   */
  public show(id: string | number): Promise<CatalogueItem> {
    return this.model = this.provider.show(id);
  }

  /**
   * Update Catalogue
   */
  public update(id: string | number, model: CatalogueItem): Promise<boolean> {
    return this.provider.update(id, model);
  }

  /**
   * Delete Catalogue
   */
  public remove(id: string | number): Promise<boolean> {
    return this.provider.remove(id);
  }

  public reviewProduct(id: string | number, data: { rating: number; review: string }): Promise<any> {
    return this.provider.reviewProduct(id, data);
  }

  /**
   * View Catalogue
   */
  public getAttributes(id: string | number): Promise<{ sizes: { key: number, value: any }[], colors: { key: number, value: any }[] }> {
    return this.provider.getAttributes(id);
  }
}
