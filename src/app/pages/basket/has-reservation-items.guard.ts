import { isPlatformServer } from '@angular/common';
import { ApplicationRef, Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { LocalizeRouterService } from '@gilsdav/ngx-translate-router';
import { Store } from '@ngrx/store';
import { selectAccountState } from 'src/app/core/shop/store/account';
import { AppStateWithReservationBasket } from 'src/app/core/reservation-basket/app-state-with-reservation-basket';
import { Observable, of } from 'rxjs';
import { catchError, first, map, switchMap, switchMapTo, timeout } from 'rxjs/operators';
import { selectReservationBasketItemsCount } from 'src/app/core/reservation-basket/state';

@Injectable({ providedIn: 'root' })
export class HasReservationItemsGuard implements CanActivate {
  constructor(
    private store: Store<AppStateWithReservationBasket>,
    private router: Router,
    private localizeRouterService: LocalizeRouterService,
    @Inject(PLATFORM_ID) private platformId: object,
    private appRef: ApplicationRef,
  ) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> {
    return isPlatformServer(this.platformId)
      ? of(true)
      : this.hasReservationBasketItems().pipe(map(hasItems => (hasItems ? true : this.redirectToCheckoutBasket())));
  }

  private redirectToCheckoutBasket(): UrlTree {
    const translatedCheckoutRoute = this.localizeRouterService.translateRoute('/basket/checkout');
    return this.router.createUrlTree([translatedCheckoutRoute]);
  }

  private hasReservationBasketItems(): Observable<boolean> {
    const isStable$ = this.appRef.isStable.pipe(first(isStable => isStable));

    const isAuthenticated$ = this.store.select(selectAccountState).pipe(
      first(acc => !acc.isLoading),
      map(({ isAuthenticated }) => isAuthenticated),
    );

    const waitForItems1Sec = this.store.select(selectReservationBasketItemsCount).pipe(
      first(count => count > 0),
      map(count => count > 0),
      timeout(1000),
      catchError(err => of(false)),
    );

    return isStable$.pipe(
      switchMapTo(isAuthenticated$),
      switchMap(authenticated => (authenticated ? waitForItems1Sec : of(false))),
    );
  }
}
