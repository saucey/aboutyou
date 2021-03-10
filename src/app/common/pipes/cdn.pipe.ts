import { ProductImage } from '@aboutyou/backbone';
import { Pipe, PipeTransform } from '@angular/core';
import { getCdnImageUrl, ICdnOptions } from 'src/app/core/shop/utils';

@Pipe({
  name: 'cdn',
})
export class CdnPipe implements PipeTransform {
  transform(image: ProductImage, options?: ICdnOptions): string | null {
    if (!image || !image.hash) {
      console.warn('image not valid for cdn pipe', { image });
      return '';
    }
    return getCdnImageUrl(image.hash, options);
  }
}
