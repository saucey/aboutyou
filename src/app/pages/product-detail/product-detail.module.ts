import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LocalizeRouterModule } from '@gilsdav/ngx-translate-router';
import { TranslateModule } from '@ngx-translate/core';
import { GlobalModule } from 'src/app/common/global.module';
import { BreakpointObserverService } from 'src/app/common/services/breakpoint-observer.service';
import { AddToBasketComponent } from 'src/app/pages/product-detail/components/add-to-basket/add-to-basket.component';
import { CarouselComponent } from 'src/app/pages/product-detail/components/carousel/carousel.component';
// tslint:disable-next-line
import { DetailAttributesComponent } from 'src/app/pages/product-detail/components/detail-attributes/detail-attributes.component';
import { OverviewComponent } from 'src/app/pages/product-detail/components/overview/overview.component';
import { SkeletonCarouselComponent } from 'src/app/pages/product-detail/components/skeletons/carousel/carousel.skeleton';
import { SkeletonContentComponent } from 'src/app/pages/product-detail/components/skeletons/content/content.skeleton';
import { SkeletonDetailsComponent } from 'src/app/pages/product-detail/components/skeletons/details/details.skeleton';
import { SkeletonOverviewComponent } from 'src/app/pages/product-detail/components/skeletons/overview/overview.skeleton';
import { ThumbnailComponent } from 'src/app/pages/product-detail/components/thumbnail/thumbnail.component';
import { SiblingsAccordionDirective } from 'src/app/pages/product-detail/directives/siblings-accordion.directive';
import { ProductDetailComponent } from 'src/app/pages/product-detail/product-detail.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { SwiperConfigInterface, SwiperModule, SWIPER_CONFIG } from 'ngx-swiper-wrapper';
import { LocationReservationDialogModule } from '../../modules/location-reserve-dialog/location-reserve-dialog.module';
import { ClickReserveButtonComponent } from './components/click-reserve-button/click-reserve-button.component';
import { BundleComponent } from './components/detail-attributes/bundle/bundle.component';
import { DetailsComponent } from './components/detail-attributes/details/details.component';
import { HintsComponent } from './components/detail-attributes/hints/hints.component';
import { ProductDetailAccordionComponent } from './components/product-detail-accordion/product-detail-accordion.component';
import { RecommendationsSliderComponent } from './components/recommendations-slider/recommendations-slider.component';

const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  direction: 'horizontal',
  slidesPerView: 'auto',
};

@NgModule({
  declarations: [
    ProductDetailComponent,
    SiblingsAccordionDirective,
    OverviewComponent,
    CarouselComponent,
    DetailAttributesComponent,
    ThumbnailComponent,
    AddToBasketComponent,
    ProductDetailAccordionComponent,
    SkeletonOverviewComponent,
    SkeletonCarouselComponent,
    SkeletonContentComponent,
    SkeletonDetailsComponent,
    DetailsComponent,
    HintsComponent,
    BundleComponent,
    ClickReserveButtonComponent,
    RecommendationsSliderComponent,
  ],
  imports: [
    GlobalModule,
    BrowserModule,
    HttpClientModule,
    NgxSkeletonLoaderModule,
    TranslateModule,
    SwiperModule,
    LocalizeRouterModule,
    LocationReservationDialogModule,
  ],
  providers: [
    {
      provide: SWIPER_CONFIG,
      useValue: DEFAULT_SWIPER_CONFIG,
    },
    BreakpointObserverService,
  ],
})
export class ProductDetailModule {}
