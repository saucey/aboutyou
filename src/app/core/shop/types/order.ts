import { ProductMap } from 'src/app/mappers/product';

export interface IOrder {
  id: number;
  referenceKey: number;
  address: OrderAddress;
  basketKey: string;
  confirmedAt: string;
  cost: {
    tax: {
      vat: {
        amount: number;
      };
    };
    withTax: number;
    withoutTax: number;
  };
  createdAt: string;
  currencyCode: string;
  customData: {
    originDevice: string;
  };
  customer: OrderCustomer;
  items: [OrderItemDetails];
  packages: [
    {
      carrierKey: string;
      deliveryDate: {
        maximum: string;
        minimum: string;
      };
      deliveryStatus: string;
      id: number;
    },
  ];
  payment: [
    {
      amount: number;
      data: {
        success: boolean;
        transaction_id: string;
      };
      key: string;
      options: {
        countOfInstallments: number;
      };
      transactionKey: string;
    },
  ];
  shipping: {
    policy: string;
  };
  shop: {
    country: string;
    id: number;
    language: string;
  };
  status: string;
  updatedAt: string;
}

export interface OrderAddress {
  billing: {
    city: string;
    countryCode: string;
    createdAt: string;
    houseNumber: string;
    id: number;
    isDefault: {
      billing: boolean;
      shipping: boolean;
    };
    recipient: {
      firstName: string;
      gender: 'f' | 'm';
      lastName: string;
      type: string;
    };
    street: string;
    updatedAt: string;
    zipCode: string;
  };
  shipping: {
    city: string;
    countryCode: string;
    createdAt: string;
    houseNumber: string;
    id: number;
    isDefault: {
      billing: boolean;
      shipping: boolean;
    };
    recipient: {
      firstName: string;
      gender: 'f' | 'm';
      lastName: string;
      type: string;
    };
    street: string;
    updatedAt: string;
    zipCode: string;
  };
}

export interface OrderCustomer {
  authentication: {
    type: string;
  };
  birthDate: string;
  createdAt: string;
  email: string;
  firstName: string;
  gender: 'f' | 'm';
  id: number;
  lastName: string;
  status: {
    isActive: boolean;
    isGuestCustomer: boolean;
    isTestCustomer: boolean;
  };
  type: string;
  updatedAt: string;
}

export interface OrderItemDetails {
  createdAt: string;
  key: string;
  packageId: number;
  price: {
    overrideWithoutTax: number;
    tax: {
      vat: {
        amount: number;
        rate: number;
      };
    };
    withTax: number;
    withoutTax: number;
  };
  product: {
    id: number;
  };
  status: string;
  updatedAt: string;
  mappedProduct: ProductMap;
  quantity: number;
}
