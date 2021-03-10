import { BapiProductCategory } from '@aboutyou/backbone/types/BapiProduct';
import { flatten } from 'ramda';

export const getSeasonTagsByCategories = (categories: BapiProductCategory[][]): string[] => {
  const seasonProperty = flatten(flatten(categories).map(category => category.categoryProperties)).find(
    prop => prop.name === 'Saison',
  );

  return seasonProperty ? seasonProperty.value.split(', ') : [];
};
