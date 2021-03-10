import { action } from '@storybook/addon-actions';
import { withKnobs, select } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/angular';
import { includeModuleMetadata } from 'src/app/core/shop/utils';
import { ColorBubbleComponent } from 'src/app/common/components/color-bubble/color-bubble.component';
import { SelectComponent } from 'src/app/common/components/select/select.component';
import { ButtonComponent } from 'src/app/common/components/button/button.component';
import { CheckboxComponent } from 'src/app/common/components/checkbox/checkbox.component';

export const ITEMS = [
  'red',
  'blue',
  'purple',
  'pink',
  'violet',
  'yellow',
  'black',
  'grey',
  'indigo',
  'maroon',
  'magenta',
  'white',
  'green',
  'aliceblue',
  'red',
  'blue',
  'purple',
  'pink',
  'violet',
  'yellow',
  'black',
  'grey',
  'indigo',
  'maroon',
  'magenta',
  'white',
  'green',
  'aliceblue',
  'red',
  'blue',
  'purple',
  'pink',
  'violet',
  'yellow',
  'black',
  'grey',
  'indigo',
  'maroon',
  'magenta',
  'white',
  'green',
  'aliceblue',
].map((name, id) => ({
  id: id.toString(),
  name,
}));

storiesOf('Components|Select', module)
  .addParameters({ component: SelectComponent })
  .addDecorator(withKnobs)
  .add('default', () => {
    return {
      component: SelectComponent,
      props: {
        mode: select('mode', { multiple: 'multiple', single: 'single' }, 'multiple'),
        type: select('type', { color: 'color', checkbox: 'checkbox', button: 'button' }, 'checkbox'),
        items: ITEMS,
        onChange: action('onChange'),
        value: [ITEMS[2], ITEMS[10]],
      },
      ...includeModuleMetadata([ColorBubbleComponent, ButtonComponent, CheckboxComponent]),
    };
  });
