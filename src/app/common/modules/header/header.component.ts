import {
  SearchSuggestionsEndpointParameters,
  SearchSuggestionsEndpointResponseData,
} from '@aboutyou/backbone/endpoints/search/suggestions';
import { BapiPrice } from '@aboutyou/backbone/types/BapiProduct';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Component, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { LocalizeRouterService } from '@gilsdav/ngx-translate-router';
import { select, Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { BapiCategoryService } from 'src/app/core/services/bapi/bapi-category.service';
import { BapiSearchService } from 'src/app/core/services/bapi/bapi-search.service';
import { CheckoutService } from 'src/app/core/services/checkout/checkout.service';
import { ShopService } from 'src/app/core/services/shop.service';
import { CONSTANTS } from 'src/app/core/shop/constants';
import { AppState } from 'src/app/core/shop/store';
import { AccountState, getUser } from 'src/app/core/shop/store/account';
import {
  selectBasketCost,
  selectBasketIsLoading,
  selectBasketItemsCount,
  selectMappedBasketItems,
} from 'src/app/core/basket';
import { CATEGORIES_ACTIONS } from 'src/app/core/shop/store/categories';
import { IBasketListItem, ICurrency, ILanguage, NavbarCategory } from 'src/app/core/shop/types';
import { findActiveCategoryByPath, getUrlPathname, transformNavTree } from 'src/app/core/shop/utils';
import { Suggestion } from 'src/app/common/components/auto-suggest/suggestion';
import { SuggestionsGroup } from 'src/app/common/components/auto-suggest/suggestions.group';
import { CONFIG } from 'src/app/configs';
import { ProductMap } from 'src/app/mappers/product';
import * as bodyScrollLock from 'body-scroll-lock';
import { CookieService } from 'ngx-cookie-service';
import { take } from 'ramda';
import { from, fromEvent, Observable, of, Subject, Subscription } from 'rxjs';
import { distinctUntilChanged, filter, map, pairwise, share, switchMap, takeUntil, throttleTime } from 'rxjs/operators';
import { BreakpointObserverService } from '../../services/breakpoint-observer.service';
import { selectWishlistItemsCount } from 'src/app/core/shop/store/wishlist';

const HIDE_THRESHOLD = 100;

enum HeaderState {
  Expanded = 'expanded',
  Reduced = 'reduced',
}

enum Direction {
  Up = 'Up',
  Down = 'Down',
}

const searchTermsOptions: Pick<SearchSuggestionsEndpointParameters, 'with'> = {
  with: {
    categories: 'all',
    products: {
      attributes: 'all',
      advancedAttributes: 'all',
      images: 'all',
      variants: 'all',
    },
    productNames: 'all',
  },
};

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [
    trigger('scrollAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-100%)' }),
        animate('0.3s', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
      transition(':leave', [
        style({ opacity: 1, transform: 'translateY(0)' }),
        animate('0.3s', style({ opacity: 0, transform: 'translateY(-100%)' })),
      ]),
    ]),
    trigger('toggleShrink', [
      state('expanded', style({ width: '130px' })),
      state('reduced', style({ width: '38px' })),
      transition(`* <=> *`, animate('200ms ease-in')),
    ]),
    trigger('toggleBorderColor', [
      state('expanded', style({ borderColor: 'transparent' })),
      state('reduced', style({ borderColor: '#d7d7d7' })),
      transition(`* <=> *`, animate('200ms ease-in')),
    ]),
    trigger('closeIconAnimation', [
      state('true', style({ transform: 'scale(-1)' })),
      state('false', style({ transform: 'scale(1)' })),
      transition(`* <=> *`, animate('300ms ease-in')),
    ]),
  ],
})
export class HeaderComponent implements OnInit, AfterViewInit, OnDestroy {
  public isExpanded = true;

  categories: NavbarCategory[];
  activeCategory: NavbarCategory = null;

  isBrowser = false;
  isDesktop = false;
  showBurgerMenu = false;
  selectedPath: string;

  layoutSub$ = new Subject<void>();
  routeSub: Subscription;
  bapiCategorySub: Subscription;

  minSearchTermLength: number;
  shouldShowMobileSearch = false;

  showLanguageSwitchBar = true;
  currency: ICurrency;
  languages: ILanguage[];
  selectedLanguage: ILanguage;

  translations: {
    categories: string;
    products: string;
  };

  basketLoading$: Observable<boolean>;
  basketItemsCount$: Observable<number>;
  basketItems$: Observable<IBasketListItem[]>;
  basketCost$: Observable<BapiPrice>;
  wishlistItemsCount$: Observable<number>;
  user$: Observable<AccountState['user']>;
  private suggestionGroupOptionSubject$: Subject<string | null> = new Subject<string | null>();
  suggestionGroupOptions$: Observable<SuggestionsGroup[]>;

