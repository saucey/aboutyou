import { AppState } from 'src/app/core/shop/store';
import { ReservationBasketState } from './state';

export interface AppStateWithReservationBasket extends AppState {
  reservationBasket: ReservationBasketState;
}
