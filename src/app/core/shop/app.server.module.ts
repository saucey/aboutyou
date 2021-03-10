import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ServerModule, ServerTransferStateModule } from '@angular/platform-server';
import { ModuleMapLoaderModule } from '@nguniversal/module-map-ngfactory-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { AppComponent } from '../../app.component';
import { AppModule } from '../../app.module';
import { Observable, of } from 'rxjs';
import { AddShopIdToRequestInterceptor } from 'src/app/core/services/add-shop-id-interceptor.service';
import { MakeRequestUrlAbsoluteInterceptor } from 'src/app/core/services/make-url-absolute-interceptor.service';

const fs = require('fs');

export function translateFactory() {
  return new TranslateUniversalLoader('./dist/browser/assets/i18n', '.json');
}

export class TranslateUniversalLoader implements TranslateLoader {
  constructor(private prefix: string = 'i18n', private suffix: string = '.json') {}

  public getTranslation(lang: string): Observable<any> {
    return of(JSON.parse(fs.readFileSync(`${this.prefix}/${lang}${this.suffix}`, 'utf8')));
  }
}

@NgModule({
  imports: [
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: translateFactory,
      },
    }),
    ServerModule,
    AppModule,
    ModuleMapLoaderModule,
    ServerTransferStateModule,
    NoopAnimationsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AddShopIdToRequestInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MakeRequestUrlAbsoluteInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppServerModule {}
