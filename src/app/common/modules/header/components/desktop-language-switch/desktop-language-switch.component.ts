import { Component, Input, HostListener, ElementRef, Inject, OnInit } from '@angular/core';
import { equals } from 'ramda';
import { ILanguage } from 'src/app/core/shop/types';

@Component({
  selector: 'app-desktop-language-switch',
  templateUrl: './desktop-language-switch.component.html',
  styleUrls: ['./desktop-language-switch.component.scss'],
})
export class DesktopLanguageSwitchComponent implements OnInit {
  /** Handle the close button on the bar */
  @Input() onClose: () => void;
  /** Languages to render in the dropdown list */
  @Input() languages: ILanguage[];
  /** Selected language item in the list */
  @Input() selectedLanguage?: ILanguage;
  /** Function called when a value is selected */
  @Input() onChange?: (language: ILanguage) => void;

  /**
   * state variable for the expanded state
   * @ignore : ignore for documentation in storybook
   */
  expanded = false;
  /**
   * state variable for the selected values
   * @ignore : ignore for documentation in storybook
   */
  selectedValue: ILanguage;

  /**
   * Handles document click events to set the expanded state of the dropdown
   * @ignore : ignore for documentation in storybook
   */
  @HostListener('document:click', ['$event'])
  clickout(event: Event) {
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.expanded = false;
    }
  }

  constructor(@Inject(ElementRef) private eRef: ElementRef) {}

  ngOnInit() {
    this.selectedValue = this.selectedLanguage || this.languages[0];
  }

  /**
   * Toggles the expanded state
   * @ignore : ignore for documentation in storybook
   */
  toggleExpanded = () => {
    const expanded = !this.expanded;
    this.expanded = expanded;
  };

  /**
   * Handles the click on any item from the list
   * @ignore : ignore for documentation in storybook
   */
  onClickHandler = (val: ILanguage) => {
    this.selectedValue = val;
    if (this.onChange) {
      this.onChange(val);
    }
    this.toggleExpanded();
  };

  /**
   * Checks if the element is selected or not
   * @ignore : ignore for documentation in storybook
   */
  isSelected = (val: any) => equals(val, this.selectedValue);
}
