import { boolean, select, text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/angular';
import { ButtonComponent } from 'src/app/common/components/button/button.component';
import { action } from '@storybook/addon-actions';
import { includeModuleMetadata } from 'src/app/core/shop/utils';

storiesOf('Components|Button', module)
  .addDecorator(withKnobs)
  .addParameters({ component: ButtonComponent })
  .add('default', () => {
    const options = {
      primary: 'primary',
      secondary: 'secondary',
      default: 'default',
      purchase: 'purchase',
    };

    const label = text('label', 'Button');
    const loading = boolean('loading', true);
    const disabled = boolean('disabled', false);
    const selected = boolean('selected', false);
    const variant = select('variant', options, 'primary');
    return {
      template: `
        <app-button
          [loading]="loading"
          [disabled]="disabled"
          [selected]="selected"
          [variant]="variant"
          (click)="onClick($event)"
        >
          {{label}}
        </app-button>
      `,
      props: {
        loading,
        disabled,
        selected,
        label,
        variant,
        onClick: action('onClick'),
      },
      ...includeModuleMetadata([ButtonComponent]),
    };
  });
