import { Component, Input } from '@angular/core';

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

export interface Tiles {
  defaultButtonText: string;
  loaded: boolean;
  headline: {
    size: string;
    text: string;
  };
  data: ContentElementGroup;
}
/**
 * A Set of Tiles that display / teaser products or catagories. Displays different button on Hover.
 * Can have different layouts depeneding on the passed data.
 */
@Component({
  selector: 'app-grid-tiles',
  templateUrl: './grid-tiles.component.html',
  styleUrls: ['./grid-tiles.component.scss'],
})
export class GridTilesComponent {
  /**
   * The input data that contains the content to display. Based on the datastructure of About-You´s CMS.
   * @required
   */
  @Input() tiles: Tiles;

  /** Text input as a fallback for the text of a CTA-Button */
  @Input() defaultButtonText: string;

  /**
   * Helper function to link to the desired content element
   * @ignore
   */
  navigateIfPossible = (element: ContentElement) => {
    if (element.attributes && element.attributes.link) {
      window.location.href = element.attributes.link.href;
    }
  };
}
