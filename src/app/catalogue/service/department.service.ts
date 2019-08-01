import {Injectable} from '@angular/core';
import {RestService} from '../../api/Rest.service';
import {DepartmentModel} from '../model/department.model';
import {forkJoin, Observable} from 'rxjs';
import {CategoryModel} from '../model/category.model';

@Injectable()
export class DepartmentService {
  constructor(private client: RestService) {
  }

  getDepartments(): Promise<DepartmentModel[]> {
    return new Promise((resolve, reject) => {
      this.client.get(`departments`)
        .subscribe(result => {
          const departments: DepartmentModel[] = result.map(item => new DepartmentModel(item));
          const bulk: Observable<CategoryModel[]>[] = departments.map(item => this.client
            .get(`categories/inDepartment/${item.departmentId}`));

          forkJoin(bulk).subscribe(response => {
            departments.forEach((item, index) => {
              item.items = response[index].map(subItem => new CategoryModel(subItem));
            });
          });
          resolve(departments);
        }, error => reject(error));
    });
  }
}
