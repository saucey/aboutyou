import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { GlobalModule } from 'src/app/common/global.module';
import { WishlistComponent } from 'src/app/pages/wishlist/wishlist.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { WishlistSkeletonComponent } from './skeletons/wishlist.skeleton';

@NgModule({
  declarations: [WishlistComponent, WishlistSkeletonComponent],
  imports: [GlobalModule, TranslateModule, NgxSkeletonLoaderModule],
})
export class WishlistModule {}
