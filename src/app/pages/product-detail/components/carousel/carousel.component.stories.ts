import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { array, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/angular';
import { includeModuleMetadata } from 'src/app/core/shop/utils';
import { CircleButtonComponent } from 'src/app/common/components/circle-button/circle-button.component';
import { IconComponent } from 'src/app/common/components/icon/icon.component';
import { InlineSVGModule } from 'ng-inline-svg';
import { SwiperConfigInterface, SwiperModule, SWIPER_CONFIG } from 'ngx-swiper-wrapper';
import { CAROUSEL_IMAGES } from 'src/tests/fixtures/products/carousel-images';
import { ThumbnailComponent } from '../thumbnail/thumbnail.component';
import { CarouselComponent } from './carousel.component';

const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  direction: 'horizontal',
  slidesPerView: 'auto',
};

storiesOf('Depot|Components/Carousel', module)
  .addDecorator(withKnobs)
  .add('default', () => {
    const images = array('images', CAROUSEL_IMAGES);

    return {
      template: `
        <div class="container">
            <div class="row">
                <div class="col-6">
                    <app-product-detail-carousel [images]="images"></app-product-detail-carousel>
                </div>
            </div>
        </div>
      `,
      props: {
        images,
      },
      ...includeModuleMetadata(
        [CarouselComponent, IconComponent, CircleButtonComponent, ThumbnailComponent],
        [
          SwiperModule,
          BrowserModule,
          BrowserAnimationsModule,
          HttpClientModule,
          InlineSVGModule.forRoot(),
          RouterModule.forRoot([], { useHash: true }),
        ],
        [
          {
            provide: SWIPER_CONFIG,
            useValue: DEFAULT_SWIPER_CONFIG,
          },
        ],
      ),
    };
  });
