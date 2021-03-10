import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgbCarousel, NgbSlideEvent } from '@ng-bootstrap/ng-bootstrap';

export interface ContentElementAttributes {
  name: string;
  backgroundColor: string;
  images: {
    attributes: {
      hash: string;
    };
  }[];
  products: {
    attributes: {
      productId: number;
      image: {
        hash: string;
      };
    };
  }[];
}

export interface ContentElement {
  type: 'bundle';
  attributes: ContentElementAttributes;
}

/**
 * Content tiles to display bundle products/ shop the look.
 */
@Component({
  selector: 'app-content-plp-bundle-tile',
  templateUrl: './bundle-tile.component.html',
  styleUrls: ['./bundle-tile.component.scss'],
})
export class ContentPLPBundleTileComponent implements OnInit {
  /** Main label */
  @Input() shopTheLookLabel: string;
  /** Label for the main */
  @Input() discoverLabel: string;
  /** Mode of the tile. Can be `'single_bundle_tile' | 'double_bundle_tile'` */
  @Input() type: 'single_bundle_tile' | 'double_bundle_tile';
  /** Content elements */
  @Input() elements: ContentElement[];
  /** Boolean which tells if the bundle is wishlisted or not */
  @Input() isWishlisted: boolean;
  /** Boolean which tells if the wishlist button has to be displayed or not */
  @Input() showWishlistButton: boolean;
  /** Function which gets called when clicking on the tile */
  @Input() onClick: (productId: number) => void;
  /** Function which get called when clicking the wishlist button */
  @Input() onWishlistClick: (productId: number) => void;

  /**
   * variable to capture the carousel reference
   * @ignore : ignore for documentation in storybook
   */
  @ViewChild(NgbCarousel, { static: false }) carousel: NgbCarousel;

  /**
   * state for the active product in focus
   * @ignore : ignore for documentation in storybook
   */
  activeId: number;

  ngOnInit() {
    this.activeId = this.elements[0].attributes.products[0].attributes.productId;
  }

  /**
   * Handles click on tiles
   * @ignore : ignore for documentation in storybook
   */
  onClickHandler = (event: Event) => {
    event.preventDefault();
    event.stopPropagation();
    if (this.onClick) {
      this.onClick(this.activeId);
    }
  };

  /**
   * Handles swipe on the images
   * @ignore : ignore for documentation in storybook
   */
  onSwipeLeft() {
    this.carousel.prev();
  }

  /**
   * Handles swipe on the images
   * @ignore : ignore for documentation in storybook
   */
  onSwipeRight() {
    this.carousel.next();
  }

  /**
   * Handles change of the active element in the carousel
   * @ignore : ignore for documentation in storybook
   */
  onChange = (event: NgbSlideEvent) => {
    this.activeId = parseInt(event.current, 0);
  };

  /**
   * handles the click on the module
   * @ignore : ignore for documentation in storybook
   */
  onOuterLinkClick = (event: Event) => {
    event.preventDefault();
    event.stopPropagation();
  };

  /**
   * Handles click on the wishlist button
   * @ignore : ignore for documentation in storybook
   */
  onWishlistIconClick = (event: Event) => {
    event.preventDefault();
    event.stopPropagation();

    if (this.onWishlistClick) {
      this.onWishlistClick(this.activeId);
    }
  };
}
