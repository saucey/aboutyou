import { object, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/angular';
import { includeModuleMetadata } from 'src/app/core/shop/utils';
import { GlobalModule } from 'src/app/common/global.module';
import { StageModuleComponent } from 'src/app/common/components/teasers/stage-module/stage-module.component';

const stories = storiesOf('Components|Teasers/StageModule', module)
  .addParameters({ component: StageModuleComponent })
  .addDecorator(withKnobs)
  .add('single_slide', () => {
    return {
      template: `
                <app-stage-module
                [slides]="slidesData"
                >
                </app-stage-module>
            `,
      props: {
        slidesData: object('slidesData', [
          {
            attributes: {
              ctaHidden: false,
              sublineFirst: false,
              textboxAlign: 'text-left',
            },
            headline: {
              text: 'Die Bestseller sind zurück.',
              size: 'h1',
              color: '#000000',
            },
            subline: {
              text: 'GLÄNZENDE AUSSICHTEN',
              size: 'h5',
              color: '#000000',
            },
            cta: {
              tag: 'button',
              text: 'Jetzt entdecken',
              style: 'secondary-holo-light',
              link: {
                target: '_self',
                href: 'https://demo-shop.com/category-name/',
                resourceType: 'bundle|category|product|story',
                resourceId: 234234,
              },
            },
            imageUrl:
              'https://depot.dam.staging.aboutyou.cloud/images//009f76aff0e46ef1d73b01713b415dbf?quality=90&progressive=1&bg=f2f2f2&width=600&height=600&brightness=0.95',
          },
          {
            attributes: {
              ctaHidden: true,
              sublineFirst: true,
              textboxAlign: 'text-center',
            },
            headline: {
              text: 'Die Bestseller sind zurück.',
              size: 'h1',
              color: '#000000',
            },
            subline: {
              text: 'GLÄNZENDE AUSSICHTEN',
              size: 'h5',
              color: '#000000',
            },
            cta: {
              tag: 'button',
              text: 'Jetzt entdecken',
              style: 'secondary-holo-dark',
              link: {
                target: '_blank',
                href: 'https://demo-shop.com/category-name',
                resourceType: 'bundle|category|product|story',
                resourceId: 234234,
              },
            },
            imageUrl:
              'https://depot.dam.staging.aboutyou.cloud/images//0ab2d3f8d9ae5019f29fd0575764bf7b?quality=90&progressive=1&bg=f2f2f2&width=600&height=600&brightness=0.95',
          },
          {
            attributes: {
              ctaHidden: false,
              sublineFirst: false,
              textboxAlign: 'text-right',
            },
            headline: {
              text: 'Die Bestseller sind zurück.',
              size: 'h1',
              color: '#fff',
            },
            subline: {
              text: 'GLÄNZENDE AUSSICHTEN',
              size: 'h5',
              color: '#000000',
            },
            cta: {
              tag: 'button',
              text: 'Jetzt entdecken',
              style: 'primary',
              link: {
                target: '_self',
                href: 'https://demo-shop.com/category-name',
                resourceType: 'bundle|category|product|story',
                resourceId: 234234,
              },
            },
            imageUrl:
              'https://depot.dam.staging.aboutyou.cloud/images//56b94441b1ee73e1abe0bd3145ae622a?quality=90&progressive=1&bg=f2f2f2&width=600&height=600&brightness=0.95',
          },
        ]),
        imageUrl:
          'https://depot.dam.staging.aboutyou.cloud/images//56b94441b1ee73e1abe0bd3145ae622a?quality=90&progressive=1&bg=f2f2f2&width=600&height=600&brightness=0.95',
      },
      ...includeModuleMetadata([], [GlobalModule]),
    };
  });
