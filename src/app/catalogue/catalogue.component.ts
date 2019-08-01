import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable, of} from 'rxjs';
import {ThrobberService} from '../throbber/throbber.service';
import {DomSanitizer} from '@angular/platform-browser';
import {CatalogueItem} from './model/catalogue-item';
import {CatalogueService} from './service/catalogue.service';
import {CatalogueItemService} from './service/catalogue-item.service';
import * as Isotope from 'isotope-layout';
import {CartService} from '../cart/service/cart.service';
import {Cart} from '../cart/model/cart';


@Component({
  templateUrl: './template/catalogue.component.html',
  styleUrls: [],
})
export class CatalogueComponent implements OnInit, AfterViewInit {
  public items: Observable<CatalogueItem[] | any> = of([]);

  @Input()
  public model: CatalogueItem;
  public hasItems: Observable<boolean>;
  public totalItemsCount: Observable<number> = of(0);
  public currentPage: Observable<number>;
  public cart: Cart;
  public categoryId: number;
  public params: { [key: string]: any } = {};

  constructor(private route: ActivatedRoute,
              public router: Router,
              public catalogueItemService: CatalogueItemService,
              public cartService: CartService) {

    this.route.queryParams.subscribe(params => {
      this.params = {};
      Object.assign(this.params, params);
      const page = +params.page || 1;
      this.categoryId = +params.categoryId;
      this.currentPage = of(page);

      this.catalogueItemService.getCollection(this.params).then(result => {
        this.items = of(result.rows.map(item => new CatalogueItem(item)));
        this.hasItems = of(result.rows.length > 0);
        this.totalItemsCount = of(result.count);

        setTimeout(() => {
          this.initialiseGrid();
        }, 0);
      });
    });
  }

  ngOnInit(): void {

    this.cartService.getCurrentCart()
      .then(response => this.cart = response)
      .catch(() => this.cartService.create(new Cart())
        .then(response => this.cart = response));
  }

  onChangePage(page) {

    Object.assign(this.params, {page});
    return this.router.navigate(['catalogue'], {queryParams: this.params, queryParamsHandling: 'merge'})
      .then(() => {});
  }

  initialiseGrid() {

    // init Isotope
    const grid = document.querySelector('.isotope-grid');

    // @ts-ignore
    const iso = new Isotope(grid, {
      itemSelector: '.grid-item',
      transitionDuration: '0.7s',
      masonry: {columnWidth: '.grid-sizer', gutter: '.gutter-sizer'}
    });

    // @ts-ignore
    imagesLoaded(grid, () => {
      // layout Isotope after each image loads
      iso.layout();
    });
  }

  ngAfterViewInit(): void {
  }
}
