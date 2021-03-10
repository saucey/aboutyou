import { storiesOf } from '@storybook/angular';
import { withKnobs, number, text, boolean } from '@storybook/addon-knobs';
import { RatingComponent } from 'src/app/common/components/rating/rating.component';
import { includeModuleMetadata } from 'src/app/core/shop/utils';

storiesOf('Components|Rating', module)
  .addParameters({ component: RatingComponent })
  .addDecorator(withKnobs)
  .add('default', () => {
    const rating = number('rating', 3.5);
    const displayRating = boolean('displayRating', true);
    const ratingCount = text('ratingCount', '12');

    return {
      component: RatingComponent,
      props: {
        rating,
        displayRating,
        ratingCount,
      },
      ...includeModuleMetadata,
    };
  });
