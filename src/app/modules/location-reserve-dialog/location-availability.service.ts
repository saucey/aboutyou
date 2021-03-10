import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { locationAvailabilityUrl } from 'src/app/core/services/resolveEnvs';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LocationAvailabilityService {
  private readonly locationAvailabilityUrl: string;

  constructor(private readonly http: HttpClient) {
    this.locationAvailabilityUrl = locationAvailabilityUrl();
  }

  public getLocationAvailability(articleNumber: string, zipCode: string, distance: number): Observable<any> {
    return this.http.get<any>(`${this.locationAvailabilityUrl}/${articleNumber}/${zipCode}/${distance}`);
  }
}
