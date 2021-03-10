import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { concat, Observable, of } from 'rxjs';
import { map, switchMap, take, takeLast, takeWhile, tap } from 'rxjs/operators';
import { BasketPlusProductService } from './basket-plus-product.service';
import { PlusProductCalcThresholdService } from './plus-product-calc-threshold/plus-product-calc-threshold.service';
import { PlusProductThresholdDialogService } from './plus-product-threshold-dialog.service';
import { PlusProductThresholdProcessResult } from './plus-product-threshold-process-result';
import { CheckoutService } from 'src/app/core/services/checkout/checkout.service';
import { ShopService } from 'src/app/core/services/shop.service';
import { AppState } from 'src/app/core/shop/store';
import { BasketService, selectBasketItemsCount } from 'src/app/core/basket';

@Injectable({ providedIn: 'root' })
export class DepotCheckoutService extends CheckoutService {
  private hasBasketItems$: Observable<boolean>;

  constructor(
    shopService: ShopService,
    private calcThresholdService: PlusProductCalcThresholdService,
    private thresholdDialogService: PlusProductThresholdDialogService,
    store: Store<AppState>,
    private translateService: TranslateService,
    private basketService: BasketService,
    private plusProductService: BasketPlusProductService,
  ) {
    super(shopService);
    this.hasBasketItems$ = store.select(selectBasketItemsCount).pipe(map(count => count > 0));
  }

  public basketHandoverToCheckout(isMobile: boolean) {
    this.calcThresholdService
      .isBasketThresholdReached$()
      .pipe(
        take(1),
        switchMap(isThresholdReached =>
          isThresholdReached
            ? of(PlusProductThresholdProcessResult.GOTO_CHECKOUT)
            : this.startThresholdNotReachedProcess(isMobile),
        ),
        tap(processResult =>
          processResult === PlusProductThresholdProcessResult.GOTO_CHECKOUT
            ? super.basketHandoverToCheckout(isMobile)
            : '',
        ),
      )
      .subscribe();
  }

  private startThresholdNotReachedProcess(isMobile: boolean): Observable<PlusProductThresholdProcessResult> {
    return this.plusProductService.hasNormalBasketItems$.pipe(
      switchMap(hasNormalBasketItems =>
        !hasNormalBasketItems
          ? of(PlusProductThresholdProcessResult.CANCEL_CHECKOUT)
          : this.thresholdDialogService.openDialog$(isMobile),
      ),
      switchMap(result =>
        result === PlusProductThresholdProcessResult.DELETE_PLUS_ITEMS_AND_PROCEED_TO_CHECKOUT
          ? this.deleteAllPlusItems$()
          : of(PlusProductThresholdProcessResult.CANCEL_CHECKOUT),
      ),
    );
  }

  private deleteAllPlusItems$(): Observable<PlusProductThresholdProcessResult> {
    const deleteOnePlusProductUntilAllDeleted$ = this.plusProductService.basketPlusProducts$.pipe(
      takeWhile(item => item.length > 0),
      tap(item => this.basketService.deleteItem(item[0].variant.id)),
    );
    const cancelCheckoutIfNoItemsLeftAfterDeleting$ = this.hasBasketItems$.pipe(
      take(1),
      map(hasItems =>
        hasItems ? PlusProductThresholdProcessResult.GOTO_CHECKOUT : PlusProductThresholdProcessResult.CANCEL_CHECKOUT,
      ),
    );

    return concat(deleteOnePlusProductUntilAllDeleted$, cancelCheckoutIfNoItemsLeftAfterDeleting$).pipe(
      takeLast(1),
    ) as Observable<PlusProductThresholdProcessResult>;
  }
}
