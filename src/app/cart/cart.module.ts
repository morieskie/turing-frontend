import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {CartRoutingModule} from './cart-routing.module';
import {CartComponent} from './cart.component';
import {CartItemComponent} from './cart-item.component';
import {CartService} from './service/cart.service';
import {CartItemService} from './service/cart-item.service';
import {CartRepository} from './repository/cart.repository';
import {CartItemRepository} from './repository/cart-item.repository';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        CartRoutingModule
    ],
    declarations: [
        CartComponent,
        CartItemComponent
    ],
    providers: [
        CartService,
        CartItemService,
        CartRepository,
        CartItemRepository,
    ]
})

export class CartModule {
}
