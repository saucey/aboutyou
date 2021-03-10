import { Component, Input } from '@angular/core';

export interface ContentElementAttributes {
  text?: string;
  size?: 'large' | 'small' | 'medium';
  hash?: string;
  tag?: string;
  color?: string;
  link?: {
    href?: string;
    target?: '_self' | '_blank';
  };
}

export interface ContentElement {
  type: 'element_headline' | 'element_subline' | 'element_image' | 'element_cta';
  attributes: ContentElementAttributes;
}

export interface ContentElementGroupAttributes {
  area?: 'left' | 'right';
  textboxAlign?: 'left' | 'right' | 'center';
  backgroundColor?: string;
}

export interface ContentElementGroup {
  type: string;
  attributes: ContentElementGroupAttributes;
  elements: ContentElement[];
}

/**
 * Content tiles to display single/double/grid_of_two tiles.
 */
@Component({
  selector: 'app-content-plp-grid-tile',
  templateUrl: './plp-grid-tile.component.html',
  styleUrls: ['./plp-grid-tile.component.scss'],
})
export class ContentPLPGridTileComponent {
  /** Mode of the tile. Can be `'single_tile' | 'double_tile' | 'grid_of_two_aligned'` */
  @Input() type: 'single_tile' | 'double_tile' | 'grid_of_two_aligned';
  /** Content elements */
  @Input() elementGroups: ContentElementGroup[];

  /**
   * gets the element tag based on text size
   * @ignore : ignore for documentation in storybook
   */
  getTextTag = (size: ContentElement['attributes']['size']) =>
    ({
      large: 'h1',
      medium: 'h2',
      small: 'h4',
    }[size]);

  /**
   * gets the element alignment based on the elementGroup attribute
   * @ignore : ignore for documentation in storybook
   */
  getTextboxAlign = (textboxAlign: ContentElementGroupAttributes['textboxAlign']) =>
    ({
      left: 'left',
      right: 'right',
      center: 'center',
    }[textboxAlign]);

  /**
   * gets the element alignment based on elementGroup are attribute
   * @ignore : ignore for documentation in storybook
   */
  getElementGroupForArea = (query: ContentElementGroupAttributes['area']) =>
    this.elementGroups.find(({ attributes: { area } }) => area === query);

  /**
   * Handles navigation to the link attribute, if possible
   * @ignore : ignore for documentation in storybook
   */
  navigateIfPossible = (element: ContentElement) => {
    if (element.attributes && element.attributes.link) {
      window.location.href = element.attributes.link.href;
    }
  };
}
