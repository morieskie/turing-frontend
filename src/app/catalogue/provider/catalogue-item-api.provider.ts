import {Injectable} from '@angular/core';
import {RestService} from '../../api/Rest.service';
import {CatalogueItem} from '../model/catalogue-item';
import {CatalogueItemProviderInterface} from '../interface/catalogue-item-provider.interface';
import {DomSanitizer} from '@angular/platform-browser';
import {forkJoin} from 'rxjs';

@Injectable()
export class CatalogueItemApiProvider implements CatalogueItemProviderInterface {

  public endpoint = 'products';
  public attributesEndpoint = 'attributes/inProduct';
  public categoriesEndpoint = 'categories/inProduct';
  public model: Promise<CatalogueItem> = Promise.resolve<CatalogueItem>(null);
  public models: Promise<CatalogueItem[]> = Promise.resolve<CatalogueItem[]>(null);

  constructor(private client: RestService) {
  }

  collection(options?: any): Promise<any> {

    let endpoint: string = this.endpoint;

    if (options.hasOwnProperty('query_string')) {
      endpoint = `${endpoint}/search`;
    } else if (options.hasOwnProperty('category')) {
      endpoint = `${endpoint}/inCategory/${options.category}`;
    } else if (options.hasOwnProperty('department')) {
      endpoint = `${endpoint}/inDepartment/${options.department}`;
    }

    this.models = new Promise((resolve, reject) => {
      const httpParams: string[] = [];
      Object.keys(options).forEach(i => httpParams[i] = options[i]);
      this.client
        .get(`${endpoint}`, null, httpParams)
        .subscribe(response => {

          response.rows = response.rows.map((item) => new CatalogueItem(item));
          resolve(response);
        }, error => reject(error));
    });

    return this.models;
  }

  /**
   *
   */
  public create(model: CatalogueItem): Promise<CatalogueItem> {
    this.client
      .create(`${this.endpoint}`, model)
      .subscribe(response => {
        const data: CatalogueItem = response;
        this.model = Promise.resolve(data);
      });

    return this.model;
  }

  /**
   * View catalogue
   */
  public show(id: string | number): Promise<CatalogueItem> {
    this.model = new Promise<CatalogueItem>((resolve, reject) => {
      const product = this.client.get(`${this.endpoint}/${id}`);
      const attributes = this.client.get(`${this.attributesEndpoint}/${id}`);
      const categories = this.client.get(`${this.categoriesEndpoint}/${id}`);
      const reviews = this.client.get(`${this.endpoint}/${id}/reviews`);

      forkJoin([product, attributes, categories, reviews]).subscribe(response => {
        const model: CatalogueItem = new CatalogueItem(response[0]);
        const sizes: Array<{ key: string, value: any }> = [];
        const colors: Array<{ key: string, value: any }> = [];
        const productCategories: Array<{ categoryId: string, name: string }> = [];

        response[1].forEach(item => {
          if (item.attribute_name.toLowerCase() === 'size') {
            sizes.push({
              key: item.attribute_value_id, value: item.attribute_value
            });
          } else if (item.attribute_name.toLowerCase() === 'color') {
            colors.push({
              key: item.attribute_value_id, value: item.attribute_value
            });
          }
        });

        response[2].forEach(item => {
          productCategories.push({
            categoryId: item.category_id, name: item.name
          });
        });

        model.colors = colors;
        model.sizes = sizes;
        model.categories = productCategories;
        model.reviews = response[3];
        console.log('TRANSFORMED CATALOG', model);
        resolve(model);
      }, error => {
        console.log(error);
        reject(error);
      });
    });

    return this.model;
  }

  /**
   * Update Catalogue
   */
  public update(id: string | number, model: CatalogueItem): Promise<boolean> {

    return new Promise((resolve, reject) => {
      this.client
        .update(`${this.endpoint}/${id}`, model)
        .subscribe(response => {
          const data: CatalogueItem = response.body.data;
          let result = false;
          if (data) {
            result = true;
          }
          resolve(result);
        });

    });
  }

  /**
   * Delete Catalogue
   */
  public remove(id: string | number): Promise<boolean> {

    return new Promise((resolve, reject) => {
      this.client
        .delete(`${this.endpoint}/${id}`)
        .subscribe(response => {
          let result = false;
          if (response) {
            result = true;
          }
          resolve(result);
        });

    });
  }

  public reviewProduct(id: string | number, model: { rating: number; review: string }): Promise<any> {

    return new Promise((resolve, reject) => {
      try {
        this.client
          .create(`${this.endpoint}/${id}/reviews`, model)
          .subscribe(() => {
            this.client.get(`${this.endpoint}/${id}/reviews`)
              .subscribe(result => {
                resolve(result);
              });
          });
      } catch (e) {
        reject(e);
      }

    });
  }

  /**
   * View catalogue
   */
  public getAttributes(id: string | number): Promise<{ sizes: { key: number, value: any }[], colors: { key: number, value: any }[] }> {
    return new Promise<{ sizes: { key: number, value: any }[], colors: { key: number, value: any }[] }>((resolve, reject) => {
      this.client.get(`${this.attributesEndpoint}/${id}`).subscribe(response => {
        const sizes: { key: number, value: any }[] = new Array<{ key: number, value: any }>();
        const colors: Array<{ key: number, value: any }> = new Array<{ key: number, value: any }>();

        response.forEach(item => {
          if (item.attribute_name.toLowerCase() === 'size') {
            sizes.push({
              key: item.attribute_value_id, value: item.attribute_value
            });
          } else if (item.attribute_name.toLowerCase() === 'color') {
            colors.push({
              key: item.attribute_value_id, value: item.attribute_value
            });
          }
        });
        resolve({sizes, colors});
      }, error => {
        console.log(error.message);
        reject(error);
      });
    });
  }
}
