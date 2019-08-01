import {Injectable} from '@angular/core';

export interface StepInterface {
  label: string;
  complete: boolean;
  step: number;
  active: boolean;
  name: string;
  previous?: string;
  next?: string;
}

@Injectable()
export class StepModel {
  public collection: StepInterface[] = [
    {
      label: '4 Review',
      complete: false,
      step: 4,
      active: false,
      name: 'review',
      previous: 'payment',
      next: 'continue'
    },
    {
      label: '3 Payment',
      complete: false,
      step: 3,
      active: false,
      name: 'payment',
      previous: 'shipping',
      next: 'review'
    },
    {
      label: '2 Shipping',
      complete: false,
      step: 2,
      active: false,
      name: 'shipping',
      previous: 'address',
      next: 'payment'
    },
    {
      label: '1 Address',
      complete: false,
      step: 1,
      active: true,
      name: 'address',
      previous: 'cart',
      next: 'shipping'
    },
  ];

  public get steps(): StepInterface[] {
    return this.collection;
  }
}
