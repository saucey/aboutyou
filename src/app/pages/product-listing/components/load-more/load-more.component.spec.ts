/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { LoadMoreComponent } from './load-more.component';
import { GlobalModule } from 'src/app/common/global.module';

describe('LoadMoreComponent', () => {
  let component: LoadMoreComponent;
  let fixture: ComponentFixture<LoadMoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoadMoreComponent],
      imports: [GlobalModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadMoreComponent);
    component = fixture.componentInstance;
    component.progress = { total: 1000, loaded: 300 };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
