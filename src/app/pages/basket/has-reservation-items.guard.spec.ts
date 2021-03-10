import { ApplicationRef } from '@angular/core';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Router, UrlTree } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { LocalizeRouterService } from '@gilsdav/ngx-translate-router';
import { Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { selectAccountState } from 'src/app/core/shop/store/account';
import { of } from 'rxjs';
import {
  AppStateWithReservationBasket,
  selectReservationBasketItemsCount,
} from 'src/app/core/reservation-basket/state';
import { HasReservationItemsGuard } from './has-reservation-items.guard';
import createSpyObj = jasmine.createSpyObj;
import SpyObj = jasmine.SpyObj;

describe('HasReservationItemsGuard', () => {
  let guard: SpyObj<HasReservationItemsGuard>;
  let storeMock: MockStore<Pick<AppStateWithReservationBasket, 'reservationBasket'>>;
  let localizeRouteService: SpyObj<LocalizeRouterService>;
  let expectedRedirectResult: UrlTree;
  let actualResult: UrlTree | boolean;

  beforeEach(() => {
    localizeRouteService = createSpyObj('LocalizeRouteService', ['translateRoute']);

    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        { provide: LocalizeRouterService, useValue: localizeRouteService },
        {
          provide: ApplicationRef,
          useValue: {
            isStable: of(true),
          },
        },
        provideMockStore<Pick<AppStateWithReservationBasket, 'reservationBasket'>>(),
      ],
    });

    localizeRouteService.translateRoute.and.returnValue('de/basket/checkout');

    storeMock = TestBed.get(Store);
    storeMock.overrideSelector(selectAccountState, { isLoading: false, isAuthenticated: true });

    guard = TestBed.get(HasReservationItemsGuard);

    expectedRedirectResult = (TestBed.get(Router) as Router).createUrlTree(['de/basket/checkout']);
    actualResult = undefined;
  });

  it('should return true if items are present', fakeAsync(() => {
    storeMock.overrideSelector(selectReservationBasketItemsCount, 1);
    whenActivateIsCalled();
    expect(actualResult).toBeTrue();
  }));

  it('should redirect to /de/basket/checkout if user is not authenticated', fakeAsync(() => {
    storeMock.overrideSelector(selectAccountState, { isLoading: false, isAuthenticated: false });
    whenActivateIsCalled();
    thenRedirectsToCheckoutBasket();
  }));

  it('should redirect to /de/basket/checkout if no item is present after timeout of 1sec', fakeAsync(() => {
    storeMock.overrideSelector(selectReservationBasketItemsCount, 0);
    whenActivateIsCalled();
    tick(1001);
    thenRedirectsToCheckoutBasket();
  }));

  it('should return true if no item is present first but then is available before 1sec', fakeAsync(() => {
    storeMock.overrideSelector(selectReservationBasketItemsCount, 0);
    whenActivateIsCalled();
    tick(450);
    expect(actualResult).toBeUndefined();
    storeMock.overrideSelector(selectReservationBasketItemsCount, 1);
    storeMock.refreshState();
    expect(actualResult).toBeTrue();
  }));

  function whenActivateIsCalled() {
    guard.canActivate(null, null).subscribe(result => (actualResult = result));
    tick(1);
  }

  function thenRedirectsToCheckoutBasket() {
    expect(actualResult).toEqual(expectedRedirectResult);
  }
});
