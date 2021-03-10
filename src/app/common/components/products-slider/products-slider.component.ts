import { Component, ElementRef, Input, OnInit } from '@angular/core';

export interface SliderProduct {
  /** same as bapi product id */
  id: number;
  imageSrc: string;
  title: string;
  subtitle: string;
}

/**
 * A slider component for products.
 * The products are choosen by the shop hoster, no endless sliding.
 */
@Component({
  selector: 'app-products-slider',
  templateUrl: './products-slider.component.html',
  styleUrls: ['./products-slider.component.scss'],
})
export class ProductsSliderComponent implements OnInit {
  /** Bapi-data for the products to be displayed */
  @Input() products: SliderProduct[];

  /** Simple text-input for the headline */
  @Input() headline: string;

  /** Items displayed per row of desktop */
  @Input() itemsPerRow = 5;

  /** current Product to be displayed at the first position */
  currentProduct: number;

  /** Queue to preload images for the products-slider */
  public previewQueue = [];

  /** constant for width of a product */
  private slideItemWidth = 216;

  constructor(public el: ElementRef<any>) {
    this.el = el;
    this.currentProduct = 0;
  }

  public ngOnInit() {
    if (this.products && this.products.length > 0) {
      // Jump to first image
      this.nextQueue();
    }
  }

  /**
   * sliding to prev product
   * @ignore
   */
  prev() {
    const previousProduct = this.currentProduct - 1 >= 0 ? this.currentProduct - 1 : this.products.length - 1;
    this.setCurrentProduct(previousProduct);
  }

  /**
   * sliding to next product
   * @ignore
   */
  next() {
    const nextProduct = this.currentProduct + 1 >= this.products.length ? 0 : this.currentProduct + 1;

    this.setCurrentProduct(nextProduct);
  }

  /**
   * sliding to the index provided
   * @ignore
   */
  setCurrentProduct(i: number) {
    this.currentProduct = i;

    this.adjustXCoordinate();
    this.nextQueue();
  }

  /**
   * helper function to que up products to be rendered before they are visible
   * @ignore
   */
  nextQueue() {
    this.previewQueue.push(this.products[this.currentProduct]);

    if (this.previewQueue.length > 5) {
      this.previewQueue.shift();
    }
  }

  /**
   * rebase the slider and x-coordinate that needs to be executed on window resize etc.
   * @ignore
   */
  adjustXCoordinate() {
    const htmlElements = this.el.nativeElement.querySelectorAll('.item');
    const itemsCount = htmlElements.length;
    const itemsPerRow = this.itemsPerRow;

    if (itemsCount <= itemsPerRow) {
      [...htmlElements].map(item => (item.style.transform = `translate3d(0px, 0, 0)`));
      return;
    }

    const X = this.currentProduct * this.slideItemWidth * -1;

    [...this.el.nativeElement.querySelectorAll('.item')].map(
      item => (item.style.transform = `translate3d(${X}px, 0, 0)`),
    );
  }
}
