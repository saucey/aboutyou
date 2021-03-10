import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { InlineSVGModule } from 'ng-inline-svg';
import { CurrencyPipe } from '../../pipes/currency.pipe';
import { ButtonComponent } from '../button/button.component';
import { CircleButtonComponent } from '../circle-button/circle-button.component';
import { ColorSwitchComponent } from '../color-switch/color-switch.component';
import { EnergyFlagComponent } from '../energy-flag/energy-flag.component';
import { IconComponent } from '../icon/icon.component';
import { PromotionFlagComponent } from '../promotion-flag/promotion-flag.component';
import { RatingComponent } from '../rating/rating.component';
import { ProductTileComponent } from './product-tile.component';
import { RouterTestingWithLocalizationModule } from 'src/tests/fixtures/router-testing-with-localization.module';
import { NgrxTestingModule } from 'src/tests/fixtures/ngrx-testing.module';

describe('ProductTileComponent', () => {
  let component: ProductTileComponent;
  let fixture: ComponentFixture<ProductTileComponent>;
  let element: HTMLElement;
  let euroPipe: CurrencyPipe;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ButtonComponent,
        ProductTileComponent,
        IconComponent,
        ColorSwitchComponent,
        EnergyFlagComponent,
        PromotionFlagComponent,
        CircleButtonComponent,
        RatingComponent,
        CurrencyPipe,
      ],
      imports: [
        HttpClientTestingModule,
        InlineSVGModule.forRoot(),
        RouterTestingWithLocalizationModule,
        MatSnackBarModule,
        MatDialogModule,
        NgrxTestingModule,
        NoopAnimationsModule,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductTileComponent);
    component = fixture.componentInstance;
    component.product = { custom: { rating: 0 } } as any;
    element = fixture.nativeElement;
    euroPipe = new CurrencyPipe();
    fixture.detectChanges();
  });

  it('should render a Product Tile with a single image, product name and price', () => {
    component.product.previewImageSrc = '/assets/pictos/danger-explosion.svg';
    component.product.custom.productTitle = 'Shoes';
    component.product.currentPrice = 399;
    component.product.currency = { locale: 'de', code: 'EUR' };
    component.isMobile = false;

    component.ngOnInit();
    fixture.detectChanges();

    expect(element.querySelector('.product-title').innerHTML).toBe(component.product.custom.productTitle);
    expect((element.querySelector('.squared-image > img') as HTMLImageElement).src).toContain(
      component.product.previewImageSrc,
    );
    expect(element.querySelectorAll('.squared-image img').length).toBe(1);
    expect(element.querySelector('.price-label').textContent).toContain(
      euroPipe.transform(component.product.currentPrice, {
        code: 'EUR',
        locale: 'de',
      }),
    );
  });

  it('should render a squared image container for previewImageSrc', () => {
    component.product.previewImageSrc = '/assets/pictos/danger-explosion.svg';
    component.ngOnInit();
    fixture.detectChanges();

    const imageContainer = element.querySelector('div.squared-image') as HTMLDivElement;

    expect(imageContainer.offsetWidth / imageContainer.offsetHeight).toBe(1);
  });

  it('should not render a squared-image img if component.product.previewImageSrc is null', () => {
    component.ngOnInit();
    fixture.detectChanges();

    const imageContainer = element.querySelector('div.squared-image img') as HTMLImageElement;

    expect(imageContainer).toBeNull();
  });

  it('should render a wishlist button', () => {
    component.product.custom.isWishlisted = true;
    component.ngOnInit();
    fixture.detectChanges();

    const circleButton = element.querySelector('app-circle-button') as HTMLElement;
    expect(circleButton).toBeTruthy();
  });
});
