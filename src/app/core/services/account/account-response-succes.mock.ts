export const accountResponseSuccessMock: any = {
  addresses: [
    {
      city: 'Hamburg',
      countryCode: 'DEU',
      createdAt: '2020-04-17T12:01:03+02:00',
      houseNumber: '10',
      id: 40,
      isDefault: {
        billing: false,
        shipping: false,
      },
      recipient: {
        firstName: 'Fred',
        gender: 'm',
        lastName: 'Firebrick',
        type: 'personal',
      },
      street: 'Domstraße',
      updatedAt: '2020-04-17T12:01:03+02:00',
      zipCode: '20095',
    },
  ],
  authentication: {
    type: 'password',
  },
  birthDate: '1977-01-01',
  createdAt: '2020-04-17T11:06:46+02:00',
  email: 'mock@mock-test.com',
  firstName: 'Fred',
  gender: 'm',
  id: 104,
  lastName: 'Firebrick',
  phone: '0049/123456',
  status: {
    isActive: true,
    isGuestCustomer: false,
    isTestCustomer: false,
  },
  title: 'Dr.',
  type: 'personal',
  updatedAt: '2020-04-29T22:35:02+02:00',
};
