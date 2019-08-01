import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {CustomerService} from '../service/customer.service';
import {OrderService} from '../../order/service/order.service';

@Injectable()
export class CustomerGuard implements CanActivate {
    constructor(public customerService: CustomerService, private orderService: OrderService, public router: Router) {
        this.orderService.getCurrentOrder().then(response => {
            if (typeof response.orderId !== 'undefined') {
                this.orderService.refreshOrder(response.orderId);
            }
        });
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        console.log('CustomerGuardService#canActivate called');
        const url: string = state.url;
        console.log(url);
        this.orderService.getCurrentOrder().then(response => {
            if (typeof response.orderId !== 'undefined' && response.status !== 158) {
                // this.router.navigate(['/checkout/order/' + response.orderId]);
            }
        });
        return this.hasConfirmed(url);
    }

    hasConfirmed(url: string): boolean {
        const response = false;

        this.customerService.redirectUrl = url;

        // if (this.customerService.hasConfirmed) {
        //     return true;
        // }

        // this.router.navigate(['/customer']);
        //
        return response;
    }
}
