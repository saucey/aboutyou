import { environments } from '../app/configs/shop/environments';

export const environment = {
  productionModeEnabled: true,
  environmentName: 'production',
  bapiConnectionUrl: environments.bapiConnectionUrl.production,
  imageCdn: environments.imageCdn.production,
  shopHostUrl: environments.shopHosts.production,
  checkoutHostUrl: environments.checkoutHosts.production,
  clickAndReserveHostUrl: environments.clickAndReserveHosts && environments.clickAndReserveHosts.production,
};
