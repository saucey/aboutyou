import { Injectable } from '@angular/core';
import { createSelector, MemoizedSelector, Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { selectBasketItems, selectMappedBasketItems } from 'src/app/core/basket';
import { ShopService } from 'src/app/core/services/shop.service';
import { AppState } from 'src/app/core/shop/store';
import { IBasketListItem } from 'src/app/core/shop/types';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * This service provides access to the basket plus product state
 */
@Injectable({ providedIn: 'root' })
export class BasketPlusProductService {
  private readonly plusProducts$: Observable<IBasketListItem[]>;
  private readonly hasOthers$: Observable<boolean>;

  constructor(shopService: ShopService, translateService: TranslateService, private store: Store<AppState>) {
    const selectPlusProducts = createSelector(
      selectMappedBasketItems(shopService.getShop().shop.currency, translateService),
      items => items.filter(item => item.mappedProduct.custom.isPlus),
    );
    this.plusProducts$ = this.store.select(selectPlusProducts);

    this.hasOthers$ = this.store.select(
      createSelector(
        selectPlusProducts,
        selectBasketItems,
        (plusItems, allItems) => allItems.length - plusItems.length > 0,
      ),
    );
  }

  get basketPlusProducts$(): Observable<IBasketListItem[]> {
    return this.plusProducts$;
  }

  get hasPlusProducts$(): Observable<boolean> {
    return this.plusProducts$.pipe(map(plusProducts => plusProducts.length > 0));
  }

  get hasNormalBasketItems$(): Observable<boolean> {
    return this.hasOthers$;
  }
}
