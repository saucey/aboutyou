import { Component, Input } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ResponsiveUspListComponent } from './responsive-usp-list.component';
import { ResponsiveUspListComponentPageObj } from './responsive-usp-list.component.po';

@Component({ selector: 'app-accordion-usp', template: '' })
class MockAccordionUspComponent {
  @Input() inputs: any;
}

@Component({ selector: 'app-simple-usp', template: '' })
class MockSimpleUspComponent {
  @Input() inputs: any;
}

describe('UspComponent', () => {
  let component: ResponsiveUspListComponent;
  let fixture: ComponentFixture<ResponsiveUspListComponent>;
  let pageObj: ResponsiveUspListComponentPageObj;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ResponsiveUspListComponent, MockAccordionUspComponent, MockSimpleUspComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResponsiveUspListComponent);
    pageObj = new ResponsiveUspListComponentPageObj(fixture);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render given USPs in mobile mode', () => {
    component.usps = [{}, {}, {}, {}] as any;
    fixture.detectChanges();

    expect(pageObj.getMobileUspItemElements().length).toEqual(4);
  });

  it('should render given USPs in desktop mode', () => {
    component.usps = [{}, {}, {}, {}] as any;
    fixture.detectChanges();

    expect(pageObj.getDesktopUspItemElements().length).toEqual(4);
  });
});
