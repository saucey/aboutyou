import { environments } from '../app/configs/shop/environments';

export const environment = {
  productionModeEnabled: false,
  environmentName: 'development',
  bapiConnectionUrl: environments.bapiConnectionUrl.dev,
  imageCdn: environments.imageCdn.dev,
  shopHostUrl: environments.shopHosts.dev,
  checkoutHostUrl: environments.checkoutHosts.dev,
  clickAndReserveHostUrl: environments.clickAndReserveHosts && environments.clickAndReserveHosts.dev,
  clickAndReserveHostUrlStaging: environments.clickAndReserveHosts && environments.clickAndReserveHosts.dev,
};
