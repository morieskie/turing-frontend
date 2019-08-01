import {Component, OnInit} from '@angular/core';
import {AttributeService} from './service/attribute.service';
import {AttributeModel} from './model/attribute.model';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-catalogue-sidebar-size-filter',
  templateUrl: './template/catalogue-sidebar-size.filter.component.html',
  styleUrls: [],
})
export class CatalogueSidebarSizeFilterComponent implements OnInit {
  sizes: AttributeModel[] = [];
  selected: Array<any>;

  constructor(private attributeService: AttributeService, private router: Router,
              public route: ActivatedRoute) {

    this.route.queryParams.subscribe(params => {
      this.selected = params.size;
    });

    this.attributeService.getSizes().then(response => {
      this.sizes = response;
    });
  }

  ngOnInit(): void {
  }

  onFilterBySize(event) {
    const list: NodeList = event.target.form.querySelectorAll('input[type=checkbox]:checked');
    this.selected = Object.keys(list).map(item => list[item].value);
    return this.router.navigate([], {queryParams: {size: [this.selected]}, queryParamsHandling: 'merge'})
      .then(() => console.log('Price range applied'));
  }
}
