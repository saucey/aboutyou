import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { GlobalModule } from 'src/app/common/global.module';
// tslint:disable-next-line

import { HomeComponent } from 'src/app/pages/home/home.component';
import { SkeletonHomeComponent } from 'src/app/pages/home/home.component.skeleton';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { homeExtensionsModule } from './home-extensions.module';

@NgModule({
  declarations: [HomeComponent, SkeletonHomeComponent, ...(homeExtensionsModule.declarations || [])],
  imports: [
    GlobalModule,
    TranslateModule,
    HttpClientModule,
    NgxSkeletonLoaderModule,
    ...(homeExtensionsModule.imports || []),
  ],
  providers: [...(homeExtensionsModule.providers || [])],
  exports: [HomeComponent, ...(homeExtensionsModule.exports || [])],
})
export class HomeModule {}
