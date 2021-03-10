import { Component, Input } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { mockPipe } from 'src/tests/mocks/pipes.mock';
import { ShippingMethod } from 'src/app/mappers/bapi/shipping-method';
import { ProductMap } from 'src/app/mappers/product';
import { ProductDetailAccordionComponent } from './product-detail-accordion.component';
import { ProductDetailAccordionComponentPageObj } from './product-detail-accordion.component.po';

@Component({ selector: 'app-accordion-usp', template: '' })
class MockAccordionUspComponent {
  @Input() inputs: any;
}

describe('ProductDetailAccordionComponent', () => {
  let component: ProductDetailAccordionComponent;
  let fixture: ComponentFixture<ProductDetailAccordionComponent>;
  let pageObj: ProductDetailAccordionComponentPageObj;

  function getMinimalProduct(): ProductMap {
    return {
      custom: {
        shippingMethod: ShippingMethod.DEKO,
        showClickReserve: false,
      },
      currentPrice: 1,
      currency: { code: 'EUR' },
    } as any;
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProductDetailAccordionComponent, MockAccordionUspComponent, mockPipe({ name: 'translate' })],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductDetailAccordionComponent);
    pageObj = new ProductDetailAccordionComponentPageObj(fixture);
    component = fixture.componentInstance;
    component.product = getMinimalProduct();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render some USPs', () => {
    expect(pageObj.getUspItemElements().length).toBeGreaterThan(0);
  });

  it('should return the correct shipping time and supplier for deko articles', () => {
    component.product.custom.shippingMethod = ShippingMethod.DEKO;

    expect(component.deliveryTime).toBe(`2-3`);
    expect(component.supplier).toBe(`DHL`);
  });

  it('should return the correct shipping time and supplier for bulky articles', () => {
    component.product.custom.shippingMethod = ShippingMethod.HERMES;

    expect(component.deliveryTime).toBe(`6-8`);
    expect(component.supplier).toBe(`Hermes`);
  });

  it('should return not display click and reserve for online-exclusive articles', () => {
    component.product.custom.showClickReserve = false;

    expect(component.displayClickAndReserve).toBeFalse();
  });

  it('should return display click and reserve for not-online-exclusive articles', () => {
    component.product.custom.showClickReserve = true;

    expect(component.displayClickAndReserve).toBeTrue();
  });

  it('should return the correct subtitle key for all combinations of shipping method, price and currency', () => {
    expectSubtitleKey({
      product: { shippingMethod: ShippingMethod.DEKO, price: 4900, currency: 'EUR' },
      expectation: `PRODUCT_DETAIL.accordion.freeShipping.subtitle.free`,
    });
    expectSubtitleKey({
      product: { shippingMethod: ShippingMethod.DEKO, price: 4899, currency: 'EUR' },
      expectation: `PRODUCT_DETAIL.accordion.freeShipping.subtitle.deko`,
    });
    expectSubtitleKey({
      product: { shippingMethod: ShippingMethod.DEKO, price: 7500, currency: 'CHF' },
      expectation: `PRODUCT_DETAIL.accordion.freeShipping.subtitle.free`,
    });
    expectSubtitleKey({
      product: { shippingMethod: ShippingMethod.DEKO, price: 7499, currency: 'CHF' },
      expectation: `PRODUCT_DETAIL.accordion.freeShipping.subtitle.deko`,
    });
    expectSubtitleKey({
      product: { shippingMethod: ShippingMethod.HERMES, price: 39900, currency: 'EUR' },
      expectation: `PRODUCT_DETAIL.accordion.freeShipping.subtitle.free`,
    });
    expectSubtitleKey({
      product: { shippingMethod: ShippingMethod.HERMES, price: 39899, currency: 'EUR' },
      expectation: `PRODUCT_DETAIL.accordion.freeShipping.subtitle.bulky`,
    });
    expectSubtitleKey({
      product: { shippingMethod: ShippingMethod.HERMES, price: 49900, currency: 'CHF' },
      expectation: `PRODUCT_DETAIL.accordion.freeShipping.subtitle.free`,
    });
    expectSubtitleKey({
      product: { shippingMethod: ShippingMethod.HERMES, price: 48999, currency: 'CHF' },
      expectation: `PRODUCT_DETAIL.accordion.freeShipping.subtitle.bulky`,
    });
  });

  it('should return the correct description key for all combinations of shipping method, price and currency', () => {
    expectDescriptionKey({
      product: { shippingMethod: ShippingMethod.DEKO, price: 4900, currency: 'EUR' },
      expectation: `PRODUCT_DETAIL.accordion.freeShipping.description.free`,
    });
    expectDescriptionKey({
      product: { shippingMethod: ShippingMethod.DEKO, price: 4899, currency: 'EUR' },
      expectation: `PRODUCT_DETAIL.accordion.freeShipping.description.deko`,
    });
    expectDescriptionKey({
      product: { shippingMethod: ShippingMethod.DEKO, price: 7500, currency: 'CHF' },
      expectation: `PRODUCT_DETAIL.accordion.freeShipping.description.free`,
    });
    expectDescriptionKey({
      product: { shippingMethod: ShippingMethod.DEKO, price: 7499, currency: 'CHF' },
      expectation: `PRODUCT_DETAIL.accordion.freeShipping.description.deko`,
    });
    expectDescriptionKey({
      product: { shippingMethod: ShippingMethod.HERMES, price: 39900, currency: 'EUR' },
      expectation: `PRODUCT_DETAIL.accordion.freeShipping.description.free`,
    });
    expectDescriptionKey({
      product: { shippingMethod: ShippingMethod.HERMES, price: 39899, currency: 'EUR' },
      expectation: `PRODUCT_DETAIL.accordion.freeShipping.description.bulky`,
    });
    expectDescriptionKey({
      product: { shippingMethod: ShippingMethod.HERMES, price: 49900, currency: 'CHF' },
      expectation: `PRODUCT_DETAIL.accordion.freeShipping.description.free`,
    });
    expectDescriptionKey({
      product: { shippingMethod: ShippingMethod.HERMES, price: 48999, currency: 'CHF' },
      expectation: `PRODUCT_DETAIL.accordion.freeShipping.description.bulky`,
    });
  });

  function expectSubtitleKey({
    product,
    expectation,
  }: {
    product: {
      shippingMethod: ShippingMethod;
      price: number;
      currency: string;
    };
    expectation: string;
  }) {
    component.product.custom.shippingMethod = product.shippingMethod;
    component.product.currentPrice = product.price;
    component.product.currency = { code: product.currency } as any;

    expect(component.freeShippingSubtitleKey)
      .withContext(JSON.stringify(product))
      .toBe(expectation);
  }

  function expectDescriptionKey({
    product,
    expectation,
  }: {
    product: {
      shippingMethod: ShippingMethod;
      price: number;
      currency: string;
    };
    expectation: string;
  }) {
    component.product.custom.shippingMethod = product.shippingMethod;
    component.product.currentPrice = product.price;
    component.product.currency = { code: product.currency } as any;

    expect(component.freeShippingDescriptionKey)
      .withContext(JSON.stringify(product))
      .toBe(expectation);
  }
});
