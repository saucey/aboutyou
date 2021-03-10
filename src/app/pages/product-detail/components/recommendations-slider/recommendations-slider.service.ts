import { BapiProduct } from '@aboutyou/backbone';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class RecommendationsSliderService {
  // TODO #1392 use category ID from previously visited page (PLP)
  getCategoryId(bapiProduct: BapiProduct): string {
    const referral: any = null;
    if (referral) {
      return referral.categoryId;
    } else if (bapiProduct.categories && bapiProduct.categories[0] && bapiProduct.categories[0][0]) {
      return `${bapiProduct.categories[0][0].categoryId}`;
    } else {
      // should obly happen in very rare cases for old products, since modern products *always* have a category
      return '299'; // Balkon & Garten
    }
  }
}
