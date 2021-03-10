import { FilterTypes } from '@aboutyou/backbone/endpoints/filters/filters';

export interface SelectedFilter {
  key: string;
  values: number[];
}

export interface Filter {
  id: number;
  name: string;
  slug: string;
  type: FilterTypes;
  values: (FilterValue | RangeFilterValue)[];
}

export interface FilterValue {
  id: number;
  name: string;
  productCount: number;
}

export interface RangeFilterValue {
  min: number;
  max: number;
  productCount: number;
}

export interface ILoadableData<TData> {
  loading: boolean;
  loadingMore?: boolean;
  data?: TData;
}

export interface IDisplayTiles {
  tiles: {
    type: string;
    item: {
      type: string;
      elementGroups?: any[];
      elements?: any[];
    };
  }[];
  productsToDisplay: number;
}
