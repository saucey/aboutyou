/* istanbul ignore file: this is just a observable wrapper over already well tested BAPI SDK */

import { CategoryBySlugEndpointParameters } from '@aboutyou/backbone/endpoints/categories/categoryBySlug';
import { BapiCategory } from '@aboutyou/backbone/types/BapiCategory';
import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { BapiClientService } from './bapi-client.service';
import { RootCategoriesEndpointParameters } from '@aboutyou/backbone/endpoints/categories/categories';
import { CategoriesByIdsEndpointParameters } from '@aboutyou/backbone/endpoints/categories/categoriesByIds';
import { CategoryByIdEndpointParameters } from '@aboutyou/backbone/endpoints/categories/categoryById';

@Injectable({
  providedIn: 'root',
})
export class BapiCategoryService {
  constructor(private readonly bapiService: BapiClientService) {}

  public getByPath(
    path: string[],
    parameters?: Pick<CategoryBySlugEndpointParameters, 'with'>,
  ): Observable<BapiCategory> {
    return from(this.bapiService.bapiClient.categories.getByPath(path, parameters));
  }
  public getRoots(parameters?: RootCategoriesEndpointParameters): Observable<BapiCategory[]> {
    return from(this.bapiService.bapiClient.categories.getRoots(parameters));
  }
  public getById(
    categoryId: number,
    parameters?: Pick<CategoryByIdEndpointParameters, 'with'>,
  ): Observable<BapiCategory> {
    return from(this.bapiService.bapiClient.categories.getById(categoryId, parameters));
  }
  public getByIds(
    categoryIds: number[],
    parameters?: Pick<CategoriesByIdsEndpointParameters, 'depth'>,
  ): Observable<BapiCategory[]> {
    return from(this.bapiService.bapiClient.categories.getByIds(categoryIds, parameters));
  }
}
