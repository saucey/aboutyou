import { Component, Input, ViewChild } from '@angular/core';
import { NgbCarousel } from '@ng-bootstrap/ng-bootstrap';
import { CdnBaseUrl } from 'src/app/core/shop/utils';
import { Slide, ContentElement, ContentElementGroupAttributes } from 'src/app/core/shop/types/cms';

/**
 * Slidable Teaser Component which is seperated into 3 columns on desktop and 2 columns on a mobile view.
 * Each column can display a background image, head-, subline and a CTA button.
 */
@Component({
  selector: 'app-trisection',
  templateUrl: './trisection.component.html',
  styleUrls: ['./trisection.component.scss'],
})
export class TrisectionComponent {
  /**
   * The input data that contains the content to display. Based on the datastructure of About-You´s CMS.
   * @required
   */
  @Input() trisectionSlides: Slide[];

  /** Text-input for the headline. */
  @Input() headline: string;

  /** The action that should be executed on click of a slide. */
  @Input() callback: (element: ContentElement) => void;

  /** The HTML Reference to the ng-bootstrap carousel object. */
  @ViewChild(NgbCarousel, { static: false }) carousel: NgbCarousel;

  /**
   * Helper to build Url for fetching images
   * @ignore
   */
  getCdnUrl = (hash: string) => {
    return CdnBaseUrl + hash;
  };

  /**
   * Swipe left function to trigger ng-bootstrap caruousel
   * @ignore
   */
  onSwipeLeft() {
    this.carousel.prev();
  }

  /**
   * Swipe right function to trigger ng-bootstrap caruousel
   * @ignore
   */
  onSwipeRight() {
    this.carousel.next();
  }

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
}
