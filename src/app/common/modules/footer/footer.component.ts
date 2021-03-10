import { Component, Input } from '@angular/core';
import { TrustedShopType } from '../trusted-shop/trusted-shop.component';
import { TranslateService } from '@ngx-translate/core';
import { getValueFromSection, LscUnion } from 'src/app/configs/shop/lsc';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  @Input() reduced = false;

  @Input() info = true;

  trustedShopType = TrustedShopType;

  constructor(private translate: TranslateService) {}

  getValueForLanguage(section: string): LscUnion {
    return getValueFromSection(section, this.translate.currentLang);
  }
}
