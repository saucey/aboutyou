import { storiesOf } from '@storybook/angular';
import { HomeComponent } from 'src/app/pages/home/home.component';
import { includeModuleMetadata } from 'src/app/core/shop/utils';
import { GlobalModule } from 'src/app/common/global.module';
import { boolean, number, text, select, withKnobs, object, array } from '@storybook/addon-knobs';
import { TrisectionComponent } from 'src/app/common/components/teasers/trisection/trisection.component';

const stories = storiesOf('Components|Teasers/Trisection', module)
  .addParameters({ component: TrisectionComponent })
  .addDecorator(withKnobs)
  .add('single_slide', () => {
    return {
      template: `
                <app-trisection
                [trisectionSlides]="slidesData"
                >
                </app-trisection>
            `,
      props: {
        slidesData: object('slidesData', [
          {
            type: 'grid_of_three',
            attributes: {
              position: 0,
              link: {
                target: '_self',
                href: 'https://demo-shop.com/category-name',
                resourceType: 'bundle|category|product|story',
                resourceId: 234234,
              },
            },
            elementGroups: [
              {
                type: 'group_trisection_textbox',
                attributes: {
                  position: 0,
                  bgColor: '#f59b7d',
                  textboxAlign: 'left',
                },
                elements: [
                  {
                    type: 'element_subline',
                    attributes: {
                      showFirst: true,
                      text: 'INTRIOR DESIGN INFLUENCER',
                      size: 'small',
                      color: '#000000',
                    },
                  },
                  {
                    type: 'element_headline',
                    attributes: {
                      text: 'Decorate Wild!',
                      size: 'large',
                      color: '#000000',
                    },
                  },
                ],
              },
              {
                type: 'group_trisection_image',
                attributes: {
                  position: 1,
                  bgColor: '#f5f6f7',
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
              {
                type: 'group_trisection_textbox',
                attributes: {
                  position: 0,
                  bgColor: '#f59b7d',
                  textboxAlign: 'center',
                },
                elements: [
                  {
                    type: 'element_text',
                    attributes: {
                      text:
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
                      style: 'secondary-holo-dark',
                      link: {
                        target: '_self',
                        href: 'https://demo-shop.com/category-name',
                        resourceType: 'bundle|category|product|story',
                        resourceId: 234234,
                      },
                    },
                  },
                ],
              },
            ],
          },
          {
            type: 'grid_of_three',
            attributes: {
              position: 0,
              link: {
                target: '_self',
                href: 'https://demo-shop.com/category-name',
                resourceType: 'bundle|category|product|story',
                resourceId: 234234,
              },
            },
            elementGroups: [
              {
                type: 'group_trisection_textbox',
                attributes: {
                  position: 0,
                  bgColor: '#f59b7d',
                  textboxAlign: 'center',
                },
                elements: [
                  {
                    type: 'element_subline',
                    attributes: {
                      showFirst: true,
                      text: 'Justina Blakeney',
                      size: 'small',
                      color: '#000000',
                    },
                  },
                  {
                    type: 'element_headline',
                    attributes: {
                      showFirst: true,
                      text: 'Decorate Wild!',
                      size: 'medium',
                      color: '#000000',
                    },
                  },
                  {
                    type: 'element_text',
                    attributes: {
                      text:
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
                      style: 'secondary-holo-dark',
                      link: {
                        target: '_self',
                        href: 'https://demo-shop.com/category-name',
                        resourceType: 'bundle|category|product|story',
                        resourceId: 234234,
                      },
                    },
                  },
                ],
              },
              {
                type: 'group_trisection_image',
                attributes: {
                  position: 1,
                  bgColor: '#f5f6f7',
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
              {
                type: 'group_trisection_image',
                attributes: {
                  position: 1,
                  bgColor: '#f5f6f7',
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
          {
            type: 'grid_of_three',
            attributes: {
              position: 0,
              link: {
                target: '_self',
                href: 'https://demo-shop.com/category-name',
                resourceType: 'bundle|category|product|story',
                resourceId: 234234,
              },
            },
            elementGroups: [
              {
                type: 'group_trisection_textbox',
                attributes: {
                  position: 0,
                  bgColor: '#f59b7d',
                  textboxAlign: 'left',
                },
                elements: [
                  {
                    type: 'element_headline',
                    attributes: {
                      showFirst: true,
                      text: 'Decorate Wild!',
                      size: 'medium',
                      color: '#000000',
                    },
                  },
                  {
                    type: 'element_text',
                    attributes: {
                      text:
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
                      style: 'secondary-holo-dark',
                      link: {
                        target: '_self',
                        href: 'https://demo-shop.com/category-name',
                        resourceType: 'bundle|category|product|story',
                        resourceId: 234234,
                      },
                    },
                  },
                ],
              },
              {
                type: 'group_trisection_image',
                attributes: {
                  position: 1,
                  bgColor: '#f5f6f7',
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
              {
                type: 'group_trisection_image',
                attributes: {
                  position: 1,
                  bgColor: '#f5f6f7',
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
        ]),
        imageUrl:
          'https://depot.dam.staging.aboutyou.cloud/images//56b94441b1ee73e1abe0bd3145ae622a?quality=90&progressive=1&bg=f2f2f2&width=600&height=600&brightness=0.95',
      },
      ...includeModuleMetadata([], [GlobalModule]),
    };
  });
