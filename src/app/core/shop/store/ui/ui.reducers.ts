import { Action, createReducer, on } from '@ngrx/store';
import { UI_ACTIONS } from './ui.actions';

export interface UiState {
  plp: {
    scroll?: number;
  };
}

export const initialState: UiState = {
  plp: {},
};

const uiReducer = createReducer(
  initialState,
  on(UI_ACTIONS.rememberPLPScrollPosition, (state, action) => ({
    ...state,
    plp: { ...state.plp, scroll: action.scroll },
  })),
);

export function reducer(state: UiState | undefined, action: Action) {
  return uiReducer(state, action);
}
