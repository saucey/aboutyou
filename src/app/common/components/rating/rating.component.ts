import { Component, Input, OnInit, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';

/**
 * Ratings displayed ad stars
 */
@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss'],
})
export class RatingComponent implements OnChanges, OnInit {
  /** Rating value in number */
  @Input() rating: number;
  /** Flag which determines whether to display ratings or not */
  @Input() displayRating: boolean;
  /** Count of rating */
  @Input() ratingCount: string;

  /**
   * state variable for stars array
   * @ignore : ignore for documentation in storybook
   */
  stars: Array<number> = [];

  ngOnInit() {
    this.calculateStars(this.rating);
  }

  ngOnChanges(changes: SimpleChanges) {
    const rating: SimpleChange = changes.rating;

    if (rating) {
      this.calculateStars(rating.currentValue);
    }
  }

  /**
   * This function calculates how many stars to display
   * @ignore : ignore for documentation in storybook
   */
  calculateStars(value: number) {
    const stars = [];
    const lowestInteger = Math.floor(value);

    for (let i = 0; i < lowestInteger; i++) {
      stars.push(1);
    }

    const decimals = this.rating - lowestInteger;
    let remainingStars = 5 - lowestInteger;

    if (decimals > 0.6) {
      stars.push(1);
      remainingStars--;
    }

    if (decimals > 0.3 && decimals < 0.6) {
      stars.push(0.5);
      remainingStars--;
    }

    for (let i = 0; i < remainingStars; i++) {
      stars.push(0);
    }

    this.stars = [].concat(stars);
  }
}
