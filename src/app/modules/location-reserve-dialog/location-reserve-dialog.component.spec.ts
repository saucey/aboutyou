import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Store } from '@ngrx/store';
import { MockStore } from '@ngrx/store/testing';
import { ShopService } from 'src/app/core/services/shop.service';
import { of } from 'rxjs';
import { NgrxTestingModule } from 'src/tests/fixtures/ngrx-testing.module';
import { TranslateTestingModule } from 'src/tests/fixtures/translate-testing.module';
import { MatDialogRefMock, provideMockMatDialogRef } from 'src/tests/mocks/mat-dialog-ref.mock';
import { ReservationBasketService } from 'src/app/core/reservation-basket';
import { AddOrUpdateParam } from 'src/app/core/reservation-basket/add-or-update-param';
import { AppStateWithReservationBasket, initialState } from 'src/app/core/reservation-basket/state';
import { createReservationBasketStateMock } from 'src/app/core/reservation-basket/state/reservation-basket-state.mock';
import { ProductMap } from 'src/app/mappers/product';
import { LocationAvailabilityService } from './location-availability.service';
import { LocationReservationDialogData } from './location-reservation-dialog.data';
import { LocationReserveDialogComponent } from './location-reserve-dialog.component';
import { ReservationMessageService } from './reservation-message.service';
import { ReservationStoreDetails } from './reservation-store-details';
import { createReservationStoreDetailsMock } from './reservation-store-details.mock';
import Spy = jasmine.Spy;

describe('LocationReserveDialogComponent', () => {
  let fixture: ComponentFixture<LocationReserveDialogComponent>;
  let component: LocationReserveDialogComponent;
  let model: { data: LocationReservationDialogData };
  let shopService;
  let reservationBasketService: ReservationBasketService;
  let locationAvailabilityService: LocationAvailabilityService;

  let reservationStoreDetails: ReservationStoreDetails[];

  let mockStore: MockStore<Partial<AppStateWithReservationBasket>>;

  beforeEach(() => {
    globalThis.google = {
      maps: {
        Point: class {
          constructor(public lang: number, public lat: number) {}
        },
        Geocoder: class {
          geocode() {
            /**/
          }
        } as any,
      },
    } as any;

    model = {
      data: {
        product: ({
          previewImageSrc: 'https://www.google.com',
          custom: {
            articleNumber: '',
            productTitle: '',
          },
        } as any) as ProductMap,
        variantId: 26884,
      },
    };
    reservationStoreDetails = createReservationStoreDetailsMock();
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        HttpClientTestingModule,
        MatSnackBarModule,
        TranslateTestingModule,
        NgrxTestingModule,
      ],
      declarations: [LocationReserveDialogComponent],
      providers: [{ provide: MAT_DIALOG_DATA, useValue: model.data }, provideMockMatDialogRef()],
      schemas: [NO_ERRORS_SCHEMA],
    });

    shopService = TestBed.get(ShopService);

    spyOn(shopService, 'getShop').and.returnValue({
      shop: {
        currency: {
          locale: 'de-CH',
        },
      },
    });

    mockStore = TestBed.get(Store);
    mockStore.setState({
      account: { isAuthenticated: true, isLoading: false },
      reservationBasket: initialState,
    });

    locationAvailabilityService = TestBed.get(LocationAvailabilityService);
    spyOn(locationAvailabilityService, 'getLocationAvailability').and.returnValue(of(reservationStoreDetails));

    reservationBasketService = TestBed.get(ReservationBasketService);
    spyOn(reservationBasketService, 'addOrUpdateItem').and.returnValue(of(true));

    fixture = TestBed.createComponent(LocationReserveDialogComponent);
    component = fixture.componentInstance;
  }));

  afterEach(() => {
    delete globalThis.google;
    component.ngOnDestroy();
  });

  it('should construct', () => {
    expect(component).toBeTruthy();
  });

  describe('functions', () => {
    beforeEach(() => {
      component.ngOnInit();
      component.availabilitiesSearchForm.setValue({ zipcode: '12345', productsAvailable: false });
      (locationAvailabilityService.getLocationAvailability as Spy).and.returnValue(of(reservationStoreDetails));
    });

    it('should call ngOnInit', () => {
      expect(component).toBeTruthy();
    });

    describe('#submitAvailabilitiesSearch', () => {
      it('should call locationAvailabilityService.getLocationAvailability', () => {
        component.submitAvailabilitiesSearch();
        expect(locationAvailabilityService.getLocationAvailability).toHaveBeenCalledWith('', '12345', 50);
      });

      it('should set component.center to the first store lng lat values', () => {
        component.submitAvailabilitiesSearch();
        const { latitude: lat, longitude: lng } = reservationStoreDetails[0];
        expect(component.center).toEqual(jasmine.objectContaining({ lat: Number(lat), lng: Number(lng) }));
      });
    });

    describe('#makeReservation', () => {
      let reservationMessageService: ReservationMessageService;
      let dialogRefMock: MatDialogRefMock;
      beforeEach(() => {
        reservationMessageService = TestBed.get(ReservationMessageService);
        spyOn(reservationMessageService, 'setReservationMessage');

        dialogRefMock = TestBed.get(MatDialogRef);
        spyOn(dialogRefMock, 'close');
      });

      it('should call #reservationBasketService.addOrUpdateItem', fakeAsync(() => {
        component.submitAvailabilitiesSearch();
        const storeDetail = reservationStoreDetails[0];
        const storeId = storeDetail.storeId;
        component.makeReservation(storeDetail);
        const params: AddOrUpdateParam = {
          variantId: model.data.variantId,
          quantity: component.quantity,
          storeId,
        };
        expect(reservationBasketService.addOrUpdateItem).toHaveBeenCalledWith(params);
      }));

      it('should call #setReservationMessage when addOrUpdate returns true. Then close the dialog', fakeAsync(() => {
        component.submitAvailabilitiesSearch();
        const storeDetail = reservationStoreDetails[0];
        component.makeReservation(storeDetail);

        mockStore.setState({
          account: { isAuthenticated: true, isLoading: false },
          reservationBasket: createReservationBasketStateMock(storeDetail.storeId),
        });
        tick(1);
        expect(reservationMessageService.setReservationMessage).toHaveBeenCalled();
        expect(dialogRefMock.close).toHaveBeenCalled();
      }));

      it('should showErrorMessage addOrUpdate returns false.', fakeAsync(() => {
        component.submitAvailabilitiesSearch();
        const storeDetail = reservationStoreDetails[0];
        component.makeReservation(storeDetail);

        tick(1);
        expect(reservationMessageService.setReservationMessage).toHaveBeenCalled();
        expect(dialogRefMock.close).toHaveBeenCalled();
      }));
    });
  });
});
