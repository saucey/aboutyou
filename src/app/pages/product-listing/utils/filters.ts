import {
  FilterItemWithValues,
  FilterTypes,
  BooleanFilterItemWithValues,
  AttributesFilterItemWithValues,
  RangeFilterItemWithValues,
  IdenfitierFilterItemWithValues,
} from '@aboutyou/backbone/endpoints/filters/filters';
import { AttributeWithValuesFilter } from '@aboutyou/backbone/types/AttributeOrAttributeValueFilter';
import {
  DisplayConfig,
  Filter,
  FilterValue,
  RangeFilterValue,
  SelectedFilter,
  DisplayConfigSortType,
} from 'src/app/core/shop/types';
import { CONFIG } from 'src/app/configs';
import find from 'ramda/es/find';
import last from 'ramda/es/last';
import pipe from 'ramda/es/pipe';
import prop from 'ramda/es/prop';
import toPairs from 'ramda/es/toPairs';

function prepareFilterValues(filter: FilterItemWithValues): (FilterValue | RangeFilterValue)[] {
  const { name, type, values } = filter;

  if (!Array.isArray(values) || !values.length) {
    // eslint-disable-next-line
    console.warn(`Filter "${name}" has no values to choose`);
    return [];
  }

  switch (type) {
    case FilterTypes.ATTRIBUTES:
      return sortFilterValues(values as FilterValue[], filter);
    case FilterTypes.RANGE:
      return values as RangeFilterValue[];
    default:
      return [];
  }
}

function sortFilterValues(values: FilterValue[], filter: FilterItemWithValues): FilterValue[] {
  if (isIdenfitierFilterItemWithValues(filter)) {
    return values;
  }

  const filterConfig = Object.values(CONFIG.plp.filter).find(configFilter => configFilter.id === filter.id);

  if (filterConfig && filterConfig.sort) {
    switch (filterConfig.sort) {
      case DisplayConfigSortType.NUMERIC_ASC:
        if (filter.type === FilterTypes.ATTRIBUTES) {
          values = values.sort((a, b) => {
            const numericA = Number(a.name.replace(/[^0-9]/g, ''));
            const numericB = Number(b.name.replace(/[^0-9]/g, ''));

            return numericA - numericB;
          });
        }
        break;
    }
  }

  return values;
}

function convertFilter(filter: FilterItemWithValues): CouldBeNull<Filter> {
  const values = prepareFilterValues(filter);

  if (!values.length) {
    return null;
  }

  return {
    id: filter['id'], // tslint:disable-line
    name: filter.name,
    slug: filter.slug,
    type: filter.type,
    values,
  };
}

export function convertFilters(filters: FilterItemWithValues[]): Filter[] {
  return filters.map(convertFilter).filter(Boolean) as Filter[];
}

export const convertToFilterQuery = (filters: SelectedFilter[] = []): AttributeWithValuesFilter[] => {
  return filters.map(filter => ({
    type: 'attributes',
    key: findFilterIdByKey(filter.key),
    values: filter.values,
  })) as AttributeWithValuesFilter[];
};

const findFilterIdByKey = (filterKey: string): number => {
  // @ts-ignore
  return pipe(
    toPairs,
    find(([key, value]) => (value as DisplayConfig).urlParam === filterKey),
    last,
    prop('id'),
  )(CONFIG.plp.filter);
};

function isIdenfitierFilterItemWithValues(filter: FilterItemWithValues): filter is IdenfitierFilterItemWithValues {
  return !(filter as BooleanFilterItemWithValues | AttributesFilterItemWithValues | RangeFilterItemWithValues).id;
}
