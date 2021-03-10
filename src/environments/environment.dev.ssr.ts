import { environments } from '../app/configs/shop/environments';

export const environment = {
  productionModeEnabled: false,
  environmentName: 'development',
  bapiConnectionUrl: environments.bapiConnectionUrl.devSSR,
  imageCdn: environments.imageCdn.devSSR,
  shopHostUrl: environments.shopHosts.devSSR,
  checkoutHostUrl: environments.checkoutHosts.devSSR,
  clickAndReserveHostUrl: environments.clickAndReserveHosts && environments.clickAndReserveHosts.devSSR,
};
