import { BapiProduct } from '@aboutyou/backbone';
import { getAttributeValue } from 'src/app/core/shop/utils/bapi/product/get-attribute';
import {
  ATTRIBUTE_KEY__PRODUCT_CONTENT_MEASURMENT_UNIT,
  ATTRIBUTE_KEY__PRODUCT_CONTENT_VALUE,
  ATTRIBUTE_KEY__PRODUCT_DEPTH,
  ATTRIBUTE_KEY__PRODUCT_DIAMETER,
  ATTRIBUTE_KEY__PRODUCT_HEIGHT,
  ATTRIBUTE_KEY__PRODUCT_LENGTH,
  ATTRIBUTE_KEY__PRODUCT_MEASUREMENT_UNIT,
  ATTRIBUTE_KEY__PRODUCT_WEIGHT,
  ATTRIBUTE_KEY__PRODUCT_WIDTH,
} from './constants';

const getBaseMeasurements = (product: BapiProduct) => {
  const length = getAttributeValue(product.attributes, ATTRIBUTE_KEY__PRODUCT_LENGTH);
  const height = getAttributeValue(product.attributes, ATTRIBUTE_KEY__PRODUCT_HEIGHT);
  const width = getAttributeValue(product.attributes, ATTRIBUTE_KEY__PRODUCT_WIDTH);
  const diameter = getAttributeValue(product.attributes, ATTRIBUTE_KEY__PRODUCT_DIAMETER);
  const depth = getAttributeValue(product.attributes, ATTRIBUTE_KEY__PRODUCT_DEPTH);

  const dimensions: string[] = [];

  if (length) {
    dimensions.push(`L:${length}`);
  }

  if (width) {
    dimensions.push(`B:${width}`);
  }

  if (diameter) {
    dimensions.push(`⌀ ${diameter}`);
  }

  if (height) {
    dimensions.push(`H:${height}`);
  }

  if (depth) {
    dimensions.push(`T:${depth}`);
  }

  return dimensions.join(' x ');
};

const getProductWeightMeasurementsLabel = (product: BapiProduct) => {
  const measurementUnit = getAttributeValue(product.attributes, ATTRIBUTE_KEY__PRODUCT_MEASUREMENT_UNIT);
  const productWeight = getAttributeValue(product.attributes, ATTRIBUTE_KEY__PRODUCT_WEIGHT);
  const contentMeasurementUnit = getAttributeValue(product.attributes, ATTRIBUTE_KEY__PRODUCT_CONTENT_MEASURMENT_UNIT);
  const contentValue = getAttributeValue(product.attributes, ATTRIBUTE_KEY__PRODUCT_CONTENT_VALUE);

  let label = '';

  if (measurementUnit) {
    label += ` ${measurementUnit}`;
  }

  if (contentValue) {
    label += ` ${contentValue}`;
  }

  if (productWeight) {
    label += ` ${productWeight}`;
  }

  if (contentMeasurementUnit) {
    label += ` ${contentMeasurementUnit}`;
  }

  return label;
};

export const computeDimensionsLabel = (product: BapiProduct) => {
  const baseMeasurementLabel = getBaseMeasurements(product);
  const productWeightMeasurementLabel = getProductWeightMeasurementsLabel(product);

  if (baseMeasurementLabel.length > 0) {
    return baseMeasurementLabel + productWeightMeasurementLabel;
  }

  return null;
};
