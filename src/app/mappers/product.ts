import { BapiProduct, Value } from '@aboutyou/backbone';
import { AttributeGroupMulti } from '@aboutyou/backbone/types/BapiProduct';
import { ProductBaseMap } from 'src/app/core/shop/models/product-base.map';
import {
  CDNImageSize,
  getAdvancedAttributeValueByKey,
  getAttributeGroupMultiByKey,
  getAttributeValue,
  getCdnImageUrl,
  getDisplayMoodImage,
  getImageAttribute,
  getSeasonTagsByCategories,
  getVariantStock,
} from 'src/app/core/shop/utils';
import { flatten, path } from 'ramda';
import values from 'ramda/es/values';
import { warningHintsCategoryId } from 'src/app/configs/shop/categories';
import { boxColorComposition } from './bapi/colors';
import {
  ADVANCED_ATTRIBUTE_KEY__ADDITIONAL_FURNITURE_MEASUREMENTS,
  ADVANCED_ATTRIBUTE_KEY__ALCOHOL_BY_VOLUMN,
  ADVANCED_ATTRIBUTE_KEY__FOOD_INGREDIENTS,
  ADVANCED_ATTRIBUTE_KEY__MASTER_PRODUCT_NAME,
  ADVANCED_ATTRIBUTE_KEY__PRODUCT_DESCRIPTION,
  ARTICLE_TYPE__SET,
  ATTRIBUTE_KEY__ABRAISON_RESISTANCE,
  ATTRIBUTE_KEY__ALCOHOL_UNIT,
  ATTRIBUTE_KEY__ARTICLE_TYPE,
  ATTRIBUTE_KEY__BATTERY_DELIVERY_SCOPE,
  ATTRIBUTE_KEY__COLOR,
  ATTRIBUTE_KEY__CUSHIONING,
  ATTRIBUTE_KEY__FILLING_QUANTITY,
  ATTRIBUTE_KEY__FILLING_QUANTITY_UNIT,
  ATTRIBUTE_KEY__FSC,
  ATTRIBUTE_KEY__IPURO_HINTS,
  ATTRIBUTE_KEY__LAMPS_GAP,
  ATTRIBUTE_KEY__LAMP_COUNT,
  ATTRIBUTE_KEY__MAX_BURNING_TIME,
  ATTRIBUTE_KEY__MAX_CANDLE_HEIGHT,
  ATTRIBUTE_KEY__PACK_SIZE,
  ATTRIBUTE_KEY__PICTURE_SIZE,
  ATTRIBUTE_KEY__PILE_HEIGHT,
  ATTRIBUTE_KEY__PRODUCTION_TYPE,
  ATTRIBUTE_KEY__PRODUCT_COLOR,
  ATTRIBUTE_KEY__PRODUCT_ENERGY_EFFICIENCY,
  ATTRIBUTE_KEY__PROMOTION,
  ATTRIBUTE_KEY__SEAT_DEPTH,
  ATTRIBUTE_KEY__SEAT_HEIGHT,
  ATTRIBUTE_KEY__SEAT_WIDTH,
  ATTRIBUTE_KEY__SET_ITEM_COUNT,
  ATTRIBUTE_KEY__SORTED,
  ATTRIBUTE_KEY__SORTED_VARIANT_NOT_SELECTABLE,
  ATTRIBUTE_KEY__SPECIAL_INGREDIENTS,
  ATTRIBUTE_KEY__WARNING_HINTS,
  ATTRIBUTE_KEY__WARNING_SIGNS,
  ATTRIBUTE_KEY__WOORD_ORIGIN,
  IMAGE_ATTRIBUTE_KEY__MOOD_IMAGE_HINT,
  IMAGE_ATTRIBUTE_KEY__SEASON_TAG,
} from './bapi/constants';
import { computeDimensionsLabel } from './bapi/dimensions';
import { getMaterialCompositionStrings } from './bapi/material';
import { computeSeoProductName } from './bapi/product-name';
import { getProductsOfSet, ProductSetItem } from './bapi/product-sets';
import {
  mostImportantPromotionTag,
  PromotionAttributeGroup,
  PromotionValues,
  sortByPromotionTagsByPriority,
} from './bapi/promotion-tags';
import { getShippingMethod, productHasShippingFees, ShippingMethod } from './bapi/shipping-method';
import {
  furtherHintsConfig,
  instructionsConfig,
  remainingFurtherHintsConfig,
  VALUE_ID_ENFLAMMABLE,
  VALUE_ID_ENVIRONMENT,
  warningHintsConfig,
} from './hints/config';
import { convertHint } from './hints/helpers';

