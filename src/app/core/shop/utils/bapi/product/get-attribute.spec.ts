import {
  getAttributeValue,
  getAttributeByKey,
  getAttributeGroupMultiByKey,
  getAdvancedAttributeFieldsetValuesByKey,
  getAdvancedAttributeValueByKey,
} from './get-attribute';
import { SAMPLE_PRODUCT } from 'src/tests/fixtures/products/sample';

describe('getAttributeValue', () => {
  it('should get attribute value', () => {
    expect(getAttributeValue(SAMPLE_PRODUCT.attributes, 'farbe')).toEqual('schwarz');
    expect(getAttributeValue(SAMPLE_PRODUCT.attributes, 'farbefarbefarbefarbe')).toEqual(null);
  });
});

describe('getAttributeByKey', () => {
  it('should get attribute by key', () => {
    expect(getAttributeByKey(SAMPLE_PRODUCT.attributes, 'farbe')).toEqual(SAMPLE_PRODUCT.attributes.farbe);
    expect(getAttributeByKey(SAMPLE_PRODUCT.attributes, 'farbefarbefarbe')).toEqual(undefined);
  });
});

describe('getAttributeGroupMultiByKey', () => {
  it('should get attribute group multi by key', () => {
    expect(getAttributeGroupMultiByKey(SAMPLE_PRODUCT.attributes, 'einzelhandelhinweis')).toEqual(
      SAMPLE_PRODUCT.attributes.einzelhandelhinweis,
    );
  });
});

describe('getAttributeGroupSingleByKey', () => {
  it('should get attribute group single by key', () => {
    expect(getAttributeGroupMultiByKey(SAMPLE_PRODUCT.attributes, 'farbe')).toEqual(SAMPLE_PRODUCT.attributes.farbe);
  });
});

describe('getAdvancedAttributeFieldsetValuesByKey', () => {
  it('should get advanced attribute fieldset values by key ', () => {
    expect(getAdvancedAttributeFieldsetValuesByKey('masterName', SAMPLE_PRODUCT)).toEqual([
      [
        {
          value: 'Stuhl',
        },
      ],
    ]);
  });
});

describe('getAdvancedAttributeValueByKey', () => {
  it('should get advanced attribute value by key', () => {
    expect(getAdvancedAttributeValueByKey('masterName', SAMPLE_PRODUCT)).toEqual('Stuhl');
  });
});
