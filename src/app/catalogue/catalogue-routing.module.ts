import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CatalogueComponent} from './catalogue.component';
import {CatalogueService} from './service/catalogue.service';
import {CatalogueItemComponent} from './catalogue-item.component';
import {CatalogueItemDetailComponent} from './catelogue-item-detail.component';

const catalogueRoutes: Routes = [
  {
    path: '',
    component: CatalogueComponent,
  },
  {
    path: 'product/:productId',
    component: CatalogueItemDetailComponent,
  },
  {
    path: 'catalogue',
    component: CatalogueComponent,
    children: [
      {
        path: '',
        children: [
          {
            path: 'catalogue/:catalogueItemId',
            component: CatalogueItemComponent,
          },
        ]
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(catalogueRoutes)
  ],
  exports: [
    RouterModule
  ],
  providers: [
    CatalogueService
  ]
})
export class CatalogueRoutingModule {
}
