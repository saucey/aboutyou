import { NgModule } from '@angular/core';
import { LocalizeRouterModule } from '@gilsdav/ngx-translate-router';
import { TranslateModule } from '@ngx-translate/core';
import { GlobalModule } from 'src/app/common/global.module';
import { AuthComponent } from './auth.component';
import { AuthLoginFailedComponent } from './components/auth-login-failed/auth-login-failed.component';
import { AuthLoginSuccessComponent } from './components/auth-login-success/auth-login-success.component';
import { AuthLogoutSuccessComponent } from './components/auth-logout-success/auth-logout-success.component';

@NgModule({
  declarations: [AuthComponent, AuthLoginSuccessComponent, AuthLoginFailedComponent, AuthLogoutSuccessComponent],
  imports: [GlobalModule, TranslateModule.forChild(), LocalizeRouterModule],
  exports: [AuthComponent],
})
export class AuthModule {}
