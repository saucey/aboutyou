import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LocalizeRouterModule } from '@gilsdav/ngx-translate-router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { CostOverviewComponent } from 'src/app/common/components/cost-overview/cost-overview.component';
import { GlobalMessageComponent } from 'src/app/common/components/global-message/global-message.component';
import { InlineSVGModule } from 'ng-inline-svg';
import { Ng5SliderModule } from 'ng5-slider';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { SeoTextComponent } from 'src/app/pages/home/components/seo-text/seo-text.component';
import { AutoSuggestComponent } from './components/auto-suggest/auto-suggest.component';
import { BasketBottomSheetComponent } from './components/basket-bottom-sheet/basket-bottom-sheet.component';
import { BasketListItemComponent } from './components/basket-list-item/basket-list-item.component';
import { ButtonComponent } from './components/button/button.component';
import { CheckboxComponent } from './components/checkbox/checkbox.component';
import { CircleButtonComponent } from './components/circle-button/circle-button.component';
import { ColorBubbleComponent } from './components/color-bubble/color-bubble.component';
import { ColorSwitchComponent } from './components/color-switch/color-switch.component';
import { ContentPLPBundleTileComponent } from './components/content-tiles/plp/plp-bundle-tile/bundle-tile.component';
import { ContentPLPGridTileComponent } from './components/content-tiles/plp/plp-grid-tile/plp-grid-tile.component';
import { DialogBeSureComponent } from './components/dialog/dialog-be-sure';
import { MapDialogComponent } from './components/dialog/map-dialog.component';
import { DoubleTeaserComponent } from './components/double-teaser/double-teaser.component';
import { DropdownRegularComponent } from './components/dropdown-regular/dropdown-regular.component';
import { DropdownComponent } from './components/dropdown/dropdown.component';
import { EnergyFlagComponent } from './components/energy-flag/energy-flag.component';
import { ExpanderComponent } from './components/expander/expander.component';
import { FavoriteCategoriesComponent } from './components/favorite-categories/favorite-categories.component';
import { GridTilesComponent } from './components/grid-tiles/grid-tiles.component';
import { HeaderIconDropdownComponent } from './components/header-icon-dropdown/header-icon-dropdown.component';
import { IconComponent } from './components/icon/icon.component';
import { LinkComponent } from './components/link/link.component';
import { MobileNavComponent } from './components/mobile-nav/mobile-nav.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ProductAvailabilityBadgeComponent } from './components/product-availability-badge/product-availability-badge.component';
import { ProductTagBoxComponent } from './components/product-tag-box/product-tag-box.component';
import { ProductTileComponent } from './components/product-tile/product-tile.component';
import { ProductsSliderComponent } from './components/products-slider/products-slider.component';
import { PromotionFlagComponent } from './components/promotion-flag/promotion-flag.component';
import { QuantityPickerComponent } from './components/quantity-picker/quantity-picker.component';
import { RangeSliderComponent } from './components/range-slider/range-slider.component';
import { RatingComponent } from './components/rating/rating.component';
import { SelectComponent } from './components/select/select.component';
import { TabComponent } from './components/tab/tab.component';
import { TabsComponent } from './components/tabs/tabs.component';
import { TagsComponent } from './components/tags/tags.component';
import { HoverTeaserComponent } from './components/teasers/hover-teaser/hover-teaser.component';
import { StageModuleComponent } from './components/teasers/stage-module/stage-module.component';
import { TrisectionComponent } from './components/teasers/trisection/trisection.component';
import { TextComponent } from './components/text/text.component';
import { TreeComponent } from './components/tree/tree.component';
import { StickyOverviewDirective } from './directives/sticky-overview.directive';
import { ToggleActiveDirective } from './directives/toggle-active.directive';
import { globalExtensionsModule } from './global-extensions.module';
import { MaterialModule } from './material.module';
import { CdnPipe } from './pipes/cdn.pipe';
import { CurrencyPipe } from './pipes/currency.pipe';
import { HighlightPipe } from './pipes/highlight.pipe';
import { NumberPipe } from './pipes/number.pipe';
import { RangePipe } from './pipes/range.pipe';
import { SafeHtmlPipe } from './pipes/safe-html.pipe';
import { ReservationsAvailabilityComponent } from './components/reservations-availability/reservations-availability.component';

