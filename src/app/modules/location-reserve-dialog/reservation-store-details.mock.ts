import { ReservationStoreDetails } from './reservation-store-details';

export function createReservationStoreDetailsMock(): ReservationStoreDetails[] {
  return [
    {
      storeId: 1496,
      storeName: 'Hamburg Große Bleichen',
      address: 'Große Bleichen 19',
      zipcode: '20354',
      city: 'Hamburg',
      country: 'DE',
      latitude: '53.55285000',
      longitude: '9.98980000',
      openingHours: [
        { weekDay: 'monday', openingHours: { from: '10:00', until: '19:00' } },
        { weekDay: 'tuesday', openingHours: { from: '10:00', until: '19:00' } },
        { weekDay: 'wednesday', openingHours: { from: '10:00', until: '19:00' } },
        { weekDay: 'thursday', openingHours: { from: '10:00', until: '19:00' } },
        { weekDay: 'friday', openingHours: { from: '10:00', until: '19:00' } },
        { weekDay: 'saturday', openingHours: { from: '10:00', until: '19:00' } },
      ],
      phone: '040 23908967',
      storeEmail: 'hamburg_1496@g-d-c.eu',
      productId: 'HFN0016575',
      currentStock: 3,
      distance: '1.457',
    },
  ];
}
