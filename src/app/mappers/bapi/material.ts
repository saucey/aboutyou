import { BapiProduct } from '@aboutyou/backbone';
import { getAdvancedAttributeValueByKey } from 'src/app/core/shop/utils/bapi/product';
import { getAttributeValue } from 'src/app/core/shop/utils/bapi/product/get-attribute';
import range from 'ramda/es/range';
import { ADVANCED_ATTRIBUTE_KEY__MATERIAL_FIBER_SHARE, ATTRIBUTE_KEY__MATERIAL_FIBER } from './constants';

// Number of fiber fields specified in depot api
export const FIBER_FIELD_DECLARATION_COUNT = 5;

export const getMaterialCompositionStrings = (product: BapiProduct): string[] =>
  range(1, FIBER_FIELD_DECLARATION_COUNT + 1)
    // map through each fiber field configuration and determine if it can be displayed
    .map(i => {
      const fiber = getAttributeValue(product.attributes, ATTRIBUTE_KEY__MATERIAL_FIBER + ('0' + i).slice(-2));
      const fiberShare = getAdvancedAttributeValueByKey(
        ADVANCED_ATTRIBUTE_KEY__MATERIAL_FIBER_SHARE + ('0' + i).slice(-2),
        product,
      ) as string;

      return fiber && fiberShare && `${fiberShare}% ${fiber}`;
    })
    // Filter out undefined mappings
    .filter(Boolean);
