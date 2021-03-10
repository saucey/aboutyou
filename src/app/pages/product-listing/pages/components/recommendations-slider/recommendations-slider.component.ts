import { BapiProduct } from '@aboutyou/backbone/types/BapiProduct';
import { Component, Input } from '@angular/core';
import { SliderProduct } from 'src/app/common/components/products-slider/products-slider.component';
import { CurrencyPipe } from 'src/app/common/pipes/currency.pipe';

@Component({
  selector: 'app-recommendations-slider',
  templateUrl: './recommendations-slider.component.html',
  styleUrls: ['./recommendations-slider.component.scss'],
  providers: [CurrencyPipe],
})
export class RecommendationsSliderComponent {
  /** Simple text-input for the headline */
  @Input() headline: string;

  // TODO #1387: BapiProduct is not the correct interface
  /** Bapi-data for the products to be displayed */
  @Input() set products(products: BapiProduct[]) {
    this.recommendedProducts = products.map(this.toSliderProduct.bind(this));
  }

  public recommendedProducts: SliderProduct[];

  /** Items displayed per row of desktop */
  public readonly itemsPerRow = 4;

  constructor(private currencyPipe: CurrencyPipe) {}

  private toSliderProduct(bapiProduct: BapiProduct): SliderProduct {
    // TODO #1138: consider throwing instead of mocking
    // https://gitlab.com/aboutyou/cloud-agency/shop-application/ay-cloud-shop-application-depot/-/merge_requests/397#note_349919904
    try {
      return {
        id: bapiProduct.id,
        imageSrc: (bapiProduct as any).previewImageSrc,
        title: (bapiProduct as any).entity.attributes.name.values.label,
        subtitle: this.currencyPipe.transform((bapiProduct as any).currentPrice, (bapiProduct as any).currency),
      };
    } catch (e) {
      console.log(`Couldn't map Product to Recommendation Slider Product:`, bapiProduct, e);
      // TODO #1138: no magic strings, either get rid of the mock or construct the imageSrc smartly
      // cdn pipe in storefront could help to generate the url
      // https://gitlab.com/aboutyou/cloud-agency/shop-application/ay-cloud-shop-application-depot/-/merge_requests/397#note_349918390
      return {
        id: 1,
        imageSrc:
          'https://depot.dam.staging.aboutyou.cloud/images//images/da834f1f8647b7f0f8a55d3a215f7212?width=600&amp;height=600&amp;brightness=0.95',
        title: 'Mock Product',
        subtitle: 'Mock Price',
      };
    }
  }
}
