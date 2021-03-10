import { AuthModule } from './auth/auth.module';
import { NgModule } from '@angular/core';
import { HeaderModule } from './header/header.module';
import { FooterModule } from './footer/footer.module';

@NgModule({
  imports: [HeaderModule, AuthModule, FooterModule],
  exports: [HeaderModule, AuthModule, FooterModule],
})
export class CommonModule {}
