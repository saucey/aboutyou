import { isPlatformServer } from '@angular/common';
import { Inject, Injectable, InjectionToken, Injector, PLATFORM_ID } from '@angular/core';
import { Request } from 'express';

export const EXPRESS_REQUEST = new InjectionToken('expressRequest');

@Injectable({ providedIn: 'root' })
export class RequestMiddlewareService {
  constructor(private injector: Injector, @Inject(PLATFORM_ID) private platformId: object) {}

  private get request(): Request {
    return this.injector.get(EXPRESS_REQUEST) as Request;
  }

  getBrowserLanguage = () => {
    if (isPlatformServer(this.platformId)) {
      // tslint:disable-next-line
      return this.request['language'];
    } else {
      return navigator.language;
    }
  };

  getCurrentFullUrl = () => {
    if (isPlatformServer(this.platformId)) {
      return `${this.request.get('host')}${this.request.url}`;
    } else {
      return window.location.href;
    }
  };

  getCookie = (key: string): string | null => {
    if (isPlatformServer(this.platformId)) {
      return this.parseCookies(this.request.headers.cookie)[key];
    } else {
      return this.parseCookies(document.cookie)[key];
    }
  };

  getAllCookies = () => {
    if (isPlatformServer(this.platformId)) {
      return this.parseCookies(this.request.headers.cookie);
    } else {
      return this.parseCookies(document.cookie);
    }
  };

  /**
   * This returns a map of cookies.
   * NOTE: For now we ignore multiple occurance of cookie with a same now, and fallback to the last one.
   */
  parseCookies = (cookies: Request['cookies']) => {
    if (!cookies) {
      return {};
    }
    const cookiesArr: string[] = cookies.split(';');
    return cookiesArr.reduce((accumulator, current) => {
      const [cookieKey, cookieValue] = current.split('=');
      const cleanedCookieKey = cookieKey.trim();
      return {
        ...accumulator,
        [cleanedCookieKey]: cookieValue,
      };
    }, {});
  };
}
