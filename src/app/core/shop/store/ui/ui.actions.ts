import { createAction, props } from '@ngrx/store';

export const UI_ACTIONS = {
  rememberPLPScrollPosition: createAction('UI_SET_PLP_SCROLL_POSITION', props<{ scroll: number }>()),
};
