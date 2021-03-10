import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SINGLE_BUNDLE_TILE_ELEMENTS } from 'src/app/core/documentation/common/components/content-tiles/plp/bundle-tile.component.stories';
import { GlobalModule } from 'src/app/common/global.module';
import { ContentPLPBundleTileComponent } from './bundle-tile.component';

describe('ContentPLPBundleTileComponent', () => {
  let component: ContentPLPBundleTileComponent;
  let fixture: ComponentFixture<ContentPLPBundleTileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [GlobalModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentPLPBundleTileComponent);
    component = fixture.componentInstance;
    component.elements = SINGLE_BUNDLE_TILE_ELEMENTS;
    component.type = 'single_bundle_tile';
    fixture.detectChanges();
  });

  it('should render properly', () => {
    expect(component).toBeTruthy();

    const singleTileDiv = fixture.debugElement.nativeElement.querySelector('.single_bundle_tile');
    expect(singleTileDiv).toBeDefined();

    const imageElement = singleTileDiv.querySelector('img');
    expect(imageElement.getAttribute('src')).toEqual(
      'https://depot.dam.staging.aboutyou.cloud/images/7f6ae73f4c41683324308dacd0d17c7f?width=600&height=600',
    );

    const lookTitle = singleTileDiv.querySelector('.look-title');
    expect(lookTitle.innerHTML).toContain('Cold Sun Look');
  });

  it('should handle clicks on elements properly', () => {
    component.onClick = () => ({});
    fixture.detectChanges();

    expect(component).toBeTruthy();
    spyOn(component, 'onClick');

    const imageElement = fixture.debugElement.nativeElement.querySelector('img');
    imageElement.click();
    fixture.detectChanges();

    expect(component.onClick).toHaveBeenCalled();
  });

  it('should handle module click properly', () => {
    component.showWishlistButton = true;

    component.onClick = () => ({});
    component.onWishlistClick = () => ({});

    fixture.detectChanges();

    expect(component).toBeTruthy();
    spyOn(component, 'onClick');
    spyOn(component, 'onWishlistClick');

    const outerLink = fixture.debugElement.nativeElement.querySelector('a');
    outerLink.click();
    fixture.detectChanges();

    expect(component.onClick).not.toHaveBeenCalled();

    const wishlistIcon = fixture.debugElement.nativeElement.querySelector('app-circle-button');
    wishlistIcon.click();
    fixture.detectChanges();

    expect(component.onWishlistClick).toHaveBeenCalled();
  });
});
