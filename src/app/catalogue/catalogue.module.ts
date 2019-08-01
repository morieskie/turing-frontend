import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {CatalogueComponent} from './catalogue.component';
import {CatalogueService} from './service/catalogue.service';
import {CatalogueRepository} from './repository/catalogue.repository';
import {CatalogueRoutingModule} from './catalogue-routing.module';
import {CatalogueItemService} from './service/catalogue-item.service';
import {CatalogueItemComponent} from './catalogue-item.component';
import {CatalogueItemRepository} from './repository/catalogue-item.repository';
import {CatalogueSidebarComponent} from './catalogue-sidebar.component';
import {CatalogueSidebarBrandFilterComponent} from './catalogue-sidebar-brand.filter.component';
import {CatalogueSidebarCategoryFilterComponent} from './catalogue-sidebar-category.filter.component';
import {CatalogueSidebarSizeFilterComponent} from './catalogue-sidebar-size.filter.component';
import {CatalogueSidebarPriceRangeFilterComponent} from './catalogue-sidebar-price-range-filter.component';
import {CatalogueItemDetailComponent} from './catelogue-item-detail.component';
import {ProductGalleryComponent} from './product-gallery.component';
import {ProductInfoComponent} from './product-info.component';
import {ProductReviewComponent} from './product-review.component';
import {ReviewService} from './service/review.service';
import {PaginatorModule} from '../paginator/paginator.module';
import {CatalogueToolbarComponent} from './catalogue-toolbar.component';
import {CategoryService} from './service/category.service';
import {DepartmentService} from './service/department.service';
import {AttributeService} from './service/attribute.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CatalogueRoutingModule,
    PaginatorModule
  ],
  exports: [
    CatalogueItemComponent,
    CatalogueSidebarComponent,
    CatalogueSidebarPriceRangeFilterComponent,
    CatalogueSidebarBrandFilterComponent,
    CatalogueSidebarCategoryFilterComponent,
    CatalogueSidebarSizeFilterComponent,
    CatalogueItemDetailComponent,
    ProductGalleryComponent,
    ProductInfoComponent,
    ProductReviewComponent
  ],
  declarations: [
    CatalogueComponent,
    CatalogueItemComponent,
    CatalogueSidebarComponent,
    CatalogueSidebarPriceRangeFilterComponent,
    CatalogueSidebarBrandFilterComponent,
    CatalogueSidebarCategoryFilterComponent,
    CatalogueSidebarSizeFilterComponent,
    CatalogueItemDetailComponent,
    ProductGalleryComponent,
    ProductInfoComponent,
    ProductReviewComponent,
    CatalogueToolbarComponent
  ],
  providers: [
    CatalogueService,
    CatalogueRepository,
    CatalogueItemService,
    CatalogueItemRepository,
    ReviewService,
    CategoryService,
    DepartmentService,
    AttributeService
  ]
})

export class CatalogueModule {
}
