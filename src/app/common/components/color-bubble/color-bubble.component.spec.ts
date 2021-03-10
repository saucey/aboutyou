/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { GlobalModule } from 'src/app/common/global.module';
import { ColorBubbleComponent } from './color-bubble.component';
import { RouterTestingWithLocalizationModule } from 'src/tests/fixtures/router-testing-with-localization.module';

describe('ColorBubbleComponent', () => {
  let component: ColorBubbleComponent;
  let fixture: ComponentFixture<ColorBubbleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [GlobalModule, RouterTestingWithLocalizationModule],
    }).compileComponents();
  }));

  it('should render properly', () => {
    fixture = TestBed.createComponent(ColorBubbleComponent);
    component = fixture.componentInstance;
    component.item = {
      id: '9183',
      name: 'Black',
    };
    component.selected = true;
    fixture.detectChanges();

    expect(component).toBeTruthy();

    const checkMark = fixture.nativeElement.querySelector('.checkMark');
    expect(checkMark).not.toEqual(null);
  });
});
