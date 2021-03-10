import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { MatTabsModule } from '@angular/material/tabs';
import { MemoizedSelector, Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { selectBasketItemsCount } from 'src/app/core/basket';
import { AppState } from 'src/app/core/shop/store';
import { RouterTestingWithLocalizationModule } from 'src/tests/fixtures/router-testing-with-localization.module';
import { AppStateWithReservationBasket } from 'src/app/core/reservation-basket/app-state-with-reservation-basket';
import { selectReservationBasketItemsCount } from 'src/app/core/reservation-basket/state';
import { BasketComponent } from './basket.component';
import { BasketComponentPageObj } from './basket.component.po';
import { BasketLink } from './basket-link';

describe('BasketComponent ', () => {
  let component: BasketComponent;
  let fixture: ComponentFixture<BasketComponent>;
  let storeMock: MockStore<Partial<AppState>>;
  let reservationItemsSelectorMock: MemoizedSelector<AppState, number>;
  let checkoutItemsSelectorMock: MemoizedSelector<AppState, number>;

  let pageObj: BasketComponentPageObj;
  beforeEach(async(() =>
    TestBed.configureTestingModule({
      declarations: [BasketComponent],
      imports: [MatTabsModule, RouterTestingWithLocalizationModule],
      providers: [provideMockStore<Partial<AppStateWithReservationBasket>>({})],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents()));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasketComponent);
    component = fixture.componentInstance;
    pageObj = new BasketComponentPageObj(fixture);

    storeMock = TestBed.get(Store);
    reservationItemsSelectorMock = storeMock.overrideSelector(selectReservationBasketItemsCount, 0);
    checkoutItemsSelectorMock = storeMock.overrideSelector(selectBasketItemsCount, 0);

    storeMock.refreshState();
    component.ngOnInit();
    fixture.detectChanges();
  });

  it('should be defined', () => {
    expect(component).toBeDefined();
  });

  function givenReservationItems(itemCount: number = 5) {
    reservationItemsSelectorMock.setResult(itemCount);
    storeMock.refreshState();
    fixture.detectChanges();
  }

  function givenCheckoutItems(itemCount: number = 5) {
    checkoutItemsSelectorMock.setResult(itemCount);
    storeMock.refreshState();
    fixture.detectChanges();
  }

  describe('#showTabHeader$', () => {
    let showTabHeader: boolean;

    beforeEach(fakeAsync(() => component.showTabHeader$.subscribe(show => (showTabHeader = show))));

    it('should return false for showTabHeader$', () => {
      givenReservationItems(0);
      expect(showTabHeader).toBeFalse();
    });

    it('should return true for showTabHeader$', () => {
      givenReservationItems(1);
      expect(showTabHeader).toBeTrue();
    });
  });

  describe('#basketLinks$', () => {
    let basketLinks: BasketLink[];

    beforeEach(fakeAsync(() => {
      component.basketLinks$.subscribe(links => (basketLinks = links));
      givenReservationItems(5);
      givenCheckoutItems(5);
    }));

    it('should have a correct checkoutLink', () => {
      const checkoutLink = basketLinks[0];

      const expectedCheckoutLink: BasketLink = {
        itemCount: 5,
        labelKey: 'BASKET.tabTitle',
        path: 'checkout',
      };
      expect(checkoutLink).toEqual(expectedCheckoutLink);
    });

    it('should have a reservationLink', fakeAsync(() => {
      const reservationLink = basketLinks[1];

      const expectedReservationLink: BasketLink = {
        itemCount: 5,
        labelKey: 'RESERVATION_BASKET.tabTitle',
        path: 'reservations',
      };
      expect(reservationLink).toEqual(expectedReservationLink);
    }));
  });

  describe('rendering ', () => {
    describe('without reservation items', () => {
      it('should show checkout-basket-header', () => {
        expect(pageObj.getCheckoutBasketHeaderDebugElem()).toBeDefined();
        expect(pageObj.getCheckoutBasketHeaderText()).toContain('BASKET.yours');
      });

      it('should show checkout-basket-header for empty basket', () => {
        givenCheckoutItems(0);
        expect(pageObj.getCheckoutBasketHeaderDebugElem()).toBeDefined();
        expect(pageObj.getCheckoutBasketHeaderText()).toContain('BASKET.yoursEmpty');
      });

      it('should not show basket-tab-header', () => {
        expect(pageObj.getReservationBasketTabHeaderDebugElem()).toBeNull();
        expect(pageObj.getCheckoutBasketTabHeaderDebugElem()).toBeNull();
      });

      it('should render router-outlet', () => {
        expect(pageObj.getRouterOutletElement()).toBeDefined();
      });
    });

    describe('with reservation items', () => {
      beforeEach(() => {
        givenReservationItems(4);
      });

      it('should show tab-header', () => {
        expect(pageObj.getCheckoutBasketTabHeaderDebugElem()).toBeDefined();
        expect(pageObj.getCheckoutBasketTabHeaderText()).toContain('BASKET.tabTitle');
        expect(pageObj.getReservationBasketTabHeaderText()).toContain('RESERVATION_BASKET.tabTitle');
      });

      it('should not show checkout-basket-header', () => {
        expect(pageObj.getCheckoutBasketHeaderDebugElem()).toBeNull();
      });

      it('should render router-outlet', () => {
        expect(pageObj.getRouterOutletElement()).toBeDefined();
      });
    });
  });
});