  get toggleHeader(): HeaderState {
    return this.isExpanded ? HeaderState.Expanded : HeaderState.Reduced;
  }

  constructor(
    private router: Router,
    private localize: LocalizeRouterService,
    private shopService: ShopService,
    private cookieService: CookieService,
    private store: Store<AppState>,
    private translateService: TranslateService,
    private bapiCategoryService: BapiCategoryService,
    private bapiSearchService: BapiSearchService,
    private checkoutService: CheckoutService,
    private breakpointObserver: BreakpointObserverService,
    @Inject(PLATFORM_ID) platformId: object,
    @Inject(DOCUMENT) private document: Document,
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
    this.watchRoutes();
    const { shop, allShops } = this.shopService.getShop();
    this.currency = shop.currency;
    this.selectedLanguage = shop;
    this.languages = allShops;
    this.minSearchTermLength = CONFIG.shop.search.suggestions.minSearchTermLength;
    this.suggestionGroupOptions$ = this.initSuggestionGroupOptionsObservable();
  }

  public ngOnInit() {
    this.fetchCategories();
    this.fetchTranslations();
    this.basketLoading$ = this.store.select(selectBasketIsLoading);
    this.basketItemsCount$ = this.store.select(selectBasketItemsCount);
    this.basketItems$ = this.store.select(selectMappedBasketItems(this.currency, this.translateService));
    this.basketCost$ = this.store.select(selectBasketCost);
    this.user$ = this.store.pipe(select(getUser));
    this.wishlistItemsCount$ = this.store.select(selectWishlistItemsCount);
  }

  private initSuggestionGroupOptionsObservable() {
    return this.suggestionGroupOptionSubject$
      .asObservable()
      .pipe(
        switchMap(searchTerm =>
          searchTerm == null
            ? of([])
            : this.bapiSearchService
                .suggestions({ term: searchTerm, ...searchTermsOptions })
                .pipe(map(response => this.mapSuggestionResponseToSuggestionGroupOptions(response))),
        ),
      );
  }

  private mapSuggestionResponseToSuggestionGroupOptions(response: SearchSuggestionsEndpointResponseData) {
    return [
      {
        suggestionGroupName: this.translations.products,
        suggestions: take(CONFIG.shop.search.suggestions.productsToDisplay, response.products).map(product => {
          const converted = new ProductMap(product, this.currency, undefined, this.translateService);
          return {
            mainText: converted.custom.productTitle,
            image: converted.getPreviewImageSrc(),
            boldTextGroup: {
              blackText: !converted.oldPrice && converted.currentPrice,
              redText: converted.oldPrice && converted.currentPrice,
              struckText: converted.oldPrice,
            },
            link: `/p/${converted.productId}`,
          };
        }),
      },
      {
        suggestionGroupName: this.translations.categories,
        suggestions: take(
          CONFIG.shop.search.suggestions.categoriesToDisplay,
          response.categories,
        ).map(({ name, path }) => ({ mainText: name, link: path })),
      },
    ];
  }

  collapseMenu() {
    if (this.shouldShowMobileSearch) {
      this.toggleMobileSearchVisibility();
    }
    this.toggleBurgerMenu();
  }

