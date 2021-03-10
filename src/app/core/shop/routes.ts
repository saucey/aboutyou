import { Routes } from '@angular/router';
// tslint:disable-next-line: max-line-length
import { AuthLoginFailedComponent } from 'src/app/common/modules/auth/components/auth-login-failed/auth-login-failed.component';
// tslint:disable-next-line: max-line-length
import { AuthLoginSuccessComponent } from 'src/app/common/modules/auth/components/auth-login-success/auth-login-success.component';
// tslint:disable-next-line: max-line-length
import { AuthLogoutSuccessComponent } from 'src/app/common/modules/auth/components/auth-logout-success/auth-logout-success.component';
import { CONFIG } from 'src/app/configs';
import { NotFoundComponent } from 'src/app/pages/404/404.component';
import { BasketComponent } from 'src/app/pages/basket/basket.component';
import { HasReservationItemsGuard } from 'src/app/pages/basket/has-reservation-items.guard';
import { HomeComponent } from 'src/app/pages/home/home.component';
import { OrderSuccessComponent } from 'src/app/pages/order-success/order-success.component';
import { ProductDetailComponent } from 'src/app/pages/product-detail/product-detail.component';
import { ProductListingComponent } from 'src/app/pages/product-listing/pages/category-page/product-listing.component';
import { SearchPageComponent } from 'src/app/pages/product-listing/pages/search-page/search-page.component';
import { WishlistComponent } from 'src/app/pages/wishlist/wishlist.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, data: { animation: 'home' } },
  { path: '404', component: NotFoundComponent, data: { animation: '404' } },
  {
    path: 'basket',
    component: BasketComponent,
    data: { animation: 'basket' },
    children: [
      {
        path: 'checkout',
        loadChildren: () =>
          import('src/app/pages/basket/checkout-basket/checkout-basket.module').then(m => m.CheckoutBasketModule),
      },
      {
        path: 'reservations',
        loadChildren: () =>
          import('src/app/pages/basket/reservation-basket/reservation-basket.module').then(
            m => m.ReservationBasketModule,
          ),

        canActivate: [HasReservationItemsGuard],
      },
      { path: '', redirectTo: 'checkout', pathMatch: 'full' },
    ],
  },
  { path: 'wishlist', component: WishlistComponent, data: { animation: 'wishlist' } },
  {
    path: 'auth',
    children: [
      { path: 'success', component: AuthLoginSuccessComponent },
      { path: 'failed', component: AuthLoginFailedComponent },
    ],
    data: { skipRouteLocalization: true },
  },
  {
    path: CONFIG.shop.checkout.ospRoute,
    children: [{ path: '', component: OrderSuccessComponent }],
    data: { skipRouteLocalization: true },
  },
  {
    path: CONFIG.shop.checkout.logoutRedirectRoute,
    children: [{ path: '', component: AuthLogoutSuccessComponent }],
    data: { skipRouteLocalization: true },
  },
  { path: 'p/:productId', component: ProductDetailComponent, data: { animation: 'pdp' } },
  /**
   * `p/co/co-PRODUCT_ID` is the path COFE expects the Storefront to have for PDP
   */
  {
    path: 'p/co/:productId',
    component: ProductDetailComponent,
    data: { skipRouteLocalization: true },
  },
  { path: 'search', component: SearchPageComponent, data: { animation: 'search' } },
  { path: '**', component: ProductListingComponent, data: { animation: 'plp' } },
];
