import { HttpClient, HttpErrorResponse, HttpResponse, HttpResponseBase } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

const btoaImplementation = (str: string) => {
  try {
    return btoa(str);
  } catch (err) {
    return Buffer.from(str).toString('base64');
  }
};

@Injectable({
  providedIn: 'root',
})
export class AxiosAdapterService {
  constructor(private readonly httpClient: HttpClient) {}

  get adapter() {
    return <T = any>(config: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
      const { method, url, headers, data, auth, params } = config;

      // Remove content-type for form data
      if (typeof FormData !== 'undefined' && data instanceof FormData) {
        delete headers['Content-Type'];
      }

      // HTTP basic authentication
      if (auth) {
        headers.Authorization = 'Basic ' + btoaImplementation(auth.username + ':' + auth.password);
      }

      const request = this.httpClient.request(method.toUpperCase(), url, {
        body: data,
        headers,
        params,
        observe: 'response',
      });

      return request
        .pipe(catchError(this.handleFailure(config, request)), map(this.handleSuccess<T>(config, request)))
        .toPromise() as Promise<AxiosResponse<T>>;
    };
  }

  private handleSuccess<T>(config: AxiosRequestConfig, request: Observable<HttpResponse<object>>) {
    return (response: HttpResponse<T>): AxiosResponse<T> => {
      if (!config.validateStatus || config.validateStatus(response.status)) {
        return {
          ...this.convertResponse(response),
          config,
          request,
        };
      } else {
        throw this.createError(`Request failed with status code ${response.status}`, config, null, request, response);
      }
    };
  }

  private handleFailure(config: AxiosRequestConfig, request: Observable<HttpResponse<object>>) {
    return (response: HttpErrorResponse): Observable<never> => {
      return throwError(this.createError(response.message, config, response.name, request, response));
    };
  }

  private convertResponse<T>(
    response: HttpResponse<T> | HttpErrorResponse,
  ): Pick<AxiosResponse<T>, 'data' | 'status' | 'statusText' | 'headers'> {
    const responseHeaders =
      response.headers &&
      response.headers.keys().reduce((headersColl, headerKey) => {
        if (response.headers.has(headerKey)) {
          headersColl[headerKey] = response.headers.get(headerKey);
        }

        return headersColl;
      }, {});

    return {
      data: this.responseIsError(response) ? response.error : response.body,
      status: response.status,
      statusText: response.statusText,
      headers: responseHeaders,
    };
  }

  private createError<T>(
    message?: string,
    config?: AxiosRequestConfig,
    code?: string,
    request?: Observable<HttpResponse<object>>,
    response?: HttpResponse<T> | HttpErrorResponse,
  ) {
    const error = new Error(message);
    return this.enhanceError(error as AxiosError, config, code, request, response);
  }

  private enhanceError<T>(
    error?: AxiosError,
    config?: AxiosRequestConfig,
    code?: string,
    request?: Observable<HttpResponse<object>>,
    response?: HttpResponse<T> | HttpErrorResponse,
  ) {
    error.config = config;
    if (code) {
      error.code = code;
    }

    error.request = request;
    error.response = {
      ...this.convertResponse(response),
      config,
      request,
    };

    return error;
  }

  private responseIsError(response: HttpResponseBase): response is HttpErrorResponse {
    return response.hasOwnProperty('error');
  }
}
