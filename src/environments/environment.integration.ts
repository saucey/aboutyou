import { environments } from '../app/configs/shop/environments';

export const environment = {
  productionModeEnabled: true,
  environmentName: 'integration',
  bapiConnectionUrl: environments.bapiConnectionUrl.integration,
  imageCdn: environments.imageCdn.integration,
  shopHostUrl: environments.shopHosts.integration,
  checkoutHostUrl: environments.checkoutHosts.integration,
  clickAndReserveHostUrl: environments.clickAndReserveHosts && environments.clickAndReserveHosts.integration,
};
