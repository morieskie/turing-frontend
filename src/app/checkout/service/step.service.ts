import {Injectable} from '@angular/core';
import {StepInterface, StepModel} from '../model/step.model';
import {BehaviorSubject, Observable, Subject} from 'rxjs';

@Injectable()
export class StepService {
  public status: Subject<boolean> = new Subject<boolean>();
  public activeStep: BehaviorSubject<StepInterface> = new BehaviorSubject<StepInterface>(null);

  constructor(private model: StepModel) {

  }

  getSteps(): StepInterface[] {
    return this.model.steps;
  }

  public getStatus(): Observable<boolean> {
    return this.status;
  }

  public setStatus(value: boolean) {
    this.status.next(value);
  }

  public getActiveStep(): Observable<StepInterface> {
    return this.activeStep;
  }

  public setActiveStep(value: StepInterface) {
    value.active = true;
    this.activeStep.next(value);
  }
}
