import { ProductImage } from '@aboutyou/backbone';
import { path } from 'ramda';
import { AttributeGroupSingle, AttributeGroupMulti } from '@aboutyou/backbone/types/BapiProduct';

export const getImageAttribute = (attributeKey: string, productImages: ProductImage[]) =>
  path<AttributeGroupSingle | AttributeGroupMulti>(
    ['attributes', attributeKey],
    productImages.find(image => image.attributes[attributeKey]),
  );
