import { IEnvironmentsConfig } from 'src/app/core/shop/types/environments';

export const environments: IEnvironmentsConfig = {
  bapiConnectionUrl: {
    integration: 'https://depot.backbone-api.staging.aboutyou.cloud/v1/',
    staging: 'https://depot.backbone-api.staging.aboutyou.cloud/v1/',
    production: 'https://depot.backbone-api.staging.aboutyou.cloud/v1/',
    dev: 'https://depot.backbone-api.staging.aboutyou.cloud/v1/',
    devSSR: 'https://depot.backbone-api.staging.aboutyou.cloud/v1/',
  },
  imageCdn: {
    integration: 'https://depot.dam.staging.aboutyou.cloud',
    staging: 'https://depot.dam.staging.aboutyou.cloud',
    production: 'https://depot.dam.aboutyou.cloud',
    dev: 'https://depot.dam.staging.aboutyou.cloud',
    devSSR: 'https://depot.dam.staging.aboutyou.cloud',
  },
  shopHosts: {
    integration: 'https://depot.storefront.integration.aboutyou.cloud',
    staging: 'https://depot.storefront.staging.aboutyou.cloud',
    production: 'https://depot.storefront.concept.aboutyou.cloud',
    dev: 'http://localhost:4200',
    devSSR: 'http://localhost',
  },
  checkoutHosts: {
    integration: [
      {
        shopId: 1,
        hosts: {
          mobile: 'https://depot-de-de-depot.checkout-m.staging.aboutyou.cloud',
          desktop: 'https://depot-de-de-depot.checkout.staging.aboutyou.cloud',
        },
      },
      {
        shopId: 3,
        hosts: {
          mobile: 'https://depot-at-de-depot.checkout-m.staging.aboutyou.cloud',
          desktop: 'https://depot-at-de-depot.checkout.staging.aboutyou.cloud',
        },
      },
      {
        shopId: 3031,
        hosts: {
          mobile: 'https://depot-ch-de-depot.checkout-m.staging.aboutyou.cloud',
          desktop: 'https://depot-ch-de-depot.checkout.staging.aboutyou.cloud',
        },
      },
      {
        shopId: 3032,
        hosts: {
          mobile: 'https://depot-ch-fr-depot.checkout-m.staging.aboutyou.cloud',
          desktop: 'https://depot-ch-fr-depot.checkout.staging.aboutyou.cloud',
        },
      },
    ],
    staging: [
      {
        shopId: 1,
        hosts: {
          mobile: 'https://depot-de-de-depot.checkout-m.staging.aboutyou.cloud',
          desktop: 'https://depot-de-de-depot.checkout.staging.aboutyou.cloud',
        },
      },
      {
        shopId: 3,
        hosts: {
          mobile: 'https://depot-at-de-depot.checkout-m.staging.aboutyou.cloud',
          desktop: 'https://depot-at-de-depot.checkout.staging.aboutyou.cloud',
        },
      },
      {
        shopId: 3031,
        hosts: {
          mobile: 'https://depot-ch-de-depot.checkout-m.staging.aboutyou.cloud',
          desktop: 'https://depot-ch-de-depot.checkout.staging.aboutyou.cloud',
        },
      },
      {
        shopId: 3032,
        hosts: {
          mobile: 'https://depot-ch-fr-depot.checkout-m.staging.aboutyou.cloud',
          desktop: 'https://depot-ch-fr-depot.checkout.staging.aboutyou.cloud',
        },
      },
    ],
    production: [
      {
        shopId: 1,
        hosts: {
          mobile: 'https://depot-de-de-depot.checkout-m.aboutyou.cloud',
          desktop: 'https://depot-de-de-depot.checkout.aboutyou.cloud',
        },
      },
      {
        shopId: 3,
        hosts: {
          mobile: 'https://depot-at-de-depot.checkout-m.aboutyou.cloud',
          desktop: 'https://depot-at-de-depot.checkout.aboutyou.cloud',
        },
      },
      {
        shopId: 3031,
        hosts: {
          mobile: 'https://depot-ch-de-depot.checkout-m.aboutyou.cloud',
          desktop: 'https://depot-ch-de-depot.checkout.aboutyou.cloud',
        },
      },
      {
        shopId: 3032,
        hosts: {
          mobile: 'https://depot-ch-fr-depot.checkout-m.aboutyou.cloud',
          desktop: 'https://depot-ch-fr-depot.checkout.aboutyou.cloud',
        },
      },
    ],
    dev: [
      {
        shopId: 1,
        hosts: {
          mobile: 'https://depot-de-de-depot.checkout-m.staging.aboutyou.cloud',
          desktop: 'https://depot-de-de-depot.checkout.staging.aboutyou.cloud',
        },
      },
      {
        shopId: 3,
        hosts: {
          mobile: 'https://depot-at-de-depot.checkout-m.staging.aboutyou.cloud',
          desktop: 'https://depot-at-de-depot.checkout.staging.aboutyou.cloud',
        },
      },
      {
        shopId: 3031,
        hosts: {
          mobile: 'https://depot-ch-de-depot.checkout-m.staging.aboutyou.cloud',
          desktop: 'https://depot-ch-de-depot.checkout.staging.aboutyou.cloud',
        },
      },
      {
        shopId: 3032,
        hosts: {
          mobile: 'https://depot-ch-fr-depot.checkout-m.staging.aboutyou.cloud',
          desktop: 'https://depot-ch-fr-depot.checkout.staging.aboutyou.cloud',
        },
      },
    ],
    devSSR: [
      {
        shopId: 1,
        hosts: {
          mobile: 'https://depot-de-de-depot.checkout-m.staging.aboutyou.cloud',
          desktop: 'https://depot-de-de-depot.checkout.staging.aboutyou.cloud',
        },
      },
      {
        shopId: 3,
        hosts: {
          mobile: 'https://depot-at-de-depot.checkout-m.staging.aboutyou.cloud',
          desktop: 'https://depot-at-de-depot.checkout.staging.aboutyou.cloud',
        },
      },
      {
        shopId: 3031,
        hosts: {
          mobile: 'https://depot-ch-de-depot.checkout-m.staging.aboutyou.cloud',
          desktop: 'https://depot-ch-de-depot.checkout.staging.aboutyou.cloud',
        },
      },
      {
        shopId: 3032,
        hosts: {
          mobile: 'https://depot-ch-fr-depot.checkout-m.staging.aboutyou.cloud',
          desktop: 'https://depot-ch-fr-depot.checkout.staging.aboutyou.cloud',
        },
      },
    ],
  },
  clickAndReserveHosts: {
    integration: 'https://i-demi-api.int.collins.kg',
    staging: 'https://s-demi-api.int.collins.kg',
    production: 'https://p-demi-api.int.collins.kg',
    dev: 'https://i-demi-api.int.collins.kg',
    devSSR: 'https://i-demi-api.int.collins.kg',
  },
};
