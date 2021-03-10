import { animate, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnDestroy, ViewChildren, QueryList } from '@angular/core';
import { Router } from '@angular/router';
import { LocalizeRouterService } from '@gilsdav/ngx-translate-router';
import {
  DisplayConfig,
  Filter,
  FilterValue,
  IFilterConfig,
  ILoadableData,
  ISortConfig,
  NavbarCategory,
} from 'src/app/core/shop/types';
import * as bodyScrollLock from 'body-scroll-lock';
import { stringify } from 'query-string';
import { Dictionary, equals, isEmpty, omit, reject } from 'ramda';
import { PriceRangeComponent } from '../price-range/price-range.component';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss'],
  animations: [
    trigger('filtersAnimation', [
      transition(':enter', [
        style({ opacity: 0, background: 'transparent', transform: 'translateX(100%)' }),
        animate('0.3s', style({ opacity: 1, transform: 'translateX(0)' })),
        animate('0.3s', style({ background: 'rgba(0, 0, 0, 0.29)' })),
      ]),
      transition(':leave', [
        animate('0.3s', style({ background: 'transparent' })),
        animate('0.3s', style({ transform: 'translateX(100%)' })),
      ]),
    ]),
  ],
})
export class FiltersComponent implements OnDestroy {
  @Input() isBrowser: boolean;
  @Input() isDesktop: boolean;
  @Input() products: {
    loading: boolean;
    pagination?: {
      total: number;
    };
  };
  @Input() filters: ILoadableData<Filter[]> = {
    loading: true,
  };
  @Input() availablePrice: {
    min: number;
    max: number;
  };
  @Input() currency: string;
  @Input() currentPath: string;
  @Input() activeCategory: NavbarCategory;
  @Input() FILTER_CONFIG: IFilterConfig;
  @Input() SORT_CONFIG: ISortConfig;
  @Input() selectedFilters: Dictionary<(number | string)[]>;

  filtersVisible: boolean;

  filtersExpandedState: {
    [key in number]: boolean;
  } = {};

  @ViewChildren(PriceRangeComponent)
  private priceRangeComponents: QueryList<PriceRangeComponent>;

  constructor(private router: Router, private localize: LocalizeRouterService) {}

  shouldShowFilters = (mobile: boolean): boolean => {
    return this.filters.loading ? false : mobile ? this.filtersVisible : true; // filters always visible on desktop
  };

  getSelectedValue = (filterConfig: DisplayConfig) => {
    const selectedIds = this.selectedFilters[filterConfig.urlParam] || [];
    const selectedFilter = this.filters.data.find(({ id }) => id === filterConfig.id);

    if (selectedFilter) {
      return selectedFilter.values.filter((val: FilterValue) => selectedIds.includes(val.id));
    }
    return [];
  };

  toggleFiltersVisibility = () => {
    if (this.filtersVisible) {
      this.filtersVisible = false;
      bodyScrollLock.enableBodyScroll(document.body);
    } else {
      this.filtersVisible = true;
      bodyScrollLock.disableBodyScroll(document.body);
    }
  };

  handleFilterChange = (filterName: string, closeFilter: boolean = false) => (v: FilterValue[]) => {
    this.selectedFilters = {
      ...this.selectedFilters,
      [filterName]: v.map(({ id }) => id),
    };
    if (closeFilter) {
      this.toggleFiltersVisibility();
    }
    this.handleFiltersCommit();
  };

  handleFiltersCommit = () => {
    const stringified = stringify({ ...this.selectedFilters }, { arrayFormat: 'comma' });
    const pathWithFilters = this.currentPath + '?' + stringified;
    const localized = this.localize.translateRoute(pathWithFilters) as string;
    this.router.navigateByUrl(localized);
    if (this.isBrowser) {
      window.scrollTo(0, 0);
    }
  };

  getSelectedSortValue = () => {
    const sortValue =
      this.selectedFilters &&
      this.selectedFilters[this.FILTER_CONFIG.SORTING.urlParam] &&
      this.selectedFilters[this.FILTER_CONFIG.SORTING.urlParam][0];

    if (sortValue) {
      return this.SORT_CONFIG.find(({ id }) => id === sortValue);
    }
    return this.SORT_CONFIG && this.SORT_CONFIG.length && this.SORT_CONFIG[0];
  };

  getSetPriceValue = () => {
    const selectedMin =
      this.selectedFilters &&
      this.selectedFilters[this.FILTER_CONFIG.MIN_PRICE.urlParam] &&
      this.selectedFilters[this.FILTER_CONFIG.MIN_PRICE.urlParam][0];
    const selectedMax =
      this.selectedFilters &&
      this.selectedFilters[this.FILTER_CONFIG.MAX_PRICE.urlParam] &&
      this.selectedFilters[this.FILTER_CONFIG.MAX_PRICE.urlParam][0];

    return {
      min: selectedMin || this.availablePrice.min,
      max: selectedMax || this.availablePrice.max,
    };
  };

  handlePriceChange = (val: { min: number; max: number }, pointerType: 0 | 1) => {
    this.handleFilterChange(
      pointerType ? this.FILTER_CONFIG.MAX_PRICE.urlParam : this.FILTER_CONFIG.MIN_PRICE.urlParam,
    )([
      {
        id: pointerType ? val.max : val.min,
        name: '', // filling
        productCount: 0, // filling
      },
    ]);
  };

  onTagRemoveHandler = (filterConfig: DisplayConfig) => (itemRemoved: FilterValue) => {
    const selectedFilter = this.filters.data.find(({ id }) => id === filterConfig.id);
    const updatedValues = reject((item: FilterValue) => {
      return !this.selectedFilters[filterConfig.urlParam].includes(item.id) || equals(item, itemRemoved);
    }, selectedFilter.values);
    this.handleFilterChange(filterConfig.urlParam)(updatedValues as FilterValue[]);
  };

  onFilterExpandedChange = (filterConfig: DisplayConfig) => (expanded: boolean) => {
    this.filtersExpandedState = {
      ...this.filtersExpandedState,
      [filterConfig.id]: expanded,
    };
  };

  // Solve safari render issue by forcing UI refresh on range slider
  handlePriceExpandChange = (expanded: boolean) =>
    this.priceRangeComponents.map(component => component.refreshRangeSlider());

  showClearAllFilters = () => !isEmpty(omit(['term'], this.selectedFilters));

  clearAllFilters = () => {
    const { term } = this.selectedFilters;
    this.selectedFilters = { term };
    this.handleFiltersCommit();
    if (this.filtersVisible && !this.isDesktop) {
      this.toggleFiltersVisibility();
    }
  };

  ngOnDestroy() {
    if (this.isBrowser) {
      // If component gets somehow destroyed, make sure to reenable scroll per default
      bodyScrollLock.enableBodyScroll(document.body);
    }
  }
}
