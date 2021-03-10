import { IPLPConfig } from 'src/app/core/shop/types';
import { filter } from './filter';
import { sort } from './sorting';

export const plp: IPLPConfig = {
  productsPerPage: 24,
  filter,
  sort,
};
