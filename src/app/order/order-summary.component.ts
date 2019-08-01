import {Component, Input, OnInit} from '@angular/core';
import {Order} from './model/order';

@Component({
    selector: 'app-order-summary',
    templateUrl: './template/order-summary.component.html',
    styleUrls: [
    ]
})
export class OrderSummaryComponent implements OnInit {
    @Input()
    public model: Order;

    constructor() {
    }

    ngOnInit(): void {
    }
}
