import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoubleTeaserComponent } from './double-teaser.component';
import { TextComponent } from 'src/app/common/components/text/text.component';
import { CdnPipe } from 'src/app/common/pipes/cdn.pipe';
import { ButtonComponent } from 'src/app/common/components/button/button.component';

describe('DoubleTeaserComponent', () => {
  let component: DoubleTeaserComponent;
  let fixture: ComponentFixture<DoubleTeaserComponent>;

  beforeEach(async(() =>
    TestBed.configureTestingModule({
      declarations: [DoubleTeaserComponent, TextComponent, ButtonComponent, CdnPipe],
    }).compileComponents()));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoubleTeaserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
