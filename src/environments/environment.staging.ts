import { environments } from '../app/configs/shop/environments';

export const environment = {
  productionModeEnabled: true,
  environmentName: 'staging',
  bapiConnectionUrl: environments.bapiConnectionUrl.staging,
  imageCdn: environments.imageCdn.staging,
  shopHostUrl: environments.shopHosts.staging,
  checkoutHostUrl: environments.checkoutHosts.staging,
  clickAndReserveHostUrl: environments.clickAndReserveHosts && environments.clickAndReserveHosts.staging,
};
