import { animate, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import equals from 'ramda/es/equals';
import { NavbarCategory, ILanguage } from 'src/app/core/shop/types';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  animations: [
    trigger('showAnimation', [
      transition(':enter', [
        style({ opacity: 0, backgroundColor: 'rgba(0, 0, 0, 0)', transform: 'translateX(-100%)' }),
        animate('0.3s', style({ opacity: 1, transform: 'translateX(0)' })),
        animate('0.3s', style({ backgroundColor: 'rgba(0, 0, 0, 0.29)' })),
      ]),
      transition(':leave', [
        animate('0.3s', style({ backgroundColor: 'rgba(0, 0, 0, 0)' })),
        animate('0.3s', style({ transform: 'translateX(-100%)' })),
      ]),
    ]),
  ],
})
export class SidebarComponent implements OnChanges {
  @Input() toggleBurgerMenu: () => void;
  @Input() show: boolean;
  @Input() categories: NavbarCategory[];
  @Input() activeCategory: NavbarCategory;
  @Input() onCategoryClick: (item: NavbarCategory) => void;
  @Input() languages: ILanguage[];
  @Input() selectedLanguage?: ILanguage;
  @Input() onLanguageSelection: (lang: ILanguage) => void;
  @Input() redirectToCheckoutAccountArea: () => void;
  @Input() redirectToCheckoutOrdersArea: () => void;

  showCategoriesSection = true;
  showAccountsSection = true;
  showLanguageSection = true;

  ngOnChanges(changes: SimpleChanges) {
    if (changes.show && !equals(changes.show.currentValue, changes.show.previousValue)) {
      this.showCategoriesSection = true;
      this.showAccountsSection = true;
      this.showLanguageSection = true;
    }
  }

  accountSectionOpenedChanged = (val: boolean) => {
    this.showCategoriesSection = !val;
    this.showLanguageSection = !val;
  };

  languageSectionOpenedChanged = (val: boolean) => {
    this.showCategoriesSection = !val;
    this.showAccountsSection = !val;
  };

  categoriesSectionOpenedChanged = (val: boolean) => {
    this.showAccountsSection = !val;
    this.showLanguageSection = !val;
  };

  onToggleBurgerMenu() {
    this.toggleBurgerMenu();
  }
}
