import { withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/angular';
import { includeModuleMetadata } from 'src/app/core/shop/utils';
import { DropdownComponent } from 'src/app/common/components/dropdown/dropdown.component';
import { action } from '@storybook/addon-actions';
import { BrowserModule } from '@angular/platform-browser';

export const ITEMS = [
  { name: 'Beliebtheit', id: '#:#' },
  { name: 'Neuheit', id: 'new:asc' },
  { name: 'Preis aufsteigend', id: 'price:asc' },
  { name: 'Preis absteigend', id: 'price:des' },
];

storiesOf('Components|Dropdown', module)
  .addDecorator(withKnobs)
  .addParameters({ component: DropdownComponent })
  .add('default', () => {
    return {
      template: `
        <app-dropdown [sortByLabel]="sortByLabel" [items]="items" [onChange]="onChange"></app-dropdown>
        <div>This should not be pushed down when the dropdown is opened</div>
      `,
      props: {
        sortByLabel: 'Sortiert nach: ',
        items: ITEMS,
        onChange: action('onChange'),
      },
      ...includeModuleMetadata([DropdownComponent]),
    };
  })
  .add('sorted', () => {
    return {
      template: `
      <app-dropdown [sortByLabel]="sortByLabel" [items]="items" [onChange]="onChange" [value]="value"></app-dropdown>
      <div>This should not be pushed down when the dropdown is opened</div>
      `,
      props: {
        sortByLabel: 'Sortiert nach: ',
        items: ITEMS,
        value: ITEMS[1],
        onChange: action('onChange'),
      },
      moduleMetadata: {
        ...includeModuleMetadata([DropdownComponent]).moduleMetadata,
        imports: [BrowserModule],
      },
    };
  });
