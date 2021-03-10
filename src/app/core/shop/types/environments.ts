export interface IShopIdHosts {
  shopId: number;
  host: string;
}

export interface IShopIdHostsPerDevice {
  shopId: number;
  hosts: {
    mobile: string;
    desktop: string;
  };
}

/**
 * Use string if you don't have hosts per shopIds
 */
export interface IEnvironmentsConfig {
  bapiConnectionUrl: {
    staging: string;
    integration: string;
    production: string;
    dev: string;
    devSSR: string;
  };
  imageCdn: {
    staging: string;
    integration: string;
    production: string;
    dev: string;
    devSSR: string;
  };
  shopHosts?: {
    staging: string | IShopIdHosts[];
    integration: string | IShopIdHosts[];
    production: string | IShopIdHosts[];
    dev: string | IShopIdHosts[];
    devSSR: string | IShopIdHosts[];
  };
  checkoutHosts: {
    staging: string | IShopIdHostsPerDevice[];
    integration: string | IShopIdHostsPerDevice[];
    production: string | IShopIdHostsPerDevice[];
    dev: string | IShopIdHostsPerDevice[];
    devSSR: string | IShopIdHostsPerDevice[];
  };
  clickAndReserveHosts?: {
    staging: string | IShopIdHostsPerDevice[];
    integration: string | IShopIdHostsPerDevice[];
    production: string | IShopIdHostsPerDevice[];
    dev: string | IShopIdHostsPerDevice[];
    devSSR: string | IShopIdHostsPerDevice[];
  };
}
