import { Component, ElementRef, HostListener, Inject, Input } from '@angular/core';

@Component({
  selector: 'app-dropdown-regular',
  templateUrl: './dropdown-regular.component.html',
  styleUrls: ['./dropdown-regular.component.scss'],
})
export class DropdownRegularComponent {
  /**
   * state variable for the expanded state
   * @ignore : ignore for documentation in storybook
   */
  @Input() isExpanded = false;

  /**
   * Handles document click events to close the dropdown when clicked outside
   * @ignore : ignore for documentation in storybook
   */
  @HostListener('document:click', ['$event'])
  clickout(event: Event) {
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.isExpanded = false;
    }
  }

  constructor(@Inject(ElementRef) private eRef: ElementRef) {}

  /**
   * Toggles the expanded state
   * @ignore : ignore for documentation in storybook
   */
  toggleIsExpanded = () => {
    this.isExpanded = !this.isExpanded;
  };
}
