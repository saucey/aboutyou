import { object, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/angular';
import { includeModuleMetadata } from 'src/app/core/shop/utils';
import { GlobalModule } from 'src/app/common/global.module';
import { GridTilesComponent } from 'src/app/common/components/grid-tiles/grid-tiles.component';

const stories = storiesOf('Components|GridTiles', module)
  .addDecorator(withKnobs)
  .addParameters({ component: GridTilesComponent })
  .add('example_of_grid', () => {
    return {
      template: `
                <div class="container">
                  <app-grid-tiles
                  [tiles]="gridTiles"
                  [defaultButtonText]="gridTiles.defaultButtonText"
                  >
                  </app-grid-tiles>
                </div>
            `,
      props: {
        gridTiles: object('gridTiles', {
          data: [
            {
              type: 'group_tile_tall',
              attributes: {
                position: 0,
                link: {
                  target: '_self',
                  href: 'https://demo-shop.com/category-name',
                  resourceType: 'bundle|category|product|story',
                  resourceId: 234234,
                },
              },
              elements: [
                {
                  type: 'resource_image',
                  attributes: {
                    id: 100500,
                    hash: 'b1219ef4812ba3ff796a6a3fa6bc7b96',
                    width: 1234,
                    height: 645,
                    size: 12347654,
                    ext: 'jpg',
                  },
                },
                {
                  type: 'element_headline',
                  attributes: {
                    text: 'Leuchten',
                    color: '#000000',
                  },
                },
              ],
            },
            {
              type: 'group_tile_normal',
              attributes: {
                position: 0,
                link: {
                  target: '_self',
                  href: 'https://demo-shop.com/category-name',
                  resourceType: 'bundle|category|product|story',
                  resourceId: 234234,
                },
              },
              elements: [
                {
                  type: 'resource_image',
                  attributes: {
                    id: 100500,
                    hash: '1784a2f0c53b8a4febdc730d58c67a43',
                    width: 1234,
                    height: 645,
                    size: 12347654,
                    ext: 'jpg',
                  },
                },
                {
                  type: 'element_headline',
                  attributes: {
                    text: 'Kissen',
                    color: '#000000',
                  },
                },
              ],
            },
            {
              type: 'group_tile_normal',
              attributes: {
                position: 0,
                link: {
                  target: '_self',
                  href: 'https://demo-shop.com/category-name',
                  resourceType: 'bundle|category|product|story',
                  resourceId: 234234,
                },
              },
              elements: [
                {
                  type: 'resource_image',
                  attributes: {
                    id: 100500,
                    hash: '93667b86e8213dfc0e0ac21fe7355386',
                    width: 1234,
                    height: 645,
                    size: 12347654,
                    ext: 'jpg',
                  },
                },
                {
                  type: 'element_headline',
                  attributes: {
                    text: 'Blumentöpfe',
                    color: '#000000',
                  },
                },
              ],
            },
            {
              type: 'group_tile_normal',
              attributes: {
                position: 0,
                link: {
                  target: '_self',
                  href: 'https://demo-shop.com/category-name',
                  resourceType: 'bundle|category|product|story',
                  resourceId: 234234,
                },
              },
              elements: [
                {
                  type: 'resource_image',
                  attributes: {
                    id: 100500,
                    hash: '66f12da5b8d96fad06165ff3da3b11ae',
                    width: 1234,
                    height: 645,
                    size: 12347654,
                    ext: 'jpg',
                  },
                },
                {
                  type: 'element_headline',
                  attributes: {
                    text: 'Tischdeko',
                    color: '#000000',
                  },
                },
              ],
            },
            {
              type: 'group_tile_normal',
              attributes: {
                position: 0,
                link: {
                  target: '_self',
                  href: 'https://demo-shop.com/category-name',
                  resourceType: 'bundle|category|product|story',
                  resourceId: 234234,
                },
              },
              elements: [
                {
                  type: 'resource_image',
                  attributes: {
                    id: 100500,
                    hash: 'f9f350f186622c59b93ac545bdcb72c0',
                    width: 1234,
                    height: 645,
                    size: 12347654,
                    ext: 'jpg',
                  },
                },
                {
                  type: 'element_headline',
                  attributes: {
                    text: 'Blumen',
                    color: '#000000',
                  },
                },
              ],
            },
          ],
          headline: {
            size: 'h3',
            text: 'Highlights der Woche',
          },
          defaultButtonText: 'Jetzt entdecken',
        }),
        imageUrl:
          'https://depot.dam.staging.aboutyou.cloud/images//56b94441b1ee73e1abe0bd3145ae622a?quality=90&progressive=1&bg=f2f2f2&width=600&height=600&brightness=0.95',
      },
      ...includeModuleMetadata([], [GlobalModule]),
    };
  });
