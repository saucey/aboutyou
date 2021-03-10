import { convertFilters, convertToFilterQuery } from './filters';
import { AttributeKey } from '@aboutyou/backbone/types/AttributeOrAttributeValueFilter';
import { FILTERS_RESPONSE } from 'src/tests/fixtures/filters';

describe('convertFilters', () => {
  it('should allow only `attribute` and `range` type filters', () => {
    expect(convertFilters(FILTERS_RESPONSE).filter(({ type }) => !['attributes', 'range'].includes(type))).toEqual([]);
  });
});

describe('convertToFilterQuery', () => {
  it('should convert selected filters to filter query', () => {
    expect(convertToFilterQuery([{ key: 'color', values: [1, 2, 3] }])).toEqual([
      { type: 'attributes' as 'attributes', key: (704 as any) as AttributeKey, values: [1, 2, 3] },
    ]);
  });
});
