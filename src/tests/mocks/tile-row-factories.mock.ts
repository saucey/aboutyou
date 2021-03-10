export const headLineTileGridOfTwo = (headline: string, subline: string, imageHash: string, color: string) => ({
  type: 'grid_of_two_aligned',
  id: 123,
  attributes: {
    position: 0,
    areas: ['left', 'right'],
  },
  elementGroups: [
    {
      type: 'headline_subline_bgcolor',
      attributes: {
        area: 'left',
        textboxAlign: 'center',
        backgroundColor: color,
      },
      elements: [
        {
          type: 'element_headline',
          id: 123,
          attributes: {
            text: headline,
            size: 'large',
            color: 'f5f6f7',
          },
        },
        {
          type: 'element_subline',
          id: 123,
          attributes: {
            text: subline,
            size: 'small',
          },
        },
      ],
    },
    {
      type: 'teaser',
      id: 3453,
      attributes: {
        area: 'right', // present only in grid
        textboxAlign: 'center',
        backgroundColor: '#f5f6f7', // displayed until image is loading (or can be omitted)
      },
      elements: [
        {
          type: 'element_image',
          id: 123,
          attributes: {
            hash: imageHash,
            width: 1234,
            height: 645,
            size: 12347654,
            ext: 'jpg',
          },
        },
      ],
    },
  ],
});

export const singleTileRow = () => ({
  type: 'single_tile',
  id: 123,
  attributes: {},
  elementGroups: [
    {
      type: 'headline_subline_bgcolor',
      attributes: {
        area: 'left', // present only in grid
        textboxAlign: 'center',
        backgroundColor: '#f5f6f7',
      },
      elements: [
        {
          type: 'element_headline',
          id: 123,
          attributes: {
            text: 'Deko & Wohnen',
            size: 'medium',
            color: '#f5f6f7',
          },
        },
        {
          type: 'element_image',
          id: 123,
          attributes: {
            hash: 'images/614c24576a4ead31e55584a3a55674ce',
            width: 1234,
            height: 645,
            size: 12347654,
            ext: 'jpg',
          },
        },
        {
          type: 'element_cta',
          id: 123,
          attributes: {
            text: 'See now!',
            tag: 'button', // |anchor
            link: {
              href: 'src/app/deko-wohnaccessoires',
              target: '_blank',
            },
          },
        },
      ],
    },
  ],
});

export const doubleTileRow = () => ({
  type: 'double_tile',
  id: 123,
  attributes: {},
  elementGroups: [
    {
      type: 'headline_subline_bgcolor',
      attributes: {
        area: 'left', // present only in grid
        textboxAlign: 'center',
        backgroundColor: '#f5f6f7',
      },
      elements: [
        {
          type: 'element_headline',
          id: 123,
          attributes: {
            text: 'Deko & Wohnen',
            size: 'medium',
            color: '#f5f6f7',
          },
        },
        {
          type: 'element_image',
          id: 123,
          attributes: {
            hash: 'images/614c24576a4ead31e55584a3a55674ce',
            width: 1234,
            height: 645,
            size: 12347654,
            ext: 'jpg',
          },
        },
        {
          type: 'element_cta',
          id: 123,
          attributes: {
            text: 'Jetzt entdecken',
            style: 'secondary-holo-light',
            tag: 'button', // |anchor
            link: {
              href: 'src/app/deko-wohnaccessoires',
              target: '_blank',
            },
          },
        },
      ],
    },
  ],
});

