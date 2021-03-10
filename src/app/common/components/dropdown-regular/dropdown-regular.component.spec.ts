import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { GlobalModule } from 'src/app/common/global.module';
import { DropdownRegularComponent } from './dropdown-regular.component';

describe('DropdownRegularComponent', () => {
  let comp: DropdownRegularComponent;
  let fixture: ComponentFixture<DropdownRegularComponent>;

  @Component({
    template: `
      <div>OuterContainer</div>
    `,
  })
  class TestContainer {}

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [GlobalModule],
      declarations: [TestContainer],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DropdownRegularComponent);
    comp = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should toggle the value of isExpanded when #toggleIsExpanded() is called', () => {
    expect(comp.isExpanded).toBe(false);
    comp.toggleIsExpanded();
    expect(comp.isExpanded).toBe(true);
    comp.toggleIsExpanded();
    expect(comp.isExpanded).toBe(false);
  });

  describe('#clickout()', () => {
    let outerElement: HTMLElement;

    beforeEach(() => {
      comp.toggleIsExpanded();
      fixture.detectChanges();
    });

    it('should close dropdown when event.target is not part of the component', () => {
      outerElement = TestBed.createComponent(TestContainer).debugElement.nativeElement;
      const event: any = { target: outerElement };
      comp.clickout(event);
      expect(comp.isExpanded).toBe(false);
    });

    it('should not close dropdown when event.target is part of the component', () => {
      const event: any = { target: fixture.debugElement.nativeElement };
      comp.clickout(event);
      expect(comp.isExpanded).toBe(true);
    });
  });
});
