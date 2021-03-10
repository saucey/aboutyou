import { BasketItem, BasketPackageInformation } from '@aboutyou/backbone/endpoints/basket/getBasket';
import { BapiPrice } from '@aboutyou/backbone/types/BapiProduct';
import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { ProductMap } from 'src/app/mappers/product';
import { AppState } from '../../shop/store';
import { IBasketListItem, ICurrency } from '../../shop/types';
import { BasketState } from './basket.reducers';
import { BasketItemsGroupedByPackage } from './basket-items-grouped-by-package';

export function hasBasket(basketState: BasketState): boolean {
  return !!(basketState && basketState.data && basketState.data.basket);
}

export function hasItems(basketState: BasketState): boolean {
  return !!(hasBasket(basketState) && basketState.data.basket.items && basketState.data.basket.items.length > 0);
}

export const selectBasketItemsForBasketState: (state: BasketState) => BasketItem[] = state => {
  if (hasItems(state)) {
    return state.data.basket.items;
  }
  return [];
};

export const selectBasketFeature = createFeatureSelector<AppState, BasketState>('basket');

export const selectBasketItems: MemoizedSelector<AppState, BasketItem[]> = createSelector(
  selectBasketFeature,
  selectBasketItemsForBasketState,
);

export const selectMappedBasketItems = (currency: ICurrency, translateService: TranslateService) =>
  createSelector(selectBasketItems, items => {
    return mapBasketItems(currency, translateService)(items);
  });

export const selectBasketItemsGroupedByPackage: (
  currency: ICurrency,
  translateService: TranslateService,
) => MemoizedSelector<AppState, BasketItemsGroupedByPackage> = (
  currency: ICurrency,
  translateService: TranslateService,
) => {
  const mapper = mapBasketItems(currency, translateService);
  return createSelector(selectBasketFeature, basketState => {
    const groupedItemsMap: Map<number, IBasketListItem[]> = new Map();
    const packageMap: Map<number, BasketPackageInformation> = new Map();
    let notDeliverableItems = [];

    if (!hasItems(basketState)) {
      return { packageMap, groupedItemsMap, notDeliverableItems };
    }

    const packages = basketState.data.basket.packages;
    const mappedItems: IBasketListItem[] = mapper(basketState.data.basket.items);

    packages.forEach(pack => {
      packageMap.set(pack.id, pack);
      groupedItemsMap.set(pack.id, []);
    });

    const isDeliverable = item => ['deliverable', 'available'].includes(item.status) && item.packageId != null;

    const itemsWithPackageId = mappedItems.filter(isDeliverable);

    itemsWithPackageId.forEach(item => {
      groupedItemsMap.get(item.packageId).push(item);
    });

    notDeliverableItems = mappedItems.filter(item => !isDeliverable(item));

    return { packageMap, groupedItemsMap, notDeliverableItems };
  });
};

export const mapBasketItems = (
  currency: ICurrency,
  translateService: TranslateService,
): ((basketItems: BasketItem[]) => IBasketListItem[]) => (basketItems: BasketItem[]) =>
  basketItems.map(item => ({
    ...item,
    mappedProduct: new ProductMap(item.product, currency, null, translateService),
  }));

export const selectBasketCost: MemoizedSelector<AppState, BapiPrice> = createSelector(
  selectBasketFeature,
  basketState => {
    if (hasBasket(basketState)) {
      return basketState.data.basket.cost;
    }
    return null;
  },
);

export const selectBasketItemsCount: MemoizedSelector<AppState, number> = createSelector(selectBasketItems, items =>
  items.reduce((previousCount, item) => previousCount + item.quantity, 0),
);

export const isItemInBasket = (id: number) =>
  createSelector(selectBasketItems, items => items.some(item => item.product.id === id));

export const selectBasketIsLoading: MemoizedSelector<AppState, boolean> = createSelector(
  selectBasketFeature,
  basketState => basketState.isLoading,
);

export const selectBasketIsChangingQuantity: MemoizedSelector<AppState, boolean> = createSelector(
  selectBasketFeature,
  basketState => basketState.isChangingQuantity,
);

export const selectBasketError: MemoizedSelector<AppState, any | 'failure'> = createSelector(
  selectBasketFeature,
  basketState => {
    if (basketState.error) {
      return basketState.error;
    }
    if (basketState.data && basketState.data.type !== 'success') {
      return basketState.data.type;
    }
  },
);
