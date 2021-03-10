import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IconComponent } from 'src/app/common/components/icon/icon.component';
import { InlineSVGModule } from 'ng-inline-svg';

import { LinkComponent } from './link.component';
import { RouterTestingWithLocalizationModule } from 'src/tests/fixtures/router-testing-with-localization.module';

describe('LinkComponent', () => {
  let component: LinkComponent;
  let fixture: ComponentFixture<LinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [InlineSVGModule.forRoot(), RouterTestingWithLocalizationModule],
      declarations: [LinkComponent, IconComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
