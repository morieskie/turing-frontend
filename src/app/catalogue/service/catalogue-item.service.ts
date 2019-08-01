import {Injectable} from '@angular/core';
import {CatalogueItemRepository} from '../repository/catalogue-item.repository';
import {CatalogueItem, CatalogueItemInterface} from '../model/catalogue-item';

@Injectable()
export class CatalogueItemService {
  public model: CatalogueItemInterface;
  public models: CatalogueItemInterface[];

  constructor(private repository: CatalogueItemRepository) {
  }

  public getCollection(filters?: {}): Promise<any> {
    return this.repository.collection(filters)
      .then(response => this.models = response);
  }

  public create(model: CatalogueItem): CatalogueItemInterface {
    this.repository
      .create(model)
      .then(result => this.model = result);
    return this.model;
  }

  public show(id: string | number): Promise<CatalogueItem> {
    return this.repository
      .show(id)
      .then(result => this.model = result);
  }

  public update(id: string | number, model: CatalogueItem): Promise<boolean> {
    return this.repository.update(id, model);
  }

  public remove(id: string | number): Promise<boolean> {
    return this.repository.remove(id);
  }

  public reviewProduct(id: string | number, data: { rating: number; review: string }): Promise<any> {
    return this.repository.reviewProduct(id, data);
  }

  public getAttributes(id: string | number): Promise<{ sizes: { key: number, value: any }[], colors: { key: number, value: any }[] }> {
    return this.repository
      .getAttributes(id)
      .then(result => {
        return result;
      });
  }
}
