import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Customer} from './model/customer';
import {CustomerService} from './service/customer.service';
import {Router} from '@angular/router';

@Component({
    templateUrl: './template/customer-wishlist.component.html',
    styleUrls: []
})
export class CustomerWishlistComponent implements OnInit, OnDestroy {

    @Input()
    public model: Customer;

    constructor(protected service: CustomerService, protected router: Router) {
        console.log('CustomerComponent');
    }

    ngOnInit(): void {
    }

    ngOnDestroy(): void {
    }

    onSubmit() {
    }
}
