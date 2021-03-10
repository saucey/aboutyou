import { animate, style, transition, trigger } from '@angular/animations';
import { Component, HostListener, Input } from '@angular/core';
import { NavbarCategory } from 'src/app/core/shop/types';
import { collectAllNodes } from 'src/app/core/shop/utils';
import equals from 'ramda/es/equals';

/**
 * A versatile menu for navigation.
 *
 *  **When To Use**
 *
 * Allows users to move around the site quickly and efficiently.
 * Top navigation provides all the categories and functions of the website.
 *  Side navigation provides the multi-level structure of the website.
 */
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  animations: [
    trigger('enterAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(2%)' }),
        animate('0.5s ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate('0.2s', style({ opacity: 0, transform: 'translateY(3%)' })),
      ]),
    ]),
  ],
})
export class NavbarComponent {
  /** Categories to display as an Array */
  @Input() items: NavbarCategory[];
  /** Sets the active Category */
  @Input() activeItem: NavbarCategory;
  /** Function called when a Category is clicked */
  @Input() onCategoryClick: (item: NavbarCategory) => void;

  /**
   * state variable for the menuOpen state
   * @ignore : ignore for documentation in storybook
   */
  menuOpen: boolean;
  /**
   * state variable for the focused Category
   * @ignore : ignore for documentation in storybook
   */
  focusedCategory: NavbarCategory;

  /**
   * Handles mouse enter on the component
   * @ignore : ignore for documentation in storybook
   */
  @HostListener('mouseenter')
  mouseEnterHandler() {
    this.menuOpen = true;
  }

  /**
   * Handles mouse leave on the component
   * @ignore : ignore for documentation in storybook
   */
  @HostListener('mouseleave')
  mouseLeaveHandler() {
    this.menuOpen = false;
    this.focusedCategory = undefined;
  }

  /**
   * Handles clicks on any category link
   * @ignore : ignore for documentation in storybook
   */
  handleLinkClick = (event: Event, item: NavbarCategory) => {
    event.preventDefault();
    event.stopPropagation();

    this.mouseLeaveHandler();
    if (this.onCategoryClick) {
      this.onCategoryClick(item);
    }
  };

  /**
   * Handles mouse enter on a main category element
   * @ignore : ignore for documentation in storybook
   */
  onCategoryFocus = (item: NavbarCategory) => {
    this.menuOpen = true;
    this.focusedCategory = item;
  };

  /**
   * Checks if an category item is active or not
   * @ignore : ignore for documentation in storybook
   */
  isItemActive = (item: NavbarCategory) => {
    return (
      !this.focusedCategory &&
      Boolean(equals(item, this.activeItem) || collectAllNodes(item.children).find(equals(this.activeItem)))
    );
  };

  /**
   * gets classes to be applied on a category element
   * @ignore : ignore for documentation in storybook
   */
  getMainCategoryClass = (item: NavbarCategory): string[] => [
    'main-item',
    this.isItemActive(item) ? 'active' : '',
    item === this.focusedCategory ? 'focused' : '',
    item.highlight ? 'highlight' : '',
  ];
}
