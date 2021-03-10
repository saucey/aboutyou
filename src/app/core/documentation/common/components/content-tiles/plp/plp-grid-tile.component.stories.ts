import { object, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/angular';
import { includeModuleMetadata } from 'src/app/core/shop/utils';
import { GlobalModule } from 'src/app/common/global.module';
// tslint:disable-next-line: max-line-length
import { ContentPLPGridTileComponent } from 'src/app/common/components/content-tiles/plp/plp-grid-tile/plp-grid-tile.component';

const templateString = (width: number) => `
      <div class="container">
        <div class="row">
          <div class="col-4" *ngFor="let r of 4 | range">
            <div [ngStyle]=" { height: '330px', background: '#dadada', marginBottom: '1rem' } "></div>
          </div>
          <div class="col-${width * 4}">
            <app-content-plp-grid-tile [type]="type" [elementGroups]="elementGroups"></app-content-plp-grid-tile>
          </div>
          <div class="col-4" *ngFor="let r of 10 | range">
            <div [ngStyle]=" { height: '330px', background: '#dadada', marginBottom: '1rem' } "></div>
          </div>
        </div>
      </div>
      `;

export const SINGLE_TILE_ELEMENT_GROUP = {
  type: 'headline_cta_bgcolor',
  attributes: {
    textboxAlign: 'center' as 'center',
  },
  elements: [
    {
      type: 'element_headline' as 'element_headline',
      attributes: {
        text: 'Headline Lorem ipsum dolor sit',
        size: 'medium' as 'medium',
        color: '#fff',
      },
    },
    {
      type: 'element_cta' as 'element_cta',
      attributes: {
        text: 'See now!',
        tag: 'button',
        href: 'https://demo-shop.com/category-name',
      },
    },
    {
      type: 'element_image' as 'element_image',
      attributes: {
        hash: 'images/614c24576a4ead31e55584a3a55674ce',
      },
    },
  ],
};

export const DOUBLE_TILE_ELEMENT_GROUP = [
  {
    type: 'headline_cta_bgcolor',
    attributes: {
      area: 'right',
      textboxAlign: 'left',
      backgroundColor: '#40988654',
    },
    elements: [
      {
        type: 'element_headline',
        attributes: {
          text: 'Headline Lorem ipsum dolor sit',
          size: 'medium',
          color: '#fff',
        },
      },
      {
        type: 'element_cta',
        attributes: {
          text: 'See now!',
          tag: 'button',
          href: 'https://demo-shop.com/category-name',
        },
      },
      {
        type: 'element_image',
        attributes: {
          hash: 'images/614c24576a4ead31e55584a3a55674ce',
        },
      },
    ],
  },
];

export const GRID_OF_TWO_ELEMENT_GROUPS = [
  {
    type: 'headline_cta_bgcolor',
    attributes: {
      area: 'right',
      textboxAlign: 'center',
      backgroundColor: '#40988654',
    },
    elements: [
      {
        type: 'element_headline',
        attributes: {
          text: 'Headline Lorem ipsum dolor sit',
          size: 'medium',
        },
      },
      {
        type: 'element_cta',
        attributes: {
          text: 'See now!',
          tag: 'button',
          href: 'https://demo-shop.com/category-name',
        },
      },
    ],
  },
  {
    type: 'teaser',
    attributes: {
      area: 'left',
    },
    elements: [
      {
        type: 'element_image',
        attributes: {
          hash: 'images/614c24576a4ead31e55584a3a55674ce',
        },
      },
    ],
  },
];
storiesOf('Components|ContentTiles/PLP/GridTile', module)
  .addParameters({ component: ContentPLPGridTileComponent })
  .addDecorator(withKnobs)
  .add('single_tile', () => {
    return {
      template: templateString(1),
      props: {
        type: 'single_tile',
        elementGroups: object('single_tile: elementGroups', [SINGLE_TILE_ELEMENT_GROUP]),
      },
      ...includeModuleMetadata([], [GlobalModule]),
    };
  })
  .add('double_tile', () => {
    return {
      template: templateString(2),
      props: {
        type: 'double_tile',
        elementGroups: object('double_tile: elementGroups', DOUBLE_TILE_ELEMENT_GROUP),
      },
      ...includeModuleMetadata([], [GlobalModule]),
    };
  })
  .add('grid_of_two_aligned', () => {
    return {
      template: templateString(2),
      props: {
        type: 'grid_of_two_aligned',
        elementGroups: object('double_tile: elementGroups', GRID_OF_TWO_ELEMENT_GROUPS),
      },
      ...includeModuleMetadata([], [GlobalModule]),
    };
  });
