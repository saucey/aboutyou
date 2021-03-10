export const convertAttributes = (attributes: any): any => {
  return {
    ctaHidden: attributes.ctaHidden,
    sublineFirst: attributes.sublineFirst,
    textboxAlign: 'text-' + attributes.textboxAlign,
  };
};

export const convertStyleClasses = (style: string): string => {
  switch (style) {
    case 'secondary-holo-light': {
      // statements;
      return 'secondary holo-light';
    }
    case 'secondary-holo-dark': {
      // statements;
      return 'secondary holo-dark';
    }
    default: {
      return style;
    }
  }
};

export const getTextTagForHeadlines = (size: 'large' | 'medium' | 'small', isHeadline: boolean): string => {
  switch (size) {
    case 'large': {
      // statements;
      return isHeadline ? 'h1' : 'h2';
    }
    case 'medium': {
      // statements;
      return isHeadline ? 'h3' : 'h4';
    }
    case 'small': {
      return isHeadline ? 'h5' : 'h6';
    }
  }
};
