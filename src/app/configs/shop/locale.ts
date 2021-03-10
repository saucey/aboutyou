import { ILocaleConfig } from 'src/app/core/shop/types';

export const locale: ILocaleConfig = {
  defaultShopId: 1,
  shopGroups: [
    {
      alwaysAddLocaleToUrl: true,
      shops: [
        {
          shopId: 1,
          locale: 'de',
          currency: {
            code: 'EUR',
            locale: 'de-DE',
          },
          browserLanguages: ['de'],
          language: 'Deutschland',
          urlStructures: [
            {
              topLevelDomain: 'com',
              path: '/',
            },
            {
              topLevelDomain: 'com',
              path: '/de',
            },
            {
              topLevelDomain: 'cloud',
              path: '/',
            },
            {
              topLevelDomain: 'cloud',
              path: '/de',
            },
            {
              topLevelDomain: 'de',
              path: '/',
            },
            {
              topLevelDomain: 'de',
              path: '/de',
            },
            {
              topLevelDomain: 'at',
              path: '/de',
            },
            {
              topLevelDomain: 'localhost',
              path: '/',
            },
            {
              topLevelDomain: 'localhost',
              path: '/de',
            },
          ],
        },
        {
          shopId: 3,
          language: 'Österreich',
          locale: 'at',
          currency: {
            code: 'EUR',
            locale: 'de-AT',
          },
          browserLanguages: ['de-AT'],
          urlStructures: [
            {
              topLevelDomain: 'at',
              path: '/',
            },
            {
              topLevelDomain: 'com',
              path: '/at',
            },
            {
              topLevelDomain: 'cloud',
              path: '/at',
            },
            {
              topLevelDomain: 'at',
              path: '/at',
            },
            {
              topLevelDomain: 'de',
              path: '/at',
            },
            {
              topLevelDomain: 'localhost',
              path: '/at',
            },
          ],
        },
      ],
    },
    {
      alwaysAddLocaleToUrl: true,
      shops: [
        {
          shopId: 3031,
          language: 'Deutsch',
          locale: 'ch',
          currency: {
            code: 'CHF',
            locale: 'de-CH',
          },
          browserLanguages: ['de-CH'],
          urlStructures: [
            {
              topLevelDomain: 'com',
              path: '/ch',
            },
            {
              topLevelDomain: 'cloud',
              path: '/ch',
            },
            {
              topLevelDomain: 'localhost',
              path: '/ch',
            },
          ],
        },
        {
          shopId: 3032,
          language: 'Français',
          locale: 'fr',
          currency: {
            code: 'CHF',
            locale: 'fr-CH',
          },
          browserLanguages: ['fr-CH'],
          urlStructures: [
            {
              topLevelDomain: 'com',
              path: '/fr',
            },
            {
              topLevelDomain: 'cloud',
              path: '/fr',
            },
            {
              topLevelDomain: 'localhost',
              path: '/fr',
            },
          ],
        },
      ],
    },
    {
      alwaysAddLocaleToUrl: false,
      shops: [
        {
          shopId: 3031,
          language: 'Deutsch',
          locale: 'de',
          currency: {
            code: 'CHF',
            locale: 'de-CH',
          },
          browserLanguages: ['de-CH', 'de'],
          urlStructures: [
            {
              topLevelDomain: 'ch',
              path: '/',
            },
            {
              topLevelDomain: 'ch',
              path: '/de',
            },
          ],
        },
        {
          shopId: 3032,
          language: 'Français',
          locale: 'fr',
          currency: {
            code: 'CHF',
            locale: 'fr-CH',
          },
          browserLanguages: ['fr-CH', 'fr'],
          urlStructures: [
            {
              topLevelDomain: 'ch',
              path: '/fr',
            },
          ],
        },
      ],
    },
  ],
};
