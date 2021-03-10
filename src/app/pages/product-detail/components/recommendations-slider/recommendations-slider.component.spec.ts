import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { CookieService } from 'ngx-cookie-service';
import { of } from 'rxjs';
import { AppState } from 'src/app/core/shop/store';
import {
  PrudSysRecommendationsService,
  Recommendations,
} from 'src/app/common/recommendations/prud-sys-recommendations.service';
import { ProductMap } from 'src/app/mappers/product';
import { RecommendationsSliderComponent } from './recommendations-slider.component';
import { RecommendationsSliderService } from './recommendations-slider.service';

describe('PDP: RecommendationsSliderComponent', () => {
  let component: RecommendationsSliderComponent;
  let fixture: ComponentFixture<RecommendationsSliderComponent>;
  let prudSysRecommendationsServiceSpy: jasmine.SpyObj<PrudSysRecommendationsService>;
  let recommendationsSliderServiceSpy: jasmine.SpyObj<RecommendationsSliderService>;
  let cookieServiceSpy: jasmine.SpyObj<CookieService>;
  let storeSpy: jasmine.SpyObj<Store<AppState>>;

  function getMinimalProduct(): ProductMap {
    return { entity: { categories: [[{ categoryId: 123 }]] } } as any;
  }

  function getMinimalRecommendationsresponse(): Recommendations {
    return { title: 'some title', products: [] };
  }

  beforeEach(async(() => {
    prudSysRecommendationsServiceSpy = jasmine.createSpyObj('prudSysRecommendationsService', ['get']);
    recommendationsSliderServiceSpy = jasmine.createSpyObj('recommendationsSliderService', ['getCategoryId']);
    cookieServiceSpy = jasmine.createSpyObj('cookieService', ['get']);
    storeSpy = jasmine.createSpyObj('storeSpy', ['select']);
    TestBed.configureTestingModule({
      declarations: [RecommendationsSliderComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        {
          provide: PrudSysRecommendationsService,
          useValue: prudSysRecommendationsServiceSpy,
        },
        {
          provide: RecommendationsSliderService,
          useValue: recommendationsSliderServiceSpy,
        },
        {
          provide: CookieService,
          useValue: cookieServiceSpy,
        },
        {
          provide: Store,
          useValue: storeSpy,
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    prudSysRecommendationsServiceSpy.get.and.returnValue(of(getMinimalRecommendationsresponse()));
    recommendationsSliderServiceSpy.getCategoryId.and.returnValue('someCid');
    cookieServiceSpy.get.and.returnValue('someCookieValue');
    storeSpy.select.and.returnValue(of({ email: 'some@e.mail' }));
    fixture = TestBed.createComponent(RecommendationsSliderComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call the prudSysrecommendationService', fakeAsync(() => {
    component.product = getMinimalProduct();
    tick();
    expect(prudSysRecommendationsServiceSpy.get).toHaveBeenCalledTimes(1);
  }));

  it('should call the prudSysrecommendationService with the category id of the components service', fakeAsync(() => {
    recommendationsSliderServiceSpy.getCategoryId.and.returnValue('aCid');
    component.product = getMinimalProduct();
    tick();
    expect(prudSysRecommendationsServiceSpy.get.calls.argsFor(0)[0].cid).toEqual('aCid');
  }));

  it('should call the prudSysrecommendationService with the session id of the cookieService', fakeAsync(() => {
    cookieServiceSpy.get.and.returnValue('aCookieSessionId');
    component.product = getMinimalProduct();
    tick();
    expect(prudSysRecommendationsServiceSpy.get.calls.argsFor(0)[0].sid).toEqual('aCookieSessionId');
  }));

  // TODO #1392 hash the email
  it('should call the prudSysrecommendationService with the hashed email of the user in the app store', fakeAsync(() => {
    storeSpy.select.and.returnValue(of({ email: 'an@e.mail' }));
    component.product = getMinimalProduct();
    tick();
    expect(prudSysRecommendationsServiceSpy.get.calls.argsFor(0)[0].userid).not.toEqual('an@e.mail');
    expect(prudSysRecommendationsServiceSpy.get.calls.argsFor(0)[0].userid).toEqual(jasmine.any(String));
    expect(prudSysRecommendationsServiceSpy.get.calls.argsFor(0)[0].userid.length).toBeGreaterThan(0);
  }));
});
