import { action } from '@storybook/addon-actions';
import { withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/angular';
import { includeModuleMetadata } from 'src/app/core/shop/utils';
import { GlobalModule } from 'src/app/common/global.module';
import { Tag, TagsComponent } from 'src/app/common/components/tags/tags.component';

const ITEMS: Tag[] = [
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
].map((value, id) => ({
  id,
  name: value,
}));

storiesOf('Components|Tags', module)
  .addParameters({ component: TagsComponent })
  .addDecorator(withKnobs)
  .add('default', () => {
    return {
      component: TagsComponent,
      props: {
        tags: ITEMS,
        onTagRemove: action('onTagRemove'),
      },
      ...includeModuleMetadata([], [GlobalModule]),
    };
  });
