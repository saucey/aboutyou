/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CheckboxComponent } from './checkbox.component';

describe('CheckboxComponent', () => {
  let component: CheckboxComponent;
  let fixture: ComponentFixture<CheckboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CheckboxComponent],
    }).compileComponents();
  }));

  it('should check/unCheck', () => {
    fixture = TestBed.createComponent(CheckboxComponent);
    component = fixture.componentInstance;

    component.selected = true;
    fixture.detectChanges();
    expect(component).toBeTruthy();

    const element = fixture.nativeElement.querySelector('.checked-icon');
    expect(element.getAttribute('class')).toContain('checked');
  });
});
