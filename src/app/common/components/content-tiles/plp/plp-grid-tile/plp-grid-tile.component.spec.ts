import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SINGLE_TILE_ELEMENT_GROUP } from 'src/app/core/documentation/common/components/content-tiles/plp/plp-grid-tile.component.stories';
import { GlobalModule } from 'src/app/common/global.module';
import { ContentPLPGridTileComponent } from './plp-grid-tile.component';

describe('ContentPLPGridTileComponent', () => {
  let component: ContentPLPGridTileComponent;
  let fixture: ComponentFixture<ContentPLPGridTileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [GlobalModule],
    }).compileComponents();
  }));

  it('should render properly', () => {
    fixture = TestBed.createComponent(ContentPLPGridTileComponent);
    component = fixture.componentInstance;
    component.type = 'single_tile';
    component.elementGroups = [SINGLE_TILE_ELEMENT_GROUP];
    fixture.detectChanges();

    const singleTileDiv = fixture.debugElement.nativeElement.querySelector('.single_tile');
    expect(singleTileDiv).toBeDefined();

    const textElement = singleTileDiv.querySelector('.text-tag');
    expect(textElement.innerHTML).toEqual('Headline Lorem ipsum dolor sit');

    const buttonElement = singleTileDiv.querySelector('button.default');
    expect(buttonElement.innerHTML).toContain('See now!');

    const imageElement = singleTileDiv.querySelector('img');
    expect(imageElement.getAttribute('src')).toEqual(
      'https://depot.dam.staging.aboutyou.cloud/images/614c24576a4ead31e55584a3a55674ce?width=600&height=600',
    );
  });
});
