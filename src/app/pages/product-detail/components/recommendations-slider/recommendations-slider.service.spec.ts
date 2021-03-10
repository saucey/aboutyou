import { BapiProduct } from '@aboutyou/backbone';
import { TestBed } from '@angular/core/testing';
import { RecommendationsSliderService } from './recommendations-slider.service';

describe('Component Service: RecommendationsSliderService', () => {
  let service: RecommendationsSliderService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RecommendationsSliderService],
    });
  });

  beforeEach(() => {
    service = TestBed.get(RecommendationsSliderService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });

  it('#getCategoryId should return the first category of the given product', () => {
    const bapiProduct: BapiProduct = { categories: [[{ categoryId: 123 }]] } as any;
    expect(service.getCategoryId(bapiProduct)).toEqual(`123`);
  });
});
