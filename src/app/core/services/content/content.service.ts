/* istanbul ignore file: This is a unfinished service which will be changed later */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { getContentUrl } from '../resolveEnvs';

@Injectable({
  providedIn: 'root',
})
export class ContentService {
  private readonly contentUrl: string;

  constructor(private readonly http: HttpClient) {
    this.contentUrl = getContentUrl();
  }

  public getCategoryContents(categoryId: number) {
    return this.http.get(`${this.contentUrl}/category/${categoryId}`);
  }

  public getSearchContents() {
    return this.http.get(`${this.contentUrl}/search`);
  }

  public getHomepageContents() {
    return this.http.get(`${this.contentUrl}/home`);
  }

  // Data Preparation and Mapping
  public getMappedHomepageContent(): Observable<any> {
    return from(
      new Promise<any>((resolve, reject) => {
        this.getHomepageContents().subscribe(data => {
          resolve(data);
        });
      }),
    );
  }
}
