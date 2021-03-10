import { Component, Input, ViewChild } from '@angular/core';
import { NgbCarousel } from '@ng-bootstrap/ng-bootstrap';
import { Slide } from 'src/app/core/shop/types/cms';

/**
 * A full-width teaser with slide functionality. It displays a full-width background image, head-, subline and a CTA button.
 */
@Component({
  selector: 'app-stage-module',
  templateUrl: './stage-module.component.html',
  styleUrls: ['./stage-module.component.scss'],
})
export class StageModuleComponent {
  /**
   * The input data that contains the content to display. Based on the datastructure of About-You´s CMS.
   * @required
   */
  @Input() slides: Slide[] = [];

  /** The HTML Reference to the ng-bootstrap carousel object */
  @ViewChild(NgbCarousel, { static: false }) carousel: NgbCarousel;

  /**
   * Swipe left function to trigger ng-bootstrap caruousel
   * @ignore
   */

  onSwipeLeft() {
    this.carousel.next();
  }

  /**
   * Swipe right function to trigger ng-bootstrap caruousel
   * @ignore
   */
  onSwipeRight() {
    this.carousel.prev();
  }

  /**
   *  Setter for Background-Image of a slide which is part of a `@slides`.
   * @ignore
   */
  setBgImage(slide: Slide) {
    const styles = {
      'background-image': 'url(' + slide.imageUrl + ')',
    };
    return styles;
  }
}
