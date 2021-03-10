import { range } from 'ramda';
import {
  headLineTileGridOfTwo,
  bundleTileRow,
  singleTileRow,
  doubleTileRow,
  gridOfTwoRow,
  createTriscetionTeaser,
  trisectionSlides,
  productTilesRow,
} from './tile-row-factories.mock';

// tslint:disable: max-line-length
export const contentMock = () => {
  return {
    home: {
      seo: {
        og: {
          title: '',
          description: '',
          image: '',
          site_name: '',
        },
        title: '',
        description: '',
      },
      content: [
        {
          type: 'grid_slider', // general slider definition
          attributes: {
            position: 0,
          },
          elementGroups: [
            // First slide
            {
              type: 'grid_of_one',
              attributes: {
                position: 0,
              },
              elementGroups: [
                {
                  type: 'group_headline_cta_bg', // generic name for the type
                  attributes: {
                    position: 0,
                    bgColor: '#f5f6f7', // nullable, visible until bgimage is loading or of its missing
                    textboxAlign: 'left', // right or center
                    ctaHidden: false, // if true and cta is set, the whole block links to whats defined in cta
                    sublineFirst: false, // whether the subline should be on top
                  },
                  elements: [
                    {
                      // optional if bgOnly
                      type: 'element_headline',
                      attributes: {
                        text: 'Die Bestseller sind zurück.',
                        size: 'large', // small or medium
                        color: '#000000',
                      },
                    },
                    {
                      // optional if bgOnly
                      type: 'element_subline',
                      attributes: {
                        text: 'GLÄNZENDE AUSSICHTEN',
                        size: 'small', // small or medium
                        color: '#000000',
                      },
                    },
                    {
                      // optional if bgOnly
                      type: 'element_cta',
                      attributes: {
                        tag: 'button',
                        text: 'Jetzt entdecken',
                        style: 'secondary-filled-default', // see SDDEP-200
                        link: {
                          target: '_self', // current or new window
                          href: 'src/app/deko-wohnaccessoires/', // has value only in case resource is null
                          resourceType: 'bundle|category|product|story', // nullable
                          resourceId: 234234, // nullable
                        },
                      },
                    },
                    {
                      type: 'resource_image_bg_desktop',
                      attributes: {
                        id: 100500,
                        hash: 'images/521521fbf029d1c5408b8e72fb5578ba',
                        width: 1234,
                        height: 645,
                        size: 12347654,
                        ext: 'jpg',
                      },
                    },
                  ],
                },
              ],
            },
            // Second slide
            {
              type: 'grid_of_one',
              attributes: {
                position: 0,
              },
              elementGroups: [
                {
                  type: 'group_headline_cta_bg', // generic name for the type
                  attributes: {
                    position: 0,
                    bgColor: '#f5f6f7', // nullable, visible until bgimage is loading or of its missing
                    textboxAlign: 'center', // right or center
                    ctaHidden: true, // if true and cta is set, the whole block links to whats defined in cta
                    sublineFirst: true, // whether the subline should be on top
                  },
                  elements: [
                    {
                      // optional if bgOnly
                      type: 'element_headline',
                      attributes: {
                        text: 'Die Bestseller sind zurück.',
                        size: 'large', // small or medium
                        color: '#000000',
                      },
                    },
                    {
                      // optional if bgOnly
                      type: 'element_subline',
                      attributes: {
                        text: 'GLÄNZENDE AUSSICHTEN',
                        size: 'small', // small or medium
                        color: '#000000',
                      },
                    },
                    {
                      // optional if bgOnly
                      type: 'element_cta',
                      attributes: {
                        tag: 'button',
                        text: 'Jetzt entdecken',
                        style: 'secondary', // see SDDEP-200
                        link: {
                          target: '_blank', // current or new window
                          href: 'src/app/deko-wohnaccessoires', // has value only in case resource is null
                          resourceType: 'bundle|category|product|story', // nullable
                          resourceId: 234234, // nullable
                        },
                      },
                    },
                    {
                      type: 'resource_image_bg_desktop',
                      attributes: {
                        id: 100500,
                        hash: 'images/ebe488d1a2b5a6e979d67a53f1332f39',
                        width: 1234,
                        height: 645,
                        size: 12347654,
                        ext: 'jpg',
                      },
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          type: 'grid_tiles',
          attributes: {
            position: 0,
          },
          elements: [
            {
              type: 'element_headline',
              attributes: {
                text: 'Highlights der Woche',
                size: 'medium',
                color: '#000000',
              },
            },
          ],
          elementGroups: [
            // Can have one group, that will define the layout
            {
              // this defines which layout to use
              type: 'grid_tiles_classic',
              attributes: {
                position: 0,
              },
              elementGroups: [
                {
                  type: 'group_tile_tall', // group_tile_tall, group_tile_wide, group_tile_normal
                  attributes: {
                    position: 0,
                    link: {
                      // todo: see if easier to make it as an element
                      target: '_self', // current or new window
                      href: 'src/app/deko-wohnaccessoires', // has value only in case resource is null
                      resourceType: 'bundle|category|product|story', // nullable
                      resourceId: 234234, // nullable
                    },
                  },
                  elements: [
                    {
                      type: 'resource_image',
                      attributes: {
                        id: 100500,
                        hash: 'images/b1219ef4812ba3ff796a6a3fa6bc7b96',
                        width: 1234,
                        height: 645,
                        size: 12347654,
                        ext: 'jpg',
                      },
                    },
                    {
                      type: 'element_headline',
                      attributes: {
                        text: 'Lampen & Leuchten',
                        color: '#000000',
                      },
                    },
                  ],
                },
                {
                  type: 'group_tile_normal', // group_tile_tall, group_tile_wide, group_tile_normal
                  attributes: {
                    position: 0,
                    link: {
                      // todo: see if easier to make it as an element
                      target: '_self', // current or new window
                      href: 'src/app/deko-wohnaccessoires', // has value only in case resource is null
                      resourceType: 'bundle|category|product|story', // nullable
                      resourceId: 234234, // nullable
                    },
                  },
                  elements: [
                    {
                      type: 'resource_image',
                      attributes: {
                        id: 100500,
                        hash: 'images/1784a2f0c53b8a4febdc730d58c67a43',
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
                  type: 'group_tile_normal', // group_tile_tall, group_tile_wide, group_tile_normal
                  attributes: {
                    position: 0,
                    link: {
                      // todo: see if easier to make it as an element
                      target: '_self', // current or new window
                      href: 'src/app/deko-wohnaccessoires', // has value only in case resource is null
                      resourceType: 'bundle|category|product|story', // nullable
                      resourceId: 234234, // nullable
                    },
                  },
                  elements: [
                    {
                      type: 'resource_image',
                      attributes: {
                        id: 100500,
                        hash: 'images/93667b86e8213dfc0e0ac21fe7355386',
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
                  type: 'group_tile_normal', // group_tile_tall, group_tile_wide, group_tile_normal
                  attributes: {
                    position: 0,
                    link: {
                      // todo: see if easier to make it as an element
                      target: '_self', // current or new window
                      href: 'src/app/deko-wohnaccessoires', // has value only in case resource is null
                      resourceType: 'bundle|category|product|story', // nullable
                      resourceId: 234234, // nullable
                    },
                  },
                  elements: [
                    {
                      type: 'resource_image',
                      attributes: {
                        id: 100500,
                        hash: 'images/66f12da5b8d96fad06165ff3da3b11ae',
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
                  type: 'group_tile_normal', // group_tile_tall, group_tile_wide, group_tile_normal
                  attributes: {
                    position: 0,
                    link: {
                      // todo: see if easier to make it as an element
                      target: '_self', // current or new window
                      href: 'src/app/deko-wohnaccessoires', // has value only in case resource is null
                      resourceType: 'bundle|category|product|story', // nullable
                      resourceId: 234234, // nullable
                    },
                  },
                  elements: [
                    {
                      type: 'resource_image',
                      attributes: {
                        id: 100500,
                        hash: 'images/f9f350f186622c59b93ac545bdcb72c0',
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
            },
          ],
        },
        createTriscetionTeaser('Depot empfiehlt', trisectionSlides),
        {
          type: 'grid_popular_categories',
          elements: [
            {
              type: 'element_headline',
              attributes: {
                text: 'Depot Empfiehlt',
                color: '#000000',
              },
            },
          ],
          elementGroups: [
            {
              type: 'grid_popular_categories_list',
              attributes: {
                position: 0,
              },
              elements: [
                {
                  type: 'element_category_cta',
                  attributes: {
                    style: 'primary, // see SDDEP-200',
                    link: {
                      target: '_blank',
                      href: null,
                      resourceType: 'category',
                      resourceId: 145,
                    },
                  },
                },
              ],
            },
            {
              type: 'grid_popular_categories_list',
              attributes: {
                position: 0,
              },
              elements: [
                {
                  type: 'element_category_cta',
                  attributes: {
                    style: 'primary, // see SDDEP-200',
                    link: {
                      target: '_blank',
                      href: null,
                      resourceType: 'category',
                      resourceId: 299,
                    },
                  },
                },
              ],
            },
            {
              type: 'grid_popular_categories_list',
              attributes: {
                position: 0,
              },
              elements: [
                {
                  type: 'element_category_cta',
                  attributes: {
                    style: 'primary, // see SDDEP-200',
                    link: {
                      target: '_blank',
                      href: null,
                      resourceType: 'category',
                      resourceId: 486,
                    },
                  },
                },
              ],
            },
          ],
        },
        {
          type: 'grid_product_slider',
          headline: 'DEPOT Community most wanted',
          productIds: [24566, 24575, 24501, 24470, 24443],
        },
        {
          type: 'grid_double_teaser', // general slider definition
          attributes: {
            position: 0,
          },
          elementGroups: [
            // First slide
            {
              type: 'grid_of_two',
              attributes: {
                position: 0,
              },
              elementGroups: [
                {
                  type: 'group_headline_cta_bg', // generic name for the type
                  attributes: {
                    position: 0,
                    bgColor: '#f5f6f7', // nullable, visible until bgimage is loading or of its missing
                    textboxAlign: 'left', // right or center
                    ctaHidden: false, // if true and cta is set, the whole block links to whats defined in cta
                    sublineFirst: false, // whether the subline should be on top
                  },
                  elements: [
                    {
                      // optional if bgOnly
                      type: 'element_subline',
                      attributes: {
                        text: 'DEPOT App',
                        size: 'small', // small or medium
                        color: '#000000',
                      },
                    },
                    {
                      // optional if bgOnly
                      type: 'element_headline',
                      attributes: {
                        text: 'Aktuelle Interior-Trends <b>überall parat.</b>',
                        size: 'large', // small or medium
                        color: '#000000',
                      },
                    },
                    {
                      // optional if bgOnly
                      type: 'element_cta',
                      attributes: {
                        tag: 'button',
                        text: 'Mehr erfahren',
                        style: 'secondary-outline', // see SDDEP-200
                        link: {
                          target: '_self', // current or new window
                          href: 'src/app/deko-wohnaccessoires', // has value only in case resource is null
                          resourceType: 'bundle|category|product|story', // nullable
                          resourceId: 234234, // nullable
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
                  type: 'group_headline_cta_bg', // generic name for the type
                  attributes: {
                    position: 0,
                    bgColor: '#f5f6f7', // nullable, visible until bgimage is loading or of its missing
                    textboxAlign: 'left', // right or center
                    ctaHidden: false, // if true and cta is set, the whole block links to whats defined in cta
                    sublineFirst: false, // whether the subline should be on top
                  },
                  elements: [
                    {
                      // optional if bgOnly
                      type: 'element_subline',
                      attributes: {
                        text: 'loved by DEPOT',
                        size: 'small', // small or medium
                        color: '#000000',
                      },
                    },
                    {
                      // optional if bgOnly
                      type: 'element_headline',
                      attributes: {
                        text: 'Dekoriert Eure Hochzeit <b>individuell.</b>',
                        size: 'large', // small or medium
                        color: '#000000',
                      },
                    },
                    {
                      // optional if bgOnly
                      type: 'element_cta',
                      attributes: {
                        tag: 'button',
                        text: 'Zum Hochzeitsplaner',
                        style: 'default', // see SDDEP-200
                        link: {
                          target: '_self', // current or new window
                          href: 'https://demo-shop.com/category-name/', // has value only in case resource is null
                          resourceType: 'bundle|category|product|story', // nullable
                          resourceId: 234234, // nullable
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
              ],
            },
          ],
        },
        {
          type: 'grid_product_slider',
          headline: 'DEPOT Community most wanted',
          productIds: [24566, 24575, 24501, 24470, 24443],
        },
        createTriscetionTeaser('Depot empfiehlt', trisectionSlides),
        {
          type: 'grid_seo_text',
          display: true,
        },
        {
          type: 'grid_newsletter',
          display: true,
        },
        {
          type: 'grid_usp',
          display: true,
        },
      ],
    },
    category: [
      {
        id: 145,
        resourceType: 'category',
        rows: [
          headLineTileGridOfTwo(
            'Lampen & Leuchten',
            'Lampen und Leuchten',
            'images/8cbb1711e0f845b4cada3a5a0f783740',
            '#e1d2c3',
          ),
          ...range(0, 15).map(() => bundleTileRow('single')),
          ...range(0, 15).map(() => singleTileRow()),
          ...range(0, 15).map(() => bundleTileRow('double')),
          ...range(0, 5).map(() => doubleTileRow()),
          ...range(0, 15).map(() => gridOfTwoRow()),
        ],
      },
      {
        id: 486,
        resourceType: 'category',
        rows: [
          headLineTileGridOfTwo(
            'Deko & Wohnen',
            'Deko und Wohnaccessories',
            'images/df7ab8c7068b7b07e5a7680a51bccd11',
            '#bee6eb',
          ),
          ...range(0, 15).map(() => bundleTileRow('single')),
          ...range(0, 15).map(() => singleTileRow()),
          ...range(0, 15).map(() => bundleTileRow('double')),
          ...range(0, 5).map(() => doubleTileRow()),
          ...range(0, 15).map(() => gridOfTwoRow()),
        ],
      },
      {
        id: 1,
        resourceType: 'category',
        rows: [
          headLineTileGridOfTwo(
            'Gedeckter Tisch & Küche',
            'Gedeckter Tisch und Küche',
            'images/8cbb1711e0f845b4cada3a5a0f783740',
            '#e6e6e6',
          ),
          ...range(0, 15).map(() => bundleTileRow('single')),
          ...range(0, 15).map(() => singleTileRow()),
          ...range(0, 15).map(() => bundleTileRow('double')),
          ...range(0, 5).map(() => doubleTileRow()),
          ...range(0, 15).map(() => gridOfTwoRow()),
        ],
      },
      {
        id: 69,
        resourceType: 'category',
        rows: [
          headLineTileGridOfTwo('Möbel', '', 'images/8cbb1711e0f845b4cada3a5a0f783740', '#bee6eb'),
          ...range(0, 15).map(() => bundleTileRow('single')),
          ...range(0, 15).map(() => singleTileRow()),
          ...range(0, 15).map(() => bundleTileRow('double')),
          ...range(0, 5).map(() => doubleTileRow()),
          ...range(0, 15).map(() => gridOfTwoRow()),
        ],
      },
      {
        id: 602,
        resourceType: 'category',
        rows: [
          ...range(0, 15).map(() => bundleTileRow('single')),
          ...range(0, 15).map(() => singleTileRow()),
          ...range(0, 15).map(() => bundleTileRow('double')),
          ...range(0, 5).map(() => doubleTileRow()),
          ...range(0, 15).map(() => gridOfTwoRow()),
        ],
      },
      {
        id: 299,
        resourceType: 'category',
        resourceId: 123123,
        rows: [
          headLineTileGridOfTwo('Balkon & Garten', '', 'images/fc011c375eb4a34e368b125813bbb8f8', '#e6e6e6'),
          ...range(0, 15).map(() => bundleTileRow('single')),
          ...range(0, 15).map(() => singleTileRow()),
          ...range(0, 15).map(() => bundleTileRow('double')),
          ...range(0, 5).map(() => doubleTileRow()),
          ...range(0, 15).map(() => gridOfTwoRow()),
        ],
      },
    ],
    search: [
      {
        resourceType: 'search',
        rows: [
          productTilesRow('DEPOT Community most wanted'),
          productTilesRow('Neuheiten zur Adventszeit'),
          productTilesRow('DEPOT Community most popular'),
        ],
      },
    ],
  };
};
