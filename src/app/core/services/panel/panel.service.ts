/* istanbul ignore file: This is a unfinished service which will be changed later */

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { getPanelUrl } from '../resolveEnvs';

@Injectable({
  providedIn: 'root',
})
export class PanelService {
  private readonly panelUrl: string;

  constructor(private readonly http: HttpClient) {
    this.panelUrl = getPanelUrl();
  }

  public getHomepageSeo() {
    return this.http.get(`${this.panelUrl}/home`);
  }

  public getPlpSeo() {
    return this.http.get(`${this.panelUrl}/plp`);
  }

  public getPdpSeo() {
    return this.http.get(`${this.panelUrl}/pdp`);
  }
  public getSearchPageSeo() {
    return this.http.get(`${this.panelUrl}/search`);
  }
}
