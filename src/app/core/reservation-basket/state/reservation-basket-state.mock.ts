import { createBasketStateMock } from 'src/app/core/basket/state/basket-state.mock';
import { ReservationBasketState } from './reservation-basket.reducer';

export const createReservationBasketStateMock: (storeId?: number) => ReservationBasketState = (
  storeId: number = 789456,
) => {
  const basketState = createBasketStateMock();
  basketState.data.basket.items.forEach(item => {
    item.customData = { ...item.customData, storeId };
  });
  return basketState;
};