export interface DepotProduct {
  articleType: string;
  showClickReserve: boolean;
  showOnlineHint: boolean;
  variantNotSelectableInfo: string;
  shippingMethod: ShippingMethod;
  freeShipping: boolean;
  additionalInformationLabel: string;
  color: string;
  colorId: number;
  colorHex: string;
  promotionTags: PromotionAttributeGroup;
  sortedPromotionTags: PromotionValues;
  highlightedTag: Value;
  isSale: boolean;
  isNew: boolean;
  tagLabel: string;
  pricePerItem: number;
  packSize: number;
  energyLabel: string;
  productTitle: string;
  setItemCount: number;
  rating: number;
  ratingCount: number;
  isWishlisted: boolean;
  showWishlistButton: boolean;
  moodImageSrc: string;
  isPlus: boolean;
  materialComposition: any[];
  dimensions: string;
  woodOrigin: string;
  fscNote: string;
  seoTitle: string;
  description: string;
  bundleItems?: ProductSetItem[];
  articleNumber: string;
  instructions: string[];
  ipuroHints: string;
  isInflammable: boolean;
  isBadForEnvironment: boolean;
  warningHints: string[];
  specialIngredients: string;
  furtherHints: string[];
  withBatteryWaste: boolean;
  remainingFurtherHints: string[];
  moodImageHint: string;
  showDimensions: boolean;
  showMaterialAttributes: boolean;
  productionType: string;
  seatHeight: string;
  seatDepth: string;
  seatWidth: string;
  pileHeight: string;
  additionalFurnitureDimensions: string;
  maxBurningTime: string;
  maxCandleHeight: string;
  lampCount: string;
  lampsGap: string;
  pictureSize: string;
  fillingQuantity: string;
  cushioning: string;
  abraisonResistance: string;
  sorted: string;
  seasonTag: string;
  foodIngredients: string;
  alcoholValue: string;
  alcoholUnit: string;
}

export interface CustomDataMap {
  displayData: {
    meta: { value: string };
    name: { [key: string]: any };
    identifier: { value: string };
    attributes: { [key: string]: any }[];
  };
}

export class ProductMap extends ProductBaseMap<DepotProduct> {
  protected getSiblingMapper(...params: ConstructorParameters<typeof ProductMap>) {
    return new ProductMap(...params);
  }

  private findSeasonTag(): string {
    const activeSeasonProperty =
      this.activeCategory && this.activeCategory.properties.find(({ name }) => name === 'Season');

    if (!activeSeasonProperty && this.entity.categories == null) {
      return '';
    }

    if (activeSeasonProperty) {
      return activeSeasonProperty.value.toLowerCase();
    }

    return getSeasonTagsByCategories(this.entity.categories)
      .join(',')
      .toLowerCase();
  }