@NgModule({
  declarations: [
    AutoSuggestComponent,
    BasketBottomSheetComponent,
    DropdownRegularComponent,
    HoverTeaserComponent,
    LinkComponent,
    ProductsSliderComponent,
    GridTilesComponent,
    ColorSwitchComponent,
    DoubleTeaserComponent,
    TextComponent,
    ProductTileComponent,
    ButtonComponent,
    CircleButtonComponent,
    RatingComponent,
    ProductTagBoxComponent,
    PromotionFlagComponent,
    EnergyFlagComponent,
    ProductAvailabilityBadgeComponent,
    IconComponent,
    QuantityPickerComponent,
    TreeComponent,
    ExpanderComponent,
    TagsComponent,
    ColorBubbleComponent,
    SelectComponent,
    RangeSliderComponent,
    CheckboxComponent,
    RangePipe,
    HighlightPipe,
    DropdownComponent,
    CurrencyPipe,
    CdnPipe,
    ContentPLPGridTileComponent,
    ContentPLPBundleTileComponent,
    CostOverviewComponent,
    StageModuleComponent,
    TrisectionComponent,
    NavbarComponent,
    MobileNavComponent,
    FavoriteCategoriesComponent,
    CdnPipe,
    HeaderIconDropdownComponent,
    ToggleActiveDirective,
    StickyOverviewDirective,
    SeoTextComponent,
    NumberPipe,
    TabsComponent,
    TabComponent,
    SafeHtmlPipe,
    BasketListItemComponent,
    GlobalMessageComponent,
    DialogBeSureComponent,
    MapDialogComponent,
    ReservationsAvailabilityComponent,
    ...(globalExtensionsModule.declarations || []),
  ],
  entryComponents: [GlobalMessageComponent, BasketBottomSheetComponent, DialogBeSureComponent, MapDialogComponent],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    InlineSVGModule,
    MaterialModule,
    Ng5SliderModule,
    TranslateModule,
    NgbModule,
    ReactiveFormsModule,
    RouterModule,
    LocalizeRouterModule,
    NgxSkeletonLoaderModule,
    ...(globalExtensionsModule.imports || []),
  ],
  exports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    NumberPipe,
    RangePipe,
    HighlightPipe,
    SafeHtmlPipe,
    CurrencyPipe,
    CdnPipe,
    DropdownRegularComponent,
    LinkComponent,
    BasketBottomSheetComponent,
    AutoSuggestComponent,
    ColorSwitchComponent,
    TextComponent,
    PromotionFlagComponent,
    HoverTeaserComponent,
    ProductTileComponent,
    ButtonComponent,
    CircleButtonComponent,
    RatingComponent,
    ProductTagBoxComponent,
    PromotionFlagComponent,
    EnergyFlagComponent,
    QuantityPickerComponent,
    DoubleTeaserComponent,
    ProductAvailabilityBadgeComponent,
    IconComponent,
    TreeComponent,
    ExpanderComponent,
    TagsComponent,
    ColorBubbleComponent,
    SelectComponent,
    RangeSliderComponent,
    CheckboxComponent,
    ContentPLPGridTileComponent,
    ContentPLPBundleTileComponent,
    CostOverviewComponent,
    ProductsSliderComponent,
    DropdownComponent,
    StageModuleComponent,
    ToggleActiveDirective,
    StickyOverviewDirective,
    TrisectionComponent,
    FavoriteCategoriesComponent,
    NavbarComponent,
    MobileNavComponent,
    HeaderIconDropdownComponent,
    GridTilesComponent,
    SeoTextComponent,
    TabsComponent,
    TabComponent,
    BasketListItemComponent,
    GlobalMessageComponent,
    ReservationsAvailabilityComponent,
    ...(globalExtensionsModule.exports || []),
  ],
  providers: [...(globalExtensionsModule.providers || [])],
})
export class GlobalModule {}
