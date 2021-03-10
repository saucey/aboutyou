import { MatDivider } from '@angular/material/divider';
import { action } from '@storybook/addon-actions';
import { boolean, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/angular';
import { includeModuleMetadata } from 'src/app/core/shop/utils';
import { ButtonComponent } from 'src/app/common/components/button/button.component';
import { TagsComponent } from 'src/app/common/components/tags/tags.component';
import { TextComponent } from 'src/app/common/components/text/text.component';
import { ExpanderComponent, Tag } from 'src/app/common/components/expander/expander.component';

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

storiesOf('Components|Expander', module)
  .addParameters({ component: ExpanderComponent })
  .addDecorator(withKnobs)
  .add('default', () => {
    return {
      template: `
      <app-expander [isExpanded]="isExpanded" [label]="label" [onExpandChange]="onExpandChange" [onTagRemove]="onTagRemove" [tags]="tags">
        <app-button variant="primary">test</app-button>
        <app-button variant="secondary">test</app-button>
        <app-button variant="default">test</app-button>
      </app-expander>
      `,
      props: {
        label: 'Color',
        isExpanded: boolean('isExpanded', true),
        onTagRemove: action('onTagRemove'),
        onExpandChange: action('onExpandChange'),
        tags: ITEMS,
      },
      ...includeModuleMetadata([ExpanderComponent, ButtonComponent, TextComponent, TagsComponent, MatDivider]),
    };
  });
