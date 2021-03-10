import { boolean, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/angular';
import { includeModuleMetadata } from 'src/app/core/shop/utils';
import { TextComponent } from 'src/app/common/components/text/text.component';
import { ColorBubbleComponent } from 'src/app/common/components/color-bubble/color-bubble.component';

storiesOf('Components|ColorBubble', module)
  .addParameters({ component: ColorBubbleComponent })
  .addDecorator(withKnobs)
  .add('default', () => {
    return {
      component: ColorBubbleComponent,
      props: {
        item: {
          id: 9183,
        },
        selected: boolean('selected', true),
      },
      ...includeModuleMetadata([TextComponent]),
    };
  })
  .add('gradient', () => {
    return {
      component: ColorBubbleComponent,
      props: {
        item: {
          id: 9167,
        },
        selected: boolean('selected', true),
      },
      ...includeModuleMetadata([TextComponent]),
    };
  });
