import { object, text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/angular';
import { includeModuleMetadata } from 'src/app/core/shop/utils';
import { GlobalModule } from 'src/app/common/global.module';
import { FavoriteCategoriesComponent } from 'src/app/common/components/favorite-categories/favorite-categories.component';

const stories = storiesOf('Components|FavoriteCategories', module)
  .addParameters({ component: FavoriteCategoriesComponent })
  .addDecorator(withKnobs)
  .add('CategoryListing', () => {
    return {
      template: `
            <app-favorite-categories
                [headline]="headlineText"
                [categories]="categoriesExample">
            </app-favorite-categories>
        `,
      props: {
        headlineText: text('headlineText', 'Test Headline'),
        categoriesExample: object('categoriesExample', [
          {
            target: '_self',
            href: null,
            resourceType: 'category',
            resourceId: 486,
            name: 'Deko & Wohnaccessoires',
          },
          {
            target: '_self',
            href: null,
            resourceType: 'category',
            resourceId: 69,
            name: 'Möbel',
          },
          {
            target: '_self',
            href: null,
            resourceType: 'category',
            resourceId: 1,
            name: 'Gedeckter Tisch & Küche',
          },
          {
            target: '_self',
            href: null,
            resourceType: 'category',
            resourceId: 299,
            name: 'Balkon & Garten',
          },
        ]),
      },
      ...includeModuleMetadata([], [GlobalModule]),
    };
  });
