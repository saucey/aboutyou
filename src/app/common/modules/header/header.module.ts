import { NgModule } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { LocalizeRouterModule } from '@gilsdav/ngx-translate-router';
import { TranslateModule } from '@ngx-translate/core';
import { GlobalModule } from 'src/app/common/global.module';
import { DesktopLanguageSwitchComponent } from 'src/app/common/modules/header/components/desktop-language-switch/desktop-language-switch.component';
import { MobileLanguageSectionComponent } from 'src/app/common/modules/header/components/mobile-language-section/mobile-language-section.component';
import { WishlistIconDropdownComponent } from 'src/app/common/modules/header/components/wishlist-icon-dropdown/wishlist-icon-dropdown.component';
import { HeaderComponent } from 'src/app/common/modules/header/header.component';
import { BasketIconDropdownComponent } from './components/basket-icon-dropdown/basket-icon-dropdown.component';
import { MobileAccountSectionComponent } from './components/mobile-account-section/mobile-account-section.component';
import { MobileFooterComponent } from './components/mobile-footer/mobile-footer.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { UserIconDropdownComponent } from './components/user-icon-dropdown/user-icon-dropdown.component';

@NgModule({
  declarations: [
    HeaderComponent,
    SidebarComponent,
    UserIconDropdownComponent,
    WishlistIconDropdownComponent,
    BasketIconDropdownComponent,
    MobileAccountSectionComponent,
    DesktopLanguageSwitchComponent,
    MobileLanguageSectionComponent,
    MobileFooterComponent,
  ],
  imports: [GlobalModule, TranslateModule, LocalizeRouterModule],
  exports: [HeaderComponent],
})
export class HeaderModule {}
