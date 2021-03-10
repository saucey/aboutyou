import { action } from '@storybook/addon-actions';
import { text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/angular';
import { includeModuleMetadata, transformNavTree } from 'src/app/core/shop/utils';
import { GlobalModule } from 'src/app/common/global.module';
import { MobileNavComponent } from 'src/app/common/components/mobile-nav/mobile-nav.component';
import { FIXTURE_CATEGORIES } from 'src/tests/fixtures/categories';

const NAVBAR_CATEGORIES = transformNavTree(FIXTURE_CATEGORIES);

storiesOf('Components|MobileNav', module)
  .addParameters({ component: MobileNavComponent })
  .addDecorator(withKnobs)
  .add('default', () => {
    const goBackLabel = text('goBackLabel', 'zurück');
    const showAllLabel = text('showAllLabel', 'Alle Artikel anzeigen');
    const onSelect = action('onSelect');
    return {
      component: MobileNavComponent,
      props: {
        activeCategory: NAVBAR_CATEGORIES[2].children[1],
        goBackLabel,
        showAllLabel,
        onSelect,
        items: NAVBAR_CATEGORIES,
      },
      ...includeModuleMetadata([], [GlobalModule]),
    };
  });
