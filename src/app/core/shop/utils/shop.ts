import { flatten } from 'ramda';
import { getUrlStructure } from './url';
import { ILocaleConfig, IShop, IShopGroup } from '../types';

export interface IFoundShop {
  shop: IShop;
  allShops: IShop[];
  locales: string[];
  alwaysAddLocaleToUrl: boolean;
}

const findShopGroupForThisShopId = (
  config: ILocaleConfig,
  shopId: number,
  tld: string,
  subDomain?: string,
): IShopGroup | undefined =>
  config.shopGroups.find(shopGroup =>
    shopGroup.shops.find(shop => {
      const shopMatch = shop.shopId === shopId;
      if (shopMatch && subDomain) {
        return shop.urlStructures.some(
          ({ topLevelDomain, subDomain: sd }) => subDomain === sd && topLevelDomain === tld,
        );
      }
      return shop.shopId === shopId && shop.urlStructures.some(({ topLevelDomain }) => topLevelDomain === tld);
    }),
  );

const localesOnThisShopGroup = (shops: IShop[], tld: string, subDomain?: string): string[] => {
  return shops.reduce((acc, shop) => {
    const paths = shop.urlStructures
      .filter(str =>
        subDomain ? str.subDomain === subDomain && str.topLevelDomain === tld : str.topLevelDomain === tld,
      )
      .map(str => str.path.split('/').filter(Boolean));

    return flatten([...acc, ...paths]);
  }, []);
};

const findDefaultShopIdOnThisTLD = (shops: IShop[], tld: string): number | undefined => {
  const shop = shops.find(({ urlStructures }) =>
    urlStructures.find(({ topLevelDomain, path }) => topLevelDomain === tld && path === '/'),
  );
  return shop ? shop.shopId : undefined;
};

// tslint:disable-next-line: cyclomatic-complexity
export const determineShop = (
  config: ILocaleConfig,
  url: string,
  browserLang: string,
  cachedLang?: string,
): IFoundShop => {
  const { topLevelDomain, subDomain, path } = getUrlStructure(url);
  const [languageInPath] = path.split('/').filter(Boolean);
  const pathname =
    languageInPath && languageInPath.length === 2 ? `/${languageInPath}` : cachedLang ? `/${cachedLang}` : null;

  const ALL_SHOPS: IShop[] = config.shopGroups.reduce((accumulator, current) => [...accumulator, ...current.shops], []);
  const findShop = (shopId: number, checkWithTLD: boolean = true) =>
    ALL_SHOPS.find(shop => {
      const shopMatch = shop.shopId === shopId;
      if (shopMatch && checkWithTLD) {
        return shop.urlStructures
          .map(({ topLevelDomain: tld }) => tld)
          .filter(Boolean)
          .includes(topLevelDomain);
      }
      return shopMatch;
    });

  const allShopsInThisSubDomain = ALL_SHOPS.filter(shop =>
    shop.urlStructures.find(
      structure => structure.subDomain === subDomain && structure.topLevelDomain === topLevelDomain,
    ),
  );

  if (allShopsInThisSubDomain.length === 1) {
    const shopId = allShopsInThisSubDomain[0].shopId;
    const shopGroup = findShopGroupForThisShopId(config, shopId, topLevelDomain, subDomain);
    const allShops = shopGroup ? shopGroup.shops : [];
    return {
      shop: findShop(shopId),
      allShops,
      locales: localesOnThisShopGroup(allShops, topLevelDomain, subDomain),
      alwaysAddLocaleToUrl: shopGroup ? shopGroup.alwaysAddLocaleToUrl : true,
    };
  }

  const allShopsInThisTLD = ALL_SHOPS.filter(shop =>
    shop.urlStructures.find(structure => structure.topLevelDomain === topLevelDomain),
  );

  if (allShopsInThisTLD.length === 1) {
    const shopId = allShopsInThisTLD[0].shopId;
    const shopGroup = findShopGroupForThisShopId(config, shopId, topLevelDomain);
    const allShops = shopGroup ? shopGroup.shops : [];
    return {
      shop: findShop(shopId),
      allShops,
      locales: localesOnThisShopGroup(allShops, topLevelDomain),
      alwaysAddLocaleToUrl: shopGroup ? shopGroup.alwaysAddLocaleToUrl : true,
    };
  }

  if (pathname) {
    const allShopsInThisTLDWithThisPath = allShopsInThisTLD.filter(shop =>
      shop.urlStructures.find(structure => pathname === structure.path),
    );

    if (allShopsInThisTLDWithThisPath.length === 1) {
      const shopId = allShopsInThisTLDWithThisPath[0].shopId;
      const shopGroup = findShopGroupForThisShopId(config, shopId, topLevelDomain);
      const allShops = shopGroup ? shopGroup.shops : [];
      return {
        shop: findShop(shopId),
        allShops,
        locales: localesOnThisShopGroup(allShops, topLevelDomain),
        alwaysAddLocaleToUrl: shopGroup ? shopGroup.alwaysAddLocaleToUrl : true,
      };
    }
  } else if (browserLang) {
    const allShopsInThisTLDWithThisBrowserLanguage = allShopsInThisTLD.filter(shop =>
      shop.browserLanguages.includes(browserLang),
    );

    if (allShopsInThisTLDWithThisBrowserLanguage.length === 1) {
      const shopId = allShopsInThisTLDWithThisBrowserLanguage[0].shopId;
      const shopGroup = findShopGroupForThisShopId(config, shopId, topLevelDomain);
      const allShops = shopGroup ? shopGroup.shops : [];
      return {
        shop: findShop(shopId),
        allShops,
        locales: localesOnThisShopGroup(allShops, topLevelDomain),
        alwaysAddLocaleToUrl: shopGroup ? shopGroup.alwaysAddLocaleToUrl : true,
      };
    }
  }

  const defaultShopId = findDefaultShopIdOnThisTLD(ALL_SHOPS, topLevelDomain) || config.defaultShopId;
  const defaultShop = findShop(defaultShopId, false);
  const shopGroupInTheConfig = findShopGroupForThisShopId(config, defaultShopId, topLevelDomain);
  const allShopsInDefaultShopGroup = shopGroupInTheConfig ? shopGroupInTheConfig.shops : [];
  return {
    shop: defaultShop,
    allShops: allShopsInDefaultShopGroup,
    locales: localesOnThisShopGroup(allShopsInDefaultShopGroup, topLevelDomain),
    alwaysAddLocaleToUrl: shopGroupInTheConfig ? shopGroupInTheConfig.alwaysAddLocaleToUrl : true,
  };
};
