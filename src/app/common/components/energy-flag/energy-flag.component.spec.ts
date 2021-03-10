/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { EnergyFlagComponent, EnergyLabel } from './energy-flag.component';
import { EnergyFlagComponentPageObj } from './energy-flag.component.po';

describe('EnergyFlagComponent', () => {
  let component: EnergyFlagComponent;
  let fixture: ComponentFixture<EnergyFlagComponent>;
  let element: HTMLElement;
  let pageobject: EnergyFlagComponentPageObj;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EnergyFlagComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnergyFlagComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
    pageobject = new EnergyFlagComponentPageObj(fixture);
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
    expect(element).toBeTruthy();
  });

  it('should return correct text and css class for each input type', () => {
    expectObject({ inputType: 'A++ - E', expectation: { cssClass: 'appe', displayText: 'A+++' } });
    expectObject({ inputType: 'A+++', expectation: { cssClass: 'appp', displayText: 'A+++' } });
    expectObject({ inputType: 'A++', expectation: { cssClass: 'app', displayText: 'A++' } });
    expectObject({ inputType: 'A+', expectation: { cssClass: 'ap', displayText: 'A+' } });
    expectObject({ inputType: 'A', expectation: { cssClass: 'a', displayText: 'A' } });
    expectObject({ inputType: 'B', expectation: { cssClass: 'b', displayText: 'B' } });
    expectObject({ inputType: 'C', expectation: { cssClass: 'c', displayText: 'C' } });
    expectObject({ inputType: 'D', expectation: { cssClass: 'd', displayText: 'D' } });
    expectObject({ inputType: 'E', expectation: { cssClass: 'e', displayText: 'E' } });
  });

  it('element has correct css classes and displays correct text content', () => {
    expectElement({ inputType: 'A++ - E', expectation: { cssClasses: ['appe'], textContent: 'A+++' } });
    expectElement({ inputType: 'A+++', expectation: { cssClasses: ['appp'], textContent: 'A+++' } });
    expectElement({ inputType: 'A++', expectation: { cssClasses: ['app'], textContent: 'A++' } });
    expectElement({ inputType: 'A+', expectation: { cssClasses: ['ap'], textContent: 'A+' } });
    expectElement({ inputType: 'A', expectation: { cssClasses: ['a'], textContent: 'A' } });
    expectElement({ inputType: 'B', expectation: { cssClasses: ['b'], textContent: 'B' } });
    expectElement({ inputType: 'C', expectation: { cssClasses: ['c'], textContent: 'C' } });
    expectElement({ inputType: 'D', expectation: { cssClasses: ['d'], textContent: 'D' } });
    expectElement({ inputType: 'E', expectation: { cssClasses: ['e'], textContent: 'E' } });
  });

  function expectObject({
    inputType,
    expectation,
  }: {
    inputType: EnergyLabel;
    expectation: {
      cssClass: string;
      displayText: string;
    };
  }) {
    component.type = inputType;

    expect(component.cssClass).toEqual(expectation.cssClass);
    expect(component.displayText).toEqual(expectation.displayText);
  }

  function expectElement({
    inputType,
    expectation,
  }: {
    inputType: EnergyLabel;
    expectation: {
      cssClasses: string[];
      textContent: string;
    };
  }) {
    component.type = inputType;
    fixture.detectChanges();

    expect(pageobject.getCssClasses()).toEqual(expectation.cssClasses);
    expect(pageobject.getTextContent().trim()).toEqual(expectation.textContent);
  }
});
