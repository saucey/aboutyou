import { BapiProduct } from '@aboutyou/backbone';
import { AttributeGroupMulti, AttributeGroupSingle } from '@aboutyou/backbone/types/BapiProduct';
import { TranslateService } from '@ngx-translate/core';
import { getAttributeByKey } from 'src/app/core/shop/utils';
import { HintConfiguration } from './config';

export type ConvertAttributeFunction<T extends AttributeGroupSingle | AttributeGroupMulti> = (
  translateService?: TranslateService,
) => (...attribute: T[]) => string | undefined | null;

export const convertSingleValueLabel: ConvertAttributeFunction<AttributeGroupSingle> = () => (
  attribute: AttributeGroupSingle,
) => attribute.values.label;
export const convertBooleanLabel: ConvertAttributeFunction<AttributeGroupSingle> = () => (
  attribute: AttributeGroupSingle,
) => attribute.values.value === 'ja' && attribute.label;
export const convertLabelValuesToTextLine: ConvertAttributeFunction<AttributeGroupMulti> = () => (
  attribute: AttributeGroupMulti,
) => attribute.values.map(value => value.label).join(' ');
export const convertLabelValuesToTextLineCommaSeparated: ConvertAttributeFunction<AttributeGroupMulti> = () => (
  attribute: AttributeGroupMulti,
) => attribute.values.map(value => value.label).join(', ');
export const convertKeyValueLabel: ConvertAttributeFunction<AttributeGroupSingle> = () => (
  attribute: AttributeGroupSingle,
) => `${attribute.label}: ${(attribute as AttributeGroupSingle).values.label}`;

export const convertBatteryComponent = (
  batterySingular: string,
  batteryPlural: string,
  amount: AttributeGroupSingle,
  size: AttributeGroupSingle,
  type: AttributeGroupSingle,
) => {
  const batteryComponentStrings = [];
  let batteryWord = batterySingular;

  if (amount) {
    batteryComponentStrings.push(amount.values.label + 'x');

    if (Number(amount.values.label) > 1) {
      batteryWord = batteryPlural;
    }
  }

  if (size) {
    batteryComponentStrings.push(size.values.label);
  }

  if (type) {
    batteryComponentStrings.push(type.values.label);
  }

  if (batteryComponentStrings.length > 0) {
    batteryComponentStrings.push(batteryWord);
  }

  return batteryComponentStrings.join(' ');
};

export const joinBatteryInformation = (deliveryScope: AttributeGroupSingle, batteries: string[]) => {
  let label = '';

  if (deliveryScope) {
    label = deliveryScope.values.label;
  }

  if (batteries.length > 0) {
    label += ` (${batteries.join(', ')})`;
  }

  return label;
};

export const convertBatteryInformation: ConvertAttributeFunction<AttributeGroupSingle> = (
  translateService?: TranslateService,
) => (
  deliveryScope: AttributeGroupSingle,
  batteryType1: AttributeGroupSingle,
  batteryType2: AttributeGroupSingle,
  batterySize1: AttributeGroupSingle,
  batterySize2: AttributeGroupSingle,
  batteryAmount1: AttributeGroupSingle,
  batteryAmount2: AttributeGroupSingle,
) => {
  let batterySingular;
  let batteryPlural;

  translateService.get('PRODUCT_DETAIL.hints.batterySingular').subscribe((res: string) => (batterySingular = res));
  translateService.get('PRODUCT_DETAIL.hints.batteryPlural').subscribe((res: string) => (batteryPlural = res));

  const batteries = [];

  if (batteryType1 || batterySize1) {
    batteries.push(convertBatteryComponent(batterySingular, batteryPlural, batteryAmount1, batterySize1, batteryType1));
  }

  if (batteryType2 || batterySize2) {
    batteries.push(convertBatteryComponent(batterySingular, batteryPlural, batteryAmount2, batterySize2, batteryType2));
  }

  return joinBatteryInformation(deliveryScope, batteries);
};

export const convertPowerSupplyMethods: ConvertAttributeFunction<AttributeGroupSingle> = (
  translateService?: TranslateService,
) => (supplyMethod1: AttributeGroupSingle, supplyMethod2: AttributeGroupSingle) => {
  const supplyMethods = [];

  if (supplyMethod1) {
    supplyMethods.push(convertSingleValueLabel(translateService)(supplyMethod1));
  }

  if (supplyMethod2) {
    supplyMethods.push(convertSingleValueLabel(translateService)(supplyMethod2));
  }

  let label: string;

  if (supplyMethods.length === 1) {
    translateService
      .get('PRODUCT_DETAIL.hints.powerSupplyMethodWithOne', { method1: supplyMethods[0] })
      .subscribe(res => (label = res));
  }

  if (supplyMethods.length === 2) {
    translateService
      .get('PRODUCT_DETAIL.hints.powerSupplyMethodWithTwo', { method1: supplyMethods[0], method2: supplyMethods[1] })
      .subscribe(res => (label = res));
  }

  return label;
};

export const convertHint = (product: BapiProduct, translateService: TranslateService) => (
  item: HintConfiguration,
): string => {
  if (typeof item.attributeKey !== 'string') {
    return;
  }
  const attributeKeys = [item.attributeKey];
  let attributes = attributeKeys.map(attr => getAttributeByKey(product.attributes, attr));
  if (attributes.length === 1) {
    attributes = attributes.filter(Boolean);
  }
  if (attributes.length > 0) {
    return item.fn(translateService)(...attributes);
  }
};
