import {Injectable} from '@angular/core';
import {RestService} from '../../api/Rest.service';
import {CategoryModel} from '../model/category.model';

@Injectable()
export class CategoryService {
  constructor(private client: RestService) {
  }

  getCategories(): Promise<CategoryModel[]> {
    return new Promise((resolve, reject) => {
      this.client.get(`categories`)
        .subscribe(result => resolve(result.data.map(item => new CategoryModel(item))), error => reject(error));
    });
  }
}
