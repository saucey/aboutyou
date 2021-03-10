import {
  getUrlPathname,
  getUrlQueryParams,
  convertUrlParamsToPairs,
  retrieveFiltersFromUrl,
  getUrlStructure,
} from './url';

const URL = 'https://www.storefront.concept.aboutyou.cloud/storefront/all-for-test?color=9182,9180&material=1268';

describe('url', () => {
  describe('getUrlPathname', () => {
    it('should get url pathname', () => {
      expect(getUrlPathname(URL)).toEqual('https://www.storefront.concept.aboutyou.cloud/storefront/all-for-test');
    });
  });

  describe('getUrlQueryParams', () => {
    it('should get url query params', () => {
      expect(getUrlQueryParams(URL)).toEqual({ color: '9182,9180', material: '1268' });
    });
  });

  describe('convertUrlParamsToPairs', () => {
    it('should convert Url Params To Key Value Pairs', () => {
      expect(convertUrlParamsToPairs({ color: ['9182', '9180'], material: ['1268'] })).toEqual([
        {
          key: 'color',
          values: ['9182', '9180'],
        },
        {
          key: 'material',
          values: ['1268'],
        },
      ]);
    });
  });

  describe('retrieveFiltersFromUrl', () => {
    it('should retrieve filters from Url', () => {
      expect(retrieveFiltersFromUrl({ color: '9182,9180', material: '1268' }) as any).toEqual({
        color: [9182, 9180],
        material: [1268],
      });
    });
  });

  describe('getUrlStructure', () => {
    it('should retrieve url structure', () => {
      expect(getUrlStructure('https://www.storefront.concept.aboutyou.cloud/ch/de/storefront?color=9182')).toEqual({
        topLevelDomain: 'cloud',
        subDomain: 'www',
        path: '/ch/de/storefront',
      });
      expect(getUrlStructure('https://www.test.com')).toEqual({
        topLevelDomain: 'com',
        subDomain: 'www',
        path: '/',
      });
      expect(getUrlStructure('https://www.test.com/')).toEqual({
        topLevelDomain: 'com',
        subDomain: 'www',
        path: '/',
      });
      expect(getUrlStructure('https://test.de/')).toEqual({
        topLevelDomain: 'de',
        subDomain: undefined,
        path: '/',
      });
      expect(getUrlStructure('http://localhost.cloud')).toEqual({
        topLevelDomain: 'cloud',
        subDomain: undefined,
        path: '/',
      });
      expect(getUrlStructure('http://localhost:4200/')).toEqual({
        topLevelDomain: 'localhost',
        subDomain: undefined,
        path: '/',
      });
      expect(getUrlStructure('http://localhost:4200')).toEqual({
        topLevelDomain: 'localhost',
        subDomain: undefined,
        path: '/',
      });
    });
  });
});
