import { IConfig } from '../../app/core/shop/types';
import { basketConfig as basket } from '../configs/basket/basket.config';
import { common } from './common';
import { plp } from './plp';
import { shop } from './shop';

export const CONFIG: IConfig = {
  shop,
  common,
  plp,
  basket,
};
