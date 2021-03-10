import { select, text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/angular';
import { ProductAvailabilityBadgeComponent } from 'src/app/common/components/product-availability-badge/product-availability-badge.component';
import { includeModuleMetadata } from 'src/app/core/shop/utils';

storiesOf('Components|ProductAvailabilityBadge', module)
  .addDecorator(withKnobs)
  .add('default', () => {
    const type = select('type', ['available', 'rare', 'unavailable'], 'available');
    const label = text('label', 'Lorem ipsum dolor sit amet');

    return {
      template: `
        <app-product-availability-badge [type]="type">{{ label }}</app-product-availability-badge>
      `,
      props: {
        type,
        label,
      },
      ...includeModuleMetadata([ProductAvailabilityBadgeComponent]),
    };
  });
