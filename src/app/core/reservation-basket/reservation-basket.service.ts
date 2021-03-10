import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Store } from '@ngrx/store';
import { OnAppStable } from 'src/app/core/app-stable-initializer/on-app-stable';
import { AppState } from 'src/app/core/shop/store';
import { Observable } from 'rxjs';
import { first, map, tap } from 'rxjs/operators';
import { AddOrUpdateParam } from './add-or-update-param';
import { ReservationBasketApiService } from './reservation-basket-api.service';
import { RESERVATION_BASKET_ACTIONS, RESERVATION_BASKET_POLLING_INTERVAL, selectStoreId } from './state';

@Injectable({ providedIn: 'root' })
export class ReservationBasketService implements OnAppStable {
  private readonly isBrowser: boolean;

  constructor(
    private store: Store<AppState>,
    private reservationBasketApiService: ReservationBasketApiService,
    @Inject(PLATFORM_ID) platformId: object,
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  public onAppStable(): void {
    if (!this.isBrowser) {
      return;
    }
    this.dispatchGetBasket();
    this.dispatchStartBasketPolling();
  }

  public addOrUpdateItem(addOrUpdateParam: AddOrUpdateParam): Observable<boolean> {
    return this.store.select(selectStoreId).pipe(
      first(),
      map(storeId => storeId == null || storeId === addOrUpdateParam.storeId),
      tap(isStoreIdOkay => {
        return isStoreIdOkay ? this.store.dispatch(RESERVATION_BASKET_ACTIONS.addOrUpdate(addOrUpdateParam)) : false;
      }),
    );
  }

  private dispatchGetBasket() {
    this.store.dispatch(RESERVATION_BASKET_ACTIONS.getBasket());
  }

  private dispatchStartBasketPolling() {
    this.store.dispatch(RESERVATION_BASKET_ACTIONS.startPolling(RESERVATION_BASKET_POLLING_INTERVAL));
  }

  updateItemQuantity(id: number, quantity: number) {
    console.log('updateItemQuantity called');
  }

  deleteItem(id: number) {
    console.log('deleteItem called');
  }
}
