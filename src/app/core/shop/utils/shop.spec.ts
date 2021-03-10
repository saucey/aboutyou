import { determineShop } from './shop';
import { LOCALE } from 'src/tests/fixtures/locale';

describe('determineShopFromUrl', () => {
  it('should determine Shop Group From Url', () => {
    expect(determineShop(LOCALE, 'http://something.com', 'en')).toEqual({
      allShops: LOCALE.shopGroups[0].shops,
      shop: LOCALE.shopGroups[0].shops[0],
      locales: ['de', 'at'],
      alwaysAddLocaleToUrl: true,
    });
    expect(determineShop(LOCALE, 'http://localhost/ch', 'en')).toEqual({
      allShops: LOCALE.shopGroups[1].shops,
      shop: LOCALE.shopGroups[1].shops[0],
      locales: ['ch', 'fr'],
      alwaysAddLocaleToUrl: true,
    });
    expect(determineShop(LOCALE, 'http://localhost/at', 'en')).toEqual({
      allShops: LOCALE.shopGroups[0].shops,
      shop: LOCALE.shopGroups[0].shops[1],
      locales: ['de', 'at'],
      alwaysAddLocaleToUrl: true,
    });
    expect(determineShop(LOCALE, 'http://localhost/fr', 'en').shop.shopId).toEqual(3032);
    expect(determineShop(LOCALE, 'http://www.storefront.com', 'en').shop.shopId).toEqual(1);
    expect(determineShop(LOCALE, 'http://www.storefront.de', 'en').shop.shopId).toEqual(1);
    expect(determineShop(LOCALE, 'http://www.storefront.at', 'en').shop.shopId).toEqual(3);
    expect(determineShop(LOCALE, 'http://www.storefront.at/', 'en').shop.shopId).toEqual(3);
    expect(determineShop(LOCALE, 'http://www.storefront.at/at/store', 'en').shop.shopId).toEqual(3);
    expect(determineShop(LOCALE, 'http://www.storefront.at/de', 'en').shop.shopId).toEqual(1);
    expect(determineShop(LOCALE, 'http://www.storefront.at/de/store', 'en').shop.shopId).toEqual(1);
    expect(determineShop(LOCALE, 'http://www.storefront.at/store', 'en').shop.shopId).toEqual(3);
    expect(determineShop(LOCALE, 'http://www.storefront.ch/de', 'en').shop.shopId).toEqual(3031);
    expect(determineShop(LOCALE, 'http://www.storefront.ch/ch', 'en').shop.shopId).toEqual(3031);
    expect(determineShop(LOCALE, 'http://www.storefront.ch/fr', 'en').shop.shopId).toEqual(3032);
    expect(determineShop(LOCALE, 'http://www.storefront.ch/at/de', 'en').shop.shopId).toEqual(3031);
  });

  it('should determine Shop Group From CachedLanguage or BrowserLanguage', () => {
    expect(determineShop(LOCALE, 'http://123.23.45.678', 'en').shop.shopId).toEqual(1);
    expect(determineShop(LOCALE, 'http://localhost', 'en').shop.shopId).toEqual(1);
    expect(determineShop(LOCALE, 'http://localhost', 'en', 'at').shop.shopId).toEqual(3);
    expect(determineShop(LOCALE, 'http://localhost', 'fr-CH').shop.shopId).toEqual(3032);
    expect(determineShop(LOCALE, 'http://www.storefront.com', 'en', 'ch').shop.shopId).toEqual(3031);
    expect(determineShop(LOCALE, 'http://www.storefront.de', 'de-AT').shop.shopId).toEqual(3);
    expect(determineShop(LOCALE, 'http://www.storefront.at', 'en').shop.shopId).toEqual(3);
    expect(determineShop(LOCALE, 'http://www.storefront.at', 'de').shop.shopId).toEqual(1);
    expect(determineShop(LOCALE, 'http://www.storefront.at', 'de').shop.shopId).toEqual(1);
    expect(determineShop(LOCALE, 'http://www.storefront.at/at/store', 'de', 'de').shop.shopId).toEqual(3);
    expect(determineShop(LOCALE, 'http://www.storefront.at/de', 'en').shop.shopId).toEqual(1);
    expect(determineShop(LOCALE, 'http://www.storefront.at/de/store', 'en', 'at').shop.shopId).toEqual(1);
    expect(determineShop(LOCALE, 'http://www.storefront.at/store', 'en', 'de').shop.shopId).toEqual(1);
    expect(determineShop(LOCALE, 'http://www.storefront.ch/de', 'en', 'fr').shop.shopId).toEqual(3031);
  });
  it('should determine Shop Group From domain', () => {
    expect(determineShop(LOCALE, 'http://de.depot.com', 'en').shop.shopId).toEqual(1);
    expect(determineShop(LOCALE, 'http://at.depot.com', 'en').shop.shopId).toEqual(3);
    expect(determineShop(LOCALE, 'http://at.depot.cloud', 'en').shop.shopId).toEqual(1);
    expect(determineShop(LOCALE, 'http://ch.depot.com', 'en').shop.shopId).toEqual(3031);
    expect(determineShop(LOCALE, 'http://fr.depot.com', 'en').shop.shopId).toEqual(3032);
  });
});
