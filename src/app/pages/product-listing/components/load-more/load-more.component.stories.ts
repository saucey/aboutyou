import { boolean, withKnobs, text, number } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/angular';
import { includeModuleMetadata } from 'src/app/core/shop/utils';
import { LoadMoreComponent } from './load-more.component';
import { ButtonComponent } from 'src/app/common/components/button/button.component';

storiesOf('Components|LoadMore', module)
  .addDecorator(withKnobs)
  .add('default', () => {
    return {
      component: LoadMoreComponent,
      props: {
        progress: {
          total: number('progress.total', 200),
          current: number('progress.current', 30),
        },
        progressText: text('progressText', 'Sie haben 40 von 160 Produkten gesehen'),
        buttonLabel: text('buttonLabel', 'Mehr Produkte sehen'),
        loading: boolean('loading', false),
      },
      ...includeModuleMetadata([ButtonComponent]),
    };
  });
