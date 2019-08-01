import {Injectable, OnDestroy} from '@angular/core';
import {Subject} from 'rxjs';
import {Observable} from 'rxjs';
import {Subscription} from 'rxjs';

@Injectable()
export class ThrobberService implements OnDestroy {
    public isLoading: Subject<boolean> = new Subject<boolean>();
    public subscription: Subscription;
    public _STATE: boolean;

    constructor() {
        this.subscription = this.getObservableThrobber().subscribe(next => this._STATE = next);
        this.isLoading.next(false);
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    get state(): boolean {
        return this._STATE;
    }

    public getObservableThrobber(): Observable<boolean> {
        return this.isLoading.asObservable();
    }

    public activate() {
        this.isLoading.next(true);
    }

    public deActivate() {
        this.isLoading.next(false);
    }
}