  // tslint:disable-next-line: cyclomatic-complexity
  protected mapCustom(): DepotProduct {
    const packSize = Number(getAttributeValue(this.entity.attributes, ATTRIBUTE_KEY__PACK_SIZE));

    let pricePerItem;

    if (packSize > 1) {
      pricePerItem = this.currentPrice / packSize;
    }

    let productTitle = getAdvancedAttributeValueByKey(
      ADVANCED_ATTRIBUTE_KEY__MASTER_PRODUCT_NAME,
      this.entity,
    ) as string;

    const setItemCount = Number(getAttributeValue(this.entity.attributes, ATTRIBUTE_KEY__SET_ITEM_COUNT));

    if (setItemCount) {
      productTitle = productTitle + ', ' + setItemCount;
    }

    const seasonTag = this.findSeasonTag();

    let moodImageSrc;

    if (seasonTag) {
      const moodImage = getDisplayMoodImage(this.entity.images, seasonTag);
      moodImageSrc = moodImage && getCdnImageUrl(moodImage.hash, { brightness: 0.95, size: 'medium' });
    }

    const description = getAdvancedAttributeValueByKey(
      ADVANCED_ATTRIBUTE_KEY__PRODUCT_DESCRIPTION,
      this.entity,
    ) as string;
    const seoTitle = computeSeoProductName(this.entity);
    const articleNumber = (this.entity as BapiProduct & { referenceKey: string }).referenceKey;

    const bundleItems = getProductsOfSet(this.entity);

    return {
      seasonTag,
      articleNumber,
      bundleItems,
      seoTitle,
      description,
      additionalInformationLabel: computeDimensionsLabel(this.entity),
      freeShipping: !productHasShippingFees(this.currency, this.entity),
      shippingMethod: getShippingMethod(this.entity),
      variantNotSelectableInfo: getAttributeValue(this.entity.attributes, ATTRIBUTE_KEY__SORTED_VARIANT_NOT_SELECTABLE),
      sorted: getAttributeValue(this.entity.attributes, ATTRIBUTE_KEY__SORTED),
      foodIngredients: getAdvancedAttributeValueByKey(ADVANCED_ATTRIBUTE_KEY__FOOD_INGREDIENTS, this.entity) as string,
      alcoholValue: getAdvancedAttributeValueByKey(ADVANCED_ATTRIBUTE_KEY__ALCOHOL_BY_VOLUMN, this.entity) as string,
      alcoholUnit: getAttributeValue(this.entity.attributes, ATTRIBUTE_KEY__ALCOHOL_UNIT),
      pricePerItem,
      packSize: packSize > 1 && packSize,
      energyLabel: getAttributeValue(this.entity.attributes, ATTRIBUTE_KEY__PRODUCT_ENERGY_EFFICIENCY),
      productTitle,
      setItemCount,
      isWishlisted: false,
      showWishlistButton: true,
      moodImageSrc,
      ...this.mapPromotions(),
      ...this.mapColorInformation(),
      ...this.mapDetails(),
      ...this.mapRating(),
      ...this.mapHints(),
    };
  }

  // tslint:disable-next-line: cyclomatic-complexity
  protected mapPromotions() {
    const articleType = getAttributeValue(this.entity.attributes, ATTRIBUTE_KEY__ARTICLE_TYPE);
    const promotionTags = getAttributeGroupMultiByKey(
      this.entity.attributes,
      ATTRIBUTE_KEY__PROMOTION,
    ) as PromotionAttributeGroup;
    const sortedPromotionTags = promotionTags && sortByPromotionTagsByPriority(promotionTags.values);
    const highlightedTag = promotionTags && mostImportantPromotionTag(promotionTags);
    const isSale = highlightedTag && highlightedTag.value === 'sale';
    const isNew = highlightedTag && highlightedTag.value === 'neu';

    return {
      articleType,
      tagLabel: highlightedTag && !isSale && !isNew && highlightedTag.value,
      isNew,
      isSale,
      promotionTags,
      sortedPromotionTags,
      highlightedTag,
      showOnlineHint: Boolean(
        articleType === ARTICLE_TYPE__SET ||
          (sortedPromotionTags && sortedPromotionTags.find(tag => tag.value === 'online_produkt')),
      ),
      showClickReserve:
        getVariantStock(this.entity).quantity > 0 &&
        Boolean(
          articleType === ARTICLE_TYPE__SET ||
            !sortedPromotionTags ||
            !sortedPromotionTags.find(tag => tag.value === 'online_produkt'),
        ),
    };
  }

