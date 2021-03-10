/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ExpanderComponent } from './expander.component';
import { GlobalModule } from 'src/app/common/global.module';

describe('ExpanderComponent', () => {
  let component: ExpanderComponent;
  let fixture: ComponentFixture<ExpanderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [GlobalModule],
    }).compileComponents();
  }));

  it('should create', () => {
    fixture = TestBed.createComponent(ExpanderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should expand and collapse properly', () => {
    fixture = TestBed.createComponent(ExpanderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component.expanded).toBeFalsy();

    const button = fixture.debugElement.nativeElement.querySelector('.expander-icon');

    button.click();
    expect(component.expanded).toBeTruthy();
    button.click();
    expect(component.expanded).toBeFalsy();
  });
});
