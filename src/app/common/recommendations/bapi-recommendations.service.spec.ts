import { ProductsByIdsEndpointResponseData } from '@aboutyou/backbone/endpoints/products/productsByIds';
import { fakeAsync, TestBed } from '@angular/core/testing';
import { of } from 'rxjs/internal/observable/of';
import { BapiProductService } from 'src/app/core/services/bapi/bapi-product.service';
import { ShopService } from 'src/app/core/services/shop.service';
import { IFoundShop } from 'src/app/core/shop/utils';
import { ADVANCED_ATTRIBUTE_KEY__MASTER_PRODUCT_NAME } from 'src/app/mappers/bapi/constants';
import { BapiRecommendationsService } from './bapi-recommendations.service';

describe('BapiRecommendationsService', () => {
  let service: BapiRecommendationsService;
  let productServiceSpy: jasmine.SpyObj<BapiProductService>;
  let shopServiceSpy: jasmine.SpyObj<ShopService>;

  function getMinimalBapiResponse(): ProductsByIdsEndpointResponseData {
    return {
      entities: [
        {
          id: 1,
          advancedAttributes: {
            [ADVANCED_ATTRIBUTE_KEY__MASTER_PRODUCT_NAME]: { values: [{ fieldSet: [[{ value: 'some title' }]] }] },
          },
          variants: [{ price: { withTax: 1 as any, appliedReductions: [] } }],
          images: [{ hash: 'someHash' }],
        },
      ],
    } as any;
  }

  function getMinimalShopResponse(): IFoundShop {
    return { shop: { currency: { locale: 'de', code: 'EUR' } } } as any;
  }

  beforeEach(() => {
    productServiceSpy = jasmine.createSpyObj('productServiceSpy', ['query']);
    shopServiceSpy = jasmine.createSpyObj('shopServiceSpy', ['getShop']);
    TestBed.configureTestingModule({
      providers: [
        BapiRecommendationsService,
        {
          provide: BapiProductService,
          useValue: productServiceSpy,
        },
        {
          provide: ShopService,
          useValue: shopServiceSpy,
        },
      ],
    });
  });

  beforeEach(() => {
    productServiceSpy.query.and.returnValue(of(getMinimalBapiResponse()));
    shopServiceSpy.getShop.and.returnValue(getMinimalShopResponse());
    service = TestBed.get(BapiRecommendationsService);
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  it('#getByRefKey should return a RecommendedProduct', fakeAsync(() => {
    service.getByRefKey('someKey').subscribe(recommendedProduct => {
      expect(recommendedProduct.id).toBeDefined();
      expect(recommendedProduct.title).toBeDefined();
      expect(recommendedProduct.price).toBeDefined();
      expect(recommendedProduct.imageHash).toBeDefined();
    });
  }));

  it('#getByRefKey should extract the id from the bapi response', fakeAsync(() => {
    const responseMock = getMinimalBapiResponse();
    responseMock.entities[0].id = 123;
    productServiceSpy.query.and.returnValue(of(responseMock));

    service.getByRefKey('someKey').subscribe(recommendedProduct => {
      expect(recommendedProduct.id).toBe(123);
    });
  }));

  it('#getByRefKey should extract the title from the bapi response', fakeAsync(() => {
    const responseMock = getMinimalBapiResponse();
    responseMock.entities[0].advancedAttributes[
      ADVANCED_ATTRIBUTE_KEY__MASTER_PRODUCT_NAME
    ].values[0].fieldSet[0][0].value = 'a title';
    productServiceSpy.query.and.returnValue(of(responseMock));

    service.getByRefKey('someKey').subscribe(recommendedProduct => {
      expect(recommendedProduct.title).toBe('a title');
    });
  }));

  it('#getByRefKey should extract the price from the bapi response', fakeAsync(() => {
    const responseMock = getMinimalBapiResponse();
    responseMock.entities[0].variants[0].price.withTax = 123 as any;
    productServiceSpy.query.and.returnValue(of(responseMock));

    service.getByRefKey('someKey').subscribe(recommendedProduct => {
      expect(recommendedProduct.price).toBe(123);
    });
  }));

  it('#getByRefKey should extract the image hash from the bapi response', fakeAsync(() => {
    const responseMock = getMinimalBapiResponse();
    responseMock.entities[0].images[0].hash = 'aHash';
    productServiceSpy.query.and.returnValue(of(responseMock));

    service.getByRefKey('someKey').subscribe(recommendedProduct => {
      expect(recommendedProduct.imageHash).toBe('aHash');
    });
  }));

  it('#getByRefKey should return null for an empty bapi response', fakeAsync(() => {
    const responseMock = getMinimalBapiResponse();
    responseMock.entities = [];
    productServiceSpy.query.and.returnValue(of(responseMock));

    service.getByRefKey('someKey').subscribe(recommendedProduct => {
      expect(recommendedProduct).toBeNull();
    });
  }));
});
