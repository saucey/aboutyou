import { select, text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/angular';
import { ProductTagBoxComponent } from 'src/app/common/components/product-tag-box/product-tag-box.component';
import { includeModuleMetadata } from 'src/app/core/shop/utils';

storiesOf('Components|ProductTagBox', module)
  .addDecorator(withKnobs)
  .add('default', () => {
    const variant = select('variant', ['primary'], 'primary');
    const label = text('label', 'Lorem ipsum');

    return {
      template: `
        <app-product-tag-box [variant]="variant">{{ label }}</app-product-tag-box>
      `,
      props: {
        variant,
        label,
      },
      ...includeModuleMetadata([ProductTagBoxComponent]),
    };
  });
