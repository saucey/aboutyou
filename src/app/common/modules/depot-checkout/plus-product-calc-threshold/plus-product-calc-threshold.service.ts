import { BapiPrice } from '@aboutyou/backbone/types/BapiProduct';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectBasketCost } from 'src/app/core/basket';
import { ShopService } from 'src/app/core/services/shop.service';
import { AppState } from 'src/app/core/shop/store';
import { Observable, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { BasketPlusProductService } from '../basket-plus-product.service';

export const PLUS_PRODUCT_EUR_THRESHOLD = 2900;
export const PLUS_PRODUCT_OTHER_THRESHOLD = 4500;

@Injectable({ providedIn: 'root' })
export class PlusProductCalcThresholdService {
  private readonly isThresholdReached$: Observable<boolean>;
  private readonly costUntilThresholdReached$: Observable<number>;

  constructor(private shopService: ShopService, store: Store<AppState>, plusProductService: BasketPlusProductService) {
    const basketCost$: Observable<BapiPrice> = store.select(selectBasketCost);

    this.costUntilThresholdReached$ = plusProductService.hasPlusProducts$.pipe(
      switchMap(hasPlusItem =>
        hasPlusItem ? basketCost$.pipe(map(cost => this.plusProductThresholdCentAmount() - cost.withTax)) : of(0),
      ),
    );
    this.isThresholdReached$ = this.costUntilThresholdReached$.pipe(map(untilThreshold => untilThreshold <= 0));
  }

  plusProductThresholdCentAmount() {
    return this.shopService.getShop().shop.currency.code === 'EUR'
      ? PLUS_PRODUCT_EUR_THRESHOLD
      : PLUS_PRODUCT_OTHER_THRESHOLD;
  }

  isBasketThresholdReached$(): Observable<boolean> {
    return this.isThresholdReached$;
  }

  basketCostUntilThresholdReached$(): Observable<number> {
    return this.costUntilThresholdReached$;
  }
}
