import { storiesOf } from '@storybook/angular';
import { withKnobs, number } from '@storybook/addon-knobs';
import { HttpClientModule } from '@angular/common/http';
import { InlineSVGModule } from 'ng-inline-svg';
import { BrowserModule } from '@angular/platform-browser';
import { QuantityPickerComponent } from 'src/app/common/components/quantity-picker/quantity-picker.component';
import { includeModuleMetadata } from 'src/app/core/shop/utils';
import { IconComponent } from 'src/app/common/components/icon/icon.component';

storiesOf('Components|QuantityPicker', module)
  .addDecorator(withKnobs)
  .add('default', () => {
    const value = number('value', 3);
    const limit = number('limit', 10);

    return {
      component: QuantityPickerComponent,
      props: {
        value,
        limit,
      },
      ...includeModuleMetadata([IconComponent], [BrowserModule, HttpClientModule, InlineSVGModule.forRoot()]),
    };
  });
