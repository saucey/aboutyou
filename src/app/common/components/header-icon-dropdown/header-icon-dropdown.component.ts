import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-header-icon-dropdown',
  templateUrl: './header-icon-dropdown.component.html',
  styleUrls: ['./header-icon-dropdown.component.scss'],
  animations: [
    trigger('enterAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(5%)' }),
        animate('0.2s', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate('0.2s', style({ opacity: 0, transform: 'translateY(5%)' })),
      ]),
    ]),
  ],
})
export class HeaderIconDropdownComponent {
  @Input() customClass: string;
  @Input() icon: string;
  @Input() label: string;
  @Input() badgeCount: number;
  @Output() iconClick = new EventEmitter<void>();

  dropdownVisible: boolean;
  opened: boolean;

  @HostListener('mouseenter') openDropdown() {
    this.setDropdownState(true);
  }

  @HostListener('mouseleave') closeDropDown() {
    this.setDropdownState(false);
  }

  closePanel() {
    this.opened = false;
  }

  setDropdownState(val: boolean) {
    this.dropdownVisible = val;
    if (val) {
      this.opened = val;
    }
  }
}
