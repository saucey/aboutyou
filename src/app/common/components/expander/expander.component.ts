import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

export interface Tag {
  id: number;
  name: string;
}

/**
 * A content area which can be collapsed and expanded.
 *
 * **When To Use **
 *
 * Can be used to group or hide complex regions to keep the page clean.
 */
@Component({
  selector: 'app-expander',
  templateUrl: './expander.component.html',
  styleUrls: ['./expander.component.scss'],
})
export class ExpanderComponent implements OnInit {
  /** Sets the expanded state of the panel */
  @Input() isExpanded?: boolean;
  /** Label displayed in the header */
  @Input() label: string;
  /** Function called when the expanded state is changed */
  @Input() onExpandChange?: (expanded: boolean) => void;
  /** Event when expanded state is toggled */
  @Output() expandChange: EventEmitter<boolean> = new EventEmitter();
  /** Tags to display when the Panel is collapsed */
  @Input() tags?: Tag[];
  /** Function called when the any tags are removed */
  @Input() onTagRemove: (tag: Tag) => void;

  // State
  /**
   * state variable for the expanded state
   * @ignore : ignore for documentation in storybook
   */
  expanded: boolean;

  ngOnInit() {
    this.setState();
  }

  /**
   * @ignore : ignore for documentation in storybook
   */
  setState() {
    this.expanded = this.isExpanded || false;
  }

  /**
   * Handles toggling of expanded state
   * @ignore : ignore for documentation in storybook
   */
  toggleExpanded = () => {
    const expanded = !this.expanded;
    this.expanded = expanded;
    if (this.onExpandChange) {
      this.onExpandChange(expanded);
    }

    this.expandChange.emit(this.expanded);
  };
}
