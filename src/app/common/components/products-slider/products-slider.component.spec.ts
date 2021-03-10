import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { mockPipe } from 'src/tests/mocks/pipes.mock';
import { ProductsSliderComponent, SliderProduct } from './products-slider.component';
import { ProductsSliderComponentPageObj } from './products-slider.component.po';

describe('ProductSliderComponent', () => {
  let component: ProductsSliderComponent;
  let fixture: ComponentFixture<ProductsSliderComponent>;
  let pageObj: ProductsSliderComponentPageObj;

  function getMinimalProduct(): SliderProduct {
    return {} as any;
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProductsSliderComponent, mockPipe({ name: 'localize' })],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [RouterTestingModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsSliderComponent);
    pageObj = new ProductsSliderComponentPageObj(fixture);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(pageObj).toBeTruthy();
  });

  it('should display the set headline', () => {
    component.headline = 'aHeadline';
    fixture.detectChanges();

    expect(pageObj.getHeadlineText()).toBe('aHeadline');
  });

  it('should display the correct number of items', () => {
    component.products = [getMinimalProduct(), getMinimalProduct(), getMinimalProduct()];
    fixture.detectChanges();

    expect(pageObj.getItemElements().length).toBe(3);
  });

  it('should display the image of each item', () => {
    const productA = getMinimalProduct();
    const productB = getMinimalProduct();
    productA.imageSrc = 'imageA';
    productB.imageSrc = 'imageB';
    component.products = [productA, productB];
    fixture.detectChanges();

    expect(pageObj.getImageSrc(0)).toEqual('imageA');
    expect(pageObj.getImageSrc(1)).toEqual('imageB');
  });

  it('should display the title of each item', () => {
    const productA = getMinimalProduct();
    const productB = getMinimalProduct();
    productA.title = 'titleA';
    productB.title = 'titleB';
    component.products = [productA, productB];
    fixture.detectChanges();

    expect(pageObj.getTitleText(0).trim()).toEqual('titleA');
    expect(pageObj.getTitleText(1).trim()).toEqual('titleB');
  });

  it('should display the subtitle of each item', () => {
    const productA = getMinimalProduct();
    const productB = getMinimalProduct();
    productA.subtitle = 'subTitleA';
    productB.subtitle = 'subTitleB';
    component.products = [productA, productB];
    fixture.detectChanges();

    expect(pageObj.getSubtitleText(0).trim()).toEqual('subTitleA');
    expect(pageObj.getSubtitleText(1).trim()).toEqual('subTitleB');
  });

  it('should select the next product correctly', () => {
    component.products = [getMinimalProduct(), getMinimalProduct(), getMinimalProduct()];
    component.currentProduct = 0;

    component.next();
    expect(component.currentProduct).toBe(1);
    component.next();
    expect(component.currentProduct).toBe(2);
    component.next();
    expect(component.currentProduct).toBe(0);
  });

  it('should select the previous product correctly', () => {
    component.products = [getMinimalProduct(), getMinimalProduct(), getMinimalProduct()];
    component.currentProduct = 0;

    component.prev();
    expect(component.currentProduct).toBe(2);
    component.prev();
    expect(component.currentProduct).toBe(1);
    component.prev();
    expect(component.currentProduct).toBe(0);
  });

  it('should select the next product when clicking the "right" button', () => {
    component.products = [getMinimalProduct(), getMinimalProduct()];
    component.currentProduct = 0;

    pageObj.getRightButtonElem().click();

    expect(component.currentProduct).toBe(1);
  });

  it('should select the previous product when clicking the "left" button', () => {
    component.products = [getMinimalProduct(), getMinimalProduct()];
    component.currentProduct = 0;

    pageObj.getLeftButtonElem().click();

    expect(component.currentProduct).toBe(1);
  });

  it('should use the product ID for the links', () => {
    const product = getMinimalProduct();
    product.id = 123;
    component.products = [product];
    fixture.detectChanges();

    expect(pageObj.getLinkDestination(0)).toEqual(`/p/123`);
  });
});