  protected mapColorInformation() {
    const colorId = path(['attributes', ATTRIBUTE_KEY__COLOR, 'values', 'id'], this.entity) as number;
    const color = getAttributeValue(this.entity.attributes, ATTRIBUTE_KEY__PRODUCT_COLOR);

    return {
      colorId,
      colorHex: colorId && boxColorComposition(colorId).colorPattern,
      color,
    };
  }

  protected mapRating() {
    return { rating: null, ratingCount: null };
  }

  protected mapDetails() {
    const promotionAttribute = getAttributeGroupMultiByKey(
      this.entity.attributes,
      ATTRIBUTE_KEY__PROMOTION,
    ) as PromotionAttributeGroup;

    const dimensionAttributes = this.mapDimensionAttributes();
    const materialAttributes = this.mapMaterialAttributes();

    return {
      isPlus: promotionAttribute ? Boolean(promotionAttribute.values.find(tag => tag.value === 'plus_produkt')) : false,
      woodOrigin: getAttributeValue(this.entity.attributes, ATTRIBUTE_KEY__WOORD_ORIGIN),
      fscNote: getAttributeValue(this.entity.attributes, ATTRIBUTE_KEY__FSC),
      showDimensions: values(dimensionAttributes).filter(Boolean).length > 0,
      ...dimensionAttributes,
      showMaterialAttributes: values(materialAttributes).filter(Boolean).length > 0,
      ...materialAttributes,
    };
  }

  protected mapMaterialAttributes() {
    const productionType = getAttributeGroupMultiByKey(this.entity.attributes, ATTRIBUTE_KEY__PRODUCTION_TYPE);

    return {
      materialComposition: getMaterialCompositionStrings(this.entity),
      productionType: productionType && productionType.values.map(value => value.label).join(', '),
    };
  }

  protected mapDimensionAttributes() {
    const fillingQuantity = getAttributeValue(this.entity.attributes, ATTRIBUTE_KEY__FILLING_QUANTITY);
    const fillingQuantityUnit = getAttributeValue(this.entity.attributes, ATTRIBUTE_KEY__FILLING_QUANTITY_UNIT);

    return {
      dimensions: computeDimensionsLabel(this.entity),
      seatHeight: getAttributeValue(this.entity.attributes, ATTRIBUTE_KEY__SEAT_HEIGHT),
      seatDepth: getAttributeValue(this.entity.attributes, ATTRIBUTE_KEY__SEAT_DEPTH),
      seatWidth: getAttributeValue(this.entity.attributes, ATTRIBUTE_KEY__SEAT_WIDTH),
      pileHeight: getAttributeValue(this.entity.attributes, ATTRIBUTE_KEY__PILE_HEIGHT),
      additionalFurnitureDimensions: getAdvancedAttributeValueByKey(
        ADVANCED_ATTRIBUTE_KEY__ADDITIONAL_FURNITURE_MEASUREMENTS,
        this.entity,
      ) as string,
      maxBurningTime: getAttributeValue(this.entity.attributes, ATTRIBUTE_KEY__MAX_BURNING_TIME),
      maxCandleHeight: getAttributeValue(this.entity.attributes, ATTRIBUTE_KEY__MAX_CANDLE_HEIGHT),
      lampCount: getAttributeValue(this.entity.attributes, ATTRIBUTE_KEY__LAMP_COUNT),
      lampsGap: getAttributeValue(this.entity.attributes, ATTRIBUTE_KEY__LAMPS_GAP),
      pictureSize: getAttributeValue(this.entity.attributes, ATTRIBUTE_KEY__PICTURE_SIZE),
      fillingQuantity: fillingQuantity && [fillingQuantity, fillingQuantityUnit].join(' '),
      cushioning: getAttributeValue(this.entity.attributes, ATTRIBUTE_KEY__CUSHIONING),
      abraisonResistance: getAttributeValue(this.entity.attributes, ATTRIBUTE_KEY__ABRAISON_RESISTANCE),
    };
  }

