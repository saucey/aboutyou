import { IReservation } from 'src/app/core/shop/types/reservation';
import { ReservationStatus } from '../order.type';

export function getOpenedReservations(reservations: IReservation[]) {
  return reservations.filter(
    obj =>
      obj.status === ReservationStatus.created ||
      obj.status === ReservationStatus.complete ||
      obj.status === ReservationStatus.transferred ||
      obj.status === ReservationStatus.ready,
  );
}

export function getClosedReservations(reservations: IReservation[]) {
  return reservations.filter(
    obj => obj.status === ReservationStatus.picked || obj.status === ReservationStatus.cancelled,
  );
}
