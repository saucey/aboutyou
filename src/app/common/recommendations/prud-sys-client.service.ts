import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { PrudSysRequestParams } from './prud-sys-request-params';

// TODO #1449 the proxy-config.json doesn't work in ssr mode. Fix after the build process was cleaned up.

/**
 * Response object as returned from PrudSys.
 *
 * _Hint: The actual response may be a superset of this interface.
 * Only properties required so far are part of this interface.
 * Feel free to extend this interface._
 */
export interface PrudSysResponse {
  recommendations: {
    slider1: {
      title: string;
      content: PrudSysResponseContent[];
    };
  };
}

export interface PrudSysResponseContent {
  data: { UID: string };
}

@Injectable({ providedIn: 'root' })
export class PrudSysClientService {
  // `/prudsys` is redirected by `proxy.config` to avoid CORS issues
  // TODO #1392 use environments, HOST and REID from the PDF in the EPIC (CAFE-1136)
  // adapt URL according to correct spec
  // postpone to #1449 if proxy or environment configuration is too complicated.
  private static readonly baseUrl = `/prudsys/rde_server/res/depotDE/plugins/exec/prudsys/prudsys/core/recommendation/productDetailCurrent`;

  constructor(private httpClient: HttpClient) {}

  public getRecommendations({ sid, tracking, pid, cid, userid }: PrudSysRequestParams): Observable<PrudSysResponse> {
    const baseUrl = PrudSysClientService.baseUrl;

    const useridQueryParam = userid ? `&userid=${userid}` : ``;

    // TODO #1392: consider building a param object
    const requestUrl = `${baseUrl}?sid=${sid}&tracking=${tracking}&pid=${pid}&cid=${cid}${useridQueryParam}`;

    return this.httpClient.get<PrudSysResponse>(requestUrl);
  }
}
