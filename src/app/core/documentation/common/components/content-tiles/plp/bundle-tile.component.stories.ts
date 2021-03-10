import { object, withKnobs, text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/angular';
import { includeModuleMetadata } from 'src/app/core/shop/utils';
import { GlobalModule } from 'src/app/common/global.module';
import { action } from '@storybook/addon-actions';
// tslint:disable-next-line: max-line-length
import { ContentPLPBundleTileComponent } from 'src/app/common/components/content-tiles/plp/plp-bundle-tile/bundle-tile.component';

const templateString = (width: number) => `
      <div class="container">
        <div class="row">
          <div class="col-4" *ngFor="let r of 4 | range">
            <div [ngStyle]=" { height: '330px', background: '#dadada', marginBottom: '1rem' } "></div>
          </div>
          <div class="col-${width * 4}">
            <app-content-plp-bundle-tile
              [type]="type"
              [shopTheLookLabel]="shopTheLookLabel"
              [discoverLabel]="discoverLabel"
              [elements]="elements"
              [onClick]="onClick"
              [showWishlistButton]="showWishlistButton"
              [onWishlistClick]="onWishlistClick"
            ></app-content-plp-bundle-tile>
          </div>
          <div class="col-4" *ngFor="let r of 10 | range">
            <div [ngStyle]=" { height: '330px', background: '#dadada', marginBottom: '1rem' } "></div>
          </div>
        </div>
      </div>
      `;

export const SINGLE_BUNDLE_TILE_ELEMENTS = [
  {
    type: 'bundle' as 'bundle',
    attributes: {
      name: 'Cold Sun Look',
      backgroundColor: '#e7e7e7',
      images: [
        {
          type: 'image',
          attributes: {
            hash: 'images/7f6ae73f4c41683324308dacd0d17c7f',
          },
        },
      ],
      products: [
        {
          type: 'bundleProduct',
          attributes: {
            position: 0,
            priority: 'primary',
            productId: 10791,
            fallbackProductIds: [10799, 10511, 9694, 9748],
            image: {
              hash: 'images/35764318a728d1ef0aef771a9bf05c82',
            },
          },
        },
        {
          type: 'bundleProduct',
          attributes: {
            position: 1,
            priority: 'secondary',
            productId: 10799,
            fallbackProductIds: [10511],
            image: {
              hash: 'images/19016b668cf93549f747aeabb35879b9',
            },
          },
        },
        {
          type: 'bundleProduct',
          attributes: {
            position: 1,
            priority: 'remaining',
            productId: 10511,
            fallbackProductIds: [],
            image: {
              hash: 'images/8ab9b40909979690b8344cb92140e04e',
            },
          },
        },
        {
          type: 'bundleProduct',
          attributes: {
            position: 2,
            priority: 'remaining',
            productId: 9694,
            fallbackProductIds: [9694],
            image: {
              hash: 'images/71328730a7686159eea064cb1e7a5b7c',
            },
          },
        },
        {
          type: 'bundleProduct',
          attributes: {
            position: 2,
            priority: 'remaining',
            productId: 9748,
            fallbackProductIds: [9694],
            image: {
              hash: 'images/03201e8f86e819fac9446bd25f79a377',
            },
          },
        },
      ],
    },
  },
];
storiesOf('Components|ContentTiles/PLP/BundleTiles', module)
  .addParameters({ component: ContentPLPBundleTileComponent })
  .addDecorator(withKnobs)
  .add('single_bundle_tile', () => {
    return {
      template: templateString(1),
      props: {
        type: 'single_bundle_tile',
        showWishlistButton: true,
        onClick: action('onClick'),
        onWishlistClick: action('onWishlistClick'),
        shopTheLookLabel: text('shopTheLookLabel', 'SHOP THE LOOK'),
        discoverLabel: text('discoverLabel', 'discover now'),
        elements: object('single_bundle_tile: element', SINGLE_BUNDLE_TILE_ELEMENTS),
      },
      ...includeModuleMetadata([], [GlobalModule]),
    };
  })
  .add('double_bundle_tile', () => {
    return {
      template: templateString(2),
      props: {
        type: 'double_bundle_tile',
        onClick: action('onClick'),
        onWishlistClick: action('onWishlistClick'),
        shopTheLookLabel: text('shopTheLookLabel', 'SHOP THE LOOK'),
        discoverLabel: text('discoverLabel', 'discover now'),
        elements: object('double_bundle_tile: element', [
          {
            type: 'bundle',
            attributes: {
              name: 'Cold Sun Look',
              backgroundColor: '#e7e7e7',
              images: [
                {
                  type: 'image',
                  attributes: {
                    hash: 'images/7f6ae73f4c41683324308dacd0d17c7f',
                  },
                },
              ],
              products: [
                {
                  type: 'bundleProduct',
                  attributes: {
                    position: 0,
                    priority: 'primary',
                    productId: 10791,
                    fallbackProductIds: [10799, 10511, 9694, 9748],
                    image: {
                      hash: 'images/35764318a728d1ef0aef771a9bf05c82',
                    },
                  },
                },
                {
                  type: 'bundleProduct',
                  attributes: {
                    position: 1,
                    priority: 'secondary',
                    productId: 10799,
                    fallbackProductIds: [10511],
                    image: {
                      hash: 'images/19016b668cf93549f747aeabb35879b9',
                    },
                  },
                },
                {
                  type: 'bundleProduct',
                  attributes: {
                    position: 1,
                    priority: 'remaining',
                    productId: 10511,
                    fallbackProductIds: [],
                    image: {
                      hash: 'images/8ab9b40909979690b8344cb92140e04e',
                    },
                  },
                },
                {
                  type: 'bundleProduct',
                  attributes: {
                    position: 2,
                    priority: 'remaining',
                    productId: 9694,
                    fallbackProductIds: [9694],
                    image: {
                      hash: 'images/71328730a7686159eea064cb1e7a5b7c',
                    },
                  },
                },
                {
                  type: 'bundleProduct',
                  attributes: {
                    position: 2,
                    priority: 'remaining',
                    productId: 9748,
                    fallbackProductIds: [9694],
                    image: {
                      hash: 'images/03201e8f86e819fac9446bd25f79a377',
                    },
                  },
                },
              ],
            },
          },
        ]),
      },
      ...includeModuleMetadata([], [GlobalModule]),
    };
  });
