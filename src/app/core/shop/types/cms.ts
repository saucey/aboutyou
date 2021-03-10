import { BapiProduct } from '@aboutyou/backbone/types/BapiProduct';
import { Dictionary } from 'ramda';

export enum ElementTypes {
  GRID_SLIDER = 'grid_slider',
  GRID_TILES = 'grid_tiles',
  GRID_SLIDER_TRISECTION = 'grid_slider_trisection',
  GRID_POPULAR_CATEGORIES = 'grid_popular_categories',
  GRID_PRODUCT_SLIDER = 'grid_product_slider',
  GRID_DOUBLE_TEASER = 'grid_double_teaser',
  GRID_SEO_TEXT = 'grid_seo_text',
  GRID_NEWSLETTER = 'grid_newsletter',
  GRID_USP = 'grid_usp',
  GRID_HOVER_TEASER = 'grid_hover_teaser',
}

export interface ContentElementAttributes {
  text?: string;
  size?: 'large' | 'small' | 'medium';
  hash?: string;
  tag?: string;
  color?: string;
  link: {
    href?: string;
    target?: '_self' | '_blank';
  };
}

export interface ContentElement {
  type: 'element_headline' | 'element_subline' | 'element_image' | 'element_cta';
  attributes: ContentElementAttributes;
}

export interface ContentElementGroupAttributes {
  area: 'left' | 'right';
  textboxAlign: 'left' | 'right' | 'center';
  backgroundColor: string;
}

export interface ContentElementGroup {
  type: string;
  attributes: ContentElementGroupAttributes;
  elements: ContentElement[];
}

export interface TextElement {
  text: string;
  tag: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  color: string;
}

export interface Link {
  target: '_self' | '_blank';
  href: string;
}

export interface Cta {
  tag: 'button' | 'anchor';
  text: string;
  style: 'primary' | 'secondary' | 'secondary-holo-bright' | 'secondary-holo-dark';
  link: Link;
}

export interface HoverTeaserTile {
  attributes: Dictionary<string | boolean>;
  headline: TextElement;
  subline: TextElement;
  cta: Cta;
  imageUrl: string;
  bgColor: string;
  desktopColumnCount: 'grid_of_three' | 'grid_of_two' | 'grid_of_one';
}

export interface Slide {
  attributes: Dictionary<string | boolean>;
  headline: TextElement;
  subline: TextElement;
  cta: Cta;
  imageUrl: string;
}

export interface Category {
  name: string;
  href: string;
  resourceId: number;
  resourceType: string;
  target: '_self' | '_blank';
}

// Concrete Components
export interface StageModule {
  type: ElementTypes.GRID_SLIDER;
  data: any;
}

export interface DoubleTeaser {
  type: ElementTypes.GRID_DOUBLE_TEASER;
  data: any;
}

export interface TrisectionSliders {
  type: ElementTypes.GRID_SLIDER_TRISECTION;
  headline: string;
  data: any;
}

export interface PopularCategories {
  type: ElementTypes.GRID_POPULAR_CATEGORIES;
  data: {
    headline: string;
    categories: any;
  };
}

export interface ProductsSlider {
  type: ElementTypes.GRID_PRODUCT_SLIDER;
  data: {
    products: BapiProduct[];
    headlines: string;
  };
}

export interface HoverTeaser {
  type: ElementTypes.GRID_HOVER_TEASER;
  data: HoverTeaserTile[];
}

export interface GridTiles {
  type: ElementTypes.GRID_TILES;
  data: any;
  defaultButtonText: string;
  headline: {
    size: string;
    text: string;
  };
}
