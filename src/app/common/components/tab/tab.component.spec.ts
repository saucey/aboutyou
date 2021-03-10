import { BreakpointObserverService } from './../../services/breakpoint-observer.service';
import { TabComponent } from './tab.component';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';

describe('TabComponent', () => {
  let component: TabComponent;
  let fixture: ComponentFixture<TabComponent>;
  let breakpointObserverService: BreakpointObserverService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TabComponent],
      providers: [BreakpointObserverService],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabComponent);
    component = fixture.componentInstance;
    breakpointObserverService = fixture.debugElement.injector.get(BreakpointObserverService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should open Accordion Content on click', () => {
    component.isActive = false;
    // tslint:disable-next-line: no-string-literal
    component['isMobile'] = true;

    const listElement = fixture.debugElement.nativeElement.querySelector('li');
    const openAccordSpy = spyOn(component, 'openAccordionContent');
    listElement.click();
    fixture.detectChanges();

    expect(openAccordSpy).toHaveBeenCalled();
  });
  it('should not open Accordion Content when not in mobile mode', () => {
    component.isActive = false;
    // tslint:disable-next-line: no-string-literal
    component['isMobile'] = false;

    const listElement = fixture.debugElement.nativeElement.querySelector('li');
    const openAccordSpy = spyOn(component, 'openAccordionContent');
    listElement.click();
    fixture.detectChanges();

    expect(openAccordSpy).not.toHaveBeenCalled();
  });
  it('should close Accordion Content in mobile mode', () => {
    component.isActive = true;
    // tslint:disable-next-line: no-string-literal
    component['isMobile'] = true;

    const listElement = fixture.debugElement.nativeElement.querySelector('li');
    const closeAccordSpy = spyOn(component, 'closeAccordionContent');
    listElement.click();
    fixture.detectChanges();

    expect(closeAccordSpy).toHaveBeenCalled();
  });
  it('should open Accordion Content on resize in mobile', () => {
    component.isActive = true;
    // tslint:disable-next-line: no-string-literal
    component['isMobile'] = true;

    const openAccordSpy = spyOn(component, 'openAccordionContent');
    window.dispatchEvent(new Event('resize'));
    fixture.detectChanges();

    expect(openAccordSpy).toHaveBeenCalled();
  });
  it('#listItem should be 0', () => {
    component.closeAccordionContent(true);

    expect(component.listItem.nativeElement.style.height).toBe('');
    expect(component.listItem.nativeElement.style.transition).toBe('all 0s ease 0s');
  });
  it('#listItem should not be 0', () => {
    component.closeAccordionContent(false);

    expect(component.listItem.nativeElement.style.height).toBe('');
    expect(component.listItem.nativeElement.style.transition).not.toBe('all 0s ease 0s');
  });
  it('should set active to true', () => {
    component.setIsActive(true);

    expect(component.isActive).toBe(true);
  });
});
