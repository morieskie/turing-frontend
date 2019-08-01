import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {CategoryService} from './service/category.service';
import {DepartmentService} from './service/department.service';
import {DepartmentModel} from './model/department.model';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-catalogue-sidebar-category-filter',
  templateUrl: './template/catalogue-sidebar-category.filter.component.html',
  styleUrls: [],
})
export class CatalogueSidebarCategoryFilterComponent implements OnInit, AfterViewInit {
  departments: DepartmentModel[];
  public department: number;
  public isDepartment: boolean = false;
  public isCategory: boolean = false;
  public category: number;

  constructor(private categoryService: CategoryService,
              public departmentService: DepartmentService,
              public route: ActivatedRoute) {

    this.route.queryParams.subscribe(params => {
      if (params.hasOwnProperty('department')) {
        this.department = params.department;
        this.isDepartment = params.hasOwnProperty('department');

      } else if (params.hasOwnProperty('category')) {
        this.category = params.category;
        this.isCategory = params.hasOwnProperty('category');
      }
    });
    this.departmentService.getDepartments().then(response => this.departments = response);
  }

  ngOnInit(): void {

      // @ts-ignore
      const k = $('.widget-categories .has-children > a');

      k.on('click', (b) => {
        // @ts-ignore
        if ($(b.target).parent().is('.expanded')) {
          k.parent().removeClass('expanded');
        } else {
          k.parent().removeClass('expanded');
          // @ts-ignore
          $(this).parent().addClass('expanded');
        }
      });
  }

  isExpanded(id: number) {
    // console.log('id', id);
    let expand = false;
    if (this.isDepartment) {
      // console.log('this.department', this.department);
      expand = String(this.department) === String(id);
    } else if (this.isCategory) {
      this.departments.forEach(item => {
        expand = false;
        if (item.items) {
          // console.log('this.category', this.category);
          expand = item.items
            .filter(i => String(i.categoryId) === String(this.category)).length > 0;
        }
      });
    }

    return expand;
  }

  ngAfterViewInit(): void {
  }

}
