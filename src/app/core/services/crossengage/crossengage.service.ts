import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {
  FetchUserResponse,
  CrossengageSubscribePayload,
  CrossengageCreateSubscriptionResponse,
  CrossengageUpdateSubscriptionResponse,
} from './crossengange.types';

@Injectable({
  providedIn: 'root',
})
export class CrossengageService {
  constructor(private readonly http: HttpClient) {}

  public getUser = (email: string): Observable<FetchUserResponse> =>
    this.http.get<FetchUserResponse>(`/api/subscriptions/${encodeURIComponent(email)}`);

  public postUser = (payload: CrossengageSubscribePayload): Observable<CrossengageCreateSubscriptionResponse> =>
    this.http.post<CrossengageCreateSubscriptionResponse>(`/api/subscriptions`, payload);

  public putUser = (emailHash: string): Observable<CrossengageUpdateSubscriptionResponse> =>
    this.http.put<CrossengageUpdateSubscriptionResponse>(`/api/subscriptions/${encodeURIComponent(emailHash)}`, null);
}