  protected mapHints() {
    const instructions = instructionsConfig.map(convertHint(this.entity, this.translateService)).filter(Boolean);
    const furtherHints = furtherHintsConfig.map(convertHint(this.entity, this.translateService)).filter(Boolean);
    const specialIngredients = getAdvancedAttributeValueByKey(
      ATTRIBUTE_KEY__SPECIAL_INGREDIENTS,
      this.entity,
    ) as string;

    const remainingFurtherHints = remainingFurtherHintsConfig
      .map(convertHint(this.entity, this.translateService))
      .filter(Boolean);

    let warningHints;

    if (this.entity.categories && this.entity.categories.length > 0) {
      warningHints = warningHintsConfig
        // Filter out WARNING HINTS Attribute key if product matches to category ID 550
        .filter(
          config =>
            !(
              flatten(this.entity.categories).find(category => category.categoryId === warningHintsCategoryId) &&
              config.attributeKey === ATTRIBUTE_KEY__WARNING_HINTS
            ),
        )
        .map(convertHint(this.entity, this.translateService))
        .filter(Boolean);
    }

    const moodImageHintAttribute = getImageAttribute(
      IMAGE_ATTRIBUTE_KEY__MOOD_IMAGE_HINT,
      this.entity.images,
    ) as AttributeGroupMulti;
    const moodImageHint = path(['values', 0, 'label'], moodImageHintAttribute) as string;

    return {
      ...this.mapIpuroHints(),
      ...this.mapBatteryWasteIndication(),
      specialIngredients,
      moodImageHint,
      furtherHints,
      instructions,
      remainingFurtherHints,
      warningHints,
    };
  }

  protected mapIpuroHints() {
    let ipuroHints = [];

    const ipuroHintsAttribute = getAttributeGroupMultiByKey(this.entity.attributes, ATTRIBUTE_KEY__IPURO_HINTS);

    if (ipuroHintsAttribute) {
      ipuroHints = ipuroHints.concat(ipuroHintsAttribute.values.map(value => value.label));
    }

    const warningSignsAttribute = getAttributeGroupMultiByKey(this.entity.attributes, ATTRIBUTE_KEY__WARNING_SIGNS);

    return {
      isInflammable:
        warningSignsAttribute && Boolean(warningSignsAttribute.values.find(value => value.id === VALUE_ID_ENFLAMMABLE)),
      isBadForEnvironment:
        warningSignsAttribute && Boolean(warningSignsAttribute.values.find(value => value.id === VALUE_ID_ENVIRONMENT)),
      ipuroHints: ipuroHints.join(' '),
    };
  }

  protected mapBatteryWasteIndication() {
    return {
      withBatteryWaste: Boolean(getAttributeValue(this.entity.attributes, ATTRIBUTE_KEY__BATTERY_DELIVERY_SCOPE)),
    };
  }

  public getImages(size: CDNImageSize = 'large') {
    const imageUrlsWithoutNotValidSeasonsTagImages = this.entity.images
      .filter(img => {
        if (!this.custom.seasonTag || img.attributes[IMAGE_ATTRIBUTE_KEY__SEASON_TAG] == null) {
          return true;
        }

        return img.attributes[IMAGE_ATTRIBUTE_KEY__SEASON_TAG].values.some(({ value }: { value: string }) =>
          this.custom.seasonTag.includes(value.toLowerCase()),
        );
      })
      .map(img =>
        getCdnImageUrl(img.hash, {
          size,
        }),
      );

    // Weird depot requirement
    const firstItem = imageUrlsWithoutNotValidSeasonsTagImages.shift();
    imageUrlsWithoutNotValidSeasonsTagImages.push(firstItem);

    return imageUrlsWithoutNotValidSeasonsTagImages;
  }
}
