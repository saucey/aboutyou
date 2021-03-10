import { BasketApiService } from 'src/app/core/basket/basket-api.service';
import { basketResponseSuccessMock } from 'src/app/core/basket/basket-response-succes.mock';
import { getBasketUrl } from 'src/app/core/services/resolveEnvs';

import { BasketResponse } from '@aboutyou/backbone/helpers/BapiClient';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

describe('BasketApiService', () => {
  let httpTestingController: HttpTestingController;
  let service: BasketApiService;
  let basketUrl: string;
  let resultResponse: BasketResponse;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });

    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.get(BasketApiService);
    basketUrl = getBasketUrl();
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  describe('#getBasket', () => {
    it('should call GET /api/basket', () => {
      service.getBasket().subscribe(assignResultResponse());
      httpTestingController.match({ method: 'GET', url: basketUrl })[0].flush(basketResponseSuccessMock);
      thenResponseIsEqual();
    });
  });

  describe('#addOrUpdateItem()', () => {
    it('should call POST /api/basket with body variantId and quantity and customData', () => {
      service
        .addOrUpdateItem(123, 5, {
          displayData: {
            meta: { value: '' },
            name: { value: 'test' },
            identifier: { value: '' },
            attributes: [{}, {}, {}],
          },
        })
        .subscribe(assignResultResponse());
      httpTestingController
        .expectOne(request => {
          return (
            request.url === basketUrl &&
            request.method === 'POST' &&
            request.body.variantId === 123 &&
            request.body.quantity === 5 &&
            request.body.customData.displayData.name.value === 'test'
          );
        })
        .flush(basketResponseSuccessMock);
      thenResponseIsEqual();
    });
  });

  describe('updateItemQuantity()', () => {
    it('should call PUT /api/basket with body variantId and quantity', () => {
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
    it('should call DELETE /api/basket/123 with body variantId and quantity', () => {
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
