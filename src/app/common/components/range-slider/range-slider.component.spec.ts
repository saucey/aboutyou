/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { RangeSliderComponent } from './range-slider.component';
import { GlobalModule } from 'src/app/common/global.module';

describe('RangeSliderComponent', () => {
  let component: RangeSliderComponent;
  let fixture: ComponentFixture<RangeSliderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [GlobalModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RangeSliderComponent);
    component = fixture.componentInstance;
    component.floor = 0;
    component.ceil = 100;
    component.value = {
      min: 10,
      max: 90,
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
