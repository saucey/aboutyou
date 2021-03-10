export interface FetchUserResponse {
  status: 'open' | 'subscribed' | 'confirmed' | 'unsubscribed' | 'blacklisted';
}

export interface CrossengageCreateSubscriptionResponse {
  error?: string;
}

export interface CrossengageUpdateSubscriptionResponse {
  error?: string;
}

export interface CrossengageSubscribePayload {
  email: string;
  birthDate?: string;
  firstName?: string;
  lastName?: string;
  gender?: 'f' | 'm';
  source?: string;
}
