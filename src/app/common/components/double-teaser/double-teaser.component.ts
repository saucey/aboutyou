import { Component, Input } from '@angular/core';
import { ContentElement, ContentElementGroupAttributes } from 'src/app/core/shop/types/cms';

/**
 * A double-teaser with which displays a two teasers with background image, head-, subline and a CTA button.
 */
@Component({
  selector: 'app-double-teaser',
  templateUrl: './double-teaser.component.html',
  styleUrls: ['./double-teaser.component.scss'],
})
export class DoubleTeaserComponent {
  /**
   * The input data that contains the content to display. Based on the datastructure of About-You´s CMS.
   * @required
   */
  @Input() teasers: any;

  /** Text-input for the headline. */
  @Input() headline: string;

  /**
   * Conversion of textbox-alignment from CMS-data to HTML
   * @ignore
   */
  getTextboxAlign = (textboxAlign: ContentElementGroupAttributes['textboxAlign']) => {
    return {
      left: 'left',
      right: 'right',
      center: 'center',
    }[textboxAlign];
  };

  /**
   * Conversion of text sizes from CMS-data to HTML
   * @ignore
   */
  getTextTag = (size: ContentElement['attributes']['size']) => {
    return {
      large: 'h2',
      medium: 'h3',
      small: 'h4',
    }[size];
  };

  /**
   * Helper function for linking to the desired content element
   * @ignore
   */
  navigateIfPossible = (element: ContentElement) => {
    const attributes = element.attributes;
    if (attributes && attributes.link) {
      window.location.href = attributes.link.href;
    }
  };
}
