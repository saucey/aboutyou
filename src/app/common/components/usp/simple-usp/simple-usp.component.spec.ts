import { Component, Input, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SimpleUspComponent } from './simple-usp.component';
import { SimpleUspComponentPageObj } from './simple-usp.component.po';

@Component({ selector: 'app-icon', template: '' })
class MockIconComponent {
  @Input() icon: any;
}

describe('SimpleUspComponent', () => {
  let component: SimpleUspComponent;
  let fixture: ComponentFixture<SimpleUspComponent>;
  let pageObj: SimpleUspComponentPageObj;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SimpleUspComponent, MockIconComponent],
      // NO_ERRORS_SCHEMA makes sure no error is thrown if a element is unknown in the template.
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleUspComponent);
    pageObj = new SimpleUspComponentPageObj(fixture);
    component = fixture.componentInstance;
    component.inputs = {} as any;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the correct content', () => {
    component.inputs = {
      iconName: 'anIcon',
      headline: 'aHeadline',
      short: 'aShortText',
    };
    fixture.detectChanges();

    expect(pageObj.getIconName()).toBe('anIcon');
    expect(pageObj.getHeadlineText()).toBe('aHeadline');
    expect(pageObj.getShortText()).toBe('aShortText');
  });
});
