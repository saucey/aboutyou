import { async, ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { MockStore } from '@ngrx/store/testing';
import { BasketService } from 'src/app/core/basket';
import { createBasketStateMock } from 'src/app/core/basket/state/basket-state.mock';
import { CONFIG_TOKEN } from 'src/app/core/config.provider';
import { AppState } from 'src/app/core/shop/store';
import { IConfig } from 'src/app/core/shop/types';
import { RouterTestingWithLocalizationModule } from 'src/tests/fixtures/router-testing-with-localization.module';
import { NgrxTestingModule } from 'src/tests/fixtures/ngrx-testing.module';
import { CostOverviewComponent } from 'src/app/common/components/cost-overview/cost-overview.component';
import { BasketListGroupedByPackageComponent } from '../components/basket-list-grouped-by-package/basket-list-grouped-by-package.component';
import { CheckoutBasketComponent } from './checkout-basket.component';
import { CheckoutBasketModule } from './checkout-basket.module';
import { PaymentMethodsComponent } from './payment-methods/payment-methods.component';
import { PaymentPartnerComponent } from './payment-partner/payment-partner.component';

describe('Integration Test: CheckoutBasketComponent', () => {
  let component: CheckoutBasketComponent;
  let fixture: ComponentFixture<CheckoutBasketComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CheckoutBasketModule, RouterTestingWithLocalizationModule, NgrxTestingModule],
      providers: [
        { provide: BasketService, useValue: jasmine.createSpyObj<BasketService>('BasketService', ['onAppStable']) },
        { provide: CONFIG_TOKEN, useValue: { basket: { groupByPackage: true } } },
      ],
    });
  }));

  beforeEach(() => {
    initComponent();
  });

  it('should be defined', () => {
    expect(component).toBeDefined();
  });

  describe('#groupByPackage', () => {
    let config: IConfig;
    let store: MockStore<AppState>;

    beforeEach(() => {
      store = TestBed.get(Store);
      store.setState(({
        basket: createBasketStateMock(),
        wishlist: {},
      } as any) as AppState);
      config = TestBed.get(CONFIG_TOKEN);
    });

    describe('#config.basket.groupItemsByPackage is true', () => {
      beforeEach(() => {
        config.basket.groupItemsByPackage = true;
        initComponent();
      });

      it('should be true if #config.basket.groupItemsByPackage is true', fakeAsync(() => {
        expect(component.groupItemsByPackage).toBeTrue();
      }));

      it('should render BasketListGroupedByPackageComponent', () => {
        const basketListGroupedByPackage = queryBasketListGroupByPackageComponent();
        expect(basketListGroupedByPackage).toBeDefined();
      });

      it('should set #notDeliverableItems input', () => {
        fixture.detectChanges();
        const basketListGroupedByPackage = queryBasketListGroupByPackageComponent();
        expect(basketListGroupedByPackage.notDeliverableItems).toBeDefined();
      });

      it('should set input #basketItemsGroupedByPackage', () => {
        const basketListGroupedByPackage = queryBasketListGroupByPackageComponent();
        expect(basketListGroupedByPackage.basketItemsGroupedByPackage).toBeDefined();
      });

      it('should set input #packagesInformation', () => {
        const basketListGroupedByPackage = queryBasketListGroupByPackageComponent();
        expect(basketListGroupedByPackage.packagesInformation).toBeDefined();
      });

      it('should not render BasketListComponent', () => {
        const basketListComponentDebugElement = queryBasketListDebugElement();
        expect(basketListComponentDebugElement).toBeNull();
      });

      function queryBasketListGroupByPackageComponent(): BasketListGroupedByPackageComponent {
        return fixture.debugElement.query(By.directive(BasketListGroupedByPackageComponent)).componentInstance;
      }
    });

    describe('#config.basket.groupItemsByPackage is false', () => {
      beforeEach(() => {
        config.basket.groupItemsByPackage = false;
        initComponent();
      });

      it('should be false if #config.basket.groupItemsByPackage is false', () => {
        expect(component.groupItemsByPackage).toBeFalse();
      });

      it('should not render BasketListGroupedByPackageComponent', () => {
        const basketListGroupedByPackage = fixture.debugElement.query(
          By.directive(BasketListGroupedByPackageComponent),
        );
        expect(basketListGroupedByPackage).toBeNull();
      });

      it('should render BasketListComponent', () => {
        const basketListComponent = queryBasketListDebugElement().componentInstance;
        expect(basketListComponent).toBeDefined();
      });
    });
  });

  describe('rendering of filled basket', () => {
    let store: MockStore<AppState>;

    beforeEach(() => {
      store = TestBed.get(Store);
      store.setState(({
        basket: createBasketStateMock(),
        wishlist: {},
      } as any) as AppState);
    });

    it('should render #CostOverviewComponent', () => {
      expect(fixture.debugElement.query(By.directive(CostOverviewComponent))).toBeDefined();
    });

    it('should render #PaymentMethodsComponent', () => {
      expect(fixture.debugElement.query(By.directive(PaymentMethodsComponent))).toBeDefined();
    });

    it('should render #PaymentPartnerComponent', () => {
      expect(fixture.debugElement.query(By.directive(PaymentPartnerComponent))).toBeDefined();
    });
  });

  function initComponent() {
    fixture = TestBed.createComponent(CheckoutBasketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }

  function queryBasketListDebugElement() {
    return fixture.debugElement.query(By.css('.basket-list-container > .basket-list'));
  }
});
