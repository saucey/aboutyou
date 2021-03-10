import { StoreOpeningHours } from './store-opening-hours';

export interface ReservationStoreDetails {
  storeId: number;
  storeName: string;
  address: string;
  zipcode: string;
  city: string;
  country: string;
  latitude: string;
  longitude: string;
  openingHours: StoreOpeningHours[];
  phone: string;
  storeEmail: string;
  productId: string;
  currentStock: number;
  distance: string;
}
