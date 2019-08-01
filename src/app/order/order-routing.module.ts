import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {OrderComponent} from './order.component';
import {OrderTrackingComponent} from './order-tracking.component';

const orderRoutes: Routes = [
  {
    path: 'order',
    component: OrderComponent
  },
  {
    path: 'order/:orderId/tracking',
    component: OrderTrackingComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(orderRoutes)
  ],
  exports: [
    RouterModule
  ],
  providers: [
    OrderComponent,
    OrderTrackingComponent
  ]
})
export class OrderRoutingModule {
}
