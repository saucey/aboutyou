import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { GlobalModule } from 'src/app/common/global.module';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { BasketListSkeletonComponent } from './basket-list-skeleton/basket-list.skeleton';

@NgModule({
  imports: [NgxSkeletonLoaderModule, TranslateModule, CommonModule],
  declarations: [BasketListSkeletonComponent],
  exports: [GlobalModule, TranslateModule, NgxSkeletonLoaderModule, BasketListSkeletonComponent],
})
export class SharedModule {}
