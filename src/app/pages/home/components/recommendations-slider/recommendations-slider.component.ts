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

  // TODO #598: BapiProduct is not the correct interface
  /** Bapi-data for the products to be displayed */
  @Input() set products(products: BapiProduct[]) {
    this.recommendedProducts = products.map(this.toSliderProduct.bind(this));
  }

  public recommendedProducts: SliderProduct[];

  constructor(private currencyPipe: CurrencyPipe) {}

  private toSliderProduct(bapiProduct: BapiProduct): SliderProduct {
    return {
      id: bapiProduct.id,
      imageSrc: (bapiProduct as any).previewImageSrc,
      title: (bapiProduct as any).entity.attributes.name.values.label,
      subtitle: this.currencyPipe.transform((bapiProduct as any).currentPrice, (bapiProduct as any).currency),
    };
  }
}
