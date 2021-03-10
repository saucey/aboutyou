import { from, Observable } from 'rxjs';

export const preloadImages = (urls: string[]): Observable<any> => {
  return from(
    new Promise((resolve, reject) => {
      let loadedCounter = 0;
      const toBeLoadedNumber = urls.length;

      const preloadImage = (url, anImageLoadedCallback) => {
        const img = new Image();
        img.src = url;
        img.onload = anImageLoadedCallback;
      };

      urls.forEach(url => {
        preloadImage(url, () => {
          loadedCounter++;
          if (loadedCounter === toBeLoadedNumber) {
            resolve();
          }
        });
      });
    }),
  );
};
