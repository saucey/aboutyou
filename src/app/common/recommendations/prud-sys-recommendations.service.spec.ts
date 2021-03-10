import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { of } from 'rxjs/internal/observable/of';
import { Observable } from 'rxjs/Observable';
import { delay } from 'rxjs/operators';
import { BapiRecommendationsService } from './bapi-recommendations.service';
import { PrudSysClientService, PrudSysResponse, PrudSysResponseContent } from './prud-sys-client.service';
import { PrudSysRecommendationsService } from './prud-sys-recommendations.service';
import { PrudSysRequestParams } from './prud-sys-request-params';
import { RecommendedProduct } from './recommended-product';

describe('PrudSysRecommendationsService', () => {
  let service: PrudSysRecommendationsService;
  let prudSysClientServiceSpy: jasmine.SpyObj<PrudSysClientService>;
  let bapiRecommendationsServiceSpy: jasmine.SpyObj<BapiRecommendationsService>;

  function getMinimalPrudSysResponse(contentCount: number = 1): PrudSysResponse {
    const indexSequence: number[] = [...Array(contentCount).keys()];
    return {
      recommendations: {
        slider1: {
          title: 'some title',
          content: indexSequence.map(getMinimalPrudSysResponseContent),
        },
      },
    };
  }

  function getMinimalPrudSysResponseContent(referenceKey: string | number): PrudSysResponseContent {
    return { data: { UID: `${referenceKey}` } };
  }

  function getMinimalBapiResponse(): RecommendedProduct {
    return {} as any;
  }

  beforeEach(() => {
    prudSysClientServiceSpy = jasmine.createSpyObj('prudSysClientService', ['getRecommendations']);
    bapiRecommendationsServiceSpy = jasmine.createSpyObj('bapiRecommendationsService', ['getByRefKey']);
    TestBed.configureTestingModule({
      providers: [
        PrudSysRecommendationsService,
        {
          provide: PrudSysClientService,
          useValue: prudSysClientServiceSpy,
        },
        {
          provide: BapiRecommendationsService,
          useValue: bapiRecommendationsServiceSpy,
        },
      ],
    });
  });

  beforeEach(() => {
    prudSysClientServiceSpy.getRecommendations.and.returnValue(of(getMinimalPrudSysResponse()));
    bapiRecommendationsServiceSpy.getByRefKey.and.returnValue(of(getMinimalBapiResponse()));
    service = TestBed.get(PrudSysRecommendationsService);
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  it('#getRecommendations should return a title', (done: DoneFn) => {
    const inputParams: PrudSysRequestParams = {} as any;
    const responseMock: PrudSysResponse = getMinimalPrudSysResponse();
    responseMock.recommendations.slider1.title = 'a title';
    prudSysClientServiceSpy.getRecommendations.and.returnValue(of(responseMock));

    service.get(inputParams).subscribe(
      res => {
        expect(res.title).toEqual('a title');
        done();
      },
      err => fail(err),
    );
  });

  it('#getRecommendations should return a list of products', fakeAsync(() => {
    const inputParams: PrudSysRequestParams = {} as any;

    service.get(inputParams).subscribe(res => {
      expect(res.products[0]).toBeDefined();
    });
  }));

  it('#getRecommendations passes its paramerters 1:1 to prudSysClient', fakeAsync(() => {
    const inputParams: PrudSysRequestParams = { a: 1 } as any;

    service.get(inputParams);
    expect(prudSysClientServiceSpy.getRecommendations).toHaveBeenCalledWith(inputParams);
  }));

  it('#getRecommendations does a separate Bapi call for each reference key', fakeAsync(() => {
    const inputParams: PrudSysRequestParams = {} as any;
    const responseMock: PrudSysResponse = getMinimalPrudSysResponse(2);
    prudSysClientServiceSpy.getRecommendations.and.returnValue(of(responseMock));

    service.get(inputParams).subscribe(res => {
      expect(bapiRecommendationsServiceSpy.getByRefKey).toHaveBeenCalledTimes(2);
    });
  }));

  it('#getRecommendations returns the product id as returned by the BapiRecommendationService', fakeAsync(() => {
    const inputParams: PrudSysRequestParams = {} as any;
    const bapiProductMock = getMinimalBapiResponse();
    bapiProductMock.id = 123;
    bapiRecommendationsServiceSpy.getByRefKey.and.returnValue(of(bapiProductMock));

    service.get(inputParams).subscribe(res => {
      expect(res.products[0].id).toEqual(123);
    });
  }));

  it('#getRecommendations returns the product title as returned by the BapiRecommendationService', fakeAsync(() => {
    const inputParams: PrudSysRequestParams = {} as any;
    const bapiProductMock = getMinimalBapiResponse();
    bapiProductMock.title = 'a title';
    bapiRecommendationsServiceSpy.getByRefKey.and.returnValue(of(bapiProductMock));

    service.get(inputParams).subscribe(res => {
      expect(res.products[0].title).toEqual('a title');
    });
  }));

  it('#getRecommendations returns the product price as returned by the BapiRecommendationService', fakeAsync(() => {
    const inputParams: PrudSysRequestParams = {} as any;
    const bapiProductMock = getMinimalBapiResponse();
    bapiProductMock.price = 123;
    bapiRecommendationsServiceSpy.getByRefKey.and.returnValue(of(bapiProductMock));

    service.get(inputParams).subscribe(res => {
      expect(res.products[0].price).toEqual(123);
    });
  }));

  it('#getRecommendations returns the product imageHash as returned by the BapiRecommendationService', fakeAsync(() => {
    const inputParams: PrudSysRequestParams = {} as any;
    const bapiProductMock = getMinimalBapiResponse();
    bapiProductMock.imageHash = 'anImageHash';
    bapiRecommendationsServiceSpy.getByRefKey.and.returnValue(of(bapiProductMock));

    service.get(inputParams).subscribe(res => {
      expect(res.products[0].imageHash).toEqual('anImageHash');
    });
  }));

  // TODO #1392 preserve order
  xit('#getRecommendations preserves the product order', fakeAsync(() => {
    const inputParams: PrudSysRequestParams = {} as any;

    const prudSysResponseMock: PrudSysResponse = getMinimalPrudSysResponse(2);
    prudSysResponseMock.recommendations.slider1.content[0].data.UID = 'first';
    prudSysResponseMock.recommendations.slider1.content[1].data.UID = 'last';
    prudSysClientServiceSpy.getRecommendations.and.returnValue(of(prudSysResponseMock));

    const slowProductResult: Observable<RecommendedProduct> = of({ title: 'slow product' } as any).pipe(delay(100));
    const fastProductResult: Observable<RecommendedProduct> = of({ title: 'fast product' } as any);
    const returnFakeBapiProduct = (refKey: string): Observable<RecommendedProduct> => {
      return refKey === `first` ? slowProductResult : fastProductResult;
    };
    bapiRecommendationsServiceSpy.getByRefKey.and.callFake(returnFakeBapiProduct);

    service.get(inputParams).subscribe(res => {
      expect(res.products[0].title).toEqual('slow product');
      expect(res.products[1].title).toEqual('fast product');
    });

    tick(50);
    tick(1000);
  }));

  it('#getRecommendations doesnt return non-existing recommendations', fakeAsync(() => {
    const inputParams: PrudSysRequestParams = {} as any;
    bapiRecommendationsServiceSpy.getByRefKey.and.returnValue(of(null));

    service.get(inputParams).subscribe(res => {
      expect(res.products).toEqual([]);
    });
  }));
});
