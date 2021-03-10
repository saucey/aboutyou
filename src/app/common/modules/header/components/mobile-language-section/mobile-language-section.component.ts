import { Component, Input } from '@angular/core';
import { ILanguage } from 'src/app/core/shop/types';

@Component({
  selector: 'app-mobile-language-section',
  templateUrl: './mobile-language-section.component.html',
  styleUrls: ['./mobile-language-section.component.scss'],
})
export class MobileLanguageSectionComponent {
  @Input() openedChanged: (opened: boolean) => void;
  /** Languages to render in the list */
  @Input() languages: ILanguage[];
  /** Selected language item in the list */
  @Input() selectedLanguage?: ILanguage;
  @Input() onLanguageSelection: (lang: ILanguage) => void;

  opened: boolean;

  setOpenedState(val: boolean) {
    this.opened = val;
    if (this.openedChanged) {
      this.openedChanged(val);
    }
  }
}
