import { createAction, props } from '@ngrx/store';
import { NavbarCategory } from '../../types';

export const CATEGORIES_ACTIONS = {
  setCategories: createAction('CATEGORIES_SET', props<{ categories: NavbarCategory[] }>()),
};
