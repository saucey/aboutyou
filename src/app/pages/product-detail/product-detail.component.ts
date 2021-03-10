import { BapiProduct } from '@aboutyou/backbone';
import { isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Component, Inject, OnDestroy, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalizeRouterService } from '@gilsdav/ngx-translate-router';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { BapiProductService } from 'src/app/core/services/bapi/bapi-product.service';
import { PreviousRouteService } from 'src/app/core/services/previous-route.service';
import { SeoService } from 'src/app/core/services/seo/seo.service';
import { ShopService } from 'src/app/core/services/shop.service';
import { WishlistService } from 'src/app/core/services/wishlist/wishlist.service';
import { AppState } from 'src/app/core/shop/store';
import { isItemInWishlist } from 'src/app/core/shop/store/wishlist';
import { ICurrency } from 'src/app/core/shop/types';
import { getUrlPathname, getUrlQueryParams, preloadImages } from 'src/app/core/shop/utils';
import { BreakpointObserverService } from 'src/app/common/services/breakpoint-observer.service';
import { CONFIG } from 'src/app/configs';
import { ProductMap } from 'src/app/mappers/product';
import flatten from 'ramda/es/flatten';
import { Observable, Subject, Subscription } from 'rxjs';
import { PageTypes } from 'src/app/configs/pagetypes';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnDestroy, AfterViewInit {
  product: ProductMap;
  productImagesPreloaded = false;
  previousRoutePath: string;
  previousRouteUrl: string;
  previousRouteUrlParams: any;
  productImages: string[];
  isBrowser = false;
  private productId: number;
  public isWishlisted = false;
  layoutSub$ = new Subject<void>();
  isMobile = false;
  currency: ICurrency;
  isItemInWishlist$: Observable<any>;

  private readonly routeSub: Subscription;
  private productSub: Subscription;
  private layoutSub: Subscription;

  constructor(
    private shopService: ShopService,
    private seoService: SeoService,
    private productService: BapiProductService,
    private activeRoute: ActivatedRoute,
    private previousRouteService: PreviousRouteService,
    private breakpointObserver: BreakpointObserverService,
    private translateService: TranslateService,
    private router: Router,
    private localize: LocalizeRouterService,
    private store: Store<AppState>,
    private wishlistService: WishlistService,
    @Inject(PLATFORM_ID) platformId: object,
  ) {
    this.currency = this.shopService.getShop().shop.currency;
    this.isBrowser = isPlatformBrowser(platformId);

    this.routeSub = this.activeRoute.params.subscribe(routeParams => {
      this.product = null;
      this.productImagesPreloaded = false;

      this.productId = this.cleanCheckoutPrefix(routeParams.productId);

      this.loadProduct(this.productId);
      this.isItemInWishlist$ = this.store.select(isItemInWishlist(this.productId));
    });

    const previousRoute = this.previousRouteService.getPreviousRoute();

    if (previousRoute) {
      this.previousRoutePath = previousRoute.routeConfig.path;
      this.previousRouteUrl = getUrlPathname(this.previousRouteService.getPreviousUrl());
      this.previousRouteUrlParams = getUrlQueryParams(this.previousRouteService.getPreviousUrl());
    }
  }

  /**
   * Redirects from COFE has `co-` prefix to ProductIds
   */
  cleanCheckoutPrefix(productId: string): number {
    return productId.startsWith('co-') ? Number(productId.substr(3)) : Number(productId);
  }

  public loadProduct = (id: number) => {
    if (this.isBrowser) {
      window.scrollTo(0, 0);
    }

    this.productSub = this.productService
      .getById(id, {
        campaignKey: CONFIG.shop.products.campaignKey,
        with: {
          categories: 'all',
          attributes: 'all',
          images: 'all',
          advancedAttributes: 'all',
          siblings: {
            attributes: 'all',
            images: 'all',
            advancedAttributes: 'all',
            variants: {
              attributes: 'all',
              advancedAttributes: 'all',
              stock: 'all',
            },
          },
          variants: {
            attributes: 'all',
            advancedAttributes: 'all',
            stock: 'all',
          },
        },
      })
      .subscribe(
        product => this.handleProduct(product),
        error => this.handleProductError(error),
      );
  };

  private handleProduct(product: BapiProduct) {
    this.product = new ProductMap(product, this.currency, undefined, this.translateService);

    if (!this.previousRoutePath && product.categories.length > 0) {
      this.previousRoutePath = '**';
      this.previousRouteUrl = flatten(product.categories).reduce((a, b) =>
        a.categoryUrl.split('/').length > b.categoryUrl.split('/').length ? a : b,
      ).categoryUrl;
    }

    const carouselImages = this.product.getImages();

    const emitImages = () => {
      this.productImagesPreloaded = true;
      this.productImages = carouselImages;
    };

    if (this.isBrowser) {
      preloadImages(carouselImages).subscribe(emitImages);
    } else {
      emitImages();
    }
    this.setSeoData();
  }

  addToWishlist() {
    this.isWishlisted = !this.isWishlisted;
    this.wishlistService.addOrDeleteItem(this.productId);
  }

  private handleProductError(error: any) {
    console.error('error loading product', error);
    this.router.navigateByUrl(this.localize.translateRoute('/404') as string);
  }

  setSeoData() {
    this.translateService
      .get(['SEO.pdp.title', 'SEO.pdp.description'], {
        productName: this.product.custom.seoTitle,
      })
      .subscribe(translations => {
        const currentUrl: string = this.router.url;
        const baseUrl: string = getUrlPathname(currentUrl);
        this.seoService.loadSeoMetadata(PageTypes.PDP, {
          moreToLoad: false,
          fallbackData: {
            title: translations['SEO.pdp.title'],
            description: translations['SEO.pdp.description'],
            img: this.product.previewImageSrc ? this.product.previewImageSrc : baseUrl + '/assets/logo.svg',
          },
        });
      });
  }

  ngAfterViewInit() {
    if (!this.isBrowser) {
      return;
    }
    this.layoutSub = this.breakpointObserver.getMobileLayoutObserver().subscribe(isMobile => {
      this.isMobile = isMobile;
    });
  }

  public ngOnDestroy() {
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }

    if (this.productSub) {
      this.productSub.unsubscribe();
    }
    if (this.layoutSub) {
      this.layoutSub.unsubscribe();
    }
  }
}
