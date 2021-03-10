import { IBasketConfig } from 'src/app/configs/basket/basket.config';

export interface IBapiConfig {
  basketKeyPrefix: string;
}

export interface ICheckoutConfig {
  ospRoute: string;
  logoutRedirectRoute: string;
}

export interface ICategoriesConfig {
  saleCategoryIds: number[];
}

export interface ICurrency {
  code: string;
  locale: string;

  /** The minimum amount of fraction digits. If unspecified it will use the default Intl.NumberFormat value. */
  minimumFractionDigits?: number;

  /** The maximum amount of fraction digits. If unspecified it will use the default Intl.NumberFormat value. */
  maximumFractionDigits?: number;

  /** If specified it will replace the group and decimal separators with the provided strings. */
  separators?: {
    group: string;
    decimal: string;
  };
}

export interface IShop {
  currency: ICurrency;
  language: string;
  locale: string;
  browserLanguages: string[];
  shopId: number;
  urlStructures: {
    subDomain?: string;
    topLevelDomain: string;
    path: string;
  }[];
}

export type ILanguage = IShop;

export interface IShopGroup {
  alwaysAddLocaleToUrl: boolean;
  shops: IShop[];
}

export interface ILocaleConfig {
  defaultShopId: number;
  shopGroups: IShopGroup[];
}

export interface IProductsQueryConfig {
  campaignKey?: 'px';
}

interface ISearchSuggestionsConfig {
  minSearchTermLength: number;
  productsToDisplay: number;
  categoriesToDisplay: number;
}

export interface ISearchConfig {
  suggestions: ISearchSuggestionsConfig;
}

export interface IShopConfig {
  bapi: IBapiConfig;
  checkout: ICheckoutConfig;
  categories: ICategoriesConfig;
  locale: ILocaleConfig;
  products: IProductsQueryConfig;
  search: ISearchConfig;
}

export enum DisplayConfigSortType {
  NUMERIC_ASC = 1,
}

export interface DisplayConfig {
  id?: number;
  order: number; // order of display in UI
  urlParam: string; // slug in URL
  sort?: DisplayConfigSortType; // sort type
}

export interface IFilterConfig {
  COLOR: DisplayConfig;
  MATERIAL: DisplayConfig;
  FLAGS: DisplayConfig;
  // => PRICE
  MIN_PRICE: DisplayConfig;
  MAX_PRICE: DisplayConfig;
  // => SORT
  SORTING: DisplayConfig;
}

export interface ISort {
  id: string;
  name: string;
}

export type ISortConfig = ISort[];

export interface IPLPConfig {
  productsPerPage: number;
  filter: IFilterConfig;
  sort: ISortConfig;
}

export interface IBreakpoints {
  /** Maximum width for mobile mode (exclusive). */
  readonly mobile: number;

  /** Maximum width for tablet mode (exclusive). undefined to disable tablet mode. */
  readonly tablet: number | undefined;
}

export interface ICommonConfig {
  breakpoints: IBreakpoints;
}

export interface IConfig {
  shop: IShopConfig;
  plp: IPLPConfig;
  basket: IBasketConfig;
  common: ICommonConfig;
}
