/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { GlobalModule } from 'src/app/common/global.module';
import { ThumbnailComponent } from '../thumbnail/thumbnail.component';
import { CarouselComponent } from './carousel.component';
import { InlineSVGModule } from 'ng-inline-svg';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { SwiperConfigInterface, SwiperModule, SWIPER_CONFIG } from 'ngx-swiper-wrapper';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BreakpointObserverService } from 'src/app/common/services/breakpoint-observer.service';
import { HttpLoaderFactory } from 'src/app/core/shop/app.browser.module';
import { CAROUSEL_IMAGES, CAROUSEL_THREE_IMAGES } from 'src/tests/fixtures/products/carousel-images';

const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  direction: 'horizontal',
  slidesPerView: 'auto',
};

describe('CarouselComponent (maximum variation)', () => {
  let component: CarouselComponent;
  let fixture: ComponentFixture<CarouselComponent>;
  let element: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ThumbnailComponent, CarouselComponent],
      imports: [
        BrowserModule,
        HttpClientModule,
        InlineSVGModule.forRoot(),
        RouterModule.forRoot([], { useHash: true }),
        GlobalModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient],
          },
        }),
        SwiperModule,
        BrowserAnimationsModule,
      ],
      providers: [
        BreakpointObserverService,
        {
          provide: SWIPER_CONFIG,
          useValue: DEFAULT_SWIPER_CONFIG,
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarouselComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;

    component.images = CAROUSEL_IMAGES;
    fixture.detectChanges();
  });

  it('should have as many thumbnails as product images', () => {
    expect(element.querySelectorAll('.items .item').length).toBe(CAROUSEL_IMAGES.length);
  });

  it('should display 4 nav arrows', () => {
    expect(element.querySelectorAll('.nav-left').length).toBe(2);
    expect(element.querySelectorAll('.nav-right').length).toBe(2);
  });

  it('should be zoomable and interact with mousemoving', () => {
    expect(element.querySelector('.zoom-container').classList).not.toContain('zooming');

    const { width: previousWidth, height: previousHeight } = element
      .querySelector('.zoom-container')
      .getBoundingClientRect();

    (element.querySelector('.zoom-container') as HTMLDivElement).click();

    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(component.zoom).toBeTruthy();

      const { width, height } = element.querySelector('.zoom-container').getBoundingClientRect();

      expect(width).toBeGreaterThan(previousWidth);
      expect(height).toBeGreaterThan(previousHeight);

      spyOn(component, 'adjustZoomPosition');

      window.dispatchEvent(new Event('mousemove'));

      fixture.detectChanges();

      fixture.whenStable().then(() => {
        expect(component.adjustZoomPosition).toHaveBeenCalled();
      });
    });
  });

  it('should navigate to the next image and to the previous image', () => {
    expect(component.currentImage).toBe(0);

    spyOn(component, 'next').and.callThrough();
    spyOn(component, 'setCurrentImage').and.callThrough();
    spyOn(component, 'adjustXCoordinate').and.callThrough();
    spyOn(component, 'nextQueue').and.callThrough();

    (element.querySelector('.image-preview .nav-right app-circle-button') as HTMLElement).click();

    fixture.detectChanges();

    expect(component.next).toHaveBeenCalled();
    expect(component.setCurrentImage).toHaveBeenCalled();
    expect(component.adjustXCoordinate).toHaveBeenCalled();
    expect(component.nextQueue).toHaveBeenCalled();

    fixture.whenStable().then(() => {
      expect(component.currentImage).toBe(1);

      expect(
        (element.querySelector('.zoom-container .image:last-child') as HTMLDivElement).style.backgroundImage,
      ).toContain(component.images[1]);

      spyOn(component, 'prev').and.callThrough();
      spyOn(component, 'setCurrentImage').and.callThrough();
      spyOn(component, 'adjustXCoordinate').and.callThrough();
      spyOn(component, 'nextQueue').and.callThrough();

      fixture.debugElement.nativeElement.querySelector('.items .nav-left app-circle-button').click();

      expect(component.prev).toHaveBeenCalled();
      expect(component.setCurrentImage).toHaveBeenCalled();
      expect(component.adjustXCoordinate).toHaveBeenCalled();
      expect(component.nextQueue).toHaveBeenCalled();

      fixture.detectChanges();

      fixture.whenStable().then(() => {
        expect(component.currentImage).toBe(0);
        expect(
          (element.querySelector('.zoom-container .image:last-child') as HTMLDivElement).style.backgroundImage,
        ).toContain(component.images[0]);
      });
    });
  });

  it('should be navigate from first to last and from last to first', () => {
    expect(component.currentImage).toBe(0);

    spyOn(component, 'prev').and.callThrough();
    spyOn(component, 'setCurrentImage').and.callThrough();
    spyOn(component, 'adjustXCoordinate').and.callThrough();
    spyOn(component, 'nextQueue').and.callThrough();

    (element.querySelector('.image-preview .nav-left app-circle-button') as HTMLElement).click();

    fixture.detectChanges();

    expect(component.prev).toHaveBeenCalled();
    expect(component.setCurrentImage).toHaveBeenCalled();
    expect(component.adjustXCoordinate).toHaveBeenCalled();
    expect(component.nextQueue).toHaveBeenCalled();

    fixture.whenStable().then(() => {
      expect(component.currentImage).toBe(CAROUSEL_IMAGES.length - 1);
      expect(
        (element.querySelector('.zoom-container .image:last-child') as HTMLDivElement).style.backgroundImage,
      ).toContain(component.images[component.images.length - 1]);

      spyOn(component, 'next').and.callThrough();
      spyOn(component, 'setCurrentImage').and.callThrough();
      spyOn(component, 'adjustXCoordinate').and.callThrough();
      spyOn(component, 'nextQueue').and.callThrough();

      (element.querySelector('.items .nav-right app-circle-button') as HTMLElement).click();

      expect(component.next).toHaveBeenCalled();
      expect(component.setCurrentImage).toHaveBeenCalled();
      expect(component.adjustXCoordinate).toHaveBeenCalled();
      expect(component.nextQueue).toHaveBeenCalled();

      fixture.detectChanges();

      fixture.whenStable().then(() => {
        expect(component.currentImage).toBe(0);
        expect(
          (element.querySelector('.zoom-container .image:last-child') as HTMLDivElement).style.backgroundImage,
        ).toContain(component.images[0]);
      });
    });
  });
});

describe('CarouselComponent (medium variation)', () => {
  let component: CarouselComponent;
  let fixture: ComponentFixture<CarouselComponent>;
  let element: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ThumbnailComponent, CarouselComponent],
      imports: [
        BrowserModule,
        HttpClientModule,
        InlineSVGModule.forRoot(),
        RouterModule.forRoot([], { useHash: true }),
        GlobalModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient],
          },
        }),
        SwiperModule,
        BrowserAnimationsModule,
      ],
      providers: [
        {
          provide: SWIPER_CONFIG,
          useValue: DEFAULT_SWIPER_CONFIG,
        },
        BreakpointObserverService,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarouselComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;

    component.images = CAROUSEL_THREE_IMAGES;
    fixture.detectChanges();
  });

  it('should have as many thumbnails as product images', () => {
    expect(element.querySelectorAll('.items .item').length).toBe(component.images.length);
  });

  it('should not display bottom arrows', () => {
    expect(element.querySelector('.items').classList).toContain('no-nav');
  });
});
