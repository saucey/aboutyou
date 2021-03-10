import { Component, Input } from '@angular/core';
import { HoverTeaserTile } from 'src/app/core/shop/types/cms';

@Component({
  selector: 'app-hover-teaser',
  templateUrl: './hover-teaser.component.html',
  styleUrls: ['./hover-teaser.component.scss'],
})
export class HoverTeaserComponent {
  @Input() tiles: HoverTeaserTile[];

  /**
   * Interpretation of Column system
   * @ignore
   */
  mapColumnsClass(size: 'grid_of_one' | 'grid_of_two' | 'grid_of_three') {
    switch (size) {
      case 'grid_of_one':
        return 'col-md-12';
      case 'grid_of_two':
        return 'col-md-6';
      case 'grid_of_three':
        return 'col-md-4';
    }
  }

  /**
   * Setter for Background-Image of a slide which is part of a `@tiles`.
   * @ignore
   */
  setBgImage(tile: HoverTeaserTile) {
    const styles = {
      'background-image': 'url(' + tile.imageUrl + ')',
    };
    return styles;
  }
}
