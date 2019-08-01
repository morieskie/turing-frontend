import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Customer} from './model/customer';
import {CustomerService} from './service/customer.service';
import {Router} from '@angular/router';
import {OrderService} from '../order/service/order.service';
import {Subscription} from 'rxjs';

@Component({
    templateUrl: './template/customer-tickets.component.html',
    styleUrls: []
})
export class CustomerTicketsComponent implements OnInit, OnDestroy {

    @Input()
    public model: Customer;

    public submitted = false;
    public subscription: Subscription;

    constructor(protected service: CustomerService, private orderService: OrderService, protected router: Router) {
    }

    ngOnInit(): void {
    }

    ngOnDestroy(): void {
    }

    onSubmit() {
    }
}