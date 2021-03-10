import { Component, Input, OnInit } from '@angular/core';
import path from 'ramda/es/path';
import { NavbarCategory, IAugmentedCategory } from 'src/app/core/shop/types';
import { computeState } from 'src/app/core/shop/utils';

/**
 * A versatile menu for navigation.
 *
 *  **When To Use**
 *
 * This component allows users to move around the site quickly and efficiently.
 *  Side navigation provides the multi-level structure of the website.
 */
@Component({
  selector: 'app-mobile-nav',
  templateUrl: './mobile-nav.component.html',
  styleUrls: ['./mobile-nav.component.scss'],
})
export class MobileNavComponent implements OnInit {
  /** Categories to display as an Array */
  @Input() items: NavbarCategory[];
  /** Function called when a Category is selected */
  @Input() onSelect: (category: NavbarCategory) => void;
  /** Function called when the opened state is changes */
  @Input() openedChanged: (opened: boolean) => void;
  /** Sets the active Category */
  @Input() activeCategory?: NavbarCategory;
  /** Sets the label to display on the Link to go back to root level */
  @Input() goBackLabel?: string;
  /** Sets the label to display on the `Show all child categories` row */
  @Input() showAllLabel?: string;

  /**
   * state variable for the selected Item
   * @ignore : ignore for documentation in storybook
   */
  selectedItem: IAugmentedCategory;
  /**
   * state variable for the current Parent category
   * @ignore : ignore for documentation in storybook
   */
  parent: IAugmentedCategory;
  /**
   * state variable for the current children
   * @ignore : ignore for documentation in storybook
   */
  children: IAugmentedCategory[];

  ngOnInit() {
    this.setState();
  }

  /**
   * Sets the state of the current Tree
   * @ignore : ignore for documentation in storybook
   */
  setState(category?: NavbarCategory) {
    const treeState = computeState(this.items, category);
    this.selectedItem = treeState.selectedItem;
    this.parent = treeState.parent;
    this.children = path<NavbarCategory[]>(['selectedItem', 'children'], treeState);
  }

  /**
   * Handles click on Parent Row
   * @ignore : ignore for documentation in storybook
   */
  onParentRowClick(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    this.setState(this.parent);
  }

  /**
   * Handles click on reset link
   * @ignore : ignore for documentation in storybook
   */
  onResetLinkClick(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    this.setState(undefined);

    if (this.openedChanged) {
      this.openedChanged(false);
    }
  }

  /**
   * Handles click on child row
   * @ignore : ignore for documentation in storybook
   */
  onChildRowClick(event: Event, category: NavbarCategory) {
    event.preventDefault();
    event.stopPropagation();

    if (this.openedChanged) {
      this.openedChanged(true);
    }

    if (category.children.length) {
      this.setState(category);
    } else {
      this.onSelect(category);
    }
  }

  /**
   * Handles click on show all categories row
   * @ignore : ignore for documentation in storybook
   */
  onShowAllClick(event: Event, category: NavbarCategory) {
    event.preventDefault();
    event.stopPropagation();
    this.onSelect(category);
  }

  /**
   * Gets the classes to be applied on a category row element
   * @ignore : ignore for documentation in storybook
   */
  getRowClass = (item: NavbarCategory): string[] => [
    'child-row',
    this.activeCategory && this.activeCategory.id === item.id ? 'active' : '',
    item.highlight ? 'highlight' : '',
  ];
}