  watchRoutes = () => {
    this.routeSub = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.selectedPath = getUrlPathname(event.url);
        this.setActiveCategory();
      });
  };

  fetchTranslations() {
    this.translateService.get('GLOBAL.header.search.groups').subscribe(data => {
      this.translations = data;
    });
  }

  suggestionsLookup(value: string | null) {
    this.suggestionGroupOptionSubject$.next(value);
  }

  onSuggestionSelect(suggestion: Suggestion) {
    if (this.shouldShowMobileSearch) {
      this.toggleMobileSearchVisibility();
    }
    const localized = this.localize.translateRoute(suggestion.link) as string;
    this.router.navigateByUrl(localized);
  }

  onLanguageSelection = (lang: ILanguage) => {
    this.selectedLanguage = lang;
    this.cookieService.set(
      CONSTANTS.cookie.language,
      lang.locale,
      new Date(new Date().getTime() + 10 * 24 * 60 * 60 * 1000), // 10 days
    );
    this.cookieService.delete(CONSTANTS.cookie.shopId);

    if (this.showBurgerMenu) {
      this.toggleBurgerMenu();
    }
    this.router.navigate([lang.locale]);
    setTimeout(() => window.location.reload(), 100);
  };

  onSearchSubmit = (term: string) => {
    if (term) {
      if (this.shouldShowMobileSearch) {
        this.toggleMobileSearchVisibility();
      }
      const localized = this.localize.translateRoute(`/search?term=${term}`) as string;
      this.router.navigateByUrl(localized);
    }
  };

  fetchCategories() {
    this.bapiCategorySub = this.bapiCategoryService
      .getRoots({ with: { children: { depth: 10 } } })
      .subscribe(categories => {
        this.categories = transformNavTree(categories);
        this.setActiveCategory();
        this.store.dispatch(CATEGORIES_ACTIONS.setCategories({ categories: this.categories }));
      });
  }

  setActiveCategory = () => {
    if (this.categories) {
      this.activeCategory = findActiveCategoryByPath(this.selectedPath, this.categories);
    }
  };

  onCategoryClick = (hideSidebar: boolean) => (category: NavbarCategory) => {
    const translatedPath = this.localize.translateRoute(category.path) as string;
    this.router.navigateByUrl(translatedPath);
    window.scrollTo(0, 0);
    if (hideSidebar) {
      this.toggleBurgerMenu();
    }
  };

  async onBasketItemClick(basketItem: IBasketListItem) {
    await this.router.navigateByUrl(this.localize.translateRoute('/p/' + basketItem.product.id) as string);
  }

  async handleRedirectToBasket() {
    await this.router.navigateByUrl(this.translatedBasketRoute);
  }

  async handleRedirectToWishlist() {
    await this.router.navigateByUrl(this.translatedWishlistRoute);
  }

  async handleRedirectToAccount() {
    await this.router.navigateByUrl(this.translatedAccountRoute);
  }

  get translatedBasketRoute(): string {
    return this.localize.translateRoute('/basket') as string;
  }

  get translatedWishlistRoute(): string {
    return this.localize.translateRoute('/wishlist') as string;
  }

  get translatedAccountRoute(): string {
    return this.localize.translateRoute('/account') as string;
  }

  handleBasketHandoverToCheckout() {
    this.checkoutService.basketHandoverToCheckout(!this.isDesktop);
  }

  ngAfterViewInit() {
    if (!this.isBrowser) {
      return;
    }
    this.observeWindowScroll();
    this.watchLayouts();
  }

  observeWindowScroll = () => {
    if (!this.isBrowser) {
      return;
    }
    const scroll$ = fromEvent(window, 'scroll').pipe(
      throttleTime(10),
      map(() => window.pageYOffset),
      pairwise(),
      map(
        ([y1, y2]): Direction => {
          return y2 < y1 || y2 < HIDE_THRESHOLD ? Direction.Up : Direction.Down;
        },
      ),
      distinctUntilChanged(),
      share(),
    );

    const goingUp$ = scroll$.pipe(filter(direction => direction === Direction.Up));

    const goingDown$ = scroll$.pipe(filter(direction => direction === Direction.Down));

    goingUp$.subscribe(() => (this.isExpanded = true));
    goingDown$.subscribe(() => (this.isExpanded = false));
  };

  watchLayouts = () => {
    if (!this.isBrowser) {
      return;
    }
    from(this.breakpointObserver.getDesktopLayoutObserver())
      .pipe(takeUntil(this.layoutSub$))
      .subscribe(isDesktop => {
        this.isDesktop = isDesktop;
        if (isDesktop && this.showBurgerMenu) {
          this.toggleBurgerMenu();
        }
      });
  };

  toggleMobileSearchVisibility = () => {
    if (this.shouldShowMobileSearch) {
      this.shouldShowMobileSearch = false;
      bodyScrollLock.enableBodyScroll(this.document.body);
    } else {
      this.shouldShowMobileSearch = true;
      bodyScrollLock.disableBodyScroll(this.document.body);
    }
  };

  toggleBurgerMenu = () => {
    if (this.showBurgerMenu) {
      this.showBurgerMenu = false;
      bodyScrollLock.enableBodyScroll(this.document.body);
    } else {
      this.showBurgerMenu = true;
      bodyScrollLock.disableBodyScroll(this.document.body);
    }
  };

  setLanguageBarVisibility = (val: boolean) => () => {
    this.showLanguageSwitchBar = val;
  };

  handleRedirectToCheckoutAccountArea = () => {
    this.checkoutService.redirectToCheckoutAccountArea(!this.isDesktop);
  };

  handleRedirectToCheckoutOrdersArea = () => {
    this.checkoutService.redirectToCheckoutOrdersArea(!this.isDesktop);
  };

  ngOnDestroy() {
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
    if (this.bapiCategorySub) {
      this.bapiCategorySub.unsubscribe();
    }

    // If component gets somehow destroyed, make sure to reenable scroll per default
    bodyScrollLock.enableBodyScroll(this.document.body);
  }
}
