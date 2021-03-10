import { action } from '@storybook/addon-actions';
import { select, text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/angular';
import { includeModuleMetadata } from 'src/app/core/shop/utils';
import { LinkComponent } from './link.component';

storiesOf('Components|Link', module)
  .addDecorator(withKnobs)
  .addParameters({ component: LinkComponent })
  .add('default', () => {
    const options = {
      primary: 'primary',
      primaryGreen: 'primary-green',
      secondary: 'secondary',
      secondaryGreen: 'secondary-green',
    };

    const label = text('label', 'Link');
    const variant = select('variant', options, 'primary');
    return {
      template: `
        <app-link
          [href]="''"
          [variant]="variant"
        >
          {{label}}
        </app-link>
      `,
      props: {
        label,
        variant,
        onClick: action('onClick'),
      },
      ...includeModuleMetadata([LinkComponent]),
    };
  });
