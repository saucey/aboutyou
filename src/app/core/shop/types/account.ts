export interface CustomerResponse {
  birthDate: string;
  email: string;
  firstName: string;
  gender: string;
  id: number;
  lastName: string;
  phone: string;
  status: { isActive: boolean; isGuestCustomer: boolean; isTestCustomer: boolean };
  title: string;
  type: string;
}

export interface CustomerContact {
  email?: string;
  phone?: string;
}

export interface CustomerPersonal {
  birthDate?: string;
  firstName?: string;
  gender?: string;
  lastName?: string;
}

export enum SubPageTypes {
  Personal,
  Newsletter,
}
