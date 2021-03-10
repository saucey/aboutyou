import { action } from '@storybook/addon-actions';
import { boolean, text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/angular';
import { includeModuleMetadata } from 'src/app/core/shop/utils';
import { GlobalModule } from 'src/app/common/global.module';
import { CheckboxComponent } from 'src/app/common/components/checkbox/checkbox.component';

storiesOf('Components|Checkbox', module)
  .addDecorator(withKnobs)
  .addParameters({ component: CheckboxComponent })
  .add('default', () => {
    return {
      template: `
        <app-checkbox [selected]="selected" [label]="label" (click)="onClick($event)"></app-checkbox>
      `,
      props: {
        label: text('label', 'checkbox'),
        selected: boolean('selected', true),
        onClick: action('onClick'),
      },
      ...includeModuleMetadata([], [GlobalModule]),
    };
  });
