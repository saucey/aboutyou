/* istanbul ignore file: this is just a observable wrapper over already well tested BAPI SDK */

import { SearchMappingsEndpointResponseData } from '@aboutyou/backbone/endpoints/search/mappings';
import {
  SearchSuggestionsEndpointParameters,
  SearchSuggestionsEndpointResponseData,
} from '@aboutyou/backbone/endpoints/search/suggestions';
import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { BapiClientService } from './bapi-client.service';

@Injectable({
  providedIn: 'root',
})
export class BapiSearchService {
  constructor(private readonly bapiService: BapiClientService) {}

  public mappings(term: string): Observable<SearchMappingsEndpointResponseData> {
    return from(this.bapiService.bapiClient.search.mappings(term));
  }

  public suggestions({
    term,
    ...searchTermOptions
  }: SearchSuggestionsEndpointParameters): Observable<SearchSuggestionsEndpointResponseData> {
    return from(this.bapiService.bapiClient.search.suggestions(term, searchTermOptions));
  }
}
