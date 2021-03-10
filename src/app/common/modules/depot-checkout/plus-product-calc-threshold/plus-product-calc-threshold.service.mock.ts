import { Provider } from '@angular/core';
import { PlusProductCalcThresholdService } from './plus-product-calc-threshold.service';
import { BehaviorSubject, Observable } from 'rxjs';

export class PlusProductCalcThresholdMockService {
  private isBasketThresholdReachedSubject$: BehaviorSubject<boolean>;
  private basketCostUntilThresholdReachedSubject$: BehaviorSubject<number>;

  constructor() {
    this.isBasketThresholdReachedSubject$ = new BehaviorSubject<boolean>(true);
    this.basketCostUntilThresholdReachedSubject$ = new BehaviorSubject<number>(0);
  }

  setIsThresholdReached(isReached: boolean): void {
    this.isBasketThresholdReachedSubject$.next(isReached);
  }

  setBasketCostUntilThresholdReached(costTilThreshold: number): void {
    this.basketCostUntilThresholdReachedSubject$.next(costTilThreshold);
  }

  isBasketThresholdReached$(): Observable<boolean> {
    return this.isBasketThresholdReachedSubject$.asObservable();
  }

  basketCostUntilThresholdReached$(): Observable<number> {
    return this.basketCostUntilThresholdReachedSubject$.asObservable();
  }
}

export function createPlusProductCalcThresholdMock(): Provider {
  return {
    provide: PlusProductCalcThresholdService,
    useClass: PlusProductCalcThresholdMockService,
  };
}
