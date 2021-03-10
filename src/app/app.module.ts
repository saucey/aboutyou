import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { APP_INITIALIZER, LOCALE_ID, NgModule, PLATFORM_ID } from '@angular/core';
import { BrowserModule, ɵgetDOM } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { TransferHttpCacheModule } from '@nguniversal/common';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { PrebootModule } from 'preboot';
import { AppComponent } from './app.component';
import { GlobalModule } from './common/global.module';
import { CommonModule } from './common/modules/common.module';
import { DepotCheckoutModule } from './common/modules/depot-checkout/depot-checkout.module';
import { APP_STABLE_INITIALIZER } from './core/app-stable-initializer/app-stable-initializer.token';
import { BasketService } from './core/basket';
import { ReservationBasketModule } from './core/reservation-basket';
import { ServicesModule } from './core/services/services.module';
import { ShopService } from './core/services/shop.service';
import { WishlistService } from './core/services/wishlist/wishlist.service';
import { AppRoutingModule } from './core/shop/app-routing.module';
import { metaReducers, reducers } from './core/shop/store';
import { NotFoundModule } from './pages/404/404.module';
import { AccountModule } from './pages/account/account.module';
import { BasketModule } from './pages/basket/basket.module';
import { CheckoutModule } from './pages/checkout/checkout.module';
import { HomeModule } from './pages/home/home.module';
import { NewsletterModule } from './pages/newsletter/newsletter.module';
import { OrderSuccessModule } from './pages/order-success/order-success.module';
import { ProductDetailModule } from './pages/product-detail/product-detail.module';
import { ProductListingModule } from './pages/product-listing/product-listing.module';
import { ReservationConfirmationModule } from './pages/reservation-confirmation/reservation-confirmation.module';
import { WishlistModule } from './pages/wishlist/wishlist.module';
import { registerLocalesForAngularPipes } from './register-locales-for-angular-pipes';

registerLocalesForAngularPipes();

/**
 * This is responsible for avoiding double rendering of server rendered UI
 * Mode details: https://www.npmjs.com/package/preboot
 */
const AppInitializerFactory = (document: HTMLDocument, platformId: object) => () => {
  if (isPlatformBrowser(platformId)) {
    const dom = ɵgetDOM();
    const styles: any[] = Array.prototype.slice.apply(dom.querySelectorAll(document, `style[ng-transition]`));
    styles.forEach(el => {
      // Remove ng-transition attribute to prevent Angular appInitializerFactory
      // to remove server styles before preboot complete
      el.removeAttribute('ng-transition');
    });
    document.addEventListener('PrebootComplete', () => {
      // After preboot complete, remove the server scripts
      setTimeout(() => styles.forEach(el => dom.remove(el)));
    });
  }
};

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    PrebootModule.withConfig({ appRoot: 'app-root' }),
    TransferHttpCacheModule,
    ServicesModule,
    StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
      },
    }),
    EffectsModule.forRoot([]),
    NgxSkeletonLoaderModule,
    GlobalModule,
    CommonModule,
    NotFoundModule,
    HomeModule,
    BasketModule,
    CheckoutModule,
    WishlistModule,
    OrderSuccessModule,
    ProductDetailModule,
    ProductListingModule,
    AccountModule,
    NewsletterModule,
    DepotCheckoutModule,
    ReservationBasketModule,
    ReservationConfirmationModule,
    AppRoutingModule,
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: AppInitializerFactory,
      deps: [DOCUMENT, PLATFORM_ID],
      multi: true,
    },
    {
      provide: LOCALE_ID,
      deps: [ShopService],
      useFactory: (shopService: ShopService) => shopService.getShop().shop.locale,
    },
    {
      provide: APP_STABLE_INITIALIZER,
      useExisting: BasketService,
      multi: true,
    },
    {
      provide: APP_STABLE_INITIALIZER,
      useExisting: WishlistService,
      multi: true,
    },
  ],
  exports: [GlobalModule],
})
export class AppModule {}
