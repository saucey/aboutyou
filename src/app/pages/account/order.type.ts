export enum OrderType {
  SimpleOrder = 'orders',
  ReservationOrder = 'reservations',
}

export enum OrderStatus {
  order_open = 'order_open',
  payment_pending = 'payment_pending',
  payment_reserved = 'payment_reserved',
  invoice_completed = 'invoice_completed',
  cancellation_pending = 'cancellation_pending',
  cancellation_completed = 'cancellation_completed',
  shipment_pending = 'shipment_pending',
  shipment_completed = 'shipment_completed',
  open = 'open',
}

type OrderStatusKey = keyof typeof OrderStatus;

export const OrderStatusKeys = new Map<OrderStatus, OrderStatusKey>(
  Object.entries(OrderStatus).map(([k, v]: [OrderStatusKey, OrderStatus]) => [v, k]),
);

export enum ReservationStatus {
  created = 100,
  transferred = 101,
  complete = 102,
  ready = 59,
  picked = 60,
  cancelled = 61,
}

type ReservationStatusKey = keyof typeof ReservationStatus;

export const ReservationStatusKeys = new Map<ReservationStatus, ReservationStatusKey>(
  Object.entries(ReservationStatus).map(([k, v]: [ReservationStatusKey, ReservationStatus]) => [v, k]),
);
