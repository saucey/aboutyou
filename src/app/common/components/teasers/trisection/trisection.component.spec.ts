/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { GlobalModule } from 'src/app/common/global.module';
import { TrisectionComponent } from './trisection.component';
import { createSlideFixture } from 'src/tests/mocks/tile-row-factories.mock';

describe('TrisectionComponent', () => {
  let component: TrisectionComponent;
  let fixture: ComponentFixture<TrisectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [GlobalModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrisectionComponent);
    component = fixture.componentInstance;
    const slide = createSlideFixture() as any;

    component.trisectionSlides = [slide, slide, slide];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