export const gridOfTwoRow = () => ({
  // a grid type must always start with 'grid', the rest of the type is used
  // to easily identify on the frontend how to render the elements
  type: 'grid_of_two_aligned',
  id: 123,
  attributes: {
    align: 'left', // alignment of grid within a row if it's not meant to be full width
    areas: [
      // possible placements within the grid
      'left',
      'right',
    ],
  },
  elementGroups: [
    {
      type: 'headline_subline_bgcolor',
      attributes: {
        area: 'left', // present only in grid
        textboxAlign: 'center',
        backgroundColor: '#e6e6e6',
      },
      elements: [
        {
          type: 'element_headline',
          id: 123,
          attributes: {
            text: 'Deko & Wohnen',
            size: 'medium',
            color: 'f5f6f7',
          },
        },
        {
          type: 'element_subline',
          id: 123,
          attributes: {
            text: 'Deko- und Wohnaccessoires',
            size: 'small',
          },
        },
        {
          type: 'element_cta',
          id: 123,
          attributes: {
            text: 'See now!',
            tag: 'button', // |anchor
            link: {
              href: 'src/app/deko-wohnaccessoires',
              target: '_blank',
            },
          },
        },
      ],
    },
    {
      type: 'teaser',
      id: 3453,
      attributes: {
        area: 'right', // present only in grid
        textboxAlign: 'center',
        backgroundColor: '#f5f6f7', // displayed until image is loading (or can be omitted)
      },
      elements: [
        {
          type: 'element_image',
          id: 123,
          attributes: {
            hash: 'images/614c24576a4ead31e55584a3a55674ce',
            width: 1234,
            height: 645,
            size: 12347654,
            ext: 'jpg',
          },
        },
      ],
    },
  ],
});

export const bundleTileRow = (singleDouble: string) => {
  return {
    type: `${singleDouble}_bundle_tile`,
    attributes: {
      area: 'right',
    },
    elements: [
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
                productId: 21775,
                fallbackProductIds: [],
              },
            },
            {
              type: 'bundleProduct',
              attributes: {
                position: 1,
                priority: 'secondary',
                productId: 20748,
                fallbackProductIds: [],
              },
            },
            {
              type: 'bundleProduct',
              attributes: {
                position: 1,
                priority: 'remaining',
                productId: 20269,
                fallbackProductIds: [],
              },
            },
            {
              type: 'bundleProduct',
              attributes: {
                position: 2,
                priority: 'remaining',
                productId: 20222,
                fallbackProductIds: [],
              },
            },
            {
              type: 'bundleProduct',
              attributes: {
                position: 2,
                priority: 'remaining',
                productId: 22051,
                fallbackProductIds: [],
              },
            },
          ],
        },
      },
    ],
  };
};

