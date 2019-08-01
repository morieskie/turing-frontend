import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {OrderService} from './service/order.service';
import {OrderRepository} from './repository/order.repository';
import {OrderComponent} from './order.component';
import {OrderRoutingModule} from './order-routing.module';
import {OrderItemService} from './service/order-item.service';
import {OrderItemRepository} from './repository/order-item.repository';
import {OrderItemComponent} from './order-item.component';
import {OrderSummaryComponent} from './order-summary.component';
import {OrderTrackingComponent} from './order-tracking.component';
import {OrderDetailsModalComponent} from './order-details-modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    OrderRoutingModule
  ],
  exports: [
    OrderItemComponent,
    OrderSummaryComponent,
    OrderDetailsModalComponent
  ],
  declarations: [
    OrderComponent,
    OrderItemComponent,
    OrderSummaryComponent,
    OrderTrackingComponent,
    OrderDetailsModalComponent
  ],
  providers: [
    OrderService,
    OrderItemService,
    OrderRepository,
    OrderItemRepository,
  ]
})

export class OrderModule {
}
