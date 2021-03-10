const COLOR_MAPPING = {
  9162: '#d47479',
  18: '#d47479',
  9163: '#461319',
  9164: '#cccc33',
  9165: '#808080',
  9166: '#d854a1',
  9168: '#df7d60',
  9169: '#663300',
  9170: '#ec661b',
  9171: '#fff',
  9173: '#000000',
  9174: '#5d5800',
  9175: '#3dd8ff',
  9176: '#654397',
  9177: '#166333',
  16: '#166333',
  9178: '#fac946',
  9179: '#e52320',
  14: '#e52320',
  9180: '#284a9a',
  9181: '#efebdc',
  9182: '#a87b00',
  9183: '#d67221',
  31: '#d67221',
  9184: '#dadada',
  9167: '####', // Klar -> Multicolor
  9172: '####', // Bunt -> Clear
};

type DetailColorId = keyof typeof COLOR_MAPPING;

export const detailColorToHexCode = (ID: DetailColorId | number) => {
  const code = COLOR_MAPPING[ID];
  if (!code) {
    console.warn(`Cannot resolve color code for \`${ID}\``);
    return null;
  }
  return code;
};

const lightColors: DetailColorId[] = [
  9164, // Lime
  9171,
  9175,
  9178,
  9181,
  9184,
];

export const isLightColor = (id: DetailColorId): boolean => lightColors.includes(id);

const whiteCodeId: DetailColorId = 9171; // weiss
const grayCodeId: DetailColorId = 9165; // grau
const multiColorId: DetailColorId = 9172; // Bunt
const clearColorId: DetailColorId = 9167; // Klar

const getBorderColor = (id: DetailColorId, defaultColor: string): string => {
  if (id === whiteCodeId) {
    const colorHexCode = detailColorToHexCode(grayCodeId);

    if (!colorHexCode) {
      return defaultColor;
    }

    return colorHexCode;
  }

  return defaultColor;
};

type ColorType = 'constant' | 'multicolor';

export const boxColorComposition = (
  id: DetailColorId | number,
): {
  borderColor: string;
  colorPattern: string;
  colorType: ColorType;
} | null => {
  const colorHexCode = detailColorToHexCode(id as DetailColorId);

  if (!colorHexCode) {
    return null;
  }

  if (id === multiColorId) {
    return {
      borderColor: 'transparent',
      colorPattern: `linear-gradient(45deg, rgb(255, 92, 75), rgb(242, 200, 102), rgb(102, 187, 106), rgb(255, 92, 75), cyan, blue, violet) 0% 0% / 200% 100%`, // tslint:disable-line
      colorType: 'multicolor',
    };
  }

  if (id === clearColorId) {
    return {
      borderColor: 'transparent',
      colorPattern: `linear-gradient(45deg, rgba(243, 242, 242, 0.51), rgba(216, 211, 211, 0.53), rgba(194, 194, 194, 0.68), rgba(213, 213, 213, 0.61), #cecece, #ececec, #d0d0d0) 0% 0% / 200% 100%`, // tslint:disable-line
      colorType: 'multicolor',
    };
  }

  return {
    borderColor: getBorderColor(id as DetailColorId, colorHexCode),
    colorPattern: colorHexCode,
    colorType: 'constant',
  };
};
