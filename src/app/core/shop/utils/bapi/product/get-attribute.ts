import { getFirstAttributeValue } from '@aboutyou/backbone/helpers/bapiProduct';
import { AttributeGroupMulti, AttributeGroupSingle, BapiProduct } from '@aboutyou/backbone/types/BapiProduct';
import path from 'ramda/es/path';
import { Dictionary } from 'ramda';

/**
 * This function is used to get the first label/value from a Single/Multi attribute
 */
export function getAttributeValue(
  attributes: Dictionary<AttributeGroupSingle | AttributeGroupMulti>,
  attributeName: string,
): CouldBeNull<string> {
  const value = getFirstAttributeValue(attributes, attributeName);

  if (!value) {
    return null;
  }

  // Fallback to value if no label is present
  return value.label || value.value;
}

/**
 * This function is used to a get Single or Multi attribute group by its name
 */
export const getAttributeByKey = (
  productAttributes: Dictionary<AttributeGroupSingle | AttributeGroupMulti>,
  key: string,
): AttributeGroupMulti | AttributeGroupSingle => productAttributes[key];

/**
 * This function is used to a get Multi attribute group by its name
 */
export const getAttributeGroupMultiByKey = (
  productAttributes: Dictionary<AttributeGroupSingle | AttributeGroupMulti>,
  key: string,
): AttributeGroupMulti => getAttributeByKey(productAttributes, key) as AttributeGroupMulti;

/**
 * This function is used to a get Single attribute group by its name
 */
export const getAttributeGroupSingleByKey = (
  productAttributes: Dictionary<AttributeGroupSingle | AttributeGroupMulti>,
  key: string,
): AttributeGroupSingle => getAttributeByKey(productAttributes, key) as AttributeGroupSingle;

/**
 * This function is used to get the fieldSet from an advancedAttribute
 */
export const getAdvancedAttributeFieldsetValuesByKey = (
  key: string,
  product: BapiProduct,
): Array<Array<{
  [key: string]: string | number | null | undefined;
}>> => {
  return path(['advancedAttributes', key, 'values', 0, 'fieldSet'], product);
};

/**
 * This function is used to get value of an Advanced Attribute
 */
export const getAdvancedAttributeValueByKey = (
  key: string,
  product: BapiProduct,
): string | number | null | undefined => {
  return path(['advancedAttributes', key, 'values', 0, 'fieldSet', 0, 0, 'value'], product);
};
