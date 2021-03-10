import { Component, Input, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AccordionUspComponent } from './accordion-usp.component';
import { AccordionUspComponentPageObj } from './accordion-usp.component.po';

@Component({ selector: 'app-icon', template: '' })
class MockIconComponent {
  @Input() icon: any;
}

describe('AccordionUspComponent', () => {
  let component: AccordionUspComponent;
  let fixture: ComponentFixture<AccordionUspComponent>;
  let pageObj: AccordionUspComponentPageObj;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AccordionUspComponent, MockIconComponent],
      // NO_ERRORS_SCHEMA makes sure no error is thrown if a element is unknown in the template.
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccordionUspComponent);
    pageObj = new AccordionUspComponentPageObj(fixture);
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
      long: 'aLongText',
      short: 'aShortText',
      link: 'aLink',
    };
    fixture.detectChanges();

    expect(pageObj.getIconName()).toBe('anIcon');
    expect(pageObj.getHeadlineText()).toBe('aHeadline');
    expect(pageObj.getLongText()).toBe('aLongText');
    expect(pageObj.getShortText()).toBe('aShortText');
    expect(pageObj.getLinkText()).toContain('aLink');
  });

  it('should display a given link', () => {
    component.inputs = {
      link: 'aLink',
    } as any;
    fixture.detectChanges();

    expect(pageObj.getLinkText()).toContain('aLink');
  });

  it('should not display a link, if not given', () => {
    component.inputs = {} as any;
    fixture.detectChanges();

    expect(pageObj.getLinkElement()).toBeFalsy();
  });
});
