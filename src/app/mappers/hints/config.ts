import {
  ATTRIBUTE_KEY__BATTERIES,
  ATTRIBUTE_KEY__CLEANING,
  ATTRIBUTE_KEY__DRYER,
  ATTRIBUTE_KEY__FOOD_HINTS,
  ATTRIBUTE_KEY__FORM_COLOR_DEVIATION,
  ATTRIBUTE_KEY__FOR_OUTDOOR,
  ATTRIBUTE_KEY__FREEZE_SAFE,
  ATTRIBUTE_KEY__FURNITURE_FURTHER_HINTS,
  ATTRIBUTE_KEY__FURNITURE_HINTS,
  ATTRIBUTE_KEY__IRONING,
  ATTRIBUTE_KEY__LAUNDRY,
  ATTRIBUTE_KEY__MAX_COLD,
  ATTRIBUTE_KEY__MAX_ENDURANCE,
  ATTRIBUTE_KEY__MAX_ENDURANCE_PER_LAYER,
  ATTRIBUTE_KEY__MAX_HEAT,
  ATTRIBUTE_KEY__PILLOW_CASE_CHANGEABLE,
  ATTRIBUTE_KEY__SEAT_CUSHION,
  ATTRIBUTE_KEY__WARNING_HINTS,
  ATTRIBUTE_KEY__BATTERY_DELIVERY_SCOPE,
  ATTRIBUTE_KEY__BATTERY_TYPE_1,
  ATTRIBUTE_KEY__BATTERY_TYPE_2,
  ATTRIBUTE_KEY__BATTERY_SIZE_1,
  ATTRIBUTE_KEY__BATTERY_SIZE_2,
  ATTRIBUTE_KEY__BATTERY_AMOUNT_1,
  ATTRIBUTE_KEY__BATTERY_AMOUNT_2,
  ATTRIBUTE_KEY__POWERSUPPLY_METHOD,
  ATTRIBUTE_KEY__DISH_WASHER_COMPATIBLE,
  ATTRIBUTE_KEY__MICROWAVE_COMPATIBLE,
  ATTRIBUTE_KEY__STOVE_COMPATIBLE,
  ATTRIBUTE_KEY__FREEZER_COMPATIBLE,
  ATTRIBUTE_KEY__WATER_PROOF,
  ATTRIBUTE_KEY__FLOWER_POT_HINT,
  ATTRIBUTE_KEY__LIGHT_REALITY,
  ATTRIBUTE_KEY__LIGHT_UTILS,
  ATTRIBUTE_KEY__FRAME,
  ATTRIBUTE_KEY__MAX_PERFORMANCE,
  ATTRIBUTE_KEY__LOWER_LIGHTNING_ABILITY,
  ATTRIBUTE_KEY__ASSIGNMENT_LENGTH,
  ATTRIBUTE_KEY__REPLACEMENT_LAMPS,
  ATTRIBUTE_KEY__REPLACEMENT_LAMPS_COUNT,
  ATTRIBUTE_KEY__FUNCTIONS,
  ATTRIBUTE_KEY__BLEACHING,
  ATTRIBUTE_KEY__RETAIL_HINT_DE,
} from '../bapi/constants';
import {
  ConvertAttributeFunction,
  convertSingleValueLabel,
  convertBooleanLabel,
  convertLabelValuesToTextLine,
  convertKeyValueLabel,
  convertBatteryInformation,
  convertLabelValuesToTextLineCommaSeparated,
} from './helpers';
import { AttributeGroupSingle, AttributeGroupMulti } from '@aboutyou/backbone/types/BapiProduct';

export interface HintConfiguration {
  fn: ConvertAttributeFunction<AttributeGroupSingle | AttributeGroupMulti>;
  attributeKey: string | string[];
}

export const VALUE_ID_ENVIRONMENT = 6983;
export const VALUE_ID_ENFLAMMABLE = 6984;
export const VALUE_ID_SPECIAL_INGREDIENT_LAST = 9302;

export const furtherHintsConfig: HintConfiguration[] = [
  {
    attributeKey: ATTRIBUTE_KEY__FORM_COLOR_DEVIATION,
    fn: convertSingleValueLabel,
  },
  {
    attributeKey: ATTRIBUTE_KEY__SEAT_CUSHION,
    fn: convertSingleValueLabel,
  },
  {
    attributeKey: ATTRIBUTE_KEY__PILLOW_CASE_CHANGEABLE,
    fn: convertBooleanLabel,
  },
  {
    attributeKey: ATTRIBUTE_KEY__FURNITURE_FURTHER_HINTS,
    fn: convertLabelValuesToTextLine,
  },
  {
    attributeKey: ATTRIBUTE_KEY__FOR_OUTDOOR,
    fn: convertKeyValueLabel,
  },
  {
    attributeKey: ATTRIBUTE_KEY__FREEZE_SAFE,
    fn: convertKeyValueLabel,
  },
  {
    attributeKey: ATTRIBUTE_KEY__MAX_HEAT,
    fn: convertKeyValueLabel,
  },
  {
    attributeKey: ATTRIBUTE_KEY__MAX_COLD,
    fn: convertKeyValueLabel,
  },
  {
    attributeKey: [
      ATTRIBUTE_KEY__BATTERY_DELIVERY_SCOPE,
      ATTRIBUTE_KEY__BATTERY_TYPE_1,
      ATTRIBUTE_KEY__BATTERY_TYPE_2,
      ATTRIBUTE_KEY__BATTERY_SIZE_1,
      ATTRIBUTE_KEY__BATTERY_SIZE_2,
      ATTRIBUTE_KEY__BATTERY_AMOUNT_1,
      ATTRIBUTE_KEY__BATTERY_AMOUNT_2,
    ],
    fn: convertBatteryInformation,
  },
];

