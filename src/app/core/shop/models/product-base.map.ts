import { BapiProduct } from '@aboutyou/backbone';
import { getVariantStock, CDNImageSize, getCdnImageUrl, getDisplayableVariantPrices } from '../utils';
import { BapiCategory } from '@aboutyou/backbone/types/BapiCategory';
import { TranslateService } from '@ngx-translate/core';
import { ICurrency } from '../types';

export abstract class ProductBaseMap<T> {
  public id: number;
  public productId: number;
  public currentPrice: number;
  public oldPrice: number;
  public referenceLabel: string;
  public percentageDiscount: number;
  public availableQuantities: number;
  public previewImageSrc: string;
  public custom: T;
  public siblings: ProductBaseMap<T>[];
  public choosableSiblings: ProductBaseMap<T>[];

  constructor(
    public entity: BapiProduct,
    public currency: ICurrency,
    protected activeCategory?: BapiCategory,
    protected translateService?: TranslateService,
  ) {
    this.map();
  }

  protected abstract getSiblingMapper(
    entity: BapiProduct,
    currency?: ICurrency,
    activeCategory?: BapiCategory,
    translateService?: TranslateService,
  ): ProductBaseMap<T>;

  protected abstract mapCustom(): T;

  protected map(): void {
    this.id = this.entity.id;
    this.productId = this.entity.id;

    this.previewImageSrc = this.getPreviewImageSrc();
    this.custom = this.mapCustom();

    this.mapVariant();

    if (this.entity.siblings && this.entity.siblings.length > 0) {
      this.siblings = this.entity.siblings.map(sibling =>
        this.getSiblingMapper(sibling, this.currency, this.activeCategory, this.translateService),
      );

      this.mapChoosableSiblings();
    }
  }

  protected mapVariant(variantIndex: number = 0): void {
    const { currentPrice, oldPrice, referenceLabel, percentageDiscount } = getDisplayableVariantPrices(
      this.entity,
      this.currency,
      variantIndex,
    );

    this.currentPrice = currentPrice;
    this.oldPrice = oldPrice;
    this.referenceLabel = referenceLabel;
    this.percentageDiscount = percentageDiscount;
    this.availableQuantities = getVariantStock(this.entity, variantIndex).quantity;
  }

  public getImages(size?: CDNImageSize): string[] {
    return this.entity.images.map(img =>
      getCdnImageUrl(img.hash, {
        size: size || 'large',
      }),
    );
  }

  public getImage(index: number, size: CDNImageSize = 'medium', brightness: number = 0.95): string {
    return (
      this.entity.images[index] &&
      getCdnImageUrl(this.entity.images[index].hash, {
        size,
        brightness,
      })
    );
  }

  public getMainImageSrc(size?: CDNImageSize, brightness?: number): string {
    return this.getImage(0, size, brightness);
  }

  public getPreviewImageSrc(size?: CDNImageSize, brightness?: number): string {
    return this.getImage(0, size, brightness);
  }

  /**
   * @returns the second image of the product. If not available the preview image is returned
   */
  public getSecondPreviewImageSrc(size: CDNImageSize = 'small', brightness: number = 1.0): string {
    const secondImage = this.getImage(1, size, brightness);
    if (secondImage == null) {
      // fallback to first image
      return this.getPreviewImageSrc(size, brightness);
    }
    return secondImage;
  }

  protected mapChoosableSiblings(): void {
    let siblings = [];

    if (this.entity.siblings.length > 0) {
      siblings = [
        this.getSiblingMapper(
          {
            ...this.entity,
            siblings: null,
          },
          this.currency,
          this.activeCategory,
          this.translateService,
        ),
      ];

      siblings = siblings.concat(
        this.entity.siblings
          .map(sibling =>
            getVariantStock(sibling).quantity > 0
              ? this.getSiblingMapper(sibling, this.currency, this.activeCategory, this.translateService)
              : null,
          )
          .filter(Boolean),
      );
    }

    this.choosableSiblings = siblings;
  }

  public getBapiProduct(): BapiProduct {
    return this.entity;
  }
}
