/* istanbul ignore file: this is just a observable wrapper over already well tested BAPI SDK */

import { FilterItemWithValues, FiltersEndpointParameters } from '@aboutyou/backbone/endpoints/filters/filters';
import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { BapiClientService } from './bapi-client.service';

@Injectable({
  providedIn: 'root',
})
export class BapiFilterService {
  constructor(private readonly bapiService: BapiClientService) {}

  public get(params: FiltersEndpointParameters): Observable<FilterItemWithValues[]> {
    return from(this.bapiService.bapiClient.filters.get(params));
  }
}