export const remainingFurtherHintsConfig: HintConfiguration[] = [
  {
    attributeKey: ATTRIBUTE_KEY__POWERSUPPLY_METHOD,
    fn: convertSingleValueLabel,
  },
  {
    attributeKey: ATTRIBUTE_KEY__DISH_WASHER_COMPATIBLE,
    fn: convertKeyValueLabel,
  },
  {
    attributeKey: ATTRIBUTE_KEY__MICROWAVE_COMPATIBLE,
    fn: convertBooleanLabel,
  },
  {
    attributeKey: ATTRIBUTE_KEY__STOVE_COMPATIBLE,
    fn: convertBooleanLabel,
  },
  {
    attributeKey: ATTRIBUTE_KEY__FREEZER_COMPATIBLE,
    fn: convertBooleanLabel,
  },
  {
    attributeKey: ATTRIBUTE_KEY__WATER_PROOF,
    fn: convertBooleanLabel,
  },
  {
    attributeKey: ATTRIBUTE_KEY__FLOWER_POT_HINT,
    fn: convertSingleValueLabel,
  },
  {
    attributeKey: ATTRIBUTE_KEY__LIGHT_REALITY,
    fn: convertKeyValueLabel,
  },
  {
    attributeKey: ATTRIBUTE_KEY__LIGHT_UTILS,
    fn: convertKeyValueLabel,
  },
  {
    attributeKey: ATTRIBUTE_KEY__FRAME,
    fn: convertKeyValueLabel,
  },
  {
    attributeKey: ATTRIBUTE_KEY__MAX_PERFORMANCE,
    fn: convertKeyValueLabel,
  },
  {
    attributeKey: ATTRIBUTE_KEY__LOWER_LIGHTNING_ABILITY,
    fn: convertKeyValueLabel,
  },
  {
    attributeKey: ATTRIBUTE_KEY__FUNCTIONS,
    fn: convertLabelValuesToTextLineCommaSeparated,
  },
  {
    attributeKey: ATTRIBUTE_KEY__ASSIGNMENT_LENGTH,
    fn: convertKeyValueLabel,
  },
  {
    attributeKey: ATTRIBUTE_KEY__REPLACEMENT_LAMPS,
    fn: convertSingleValueLabel,
  },
  {
    attributeKey: ATTRIBUTE_KEY__REPLACEMENT_LAMPS_COUNT,
    fn: convertKeyValueLabel,
  },
  {
    attributeKey: ATTRIBUTE_KEY__RETAIL_HINT_DE,
    fn: convertSingleValueLabel,
  },
];

export const instructionsConfig: HintConfiguration[] = [
  {
    attributeKey: ATTRIBUTE_KEY__LAUNDRY,
    fn: convertSingleValueLabel,
  },
  {
    attributeKey: ATTRIBUTE_KEY__IRONING,
    fn: convertSingleValueLabel,
  },
  {
    attributeKey: ATTRIBUTE_KEY__CLEANING,
    fn: convertSingleValueLabel,
  },
  {
    attributeKey: ATTRIBUTE_KEY__DRYER,
    fn: convertSingleValueLabel,
  },
  {
    attributeKey: ATTRIBUTE_KEY__BLEACHING,
    fn: convertSingleValueLabel,
  },
  {
    attributeKey: ATTRIBUTE_KEY__FURNITURE_HINTS,
    fn: convertLabelValuesToTextLine,
  },
];

export const warningHintsConfig: HintConfiguration[] = [
  {
    attributeKey: ATTRIBUTE_KEY__WARNING_HINTS,
    fn: convertLabelValuesToTextLine,
  },
  {
    attributeKey: ATTRIBUTE_KEY__MAX_ENDURANCE,
    fn: convertKeyValueLabel,
  },
  {
    attributeKey: ATTRIBUTE_KEY__MAX_ENDURANCE_PER_LAYER,
    fn: convertKeyValueLabel,
  },
  {
    attributeKey: ATTRIBUTE_KEY__FOOD_HINTS,
    fn: convertLabelValuesToTextLine,
  },
  {
    attributeKey: ATTRIBUTE_KEY__BATTERIES,
    fn: convertSingleValueLabel,
  },
];
