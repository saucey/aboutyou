import { BapiPrice } from '@aboutyou/backbone/types/BapiProduct';
import { AfterContentInit, Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { LocalizeRouterService } from '@gilsdav/ngx-translate-router';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { BreakpointObserverService } from 'src/app/common/services/breakpoint-observer.service';
import { PageTypes } from 'src/app/configs/pagetypes';
import { CONFIG_TOKEN } from 'src/app/core/config.provider';
import { SeoService } from 'src/app/core/services/seo/seo.service';
import { ShopService } from 'src/app/core/services/shop.service';
import { IBasketListItem, IConfig, ICurrency } from 'src/app/core/shop/types';
import { getUrlPathname } from 'src/app/core/shop/utils';
import { ReservationBasketService } from '../../../core/reservation-basket';
import { AppStateWithReservationBasket } from '../../../core/reservation-basket/app-state-with-reservation-basket';
import {
  ReservationBasketState,
  selectMappedReservationBasketItems,
  selectReservationBasketCost,
  selectReservationBasketFeature,
  selectReservationBasketItemsCount,
} from '../../../core/reservation-basket/state';

@Component({
  selector: 'src/app-reservation-basket',
  templateUrl: './reservation-basket.component.html',
  styleUrls: ['./reservation-basket.component.scss'],
})
export class ReservationBasketComponent implements AfterContentInit {
  state$: Observable<ReservationBasketState>;
  isMobile$: Observable<boolean>;
  currency: ICurrency;
  basketItems$: Observable<IBasketListItem[]>;
  basketCost$: Observable<BapiPrice>;
  basketCount$: Observable<number>;

  constructor(
    private router: Router,
    private localize: LocalizeRouterService,
    private translateService: TranslateService,
    private reservationBasketService: ReservationBasketService,
    private store: Store<AppStateWithReservationBasket>,
    private shopService: ShopService,
    private breakpointObserver: BreakpointObserverService,
    private seoService: SeoService,
    @Inject(CONFIG_TOKEN) private config: IConfig,
  ) {
    this.currency = this.shopService.getShop().shop.currency;
    this.setSeoData();
  }

  ngAfterContentInit(): void {
    this.state$ = this.store.select(selectReservationBasketFeature);
    this.isMobile$ = this.breakpointObserver.getMobileLayoutObserver();

    this.basketCount$ = this.store.select(selectReservationBasketItemsCount).pipe();
    this.basketItems$ = this.store.select(selectMappedReservationBasketItems(this.currency, this.translateService));

    this.basketCost$ = this.store.select(selectReservationBasketCost);
  }

  setSeoData() {
    this.translateService
      .get(['SEO.reservationBasket.title', 'SEO.reservationBasket.description'])
      .subscribe(translations => {
        const currentUrl: string = this.router.url;
        const baseUrl: string = getUrlPathname(currentUrl);
        this.seoService.loadSeoMetadata(PageTypes.BASKET, {
          moreToLoad: false,
          fallbackData: {
            title: translations['SEO.reservationBasket.title'],
            description: translations['SEO.reservationBasket.description'],
            img: baseUrl + '/assets/logo.svg',
          },
        });
      });
  }

  handleItemQuantityChange({ item, quantity }: { item: IBasketListItem; quantity: number }) {
    this.reservationBasketService.updateItemQuantity(item.variant.id, quantity);
  }

  handleDeleteItem(basketItem: IBasketListItem) {
    this.reservationBasketService.deleteItem(basketItem.variant.id);
  }

  onBasketItemClick(basketItem: IBasketListItem) {
    this.router.navigate([this.localize.translateRoute('/p/' + basketItem.product.id)]);
  }

  finalizeReservation() {
    console.log('finalize reservation called');
  }
}
