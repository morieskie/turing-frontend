import {DepartmentModel} from './department.model';

export class CategoryModel extends DepartmentModel {

  get categoryId(): number {
    return this._categoryId;
  }

  set categoryId(value: number) {
    this._categoryId = value;
  }
}
