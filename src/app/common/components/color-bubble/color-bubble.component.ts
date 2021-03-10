import { Component, Input } from '@angular/core';
import { boxColorComposition } from 'src/app/mappers/bapi/colors';

interface Value {
  id: string;
  name: string;
}

/**
 * Displays a color bubble.
 */
@Component({
  selector: 'app-color-bubble',
  templateUrl: './color-bubble.component.html',
  styleUrls: ['./color-bubble.component.scss'],
})
export class ColorBubbleComponent {
  /** Color metadata,  `name` and  `id` */
  @Input() item: Value;
  /** sets the selected state */
  @Input() selected: boolean;

  /**
   * Function used to retrieve the hex value for the color id
   * @ignore : ignore for documentation in storybook
   */
  getColor = (id: string) => {
    if (id) {
      const colorComposition = boxColorComposition(parseInt(id, 10));
      if (colorComposition) {
        return colorComposition.colorPattern;
      }
    }
  };
}
