import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MemoizedSelector, Store } from '@ngrx/store';
import { MockStore } from '@ngrx/store/testing';
import { TranslateService } from '@ngx-translate/core';
import { BasketItemsGroupedByPackage, selectBasketItemsGroupedByPackage } from 'src/app/core/basket/state';
import { createBasketStateMock } from 'src/app/core/basket/state/basket-state.mock';
import { AppState } from 'src/app/core/shop/store';
import { initialState as initialWishlistState } from 'src/app/core/shop/store/wishlist';
import { ICurrency } from 'src/app/core/shop/types';
import { NgrxTestingModule } from 'src/tests/fixtures/ngrx-testing.module';
import { TranslateTestingModule } from 'src/tests/fixtures/translate-testing.module';
import { BasketListHeaderComponent } from '../../checkout-basket/basket-list-header/basket-list-header.component';
import { BasketListSkeletonComponent } from '../../shared/basket-list-skeleton/basket-list.skeleton';
import { BasketListComponent } from '../basket-list/basket-list.component';
import { BasketListGroupedByPackageComponent } from './basket-list-grouped-by-package.component';

describe('BasketListGroupedByPackageComponent', () => {
  let component: BasketListGroupedByPackageComponent;
  let fixture: ComponentFixture<BasketListGroupedByPackageComponent>;

  beforeEach(async(() =>
    TestBed.configureTestingModule({
      declarations: [
        BasketListGroupedByPackageComponent,
        BasketListComponent,
        BasketListHeaderComponent,
        BasketListSkeletonComponent,
      ],
      imports: [TranslateTestingModule, NgrxTestingModule],
      schemas: [NO_ERRORS_SCHEMA],
    })));

  beforeEach(() => {
    const mockStore: MockStore<Pick<AppState, 'basket' & 'wishlist'>> = TestBed.get(Store);
    mockStore.setState({ basket: createBasketStateMock(), wishlist: initialWishlistState });
    fixture = TestBed.createComponent(BasketListGroupedByPackageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be defined', () => {
    expect(component).toBeDefined();
  });

  it('should render skeleton if loading', () => {
    expect(querySkeleton()).toBeDefined();
  });

  describe('#basketItemsList ', () => {
    let selectGroupedItems: MemoizedSelector<AppState, BasketItemsGroupedByPackage>;
    let store: MockStore<Pick<AppState, 'basket'>>;
    let currency: ICurrency;

    beforeEach(async(() => {
      store = TestBed.get(Store);

      currency = {
        locale: 'de',
        code: 'EUR',
      };

      selectGroupedItems = selectBasketItemsGroupedByPackage(currency, TestBed.get(TranslateService));

      store.select(selectGroupedItems).subscribe((itemsGroupedByPackage: BasketItemsGroupedByPackage) => {
        component.basketItemsGroupedByPackage = itemsGroupedByPackage.groupedItemsMap;
        component.packagesInformation = itemsGroupedByPackage.packageMap;
        component.currency = currency;
        fixture.detectChanges();
      });
    }));

    describe('grouped by package', () => {
      it('should not render skeleton', () => {
        expect(querySkeleton()).toBeNull();
      });

      it('should render 2 #BasketPackageInfo', () => {
        const packageInfoDebugElement = fixture.debugElement.queryAll(By.css('.package-group app-basket-package-info'));
        expect(packageInfoDebugElement.length).toEqual(2);
      });

      it('should render 2 #BasketLists', () => {
        const basketListItemDebugElement = fixture.debugElement.queryAll(By.directive(BasketListComponent));
        expect(basketListItemDebugElement.length).toEqual(2);
      });

      it('should render 2 #BasketLists', () => {
        const basketListItemDebugElement = fixture.debugElement.queryAll(By.directive(BasketListComponent));
        expect(basketListItemDebugElement.length).toEqual(2);
      });

      it('should not render not deliverable items list', () => {
        const notDeliverableItemsList = fixture.debugElement.query(By.css('.not-deliverable-items-list'));
        expect(notDeliverableItemsList).toBeNull();
      });
    });

    describe('not deliverable item list', () => {
      beforeEach(async(() => {
        store.select(selectGroupedItems).subscribe((itemsGroupedByPackage: BasketItemsGroupedByPackage) => {
          component.basketItemsGroupedByPackage = new Map();
          component.packagesInformation = new Map();
          component.notDeliverableItems = itemsGroupedByPackage.groupedItemsMap.get(1);
          component.currency = currency;
          fixture.detectChanges();
        });
      }));

      it('should render "not-deliverable-items-list" container', () => {
        const itemsList = fixture.debugElement.query(By.css('.not-deliverable-items-list'));
        expect(itemsList).toBeDefined();
      });

      it('should render deliverable item list header', () => {
        const itemsListHeader = fixture.debugElement.query(By.css('.not-deliverable-list-header'));
        expect(itemsListHeader.nativeElement.textContent).toContain('BASKET.listHeader.notDeliverable');
      });

      it('should render article count', () => {
        const appBasketListHeader: BasketListHeaderComponent = fixture.debugElement.query(
          By.directive(BasketListHeaderComponent),
        ).componentInstance;
        expect(appBasketListHeader).toBeDefined();
        expect(appBasketListHeader.showTitle).toBeFalse();
        expect(appBasketListHeader.basketItemsLength).toBe(component.notDeliverableItems.length);
      });

      it('should render item list', () => {
        const appBasketList = fixture.debugElement.query(By.css('.not-deliverable-items-list app-basket-list'));
        expect(appBasketList).toBeDefined();
      });

      it('should render item list with correct list elements', () => {
        const appBasketList = fixture.debugElement.query(By.directive(BasketListComponent));
        const componentInstance: BasketListComponent = appBasketList.componentInstance;
        expect(componentInstance.basketItems).toEqual(component.notDeliverableItems);
      });
    });
  });

  function querySkeleton() {
    return fixture.debugElement.query(By.directive(BasketListSkeletonComponent));
  }
});
