import { NgModule } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { LocalizeRouterModule } from '@gilsdav/ngx-translate-router';
import { LocalizeRouterPipeMock } from './localize.mock.pipe';
import { RouterLinkMockDirective } from './router-link-mock.directive';
import { TranslateTestingModule } from './translate-testing.module';

@NgModule({
  declarations: [LocalizeRouterPipeMock, RouterLinkMockDirective],
  imports: [TranslateTestingModule, RouterTestingModule, LocalizeRouterModule.forRoot([])],
  exports: [
    RouterTestingModule,
    TranslateTestingModule,
    LocalizeRouterModule,
    LocalizeRouterPipeMock,
    RouterLinkMockDirective,
  ],
})
export class RouterTestingWithLocalizationModule {}
