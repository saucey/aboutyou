import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/angular';
import { includeModuleMetadata, transformNavTree } from 'src/app/core/shop/utils';
import { NavbarComponent } from 'src/app/common/components/navbar/navbar.component';
import { GlobalModule } from 'src/app/common/global.module';
import { FIXTURE_CATEGORIES } from 'src/tests/fixtures/categories';

const NAVBAR_CATEGORIES = transformNavTree(FIXTURE_CATEGORIES);

storiesOf('Components|Navbar', module)
  .addParameters({ component: NavbarComponent })
  .addDecorator(withKnobs)
  .add('default', () => {
    return {
      component: NavbarComponent,
      props: {
        items: NAVBAR_CATEGORIES,
      },
      ...includeModuleMetadata([], [GlobalModule, BrowserAnimationsModule]),
    };
  });
