import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ShopService } from 'src/app/core/services/shop.service';
import { IFoundShop } from 'src/app/core/shop/utils';
import { BreakpointObserverService } from 'src/app/common/services/breakpoint-observer.service';
import { WishlistComponent } from 'src/app/pages/wishlist/wishlist.component';
import { WishlistModule } from 'src/app/pages/wishlist/wishlist.module';
import createSpyObj = jasmine.createSpyObj;
import SpyObj = jasmine.SpyObj;
import { RouterTestingWithLocalizationModule } from 'src/tests/fixtures/router-testing-with-localization.module';
import { NgrxTestingModule } from 'src/tests/fixtures/ngrx-testing.module';

describe('WishlistComponent', () => {
  let fixture: ComponentFixture<WishlistComponent>;
  let component: WishlistComponent;
  let shopService: SpyObj<ShopService>;
  let shopMock: IFoundShop;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [WishlistModule, RouterTestingWithLocalizationModule, NgrxTestingModule],
      providers: [
        { provide: ShopService, useValue: createSpyObj<ShopService>('ShopService', ['getShop']) },
        BreakpointObserverService,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    const currencyMock = {
      code: 'EUR',
      locale: 'de-DE',
    };
    shopMock = { shop: { currency: currencyMock } } as any;

    shopService = TestBed.get(ShopService);
    shopService.getShop.and.returnValue(shopMock);

    fixture = TestBed.createComponent(WishlistComponent);
    component = fixture.componentInstance;
  });

  it('should be defined', () => {
    expect(component).toBeDefined();
  });

  it('should get the currency from ShopService', () => {
    expect(component.currency).toEqual(shopMock.shop.currency);
  });
});
