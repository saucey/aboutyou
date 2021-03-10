import { Component, Input } from '@angular/core';
import { Category } from 'src/app/core/shop/types/cms';

/**
 * Dummy HTML Component to display a set of cateogries defined by the shop-hoster.
 * @required
 */
@Component({
  selector: 'app-favorite-categories',
  templateUrl: './favorite-categories.component.html',
  styleUrls: ['./favorite-categories.component.scss'],
})
export class FavoriteCategoriesComponent {
  /**
   * The input data that contains the content to display. Based on the datastructure of About-You´s CMS.
   * @required
   */
  @Input() categories: Category[];

  /** Text-input for the headline. */
  @Input() headline: string;
}
