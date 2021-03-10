import { action } from '@storybook/addon-actions';
import { object, text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/angular';
import { includeModuleMetadata, transformNavTree } from 'src/app/core/shop/utils';
import { ButtonComponent } from 'src/app/common/components/button/button.component';
import { TreeComponent } from 'src/app/common/components/tree/tree.component';
import { FIXTURE_CATEGORIES } from 'src/tests/fixtures/categories';

const NAVBAR_CATEGORIES = transformNavTree(FIXTURE_CATEGORIES);

storiesOf('Components|Tree', module)
  .addParameters({ component: TreeComponent })
  .addDecorator(withKnobs)
  .add('default', () => {
    const subCategoryLabel = text('subCategoryLabel', 'Weitere Kategorien');
    const onSelect = action('onSelect');
    return {
      component: TreeComponent,
      props: {
        subCategoryLabel,
        onSelect,
        items: NAVBAR_CATEGORIES,
      },
      ...includeModuleMetadata([ButtonComponent]),
    };
  })
  .add('with activeCategory', () => {
    const activeCategory = object('activeCategory', NAVBAR_CATEGORIES[0].children[0]);
    const subCategoryLabel = text('subCategoryLabel', 'Weitere Kategorien');
    const onSelect = action('onSelect');
    return {
      component: TreeComponent,
      props: {
        activeCategory,
        subCategoryLabel,
        onSelect,
        items: NAVBAR_CATEGORIES,
      },
      ...includeModuleMetadata([ButtonComponent]),
    };
  });
