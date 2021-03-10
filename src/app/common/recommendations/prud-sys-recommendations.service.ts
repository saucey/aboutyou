import { Injectable } from '@angular/core';
import { from } from 'rxjs';
import { Observable } from 'rxjs/Observable';
import { bufferCount, map, mergeMap, switchMap } from 'rxjs/operators';
import { BapiRecommendationsService } from './bapi-recommendations.service';
import { PrudSysClientService, PrudSysResponse, PrudSysResponseContent } from './prud-sys-client.service';
import { PrudSysRequestParams } from './prud-sys-request-params';
import { RecommendedProduct } from './recommended-product';

// TODO #1392 allow multiple sliders
export interface Recommendations {
  title: string;
  products: RecommendedProduct[];
}

interface RecommendationsReference {
  title: string;
  referenceKeys: string[];
}

// TODO #1392 clean up, esp. method names and intermediate vars/params
@Injectable({ providedIn: 'root' })
export class PrudSysRecommendationsService {
  constructor(
    private readonly prudSysClient: PrudSysClientService,
    // private readonly bapiService: BapiProductService,
    private readonly bapiRecommendationsService: BapiRecommendationsService,
  ) {}

  get(params: PrudSysRequestParams): Observable<Recommendations> {
    return this.prudSysClient
      .getRecommendations(params)
      .pipe(map(this.toRecommendationsReference.bind(this)), switchMap(this.toObservableOfRecommendations.bind(this)));
  }

  private toRecommendationsReference(response: PrudSysResponse): RecommendationsReference {
    return {
      title: response.recommendations.slider1.title,
      referenceKeys: response.recommendations.slider1.content.map(this.toReferenceKey.bind(this)),
    };
  }

  private toReferenceKey(prudSysResponseContent: PrudSysResponseContent): string {
    return prudSysResponseContent.data.UID;
  }

  private toObservableOfRecommendations(
    recommendationsReference: RecommendationsReference,
  ): Observable<Recommendations> {
    return from(recommendationsReference.referenceKeys).pipe(
      mergeMap<string, Observable<RecommendedProduct>>(refKey => this.bapiRecommendationsService.getByRefKey(refKey)),
      bufferCount<RecommendedProduct>(recommendationsReference.referenceKeys.length),
      map(recommendedProductsArray => ({
        title: recommendationsReference.title,
        products: recommendedProductsArray.filter(recomProd => recomProd !== null),
      })),
    );
  }
}
