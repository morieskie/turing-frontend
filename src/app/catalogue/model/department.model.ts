import {BaseModel} from '../../api/model/base.model';
import {CategoryModel} from "./category.model";

export class DepartmentModel extends BaseModel {

  get departmentId(): number {
    return this._departmentId;
  }

  set departmentId(value: number) {
    this._departmentId = value;
  }

  get name(): number {
    return this._name;
  }

  set name(value: number) {
    this._name = value;
  }

  get description(): number {
    return this._description;
  }

  set description(value: number) {
    this._description = value;
  }

  get items(): CategoryModel[] {
    return this._items;
  }

  set items(value: CategoryModel[]) {
    this._items = value;
  }
}
