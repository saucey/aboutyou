import { BasketResponse } from '@aboutyou/backbone/helpers/BapiClient';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { basketResponseSuccessMock } from 'src/app/core/basket/basket-response-succes.mock';
import { ReservationBasketApiService, reservationBasketUrl } from './reservation-basket-api.service';

describe('ReservationBasketApiService', () => {
  let httpTestingController: HttpTestingController;
  let service: ReservationBasketApiService;
  let basketUrl: string;
  let resultResponse: BasketResponse;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });

    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.get(ReservationBasketApiService);
    basketUrl = reservationBasketUrl;
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  describe('#getBasket', () => {
    it('should call GET /api/reservation-basket', () => {
      service.getReservationBasket().subscribe(assignResultResponse());
      httpTestingController.match({ method: 'GET', url: basketUrl })[0].flush(basketResponseSuccessMock);
      thenResponseIsEqual();
    });
  });

  describe('#addOrUpdateItem()', () => {
    it('should dispatch call POST /api/reservation-basket with body variantId, quantity and storeId', () => {
      service.addOrUpdateItem({ variantId: 123, quantity: 5, storeId: 123456 }).subscribe(assignResultResponse());
      httpTestingController
        .expectOne(request => {
          return (
            request.url === basketUrl &&
            request.method === 'POST' &&
            request.body.variantId === 123 &&
            request.body.quantity === 5 &&
            request.body.storeId === 123456
          );
        })
        .flush(basketResponseSuccessMock);
      thenResponseIsEqual();
    });
  });

  describe('updateItemQuantity()', () => {
    it('should call PUT /api/reservation-basket with body variantId and quantity', () => {
      service.updateItemQuantity(123, 5).subscribe(assignResultResponse());
      httpTestingController
        .expectOne(request => {
          return (
            request.url === basketUrl &&
            request.method === 'PUT' &&
            request.body.variantId === 123 &&
            request.body.quantity === 5
          );
        })
        .flush(basketResponseSuccessMock);
      thenResponseIsEqual();
    });
  });

  describe('deleteItem()', () => {
    it('should call DELETE /api/reservation-basket/123 with body variantId and quantity', () => {
      service.deleteItem(123).subscribe(assignResultResponse());
      httpTestingController
        .expectOne(request => {
          return request.url === basketUrl + '/123' && request.method === 'DELETE';
        })
        .flush(basketResponseSuccessMock);
      thenResponseIsEqual();
    });
  });

  function assignResultResponse() {
    return result => (resultResponse = result);
  }

  function thenResponseIsEqual(expectedResponse: BasketResponse = basketResponseSuccessMock) {
    expect(expectedResponse).toEqual(resultResponse);
  }
});
