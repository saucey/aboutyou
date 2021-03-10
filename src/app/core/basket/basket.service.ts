import { BasketResponse } from '@aboutyou/backbone/helpers/BapiClient';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Inject, Injectable, Optional, PLATFORM_ID, SkipSelf } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { BasketApiService } from '../basket/basket-api.service';
import { BASKET_ACTIONS, selectBasketError } from '../basket/state';
import { getBasketUrl } from '../services/resolveEnvs';
import { AppState } from '../shop/store';
import { GlobalMessageData } from 'src/app/common/components/global-message/global-message-data';
import { GlobalMessageType } from 'src/app/common/components/global-message/global-message-type';
import { GlobalMessageComponent } from 'src/app/common/components/global-message/global-message.component';
import { EMPTY, Subject } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, filter, switchMap, tap } from 'rxjs/operators';
import { CustomDataMap, ProductMap } from 'src/app/mappers/product';
import { OnAppStable } from '../app-stable-initializer/on-app-stable';

const BASKET_POLLING_INTERVAL = 5000;

@Injectable({ providedIn: 'root' })
export class BasketService implements OnAppStable {
  private readonly basketUrl: string;
  private readonly itemQuantityChangeSubject: Subject<{ variantId: number; quantity: number }>;
  private readonly isBrowser: boolean;

  constructor(
    private readonly http: HttpClient,
    private store: Store<AppState>,
    private matSnackbar: MatSnackBar,
    private translateService: TranslateService,
    private basketApiService: BasketApiService,
    @Inject(PLATFORM_ID) platformId: object,
  ) {
    this.basketUrl = getBasketUrl();
    this.isBrowser = isPlatformBrowser(platformId);
    this.itemQuantityChangeSubject = new Subject();
  }

  public onAppStable(): void {
    if (!this.isBrowser) {
      return;
    }

    this.showHintOnError();
    this.subscribeToQuantityChangeSubject();
    this.dispatchGetBasket();
    this.dispatchStartBasketPolling();
  }

  public addOrUpdateItem(variantId: number, quantity: number, customData: CustomDataMap): void {
    this.dispatchSetLoading(true);
    this.basketApiService.addOrUpdateItem(variantId, quantity, customData).subscribe(
      response => this.dispatchSetBasket(response),
      error => this.handleError(error),
    );
  }

  public updateItemQuantity(variantId: number, quantity: number): void {
    this.itemQuantityChangeSubject.next({ variantId, quantity });
  }

  public deleteItem(variantId: number): void {
    this.basketApiService.deleteItem(variantId).subscribe(
      response => this.dispatchSetBasket(response),
      error => this.handleError(error),
    );
  }

  getCheckoutCustomDataForDisplayProduct(product: ProductMap): CustomDataMap {
    const attributes: Array<{ [key: string]: any }> = [];
    if (product.custom.dimensions) {
      attributes.push({ value: product.custom.dimensions, label: '' });
    }

    if (product.custom.color) {
      attributes.push({
        value: product.custom.color,
        label: this.translateService.instant('PRODUCT_DETAIL.colorLabel'),
      });
    }

    if (product.custom.energyLabel) {
      attributes.push({ value: product.custom.energyLabel, label: '', key: 'energyrating' });
    }

    return {
      displayData: {
        meta: { value: '' },
        name: { value: product.custom.productTitle, label: '' },
        identifier: { value: '' },
        attributes,
      },
    };
  }

  private handleError(error: HttpErrorResponse): void {
    this.store.dispatch(BASKET_ACTIONS.setError({ error }));
  }

  private dispatchGetBasket() {
    this.store.dispatch(BASKET_ACTIONS.getBasket());
  }

  private dispatchSetLoading(isLoading: boolean): void {
    this.store.dispatch(BASKET_ACTIONS.setLoading({ isLoading }));
  }

  private dispatchSetIsChangingQuantity(isChangingQuantity: boolean): void {
    this.store.dispatch(BASKET_ACTIONS.setIsChangingQuantity({ isChangingQuantity }));
  }

  private dispatchSetBasket(basketResponse: BasketResponse): void {
    this.store.dispatch(BASKET_ACTIONS.setBasket({ basketResponse }));
  }

  private dispatchStartBasketPolling() {
    this.store.dispatch(BASKET_ACTIONS.startPolling({ pollingInterval: BASKET_POLLING_INTERVAL }));
  }

  private dispatchStopBasketPolling() {
    this.store.dispatch(BASKET_ACTIONS.stopPolling());
  }

  // move to  effects;
  private showHintOnError() {
    this.store
      .select(selectBasketError)
      .pipe(
        distinctUntilChanged(),
        filter(error => error != null),
      )
      .subscribe(ignored => {
        const errorMessage = this.translateService.instant('BASKET.errors.generic');
        const data: GlobalMessageData = {
          message: errorMessage,
          type: GlobalMessageType.ERROR,
        };
        this.matSnackbar.openFromComponent(GlobalMessageComponent, {
          data,
          duration: 5000,
        });
      });
  }

  private subscribeToQuantityChangeSubject(): void {
    this.itemQuantityChangeSubject
      .asObservable()
      .pipe(
        // stop basket polling while the the quantity is about to change. Otherwise the poll result can override the current quantity.
        tap(() => this.dispatchStopBasketPolling()),
        debounceTime(400),
        tap(() => this.dispatchSetIsChangingQuantity(true)),
        switchMap(({ variantId, quantity }) => this.basketApiService.updateItemQuantity(variantId, quantity)),
        tap(basketResponse => this.dispatchSetBasket(basketResponse)),
        catchError(error => {
          this.handleError(error);
          return EMPTY;
        }),
      )
      .subscribe(_ => this.dispatchStartBasketPolling());
  }
}
