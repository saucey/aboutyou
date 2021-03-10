import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { GridTilesComponent } from './grid-tiles.component';
import { GlobalModule } from 'src/app/common/global.module';
import { createTilesFixture } from 'src/tests/mocks/tile-row-factories.mock';

describe('GridTilesComponent', () => {
  let component: GridTilesComponent;
  let fixture: ComponentFixture<GridTilesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [GlobalModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GridTilesComponent);
    component = fixture.componentInstance;
    component.tiles = createTilesFixture();

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
