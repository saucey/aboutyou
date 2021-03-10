import { AttributeGroupMulti, Value } from '@aboutyou/backbone/types/BapiProduct';
import { indexOf, clone } from 'ramda';

const prioritizedPromotionsMap = ['plus_produkt', 'sale', 'neu', 'set', 'online_produkt', 'tv_spot', 'unikat'] as const;

export type PromotionType = typeof prioritizedPromotionsMap[number];
export type PromotionValues = Value & { value: PromotionType }[];
export type PromotionAttributeGroup = AttributeGroupMulti & { values: PromotionValues };

export const mostImportantPromotionTag = (promotionAttribute: PromotionAttributeGroup): Value =>
  promotionAttribute.values.reduce((prev, current) => {
    if (indexOf(prev.value, prioritizedPromotionsMap) < indexOf(current.value, prioritizedPromotionsMap)) {
      return prev;
    }
    return current;
  });

export const sortByPromotionTagsByPriority = (values: PromotionValues): PromotionValues => {
  const resValues = clone(values);

  resValues.sort((a, b) =>
    indexOf(a.value, prioritizedPromotionsMap) > indexOf(b.value, prioritizedPromotionsMap) ? 1 : -1,
  );
  return resValues;
};