export const trisectionSlides = [
  // First slide
  {
    type: 'grid_of_three',
    attributes: {
      position: 0,
      link: {
        // when whole slide is clickable. TODO: see if easier to make it as an element
        target: '_self', // current or new window
        href: 'https://demo-shop.com/category-name', // has value only in case resource is null
        resourceType: 'bundle|category|product|story', // nullable
        resourceId: 234234, // nullable
      },
    },
    elementGroups: [
      // Left part
      {
        type: 'group_trisection_textbox',
        attributes: {
          position: 0,
          bgColor: '#f59b7d', // nullable, visible until bgimage is loading or of its missing
          textboxAlign: 'left',
        },
        elements: [
          {
            // optional
            type: 'element_subline',
            attributes: {
              showFirst: true,
              text: 'INTRIOR DESIGN INFLUENCER',
              size: 'small',
              color: '#000000',
            },
          },
          {
            // optional
            type: 'element_headline',
            attributes: {
              text: 'Decorate Wild!',
              size: 'large',
              color: '#000000',
            },
          },
        ],
      },
      // Center part
      {
        type: 'group_trisection_image',
        attributes: {
          position: 1,
          bgColor: '#f5f6f7', // nullable, visible until bgimage is loading or of its missing
        },
        elements: [
          {
            type: 'resource_image_bg',
            attributes: {
              id: 100500,
              hash: 'images/d087572056fa3423345219a328866ca7',
              width: 1234,
              height: 645,
              size: 12347654,
              ext: 'jpg',
            },
          },
        ],
      },
      // Right part like center or left
      {
        type: 'group_trisection_textbox',
        attributes: {
          position: 0,
          bgColor: '#f59b7d', // nullable, visible until bgimage is loading or of its missing
          textboxAlign: 'center',
        },
        elements: [
          {
            // optional
            type: 'element_text',
            attributes: {
              text:
                // tslint:disable-next-line: max-line-length
                'is a bestselling author, an award-winning blogger, and a designer and artist with millions of followers across her social media platforms. Her first home decor book, The New Bohemians, was a New.',
            },
          },
          {
            type: 'resource_image_logo',
            attributes: {
              id: 100500,
              hash: 'images/8af4d86182c983279a2ff42be780193a',
              width: 1234,
              height: 645,
              size: 12347654,
              ext: 'jpg',
            },
          },
          {
            type: 'element_cta',
            attributes: {
              tag: 'button',
              text: 'Jetzt entdecken',
              style: 'secondary-holo-dark', // see SDDEP-200
              link: {
                target: '_self', // current or new window
                href: 'https://demo-shop.com/category-name', // has value only in case resource is null
                resourceType: 'bundle|category|product|story', // nullable
                resourceId: 234234, // nullable
              },
            },
          },
        ],
      },
    ],
  },
  // Second slide
  {
    type: 'grid_of_three',
    attributes: {
      position: 0,
      link: {
        // when whole slide is clickable. TODO: see if easier to make it as an element
        target: '_self', // current or new window
        href: 'https://demo-shop.com/category-name', // has value only in case resource is null
        resourceType: 'bundle|category|product|story', // nullable
        resourceId: 234234, // nullable
      },
    },
    elementGroups: [
      //  left
      {
        type: 'group_trisection_textbox',
        attributes: {
          position: 0,
          bgColor: '#f59b7d', // nullable, visible until bgimage is loading or of its missing
          textboxAlign: 'center',
        },
        elements: [
          {
            // optional
            type: 'element_subline',
            attributes: {
              showFirst: true,
              text: 'Justina Blakeney',
              size: 'small',
              color: '#000000',
            },
          },
          {
            // optional
            type: 'element_headline',
            attributes: {
              showFirst: true,
              text: 'Decorate Wild!',
              size: 'medium',
              color: '#000000',
            },
          },
          {
            // optional
            type: 'element_text',
            attributes: {
              text:
                // tslint:disable-next-line: max-line-length
                'is a bestselling author, an award-winning blogger, and a designer and artist with millions of followers across her social media platforms. Her first home decor book, The New Bohemians, was a New.',
            },
          },
          {
            type: 'resource_image_logo',
            attributes: {
              id: 100500,
              hash: 'images/8af4d86182c983279a2ff42be780193a',
              width: 1234,
              height: 645,
              size: 12347654,
              ext: 'jpg',
            },
          },
          {
            type: 'element_cta',
            attributes: {
              tag: 'button',
              text: 'Jetzt entdecken',
              style: 'secondary-holo-dark', // see SDDEP-200
              link: {
                target: '_self', // current or new window
                href: 'https://demo-shop.com/category-name', // has value only in case resource is null
                resourceType: 'bundle|category|product|story', // nullable
                resourceId: 234234, // nullable
              },
            },
          },
        ],
      },
      // Center
      {
        type: 'group_trisection_image',
        attributes: {
          position: 1,
          bgColor: '#f5f6f7', // nullable, visible until bgimage is loading or of its missing
        },
        elements: [
          {
            type: 'resource_image_bg',
            attributes: {
              id: 100500,
              hash: 'images/49392ba04c7ec53d1899c0b952f65d4f',
              width: 1234,
              height: 645,
              size: 12347654,
              ext: 'jpg',
            },
          },
        ],
      },
      // Right part
      {
        type: 'group_trisection_image',
        attributes: {
          position: 1,
          bgColor: '#f5f6f7', // nullable, visible until bgimage is loading or of its missing
        },
        elements: [
          {
            type: 'resource_image_bg',
            attributes: {
              id: 100500,
              hash: 'images/8af4d86182c983279a2ff42be780193a',
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
  // Thrid slide
  {
    type: 'grid_of_three',
    attributes: {
      position: 0,
      link: {
        // when whole slide is clickable. TODO: see if easier to make it as an element
        target: '_self', // current or new window
        href: 'https://demo-shop.com/category-name', // has value only in case resource is null
        resourceType: 'bundle|category|product|story', // nullable
        resourceId: 234234, // nullable
      },
    },
    elementGroups: [
      // Left part
      {
        type: 'group_trisection_textbox',
        attributes: {
          position: 0,
          bgColor: '#f59b7d', // nullable, visible until bgimage is loading or of its missing
          textboxAlign: 'left',
        },
        elements: [
          {
            // optional
            type: 'element_headline',
            attributes: {
              showFirst: true,
              text: 'Decorate Wild!',
              size: 'medium',
              color: '#000000',
            },
          },
          {
            // optional
            type: 'element_text',
            attributes: {
              text:
                // tslint:disable-next-line: max-line-length
                'Justina Blakeney is a bestselling author, an award-winning blogger, and a designer and artist with millions of followers across her social media platforms...',
            },
          },
          {
            type: 'resource_image_logo',
            attributes: {
              id: 100500,
              hash: 'images/8af4d86182c983279a2ff42be780193a',
              width: 1234,
              height: 645,
              size: 12347654,
              ext: 'jpg',
            },
          },
          {
            type: 'element_cta',
            attributes: {
              tag: 'button',
              text: 'Jetzt entdecken',
              style: 'secondary-holo-dark', // see SDDEP-200
              link: {
                target: '_self', // current or new window
                href: 'https://demo-shop.com/category-name', // has value only in case resource is null
                resourceType: 'bundle|category|product|story', // nullable
                resourceId: 234234, // nullable
              },
            },
          },
        ],
      },
      // Center part
      {
        type: 'group_trisection_image',
        attributes: {
          position: 1,
          bgColor: '#f5f6f7', // nullable, visible until bgimage is loading or of its missing
        },
        elements: [
          {
            type: 'resource_image_bg',
            attributes: {
              id: 100500,
              hash: 'images/e44963f9623c73c151d455a33a5428b1',
              width: 1234,
              height: 645,
              size: 12347654,
              ext: 'jpg',
            },
          },
        ],
      },
      // Center part
      {
        type: 'group_trisection_image',
        attributes: {
          position: 1,
          bgColor: '#f5f6f7', // nullable, visible until bgimage is loading or of its missing
        },
        elements: [
          {
            type: 'resource_image_bg',
            attributes: {
              id: 100500,
              hash: 'images/b7efd449ea477e66029a131f08a54cfc',
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
];

export const createTriscetionTeaser = (headline: string, slides: any) => {
  return {
    type: 'grid_slider_trisection',
    headline,
    data: slides,
  };
};

export const createTilesFixture = () => ({
  defaultButtonText: '',
  loaded: null,
  headline: {
    size: '',
    text: '',
  },
  data: null,
});

export const createSlideFixture = () => {
  const contentElementGroup = {
    attributes: {
      textboxAlign: 'center',
      area: 'left',
      bgColor: '',
    },
    type: '',
    elements: [
      {
        type: 'element_headline',
        attributes: {
          text: '',
          link: {
            href: '',
            target: '_blank',
          },
        },
      },
    ],
  };

  return {
    type: '',
    attributes: {},
    elementGroups: [contentElementGroup, contentElementGroup, contentElementGroup],
  };
};

export const productTilesRow = (headline: string) => {
  return {
    type: `product_tiles_slider`,
    attributes: {
      name: headline,
      products: [
        {
          type: 'product',
          attributes: {
            productId: 21775,
          },
        },
        {
          type: 'product',
          attributes: {
            productId: 20748,
          },
        },
        {
          type: 'product',
          attributes: {
            productId: 20269,
          },
        },
        {
          type: 'product',
          attributes: {
            productId: 20222,
          },
        },
        {
          type: 'product',
          attributes: {
            productId: 22051,
          },
        },
      ],
    },
  };
};
