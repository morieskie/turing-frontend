import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
    templateUrl: './template/order-tracking.component.html',
    styleUrls: []
})
export class OrderTrackingComponent implements OnInit, OnDestroy {

    constructor(protected router: Router) {
    }

    ngOnInit(): void {
    }

    ngOnDestroy(): void {
    }

    onSubmit() {
    }
}
