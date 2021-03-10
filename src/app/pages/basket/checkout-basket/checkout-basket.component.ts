import { BasketPackageInformation } from '@aboutyou/backbone/endpoints/basket/getBasket';
import { BapiPrice } from '@aboutyou/backbone/types/BapiProduct';
import { AfterContentInit, Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { LocalizeRouterService } from '@gilsdav/ngx-translate-router';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import {
  BasketItemsGroupedByPackage,
  BasketService,
  selectBasketCost,
  selectBasketIsChangingQuantity,
  selectBasketIsLoading,
  selectBasketItemsCount,
  selectBasketItemsGroupedByPackage,
  selectMappedBasketItems,
} from 'src/app/core/basket';
import { CONFIG_TOKEN } from 'src/app/core/config.provider';
import { CheckoutService } from 'src/app/core/services/checkout/checkout.service';
import { SeoService } from 'src/app/core/services/seo/seo.service';
import { ShopService } from 'src/app/core/services/shop.service';
import { AppState } from 'src/app/core/shop/store';
import { IBasketListItem, IConfig, ICurrency } from 'src/app/core/shop/types';
import { getUrlPathname } from 'src/app/core/shop/utils';
import { BreakpointObserverService } from 'src/app/common/services/breakpoint-observer.service';
import { combineLatest, Observable, Subject } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { PageTypes } from 'src/app/configs/pagetypes';
import { PlusProductCalcThresholdService } from '../../../common/modules/depot-checkout/plus-product-calc-threshold/plus-product-calc-threshold.service';
import { BasketPlusProductService } from '../../../common/modules/depot-checkout/basket-plus-product.service';

@Component({
  selector: 'src/app-checkout-basket',
  templateUrl: './checkout-basket.component.html',
  styleUrls: ['./checkout-basket.component.scss'],
})
export class CheckoutBasketComponent implements AfterContentInit {
  totalBasketReduction$: Observable<number>;
  isMobile$: Observable<boolean>;
  loading$: Observable<boolean>;
  notLoading$: Observable<boolean>;
  currency: ICurrency;
  basketItems$: Observable<IBasketListItem[]>;
  basketCost$: Observable<BapiPrice>;
  basketCount$: Observable<number>;
  isChangingQuantity$: Observable<boolean>;
  groupItemsByPackage: boolean;
  basketItemsGroupedByPackage$: Observable<BasketItemsGroupedByPackage>;

  // adaptions
  plusProductThresholdReached$: Observable<boolean>;
  plusProductDifference$: Observable<number>;
  disablePurchaseButton$: Observable<boolean>;

  constructor(
    private router: Router,
    private localize: LocalizeRouterService,
    private translateService: TranslateService,
    private basketService: BasketService,
    private store: Store<AppState>,
    private checkoutService: CheckoutService,
    private shopService: ShopService,
    private breakpointObserver: BreakpointObserverService,
    private seoService: SeoService,
    @Inject(CONFIG_TOKEN) private config: IConfig,
    private plusProductService: BasketPlusProductService,
    private plusProductCalcService: PlusProductCalcThresholdService,
  ) {
    this.currency = this.shopService.getShop().shop.currency;
    this.setSeoData();
    this.groupItemsByPackage = this.config.basket.groupItemsByPackage;
  }

  setSeoData() {
    this.translateService.get(['SEO.basket.title', 'SEO.basket.description']).subscribe(translations => {
      const currentUrl: string = this.router.url;
      const baseUrl: string = getUrlPathname(currentUrl);
      this.seoService.loadSeoMetadata(PageTypes.BASKET, {
        moreToLoad: false,
        fallbackData: {
          title: translations['SEO.basket.title'],
          description: translations['SEO.basket.description'],
          img: baseUrl + '/assets/logo.svg',
        },
      });
    });
  }

  ngAfterContentInit(): void {
    this.isMobile$ = this.breakpointObserver.getMobileLayoutObserver();
    this.loading$ = this.store.select(selectBasketIsLoading);
    this.notLoading$ = this.loading$.pipe(map(value => !value));

    this.basketCount$ = this.store.select(selectBasketItemsCount).pipe();

    this.basketItems$ = this.store.select(selectMappedBasketItems(this.currency, this.translateService));
    this.basketItemsGroupedByPackage$ = this.store.select(
      selectBasketItemsGroupedByPackage(this.currency, this.translateService),
    );

    this.totalBasketReduction$ = this.basketItems$.pipe(map(item => this.getTotalReduction(item)));
    this.basketCost$ = this.store.select(selectBasketCost);
    this.isChangingQuantity$ = this.store.select(selectBasketIsChangingQuantity);

    this.plusProductDifference$ = this.plusProductCalcService.basketCostUntilThresholdReached$();
    this.plusProductThresholdReached$ = this.plusProductCalcService.isBasketThresholdReached$();
    this.disablePurchaseButton$ = combineLatest(
      this.plusProductThresholdReached$,
      this.plusProductService.hasNormalBasketItems$,
    ).pipe(map(([thresholdReached, hasNormalItems]) => !thresholdReached && !hasNormalItems));
  }

  handleItemQuantityChange({ item, quantity }: { item: IBasketListItem; quantity: number }) {
    this.basketService.updateItemQuantity(item.variant.id, quantity);
  }

  handleDeleteItem(basketItem: IBasketListItem) {
    this.basketService.deleteItem(basketItem.variant.id);
  }

  onBasketItemClick(basketItem: IBasketListItem) {
    this.router.navigate([this.localize.translateRoute('/p/' + basketItem.product.id)]);
  }

  private getTotalReduction(basketItems: Array<IBasketListItem>): number {
    return basketItems
      .map(item =>
        item.mappedProduct.oldPrice
          ? item.quantity * (item.mappedProduct.oldPrice - item.mappedProduct.currentPrice)
          : 0,
      )
      .reduce((total, num) => total + num, 0);
  }

  goToCheckout() {
    this.isMobile$.pipe(take(1)).subscribe(isMobile => this.checkoutService.basketHandoverToCheckout(isMobile));
  }
}
