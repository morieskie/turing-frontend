import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Customer} from './model/customer';
import {CustomerService} from './service/customer.service';
import {Router} from '@angular/router';

@Component({
    templateUrl: './template/customer-tickets.component.html',
    styleUrls: []
})
export class CustomerTicketsComponent implements OnInit, OnDestroy {

    @Input()
    public model: Customer;

    constructor(protected service: CustomerService, protected router: Router) {
    }

    ngOnInit(): void {
    }

    ngOnDestroy(): void {
    }

    onSubmit() {
    }
}
