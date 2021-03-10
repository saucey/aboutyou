/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { ITEMS } from 'src/app/core/documentation/common/components/select.component.stories';
import { CheckboxComponent } from 'src/app/common/components/checkbox/checkbox.component';

import { SelectComponent } from './select.component';
import { GlobalModule } from 'src/app/common/global.module';

describe('SelectComponent', () => {
  let component: SelectComponent;
  let fixture: ComponentFixture<SelectComponent>;
  let element: HTMLElement;

  beforeEach(async(() =>
    TestBed.configureTestingModule({
      imports: [GlobalModule],
    }).compileComponents()));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
    component.items = ITEMS;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('with type "checkbox"', () => {
    beforeEach(() => {
      component.type = 'checkbox';
    });

    it('should render all items', () => {
      givenMode('single');
      fixture.detectChanges();
      const checkboxes = queryCheckboxes();
      expect(checkboxes.length).toEqual(ITEMS.length);
    });

    it('should select only one checkbox in single select mode', () => {
      givenMode('single');
      fixture.detectChanges();

      whenCheckboxIsClicked(0);
      thenItemsSelectedAre(0);

      whenCheckboxIsClicked(1);
      thenItemIsNotSelected(0);
      thenItemsSelectedAre(1);
    });

    it('should select many checkboxes in multiple select mode', () => {
      givenMode('multiple');
      fixture.detectChanges();

      const checkboxes = queryCheckboxes();
      whenCheckboxIsClicked(0, checkboxes);
      whenCheckboxIsClicked(1, checkboxes);
      whenCheckboxIsClicked(2, checkboxes);

      thenItemsSelectedAre(0, 1, 2);
    });

    // SCOPED GIVEN, WHEN, THEN, SELECTORS
    // WHEN
    function whenCheckboxIsClicked(index: number, checkboxes: DebugElement[] = queryCheckboxes()) {
      checkboxes[index].triggerEventHandler('click', null);
    }

    // SELECTORS
    function queryCheckboxes() {
      return fixture.debugElement.queryAll(By.directive(CheckboxComponent));
    }
  });

  // GIVEN
  function givenMode(mode: 'multiple' | 'single') {
    component.mode = mode;
  }

  // WHEN

  // THEN
  function thenItemIsNotSelected(index: number) {
    expect(component.selectedValues).not.toContain(ITEMS[index]);
  }

  function thenItemsSelectedAre(...itemIndex: number[]) {
    itemIndex.forEach(i => expect(component.selectedValues).toContain(ITEMS[i]));
  }
});
