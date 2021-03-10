import { HttpClientModule } from '@angular/common/http';
import { number, text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/angular';
import { includeModuleMetadata } from 'src/app/core/shop/utils';
import { InlineSVGModule } from 'ng-inline-svg';
import { IconComponent } from 'src/app/common/components/icon/icon.component';

storiesOf('Components|Icon', module)
  .addParameters({ component: IconComponent })
  .addDecorator(withKnobs)
  .add('default', () => {
    const icon = text('icon', 'clock');
    const color = text('string', '#000000');
    const scale = number('scale', 1.5);

    return {
      component: IconComponent,
      props: {
        icon,
        color,
        scale,
      },
      ...includeModuleMetadata([], [HttpClientModule, InlineSVGModule.forRoot()]),
    };
  });
