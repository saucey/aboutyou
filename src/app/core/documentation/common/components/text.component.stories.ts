import { storiesOf } from '@storybook/angular';
import { withKnobs, select, text } from '@storybook/addon-knobs';
import { TextComponent } from 'src/app/common/components/text/text.component';

storiesOf('Components|Text', module)
  .addParameters({ component: TextComponent })
  .addDecorator(withKnobs)
  .add('default', () => {
    const options = {
      h1: 'h1',
      h2: 'h2',
      h3: 'h3',
      h4: 'h4',
      h5: 'h5',
      h6: 'h6',
    };
    const defaultValue = 'h2';

    const label = text('label', 'Depot typography');
    const tag = select('tag', options, defaultValue);
    return {
      component: TextComponent,
      props: {
        label,
        tag,
      },
    };
  });
