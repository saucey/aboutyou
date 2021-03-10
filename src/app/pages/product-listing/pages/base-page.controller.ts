import {
  APISortOption,
  APISortOrder,
  ProductSortConfig,
  ProductsSearchEndpointParameters,
} from '@aboutyou/backbone/endpoints/products/products';
import { Pagination } from '@aboutyou/backbone/endpoints/products/productsByIds';
import { ProductSearchQuery } from '@aboutyou/backbone/types/ProductSearchQuery';
import { DOCUMENT, isPlatformBrowser, Location } from '@angular/common';
import { AfterViewInit, Inject, OnDestroy, PLATFORM_ID } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { LocalizeRouterService } from '@gilsdav/ngx-translate-router';
import { select, Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { BapiFilterService } from 'src/app/core/services/bapi/bapi-filter.service';
import { BapiProductService } from 'src/app/core/services/bapi/bapi-product.service';
import { ContentService } from 'src/app/core/services/content/content.service';
import { SeoService } from 'src/app/core/services/seo/seo.service';
import { ShopService } from 'src/app/core/services/shop.service';
import { AppState } from 'src/app/core/shop/store';
import { AccountState, getUser } from 'src/app/core/shop/store/account';
import { getCategories } from 'src/app/core/shop/store/categories';
import { getPlpScrollPosition, UI_ACTIONS } from 'src/app/core/shop/store/ui';
import {
  Filter,
  ICurrency,
  IDisplayTiles,
  IFilterConfig,
  ILoadableData,
  ISortConfig,
  NavbarCategory,
  RangeFilterValue,
  SelectedFilter,
} from 'src/app/core/shop/types';
import {
  convertUrlParamsToPairs,
  findActiveCategoryById,
  findActiveCategoryByPath,
  getUrlPathname,
  getUrlQueryParams,
  retrieveFiltersFromUrl,
  stripOutLocaleFromPathname,
} from 'src/app/core/shop/utils';
import { BreakpointObserverService } from 'src/app/common/services/breakpoint-observer.service';
import { CONFIG } from 'src/app/configs';
import { ProductMap } from 'src/app/mappers/product';
import { stringify } from 'query-string';
import { Dictionary } from 'ramda';
import evolve from 'ramda/es/evolve';
import filter from 'ramda/es/filter';
import flatten from 'ramda/es/flatten';
import map from 'ramda/es/map';
import path from 'ramda/es/path';
import pipe from 'ramda/es/pipe';
import prop from 'ramda/es/prop';
import propSatisfies from 'ramda/es/propSatisfies';
import reject from 'ramda/es/reject';
import split from 'ramda/es/split';
import uniq from 'ramda/es/uniq';
import values from 'ramda/es/values';
import { from, fromEvent, Subject, Subscription } from 'rxjs';
import { filter as filterOperator, takeUntil } from 'rxjs/operators';
import {
  convertFilters,
  convertProduct,
  convertToFilterQuery,
  filterContentRowsByTypes,
  getDisplayTilesInfo,
} from '../utils';

const DEFAULT_MIN_PRICE = 0;
const DEFAULT_MAX_PRICE = 1000;

export abstract class BasePageController implements OnDestroy, AfterViewInit {
  isBrowser = false;
  isMobile = false;
  isDesktop = true;
  productsPerPage: number = CONFIG.plp.productsPerPage;
  activeCategory: NavbarCategory;
  currentPath: string;
  activePage = 1;
  searchTerm = '';

  categories: ILoadableData<NavbarCategory[]> = {
    loading: true,
  };

  filters: ILoadableData<Filter[]> = {
    loading: true,
  };

  products: ILoadableData<ProductMap[]> & { pagination?: Pagination } = {
    loading: true,
    loadingMore: false,
    data: [],
  };

  contentTiles: {
    loading: boolean;
    tilesInProductGrid?: any[];
    headlineTile?: any;
    productSliders?: any[];
  } = {
    tilesInProductGrid: [],
    headlineTile: undefined,
    loading: true,
    productSliders: [],
  };

  displayTiles: IDisplayTiles = {
    tiles: [],
    productsToDisplay: 0,
  };

  user: AccountState['user'];

  FILTER_CONFIG: IFilterConfig;
  SORT_CONFIG: ISortConfig = [];
  selectedFilters: Dictionary<(number | string)[]>;
  availablePrice = {
    min: DEFAULT_MIN_PRICE,
    max: DEFAULT_MAX_PRICE,
  };
  currency: ICurrency;

  // Subscriptions
  productSub: Subscription;
  filtersSub: Subscription;
  storeCategoriesSub: Subscription;
  routeSub: Subscription;
  accountSub: Subscription;
  windowScrollSub$: Subscription;
  layoutSub$ = new Subject<void>();

  constructor(
    public store: Store<AppState>,
    public router: Router,
    public localize: LocalizeRouterService,
    public shopService: ShopService,
    public seoService: SeoService,
    public translateService: TranslateService,
    public bapiProductService: BapiProductService,
    public bapiFilterService: BapiFilterService,
    public contentService: ContentService,
    public breakpointObserver: BreakpointObserverService,
    public location: Location,
    @Inject(DOCUMENT) public document: Document,
    @Inject(PLATFORM_ID) public platformId: object,
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
    this.FILTER_CONFIG = CONFIG.plp.filter;
    this.currency = this.shopService.getShop().shop.currency;

    this.watchAccount();
    this.watchRoutes();
    this.loadSorting();
  }

  abstract setSeoMetadata(): void;

  watchAccount = () => {
    this.accountSub = this.store.pipe(select(getUser)).subscribe(user => {
      this.user = user;
    });
  };

  watchRoutes() {
    this.routeSub = this.router.events
      .pipe(filterOperator(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        const urlPathName = getUrlPathname(event.url);
        const unLocalizedPath = stripOutLocaleFromPathname(urlPathName);

        const showFiltersLoading = unLocalizedPath !== this.currentPath;
        this.currentPath = unLocalizedPath;

        const { page = 1, ...filtersInUrl } = getUrlQueryParams(event.url);

        const converted = retrieveFiltersFromUrl(filtersInUrl) as Dictionary<number[]>;
        this.selectedFilters = converted;

        this.searchTerm = filtersInUrl.term as string;
        this.activePage = Number.parseInt(page as string, 10);

        this.watchCategories(showFiltersLoading);
      });
  }

  watchCategories = (showFiltersLoading: boolean) => {
    this.storeCategoriesSub = this.store
      .pipe(
        select(getCategories),
        filterOperator(data => !!data.length),
      )
      .subscribe((data: NavbarCategory[]) => {
        this.categories = {
          data,
          loading: false,
        };

        const { categoryId } = this.selectedFilters;
        const categoryIdFromUrlParam = categoryId && (categoryId[0] as number);

        this.activeCategory = categoryIdFromUrlParam
          ? findActiveCategoryById(categoryIdFromUrlParam, this.categories.data)
          : findActiveCategoryByPath(this.currentPath, this.categories.data);

        if (this.activeCategory || this.searchTerm) {
          this.fetchFilters(showFiltersLoading);
          this.fetchProducts();
          this.fetchContents();
        } else {
          this.router.navigateByUrl(this.localize.translateRoute('/404') as string);
        }
      });
  };

  loadSorting = () => {
    this.translateService.get('PRODUCT_LISTING.sorting.values').subscribe((res: Dictionary<string>) => {
      this.SORT_CONFIG = CONFIG.plp.sort.map(sortConfig => ({ ...sortConfig, name: res[sortConfig.name] }));
    });
  };

  fetchContents = () => {
    this.contentTiles = {
      headlineTile: undefined,
      tilesInProductGrid: [],
      loading: true,
    };
    if (!this.activeCategory) {
      return;
    }
    this.contentService.getCategoryContents(this.activeCategory.id).subscribe(
      async data => {
        const basicTiles = filterContentRowsByTypes(['single_tile', 'double_tile'])((data as any).rows);
        const gridOfTwoTiles = filterContentRowsByTypes(['grid_of_two_aligned'])((data as any).rows);
        const bundleTiles = filterContentRowsByTypes(['single_bundle_tile', 'double_bundle_tile'])((data as any).rows);

        const transformedBundleTiles = await this.transformBundleTiles(bundleTiles);

        // Headline tiles are 'grid_of_two_aligned' row but has position attribute 0
        const headlineTiles = filter(({ attributes: { position } }) => position === 0)(gridOfTwoTiles);
        const gridTilesInsideProductsGrid = reject(({ attributes: { position } }) => position === 0)(gridOfTwoTiles);

        this.contentTiles = {
          headlineTile: headlineTiles.length ? headlineTiles[0] : undefined,
          tilesInProductGrid: [...basicTiles, ...transformedBundleTiles, ...gridTilesInsideProductsGrid],
          loading: false,
        };
        this.setDisplayTiles();
      },
      () => {
        this.contentTiles = {
          headlineTile: undefined,
          tilesInProductGrid: [],
          loading: false,
        };
      },
    );
  };

  setDisplayTiles() {
    if (this.searchTerm) {
      return;
    }
    if (!this.contentTiles.loading && !this.products.loading) {
      const {
        pagination: { last, page },
      } = this.products;
      const { loaded } = this.getPaginationDetails();
      const isLastPage = page === last;
      this.displayTiles = getDisplayTilesInfo(this.contentTiles.tilesInProductGrid, this.isMobile, loaded, isLastPage);
    }
  }

  fetchFilters = (loading?: boolean) => {
    if (loading) {
      this.filters.loading = loading;
    }

    this.filtersSub = this.bapiFilterService
      .get({ where: { categoryId: this.activeCategory && this.activeCategory.id, term: this.searchTerm } })
      .subscribe(responseData => {
        const converted = convertFilters(responseData);
        const priceFilter = converted.find(({ name }) => name === 'Prices');
        if (priceFilter) {
          const value = priceFilter.values[0] as RangeFilterValue;
          this.availablePrice = {
            min: value.min,
            max: value.max,
          };
        }
        const filterIdsToDisplay = values(this.FILTER_CONFIG).map(({ id }) => id);
        this.filters = {
          loading: false,
          data: converted.filter(({ id }) => filterIdsToDisplay.includes(id)),
        };
      });
  };

  // TODO: type the data structure when CONTENT API is available
  transformBundleTiles = async (rows: any[]): Promise<any[]> => {
    const productIds = pipe(
      map(prop('elements')),
      flatten,
      map(pipe(path(['attributes', 'products']))),
      flatten,
      map(path(['attributes', 'productId'])),
      uniq,
    )(rows) as number[];

    const products = await this.bapiProductService.getByIds(productIds).toPromise();

    const transformations = {
      elements: map(
        evolve({
          attributes: {
            products: map((prod: any) => {
              const product = products.find(p => p.id === prod.attributes.productId);
              return {
                ...prod,
                attributes: {
                  ...prod.attributes,
                  image: product && product.images.length && product.images[0],
                },
              };
            }),
          },
        }),
      ),
    };
    return map(evolve(transformations))(rows);
  };

  transformProductTilesSliders = async (rows: any[]): Promise<any[]> => {
    const productIds = pipe(
      map(path(['attributes', 'products'])),
      flatten,
      map(path(['attributes', 'productId'])),
      uniq,
    )(rows) as number[];

    const products = await this.bapiProductService
      .getByIds(productIds, {
        with: {
          attributes: 'all',
          advancedAttributes: 'all',
          variants: 'all',
          images: 'all',
        },
      })
      .toPromise();

    const transformedProducts = products.map(prod => ({
      ...convertProduct(this.currency)(this.categories[0])(this.translateService)(prod),
      ...prod,
    }));

    return map((row: any) => ({
      headline: row.attributes.name,
      products: pipe(
        path(['attributes', 'products']),
        map(path(['attributes', 'productId'])),
        uniq,
        map(id => transformedProducts.find(product => product.id === id)),
      )(row),
    }))(rows);
  };

  attachFilters = (where: ProductSearchQuery) => {
    const filterPairs = convertUrlParamsToPairs(this.selectedFilters);
    const minPrice = filterPairs.find(({ key }) => key === 'minPrice');
    const maxPrice = filterPairs.find(({ key }) => key === 'maxPrice');

    where.minPrice = minPrice && minPrice.values[0];
    where.maxPrice = maxPrice && maxPrice.values[0];
    const remainingFilters = reject<SelectedFilter>(
      propSatisfies(key => ['minPrice', 'maxPrice', 'sort', 'term', 'categoryId'].includes(key as string), 'key'),
    )(filterPairs);
    where.attributes = convertToFilterQuery(remainingFilters);
  };

  attachSort = (sortConfig: ProductSortConfig) => {
    const filterPairs = convertUrlParamsToPairs(this.selectedFilters);
    const sort = filterPairs.find(({ key }) => key === 'sort');
    if (sort) {
      const [sortBy, sortOrder] = split(':', sort.values[0]) as [APISortOption, APISortOrder];
      // @ts-ignore
      if (sortBy !== '' && sortOrder !== '') {
        sortConfig.by = sortBy;
        sortConfig.direction = sortOrder;
      }
    }
  };

  fetchProducts = (loadMore?: boolean) => {
    if (loadMore) {
      this.products.loadingMore = true;
    } else {
      this.products.loading = true;
    }

    if (this.activeCategory || this.searchTerm) {
      const where: ProductSearchQuery = {
        categoryId: this.activeCategory && this.activeCategory.id,
        term: this.searchTerm,
      };

      this.attachFilters(where);
      const sort: ProductSortConfig = {};
      this.attachSort(sort);

      const pagination: ProductsSearchEndpointParameters['pagination'] = { perPage: this.productsPerPage };
      if (loadMore) {
        pagination.page = this.activePage;
      } else if (this.activePage > 1) {
        pagination.page = 1;
        pagination.perPage = this.activePage * this.productsPerPage;
      }

      this.productSub = this.bapiProductService
        .query({
          where,
          campaignKey: CONFIG.shop.products.campaignKey,
          with: {
            attributes: 'all',
            advancedAttributes: 'all',
            images: 'all',
            siblings: {
              attributes: 'all',
              advancedAttributes: 'all',
              images: 'all',
              variants: 'all',
            },
            variants: 'all',
          },
          pagination,
          sort,
        })
        .subscribe(responseData => {
          const convertedProducts = responseData.entities.map(
            convertProduct(this.currency)(this.categories.data[0])(this.translateService),
          );
          if (loadMore) {
            this.products = {
              loading: false,
              loadingMore: false,
              data: [...this.products.data, ...convertedProducts],
              pagination: responseData.pagination,
            };
          } else {
            this.products = {
              loading: false,
              loadingMore: false,
              data: convertedProducts,
              pagination: responseData.pagination,
            };
          }

          if (!this.products.pagination.total) {
            this.noResultsPageSliders();
          }

          /**
           * This allows to display product even the Content Tile Positioning logic is not finished executing
           */
          this.displayTiles.productsToDisplay = this.products.data.length;
          /**
           * Reset/rearrange the tiles displayed
           */
          this.setDisplayTiles();
          /**
           * Scrolling to remembered position from the UI store
           */
          if (this.isBrowser) {
            this.store
              .pipe(select(getPlpScrollPosition))
              .subscribe(rememberedScrollPosition => {
                if (this.windowScrollSub$) {
                  this.windowScrollSub$.unsubscribe();
                }
                setTimeout(() => window.scrollTo(0, rememberedScrollPosition), 0);
                setTimeout(() => this.startObservingWindowScroll(), 500);
              })
              .unsubscribe();
          }

          // Setting Meta & Pagination tags after fetching Products to get further Pagination details for Prev & Next links
          this.setSeoMetadata();
        });
    }
  };

  noResultsPageSliders() {
    this.contentService
      .getSearchContents()
      .pipe(filterOperator((data: any[]) => Boolean(data.length)))
      .subscribe(async data => {
        const productSliders = filterContentRowsByTypes(['product_tiles_slider'])(data[0].rows);
        const transformedBundleTiles = await this.transformProductTilesSliders(productSliders);
        this.contentTiles.productSliders = transformedBundleTiles;
      });
  }

  loadMore = () => {
    const stringified = stringify({ ...this.selectedFilters, page: ++this.activePage }, { arrayFormat: 'comma' });
    const updatedPath = this.currentPath + '?' + stringified;
    let localized = this.localize.translateRoute(updatedPath) as string;

    // The LocalizeRouterService.translateRoute will always add a '/' prefix, even when it's not necessary.
    // As a result we could end up with '//' in the beginning of the URL, which causes 'location.go(..)' to assume
    // that this is an absolute path without scheme specified (e.g. //localhost) and we end up with an error.
    // As a workaround we remove the first '/' character from the URL.
    if (localized.startsWith('//')) {
      localized = localized.substr(1);
    }

    /**
     * this only adds page param to urls
     * It doesn't do router navigate
     */
    this.location.go(localized);
    this.fetchProducts(true);
  };

  getPaginationDetails = () => {
    const { pagination } = this.products;
    const productsCount = pagination.page * pagination.perPage;
    return {
      loaded: pagination.page === 1 ? pagination.current : Math.min(productsCount, pagination.total),
      total: this.products.pagination.total,
    };
  };

  getPageProgress() {
    return {
      total: this.products.pagination.total,
      loaded: this.displayTiles.productsToDisplay,
    };
  }

  shouldShowLoadMore = () => {
    const { total } = this.getPaginationDetails();
    const { productsToDisplay } = this.displayTiles;
    return productsToDisplay !== total;
  };

  goToDetailPage = (productId: number) => {
    this.router.navigateByUrl(this.localize.translateRoute('/p/' + productId) as string);
  };

  startObservingWindowScroll() {
    this.windowScrollSub$ = fromEvent(window, 'scroll').subscribe(() => {
      if (this.isBrowser && !this.products.loading && !this.products.loadingMore) {
        const verticalOffset =
          window.pageYOffset || this.document.documentElement.scrollTop || this.document.body.scrollTop || 0;
        this.store.dispatch(UI_ACTIONS.rememberPLPScrollPosition({ scroll: verticalOffset }));
      }
    });
  }

  ngAfterViewInit() {
    if (!this.isBrowser) {
      return;
    }
    from(this.breakpointObserver.getMobileLayoutObserver())
      .pipe(takeUntil(this.layoutSub$))
      .subscribe(isMobile => {
        this.isMobile = isMobile;
        this.setDisplayTiles();
      });
    from(this.breakpointObserver.getDesktopLayoutObserver())
      .pipe(takeUntil(this.layoutSub$))
      .subscribe(isDesktop => {
        this.isDesktop = isDesktop;
      });
  }

  ngOnDestroy() {
    const unsubscribeIfPossible = (sub: Subscription | Subject<void>) => sub && sub.unsubscribe();
    unsubscribeIfPossible(this.productSub);
    unsubscribeIfPossible(this.filtersSub);
    unsubscribeIfPossible(this.storeCategoriesSub);
    unsubscribeIfPossible(this.routeSub);
    unsubscribeIfPossible(this.layoutSub$);
    unsubscribeIfPossible(this.windowScrollSub$);
  }
}
