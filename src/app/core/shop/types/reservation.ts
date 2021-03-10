import { ProductMap } from 'src/app/mappers/product';

export interface IReservation {
  reservationId: string;
  reservationDate: string;
  collectionDates: string;
  numberOfItems: number;
  status: number;
}

export interface IReservationResponse {
  reservationOrders: [
    {
      reservationId: string;
      reservationDate: string;
      collectionDates: string;
      numberOfItems: number;
      status: number;
    },
  ];
}

export interface IReservationDetail {
  reservationId: string;
  reservationDate: string;
  status: number;
  collectionNumber: number;
  branch: {
    name: string;
    postalCode: string;
    city: string;
    country: string;
    address: string;
  };
  items: [
    {
      id: number;
      quantity: number;
      status: number;
      unitPrice: number;
      mappedProduct: ProductMap;
    },
  ];
  totalPrice: number;
}

export interface IReservationItem {
  id: number;
  quantity: number;
  status: number;
  unitPrice: number;
  mappedProduct: ProductMap;
}
