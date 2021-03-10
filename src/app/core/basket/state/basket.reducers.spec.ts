import { BasketResponse } from '@aboutyou/backbone/helpers/BapiClient';
import { Action } from '@ngrx/store';
import { basketResponseFailureMock } from '../basket-response-failure.mock';
import { basketResponseSuccessMock } from '../basket-response-succes.mock';
import { BASKET_ACTIONS } from './basket.actions';
import { basketReducer, BasketState, initialState } from './basket.reducers';

describe('BasketReducers', () => {
  let state: BasketState;
  let result: BasketState;
  let action: Action;

  beforeEach(() => {
    state = initialState;
    result = null;
    action = null;
  });

  describe('#setBasket action', () => {
    describe('basketResponse with #type:success', () => {
      beforeEach(() => {
        givenASetBasketAction();
      });

      it('should return the basket state with the basket response set.', () => {
        whenReducerIsCalled();
        expect(result.data).toEqual(basketResponseSuccessMock);
      });

      it('should set #state.isChangingBasket to false', () => {
        state = { ...state, isChangingQuantity: true };
        whenReducerIsCalled(state);
        expect(result.isChangingQuantity).toBeFalse();
      });

      it('should set #state.isLoading to false', () => {
        state = { ...state, isLoading: true };
        whenReducerIsCalled(state);
        expect(result.isLoading).toBeFalse();
      });

      it('should set #state.error to null', () => {
        state = { ...state, error: { someError: 'data' } };
        whenReducerIsCalled(state);
        expect(result.error).toBeNull();
      });

      describe('object references', () => {
        beforeEach(() => {
          givenStateWithBasketSet();
          givenASetBasketAction();
        });

        it('should return same state object if the state.data is equal to basketResponse', () => {
          whenReducerIsCalled();
          expect(result).toBe(state);
        });

        it('should emit a new state object if the state.data is not equal to basketResponse', () => {
          state.data.type = 'failure';
          whenReducerIsCalled();
          expect(result).not.toEqual(state);
        });

        it('should emit a new state object if state.isLoading is not equal to basketResponse', () => {
          state.isLoading = true;
          whenReducerIsCalled();
          expect(result).not.toEqual(state);
        });

        it('should emit a new state object if state.isChangingQuantity is true', () => {
          state.isChangingQuantity = true;
          whenReducerIsCalled();
          expect(result).not.toEqual(state);
        });

        it('should emit a new state object if the state.error was set', () => {
          state.error = { some: 'error' };
          whenReducerIsCalled();
          expect(result).not.toEqual(state);
        });

        function givenStateWithBasketSet() {
          state = {
            ...initialState,
            isLoading: false,
            data: { ...basketResponseSuccessMock },
          };
        }

        describe('basketResponse with #type:failure', () => {
          it(`should set the #state.error to 'failure'`, () => {
            givenASetBasketAction(basketResponseFailureMock);
            whenReducerIsCalled();
            expect(result.error).toBeTruthy();
          });

          it(`should set the #state.error.kind to`, () => {
            givenASetBasketAction(basketResponseFailureMock);
            whenReducerIsCalled();
            expect(result.error.kind).toBeDefined();
          });
        });
      });

      function givenASetBasketAction(basketResponse: BasketResponse = basketResponseSuccessMock) {
        action = BASKET_ACTIONS.setBasket({
          basketResponse,
        });
      }
    });

    function whenReducerIsCalled(basketState: BasketState = state, basketAction: Action = action) {
      result = basketReducer(basketState, basketAction);
    }
  });
});
