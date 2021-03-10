import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { boolean, number, text, select, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/angular';
import { includeModuleMetadata } from 'src/app/core/shop/utils';
import { InlineSVGModule } from 'ng-inline-svg';
import { CurrencyPipe } from 'src/app/common/pipes/currency.pipe';
import { ColorSwitchComponent } from 'src/app/common/components/color-switch/color-switch.component';
import { EnergyFlagComponent } from 'src/app/common/components/energy-flag/energy-flag.component';
import { IconComponent } from 'src/app/common/components/icon/icon.component';
import { CircleButtonComponent } from 'src/app/common/components/circle-button/circle-button.component';
import { PromotionFlagComponent } from 'src/app/common/components/promotion-flag/promotion-flag.component';
import { RatingComponent } from 'src/app/common/components/rating/rating.component';
import { ProductTileComponent } from 'src/app/common/components/product-tile/product-tile.component';

storiesOf('Components|ProductTile', module)
  .addParameters({ component: ProductTileComponent })
  .addDecorator(withKnobs)
  .add('default', () => {
    const isNew = boolean('isNew', true);
    const isSale = boolean('isSale', false);
    const additionalInformationLabel = text('additionalInformationLabel', 'B:120 X L:120 X T:123 cm');
    const newPrice = number('newPrice', 24.99);
    const strikedPrice = number('strikedPrice', 32.99);
    const price = number('price', 0);
    const basePriceLabel = text('basePriceLabel', '10,99 € / l');
    const percentageDiscountLabel = text('percentageDiscountLabel', '- 15 %');
    const packSize = text('packSize', '3er pack');
    const tagLabel = text('tagLabel', '');
    // const colorVariations = action('onSelect');
    const mainImageSrc = text(
      'mainImageSrc',
      // tslint:disable-next-line: max-line-length
      'https://depot.dam.staging.aboutyou.cloud/images//images/614c24576a4ead31e55584a3a55674ce?quality=90&progressive=1&bg=f2f2f2&width=600&height=600',
    );
    const rating = number('rating', 3.5);
    const productTitle = text('productTitle', 'Product name');
    const isWishlisted = boolean('isWishlisted', true);
    const showWishlistButton = boolean('showWishlistButton', true);
    const options = {
      A: 'A',
      'A +': 'A +',
      'A ++': 'A ++',
      B: 'B',
      C: 'C',
      D: 'D',
      E: 'E',
    };
    const defaultValue = 'A ++';
    const energyLabel = select('energyLabel', options, defaultValue);

    return {
      component: ProductTileComponent,
      props: {
        isNew,
        isSale,
        additionalInformationLabel,
        newPrice,
        strikedPrice,
        percentageDiscountLabel,
        packSize,
        price,
        tagLabel,
        energyLabel,
        basePriceLabel,
        // colorVariations,
        mainImageSrc,
        rating,
        productTitle,
        isWishlisted,
        showWishlistButton,
      },
      ...includeModuleMetadata(
        [
          IconComponent,
          ColorSwitchComponent,
          EnergyFlagComponent,
          PromotionFlagComponent,
          CircleButtonComponent,
          RatingComponent,
          CurrencyPipe,
        ],
        [BrowserModule, HttpClientModule, InlineSVGModule.forRoot(), RouterModule.forRoot([], { useHash: true })],
      ),
    };
  });
