import { Inject, Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LazyGoogleMapsService {
  public apiKey: string;
  public name: string;
  private loadMapPromise: Promise<boolean>;

  constructor(@Inject('mapsAPI') googleMapsAPI: string) {
    this.apiKey = googleMapsAPI;
  }

  public runMap(): Observable<any> {
    return from(
      new Promise((resolve, reject) => {
        if (window[this.name] === null) {
          return resolve(null);
        }

        const script = document.createElement('script');
        this.name = 'jsonp' + Math.round(100000 * Math.random());
        script.src = `https://maps.googleapis.com/maps/api/js?key=${this.apiKey}`;
        document.getElementsByTagName('head')[0].appendChild(script);
        window[this.name] = null;
        script.onload = () => resolve(true);
        script.onerror = () => reject(false);
      }),
    );
  }
}
