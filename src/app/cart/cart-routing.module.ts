import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CartComponent} from './cart.component';
import {CartItemComponent} from './cart-item.component';

const cartRoutes: Routes = [
  {
    path: 'cart',
    component: CartComponent,
    children: [
      {
        path: '',
        children: [
          {
            path: 'cart/:cartId/items',
            component: CartItemComponent
          },
        ]
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(cartRoutes)
  ],
  exports: [
    RouterModule
  ],
  providers: [
    CartComponent,
    CartItemComponent
  ]
})
export class CartRoutingModule {
}
