import { object, text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/angular';
import { includeModuleMetadata } from 'src/app/core/shop/utils';
import { GlobalModule } from 'src/app/common/global.module';
import { DoubleTeaserComponent } from 'src/app/common/components/double-teaser/double-teaser.component';

const TEASER_ELEMENT_GROUPS = [
  {
    type: 'group_headline_cta_bg',
    attributes: {
      position: 0,
      bgColor: '#f5f6f7',
      textboxAlign: 'left',
      ctaHidden: false,
      sublineFirst: false,
    },
    elements: [
      {
        type: 'element_subline',
        attributes: {
          text: 'DEPOT App',
          size: 'small',
          color: '#000000',
        },
      },
      {
        type: 'element_headline',
        attributes: {
          text: 'Aktuelle Interior-Trends <b>überall parat.</b>',
          size: 'large',
          color: '#000000',
        },
      },
      {
        type: 'element_cta',
        attributes: {
          tag: 'button',
          text: 'Mehr erfahren',
          style: 'default',
          link: {
            target: '_self',
            href: 'https://demo-shop.com/category-name/',
            resourceType: 'bundle|category|product|story',
            resourceId: 234234,
          },
        },
      },
      {
        type: 'resource_image_bg_desktop',
        attributes: {
          id: 100500,
          width: 1234,
          height: 645,
          hash: 'images/7985f92815a6107a4b035f875152e22d',
          size: 12347654,
          ext: 'jpg',
        },
      },
    ],
  },
  {
    type: 'group_headline_cta_bg',
    attributes: {
      position: 0,
      bgColor: '#f5f6f7',
      textboxAlign: 'left',
      ctaHidden: false,
      sublineFirst: false,
    },
    elements: [
      {
        type: 'element_subline',
        attributes: {
          text: 'loved by DEPOT',
          size: 'small',
          color: '#000000',
        },
      },
      {
        type: 'element_headline',
        attributes: {
          text: 'Dekoriert Eure Hochzeit <b>individuell.</b>',
          size: 'medium',
          color: '#000000',
        },
      },
      {
        type: 'element_cta',
        attributes: {
          tag: 'button',
          text: 'Zum Hochzeitsplaner',
          style: 'default',
          link: {
            target: '_self',
            href: 'https://demo-shop.com/category-name/',
            resourceType: 'bundle|category|product|story',
            resourceId: 234234,
          },
        },
      },
      {
        type: 'resource_image_bg_desktop',
        attributes: {
          id: 100500,
          hash: 'images/96827e0a91e2581a2f34cb105c97ae9d',
          width: 1234,
          height: 645,
          size: 12347654,
          ext: 'jpg',
        },
      },
    ],
  },
];

const stories = storiesOf('Components|Teasers/DoubleTeaser', module)
  .addParameters({ component: DoubleTeaserComponent })
  .addDecorator(withKnobs)
  .add('DoubleTeaser', () => {
    return {
      template: `
            <app-double-teaser
                [teasers]="teasersData.data.elementGroups"
                [headline]="'headline'">
            </app-double-teaser>
        `,
      props: {
        teasersData: object('teasersData', {
          data: {
            type: 'grid_double_teaser',
            attributes: {
              position: 0,
            },
            elementGroups: [
              {
                type: 'grid_of_two',
                attributes: {
                  position: 0,
                },
                elementGroups: TEASER_ELEMENT_GROUPS,
              },
            ],
          },
          loaded: true,
          headline: 'DEPOT Projekte',
        }),
      },
      ...includeModuleMetadata([], [GlobalModule]),
    };
  });
