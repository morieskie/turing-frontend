import {Component, OnInit} from '@angular/core';
import {OrderItem} from './model/order-item';
import {OrderService} from './service/order.service';
import {Order} from './model/order';
import {ActivatedRoute} from '@angular/router';

@Component({
    templateUrl: './template/order.component.html'
})
export class OrderComponent implements OnInit {

    public model: Order;
    public items: OrderItem[];

    constructor(private service: OrderService, private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.service.getOrder(this.route.snapshot.paramMap.get('orderId')).then(response => {
            const model: Order = Order.transformResponse(response);
            this.model = model;
            this.items = model.items.map(data => OrderItem.transformResponse(data));
        });
    }


    public onSubmit() {

    }

}
