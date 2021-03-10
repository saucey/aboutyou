import { BapiProduct } from '@aboutyou/backbone/types/BapiProduct';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RecommendationsSliderComponent } from './recommendations-slider.component';

describe('Product Listing: RecommendationsSliderComponent', () => {
  let component: RecommendationsSliderComponent;
  let fixture: ComponentFixture<RecommendationsSliderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RecommendationsSliderComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecommendationsSliderComponent);
    component = fixture.componentInstance;
    component.products = [];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should transform given BapiProducts to recommended SliderProducts', () => {
    const bapiProduct: BapiProduct = {
      id: 123,
      currentPrice: 456,
      currency: { code: 'EUR', locale: 'de-DE' },
      entity: { attributes: { name: { values: { label: 'aTitle' } } } },
      previewImageSrc: 'anImageSrc',
    } as any;
    component.products = [bapiProduct];

    expect(component.recommendedProducts.length).toBe(1);
    expect(component.recommendedProducts[0].id).toBe(123);
    expect(component.recommendedProducts[0].imageSrc).toBe('anImageSrc');
    expect(component.recommendedProducts[0].title).toBe('aTitle');
    expect(component.recommendedProducts[0].subtitle).toBe('4,56\u00A0€');
  });
});
