import { storiesOf } from '@storybook/angular';
import { withKnobs, select } from '@storybook/addon-knobs';
import { HttpClientModule } from '@angular/common/http';
import { InlineSVGModule } from 'ng-inline-svg';
import { BrowserModule } from '@angular/platform-browser';
import { PromotionFlagComponent } from 'src/app/common/components/promotion-flag/promotion-flag.component';
import { includeModuleMetadata } from 'src/app/core/shop/utils';
import { IconComponent } from 'src/app/common/components/icon/icon.component';

storiesOf('Components|PromotionFlag', module)
  .addDecorator(withKnobs)
  .add('default', () => {
    const type = select('type', ['sale', 'new'], 'sale');

    return {
      component: PromotionFlagComponent,
      props: {
        type,
      },
      ...includeModuleMetadata([IconComponent], [BrowserModule, HttpClientModule, InlineSVGModule.forRoot()]),
    };
  });
