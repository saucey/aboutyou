import { boolean, text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/angular';
import { includeModuleMetadata } from 'src/app/core/shop/utils';
import { ColorSwitchComponent } from 'src/app/common/components/color-switch/color-switch.component';

storiesOf('Components|ColorSwitch', module)
  .addParameters({ component: ColorSwitchComponent })
  .addDecorator(withKnobs)
  .add('default', () => {
    const label = text('label', '');
    const color = text('color', '#000000');
    const borderColor = text('borderColor', '#aaaaaa');
    const active = boolean('active', true);

    return {
      template: `
        <app-color-switch
            [color]="color"
            [borderColor]="borderColor"
            [active]="active">
            {{ label }}
        </app-color-switch>
      `,
      props: {
        label,
        color,
        borderColor,
        active,
      },
      ...includeModuleMetadata([ColorSwitchComponent]),
    };
  });
