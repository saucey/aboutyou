import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/angular';
import { includeModuleMetadata } from 'src/app/core/shop/utils';
import { InlineSVGModule } from 'ng-inline-svg';
import { IconComponent } from 'src/app/common/components/icon/icon.component';
import { CircleButtonComponent } from 'src/app/common/components/circle-button/circle-button.component';

storiesOf('Components|CircleButton', module)
  .addParameters({ component: CircleButtonComponent })
  .addDecorator(withKnobs)
  .add('default', () => {
    return {
      template: `
        <app-circle-button><app-icon icon="heart-active"></app-icon></app-circle-button>
      `,
      props: {},
      ...includeModuleMetadata(
        [IconComponent, CircleButtonComponent],
        [BrowserModule, HttpClientModule, InlineSVGModule.forRoot(), RouterModule.forRoot([], { useHash: true })],
      ),
    };
  });
