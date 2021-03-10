import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { GlobalModule } from 'src/app/common/global.module';
import { LoadMoreComponent } from 'src/app/pages/product-listing/components/load-more/load-more.component';
import { PriceRangeComponent } from 'src/app/pages/product-listing/components/price-range/price-range.component';
import { SkeletonCategoryTreeComponent } from 'src/app/pages/product-listing/components/skeletons/category-tree.skeleton';
import { SkeletonFiltersComponent } from 'src/app/pages/product-listing/components/skeletons/filters.skeleton';
import { SkeletonProductsComponent } from 'src/app/pages/product-listing/components/skeletons/products/products.skeleton';
import { ProductListingComponent } from 'src/app/pages/product-listing/pages/category-page/product-listing.component';
import { FiltersComponent } from './components/filters/filters.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { productListingExtensionsModule } from './product-listing-extensions.module';

@NgModule({
  declarations: [
    ProductListingComponent,
    SearchPageComponent,
    PriceRangeComponent,
    SkeletonCategoryTreeComponent,
    SkeletonFiltersComponent,
    SkeletonProductsComponent,
    LoadMoreComponent,
    FiltersComponent,
    ...(productListingExtensionsModule.declarations || []),
  ],
  imports: [
    TranslateModule,
    NgxSkeletonLoaderModule,
    GlobalModule,
    HttpClientModule,
    ...(productListingExtensionsModule.imports || []),
  ],
})
export class ProductListingModule {}
