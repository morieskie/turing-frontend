import {Injectable, OnDestroy} from '@angular/core';
import {Subject} from 'rxjs';
import {Observable} from 'rxjs';
import {Subscription} from 'rxjs';

@Injectable()
export class ReviewService implements OnDestroy {
  public reviews: Subject<[]> = new Subject<[]>();
  public subscription: Subscription;
  public _REVIEWS: Array<{ rating: number, review: string }>;

  constructor() {
    this.subscription = this.getObservableReviews().subscribe(next => {
      this._REVIEWS = next;
      console.log('got reviews', next.length);
    });
    this.reviews.next([]);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  get state(): Array<{ rating: number, review: string }> {
    return this._REVIEWS;
  }

  public getObservableReviews(): Observable<[]> {
    return this.reviews.asObservable();
  }

  public updateReviews(items: []) {
    this._REVIEWS = items;
    this.reviews.next(items);
  }

  public calculateWeightedAverageVote(data?) {
    const groups = [];
    let arr;

    arr = data ? data : this._REVIEWS;

    arr.forEach(item => {
      if (typeof groups[item.rating] === 'undefined') {
        groups[item.rating] = [];
        groups[item.rating].push(item);
      } else {
        groups[item.rating].push(item);
      }
    });
    let sum = 0;
    let count = 0;

    groups.forEach((items, key) => {
      // tslint:disable-next-line:radix
      sum += +key * items.length;
      count += items.length;
    });

    const response: number = sum / count;
    return (sum === 0 && count === 0) ? 0 : response;
  }
}
