import { Params } from '@angular/router';
import { parse, parseUrl, stringify } from 'query-string';
import { filter, fromPairs, isEmpty, isNil, map, pipe, toPairs, last } from 'ramda';

export const getUrlPathname = (url: string) => parseUrl(url).url;
export const getUrlQueryParams = (url: string) => parseUrl(url).query;
export const stripOutLocaleFromPathname = (url: string) =>
  url
    .split('/')
    .filter(({ length }) => length !== 2)
    .join('/');

export const getUrlStructure = (
  url: string,
): {
  topLevelDomain?: string;
  subDomain?: string;
  path?: string;
} => {
  let topLevelDomain;
  let subDomain;
  let path;
  const cleaned = url.replace('https://', '').replace('http://', '');
  const urlPathName = getUrlPathname(cleaned);
  const [baseUrl, ...pathNames] = urlPathName.split('/');
  const parts = baseUrl.split('.');
  if (parts.length >= 3) {
    subDomain = parts[0];
    topLevelDomain = last(parts).split(':')[0];
  } else if (parts.length === 1 || parts.length === 2) {
    topLevelDomain = last(parts).split(':')[0];
  }
  path = pathNames.length ? `/${pathNames.join('/')}` : '/';
  return {
    topLevelDomain,
    subDomain,
    path,
  };
};

export const convertUrlParamsToPairs = (urlParams = {}) =>
  pipe(
    toPairs,
    map(([key, value]) => {
      return isNil(value) || isEmpty(value) ? null : { key, values: Array.isArray(value) ? value : [value] };
    }),
    filter(Boolean),
  )(urlParams);

export const retrieveFiltersFromUrl = (filtersInUrl: Params) => {
  const parsed = parse(stringify(filtersInUrl, { encode: false }), { arrayFormat: 'comma' });
  return convertParseUrlParamsToFilters(parsed);
};

export const convertParseUrlParamsToFilters = pipe(
  toPairs,
  map(([key, value]) => [
    key,
    Array.isArray(value)
      ? value.map(val => (isNaN(val) ? val : parseInt(val, 10)))
      : [isNaN(value as any) ? value : parseInt(value.toString(), 10)],
  ]),
  fromPairs,
);
