import { BasketPackageInformation } from '@aboutyou/backbone/endpoints/basket/getBasket';
import { IBasketListItem } from '../../shop/types';

export interface BasketItemsGroupedByPackage {
  packageMap: Map<number, BasketPackageInformation>;
  groupedItemsMap: Map<number, IBasketListItem[]>;
  notDeliverableItems: IBasketListItem[];
}
