import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import path from 'ramda/es/path';
import { IAugmentedCategory, NavbarCategory } from 'src/app/core/shop/types';
import { computeState } from 'src/app/core/shop/utils';

/**
 * A hierarchical list structure component.
 *
 * **When To Use**
 *
 * Almost anything can be represented in a tree structure.
 * Examples include directories, organization hierarchies, biological classifications, countries, etc.
 * The Tree component is a way of representing the hierarchical relationship between these things.
 * You can also expand, collapse, and select a treeNode within a Tree.
 */
@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.scss'],
})
export class TreeComponent implements OnInit, OnChanges {
  /** Nested category tree array */
  @Input() items: NavbarCategory[];
  /** sets the active category */
  @Input() activeCategory?: NavbarCategory;
  /** Label shown when displaying child categories */
  @Input() subCategoryLabel?: string;
  /** Label shown to go back to root category */
  @Input() goBackLabel?: string;
  /** flag which allows to navigate tree till root */
  @Input() canNavigateToRoot: boolean;
  /** Function which gets called when a category is clicked */
  @Output() selected: EventEmitter<NavbarCategory> = new EventEmitter<NavbarCategory>();

  /**
   * state variable for selected item
   * @ignore : ignore for documentation in storybook
   */
  selectedItem: IAugmentedCategory;
  /**
   * state variable for current parent
   * @ignore : ignore for documentation in storybook
   */
  parent: IAugmentedCategory;
  /**
   * state variable for current children
   * @ignore : ignore for documentation in storybook
   */
  children: IAugmentedCategory[];

  ngOnInit() {
    this.setState();
  }

  ngOnChanges() {
    this.setState();
  }

  /**
   * sets tree state
   * @ignore : ignore for documentation in storybook
   */
  setState() {
    const treeState = computeState(this.items, this.activeCategory);
    this.selectedItem = treeState.selectedItem;
    this.parent = treeState.parent;
    this.children = path<NavbarCategory[]>(['selectedItem', 'children'], treeState);
  }

  /**
   * Handles parent row click
   * @ignore : ignore for documentation in storybook
   */
  onParentRowClick(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    this.selected.next(this.parent);
  }

  /**
   * Handles click on reset link
   * @ignore : ignore for documentation in storybook
   */
  onResetLinkClick(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    this.selected.next(undefined);
  }

  /**
   * Handles Child row click
   * @ignore : ignore for documentation in storybook
   */
  onChildRowClick(event: Event, category: NavbarCategory) {
    event.preventDefault();
    event.stopPropagation();
    this.selected.next(category);
  }
}
