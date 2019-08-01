import {Component, Input, OnInit} from '@angular/core';
import {OrderItem} from './model/order-item';
import {OrderItemService} from './service/order-item.service';
import {ActivatedRoute} from '@angular/router';
import {OrderService} from './service/order.service';

@Component({
    selector: 'app-order-item',
    templateUrl: './template/order-item.component.html',
    styleUrls: [
    ]
})
export class OrderItemComponent implements OnInit {
    @Input()
    public items: OrderItem[] = [];

    constructor(private orderItemService: OrderItemService, private orderService: OrderService, private route: ActivatedRoute) {

    }

    ngOnInit(): void {
    }
}
