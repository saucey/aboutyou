import { AfterContentInit, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { SeoService } from 'src/app/core/services/seo/seo.service';
import { ShopService } from 'src/app/core/services/shop.service';
import { AppState } from 'src/app/core/shop/store';
import {
  selectMappedWishlistItems,
  selectWishlistIsLoading,
  selectWishlistItemsCount,
} from 'src/app/core/shop/store/wishlist';
import { ICurrency, IWishlistListItem } from 'src/app/core/shop/types';
import { BreakpointObserverService } from 'src/app/common/services/breakpoint-observer.service';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { PageTypes } from 'src/app/configs/pagetypes';
import { Router } from '@angular/router';
import { getUrlPathname, getUrlQueryParams } from 'src/app/core/shop/utils';
import { PreviousRouteService } from 'src/app/core/services/previous-route.service';

@Component({
  selector: 'app-checkout-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss'],
})
export class WishlistComponent implements AfterContentInit {
  isMobile$: Observable<boolean>;
  loading$: Observable<boolean>;
  notLoading$: Observable<boolean>;
  currency: ICurrency;
  layoutSub$ = new Subject<void>();
  wishlistItems$: Observable<IWishlistListItem[]>;
  wishlistCount$: Observable<number>;
  isChangingQuantity$: Observable<boolean>;
  isOutOfStock$: Observable<boolean>;
  wishlistItemsNotAvailable$: Observable<any>;
  wishlistItemsAvailable$: Observable<any>;
  previousRoutePath: string;
  previousRouteUrl: string;
  previousRouteUrlParams: any;

  constructor(
    private translateService: TranslateService,
    private router: Router,
    private store: Store<AppState>,
    private shopService: ShopService,
    private breakpointObserver: BreakpointObserverService,
    private seoService: SeoService,
    private previousRouteService: PreviousRouteService,
  ) {
    this.currency = this.shopService.getShop().shop.currency;
    this.setSeoData();
    const previousRoute = this.previousRouteService.getPreviousRoute();

    if (previousRoute) {
      this.previousRoutePath = previousRoute.routeConfig.path;
      this.previousRouteUrl = getUrlPathname(this.previousRouteService.getPreviousUrl());
      this.previousRouteUrlParams = getUrlQueryParams(this.previousRouteService.getPreviousUrl());
    }
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
    this.loading$ = this.store.select(selectWishlistIsLoading);
    this.notLoading$ = this.loading$.pipe(map(value => !value));
    this.wishlistItems$ = this.store.select(selectMappedWishlistItems(this.currency, this.translateService));
    this.wishlistCount$ = this.store.select(selectWishlistItemsCount);
    this.wishlistItemsAvailable$ = this.wishlistItems$.pipe(
      map(items => items.filter(item => item.mappedProduct.availableQuantities > 0)),
    );
    this.wishlistItemsNotAvailable$ = this.wishlistItems$.pipe(
      map(items => items.filter(item => item.mappedProduct.availableQuantities === 0)),
    );
    this.isOutOfStock$ = this.wishlistItemsNotAvailable$.pipe(map(items => items.length > 0));
  }
}
